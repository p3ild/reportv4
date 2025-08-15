import { findColStyleByKey } from "../../common/ui/RowRender";

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
        "data-b-a-s": 'thin'
    };
    return <thead>
        <tr>
            <th
                {...excelConfig}
                rowSpan={2}
                className="sticky-col-0"
                style={{ width: '30px' }}
            >TT</th>
            <th {...excelConfig}
                rowSpan={2}
                className="sticky-col-1"
                style={{
                    width: '130px !important',
                }}
            >Tên cơ sở</th>
            <th {...excelConfig}
                colSpan={2}>Tổng số</th>
            <th {...excelConfig}
                colSpan={2}>Băng huyết</th>
            <th {...excelConfig}
                colSpan={2}>Sản giật</th>
            <th {...excelConfig}
                colSpan={2}>Uốn ván sơ sinh</th>
            <th {...excelConfig}
                colSpan={2}>Vỡ tử cung</th>
            <th {...excelConfig}
                colSpan={2}>Nhiễm trùng sau đẻ</th>
            <th {...excelConfig}
                colSpan={2}>Phá thai</th>
            <th {...excelConfig}
                colSpan={2}>Khác</th>
        </tr>
        <tr>
            <th {...excelConfig}>{`Mắc`}</th>
            <th {...excelConfig}>{`Tử vong`}</th>
            <th {...excelConfig}>{`Mắc`}</th>
            <th {...excelConfig}>{`Tử vong`}</th>
            <th {...excelConfig}>{`Mắc`}</th>
            <th {...excelConfig}>{`Tử vong`}</th>
            <th {...excelConfig}>{`Mắc`}</th>
            <th {...excelConfig}>{`Tử vong`}</th>
            <th {...excelConfig}>{`Mắc`}</th>
            <th {...excelConfig}>{`Tử vong`}</th>
            <th {...excelConfig}>{`Mắc`}</th>
            <th {...excelConfig}>{`Tử vong`}</th>
            <th {...excelConfig}>{`Mắc`}</th>
            <th {...excelConfig}>{`Tử vong`}</th>
            <th {...excelConfig}>{`Mắc`}</th>
            <th {...excelConfig}>{`Tử vong`}</th>

        </tr>
        <tr>
            <th {...excelConfig}
                className="sticky-col-0 col-no"
            >1</th>
            <th {...excelConfig}
                className="sticky-col-1 col-no"
            >2</th>
            <th data-a-h="center" data-a-v="middle" data-a-wrap="true" data-b-a-s='thin' className={"col-no"}>3</th>
            <th data-a-h="center" data-a-v="middle" data-a-wrap="true" data-b-a-s='thin' className={"col-no"}>4</th>
            <th data-a-h="center" data-a-v="middle" data-a-wrap="true" data-b-a-s='thin' className={"col-no"}>5</th>
            <th data-a-h="center" data-a-v="middle" data-a-wrap="true" data-b-a-s='thin' className={"col-no"}>6</th>
            <th data-a-h="center" data-a-v="middle" data-a-wrap="true" data-b-a-s='thin' className={"col-no"}>7</th>
            <th data-a-h="center" data-a-v="middle" data-a-wrap="true" data-b-a-s='thin' className={"col-no"}>8</th>
            <th data-a-h="center" data-a-v="middle" data-a-wrap="true" data-b-a-s='thin' className={"col-no"}>9</th>
            <th data-a-h="center" data-a-v="middle" data-a-wrap="true" data-b-a-s='thin' className={"col-no"}>10</th>
            <th data-a-h="center" data-a-v="middle" data-a-wrap="true" data-b-a-s='thin' className={"col-no"}>11</th>
            <th data-a-h="center" data-a-v="middle" data-a-wrap="true" data-b-a-s='thin' className={"col-no"}>12</th>
            <th data-a-h="center" data-a-v="middle" data-a-wrap="true" data-b-a-s='thin' className={"col-no"}>13</th>
            <th data-a-h="center" data-a-v="middle" data-a-wrap="true" data-b-a-s='thin' className={"col-no"}>14</th>
            <th data-a-h="center" data-a-v="middle" data-a-wrap="true" data-b-a-s='thin' className={"col-no"}>15</th>
            <th data-a-h="center" data-a-v="middle" data-a-wrap="true" data-b-a-s='thin' className={"col-no"}>16</th>
            <th data-a-h="center" data-a-v="middle" data-a-wrap="true" data-b-a-s='thin' className={"col-no"}>17</th>
            <th data-a-h="center" data-a-v="middle" data-a-wrap="true" data-b-a-s='thin' className={"col-no"}>18</th>
        </tr>
    </thead>
}

export function SectionHeaderTable1({
    period,
    notAvailable }) {
    return <>  </>
}