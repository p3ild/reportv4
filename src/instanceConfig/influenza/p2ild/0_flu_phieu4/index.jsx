import { useEffect, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { TableData } from "../common/ui/MultiTableUI";
import { useLoadData } from "./hook";
import '../common/circular37-mui.css'
import { optionPickerDate, orgPickerConfig } from "./constant";
import { useCorePickerState } from "@core/stateManage/corePickerState";
import { useCoreMetaState } from "@core/stateManage/metadataState";
import { format } from "date-fns";
export const reportCode = "Phiếu 4"
export const reportName = "BÁO CÁO QUÝ/NĂM"
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
        const totalCol = 22
        return <div key={data} className="report-container">
            <div className="sticky left-0 !w-full">
                {
                    <table
                        style={{ border: 0, width: "100vw" }} className=' mb-5 sticky left-0'>
                        <tbody>
                            {reportCode && <tr>
                                <td style={{ width: "100vw", fontSize: "16px", border: 0, textAlign: "left" }}
                                >
                                    <p>{reportCode || ''}</p>
                                </td>
                            </tr>}
                            <tr>
                                <td
                                    colSpan={totalCol}
                                    style={{ width: "100vw", fontSize: "16px", border: 0, textAlign: "left" }}>
                                    <p className="cursor-pointer" onClick={() => getPickerStateByPath("actions.openCorePicker")(true, [SECTIONS.ORG_UNIT])}>Đơn vị báo cáo: {orgReportName}</p>
                                </td>
                            </tr>
                            <tr>
                                <td
                                    colSpan={totalCol}
                                    data-a-h="center" data-a-v="center" data-f-bold="true" style={{ width: "100vw", fontSize: "16px", border: 0, fontWeight: 800, textAlign: "center" }}>
                                    <p>{reportName?.toUpperCase()}</p></td>
                            </tr>
                            <tr>
                                <td
                                    colSpan={totalCol}
                                    data-a-h="center" data-a-v="center" data-f-bold="true" style={{ width: "100vw", fontSize: "16px", border: 0, fontWeight: 800, textAlign: "center" }}>
                                    <p className="cursor-pointer" onClick={() => getPickerStateByPath("actions.openCorePicker")(true, [SECTIONS.PERIOD])}>Báo cáo {dhis2Period}</p>
                                </td>
                            </tr>
                            <tr>
                                <td
                                    colSpan={totalCol}
                                    data-a-h="center" data-a-v="center" data-f-bold="true" style={{ width: "100vw", fontSize: "16px", border: 0, fontWeight: 800, textAlign: "center" }}>
                                    <p className="italic">Ngày kết xuất báo cáo: {format(new Date(), 'dd/MM/yyyy')}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                }
            </div>
            <table style={{ width: "100%" }}>
                <thead>
                    <tr>
                        <th rowspan="3">Tuần</th>
                        <th rowspan="3">Tổng số mẫu đã xét nghiệm cúm</th>
                        <th rowspan="2" colspan="2">Tổng số mẫu cúm âm tính</th>
                        <th colspan="18">Số mẫu cúm dương tính theo phân týp</th>
                    </tr>
                    <tr>
                        <th colspan="2">B(Yamagata)</th>
                        <th colspan="2">B(Victoria)</th>
                        <th colspan="2">B(Chưa xác định)</th>
                        <th colspan="2">A(H1N1pdm09)</th>
                        <th colspan="2">A(H3N2)</th>
                        <th colspan="2">A(H5)</th>
                        <th colspan="2">A(H7)</th>
                        <th colspan="2">A(chưa xác định)</th>
                        <th colspan="2">Vi rút cúm khác (ghi rõ)</th>
                    </tr>
                    <tr>
                        <th>n</th>
                        <th>%</th>
                        <th>n</th>
                        <th>%</th>
                        <th>n</th>
                        <th>%</th>
                        <th>n</th>
                        <th>%</th>
                        <th>n</th>
                        <th>%</th>
                        <th>n</th>
                        <th>%</th>
                        <th>n</th>
                        <th>%</th>
                        <th>n</th>
                        <th>%</th>
                        <th>n</th>
                        <th>%</th>
                        <th>n</th>
                        <th>%</th>
                    </tr>

                </thead>
                <tbody>
                    <tr id="tb1ColumnIncrise">
                        {Array(22).fill(0).map((e, idx) => <th>{idx + 1}</th>)}
                    </tr>
                </tbody>
            </table>
        </div>
    }, [orgReportName, data, errors])
    return TableMemo
}