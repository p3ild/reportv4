import { useEffect, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { TableData } from "../common/ui/MultiTableUI";
import { useLoadData } from "./hook";
import '../common/circular37-mui.css'
import { optionPickerDate, orgPickerConfig } from "./constant";
import { useCorePickerState } from "@core/stateManage/corePickerState";
import { useCoreMetaState } from "@core/stateManage/metadataState";
import { Main } from "./test/main";
export const reportCode = "Báo cáo 4 (TYT)"
export const reportName = "HOẠT ĐỘNG CHĂM SÓC BÀ MẸ"
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
                columnWidths: [10, 30, undefined, 30].map(e => !e ? 10 : e).join(','),
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
                    // minWidth: '1000px',
                    // border: '1px solid black',
                    // width: '300% !important' 
                }
            }
            }
        />
    }, [orgReportName, data, errors]);

    return <div className="report-container">
        return <Main />
        {TableMemo}
    </div>
}