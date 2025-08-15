import { useEffect, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { TableData } from "../common/ui/MultiTableUI";
import { useLoadData } from "./hook";
import '../common/circular37-mui.css'
import { optionPickerDate, orgPickerConfig } from "./constant";
import { getPickerStateByPath, useCorePickerState } from "@core/stateManage/corePickerState";
import { getCoreMetaStateByPath, useCoreMetaState } from "@core/stateManage/metadataState";
import { APPROVAL_TYPE, ButtonApproval } from "@core/network/ApprovalUtils";
import { getApprovalStateByPath } from "@core/stateManage/approvalState";
export const reportCode = "Báo cáo 4"
export const reportName = "HOẠT ĐỘNG CHĂM SÓC BÀ MẸ"
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
    const orgTestApprovalLevel3 = [
        "HVmCafOLKm7",

    ]
    const orgTestApprovalLevel4 = [
        'bKwZ9PZbUeg',//Điểm trạm 1 Nà Tăm
        'KUGyHiitCy6'//Trạm Y tế xã Bản Bo 
    ]

    useEffect(() => {
        ; (async () => {
            if (!networkUtils) return;
            // let approvalUtils = await getCoreMetaStateByPath('networkUtils.getApprovalUtils')();
            // approvalUtils.addGroupApproval({
            //     key: "LEVEL3",
            //     ds: ['H4WdjchZhmF'],
            //     pe: ['202501'],
            //     org: orgTestApprovalLevel3
            // })
            // approvalUtils.addGroupApproval({
            //     key: "LEVEL4",
            //     ds: ['H4WdjchZhmF'],
            //     pe: ['202501'],
            //     org: orgTestApprovalLevel4
            // })
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
                    minWidth: '4000px',
                    // border: '1px solid black',
                    // width: '300% !important' 
                }
            }
            }
        />
    }, [orgReportName, data, errors]);

    return <div className="report-container">
        {TableMemo}
    </div>
}