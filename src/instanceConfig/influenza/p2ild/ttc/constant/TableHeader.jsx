
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
    };
    return <thead>
        <tr>
            <th
                {...excelConfig}
                className="sticky-col-0"
                rowSpan={2}
            >TT</th>
            <th {...excelConfig}
                className="sticky-col-1"
                rowSpan={2}
            >Tên Xã/Phường</th>
            <th {...excelConfig}
                colSpan={5}>Dân số trung bình</th>
            <th {...excelConfig}
                colSpan={7}>Trạm Y tế</th>
            <th {...excelConfig}
                colSpan={3}>Số thôn bản</th>
            <th {...excelConfig} rowSpan={2}>{`Tổng số cộng tác viên dân số/NVYT thôn bản/Cô đỡ thôn bản`}</th>
            <th {...excelConfig}
                colSpan={3}>Trong đó</th>
        </tr>
        <tr>
            <th {...excelConfig}>Tổng số</th>
            <th {...excelConfig}>Nữ</th>
            <th {...excelConfig}>Trẻ em &lt;5 tuổi</th>
            <th {...excelConfig}>Trẻ em &lt;15 tuổi</th>
            <th {...excelConfig}>PN từ 15-49 tuổi</th>

            <th {...excelConfig}>Xã đạt tiêu chí QG về YT</th>
            <th {...excelConfig}>TYT triển khai dự phòng, quản lý điều trị bệnh không lây nhiễm</th>
            <th {...excelConfig}>Xã/ phường có TYT</th>
            <th {...excelConfig}>Bác sỹ định biên</th>
            <th {...excelConfig}>Bác sỹ làm việc</th>
            <th {...excelConfig}>YHCT</th>
            <th {...excelConfig}>HS/ YSSN</th>

            <th {...excelConfig}>Tổng số</th>
            <th {...excelConfig}>Có nhân viên y tế hoạt động</th>
            <th {...excelConfig}>Có cô đỡ được đào tạo</th>

            <th {...excelConfig}>{`Nhân viên y tế thôn bản`}</th>
            <th {...excelConfig}>{`Cô đỡ thôn bản`}</th>
            <th {...excelConfig}>{`Cộng tác viên dân số`}</th>


        </tr>
        <tr>
            <th {...excelConfig}
                className="sticky-col-0 col-no"
            >1</th>
            <th {...excelConfig}
                className="sticky-col-1 col-no"
            >2</th>
            <th {...excelConfig} className="col-no">3</th>
            <th {...excelConfig} className="col-no">4</th>
            <th {...excelConfig} className="col-no">5</th>
            <th {...excelConfig} className="col-no">6</th>
            <th {...excelConfig} className="col-no">7</th>
            <th {...excelConfig} className="col-no">8</th>
            <th {...excelConfig} className="col-no">9</th>
            <th {...excelConfig} className="col-no">10</th>
            <th {...excelConfig} className="col-no">11</th>
            <th {...excelConfig} className="col-no">12</th>
            <th {...excelConfig} className="col-no">13</th>
            <th {...excelConfig} className="col-no">14</th>
            <th {...excelConfig} className="col-no">15</th>
            <th {...excelConfig} className="col-no">16</th>
            <th {...excelConfig} className="col-no">17</th>
            <th {...excelConfig} className="col-no">{`18=18.1+18.2+18.3`}</th>
            <th {...excelConfig} className="col-no">{`18.1`}</th>
            <th {...excelConfig} className="col-no">{`18.2`}</th>
            <th {...excelConfig} className="col-no">{`18.3`}</th>
        </tr>
    </thead>
}