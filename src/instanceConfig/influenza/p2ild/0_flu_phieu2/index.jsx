import { useEffect, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { TableData } from "../common/ui/MultiTableUI";
import { useLoadData } from "./hook";
import '../common/circular37-mui.css'
import { optionPickerDate, orgPickerConfig } from "./constant";
import { useCorePickerState } from "@core/stateManage/corePickerState";
import { useCoreMetaState } from "@core/stateManage/metadataState";
import { format } from "date-fns";
export const reportCode = "Phiếu 2"
export const reportName = "BÁO CÁO ĐỊNH KỲ"
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
        dhis2Period,
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
                        style={{ border: 0 }} className=' mb-5 sticky left-0'>
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
                                    <p className="italic">Ngày kết xuất báo cáo: {format(new Date(), 'dd/MM/yyyy')} </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                }
            </div>

            <table>
                <thead>
                    <tr>
                        <th rowspan="3">Thời gian</th>
                        <th rowspan="3">Phân loại</th>
                        <th rowspan="3">Tổng số BN đến khám/nhập viện</th>
                        <th rowspan="3">Tổng số BN viêm đường hô hấp cấp tính đến
                            khám/nhập viện</th>
                        <th rowspan="3">Tổng số XN phát hiện cúm </th>
                        <th colspan="3">Tổng số XN cúm bằng test nhanh</th>
                        <th colspan="3">Tổng số XN cúm bằng Real-Time RT-PCR</th>
                        <th colspan="11">Kết quả XN các tác nhân đường hô hấp khác, bao
                            gồm cả vi rút
                            và vi khuẩn (g)</th>
                    </tr>
                    <tr>
                        <th rowspan="2">Âm tính</th>
                        <th rowspan="2">Cúm A</th>
                        <th rowspan="2">Cúm B</th>
                        <th rowspan="2">Âm tính</th>
                        <th rowspan="2">Cúm A</th>
                        <th rowspan="2">Cúm B</th>
                        <th colspan="2">SARS - CoV-2</th>
                        <th colspan="2">RSV</th>
                        <th colspan="2">Adeno</th>
                        <th colspan="2">Rhino</th>
                        <th colspan="3">Tác nhân nổi trội khác</th>
                    </tr>
                    <tr>
                        <th>Âm tính</th>
                        <th>Dương tính</th>
                        <th>Âm tính</th>
                        <th>Dương tính</th>
                        <th>Âm tính</th>
                        <th>Dương tính</th>
                        <th>Âm tính</th>
                        <th>Dương tính</th>

                        <th>Tên tác nhân</th>
                        <th>Âm tính</th>
                        <th>Dương tính</th>
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