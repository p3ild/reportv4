import {
  getPickerStateByPath,
  useCorePickerState,
} from "@core/stateManage/corePickerState";
import { PERIOD_TYPE } from "@core/ui/picker/periodpicker/constant";
import { useEffect, useRef } from "react";
import { ORG_GROUP } from "../p2ild/common/constant";
import { useCoreMetaState } from "@core/stateManage/metadataState";
import { useShallow } from "zustand/react/shallow";
import Table_1 from "./Table_1";
import "./index.css";
import Table_2 from "./Table_2";
import Table_3 from "./Table_3";
const Test = () => {
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

  const scrollContainerRef = useRef(null);

  return (
    <div
      ref={scrollContainerRef}
      className="font-serif h-full  b10_tntt_hiv_sktt-report-container flex flex-col gap-6"
    >
      <Table_1 />
      <Table_2 />
      <Table_3 />
    </div>
  );
};

export default Test;
