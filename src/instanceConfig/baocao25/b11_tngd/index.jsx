import {
  getPickerStateByPath,
  useCorePickerState,
} from "@core/stateManage/corePickerState";
import { PERIOD_TYPE } from "@core/ui/picker/periodpicker/constant";
import { useEffect, useState } from "react";
import { ORG_GROUP } from "../p2ild/common/constant";
import { useCoreMetaState } from "@core/stateManage/metadataState";
import { useShallow } from "zustand/react/shallow";
import { find, pick } from "lodash";
import "./index.css";
import { DATA_ELEMENTS } from "./const";

const Tndg = () => {
  const [rawData, setRawData] = useState(null);
  const { firstLoadApp, _get, setGlobalOverlay } = useCoreMetaState(
    useShallow((state) => ({
      firstLoadApp: state.firstLoadApp,
      _get: state._get,
      setGlobalOverlay: state.actions.setGlobalOverlay,
    }))
  );
  const { corePicker } = useCorePickerState(
    useShallow((state) => ({
      corePicker: state.corePicker,
    }))
  );

  const getData = async () => {
    setGlobalOverlay({ isOpen: true });
    let ou = "";
    if (corePicker.orgSelected.level === 1) {
      ou = `LEVEL-xYcrY3IenFA;OU_GROUP-mH8ggZyC39Z;${corePicker.orgSelected.id}`;
    } else {
      if (corePicker.orgSelected.level === 2) {
        ou = `LEVEL-WhQd3l5lhwv;OU_GROUP-uyuiasZ82O4;${corePicker.orgSelected.id}`;
      } else {
        ou = corePicker.orgSelected.id;
      }
    }
    try {
      const tableKeys = Object.keys(DATA_ELEMENTS);
      const requests = tableKeys.map((tableKey) => {
        const elements = DATA_ELEMENTS[tableKey];
        return _get(
          `/api/analytics.json?dimension=dx:${elements.join(
            ";"
          )}&dimension=ou:${ou}&showHierarchy=false&hierarchyMeta=false&includeMetadataDetails=true&includeNumDen=true&skipRounding=false&completedOnly=false&outputIdScheme=UID&filter=pe:${
            corePicker.periodSelected.startDate
          }`
        );
      });
      const results = await Promise.all(requests);
      const dataByTable = {};
      tableKeys.forEach((key, idx) => {
        dataByTable[key] = results[idx];
      });
      setRawData(dataByTable);
    } catch (error) {
      console.error("Error fetching data elements:", error);
    } finally {
      setGlobalOverlay({ isOpen: false });
    }
  };

  const findHeaderIndex = (result, name) => {
    if (!result) return -1;
    return result.findIndex((h) => h.name === name);
  };

  const generateTableData = (tableKey) => {
    const dataElements = DATA_ELEMENTS[tableKey];
    if (!dataElements || !rawData || !rawData[tableKey]) return [];

    const ouArr = rawData[tableKey]?.metaData?.dimensions?.ou;
    const selectedId = corePicker?.orgSelected?.id;
    const valueIndex = findHeaderIndex(rawData[tableKey].headers, "value");
    const dataElementIndex = findHeaderIndex(rawData[tableKey].headers, "dx");
    const orgUnitIndex = findHeaderIndex(rawData[tableKey].headers, "ou");
    if (ouArr && selectedId) {
      const idx = ouArr.indexOf(selectedId);
      if (idx > 0) {
        ouArr.splice(idx, 1);
        ouArr.unshift(selectedId);
      }
    }
    return ouArr.map((id, index) => {
      const org = rawData[tableKey]?.metaData?.items[id];

      return (
        <tr id={id} key={id}>
          {id === corePicker.orgSelected.id &&
          corePicker.orgSelected.level <= 2 ? (
            <td colSpan={2} style={{ fontWeight: "bold" }}>
              Tổng số
            </td>
          ) : (
            <>
              <td>{index}</td>
              <td>{org ? org.name : ""}</td>
            </>
          )}

          {dataElements.map((element) => {
            const findValue = rawData[tableKey].rows.find(
              (row) =>
                row[dataElementIndex] === element && row[orgUnitIndex] === id
            );
            return (
              <td
                key={element}
                style={{
                  textAlign: "center",
                  fontWeight:
                    id === corePicker.orgSelected.id &&
                    corePicker.orgSelected.level <= 2
                      ? "bold"
                      : "normal",
                }}
              >
                {findValue ? parseFloat(findValue[valueIndex]).toFixed(2) : 0}
              </td>
            );
          })}
        </tr>
      );
    });
  };

  useEffect(() => {
    getPickerStateByPath("actions.setAllowPeriodTypes")([
      PERIOD_TYPE.month,
      PERIOD_TYPE.month2,
      PERIOD_TYPE.year,
      PERIOD_TYPE.sixMonth,
      PERIOD_TYPE.biWeek,
    ]);

    getPickerStateByPath("actions.setOrgPickerConfig")({
      orgGroupVisible: [
        ORG_GROUP.TINH_DVHC,
        ORG_GROUP.XA_DVHC,
        ORG_GROUP.TUYEN_TINH,
      ],
      // levelsToHideIfEmpty: [3]
    });
  }, []);

  useEffect(() => {
    if (corePicker && corePicker.pickCompleted) {
      (async () => {
        await getData();
      })();
    }
  }, [corePicker.pickCompleted]);

  return (
    <div className="report-container">
      <h3>Báo cáo 11 - TÌNH HÌNH MẮC VÀ TỬ VONG BỆNH TRUYỀN NHIỄM GÂY DỊCH</h3>

      <div
        className="table-wrapper"
        style={{ paddingTop: "10px", paddingBottom: "20px" }}
      >
        <table className="table-tndg">
          <thead>
            <tr>
              <th
                className="sticky-col col-1 sticky-top top-1"
                style={{ width: "2%" }}
              >
                TT
              </th>
              <th
                className="sticky-col col-2 sticky-top top-1"
                style={{ width: "13%" }}
                rowSpan={corePicker.orgSelected.level === 1 ? 2 : 1}
              >
                {corePicker.orgSelected.level === 1
                  ? "Tỉnh"
                  : "Trạm y tế cấp xã"}
              </th>
              <th colSpan="2" style={{ width: "8.5%" }}>
                Bạch hầu
              </th>
              <th colSpan="2" style={{ width: "8.5%" }}>
                Liên cầu
              </th>
              <th colSpan="2" style={{ width: "8.5%" }}>
                Vi rút Adeno
              </th>
              <th colSpan="2" style={{ width: "8.5%" }}>
                Cúm
              </th>
              <th colSpan="2" style={{ width: "8.5%" }}>
                Cúm A(H5N1)
              </th>
              <th colSpan="2" style={{ width: "8.5%" }}>
                Dại
              </th>
              <th colSpan="2" style={{ width: "8.5%" }}>
                Dịch hạch
              </th>
              <th colSpan="2" style={{ width: "8.5%" }}>
                Ho gà
              </th>
              <th colSpan="2" style={{ width: "8.5%" }}>
                Lỵ Amíp
              </th>
              <th colSpan="2" style={{ width: "8.5%" }}>
                Lỵ trực trùng
              </th>
            </tr>
            <tr>
              <th className="sticky-col col-1 sticky-top top-2">#</th>
              {corePicker.orgSelected.level !== 1 && (
                <th className="sticky-col col-2 sticky-top top-2">
                  Trạm y tế cấp xã
                </th>
              )}
              <th>M</th>
              <th>TV</th>
              <th>M</th>
              <th>TV</th>
              <th>M</th>
              <th>TV</th>
              <th>M</th>
              <th>TV</th>
              <th>M</th>
              <th>TV</th>
              <th>M</th>
              <th>TV</th>
              <th>M</th>
              <th>TV</th>
              <th>M</th>
              <th>TV</th>
              <th>M</th>
              <th>TV</th>
              <th>M</th>
              <th>TV</th>
            </tr>
          </thead>
          <tbody>{generateTableData("table_1")}</tbody>
        </table>
      </div>

      <h3>
        Báo cáo 11 - TÌNH HÌNH MẮC VÀ TỬ VONG BỆNH TRUYỀN NHIỄM GÂY DỊCH (tiếp)
      </h3>

      <div
        className="table-wrapper"
        style={{ paddingTop: "10px", paddingBottom: "20px" }}
      >
        <table className="table-tndg">
          <thead>
            <tr>
              <th
                className="sticky-col col-1 sticky-top top-1"
                style={{ width: "2%" }}
              >
                TT
              </th>
              <th
                className="sticky-col col-2 sticky-top top-1"
                style={{ width: "13%" }}
                rowSpan={corePicker.orgSelected.level === 1 ? 2 : 1}
              >
                {corePicker.orgSelected.level === 1
                  ? "Tỉnh"
                  : "Trạm y tế cấp xã"}
              </th>
              <th colSpan="2" style={{ width: "8.5%" }}>
                Quai bị
              </th>
              <th colSpan="2" style={{ width: "8.5%" }}>
                Rubella (Rubeon)
              </th>
              <th colSpan="2" style={{ width: "8.5%" }}>
                Sởi
              </th>
              <th colSpan="2" style={{ width: "8.5%" }}>
                Sốt rét
              </th>
              <th colSpan="2" style={{ width: "8.5%" }}>
                Sốt xuất huyết Dengue
              </th>
              <th colSpan="2" style={{ width: "8.5%" }}>
                Tả
              </th>
              <th colSpan="2" style={{ width: "8.5%" }}>
                Tay - chân - miệng
              </th>
              <th colSpan="2" style={{ width: "8.5%" }}>
                Than
              </th>
              <th colSpan="2" style={{ width: "8.5%" }}>
                Thương hàn
              </th>
              <th colSpan="2" style={{ width: "8.5%" }}>
                Thủy đậu
              </th>
            </tr>
            <tr>
              <th className="sticky-col col-1 sticky-top top-2">#</th>
              {corePicker.orgSelected.level !== 1 && (
                <th className="sticky-col col-2 sticky-top top-2">
                  Trạm y tế cấp xã
                </th>
              )}
              <th>M</th>
              <th>TV</th>
              <th>M</th>
              <th>TV</th>
              <th>M</th>
              <th>TV</th>
              <th>M</th>
              <th>TV</th>
              <th>M</th>
              <th>TV</th>
              <th>M</th>
              <th>TV</th>
              <th>M</th>
              <th>TV</th>
              <th>M</th>
              <th>TV</th>
              <th>M</th>
              <th>TV</th>
              <th>M</th>
              <th>TV</th>
            </tr>
          </thead>
          <tbody>{generateTableData("table_2")}</tbody>
        </table>
      </div>

      <h3>
        Báo cáo 11 - TÌNH HÌNH MẮC VÀ TỬ VONG BỆNH TRUYỀN NHIỄM GÂY DỊCH (tiếp)
      </h3>

      <div className="table-wrapper" style={{ paddingTop: "10px" }}>
        <table className="table-tndg">
          <thead>
            <tr>
              <th
                className="sticky-col col-1 sticky-top top-1"
                style={{ width: "2%" }}
              >
                TT
              </th>
              <th
                className="sticky-col col-2 sticky-top top-1"
                style={{
                  width: "13%",
                }}
                rowSpan={corePicker.orgSelected.level === 1 ? 2 : 1}
              >
                {corePicker.orgSelected.level === 1
                  ? "Tỉnh"
                  : "Trạm y tế cấp xã"}
              </th>
              <th colSpan="2" style={{ width: "7%" }}>
                Tiêu chảy
              </th>
              <th colSpan="2" style={{ width: "7%" }}>
                Uốn ván sơ sinh
              </th>
              <th colSpan="2" style={{ width: "7%" }}>
                Uốn ván khác
              </th>
              <th colSpan="2" style={{ width: "7%" }}>
                Viêm gan vi rút A
              </th>
              <th colSpan="2" style={{ width: "7%" }}>
                Viêm gan vi rút B
              </th>
              <th colSpan="2" style={{ width: "7%" }}>
                Viêm gan vi rút C
              </th>
              <th colSpan="2" style={{ width: "7%" }}>
                Viêm gan vi rút khác
              </th>
              <th colSpan="2" style={{ width: "7%" }}>
                Viêm màng não do não mô cầu
              </th>
              <th colSpan="2" style={{ width: "7%" }}>
                Viêm não Nhật Bản
              </th>
              <th colSpan="2" style={{ width: "7%" }}>
                Viêm não vi rút khác
              </th>
              <th colSpan="2" style={{ width: "7%" }}>
                Xoắn khuẩn vàng da (Leptospira)
              </th>
              <th colSpan="2" style={{ width: "7%" }}>
                Khác
              </th>
            </tr>
            <tr>
              <th className="sticky-col col-1 sticky-top top-2">#</th>
              {corePicker.orgSelected.level !== 1 && (
                <th className="sticky-col col-2 sticky-top top-2">
                  Trạm y tế cấp xã
                </th>
              )}
              <th>M</th>
              <th>TV</th>
              <th>M</th>
              <th>TV</th>
              <th>M</th>
              <th>TV</th>
              <th>M</th>
              <th>TV</th>
              <th>M</th>
              <th>TV</th>
              <th>M</th>
              <th>TV</th>
              <th>M</th>
              <th>TV</th>
              <th>M</th>
              <th>TV</th>
              <th>M</th>
              <th>TV</th>
              <th>M</th>
              <th>TV</th>
              <th>M</th>
              <th>TV</th>
              <th>M</th>
              <th>TV</th>
            </tr>
          </thead>
          <tbody>{generateTableData("table_3")}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Tndg;
