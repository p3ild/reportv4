import { useEffect, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { TableData } from "../common/ui/MultiTableUI";
import { useLoadData } from "./hook";
import '../common/circular37-mui.css'
import { optionPickerDate, orgPickerConfig } from "./constant";
import { useCorePickerState } from "@core/stateManage/corePickerState";
import { useCoreMetaState } from "@core/stateManage/metadataState";
export const reportCode = "Báo cáo 7"
export const reportName = "HOẠT ĐỘNG KHHGĐ VÀ PHÁ THAI"
export default () => {
    const [
        instanceTarget,
        networkUtils,
        setExcelOptions,
    ] = useCoreMetaState(useShallow(state => ([
        state.instanceTarget,
        state.networkUtils,
        state.actions.setExcelOptions,
    ])));

    const [
        setAllowPeriodTypes,
        setOrgPickerConfig
    ] = useCorePickerState(
        useShallow(state => ([

            state.actions.setAllowPeriodTypes,
            state.actions.setOrgPickerConfig
        ])));


    const {
        data,
        customData,
        orgReportName,
        errors,
        dhis2Period
    } = useLoadData({ reportCode });

    // let approvalHook = useApproval();

    useEffect(
        () => {
            setExcelOptions({
                // excelOnlyTable: true,
                excelFileName: reportCode.toLocaleLowerCase().replace(/ /g, '_')
            });
            setOrgPickerConfig(orgPickerConfig)
            setAllowPeriodTypes(optionPickerDate);
        },
        []
    )

    const TableMemo = useMemo(() => {
        // return <></>
        return <TableData
            {
            ...{
                errors,
                reportName,
                reportCode,
                customData,
                orgReportName,
                dhis2Period,
                data,
                style: {
                    width: '120%',
                    // minWidth: '1300px',
                }
            }
            }
        >
        </TableData>
    }, [orgReportName, data, errors]);

    return <div className="report-container">
        {TableMemo}
    </div>
}