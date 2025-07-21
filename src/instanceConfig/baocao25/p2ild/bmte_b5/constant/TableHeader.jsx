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
                colSpan={2}>Tổng số</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                colSpan={2}>Băng huyết</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                colSpan={2}>Sản giật</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                colSpan={2}>Uốn ván sơ sinh</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                colSpan={2}>Vỡ tử cung</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                colSpan={2}>Nhiễm trùng sau đẻ</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                colSpan={2}>Phá thai</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                colSpan={2}>Khác</th>
        </tr>
        <tr>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Mắc`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Tử vong`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Mắc`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Tử vong`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Mắc`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Tử vong`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Mắc`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Tử vong`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Mắc`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Tử vong`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Mắc`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Tử vong`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Mắc`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Tử vong`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Mắc`}</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>{`Tử vong`}</th>

        </tr>
        <tr>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                {...findColStyleByKey({ listColumnConfig, key: 'stt' })}
            >1</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                {...findColStyleByKey({ listColumnConfig, key: 'orgName' })}
            >2</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>3</th>
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
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>17</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>18</th>
        </tr>
    </thead>
}

export function SectionHeaderTable1({
    period,
    notAvailable }) {
    return <>  </>
}