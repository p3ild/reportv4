import { useCorePickerState } from "@core/stateManage/corePickerState";
import { useCoreMetaState } from "@core/stateManage/metadataState";
import { useEffect, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import '../common/circular37-mui.css';
import { TableData } from "../common/ui/MultiTableUI";
import { optionPickerDate, orgPickerConfig } from "./constant";
import { useLoadData } from "./hook";
export const reportCode = "Báo cáo 11"
export const reportName = "TÌNH HÌNH MẮC VÀ TỬ VONG BỆNH TRUYỀN NHIỄM GÂY DỊCH"
export { orgPickerConfig };
export default () => {
    const [
        setExcelOptions,
        networkUtils
    ] = useCoreMetaState(useShallow(state => ([
        state.actions.setExcelOptions,
        state.networkUtils,
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

    useEffect(
        () => {
            setExcelOptions({
                columnWidths: '10,30',
            });
            setOrgPickerConfig(orgPickerConfig)
            setAllowPeriodTypes(optionPickerDate);
        },
        []
    )

    useEffect(() => {
        ; (async () => {
            if (!networkUtils) return;
        })();
    }, [networkUtils])

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
                    minWidth: '100%'
                }
            }
            }
        />
    }, [orgReportName, data, errors]);

    return <div className="report-container">
        {TableMemo}
    </div>
}