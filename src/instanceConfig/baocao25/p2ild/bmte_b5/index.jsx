import { useEffect, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { useCoreMetaState } from "../../../../core/stateManage/metadataState";
import { TableData } from "../common/ui/MultiTableUI";
import { useLoadData } from "./hook";
import '../common/circular37-mui.css'
import { optionPickerDate, orgPickerConfig } from "./constant";
import { useCorePickerState } from "../../../../core/stateManage/corePickerState";
export const reportCode = "Báo cáo 5"
export const reportName = "TÌNH HÌNH MẮC VÀ TỬ VONG DO TAI BIẾN SẢN KHOA"
export default () => {
    const [
        setAllowPeriodTypes,
        setOrgPickerConfig
    ] = useCorePickerState(
        useShallow(state => ([
            state.actions.setAllowPeriodTypes,
            state.actions.setOrgPickerConfig
        ])));

    const [
        setExcelOptions,
    ] = useCoreMetaState(useShallow(state => ([
        state.actions.setExcelOptions,
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
                    // width: '100%',
                    minWidth: '2000px',
                    // border: '1px solid black',
                    // width: '300% !important' 
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