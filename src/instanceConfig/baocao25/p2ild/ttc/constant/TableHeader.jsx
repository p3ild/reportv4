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
        "data-b-a-s": 'thin',
    };
    return <thead>
        <tr>
            <th
                {...excelConfig}
                rowSpan={2}
                {...findColStyleByKey({ listColumnConfig, key: 'stt' })}
            >TT</th>
            <th {...excelConfig}
                rowSpan={2}
                {...findColStyleByKey({ listColumnConfig, key: 'orgName' })}
            >Tên Xã/Phường</th>
            <th {...excelConfig}
                colSpan={5}>Dân số trung bình</th>
            <th {...excelConfig}
                colSpan={8}>Trạm Y tế</th>
            <th {...excelConfig}
                colSpan={3}>Số thôn bản</th>
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
            <th {...excelConfig}>TYT có cộng tác viên dân số</th>

            <th {...excelConfig}>Tổng số</th>
            <th {...excelConfig}>Có nhân viên y tế hoạt động</th>
            <th {...excelConfig}>Có cô đỡ được đào tạo</th>
        </tr>
        <tr>
            <th {...excelConfig}
                {...findColStyleByKey({ listColumnConfig, key: 'stt', colClassName: "!font-normal" })}
            >1</th>
            <th {...excelConfig}
                {...findColStyleByKey({ listColumnConfig, key: 'orgName', colClassName: "!font-normal" })}
            >2</th>
            <th {...excelConfig} className="!text-normal">3</th>
            <th {...excelConfig} className="!text-normal">4</th>
            <th {...excelConfig} className="!text-normal">5</th>
            <th {...excelConfig} className="!text-normal">6</th>
            <th {...excelConfig} className="!text-normal">7</th>
            <th {...excelConfig} className="!text-normal">8</th>
            <th {...excelConfig} className="!text-normal">9</th>
            <th {...excelConfig} className="!text-normal">10</th>
            <th {...excelConfig} className="!text-normal">11</th>
            <th {...excelConfig} className="!text-normal">12</th>
            <th {...excelConfig} className="!text-normal">13</th>
            <th {...excelConfig} className="!text-normal">14</th>
            <th {...excelConfig} className="!text-normal">15</th>
            <th {...excelConfig} className="!text-normal">16</th>
            <th {...excelConfig} className="!text-normal">17</th>
            <th {...excelConfig} className="!text-normal">18</th>
        </tr>
    </thead>
}

export function SectionHeaderTable1({
    period,
    notAvailable }) {
    return <>  </>
}