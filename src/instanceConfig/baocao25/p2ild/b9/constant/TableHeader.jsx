
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
                rowSpan={3}
                className="sticky-col-0"
                style={{
                    width: '30px'
                }}
            >TT</th>
            <th {...excelConfig}
                rowSpan={3}
                className="sticky-col-1"
                style={{
                    width: '130px'
                }}
            >Cơ sở y tế</th>
            <th {...excelConfig}
                rowSpan={3}>Số cơ sở</th>
            <th {...excelConfig}
                colSpan={2}>Giường bệnh</th>
            <th {...excelConfig}
                colSpan={5}>Số lượt khám bệnh</th>
            <th {...excelConfig}
                rowSpan={3}>Tổng số lượt khám dự phòng</th>
            <th {...excelConfig}
                colSpan={5}>Số lượt điều trị nội trú</th>
            <th {...excelConfig}
                rowSpan={3}>Tổng số ngày điều trị nội trú</th>
            <th {...excelConfig}
                colSpan={5}>Hoạt động cận lâm sàng</th>
            <th {...excelConfig}
                rowSpan={3}>Tổng số lượt chuyển tuyến</th>
        </tr>
        <tr>
            <th {...excelConfig}
                rowSpan={2}>Giường KH</th>
            <th {...excelConfig}
                rowSpan={2}>Giường thực tế</th>
            <th {...excelConfig}
                rowSpan={2}>Tổng số</th>
            <th {...excelConfig}
                colSpan={4}>Trong đó</th>
            <th {...excelConfig}
                rowSpan={2}>Tổng số</th>
            <th {...excelConfig}
                colSpan={4}>Trong đó</th>
            <th {...excelConfig}
                rowSpan={2}>Số lần xét nghiệm</th>
            <th {...excelConfig}
                rowSpan={2}>Số lần chụp Xquang</th>
            <th {...excelConfig}
                rowSpan={2}>Số lần siêu âm</th>
            <th {...excelConfig}
                rowSpan={2}>Số lần chụp CT</th>
            <th {...excelConfig}
                rowSpan={2}>Số lần chụp MRI</th>
        </tr>
        <tr>
            <th {...excelConfig}>Nữ</th>
            <th {...excelConfig}>BHYT</th>
            <th {...excelConfig}>YHCT (kể cả kết hợp YHHĐ)</th>
            <th {...excelConfig}>TE{`<`}15 tuổi</th>
            <th {...excelConfig}>Nữ</th>
            <th {...excelConfig}>BHYT</th>
            <th {...excelConfig}>YHCT (kể cả kết hợp YHHĐ)</th>
            <th {...excelConfig}>TE{`<`}15 tuổi</th>
        </tr>
        <tr>
            <th className="sticky-col-0"
                style={{
                    width: '30px'
                }}
            >1</th>
            <th className="sticky-col-1"
                style={{
                    width: '130px'
                }}>2</th>
            <th className={"!font-normal"}>3</th>
            <th className={"!font-normal"}>4</th>
            <th className={"!font-normal"}>5</th>
            <th className={"!font-normal"}>6</th>
            <th className={"!font-normal"}>7</th>
            <th className={"!font-normal"}>8</th>
            <th className={"!font-normal"}>9</th>
            <th className={"!font-normal"}>10</th>
            <th className={"!font-normal"}>11</th>
            <th className={"!font-normal"}>12</th>
            <th className={"!font-normal"}>13</th>
            <th className={"!font-normal"}>14</th>
            <th className={"!font-normal"}>15</th>
            <th className={"!font-normal"}>16</th>
            <th className={"!font-normal"}>17</th>
            <th className={"!font-normal"}>18</th>
            <th className={"!font-normal"}>19</th>
            <th className={"!font-normal"}>20</th>
            <th className={"!font-normal"}>21</th>
            <th className={"!font-normal"}>22</th>
            <th className={"!font-normal"}>23</th>
        </tr>
    </thead>
}