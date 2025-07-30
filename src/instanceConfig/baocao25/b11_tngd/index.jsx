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
import { format } from "date-fns";

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
    if (
      corePicker &&
      corePicker.orgSelected &&
      corePicker.orgSelected.level === 1
    ) {
      ou = `LEVEL-xYcrY3IenFA;OU_GROUP-mH8ggZyC39Z;${corePicker.orgSelected.id}`;
    } else {
      if (corePicker.orgSelected.level === 2) {
        ou = `LEVEL-WhQd3l5lhwv;OU_GROUP-uyuiasZ82O4;${corePicker.orgSelected.id}`;
      } else {
        //ou = corePicker.orgSelected.id;
        ou = `LEVEL-DlpICkLnkZl;OU_GROUP-eHs95ggJw7J;OU_GROUP-OHWM3DxkeMR;${corePicker.orgSelected.id}`;
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

    let newOuArr = ouArr
      .map((id) => {
        const org = rawData[tableKey]?.metaData?.items[id];
        return org;
      })
      .sort((a, b) => {
        if (a && b) {
          return a.name.localeCompare(b.name);
        }
        return 0;
      });

    const idx = newOuArr.findIndex((org) => org && org.uid === selectedId);
    if (idx > 0) {
      const [selectedOrg] = newOuArr.splice(idx, 1);
      newOuArr.unshift(selectedOrg);
    }

    return newOuArr.map((org, index) => {
      const id = org.uid;
      //const org = rawData[tableKey]?.metaData?.items[id];
      //console.log(corePicker.orgSelected);
      const isTotal =
        corePicker.orgSelected.children.length > 0 &&
        id === corePicker.orgSelected.id;
      // id === corePicker.orgSelected.id && corePicker.orgSelected.level <= 3;

      return (
        <tr id={id} key={id}>
          {isTotal ? (
            <td
              colSpan={2}
              style={{ fontWeight: "bold" }}
              data-a-h="center"
              data-a-v="middle"
              data-f-bold="true"
              data-a-wrap="true"
              data-b-a-s="thin"
            >
              Tổng số
            </td>
          ) : (
            <>
              <td
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                {index === 0 ? 1 : index}
              </td>
              <td
                data-a-h="left"
                data-a-v="left"
                data-a-wrap="true"
                data-b-a-s="thin"
                style={{ textAlign: "left", paddingLeft: "20px" }}
              >
                {org ? org.name : ""}
              </td>
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
                style={{ fontWeight: isTotal ? "bold" : "normal" }}
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
                data-f-bold={isTotal ? "true" : undefined}
                data-num-fmt="0"
              >
                {findValue ? parseFloat(findValue[valueIndex]).toFixed(0) : 0}
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
        ORG_GROUP.XA_CSYT_KHAC,
        ORG_GROUP.XA,
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
      <table style={{ border: 0 }} className=" mb-5 sticky left-0">
        <tbody>
          <tr>
            <td
              style={{
                width: "100vw",
                fontSize: "16px",
                border: 0,
                textAlign: "left",
              }}
            >
              <p>{"Báo cáo 11"}</p>
            </td>
          </tr>
          <tr>
            <td
              colSpan={22}
              style={{
                width: "100vw",
                fontSize: "16px",
                border: 0,
                textAlign: "left",
              }}
            >
              <p>
                Đơn vị báo cáo:{" "}
                {corePicker?.orgSelected?.displayName?.toUpperCase?.()}
              </p>
            </td>
          </tr>
          <tr>
            <td
              colSpan={22}
              data-a-h="center"
              data-a-v="middle"
              data-f-bold="true"
              style={{
                width: "100vw",
                fontSize: "16px",
                border: 0,
                fontWeight: 800,
                textAlign: "center",
              }}
            >
              <p>{"TÌNH HÌNH MẮC VÀ TỬ VONG BỆNH  TRUYỀN NHIỄM GÂY DỊCH"}</p>
            </td>
          </tr>
          <tr>
            <td
              colSpan={22}
              data-a-h="center"
              data-a-v="middle"
              data-f-bold="true"
              style={{
                width: "100vw",
                fontSize: "16px",
                border: 0,
                fontWeight: 800,
                textAlign: "center",
              }}
            >
              <p>
                Báo cáo{" "}
                {[
                  corePicker?.periodSelected?.labelStartDate,
                  corePicker?.periodSelected?.labelEndDate
                    ? `${corePicker?.periodSelected?.labelEndDate}`
                    : undefined,
                ]
                  .filter((e) => e)
                  .join(" đến ")
                  .replaceAll("-", "/")}
              </p>
            </td>
          </tr>
          <tr>
            <td
              colSpan={22}
              data-a-h="center"
              data-a-v="middle"
              data-f-bold="true"
              style={{
                width: "100vw",
                fontSize: "16px",
                border: 0,
                fontWeight: 800,
                textAlign: "center",
              }}
            >
              <p className="italic">
                Ngày kết xuất báo cáo: {format(new Date(), "dd/MM/yyyy")} -
                Nguồn dữ liệu: Phần mềm Thống kê y tế
              </p>
            </td>
          </tr>
        </tbody>
      </table>
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
                data-a-h="center"
                data-a-v="middle"
                data-f-bold="true"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                TT
              </th>
              <th
                className="sticky-col col-2 sticky-top top-1"
                style={{ width: "13%" }}
                rowSpan={
                  corePicker &&
                  corePicker.orgSelected &&
                  corePicker.orgSelected.level === 1
                    ? 2
                    : 2
                }
                data-a-h="center"
                data-a-v="middle"
                data-f-bold="true"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                {corePicker &&
                corePicker.orgSelected &&
                corePicker.orgSelected.level === 1
                  ? "Tỉnh"
                  : "Trạm y tế cấp xã"}
              </th>
              <th
                colSpan="2"
                style={{ width: "8.5%" }}
                data-a-h="center"
                data-a-v="middle"
                data-f-bold="true"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                Bạch hầu
              </th>
              <th
                colSpan="2"
                style={{ width: "8.5%" }}
                data-a-h="center"
                data-a-v="middle"
                data-f-bold="true"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                Liên cầu
              </th>
              <th
                colSpan="2"
                style={{ width: "8.5%" }}
                data-a-h="center"
                data-a-v="middle"
                data-f-bold="true"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                Vi rút Adeno
              </th>
              <th
                colSpan="2"
                style={{ width: "8.5%" }}
                data-a-h="center"
                data-a-v="middle"
                data-f-bold="true"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                Cúm
              </th>
              <th
                colSpan="2"
                style={{ width: "8.5%" }}
                data-a-h="center"
                data-a-v="middle"
                data-f-bold="true"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                Cúm A(H5N1)
              </th>
              <th
                colSpan="2"
                style={{ width: "8.5%" }}
                data-a-h="center"
                data-a-v="middle"
                data-f-bold="true"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                Dại
              </th>
              <th
                colSpan="2"
                style={{ width: "8.5%" }}
                data-a-h="center"
                data-a-v="middle"
                data-f-bold="true"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                Dịch hạch
              </th>
              <th
                colSpan="2"
                style={{ width: "8.5%" }}
                data-a-h="center"
                data-a-v="middle"
                data-f-bold="true"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                Ho gà
              </th>
              <th
                colSpan="2"
                style={{ width: "8.5%" }}
                data-a-h="center"
                data-a-v="middle"
                data-f-bold="true"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                Lỵ Amíp
              </th>
              <th
                colSpan="2"
                style={{ width: "8.5%" }}
                data-a-h="center"
                data-a-v="middle"
                data-f-bold="true"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                Lỵ trực trùng
              </th>
            </tr>
            <tr>
              <th
                className="sticky-col col-1 sticky-top top-2"
                data-a-h="center"
                data-a-v="middle"
                data-f-bold="true"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                #
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                M
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                TV
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                M
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                TV
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                M
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                TV
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                M
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                TV
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                M
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                TV
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                M
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                TV
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                M
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                TV
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                M
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                TV
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                M
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                TV
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                M
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                TV
              </th>
            </tr>
            <tr>
              {Array.from({ length: 22 }, (_, i) => (
                <th
                  key={i + 1}
                  data-a-h="center"
                  data-a-v="middle"
                  data-f-bold="true"
                  data-a-wrap="true"
                  data-b-a-s="thin"
                >
                  {i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{generateTableData("table_1")}</tbody>
        </table>
      </div>

      <table style={{ border: 0 }} className=" mb-5 sticky left-0">
        <tbody>
          <tr>
            <td
              style={{
                width: "100vw",
                fontSize: "16px",
                border: 0,
                textAlign: "left",
              }}
            >
              <p>{"Báo cáo 11"}</p>
            </td>
          </tr>
          <tr>
            <td
              colSpan={22}
              style={{
                width: "100vw",
                fontSize: "16px",
                border: 0,
                textAlign: "left",
              }}
            >
              <p>
                Đơn vị báo cáo:{" "}
                {corePicker?.orgSelected?.displayName?.toUpperCase?.()}
              </p>
            </td>
          </tr>
          <tr>
            <td
              colSpan={22}
              data-a-h="center"
              data-a-v="middle"
              data-f-bold="true"
              style={{
                width: "100vw",
                fontSize: "16px",
                border: 0,
                fontWeight: 800,
                textAlign: "center",
              }}
            >
              <p>
                {"TÌNH HÌNH MẮC VÀ TỬ VONG BỆNH  TRUYỀN NHIỄM GÂY DỊCH (tiếp)"}
              </p>
            </td>
          </tr>
          <tr>
            <td
              colSpan={22}
              data-a-h="center"
              data-a-v="middle"
              data-f-bold="true"
              style={{
                width: "100vw",
                fontSize: "16px",
                border: 0,
                fontWeight: 800,
                textAlign: "center",
              }}
            >
              <p>
                Báo cáo{" "}
                {[
                  corePicker?.periodSelected?.labelStartDate,
                  corePicker?.periodSelected?.labelEndDate
                    ? `${corePicker?.periodSelected?.labelEndDate}`
                    : undefined,
                ]
                  .filter((e) => e)
                  .join(" đến ")
                  .replaceAll("-", "/")}
              </p>
            </td>
          </tr>
          <tr>
            <td
              colSpan={22}
              data-a-h="center"
              data-a-v="middle"
              data-f-bold="true"
              style={{
                width: "100vw",
                fontSize: "16px",
                border: 0,
                fontWeight: 800,
                textAlign: "center",
              }}
            >
              <p className="italic">
                Ngày kết xuất báo cáo: {format(new Date(), "dd/MM/yyyy")} -
                Nguồn dữ liệu: Phần mềm Thống kê y tế
              </p>
            </td>
          </tr>
        </tbody>
      </table>

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
                data-a-h="center"
                data-a-v="middle"
                data-f-bold="true"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                TT
              </th>
              <th
                className="sticky-col col-2 sticky-top top-1"
                style={{ width: "13%" }}
                rowSpan={
                  corePicker &&
                  corePicker.orgSelected &&
                  corePicker.orgSelected.level === 1
                    ? 2
                    : 2
                }
                data-a-h="center"
                data-a-v="middle"
                data-f-bold="true"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                {corePicker &&
                corePicker.orgSelected &&
                corePicker.orgSelected.level === 1
                  ? "Tỉnh"
                  : "Trạm y tế cấp xã"}
              </th>
              <th
                colSpan="2"
                style={{ width: "8.5%" }}
                data-a-h="center"
                data-a-v="middle"
                data-f-bold="true"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                Quai bị
              </th>
              <th
                colSpan="2"
                style={{ width: "8.5%" }}
                data-a-h="center"
                data-a-v="middle"
                data-f-bold="true"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                Rubella (Rubeon)
              </th>
              <th
                colSpan="2"
                style={{ width: "8.5%" }}
                data-a-h="center"
                data-a-v="middle"
                data-f-bold="true"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                Sởi
              </th>
              <th
                colSpan="2"
                style={{ width: "8.5%" }}
                data-a-h="center"
                data-a-v="middle"
                data-f-bold="true"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                Sốt rét
              </th>
              <th
                colSpan="2"
                style={{ width: "8.5%" }}
                data-a-h="center"
                data-a-v="middle"
                data-f-bold="true"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                Sốt xuất huyết Dengue
              </th>
              <th
                colSpan="2"
                style={{ width: "8.5%" }}
                data-a-h="center"
                data-a-v="middle"
                data-f-bold="true"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                Tả
              </th>
              <th
                colSpan="2"
                style={{ width: "8.5%" }}
                data-a-h="center"
                data-a-v="middle"
                data-f-bold="true"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                Tay - chân - miệng
              </th>
              <th
                colSpan="2"
                style={{ width: "8.5%" }}
                data-a-h="center"
                data-a-v="middle"
                data-f-bold="true"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                Than
              </th>
              <th
                colSpan="2"
                style={{ width: "8.5%" }}
                data-a-h="center"
                data-a-v="middle"
                data-f-bold="true"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                Thương hàn
              </th>
              <th
                colSpan="2"
                style={{ width: "8.5%" }}
                data-a-h="center"
                data-a-v="middle"
                data-f-bold="true"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                Thủy đậu
              </th>
            </tr>
            <tr>
              <th
                className="sticky-col col-1 sticky-top top-2"
                data-a-h="center"
                data-a-v="middle"
                data-f-bold="true"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                #
              </th>
              {/* {corePicker &&
                corePicker.orgSelected &&
                corePicker.orgSelected.level !== 1 && (
                  <th
                    className="sticky-col col-2 sticky-top top-2"
                    data-a-h="center"
                    data-a-v="middle"
                    data-f-bold="true"
                    data-a-wrap="true"
                    data-b-a-s="thin"
                  >
                    Trạm y tế cấp xã
                  </th>
                )} */}
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                M
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                TV
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                M
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                TV
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                M
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                TV
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                M
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                TV
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                M
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                TV
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                M
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                TV
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                M
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                TV
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                M
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                TV
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                M
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                TV
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                M
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                TV
              </th>
            </tr>
            <tr>
              {Array.from({ length: 22 }, (_, i) => (
                <th
                  key={i + 1}
                  data-a-h="center"
                  data-a-v="middle"
                  data-f-bold="true"
                  data-a-wrap="true"
                  data-b-a-s="thin"
                >
                  {i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{generateTableData("table_2")}</tbody>
        </table>
      </div>

      <table style={{ border: 0 }} className=" mb-5 sticky left-0">
        <tbody>
          <tr>
            <td
              style={{
                width: "100vw",
                fontSize: "16px",
                border: 0,
                textAlign: "left",
              }}
            >
              <p>{"Báo cáo 11"}</p>
            </td>
          </tr>
          <tr>
            <td
              colSpan={22}
              style={{
                width: "100vw",
                fontSize: "16px",
                border: 0,
                textAlign: "left",
              }}
            >
              <p>
                Đơn vị báo cáo:{" "}
                {corePicker?.orgSelected?.displayName?.toUpperCase?.()}
              </p>
            </td>
          </tr>
          <tr>
            <td
              colSpan={22}
              data-a-h="center"
              data-a-v="middle"
              data-f-bold="true"
              style={{
                width: "100vw",
                fontSize: "16px",
                border: 0,
                fontWeight: 800,
                textAlign: "center",
              }}
            >
              <p>
                {"TÌNH HÌNH MẮC VÀ TỬ VONG BỆNH  TRUYỀN NHIỄM GÂY DỊCH (tiếp)"}
              </p>
            </td>
          </tr>
          <tr>
            <td
              colSpan={22}
              data-a-h="center"
              data-a-v="middle"
              data-f-bold="true"
              style={{
                width: "100vw",
                fontSize: "16px",
                border: 0,
                fontWeight: 800,
                textAlign: "center",
              }}
            >
              <p>
                Báo cáo{" "}
                {[
                  corePicker?.periodSelected?.labelStartDate,
                  corePicker?.periodSelected?.labelEndDate
                    ? `${corePicker?.periodSelected?.labelEndDate}`
                    : undefined,
                ]
                  .filter((e) => e)
                  .join(" đến ")
                  .replaceAll("-", "/")}
              </p>
            </td>
          </tr>
          <tr>
            <td
              colSpan={22}
              data-a-h="center"
              data-a-v="middle"
              data-f-bold="true"
              style={{
                width: "100vw",
                fontSize: "16px",
                border: 0,
                fontWeight: 800,
                textAlign: "center",
              }}
            >
              <p className="italic">
                Ngày kết xuất báo cáo: {format(new Date(), "dd/MM/yyyy")} -
                Nguồn dữ liệu: Phần mềm Thống kê y tế
              </p>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="table-wrapper" style={{ paddingTop: "10px" }}>
        <table className="table-tndg">
          <thead>
            <tr>
              <th
                className="sticky-col col-1 sticky-top top-1"
                style={{ width: "2%" }}
                data-a-h="center"
                data-a-v="middle"
                data-f-bold="true"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                TT
              </th>
              <th
                className="sticky-col col-2 sticky-top top-1"
                style={{ width: "13%" }}
                rowSpan={
                  corePicker &&
                  corePicker.orgSelected &&
                  corePicker.orgSelected.level === 1
                    ? 2
                    : 2
                }
                data-a-h="center"
                data-a-v="middle"
                data-f-bold="true"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                {corePicker &&
                corePicker.orgSelected &&
                corePicker.orgSelected.level === 1
                  ? "Tỉnh"
                  : "Trạm y tế cấp xã"}
              </th>
              <th
                colSpan="2"
                style={{ width: "7%" }}
                data-a-h="center"
                data-a-v="middle"
                data-f-bold="true"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                Tiêu chảy
              </th>
              <th
                colSpan="2"
                style={{ width: "7%" }}
                data-a-h="center"
                data-a-v="middle"
                data-f-bold="true"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                Uốn ván sơ sinh
              </th>
              <th
                colSpan="2"
                style={{ width: "7%" }}
                data-a-h="center"
                data-a-v="middle"
                data-f-bold="true"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                Uốn ván khác
              </th>
              <th
                colSpan="2"
                style={{ width: "7%" }}
                data-a-h="center"
                data-a-v="middle"
                data-f-bold="true"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                Viêm gan vi rút A
              </th>
              <th
                colSpan="2"
                style={{ width: "7%" }}
                data-a-h="center"
                data-a-v="middle"
                data-f-bold="true"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                Viêm gan vi rút B
              </th>
              <th
                colSpan="2"
                style={{ width: "7%" }}
                data-a-h="center"
                data-a-v="middle"
                data-f-bold="true"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                Viêm gan vi rút C
              </th>
              <th
                colSpan="2"
                style={{ width: "7%" }}
                data-a-h="center"
                data-a-v="middle"
                data-f-bold="true"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                Viêm gan vi rút khác
              </th>
              <th
                colSpan="2"
                style={{ width: "7%" }}
                data-a-h="center"
                data-a-v="middle"
                data-f-bold="true"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                Viêm màng não do não mô cầu
              </th>
              <th
                colSpan="2"
                style={{ width: "7%" }}
                data-a-h="center"
                data-a-v="middle"
                data-f-bold="true"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                Viêm não Nhật Bản
              </th>
              <th
                colSpan="2"
                style={{ width: "7%" }}
                data-a-h="center"
                data-a-v="middle"
                data-f-bold="true"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                Viêm não vi rút khác
              </th>
              <th
                colSpan="2"
                style={{ width: "7%" }}
                data-a-h="center"
                data-a-v="middle"
                data-f-bold="true"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                Xoắn khuẩn vàng da (Leptospira)
              </th>
              <th
                colSpan="2"
                style={{ width: "7%" }}
                data-a-h="center"
                data-a-v="middle"
                data-f-bold="true"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                Khác
              </th>
            </tr>
            <tr>
              <th
                className="sticky-col col-1 sticky-top top-2"
                data-a-h="center"
                data-a-v="middle"
                data-f-bold="true"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                #
              </th>
              {/* {corePicker &&
                corePicker.orgSelected &&
                corePicker.orgSelected.level !== 1 && (
                  <th
                    className="sticky-col col-2 sticky-top top-2"
                    data-a-h="center"
                    data-a-v="middle"
                    data-f-bold="true"
                    data-a-wrap="true"
                    data-b-a-s="thin"
                  >
                    Trạm y tế cấp xã
                  </th>
                )} */}
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                M
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                TV
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                M
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                TV
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                M
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                TV
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                M
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                TV
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                M
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                TV
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                M
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                TV
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                M
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                TV
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                M
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                TV
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                M
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                TV
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                M
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                TV
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                M
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                TV
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                M
              </th>
              <th
                data-a-h="center"
                data-a-v="middle"
                data-a-wrap="true"
                data-b-a-s="thin"
              >
                TV
              </th>
            </tr>
            <tr>
              {Array.from({ length: 26 }, (_, i) => (
                <th
                  key={i + 1}
                  data-a-h="center"
                  data-a-v="middle"
                  data-f-bold="true"
                  data-a-wrap="true"
                  data-b-a-s="thin"
                >
                  {i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{generateTableData("table_3")}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Tndg;
