import { useEffect, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { useLoadData } from "./hook";
import '../common/circular37-mui.css'
import { optionPickerDate } from "./constant";
import { useCorePickerState } from "@core/stateManage/corePickerState";
import { useCoreMetaState } from "@core/stateManage/metadataState";
import { format } from "date-fns";
import { Tabs } from "antd";
import { getCustomReportStateByPath } from "@core/stateManage/customState";
export const reportCode = "BÁO CÁO TÌNH HÌNH TỬ VONG TỪ CỘNG ĐỒNG"
export const reportName = "BÁO CÁO TÌNH HÌNH TỬ VONG TỪ CỘNG ĐỒNG"
export default () => {
    const [
        setExcelOptions,
    ] = useCoreMetaState(useShallow(state => ([
        state.actions.setExcelOptions,
    ])));

    const [
        corePicker,
        setAllowPeriodTypes,
        setCorePicker
    ] = useCorePickerState(
        useShallow(state => ([
            state.corePicker,
            state.actions.setAllowPeriodTypes,
            state.actions.setCorePicker,
        ])));


    const {
        orgReportName,
        dhis2Period
    } = useLoadData({ reportCode });

    // let approvalHook = useApproval();

    useEffect(
        () => {
            setExcelOptions({
                columnWidths: '10,30',
            });
            setAllowPeriodTypes(optionPickerDate);
        },
        []
    )

    let totalCol = 30;

    return <div className="report-container">
        <Tabs
            items={
                [
                    {
                        key: 'queryByEventDate',
                        label: 'Dữ liệu theo ngày ghi sổ',
                        value: 'queryByEventDate'
                    },
                    {
                        key: 'queryByDeathDate',
                        label: 'Dữ liệu theo ngày tử vong',
                        value: 'queryByDeathDate'
                    }
                ]
            }
            onChange={(key) => {
                getCustomReportStateByPath('actions.addValue')('queryType', key);
                setCorePicker({
                    pickCompleted: Math.random()
                })
            }}
        />
        <div key={corePicker?.pickCompleted} className="table-content">
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

                            <table id='bch' >
                                <thead>
                                    <tr>
                                        <th rowSpan="2"><strong>Mã VN</strong></th>
                                        <th rowSpan="2">Tên bệnh</th>
                                        <th rowSpan="2">Mã ICD 10</th>
                                        <th colSpan="2">Tử vong chung</th>
                                        <th colSpan="2">{`Từ 0- < 28 ngày tuổi`}</th>
                                        <th colSpan="2">{`Từ 28 ngày tuổi - < 1 tuổi`}</th>
                                        <th colSpan="2">{`Từ 1- < 5 tuổi`}</th>
                                        <th colSpan="2">{`Từ 5- < 10 tuổi`}</th>
                                        <th colSpan="2">{`Từ 10- < 15 tuổi`}</th>
                                        <th colSpan="2">{`Từ 15- < 20 tuổi`}</th>
                                        <th colSpan="2">{`Từ 20- < 30 tuổi`}</th>
                                        <th colSpan="2">{`Từ 30- < 40 tuổi`}</th>
                                        <th colSpan="2">{`Từ 40- < 50 tuổi`}</th>
                                        <th colSpan="2">{`Từ 50- < 60 tuổi`}</th>
                                        <th colSpan="2">{`Từ 60- < 70 tuổi`}</th>
                                        <th colSpan="2">{`>= 70`}</th>
                                        <th rowSpan="2">TV mẹ</th>
                                    </tr>
                                    <tr>
                                        <th>Tổng số</th>
                                        <th>Nữ</th>
                                        <th>Tổng số</th>
                                        <th>Nữ</th>
                                        <th>Tổng số</th>
                                        <th>Nữ</th>
                                        <th>Tổng số</th>
                                        <th>Nữ</th>
                                        <th>Tổng số</th>
                                        <th>Nữ</th>
                                        <th>Tổng số</th>
                                        <th>Nữ</th>
                                        <th>Tổng số</th>
                                        <th>Nữ</th>
                                        <th>Tổng số</th>
                                        <th>Nữ</th>
                                        <th>Tổng số</th>
                                        <th>Nữ</th>
                                        <th>Tổng số</th>
                                        <th>Nữ</th>
                                        <th>Tổng số</th>
                                        <th>Nữ</th>
                                        <th>Tổng số</th>
                                        <th>Nữ</th>
                                        <th>Tổng số</th>
                                        <th>Nữ</th>
                                    </tr>
                                </thead>
                                <tbody id="tableICD">

                                    <tr>
                                        <td>1</td>
                                        <td>2</td>
                                        <td>3</td>
                                        <td>4</td>
                                        <td>5</td>
                                        <td>6</td>
                                        <td>7</td>
                                        <td>8</td>
                                        <td>9</td>
                                        <td>10</td>
                                        <td>11</td>
                                        <td>12</td>
                                        <td>13</td>
                                        <td>14</td>
                                        <td>15</td>
                                        <td>16</td>
                                        <td>17</td>
                                        <td>18</td>
                                        <td>19</td>
                                        <td>20</td>
                                        <td>21</td>
                                        <td>22</td>
                                        <td>23</td>
                                        <td>24</td>
                                        <td>25</td>
                                        <td>26</td>
                                        <td>27</td>
                                        <td>28</td>
                                        <td>29</td>
                                        <td>30</td>
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