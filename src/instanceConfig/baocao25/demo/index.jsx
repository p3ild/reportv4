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
      // Show loading overlay
      setGlobalOverlay({ isOpen: true });
      _get("/api/dataElements.json")
        .then((e) => {
          console.log(e);
        })
        .finally(() => {
          // Hide loading overlay
          setGlobalOverlay({ isOpen: false });
        });
      _get("/api/me").then((e) => {
        //console.log(e.name);
      });
    }
  }, [corePicker.pickCompleted]);

  return "hehe";
};

export default Test;
