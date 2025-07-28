import {
  getPickerStateByPath,
  useCorePickerState,
} from "@core/stateManage/corePickerState";
import { PERIOD_TYPE } from "@core/ui/picker/periodpicker/constant";
import { useEffect } from "react";
import { ORG_GROUP } from "../p2ild/common/constant";
import { useCoreMetaState } from "@core/stateManage/metadataState";
import { useShallow } from "zustand/react/shallow";
import { pick } from "lodash";
import "./index.css";
import { DATA_ELEMENTS } from "./const";

const Tndg = () => {
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
    //console.log(firstLoadApp);
    if (firstLoadApp) {
      _get("/api/me").then((e) => {
        //console.log(e.name);
      });
    }
  }, [firstLoadApp]);

  useEffect(() => {
    if (corePicker && corePicker.pickCompleted) {
      setGlobalOverlay({ isOpen: true });
      _get("/api/dataElements.json")
        .then((e) => {
          console.log(e);
        })
        .finally(() => {
          setGlobalOverlay({ isOpen: false });
        });
    }
  }, [corePicker.pickCompleted]);

  return (
    <>
      <h3>Báo cáo 11 - TÌNH HÌNH MẮC VÀ TỬ VONG BỆNH TRUYỀN NHIỄM GÂY DỊCH</h3>

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
                style={{ width: "13%" }}
              >
                Trạm y tế cấp xã
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
              <th className="sticky-col col-2 sticky-top top-2">Xã</th>
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
        </table>
      </div>

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
                style={{ width: "13%" }}
              >
                Trạm y tế cấp xã
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
              <th className="sticky-col col-2 sticky-top top-2">Xã</th>
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
        </table>
      </div>

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
                style={{ width: "13%" }}
              >
                Trạm y tế cấp xã
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
              <th className="sticky-col col-2 sticky-top top-2">Xã</th>
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
        </table>
      </div>
    </>
  );
};

export default Tndg;
