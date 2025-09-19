import {
  getPickerStateByPath,
  useCorePickerState,
} from "@core/stateManage/corePickerState";
import { PERIOD_TYPE } from "@core/ui/picker/periodpicker/constant";
import { useEffect } from "react";
import { useCoreMetaState } from "@core/stateManage/metadataState";
import { useShallow } from "zustand/react/shallow";
import { wait } from "@core/network";
import { ORG_GROUP } from "../common/constant";
import { } from "../common/ui/MultiTableUI";
import { applyStickyRowStyles } from "@core/ui/tableUtils/sticky";

const Test = () => {
  const { firstLoadApp, _get, setGlobalOverlay } = useCoreMetaState(
    useShallow((state) => ({
      firstLoadApp: state.firstLoadApp,
      _get: state._get,
      setGlobalOverlay: state.actions.setGlobalOverlay,
    }))
  );
  const { corePicker, setCorePicker } = useCorePickerState(
    useShallow((state) => ({
      corePicker: state.corePicker,
      setCorePicker: state.setCorePicker,
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
    wait(500).then(() => {
      applyStickyRowStyles({ tableID: "test-table" })
    })
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

  return <div className="">
    <table table_ID='test-table'>
      <thead>
        <tr>
          {
            Array(30).fill(null).map((e, idx) => {
              if ([0, 3, 5, 7].includes(idx)) {
                return <>
                  <th className={`sticky-col-${idx}`}>COL{idx}</th>
                </>
              }
              return <>
                <th>COL{idx}</th>
              </>
            })
          }
        </tr>
        <tr>
          {
            Array(30).fill(null).map((e, idx) => <>
              <th>COL{idx}</th>
            </>)
          }
        </tr>
      </thead>

      <tbody >
        {Array(50).fill(null).map((e, rowDataIndex) => {
          return <>
            <tr
              className={[5].includes(rowDataIndex) ? 'bg-blue-500 sticky-row-1' : ''}
              style={[5].includes(rowDataIndex) ? { color: 'red', backgroundColor: 'red' } : {}}
            >
              {
                Array(30).fill(null).map(e => <>
                  <td><p>301.000</p></td>
                </>)
              }
            </tr></>
        })}

      </tbody>
    </table>
  </div>
};

export default Test;
