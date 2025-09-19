import { useEffect, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { TableData } from "../common/ui/MultiTableUI";
import { useLoadData } from "./hook";
import '../common/circular37-mui.css'
import { optionPickerDate, orgPickerConfig } from "./constant";
import { useCorePickerState } from "@core/stateManage/corePickerState";
import { useCoreMetaState } from "@core/stateManage/metadataState";
import { format } from "date-fns";
export const reportCode = "Báo cáo 4"
export const reportName = "Báo cáo hoạt động chăm sóc sức khỏe bà mẹ và trẻ em (TYT)"
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


    useLoadData({ reportCode });

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
    const attrTableCol1 = {
        className: '!text-left'
    }
    const attrDisable = {
        className: '!bg-gray-500'
    }

    const totalCol = 10
    return corePicker.periodSelected && <div key={corePicker?.pickCompleted} className="report-container">
        <div id='printing' align='center'>
            <div id='downloadExcel'>
                <div id='formreport'>
                    <div className="table-content">
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
                                        <p>Đơn vị báo cáo: {corePicker.orgSelected?.displayName}</p>
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
                                        <p>Báo cáo {[
                                            corePicker.periodSelected?.labelStartDate,
                                            corePicker.periodSelected?.labelEndDate ? `${corePicker.periodSelected?.labelEndDate}` : undefined
                                        ]
                                            .filter(e => e)
                                            .join(' đến ')}</p>
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
                        <table width='100%' border='1' class='mainTable my-4' >
                            <thead>
                                <tr>
                                    <td colSpan={10} className="font-bold text-xl">{`I. Chăm sóc sức khỏe bà mẹ`.toUpperCase()}</td>
                                </tr>
                                <tr>
                                    <th rowSpan="2">
                                        <strong>TT</strong>
                                    </th>
                                    <th rowSpan="2">
                                        <strong>Tên chỉ tiêu</strong>
                                    </th>
                                    <th colSpan="2" rowSpan="2">
                                        <strong>Tổng số</strong>
                                    </th>
                                    <th colSpan="4" rowSpan="1">
                                        <strong>Trong đó</strong>
                                    </th>
                                    <th align="center" rowSpan="2" colSpan="2">CSYT khác</th>
                                </tr>
                                <tr>
                                    <th align="center" colSpan="2">Tại TYT</th>
                                    <th align="center" colSpan="2">Ngoài CSYT(tại nhà, trên đường...)</th>

                                </tr>
                                <tr>
                                    <th class="stt_col">1</th>
                                    <th class="stt_col">2</th>
                                    <th class="stt_col" colSpan="2"
                                    >3
                                    </th>
                                    <th class="stt_col" colSpan="2"
                                    >4
                                    </th>
                                    <th class="stt_col" colSpan="2"
                                    >5
                                    </th>
                                    <th class="stt_col" colSpan="2"
                                    >6
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <td class="stt_row">1</td>
                                    <td {...attrTableCol1}>Tổng số phụ nữ có thai</td>
                                    <td colSpan="2">
                                        <div id="cnzF1Wsyll7-HllvX50cXC0-val" />
                                    </td>
                                    <td {...attrDisable} colSpan="2"></td>
                                    <td colSpan="2" {...attrDisable}>
                                    </td>
                                    <td colSpan="2" {...attrDisable}>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="stt_row">1.1</td>
                                    <td {...attrTableCol1}>Trđ: vị thành niên</td>
                                    <td colSpan="2">
                                        <div id="EfO3KDWNMde-HllvX50cXC0-val" />
                                    </td>
                                    <td {...attrDisable} colSpan="2"></td>
                                    <td {...attrDisable} colSpan="2"></td>
                                    <td {...attrDisable} colSpan="2"></td>
                                </tr>
                                <tr>
                                    <td class="stt_row">2</td>
                                    <td {...attrTableCol1}>Phụ nữ có thai <em>(Số phụ nữ
                                        mới có thai
                                        trong kỳ
                                        báo
                                        cáo)</em></td>
                                    <td colSpan="2">
                                        <div id="WpK3CA1GiFB-HllvX50cXC0-val" />
                                    </td>
                                    <td {...attrDisable} colSpan="2"></td>
                                    <td {...attrDisable} colSpan="2"></td>
                                    <td {...attrDisable} colSpan="2"></td>
                                </tr>
                                <tr>
                                    <td>2.1</td>
                                    <td {...attrTableCol1}>Trđ: vị thành niên</td>
                                    <td colSpan="2">
                                        <div id="q9TgXtGb497-HllvX50cXC0-val" />
                                    </td>
                                    <td {...attrDisable} colSpan="2"></td>
                                    <td {...attrDisable} colSpan="2"></td>
                                    <td {...attrDisable} colSpan="2"></td>
                                </tr>
                                <tr>
                                    <td class="stt_row">3</td>
                                    <td {...attrTableCol1}>Tổng số lượt khám thai</td>
                                    <td colSpan="2">
                                        <div id="totalJTBxLXQRhKp" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="JTBxLXQRhKp-IEweiFaTu3a-val" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="JTBxLXQRhKp-N13A1fU7DAu-val" />
                                    </td>
                                    <td {...attrDisable} colSpan="2"></td>
                                </tr>
                                <tr>
                                    <td class="stt_row">4</td>
                                    <td {...attrTableCol1}>Trđ: Số lượt xét nghiệm protein niệu</td>
                                    <td colSpan="2">
                                        <div id="totalYgF4A2VhFm9" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="YgF4A2VhFm9-IEweiFaTu3a-val" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="YgF4A2VhFm9-N13A1fU7DAu-val" />
                                    </td>
                                    <td colSpan="2">
                                    </td>
                                </tr>
                                <tr class="tag">
                                    <td class="stt_row">5</td>
                                    <td {...attrTableCol1}>Số phụ nữ đẻ </td>
                                    <td colSpan="2">
                                        <div id="totalfzWfb5NkUXR" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="fzWfb5NkUXR-IEweiFaTu3a-val" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="fzWfb5NkUXR-N13A1fU7DAu-val" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="zc1XKRhd9f5-HllvX50cXC0-val" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>5.1a</td>
                                    <td {...attrTableCol1}>Trđ: - Số đẻ tuổi vị thành niên </td>
                                    <td colSpan="2">
                                        <div id="totalLSlYBmMhM5E" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="LSlYBmMhM5E-IEweiFaTu3a-val" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="LSlYBmMhM5E-N13A1fU7DAu-val" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="HuCDOiwdL6c-HllvX50cXC0-val" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>5.1b</td>
                                    <td {...attrTableCol1}> - Số đẻ là người dân tộc
                                        thiểu số</td>
                                    <td colSpan="2">
                                        <div id="totalmYN2cR5UuWb" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="mYN2cR5UuWb-IEweiFaTu3a-val" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="mYN2cR5UuWb-N13A1fU7DAu-val" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="TxLjw6hd0yt-HllvX50cXC0-val" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>5.1c</td>
                                    <td {...attrTableCol1}> - Số đẻ được quản lý
                                        thai</td>
                                    <td colSpan="2">
                                        <div id="totalNix9Ht2BTot" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="Nix9Ht2BTot-IEweiFaTu3a-val" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="Nix9Ht2BTot-N13A1fU7DAu-val" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="e6zJo1kcJxJ-HllvX50cXC0-val" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>5.1d</td>
                                    <td {...attrTableCol1}> - Số đẻ được tiêm phòng
                                        uốn ván đủ mũi</td>
                                    <td colSpan="2">
                                        <div id="totaleW3TnNPwPBA" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="eW3TnNPwPBA-IEweiFaTu3a-val" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="eW3TnNPwPBA-N13A1fU7DAu-val" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="cfrapgQemM1-HllvX50cXC0-val" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>5.2</td>
                                    <td {...attrTableCol1}> - Số được khám thai ≥4 lần
                                        trong 3 thời kỳ </td>
                                    <td colSpan="2">
                                        <div id="totalRb7YZo0877Z" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="Rb7YZo0877Z-IEweiFaTu3a-val" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="Rb7YZo0877Z-N13A1fU7DAu-val" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="A6NjontTGPD-HllvX50cXC0-val" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>5.2a</td>
                                    <td {...attrTableCol1}> - Số PN dân tộc thiểu số được
                                        khám thai ≥4 lần trong 3 thời kỳ</td>
                                    <td colSpan="2">
                                        <div id="totalVov1ZBQDPGA" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="Vov1ZBQDPGA-IEweiFaTu3a-val" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="Vov1ZBQDPGA-N13A1fU7DAu-val" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="PMY8GxXQ6g9-HllvX50cXC0-val" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>5.3</td>
                                    <td {...attrTableCol1}> - Số được xét nghiệm viêm gan
                                        B trong lần mang thai này</td>
                                    <td colSpan="2">
                                        <div id="totalWf8ywubJAEC" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="Wf8ywubJAEC-IEweiFaTu3a-val" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="Wf8ywubJAEC-N13A1fU7DAu-val" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="RbCdwT3sPMN-HllvX50cXC0-val" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>5.3a</td>
                                    <td {...attrTableCol1}> - Số được xét nghiệm viêm gan
                                        B khi mang thai</td>
                                    <td colSpan="2">
                                        <div id="totalMZEU8meruHx" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="MZEU8meruHx-IEweiFaTu3a-val" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="MZEU8meruHx-N13A1fU7DAu-val" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="PIq2vxNHxFO-HllvX50cXC0-val" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>5.3b</td>
                                    <td {...attrTableCol1}> - Số được xét nghiệm viêm gan
                                        B trong chuyển dạ</td>
                                    <td colSpan="2">
                                        <div id="totalQqPcpJ7yLhR" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="QqPcpJ7yLhR-IEweiFaTu3a-val" />
                                    </td>
                                    <td colSpan="2"></td>
                                    <td colSpan="2">
                                        <div id="gSjiM6ajL5h-HllvX50cXC0-val" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>5.3c</td>
                                    <td {...attrTableCol1}> - Số có kết quả xét
                                        nghiệm viêm gan B dương tính</td>
                                    <td colSpan="2">
                                        <div id="totalPZkzL05NpNg" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="PZkzL05NpNg-IEweiFaTu3a-val" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="PZkzL05NpNg-N13A1fU7DAu-val" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="LpJcOfvhmqf-HllvX50cXC0-val" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>5.4</td>
                                    <td {...attrTableCol1}> - Số được xét nghiệm Giang mai
                                        trong lần mang thai này</td>
                                    <td colSpan="2">
                                    </td>
                                    <td colSpan="2">
                                        
                                    </td>
                                    <td colSpan="2">
                                        
                                    </td>
                                    <td colSpan="2">

                                    </td>
                                </tr>
                                <tr>
                                    <td>5.4a</td>
                                    <td {...attrTableCol1}> - Số được xét nghiệm giang mai
                                        khi mang thai</td>
                                    <td colSpan="2">
                                        <div id="totalniRcB5DsPI9" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="niRcB5DsPI9-IEweiFaTu3a-val" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="niRcB5DsPI9-N13A1fU7DAu-val" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="GP67Tp2Qdjx-HllvX50cXC0-val" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>5.4b</td>
                                    <td {...attrTableCol1}> - Số được xét nghiệm giang mai
                                        trong chuyển dạ</td>
                                    <td colSpan="2">
                                        <div id="totalCaUTXHA9zK5" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="CaUTXHA9zK5-IEweiFaTu3a-val" />
                                    </td>
                                    <td colSpan="2"></td>
                                    <td colSpan="2">
                                        <div id="QDuMzfdC2CE-HllvX50cXC0-val" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>5.4c</td>
                                    <td {...attrTableCol1}> - Số có kết quả xét
                                        nghiệm giang mai dương tính</td>
                                    <td colSpan="2">
                                        <div id="totalSZpvMstnLjc" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="SZpvMstnLjc-IEweiFaTu3a-val" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="SZpvMstnLjc-N13A1fU7DAu-val" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="FcjVomauoY9-HllvX50cXC0-val" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>5.5a</td>
                                    <td {...attrTableCol1}> - Số xét nghiệm HIV trước và
                                        trong mang thai lần này </td>
                                    <td colSpan="2">
                                        <div id="totalDZ4gp6GzBkJ" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="DZ4gp6GzBkJ-IEweiFaTu3a-val" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="DZ4gp6GzBkJ-N13A1fU7DAu-val" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="BaDOQgmTTwR-HllvX50cXC0-val" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>5.5b</td>
                                    <td {...attrTableCol1}> - Số được xét nghiệm HIV trong
                                        chuyển dạ</td>
                                    <td colSpan="2">
                                        <div id="totalckrGFqdrq1O" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="ckrGFqdrq1O-IEweiFaTu3a-val" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="ckrGFqdrq1O-N13A1fU7DAu-val" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="jPjyJGM0Xpe-HllvX50cXC0-val" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>5.6</td>
                                    <td {...attrTableCol1}> - Số có kết quả khẳng định
                                        nhiễm HIV </td>
                                    <td colSpan="2">
                                        <div id="totalcdnqvBRbLNA" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="cdnqvBRbLNA-IEweiFaTu3a-val" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="cdnqvBRbLNA-N13A1fU7DAu-val" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="xYF6wnkt6v8-HllvX50cXC0-val" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>5.7</td>
                                    <td {...attrTableCol1}> Trđ: Số được khẳng định
                                        trong thời kỳ mang thai </td>
                                    <td colSpan="2">
                                        <div id="totalJpn3u1SCEI3" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="Jpn3u1SCEI3-IEweiFaTu3a-val" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="Jpn3u1SCEI3-N13A1fU7DAu-val" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="M2YPAEsSP7B-HllvX50cXC0-val" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>5.8</td>
                                    <td {...attrTableCol1}> - Số được XN đường huyết khi
                                        mang thai</td>
                                    <td colSpan="2">
                                        <div id="totalXGxKRz2pyqF" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="XGxKRz2pyqF-IEweiFaTu3a-val" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="XGxKRz2pyqF-N13A1fU7DAu-val" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="AZaIUVETowy-HllvX50cXC0-val" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>5.8a</td>
                                    <td {...attrTableCol1}> Trđ: Số có KQ XN đường huyết khi mang thai cao hơn trị số bình thường</td>
                                    <td colSpan="2">
                                        <div id="totalNveBdKInM5m" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="NveBdKInM5m-IEweiFaTu3a-val" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="NveBdKInM5m-N13A1fU7DAu-val" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="m4OMVZvniL2-HllvX50cXC0-val" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>5.9b</td>
                                    <td {...attrTableCol1}> - Số đẻ được cán bộ y tế
                                        đỡ</td>
                                    <td colSpan="2">
                                        <div id="totaltQG9ii5Zh1g" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="tQG9ii5Zh1g-IEweiFaTu3a-val" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="tQG9ii5Zh1g-N13A1fU7DAu-val" />
                                    </td>
                                    <td colSpan="2"></td>
                                </tr>
                                <tr>
                                    <td>5.9c</td>
                                    <td {...attrTableCol1}> - Số được cán bộ có kỹ năng
                                        đỡ </td>
                                    <td colSpan="2">
                                        <div id="totalj6cPf2NjluG" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="j6cPf2NjluG-IEweiFaTu3a-val" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="j6cPf2NjluG-N13A1fU7DAu-val" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="Nvx0MVk5sug-HllvX50cXC0-val" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td {...attrTableCol1}>Số được cấp giấy chứng sinh</td>
                                    <td colSpan="2">
                                        <div id="totalaTKuaZLHkMG" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="aTKuaZLHkMG-IEweiFaTu3a-val" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="aTKuaZLHkMG-N13A1fU7DAu-val" />
                                    </td>
                                    <td colSpan="2">
                                        <div id="Paf7Ct3jf17-HllvX50cXC0-val" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>7</td>
                                    <td {...attrTableCol1}>Tổng số bà mẹ/TSS được chăm sóc sau sinh tại nhà trong
                                        vòng 6 tuần sau khi rời CSYT, trong đó:</td>
                                    <td colSpan="2">
                                        <div id="indicatorOofwmXf2vAi" />
                                    </td>
                                    <td {...attrDisable} colSpan="2"></td>
                                    <td {...attrDisable} colSpan="2"></td>
                                    <td {...attrDisable} colSpan="2"></td>
                                </tr>
                                <tr>
                                    <td>8.1</td>
                                    <td {...attrTableCol1}      >Tổng số bà mẹ/TSS được chăm sóc tại nhà trong vòng 1
                                        tuần sau khi rời CSYT</td>
                                    <td colSpan="2">
                                        <div id="g8Rnn7j2ccS-HllvX50cXC0-val" />
                                    </td>
                                    <td {...attrDisable} colSpan="2"></td>
                                    <td {...attrDisable} colSpan="2"></td>
                                    <td {...attrDisable} colSpan="2"></td>
                                </tr>
                                <tr>
                                    <td>8.2</td>
                                    <td {...attrTableCol1}>Tổng số bà mẹ/TSS được chăm sóc từ tuần 2 đến hết 6 tuần
                                        sau khi rời CSYT</td>
                                    <td colSpan="2">
                                        <div id="ewHRN8vKSLo-HllvX50cXC0-val" />
                                    </td>
                                    <td {...attrDisable} colSpan="2"></td>
                                    <td {...attrDisable} colSpan="2"></td>
                                    <td {...attrDisable} colSpan="2"></td>
                                </tr>
                                <tr>
                                    <td class="stt_row">9 </td>
                                    <td {...attrTableCol1}>Số mắc và tử vong do tai biến sản khoa </td>
                                    <td>
                                        <div id="TongSoMacTBSKTotal"
                                            totaltype="dfid">
                                            Mắc</div>
                                    </td>
                                    <td>
                                        <div id="TongSoChetTBSKTotal"
                                            totaltype="dfid">
                                            TV</div>
                                    </td>
                                    <td>
                                        <div id="TongSoMacTBSKTotal"
                                            totaltype="dfid">
                                            Mắc</div>
                                    </td>
                                    <td>
                                        <div id="TongSoChetTBSKTotal"
                                            totaltype="dfid">
                                            TV</div>
                                    </td>
                                    <td>Mắc</td>
                                    <td>TV</td>
                                    <td colSpan="2" rowSpan="1"  {...attrDisable}>
                                    </td>
                                </tr>
                                <tr class="tag">
                                    <td>9.1</td>
                                    <td {...attrTableCol1}> Trđ: - Băng huyết </td>
                                    <td>
                                        <div id="totalsbyDKnwZcOy" />
                                    </td>
                                    <td>
                                        <div id="totalbp4fjBzE1sw" />
                                    </td>
                                    <td>
                                        <div id="sbyDKnwZcOy-IEweiFaTu3a-val" />
                                    </td>
                                    <td>
                                        <div id="bp4fjBzE1sw-IEweiFaTu3a-val" />
                                    </td>
                                    <td>
                                        <div id="sbyDKnwZcOy-N13A1fU7DAu-val" />
                                    </td>
                                    <td>
                                        <div id="bp4fjBzE1sw-N13A1fU7DAu-val" />
                                    </td>
                                    <td colSpan="2" rowSpan="1" {...attrDisable} >
                                    </td>
                                </tr>
                                <tr>
                                    <td>9.2</td>
                                    <td {...attrTableCol1}> - Sản giật
                                    </td>
                                    <td>
                                        <div id="totalwtfsRmDu2CP" />
                                    </td>
                                    <td>
                                        <div id="totalmLtnuPFSxxZ" />
                                    </td>
                                    <td>
                                        <div id="wtfsRmDu2CP-IEweiFaTu3a-val" />
                                    </td>
                                    <td>
                                        <div id="mLtnuPFSxxZ-IEweiFaTu3a-val" />
                                    </td>
                                    <td>
                                        <div id="wtfsRmDu2CP-N13A1fU7DAu-val" />
                                    </td>
                                    <td>
                                        <div id="mLtnuPFSxxZ-N13A1fU7DAu-val" />
                                    </td>
                                    <td colSpan="2" rowSpan="1"  {...attrDisable}>
                                    </td>
                                </tr>
                                <tr>
                                    <td>9.3</td>
                                    <td {...attrTableCol1}> - Uốn ván sơ sinh
                                    </td>
                                    <td>
                                        <div id="totaluK1n7dFEI1N" />
                                    </td>
                                    <td>
                                        <div id="totalWanOM8J3Suj" />
                                    </td>
                                    <td>
                                        <div id="uK1n7dFEI1N-IEweiFaTu3a-val" />
                                    </td>
                                    <td>
                                        <div id="WanOM8J3Suj-IEweiFaTu3a-val" />
                                    </td>
                                    <td>
                                        <div id="uK1n7dFEI1N-N13A1fU7DAu-val" />
                                    </td>
                                    <td>
                                        <div id="WanOM8J3Suj-N13A1fU7DAu-val" />
                                    </td>
                                    <td colSpan="2" rowSpan="1"  {...attrDisable}>
                                    </td>
                                </tr>
                                <tr>
                                    <td>9.4</td>
                                    <td {...attrTableCol1}      > - Vỡ tử cung
                                    </td>
                                    <td>
                                        <div id="totalCGEpgEX247O" />
                                    </td>
                                    <td>
                                        <div id="totalLxvbLJOjdg2" />
                                    </td>
                                    <td>
                                        <div id="CGEpgEX247O-IEweiFaTu3a-val" />
                                    </td>
                                    <td>
                                        <div id="LxvbLJOjdg2-IEweiFaTu3a-val" />
                                    </td>
                                    <td>
                                        <div id="CGEpgEX247O-N13A1fU7DAu-val" />
                                    </td>
                                    <td>
                                        <div id="LxvbLJOjdg2-N13A1fU7DAu-val" />
                                    </td>
                                    <td colSpan="2" rowSpan="1" {...attrDisable}>
                                    </td>
                                </tr>
                                <tr>
                                    <td>9.5</td>
                                    <td {...attrTableCol1}> - Nhiễm trùng
                                    </td>
                                    <td>
                                        <div id="totalDkAOzZslOSs" />
                                    </td>
                                    <td>
                                        <div id="totalYG7omyyd4PR" />
                                    </td>
                                    <td>
                                        <div id="DkAOzZslOSs-IEweiFaTu3a-val" />
                                    </td>
                                    <td>
                                        <div id="YG7omyyd4PR-IEweiFaTu3a-val" />
                                    </td>
                                    <td>
                                        <div id="DkAOzZslOSs-N13A1fU7DAu-val" />
                                    </td>
                                    <td>
                                        <div id="YG7omyyd4PR-N13A1fU7DAu-val" />
                                    </td>
                                    <td colSpan="2" rowSpan="1"  {...attrDisable}>
                                    </td>
                                </tr>
                                <tr>
                                    <td>9.6</td>
                                    <td {...attrTableCol1}> - Tai biến do phá
                                        thai </td>
                                    <td>
                                        <div id="totalcpaW1UIFvGp" />
                                    </td>
                                    <td>
                                        <div id="totalTSspKDE6jAN" />
                                    </td>
                                    <td>
                                        <div id="cpaW1UIFvGp-IEweiFaTu3a-val" />
                                    </td>
                                    <td>
                                        <div id="TSspKDE6jAN-IEweiFaTu3a-val" />
                                    </td>
                                    <td>
                                        <div id="cpaW1UIFvGp-N13A1fU7DAu-val" />
                                    </td>
                                    <td>
                                        <div id="TSspKDE6jAN-N13A1fU7DAu-val" />
                                    </td>
                                    <td colSpan="2" rowSpan="1"  {...attrDisable}>
                                    </td>
                                </tr>
                                <tr>
                                    <td>9.7</td>
                                    <td {...attrTableCol1}> - Tai biến khác
                                    </td>
                                    <td>
                                        <div id="totalDLsz1yBTbb7" />
                                    </td>
                                    <td>
                                        <div id="totalvFawHfMzRgI" />
                                    </td>
                                    <td>
                                        <div id="DLsz1yBTbb7-IEweiFaTu3a-val" />
                                    </td>
                                    <td>
                                        <div id="vFawHfMzRgI-IEweiFaTu3a-val" />
                                    </td>
                                    <td>
                                        <div id="DLsz1yBTbb7-N13A1fU7DAu-val" />
                                    </td>
                                    <td>
                                        <div id="vFawHfMzRgI-N13A1fU7DAu-val" />
                                    </td>
                                    <td colSpan="2" rowSpan="1"  {...attrDisable}>
                                    </td>
                                </tr>
                                <tr>
                                    <td>10</td>
                                    <td {...attrTableCol1}>Số ca tử vong mẹ</td>
                                    <td colSpan="2" rowSpan="1">
                                        <div id="totalfMyhbxbf6mU" />
                                    </td>
                                    <td colSpan="2" rowSpan="1">
                                        <div id="fMyhbxbf6mU-IEweiFaTu3a-val" />
                                    </td>
                                    <td colSpan="2" rowSpan="1">
                                        <div id="fMyhbxbf6mU-N13A1fU7DAu-val" />
                                    </td>
                                    <td colSpan="2"  {...attrDisable}>
                                    </td>
                                </tr>
                                <tr>
                                    <td>10.1</td>
                                    <td {...attrTableCol1}>Số ca tử vong mẹ được thẩm định</td>
                                    <td colSpan="2" rowSpan="1">
                                        <div id="totalFowjUrhGgEr" />
                                    </td>
                                    <td colSpan="2" rowSpan="1">
                                        <div id="FowjUrhGgEr-IEweiFaTu3a-val" />
                                    </td>
                                    <td colSpan="2" rowSpan="1">
                                        <div id="FowjUrhGgEr-N13A1fU7DAu-val" />
                                    </td>
                                    <td colSpan="2"  {...attrDisable}>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table width='100%' border='1' class='mainTable my-4' >
                            <thead>
                                <tr>
                                    <th colSpan={10} className='text-center text-xl'>
                                        {`II. Khám chữa phụ khoa, sàng lọc ung thư cổ tử cung,thực hiện BPTT và phá thai`.toUpperCase()}</th>
                                </tr>
                                <tr>
                                    <th rowSpan="2">
                                        <strong>TT</strong>
                                    </th>
                                    <th rowSpan="2">
                                        <strong>Tên chỉ tiêu</strong>
                                    </th>
                                    <th colSpan="1" rowSpan="2">
                                        <strong>Tổng số</strong>
                                    </th>
                                    <th colSpan="2" rowSpan="1">
                                        <strong>Trong đó</strong>
                                    </th>
                                </tr>
                                <tr>
                                    <th align="center" colSpan="1">Tại TYT</th>
                                    <th align="center" colSpan="1">Ngoài CSYT(tại nhà, trên đường...)</th>

                                </tr>
                                <tr>
                                    <th class="stt_col">1</th>
                                    <th class="stt_col">2</th>
                                    <th class="stt_col">3</th>
                                    <th class="stt_col">4</th>
                                    <th class="stt_col">5</th>
                                </tr>


                            </thead>
                            <tbody>

                                <tr>
                                    <td>1</td>
                                    <td {...attrTableCol1}>Tổng số lượt khám phụ khoa</td>
                                    <td>
                                        <div class="indicatorXSdJYlH8vwk" />
                                    </td>
                                    <td>
                                        <div class="indicatorXSdJYlH8vwk" />
                                    </td>
                                    <td colSpan="2"  {...attrDisable}> </td>
                                </tr>
                                <tr>
                                    <td>1.1</td>
                                    <td {...attrTableCol1}>Tr đó: - Số áp dụng VIA/VILI</td>
                                    <td>
                                        <div class="indicatorhXfYMmrISaf" />
                                    </td>
                                    <td>
                                        <div class="indicatorhXfYMmrISaf" />
                                    </td>
                                    <td colSpan="2"  {...attrDisable}> </td>
                                </tr>
                                <tr>
                                    <td>1.2</td>
                                    <td {...attrTableCol1}>
                                        + Số có kết quả dương tính</td>
                                    <td>
                                        <div class="indicatorratsfcVTp7F" />
                                    </td>
                                    <td>
                                        <div class="indicatorratsfcVTp7F" />
                                    </td>
                                    <td colSpan="2"  {...attrDisable}> </td>
                                </tr>
                                <tr>
                                    <td>1.3</td>
                                    <td {...attrTableCol1}>
                                        + Số có kết quả nghi ngờ</td>
                                    <td>
                                        <div class="indicatorswkskJJvLMp" />
                                    </td>
                                    <td>
                                        <div class="indicatorswkskJJvLMp" />
                                    </td>
                                    <td colSpan="2"  {...attrDisable}> </td>
                                </tr>
                                <tr>
                                    <td>1.4</td>
                                    <td {...attrTableCol1}> - Số được lấy
                                        mẫu bệnh phẩm gửi tuyến trên XN TB</td>
                                    <td>
                                        <div class="indicatorqydcnPEDbmB" />
                                    </td>
                                    <td>
                                        <div class="indicatorqydcnPEDbmB" />
                                    </td>
                                    <td colSpan="2"  {...attrDisable}> </td>
                                </tr>
                                <tr>
                                    <td>1.5</td>
                                    <td {...attrTableCol1}> - Số được lấy mẫu bệnh phẩm gửi tuyến trên XN HPV</td>
                                    <td>
                                        <div class="Kyc2UW89wVj-HllvX50cXC0-val" />
                                    </td>
                                    <td>
                                        <div class="Kyc2UW89wVj-HllvX50cXC0-val" />
                                    </td>
                                    <td colSpan="2"  {...attrDisable}> </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td {...attrTableCol1}>Tổng số lượt chữa phụ khoa</td>
                                    <td>
                                        <div class="indicatorsa492jWpjDf" />
                                    </td>
                                    <td>
                                        <div class="indicatorsa492jWpjDf" />
                                    </td>
                                    <td colSpan="2"  {...attrDisable}> </td>
                                </tr>
                                <tr>
                                    <td>2.2</td>
                                    <td {...attrTableCol1}>Tổng số lượt tiêm vắc xin HPV</td>
                                    <td>
                                        <div class="yaoNKUeOyvE-HllvX50cXC0-val" />
                                    </td>
                                    <td>
                                        <div class="yaoNKUeOyvE-HllvX50cXC0-val" />
                                    </td>
                                    <td colSpan="2"  {...attrDisable}> </td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td {...attrTableCol1}>Tổng số lượt người mới thực hiện các BPTT </td>
                                    <td>
                                        <div class="indicatorEbgigboTmrd" />
                                    </td>
                                    <td>
                                        <div class="indicatorEbgigboTmrd" />
                                    </td>
                                    <td colSpan="2"  {...attrDisable}> </td>
                                </tr>
                                <tr>
                                    <td>3.1 </td>
                                    <td {...attrTableCol1}>Tr đó:- Số mới đặt DCTC </td>
                                    <td>
                                        <div class="indicatorHIydN4UJex2" />
                                    </td>
                                    <td>
                                        <div class="indicatorHIydN4UJex2" />
                                    </td>
                                    <td colSpan="2"  {...attrDisable}> </td>
                                </tr>
                                <tr>
                                    <td>3.2</td>
                                    <td {...attrTableCol1}> - Số mới dùng
                                        thuốc tiêm tránh thai</td>
                                    <td>
                                        <div class="indicatorZ287TyXoKVB" />
                                    </td>
                                    <td>
                                        <div class="indicatorZ287TyXoKVB" />
                                    </td>
                                    <td colSpan="2"  {...attrDisable}> </td>
                                </tr>
                                <tr>
                                    <td>3.3</td>
                                    <td {...attrTableCol1}      > - Số mới dùng
                                        thuốc cấy tránh thai </td>
                                    <td>
                                        <div class="indicatoruRuorRx2UR1" />
                                    </td>
                                    <td>
                                        <div class="indicatoruRuorRx2UR1" />
                                    </td>
                                    <td colSpan="2"  {...attrDisable}> </td>
                                </tr>
                                <tr>
                                    <td>3.4</td>
                                    <td {...attrTableCol1}> - Số mới sử
                                        dụng thuốc viên tránh thai</td>
                                    <td>
                                        <div class="ojeJgOjf9vm-HllvX50cXC0-val" />
                                    </td>
                                    <td>
                                        <div class="ojeJgOjf9vm-HllvX50cXC0-val" />
                                    </td>
                                    <td colSpan="2"  {...attrDisable}> </td>
                                </tr>
                                <tr>
                                    <td>3.5 </td>
                                    <td {...attrTableCol1}> - Số mới triệt
                                        sản </td>
                                    <td>
                                        <div class="indicatorlvbITHwRkkg" />
                                    </td>
                                    <td>
                                        <div class="indicatorlvbITHwRkkg" />
                                    </td>
                                    <td colSpan="2"  {...attrDisable}> </td>
                                </tr>
                                <tr>
                                    <td>3.6</td>
                                    <td {...attrTableCol1}> Trđ:
                                        nam </td>
                                    <td>
                                        <div class="indicatorPsy27hX3MrZ" />
                                    </td>
                                    <td>
                                        <div class="indicatorPsy27hX3MrZ" />
                                    </td>
                                    <td colSpan="2"  {...attrDisable}> </td>
                                </tr>
                                <tr>
                                    <td>3.7</td>
                                    <td {...attrTableCol1}> - Số mới sử
                                        dụng bao cao su</td>
                                    <td>
                                        <div class="ycVdXnxxwHs-HllvX50cXC0-val" />
                                    </td>
                                    <td>
                                        <div class="ycVdXnxxwHs-HllvX50cXC0-val" />
                                    </td>
                                    <td colSpan="2"  {...attrDisable}> </td>
                                </tr>
                                <tr>
                                    <td>3.8</td>
                                    <td {...attrTableCol1}> - Số người mới thực hiện các BPTT hiện đại khác</td>
                                    <td>
                                        <div class="indicatorhoegsBrTcwt" />
                                    </td>
                                    <td>
                                        <div class="indicatorhoegsBrTcwt" />
                                    </td>
                                    <td colSpan="2"  {...attrDisable}> </td>
                                </tr>

                                <tr>
                                    <td>4 </td>
                                    <td {...attrTableCol1}>Tai biến sử
                                        dụng BPTT
                                    </td>
                                    <td>
                                        <div class="indicatorSP8fU9unOSC" />
                                    </td>
                                    <td>
                                        <div class="indicatorSP8fU9unOSC" />
                                    </td>
                                    <td colSpan="2"  {...attrDisable}> </td>
                                </tr>
                                <tr>
                                    <td>5 </td>
                                    <td {...attrTableCol1}>Số phá thai</td>
                                    <td>
                                        <div class="xR1SRHBmOSl-HllvX50cXC0-val" />
                                    </td>
                                    <td>
                                        <div class="xR1SRHBmOSl-HllvX50cXC0-val" />
                                    </td>
                                    <td colSpan="2"  {...attrDisable}> </td>
                                </tr>
                                <tr>
                                    <td>5.1</td>
                                    <td {...attrTableCol1}>{`Trđ: <=7 tuần`}</td>
                                    <td>
                                        <div class='hMHRO6boyNh-IEweiFaTu3a-val' />
                                    </td>
                                    <td>
                                        <div class='hMHRO6boyNh-IEweiFaTu3a-val' />
                                    </td>
                                    <td colSpan="2"  {...attrDisable}> </td>
                                </tr>
                                <tr>
                                    <td>5.2</td>
                                    <td {...attrTableCol1}> - Vị thành niên</td>
                                    <td>
                                        <div class='eqChBVhTqkF-IEweiFaTu3a-val' />
                                    </td>
                                    <td>
                                        <div class='eqChBVhTqkF-IEweiFaTu3a-val' />
                                    </td>
                                    <td colSpan="2"  {...attrDisable}> </td>
                                </tr>
                            </tbody>
                        </table>

                        <table width='100%' border='1' class='mainTable my-4' >
                            <thead>
                                <tr>
                                    <th colSpan={10} className='text-center text-xl'>
                                        {`III. Chăm sóc sức khỏe trẻ em`.toUpperCase()}</th>
                                </tr>
                                <tr>
                                    <th rowSpan="2">
                                        <strong>TT</strong>
                                    </th>
                                    <th rowSpan="2">
                                        <strong>Tên chỉ tiêu</strong>
                                    </th>
                                    <th colSpan="1" rowSpan="2">
                                        <strong>Tổng số</strong>
                                    </th>
                                    <th colSpan="2" rowSpan="1">
                                        <strong>Trong đó</strong>
                                    </th>
                                    <th align="center" rowSpan="2">CSYT khác</th>
                                </tr>
                                <tr>
                                    <th align="center" colSpan="1">Tại TYT</th>
                                    <th align="center" colSpan="1">Ngoài CSYT(tại nhà, trên đường...)</th>

                                </tr>
                                <tr>
                                    <th class="stt_col">1</th>
                                    <th class="stt_col">2</th>
                                    <th class="stt_col">3</th>
                                    <th class="stt_col">4</th>
                                    <th class="stt_col">5</th>
                                    <th class="stt_col">6</th>
                                </tr>

                            </thead>
                            <tbody>
                                <tr>
                                    <td class="stt_row">1 </td>
                                    <td {...attrTableCol1}>Trẻ đẻ ra sống </td>
                                    <td>
                                        <div id="totalhvS0ROXGv9e" />
                                    </td>
                                    <td>
                                        <div id="indicatorgZJ4tj8OMWF" />
                                    </td>
                                    <td>
                                        <div id="indicatorAtRPXxTrG3W" />
                                    </td>
                                    <td>
                                        <div id="totalEREAmT1IEt0" />
                                    </td>
                                </tr>
                                <tr>
                                    <td class="stt_row">1.1</td>
                                    <td {...attrTableCol1}>Tr đó: nam</td>
                                    <td>
                                        <div id="indicatorfdptEnfQIjQ" />
                                    </td>
                                    <td>
                                        <div id="hvS0ROXGv9e-HdSWnxLkSpK-val" />
                                    </td>
                                    <td>
                                        <div id="hvS0ROXGv9e-kqQCGrF7Cwh-val" />
                                    </td>
                                    <td>
                                        <div id="EREAmT1IEt0-NZTXFyz6GLm-val" />
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td {...attrTableCol1}>Tr đó: nữ </td>
                                    <td>
                                        <div id="indicatorsw4HsEooMSp" />
                                    </td>
                                    <td>
                                        <div id="hvS0ROXGv9e-hACnDcxd9Hv-val" />
                                    </td>
                                    <td>
                                        <div id="hvS0ROXGv9e-ShfX7e0nuja-val" />
                                    </td>
                                    <td>
                                        <div id="EREAmT1IEt0-GvoEANq375m-val" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>1.2</td>
                                    <td {...attrTableCol1}  >Trẻ đẻ ra sống là người dân tộc thiểu số</td>
                                    <td>
                                        <div id="totalezhAgYWPwre" />
                                    </td>
                                    <td>
                                        <div id="ezhAgYWPwre-IEweiFaTu3a-val">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="ezhAgYWPwre-N13A1fU7DAu-val">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="hrHMgwjc0s9-HllvX50cXC0-val">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="stt_row">2</td>
                                    <td {...attrTableCol1}>Số trẻ sơ sinh được chăm sóc thiết yếu sớm
                                        trong và ngay sau đẻ (EENC)</td>
                                    <td>
                                        <div id="totallHfpcZ01biD"> </div>
                                    </td>
                                    <td>
                                        <div id="lHfpcZ01biD-IEweiFaTu3a-val">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="lHfpcZ01biD-N13A1fU7DAu-val">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="FDTbZf4ZedQ-HllvX50cXC0-val">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="stt_row">2a</td>
                                    <td {...attrTableCol1}>Số trẻ sơ sinh được chăm sóc thiết yếu sớm
                                        trong và ngay sau đẻ thường (EENC sau đẻ thường)</td>
                                    <td>
                                        <div id="totald4iPeJgrz7K"></div>
                                    </td>
                                    <td>
                                        <div id="d4iPeJgrz7K-IEweiFaTu3a-val">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="d4iPeJgrz7K-N13A1fU7DAu-val">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="emBJLUOROR1-HllvX50cXC0-val">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="stt_row">2b</td>
                                    <td {...attrTableCol1}>Số trẻ sơ sinh được chăm sóc thiết yếu sớm
                                        trong và ngay sau đẻ mổ (EENC sau mổ lấy thai)</td>
                                    <td>
                                        <div id="totalmQ8QJXYcRFP"> </div>
                                    </td>
                                    <td>
                                        <div id="mQ8QJXYcRFP-IEweiFaTu3a-val">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="mQ8QJXYcRFP-N13A1fU7DAu-val">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="ScXGu9cpsqJ-HllvX50cXC0-val">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="stt_row">2c</td>
                                    <td {...attrTableCol1}>Số trẻ sơ sinh được chăm sóc Kangaroo</td>
                                    <td>
                                        <div id="totalmLlHmnCH4Nw">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="mLlHmnCH4Nw-IEweiFaTu3a-val">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="mLlHmnCH4Nw-N13A1fU7DAu-val">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="TW3GMpmBiDq-HllvX50cXC0-val">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="stt_row">3 </td>
                                    <td {...attrTableCol1}>Số trẻ đẻ non </td>
                                    <td>
                                        <div id="totalCjM6Xjwuohw">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="CjM6Xjwuohw-IEweiFaTu3a-val">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="CjM6Xjwuohw-N13A1fU7DAu-val">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="wyg61jfON6Y-HllvX50cXC0-val">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="stt_row">4 </td>
                                    <td {...attrTableCol1}>Số trẻ bị ngạt </td>
                                    <td>
                                        <div id="totalaos3iUZ9u9T">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="aos3iUZ9u9T-IEweiFaTu3a-val">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="aos3iUZ9u9T-N13A1fU7DAu-val">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="HiErmXLzqqT-HllvX50cXC0-val">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="stt_row">5 </td>
                                    <td {...attrTableCol1}      >Trẻ sơ sinh được cân </td>
                                    <td>
                                        <div id="totalRHsZDNIbPxi">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="RHsZDNIbPxi-IEweiFaTu3a-val">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="RHsZDNIbPxi-N13A1fU7DAu-val">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="kBsOZgPQvVN-HllvX50cXC0-val">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td {...attrTableCol1}>Trẻ sơ sinh có trọng lượng &lt; 2500 gram </td>
                                    <td>
                                        <div id="totalt82Gp0IG71J">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="t82Gp0IG71J-IEweiFaTu3a-val">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="t82Gp0IG71J-N13A1fU7DAu-val">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="xbY5B05iNrA-HllvX50cXC0-val">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="stt_row">7</td>
                                    <td {...attrTableCol1}>Trẻ sơ sinh có trọng lượng &gt; 4000 gram</td>
                                    <td>
                                        <div id="totalmUy244qjDuH">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="mUy244qjDuH-IEweiFaTu3a-val">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="mUy244qjDuH-N13A1fU7DAu-val">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="F2sgq3l9m1Q-HllvX50cXC0-val">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="stt_row">8.1</td>
                                    <td {...attrTableCol1}>Số được tiêm vitamin K1 </td>
                                    <td>
                                        <div id="totalK4iyoGAYqkP">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="K4iyoGAYqkP-IEweiFaTu3a-val">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="K4iyoGAYqkP-N13A1fU7DAu-val">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="MASGKcCBi5I-HllvX50cXC0-val">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="stt_row">8.2</td>
                                    <td {...attrTableCol1}>Số được tiêm vắc xin viêm gan B</td>
                                    <td>
                                        <div id="totalHXpr0QXWRmJ">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="HXpr0QXWRmJ-IEweiFaTu3a-val">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="HXpr0QXWRmJ-N13A1fU7DAu-val">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="Z0gXj8Qtph1-HllvX50cXC0-val">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="stt_row">8.3</td>
                                    <td {...attrTableCol1}>Số được tiêm vắc xin viêm gan B trong 24 giờ đầu
                                    </td>
                                    <td>
                                        <div id="totalklseO42Bsms">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="klseO42Bsms-IEweiFaTu3a-val">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="klseO42Bsms-N13A1fU7DAu-val">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="ML3GPrLYGeY-HllvX50cXC0-val">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="stt_row">9</td>
                                    <td {...attrTableCol1}>Tử vong thai nhi từ 22 tuần đến khi đẻ </td>
                                    <td>
                                        <div id="totalBArq67DfpRK">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="BArq67DfpRK-IEweiFaTu3a-val">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="BArq67DfpRK-N13A1fU7DAu-val">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="gO4scNKIWZf-HllvX50cXC0-val">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="stt_row">10</td>
                                    <td {...attrTableCol1}>Tử vong trẻ dưới 7 ngày tuổi</td>
                                    <td>
                                        <div id="totalSra1fElVxHA">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="Sra1fElVxHA-IEweiFaTu3a-val">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="Sra1fElVxHA-N13A1fU7DAu-val">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="eqxDWuHJzXS-HllvX50cXC0-val">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="stt_row">11</td>
                                    <td {...attrTableCol1}  >Tử vong trẻ dưới 28 ngày tuổi</td>
                                    <td>
                                        <div id="totallkWJaJx1oaM">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="lkWJaJx1oaM-IEweiFaTu3a-val">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="lkWJaJx1oaM-N13A1fU7DAu-val">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="OeMdOutMpVN-HllvX50cXC0-val">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="stt_row">12</td>
                                    <td {...attrTableCol1}>Tử vong trẻ dưới 1 tuổi</td>
                                    <td>
                                        <div id="totalwPlQmAEhVXa">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="wPlQmAEhVXa-IEweiFaTu3a-val">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="wPlQmAEhVXa-N13A1fU7DAu-val">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="otLlFWL8SSY-HllvX50cXC0-val">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="stt_row">12.1</td>
                                    <td {...attrTableCol1}>Tử vong trẻ dưới 1 tuổi là người dân tộc thiểu
                                        số</td>
                                    <td>
                                        <div id="totalQXPKZgJlnqM">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="QXPKZgJlnqM-IEweiFaTu3a-val">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="QXPKZgJlnqM-N13A1fU7DAu-val">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="zVD1j6iRT91-HllvX50cXC0-val">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="stt_row">13</td>
                                    <td {...attrTableCol1}>Tử vong trẻ dưới 5 tuổi</td>
                                    <td>
                                        <div id="totalUz0R3QwHrje">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="Uz0R3QwHrje-IEweiFaTu3a-val">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="Uz0R3QwHrje-N13A1fU7DAu-val">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="qfawD1Ln20x-HllvX50cXC0-val">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="stt_row">13.1</td>
                                    <td {...attrTableCol1}>Tử vong trẻ dưới 5 tuổi là người dân tộc thiểu
                                        số</td>
                                    <td>
                                        <div id="totalaxloWTL6DpA">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="axloWTL6DpA-IEweiFaTu3a-val">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="axloWTL6DpA-N13A1fU7DAu-val">
                                        </div>
                                    </td>
                                    <td>
                                        <div id="vIRRjad46tO-HllvX50cXC0-val">
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div >

}