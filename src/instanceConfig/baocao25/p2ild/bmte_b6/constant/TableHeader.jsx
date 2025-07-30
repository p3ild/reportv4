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
    const excelConfig = {
        "data-a-h": "center",
        "data-a-v": "middle",
        "data-f-bold": "true",
        "data-a-wrap": "true",
        "data-b-a-s": 'thin',
    };
    return <thead>
        <tr>
            <th
                {...excelConfig}
                rowSpan={2}
                className="sticky-col-0"
                style={{
                    width: '30px'
                }}
            >TT</th>
            <th {...excelConfig}
                rowSpan={2}
                className="sticky-col-1"
                style={{
                    width: '130px'
                }}
            >Tên cơ sở y tế</th>
            <th {...excelConfig}
                rowSpan={2}>Tổng số lượt khám phụ khoa (khám bệnh)</th>
            <th {...excelConfig}
                rowSpan={2}>Tổng số lượt khám phụ khoa (khám dự phòng - sàng lọc)</th>
            <th {...excelConfig}
                rowSpan={2}>Tổng số lượt điều trị phụ khoa</th>
            <th {...excelConfig}
                rowSpan={2}>Số điều trị GM</th>
            <th {...excelConfig}
                rowSpan={2}>Số điều trị lậu</th>
            <th {...excelConfig}
                rowSpan={2}>Số được đốt điện/áp lạnh</th>
            <th {...excelConfig}
                rowSpan={2}>Số được thực hiện LEEP</th>
            <th {...excelConfig}
                rowSpan={2}>Số được khỏi chữa CTC</th>
            <th {...excelConfig}
                rowSpan={2}>Số lượt được thực hiện</th>
            <th {...excelConfig}
                colSpan={2}>VIA/VILI</th>
            <th {...excelConfig}
                colSpan={2}>Xét nghiệm tế bào học</th>
            <th {...excelConfig}
                colSpan={2}>Xét nghiệm HPV</th>
        </tr>
        <tr>
            <th {...excelConfig}>Số (+) VIA/VILI</th>
            <th {...excelConfig}>Số nghỉ ngơi K</th>
            <th {...excelConfig}>Số lượt được xét nghiệm</th>
            <th {...excelConfig}>Số lượt có KQ bất thường</th>
            <th {...excelConfig}>Số lượt được xét nghiệm</th>
            <th {...excelConfig}>Số HPV (+)</th>
        </tr>
        <tr>
            <th {...excelConfig}
                className="sticky-col-0"
            >1</th>
            <th {...excelConfig}
                className="sticky-col-1"
            >2</th>
            <th {...excelConfig} className={"!font-normal"}>3a</th>
            <th {...excelConfig} className={"!font-normal"}>3b</th>
            <th {...excelConfig} className={"!font-normal"}>4</th>
            <th {...excelConfig} className={"!font-normal"}>5</th>
            <th {...excelConfig} className={"!font-normal"}>6</th>
            <th {...excelConfig} className={"!font-normal"}>7</th>
            <th {...excelConfig} className={"!font-normal"}>8</th>
            <th {...excelConfig} className={"!font-normal"}>9</th>
            <th {...excelConfig} className={"!font-normal"}>10</th>
            <th {...excelConfig} className={"!font-normal"}>11</th>
            <th {...excelConfig} className={"!font-normal"}>12</th>
            <th {...excelConfig} className={"!font-normal"}>13</th>
            <th {...excelConfig} className={"!font-normal"}>14</th>
            <th {...excelConfig} className={"!font-normal"}>15</th>
            <th {...excelConfig} className={"!font-normal"}>16</th>
        </tr>
    </thead>
}

export function SectionHeaderTable1({
    period,
    notAvailable }) {
    return <>  </>
}