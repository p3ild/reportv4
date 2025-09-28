
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

    return <thead>
        <tr>
            <th {...excelConfig} className="sticky-col-0">COUNTRY</th>
            <th {...excelConfig} className="sticky-col-1" >REPORTSITE</th>
            <th {...excelConfig} className="sticky-col-2">YEAR</th>
            <th {...excelConfig} className="sticky-col-3">WEEK</th>
            <th {...excelConfig}>SPECIMENPROCESSED_INFLUENZA</th>
            <th {...excelConfig}>SPECIMENRECEIVED_INFLUENZA</th>
            <th {...excelConfig}>AH1N12009</th>
            <th {...excelConfig}>AH3</th>
            <th {...excelConfig}>AH5</th>
            <th {...excelConfig}>AH7N9</th>
            <th {...excelConfig}>AOTHERSUBTYPE</th>
            <th {...excelConfig}>ANOTSUBTYPED</th>
            <th {...excelConfig}>ANONSUBTYPABLE</th>
            <th {...excelConfig}>BYAMAGATA</th>
            <th {...excelConfig}>BVICTORIA</th>
            <th {...excelConfig}>BVICTORIA_2DEL</th>
            <th {...excelConfig}>BVICTORIA_3DEL</th>
            <th {...excelConfig}>BVICTORIA_UN_DEL</th>
            <th {...excelConfig}>BNOTDETERMINED</th>
            <th {...excelConfig}>INFLUENZANEGATIVE</th>

        </tr>
    </thead>
}