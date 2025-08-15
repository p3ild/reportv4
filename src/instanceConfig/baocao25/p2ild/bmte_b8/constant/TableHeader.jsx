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
                    data-a-h="center" data-a-v="center" data-f-bold="true"
                    style={{ width: "100vw", fontSize: "16px", border: 0, fontWeight: 800, textAlign: "center" }}>
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
                rowSpan={3}
            >TT</th>
            <th {...excelConfig}
                className="sticky-col-1"
                rowSpan={3}
            >Tên<br />cơ sở</th>
            <th {...excelConfig}
                colSpan={8}>Số trẻ đẻ ra sống</th>
            <th {...excelConfig}
                colSpan={3}>Số trẻ sơ sinh được cân</th>
            <th {...excelConfig}
                rowSpan={3}>Số trẻ được tiêm Vit K1</th>
            <th {...excelConfig}
                rowSpan={3}>Số được tiêm vắc xin Viêm gan B</th>
            <th {...excelConfig}
                rowSpan={3}>Số được tiêm vắc xin Viêm gan B trong 24 giờ đầu</th>
            <th {...excelConfig}
                rowSpan={3}>Số trẻ được sàng lọc sơ sinh</th>
            <th {...excelConfig}
                rowSpan={3}>Số trẻ sinh ra từ bà mẹ có HIV (+)</th>
            <th {...excelConfig}
                rowSpan={3}>Số trẻ sinh ra từ bà mẹ có HIV (+) được điều trị ARV</th>
            <th {...excelConfig}
                rowSpan={3}>Số TV thai nhi từ khi được 22 tuần tuổi đến khi đẻ</th>
            <th {...excelConfig}
                rowSpan={3}>Số TV trẻ {`<`}7 ngày tuổi</th>
            <th {...excelConfig}
                rowSpan={3}>Số TV trẻ {`<`}28 ngày tuổi</th>
            <th {...excelConfig}
                rowSpan={3}>Số TV trẻ {`<`}1 tuổi</th>
            <th {...excelConfig}
                rowSpan={3}>Số TV trẻ {`<`}1 tuổi là người DTTS</th>
            <th {...excelConfig}
                rowSpan={3}>Số TV trẻ {`<`}5 tuổi</th>
            <th {...excelConfig}
                rowSpan={3}>Số TV trẻ {`<`}5 tuổi là người DTTS</th>
        </tr>
        <tr>
            <th {...excelConfig}
                rowSpan={2}>Tổng số</th>
            <th {...excelConfig}
                colSpan={7}>Trong đó</th>
            <th {...excelConfig}
                rowSpan={2}>Tổng số</th>
            <th {...excelConfig}
                colSpan={2}>Trong đó</th>
        </tr>
        <tr>
            <th {...excelConfig}>Trđ: Nữ</th>
            <th {...excelConfig}>Số trẻ đẻ ra sống là người DTTS</th>
            <th {...excelConfig}>Số trẻ được CS EENC sau đẻ thường</th>
            <th {...excelConfig}>Số trẻ được CS EENC sau mổ lấy thai</th>
            <th {...excelConfig}>Số trẻ được chăm sóc Kan-ga-roo</th>
            <th {...excelConfig}>Số trẻ đẻ non</th>
            <th {...excelConfig}>Số trẻ đẻ bị ngạt</th>
            <th {...excelConfig}>Số {`<`} 2500 gram</th>
            <th {...excelConfig}>Số {`>`} 4000 gram</th>
        </tr>
        <tr>
            <th className="sticky-col-0 col-no" style={{ width: '30px' }}>1</th>
            <th className="sticky-col-1 col-no" style={{ width: '130px' }}>2</th>
            <th className={"col-no"}>3</th>
            <th className={"col-no"}>3a</th>
            <th className={"col-no"}>3b</th>
            <th className={"col-no"}>3c</th>
            <th className={"col-no"}>3d</th>
            <th className={"col-no"}>3e</th>
            <th className={"col-no"}>3f</th>
            <th className={"col-no"}>3g</th>
            <th className={"col-no"}>4</th>
            <th className={"col-no"}>4a</th>
            <th className={"col-no"}>4b</th>
            <th className={"col-no"}>5</th>
            <th className={"col-no"}>6</th>
            <th className={"col-no"}>6a</th>
            <th className={"col-no"}>7</th>
            <th className={"col-no"}>8</th>
            <th className={"col-no"}>8a</th>
            <th className={"col-no"}>9</th>
            <th className={"col-no"}>10</th>
            <th className={"col-no"}>11</th>
            <th className={"col-no"}>12</th>
            <th className={"col-no"}>12a</th>
            <th className={"col-no"}>13</th>
            <th className={"col-no"}>13a</th>
        </tr>
    </thead>
}

export function SectionHeaderTable1({
    period,
    notAvailable }) {
    return <>  </>
}