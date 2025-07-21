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
    return <thead>
        <tr>
            <th
                data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                rowSpan={2}
                {...findColStyleByKey({ listColumnConfig, key: 'stt' })}
            >TT</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                rowSpan={2}
                {...findColStyleByKey({ listColumnConfig, key: 'orgName' })}
            >Tên Xã/Phường</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                colSpan={5}>Dân số trung bình</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                colSpan={8}>Trạm Y tế</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                colSpan={3}>Số thôn bản</th>
        </tr>
        <tr>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>Tổng số</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>Nữ</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>Trẻ em &lt;5 tuổi</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>Trẻ em &lt;15 tuổi</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>PN từ 15-49 tuổi</th>

            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>Xã đạt tiêu chí QG về YT</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>TYT triển khai dự phòng, quản lý điều trị bệnh không lây nhiễm</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>Xã/ phường có TYT</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>Bác sỹ định biên</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>Bác sỹ làm việc</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>YHCT</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>HS/ YSSN</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>TYT có cộng tác viên dân số</th>

            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>Tổng số</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>Có nhân viên y tế hoạt động</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>Có cô đỡ được đào tạo</th>
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