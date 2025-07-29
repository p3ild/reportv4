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
    const excelConfig = {
        "data-a-h": "center",
        "data-a-v": "middle",
        "data-f-bold": "true",
        "data-a-wrap": "true",
        "data-b-a-s": 'thin',
    }
    return <>
        <thead>
            <tr>
                <th
                    {...excelConfig}
                    rowSpan={2}
                    className="sticky-col-0"
                    style={{
                        width: '50px'
                    }}
                >TT</th>
                <th {...excelConfig}
                    rowSpan={2}
                    style={{
                        width: '700px'
                    }}
                    className="sticky-col-1"
                >Tên chỉ tiêu</th>
                <th {...excelConfig}
                    rowSpan={2}
                    colSpan={2}
                    style={{
                        width: '200px'
                    }}
                >Tổng số (TYT + ngoài CSYT)</th>
                <th {...excelConfig}
                    colSpan={4}
                    style={{
                        width: '200px'
                    }}
                >Trong đó</th>
            </tr>
            <tr>
                <th colSpan={2}>Tại TYT</th>
                <th colSpan={2}>CSYT khác</th>
            </tr>
            <tr>
                <th className="sticky-col-0 !font-normal">1</th>
                <th className="sticky-col-1 !font-normal">2</th>
                <th
                    className="!font-normal"
                    colSpan={2}
                    style={{
                        width: '400px'
                    }}
                >3</th>
                <th
                    className="!font-normal"
                    colSpan={2}
                    style={{
                        width: '400px'
                    }}
                >4</th>
                <th
                    className="!font-normal"
                    colSpan={2}
                    style={{
                        width: '400px'
                    }}
                >5</th>
            </tr>
        </thead>
    </>
}

export function SectionHeaderTable1({
    period,
    notAvailable }) {
    return <>  </>
}