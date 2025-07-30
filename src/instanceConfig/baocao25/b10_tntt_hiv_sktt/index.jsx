import {
  getPickerStateByPath,
  useCorePickerState,
} from "@core/stateManage/corePickerState";
import { PERIOD_TYPE } from "@core/ui/picker/periodpicker/constant";
import { useEffect, useState } from "react";
import { ORG_GROUP } from "../p2ild/common/constant";
import Table_1 from "./Table_1";
import "./index.css";
import Table_2 from "./Table_2";
import Table_3 from "./Table_3";
import { findHeaderIndex } from "../p2ild/common/utils";
import {
  DATA_ELEMENTS_TABLE_1,
  DATA_ELEMENTS_TABLE_2,
  DATA_ELEMENTS_TABLE_3,
  LAST_VALUE_DATA_ELEMENTS,
} from "./constants";
import { useCoreMetaState } from "@core/stateManage/metadataState";
import { useShallow } from "zustand/react/shallow";
import { getLatestMonth } from "./utils";
const B10 = () => {
  const [data, setData] = useState();

  const { _get, setGlobalOverlay, me, setExcelOptions } = useCoreMetaState(
    useShallow((state) => ({
      _get: state._get,
      setGlobalOverlay: state.actions.setGlobalOverlay,
      setExcelOptions: state.actions.setExcelOptions,
      me: state.me,
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
      // PERIOD_TYPE.sixMonth,
      // PERIOD_TYPE.biWeek,
    ]);

    getPickerStateByPath("actions.setOrgPickerConfig")({
      orgGroupVisible: [
        ORG_GROUP.TUYEN_TRUNG_UONG,
        ORG_GROUP.TINH_DVHC,
        ORG_GROUP.XA_DVHC,
        ORG_GROUP.TUYEN_TINH,
        ORG_GROUP.XA_CSYT_KHAC,
        ORG_GROUP.XA,
      ],
      // levelsToHideIfEmpty: [3]
    });
    setExcelOptions({
      columnWidths: "10,50",
      excelFileName: "Báo cáo 10",
    });
  }, []);

  const getData = async () => {
    try {
      setGlobalOverlay({ isOpen: true });

      const isMultiplePe =
        corePicker.periodSelected.outputDataDhis2.split(";").length > 1;

      const lastPeriod = isMultiplePe
        ? corePicker.periodSelected.endDate
        : corePicker.periodSelected.type === "year"
        ? getLatestMonth(Number(corePicker.periodSelected.outputDataDhis2))
        : corePicker.periodSelected.outputDataDhis2;

      const [result, result1] = await Promise.all([
        _get(
          `/api/analytics?dimension=dx:${[
            ...DATA_ELEMENTS_TABLE_1,
            ...DATA_ELEMENTS_TABLE_2,
            ...DATA_ELEMENTS_TABLE_3,
          ]
            .filter((de) => !LAST_VALUE_DATA_ELEMENTS.includes(de))
            .join(";")},ou:${
            corePicker.orgSelected.id
          };LEVEL-1;LEVEL-2;LEVEL-3;LEVEL-4&filter=pe:${
            corePicker.periodSelected.outputDataDhis2
          }`
        ),
        _get(
          `/api/analytics?dimension=dx:${LAST_VALUE_DATA_ELEMENTS.join(
            ";"
          )},ou:${
            corePicker.orgSelected.id
          };LEVEL-1;LEVEL-2;LEVEL-3;LEVEL-4&filter=pe:${lastPeriod}`
        ),
      ]);
      const valueIndex = findHeaderIndex(result, "value");
      const dxIndex = findHeaderIndex(result, "dx");
      const ouIndex = findHeaderIndex(result, "ou");

      const dataResult = [...result.rows, ...result1.rows].map((row) => ({
        value: row[valueIndex],
        ou: row[ouIndex],
        dx: row[dxIndex],
      }));
      setData(dataResult);
    } catch (error) {
      console.error(error);
    } finally {
      setGlobalOverlay({ isOpen: false });
    }
  };

  useEffect(() => {
    if (corePicker && corePicker.pickCompleted) {
      getData();
    }
  }, [corePicker.pickCompleted]);

  return (
    <div className="font-serif h-full report-container  b10_tntt_hiv_sktt-report-container flex flex-col gap-6">
      <Table_1 data={data} />
      <Table_2 data={data} />
      <Table_3 data={data} />
    </div>
  );
};

export default B10;
