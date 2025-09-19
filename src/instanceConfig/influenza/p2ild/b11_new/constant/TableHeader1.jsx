
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
const excelConfig = {
    "data-a-h": "center",
    "data-a-v": "middle",
    "data-f-bold": "true",
    "data-a-wrap": "true",
    "data-b-a-s": 'thin',
}
export function HeaderUILayoutTable1({ listColumnConfig }) {
    return <>
        <thead>
            <tr>
                <th
                    {...excelConfig}
                    rowSpan={3}
                    className="sticky-col-0"
                    style={{
                        width: '30px'
                    }}
                >TT</th>
                <th {...excelConfig}
                    rowSpan={3}
                    style={{
                        width: '200px'
                    }}
                    className="sticky-col-1"
                >Tên cơ sở</th>
                {
                    [
                        'Bạch hầu',
                        'Bệnh do liên cầu lợn ở người',
                        'Bệnh do vi rút Adeno',
                        'Cúm',
                        'Cúm A(H5N1)',
                        'Dại',
                        'Dịch hạch',
                        'Ho gà',
                        'Lỵ amíp',
                        'Lỵ trực trùng'
                    ].map((x, e) => (<th key={x} colSpan={2} {...excelConfig}>{x}</th>))
                }
            </tr>
            <tr>
                {Array(10).fill(undefined).map((x, e) => {
                    return <>
                        <th key={e + '_M'} {...excelConfig}>M</th>
                        <th key={e + '_TV'} {...excelConfig}>TV</th>
                    </>
                })}

            </tr>

            <tr>
                <th {...excelConfig}
                    className="sticky-col-0 col-no"
                >1</th>
                <th {...excelConfig}
                    className="sticky-col-1 col-no"
                >2</th>
                {Array(18).fill(undefined).map((x, e) => {
                    return <>
                        <th key={e} {...excelConfig} className="col-no">{e + 2}</th>
                    </>
                })}
            </tr>
        </thead>
    </>
}

export function HeaderUILayoutTable2({ listColumnConfig }) {
    return <>
        <thead>
            <tr>
                <th
                    {...excelConfig}
                    rowSpan={3}
                    className="sticky-col-0"
                    style={{
                        width: '30px'
                    }}
                >TT</th>
                <th {...excelConfig}
                    rowSpan={3}
                    style={{
                        width: '200px'
                    }}
                    className="sticky-col-1"
                >Tên cơ sở</th>
                {
                    [
                        'Quai bị',
                        'Rubella (Rubeon)',
                        'Sởi',
                        'Sốt rét',
                        'Sốt xuất huyết Dengue',
                        'Tả',
                        'Tay - chân - miệng',
                        'Than',
                        'Thương hàn',
                        'Thủy đậu',
                    ].map((x, e) => (<th key={x} colSpan={2} {...excelConfig}>{x}</th>))
                }
            </tr>
            <tr>
                {Array(10).fill(undefined).map((x, e) => {
                    return <>
                        <th key={e + '_M'} {...excelConfig}>M</th>
                        <th key={e + '_TV'} {...excelConfig}>TV</th>
                    </>
                })}

            </tr>

            <tr>
                <th {...excelConfig}
                    className="sticky-col-0 col-no"
                >1</th>
                <th {...excelConfig}
                    className="sticky-col-1 col-no"
                >2</th>
                {Array(18).fill(undefined).map((x, e) => {
                    return <>
                        <th key={e} {...excelConfig} className="col-no">{e + 2}</th>
                    </>
                })}
            </tr>
        </thead>
    </>
}

export function HeaderUILayoutTable3({ listColumnConfig }) {
    return <>
        <thead>
            <tr>
                <th
                    {...excelConfig}
                    rowSpan={3}
                    className="sticky-col-0"
                    style={{
                        width: '30px'
                    }}
                >TT</th>
                <th {...excelConfig}
                    rowSpan={3}
                    style={{
                        width: '200px'
                    }}
                    className="sticky-col-1"
                >Tên cơ sở</th>
                {
                    [
                        'Tiêu chảy',
                        'Uốn ván sơ sinh',
                        'Uốn ván khác',
                        'Viêm gan vi rút A',
                        'Viêm gan vi rút B',
                        'Viêm gan vi rút C',
                        'Viêm gan vi rút khác ',
                        'Viêm màng não do não mô cầu',
                        'Viêm não Nhật Bản',
                        'Viêm não vi rút khác',
                        'Xoắn khuẩn vàng da (Leptospira)',
                        'Khác'
                    ].map((x, e) => (<th key={x} colSpan={2} {...excelConfig}>{x}</th>))
                }
            </tr>
            <tr>
                {Array(12).fill(undefined).map((x, e) => {
                    return <>
                        <th key={e + '_M'} {...excelConfig}>M</th>
                        <th key={e + '_TV'} {...excelConfig}>TV</th>
                    </>
                })}

            </tr>

            <tr>
                <th {...excelConfig}
                    className="sticky-col-0 col-no"
                >1</th>
                <th {...excelConfig}
                    className="sticky-col-1 col-no"
                >2</th>
                {Array(22).fill(undefined).map((x, e) => {
                    return <>
                        <th key={e} {...excelConfig} className="col-no">{e + 2}</th>
                    </>
                })}
            </tr>
        </thead>
    </>
} 