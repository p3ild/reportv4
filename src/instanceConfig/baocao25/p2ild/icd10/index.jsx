import { useEffect, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { TableData } from "../common/ui/MultiTableUI";
import { useLoadData } from "./hook";
import '../common/circular37-mui.css'
import { optionPickerDate, orgPickerConfig } from "./constant";
import { useCorePickerState } from "@core/stateManage/corePickerState";
import { useCoreMetaState } from "@core/stateManage/metadataState";
import { format } from "date-fns";
export const reportCode = "Báo cáo ICD10"
export const reportName = "Báo cáo ICD10"
export { orgPickerConfig };
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
        corePicker,
        setAllowPeriodTypes,
        setOrgPickerConfig
    ] = useCorePickerState(
        useShallow(state => ([
            state.corePicker,
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
                columnWidths: '10,30',
                // excelFileName: reportCode.toLocaleLowerCase().replace(/ /g, '_')
            });
            setOrgPickerConfig(orgPickerConfig)
            setAllowPeriodTypes(optionPickerDate);


        },
        []
    )

    let totalCol = 20;

    return <div key={corePicker?.pickCompleted} className="report-container">
        <div class="table-content">
            <div id='printing' align='center'>
                <div id='downloadExcel'>
                    <div id='formreport'>
                        <div class="table-content">
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
                                            <p>Đơn vị báo cáo: {orgReportName}</p>
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
                                            <p>Báo cáo {dhis2Period}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            colSpan={totalCol}
                                            data-a-h="center" data-a-v="center" data-f-bold="true" style={{ width: "100vw", fontSize: "16px", border: 0, fontWeight: 800, textAlign: "center" }}>
                                            <p className="italic">Ngày kết xuất báo cáo: {format(new Date(), 'dd/MM/yyyy')} - Nguồn dữ liệu: Phần mềm Thống kê y tế</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <table id="bch" border="1px" class="mainTable" cellspacing="0" cellpadding="0" width="100%">
                                <thead>
                                    <tr>
                                        <th align="center" rowspan="4">STT</th>
                                        <th align="center" rowspan="4">
                                            <strong>Tên bệnh / nhóm bệnh</strong>
                                        </th>
                                        <th align="center" rowspan="4">Mã ICD 10 </th>
                                        <th align="center" rowspan="2" colspan="6">Tại khoa khám bệnh </th>
                                        <th align="center" colspan="10">Điều trị nội trú </th>
                                        <th align="center" rowspan="4">Số trường hợp tử vong được cấp giấy báo tử </th>
                                    </tr>
                                    <tr>
                                        <th align="center" colspan="6">Tổng số </th>
                                        <th align="center" colspan="4">Trong đó TE &lt; 15 tuổi </th>
                                    </tr>
                                    <tr>
                                        <th align="center" rowspan="2">Tổng số </th>
                                        <th align="center" colspan="5">Trong đó </th>
                                        <th align="center" colspan="2">Mắc</th>
                                        <th align="center" colspan="2">BN nặng xin về </th>
                                        <th align="center" colspan="2">Số tử vong </th>
                                        <th align="center" colspan="2">Mắc</th>
                                        <th align="center" colspan="2">Số tử vong </th>
                                    </tr>
                                    <tr>
                                        <th align="center">Nữ</th>
                                        <th align="center">TE &lt; 15 </th>
                                        <th align="center">BN nặng xin về </th>
                                        <th align="center">Tử vong trước viện </th>
                                        <th align="center">Tử vong tại viện </th>
                                        <th align="center">TS</th>
                                        <th align="center">Nữ</th>
                                        <th align="center">TS</th>
                                        <th align="center">Nữ</th>
                                        <th align="center">TS</th>
                                        <th align="center">Nữ</th>
                                        <th align="center">TS</th>
                                        <th align="center">&lt; 5 tuổi </th>
                                        <th align="center">TS</th>
                                        <th align="center">&lt; 5 tuổi </th>
                                    </tr>
                                </thead>
                                <tbody id="tableICD">
                                    <tr>
                                        <td align="center">
                                            <em>1</em>
                                        </td>
                                        <td align="center">
                                            <em>2</em>
                                        </td>
                                        <td align="center">
                                            <em>3</em>
                                        </td>
                                        <td align="center">
                                            <em>4</em>
                                        </td>
                                        <td align="center">
                                            <em>5</em>
                                        </td>
                                        <td align="center">
                                            <em>6</em>
                                        </td>
                                        <td align="center">
                                            <em>7</em>
                                        </td>
                                        <td align="center">
                                            <em>8</em>
                                        </td>
                                        <td align="center">
                                            <em>9</em>
                                        </td>
                                        <td align="center">
                                            <em>10</em>
                                        </td>
                                        <td align="center">
                                            <em>11</em>
                                        </td>
                                        <td align="center">
                                            <em>12</em>
                                        </td>
                                        <td align="center">
                                            <em>13</em>
                                        </td>
                                        <td align="center">
                                            <em>14</em>
                                        </td>
                                        <td align="center">
                                            <em>15</em>
                                        </td>
                                        <td align="center">
                                            <em>16</em>
                                        </td>
                                        <td align="center">
                                            <em>17</em>
                                        </td>
                                        <td align="center">
                                            <em>18</em>
                                        </td>
                                        <td align="center">
                                            <em>19</em>
                                        </td>
                                        <td align="center">
                                            <em>20</em>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div >
}