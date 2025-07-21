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
                    colSpan={totalCol || 17}
                    data-a-h="center" data-a-v="center" data-f-bold="true" style={{ width: "100vw", fontSize: "16px", border: 0, fontWeight: 800, textAlign: "center" }}>
                    <p>Báo cáo 6</p>
                </td>
            </tr>
            <tr>
                <td
                    colSpan={totalCol || 17}
                    data-a-h="center" data-a-v="center" style={{ width: "100vw", fontSize: "14px", border: 0, textAlign: "center", fontStyle: "italic" }}>
                    <p>Đơn vị: Tỉnh.../Xã.../Đơn vị được chọn....</p>
                </td>
            </tr>
            <tr>
                <td
                    colSpan={totalCol || 17}
                    data-a-h="center" data-a-v="center" data-f-bold="true" style={{ width: "100vw", fontSize: "16px", border: 0, fontWeight: 800, textAlign: "center" }}>
                    <p>HOẠT ĐỘNG KHÁM, CHỮA PHỤ KHOA VÀ SÀNG LỌC UNG THƯ CỔ TỬ CUNG</p>
                </td>
            </tr>
            <tr>
                <td
                    colSpan={totalCol || 17}
                    data-a-h="center" data-a-v="center" style={{ width: "100vw", fontSize: "16px", border: 0, textAlign: "center" }}>
                    <p>Báo cáo tháng.....năm.....</p>
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
                {...findColStyleByKey({ listColumnConfig, key: 'stt' })}
            >TT</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                rowSpan={2}
                {...findColStyleByKey({ listColumnConfig, key: 'orgName' })}
            >Tên cơ sở y tế</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                rowSpan={2}>Tổng số lượt khám phụ khoa (khám bệnh)</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                rowSpan={2}>Tổng số lượt khám phụ khoa (khám dự phòng - sàng lọc)</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                rowSpan={2}>Tổng số lượt điều trị phụ khoa</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                rowSpan={2}>Số điều trị GM</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                rowSpan={2}>Số điều trị lậu</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                rowSpan={2}>Số được đốt điện/áp lạnh</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                rowSpan={2}>Số được thực hiện LEEP</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                rowSpan={2}>Số được khỏi chữa CTC</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                rowSpan={2}>Số lượt được thực hiện</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                colSpan={2}>VIA/VILI</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                colSpan={2}>Xét nghiệm tế bào học</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                colSpan={2}>Xét nghiệm HPV</th>
        </tr>
        <tr>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>Số (+) VIA/VILI</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>Số nghỉ ngơi K</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>Số lượt được xét nghiệm</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>Số lượt có KQ bất thường</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>Số lượt được xét nghiệm</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>Số HPV (+)</th>
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
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>4</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>5</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>6</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>7</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>8</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>9</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>10</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>11</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>12</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>13</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>14</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>15</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>16</th>
        </tr>
    </thead>
}

export function SectionHeaderTable1({
    period,
    notAvailable }) {
    return <>  </>
}