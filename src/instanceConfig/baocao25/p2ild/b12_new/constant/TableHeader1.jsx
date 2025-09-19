
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
                    rowSpan={4}
                    className="sticky-col-0"
                    style={{
                        width: '30px'
                    }}
                >TT</th>
                <th {...excelConfig}
                    rowSpan={4}
                    style={{
                        width: '200px'
                    }}
                    className="sticky-col-1"
                >Tên cơ sở</th>
                <th colSpan={5} {...excelConfig}>Bệnh tăng huyết áp</th>
                <th colSpan={5} {...excelConfig}>Bệnh đái tháo đường</th>
            </tr>

            <tr>
                <th colSpan={2} {...excelConfig}>Phát hiện</th>
                <th colSpan={3} {...excelConfig}>Quản lý điều trị</th>
                <th colSpan={2} {...excelConfig}>Phát hiện</th>
                <th colSpan={3} {...excelConfig}>Quản lý điều trị</th>
            </tr>
            <tr>
                <th rowSpan={2} {...excelConfig}>Tổng số người được phát hiện</th>
                <th rowSpan={2} {...excelConfig}>Số người mới phát hiện trong kỳ báo cáo</th>
                <th rowSpan={2} {...excelConfig}>Tổng số BN đang được quản lý</th>
                <th colSpan={2} {...excelConfig}>Trong đó</th>

                <th rowSpan={2} {...excelConfig}>Tổng số người được phát hiện</th>
                <th rowSpan={2} {...excelConfig}>Số người mới phát hiện trong kỳ báo cáo</th>
                <th rowSpan={2} {...excelConfig}>Tổng số BN đang được quản lý</th>
                <th colSpan={2} {...excelConfig}>Trong đó</th>
            </tr>

            <tr>
                <th {...excelConfig}>Khám cấp thuốc tháng vừa qua</th>
                <th {...excelConfig}>Điều tri đạt huyết áp mục tiêu	</th>
                <th {...excelConfig}>Khám cấp thuốc tháng vừa qua</th>
                <th {...excelConfig}>Điều trị đạt đường máu mục tiêu</th>
            </tr>
            <tr>
                <th {...excelConfig}
                    className="sticky-col-0 col-no"
                >1</th>
                <th {...excelConfig}
                    className="sticky-col-1 col-no"
                >2</th>
                {Array(10).fill(undefined).map((x, e) => {
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
                    rowSpan={4}
                    className="sticky-col-0"
                    style={{
                        width: '30px'
                    }}
                >TT</th>
                <th {...excelConfig}
                    rowSpan={4}
                    style={{
                        width: '200px'
                    }}
                    className="sticky-col-1"
                >Tên cơ sở</th>
                <th colSpan={5} {...excelConfig}>Bệnh phổi tắc nghẽn mạn tính và hen phế quản</th>
                <th colSpan={5} {...excelConfig}>Bệnh không lây nhiễm khác</th>
            </tr>

            <tr>
                <th colSpan={2} {...excelConfig}>Phát hiện</th>
                <th colSpan={3} {...excelConfig}>Quản lý điều trị</th>
                <th colSpan={2} {...excelConfig}>Phát hiện</th>
                <th colSpan={3} {...excelConfig}>Quản lý điều trị</th>
            </tr>
            <tr>
                <th rowSpan={2} {...excelConfig}>Tổng số người được phát hiện</th>
                <th rowSpan={2} {...excelConfig}>Số người mới phát hiện trong kỳ báo cáo</th>
                <th rowSpan={2} {...excelConfig}>Tổng số BN đang được quản lý</th>
                <th colSpan={2} {...excelConfig}>Trong đó</th>

                <th rowSpan={2} {...excelConfig}>Tổng số người được phát hiện</th>
                <th rowSpan={2} {...excelConfig}>Số người mới phát hiện trong kỳ báo cáo</th>
                <th rowSpan={2} {...excelConfig}>Tổng số BN đang được quản lý</th>
                <th colSpan={2} {...excelConfig}>Trong đó</th>
            </tr>

            <tr>
                <th {...excelConfig}>Khám cấp thuốc tháng vừa qua</th>
                <th {...excelConfig}>Điều trị đạt hiệu quả</th>
                <th {...excelConfig}>Khám cấp thuốc tháng vừa qua</th>
                <th {...excelConfig}>Điều trị đạt hiệu quả</th>
            </tr>
            <tr>
                <th {...excelConfig}
                    className="sticky-col-0 col-no"
                >1</th>
                <th {...excelConfig}
                    className="sticky-col-1 col-no"
                >2</th>
                {Array(10).fill(undefined).map((x, e) => {
                    return <>
                        <th key={e} {...excelConfig} className="col-no">{e + 2}</th>
                    </>
                })}
            </tr>
        </thead>
    </>
}
