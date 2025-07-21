import { Divider } from "antd";
import { format, parse } from "date-fns"
import { BreakLine } from "../../common/ui/MultiTableUI";
import { findColStyleByKey } from "../../common/ui/RowRender"

export function ReportHeader({ reportCode, reportName, totalCol, orgReportName, dhis2Period, customData }) {
    let period = dhis2Period.split(' ');
    period.splice(period.length - 2, 1); period = period.join(' ')
    return <>
        <table style={{ border: 0 }} className='mb-5'>
            <tr>
                <td
                    colSpan={totalCol || 10}
                    data-a-h="center" data-a-v="center" data-f-bold="true" style={{ width: "100vw", fontSize: "16px", border: 0, fontWeight: 800, textAlign: "center" }}>
                    <p>{reportName}</p>
                </td>
            </tr>
            <tr>
                <td
                    colSpan={totalCol || 10}
                    data-a-h="center" data-a-v="center" style={{ width: "100vw", fontSize: "16px", border: 0, textAlign: "center" }}>
                    <p>Kỳ báo cáo: {period}</p>
                </td>
            </tr>

        </table>
    </>
}

export function HeaderUILayoutTable1({ listColumnConfig }) {
    return <thead>
        <tr>
            <th
                data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                rowSpan={2}
                // sticky-col={0}
                // className="sticky-col-0"
                {...findColStyleByKey({ listColumnConfig, key: 'stt' })}
            >TT</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                rowSpan={2}
                // sticky-col={1}
                {...findColStyleByKey({ listColumnConfig, key: 'orgName' })}
            >Tên cơ sở</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                colSpan={2}>PN mới có thai</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                colSpan={2}>PN có thai</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                colSpan={2}>Số khám thai</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                rowSpan={2}>Tổng số phụ nữ đẻ</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                colSpan={25}>Trong đó</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                colSpan={3}>CS tại nhà sau sinh</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                rowSpan={2}>Số ca tử vong mẹ</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                rowSpan={2}>Số ca tử vong mẹ được thẩm định</th>
        </tr>
        <tr>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Tổng số`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Trđ Vị thành niên`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Tổng số`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Trđ Vị thành niên`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Tổng số`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Trđ Số lượt XN protein niệu`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Số đẻ VTN `}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Số đẻ là người DTTS`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Số đẻ được quản lý thai`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Số đẻ được tiêm  UV đủ mũi`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Số đẻ được KT ≥ 4 lần/3 TK`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Số PN đẻ  DTTS được KT ≥4 lần/3 TK`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Số PN đẻ được XN VGB khi MT`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Số đẻ được XN VGB khi CD`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Số có KQ XN VGB (+)`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Số đẻ được XN GM khi MT`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Số đẻ được XN GM khi CD`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Số đẻ có KQ XN GM (+)`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Số đc XN HIV trước & trong lần MT này`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Số được XN HIV khi CD`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Số có KQ KĐ nhiễm HIV trong Tkỳ MT`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Số có KQ khẳng định nhiễm HIV`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Số PN đẻ HIV (+) được điều trị ARV`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Số đẻ được XN đường huyết`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Số đẻ có KQ XN ĐHcao hơn trị số bt`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Số PN đẻ được can thiệp FX/GH`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Số PN được mổ đẻ`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Số PN đẻ ngoài CSYT`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Số PN đẻ được NV Y tế đỡ`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Số PN đẻ được NV có kỹ năng đỡ`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Số trẻ được cấp giấy chứng sinh`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Trong vòng 6 tuần đầu`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Trđ: Tuần đầu`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Trđ: Từ tuần 2 đến hết 6 tuần`}</th>
        </tr>
        <tr>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                {...findColStyleByKey({ listColumnConfig, key: 'stt' })}
            >1</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                {...findColStyleByKey({ listColumnConfig, key: 'orgName' })}
            >2</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>3a</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>3b</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>4a</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>4b</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>5</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>6</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>7</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>8a</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>8b</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>8c</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>8d</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>9a</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>9b</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>10a</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>10b</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>10c</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>11a</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>11b</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>11c</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>12a</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>12b</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>13a</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>13b</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>14</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>15a</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>15b</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>16</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>17</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>18a</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>18b</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>18c</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>19</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>20</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>21a</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>21b</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>22a</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>22b</th>
        </tr>
    </thead>
}

export function SectionHeaderTable1({
    period,
    notAvailable }) {
    return <>  </>
}