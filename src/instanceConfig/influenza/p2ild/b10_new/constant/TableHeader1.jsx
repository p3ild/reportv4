
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
                <th colSpan={2} {...excelConfig}>Phòng chống sốt rét</th>
                <th colSpan={9} {...excelConfig}>Phòng chống HIV/AIDS</th>
            </tr>
            <tr>
                <th rowSpan={2} {...excelConfig}>Tổng số BN SR mới phát hiện</th>
                <th rowSpan={2} {...excelConfig}>Số BN tử vong do sốt rét</th>
                <th colSpan={2} {...excelConfig}>Số ca nhiễm HIV mới phát hiện</th>
                <th colSpan={2} {...excelConfig}>Số hiện nhiễm HIV được phát hiện</th>
                <th colSpan={2} {...excelConfig}>Số hiện nhiễm HIV được phát hiện trong nhóm tuổi 15-49	</th>
                <th rowSpan={2} {...excelConfig}>Số hiện mắc AIDS</th>
                <th colSpan={2} {...excelConfig}>Số ca tử vong do HIV/ AIDS	</th>
            </tr>
            <tr>
                <th {...excelConfig}>Tổng số</th>
                <th {...excelConfig}>Trđ: Nữ</th>
                <th {...excelConfig}>Tổng số</th>
                <th {...excelConfig}>Trđ: Nữ</th>
                <th {...excelConfig}>Tổng số</th>
                <th {...excelConfig}>Trđ: Nữ</th>
                <th {...excelConfig}>Tổng số</th>
                <th {...excelConfig}>Trđ: Nữ</th>

            </tr>
            <tr>
                <th {...excelConfig}
                    className="sticky-col-0 col-no"
                >1</th>
                <th {...excelConfig}
                    className="sticky-col-1 col-no"
                >2</th>
                {Array(11).fill(undefined).map((x, e) => {
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
                <th colSpan={11} {...excelConfig}>Tai nạn thương tích</th>
            </tr>

            <tr>
                <th {...excelConfig}>Tai nạn Giao thông</th>
                <th {...excelConfig}>Tai nạn lao động</th>
                <th {...excelConfig}>Đuối nước</th>
                <th {...excelConfig}>Ngã</th>
                <th {...excelConfig}>Bỏng</th>
                <th {...excelConfig}>Tự tử</th>
                <th {...excelConfig}>Ngộ độc (hóa chất, thực phẩm)</th>
                <th {...excelConfig}>Hóc sặc dị vật</th>
                <th {...excelConfig}>Động vật cắn, đốt, húc</th>
                <th {...excelConfig}>Bạo lực xung đột</th>
                <th {...excelConfig}>Tai nạn khác</th>
            </tr>
            <tr>
                <th {...excelConfig}
                    className="sticky-col-0 col-no"
                >1</th>
                <th {...excelConfig}
                    className="sticky-col-1 col-no"
                >2</th>
                {Array(9).fill(undefined).map((x, e) => {
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
                <th colSpan={6} {...excelConfig}>Sức khỏe tâm thần</th>
                <th colSpan={5} {...excelConfig}>Phòng chống lao</th>
                <th colSpan={5} {...excelConfig}>Phòng chống bệnh phong</th>


            </tr>

            <tr>
                <th colSpan={3} {...excelConfig}>Số BN hiện mắc động kinh</th>
                <th colSpan={3} {...excelConfig}>Số BN hiện mắc tâm thần phân liệt</th>
                <th rowSpan={2} {...excelConfig}>Số BN lao phổi có bằng chứng VK học mới phát hiện</th>
                <th rowSpan={2} {...excelConfig}>Số BN lao các thể được phát hiện</th>
                <th rowSpan={2} {...excelConfig}>Số BN lao mới có bằng chứng VK học được điều trị khỏi</th>
                <th colSpan={2} {...excelConfig}>Số BN tử vong trong thời gian điều trị lao</th>
                <th rowSpan={2} {...excelConfig}>Số BN hiện mắc được phát hiện</th>
                <th colSpan={3} {...excelConfig}>Số BN mới phát hiện</th>
                <th rowSpan={2} {...excelConfig}>Số BN Phong mới bị tàn tật độ II</th>
            </tr>

            <tr>
                <th {...excelConfig}>Tổng số</th>
                <th {...excelConfig}>Số BN được quản lý</th>
                <th {...excelConfig}>Số BN mới phát hiện</th>
                <th {...excelConfig}>Tổng số</th>
                <th {...excelConfig}>Số BN được quản lý</th>
                <th {...excelConfig}>Số BN mới phát hiện</th>
                <th {...excelConfig}>Tổng số</th>
                <th {...excelConfig}>Trđ: Nữ</th>
                <th {...excelConfig}>Tổng số</th>
                <th {...excelConfig}>Trđó: Nữ</th>
                <th {...excelConfig}>{'Trẻ em < 15 tuổi'}</th>

            </tr>
            <tr>
                <th {...excelConfig}
                    className="sticky-col-0 col-no"
                >1</th>
                <th {...excelConfig}
                    className="sticky-col-1 col-no"
                >2</th>
                {Array(14).fill(undefined).map((x, e) => {
                    return <>
                        <th key={e} {...excelConfig} className="col-no">{e + 2}</th>
                    </>
                })}
            </tr>
        </thead>
    </>
}