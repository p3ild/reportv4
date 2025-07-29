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
                    colSpan={totalCol || 14}
                    data-a-h="center" data-a-v="center" data-f-bold="true" style={{ width: "100vw", fontSize: "16px", border: 0, fontWeight: 800, textAlign: "center" }}>
                    <p>Báo cáo 7</p>
                </td>
            </tr>
            <tr>
                <td
                    colSpan={totalCol || 14}
                    data-a-h="center" data-a-v="center" style={{ width: "100vw", fontSize: "14px", border: 0, textAlign: "center", fontStyle: "italic" }}>
                    <p>Đơn vị: Tỉnh.../Xã.../Đơn vị được chọn....</p>
                </td>
            </tr>
            <tr>
                <td
                    colSpan={totalCol || 14}
                    data-a-h="center" data-a-v="center" data-f-bold="true" style={{ width: "100vw", fontSize: "16px", border: 0, fontWeight: 800, textAlign: "center" }}>
                    <p>HOẠT ĐỘNG KTHHGĐ VÀ PHÁ THAI</p>
                </td>
            </tr>
            <tr>
                <td
                    colSpan={totalCol || 14}
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
                className="sticky-col-0"
                rowSpan={4}
            >TT</th>
            <th {...excelConfig}
                className="sticky-col-1"
                rowSpan={4}
            >Tên cơ sở y tế</th>
            <th {...excelConfig}
                rowSpan={4}>Tổng số</th>
            <th {...excelConfig}
                colSpan={8}>Số mới thực hiện Biện pháp tránh thai hiện đại</th>
            <th {...excelConfig}
                colSpan={5}>Phá thai</th>
        </tr>
        <tr>

            <th {...excelConfig}
                colSpan={8}>Trong đó</th>
            <th {...excelConfig}
                rowSpan={3}>Tổng số</th>
            <th {...excelConfig}
                colSpan={4}>Trong đó</th>
        </tr>
        <tr>
            <th {...excelConfig}
                rowSpan={2}>DCTC</th>
            <th {...excelConfig}
                colSpan={3}>Thuốc TT</th>

            <th {...excelConfig}
                colSpan={2}>Triệt sản</th>
            <th {...excelConfig}
                rowSpan={2}>BCS</th>
            <th {...excelConfig}
                rowSpan={2}>Biện pháp khác</th>
            <th {...excelConfig}
                rowSpan={2}>Số phá thai ≤ 7 tuần</th>
            <th {...excelConfig}
                rowSpan={2}>Số phá thai trên 7- ≤12 tuần</th>
            <th {...excelConfig}
                rowSpan={2}>Số phá thai trên 12 tuần</th>
            <th {...excelConfig}
                rowSpan={2}>Trđ: Số phá thai mới VTN</th>
        </tr>
        <tr>
            <th {...excelConfig}>Thuốc tiêm</th>
            <th {...excelConfig}>Thuốc cấy</th>
            <th {...excelConfig}>Thuốc viên TT</th>
            <th {...excelConfig}>Tổng số</th>
            <th {...excelConfig}>Trđ: Nam</th>
        </tr>
        <tr>
            <th {...excelConfig}
                className="sticky-col-0 !font-normal"
                style={{
                    width: '30px'
                }}
            >1</th>
            <th {...excelConfig}
                style={{
                    width: '130px'
                }}
                className="sticky-col-1 !font-normal"
            >2</th>
            <th {...excelConfig} className={"!font-normal"}>3</th>
            <th {...excelConfig} className={"!font-normal"}>4</th>
            <th {...excelConfig} className={"!font-normal"}>5a</th>
            <th {...excelConfig} className={"!font-normal"}>5b</th>
            <th {...excelConfig} className={"!font-normal"}>5c</th>
            <th {...excelConfig} className={"!font-normal"}>6</th>
            <th {...excelConfig} className={"!font-normal"}>7</th>
            <th {...excelConfig} className={"!font-normal"}>8</th>
            <th {...excelConfig} className={"!font-normal"}>9</th>
            <th {...excelConfig} className={"!font-normal"}>10</th>
            <th {...excelConfig} className={"!font-normal"}>11</th>
            <th {...excelConfig} className={"!font-normal"}>12</th>
            <th {...excelConfig} className={"!font-normal"}>13</th>
            <th {...excelConfig} className={"!font-normal"}>14</th>
        </tr>
    </thead>
}

export function SectionHeaderTable1({
    period,
    notAvailable }) {
    return <>  </>
}