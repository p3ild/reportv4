import { format, parse } from "date-fns"
import { findColStyleByKey } from "../../common/ui/RowRender"
import { Fragment } from "react"


export function HeaderUILayoutTable1({ listColumnConfig, title }) {
    return <thead>
        <tr>
            <th
                data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                {...findColStyleByKey({ listColumnConfig, key: 'stt' })}
                rowSpan={2}
            >TT</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                {...findColStyleByKey({ listColumnConfig, key: 'org' })}
                rowSpan={2}
            >Đơn vị</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin' rowSpan={2}>Số xã</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin' rowSpan={2}>Tổng số THTV trong kỳ báo cáo
            </th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin' colSpan={8}>Trong đó, số trường hợp tử vong:</th>
        </tr>
        <tr>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>Tư pháp chuyển sang</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>Y tế ghi nhận</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>Được ghi nhận bởi cả 2 hệ thống tại thời điểm trao đổi dữ liệu</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>Tư pháp chuyển sang mà Y tế chưa có </th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>Tư pháp chuyển sang mà Y tế chưa có, đã hoàn tất</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>Số ngày trung bình giữa thời điểm Y tế ghi nhận trên A6 điện tử và ngày tử vong</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>Không có giấy tờ tuỳ thân hoặc số định danh cá nhân</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'>Có ngày tử vong trong kỳ báo cáo</th>

        </tr>
        <tr>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                {...findColStyleByKey({ listColumnConfig, key: 'stt' })}
            >1</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                {...findColStyleByKey({ listColumnConfig, key: 'org' })}>2</th>
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
        </tr>
    </thead>
}

export function SectionHeaderTable1({
    period,
    notAvailable }) {
    return <>
        {!notAvailable && <table style={{ border: 0 }}>
            <tr>
                <td colSpan={10} style={{ width: "100vw", fontSize: "16px", border: 0, fontWeight: 800, textAlign: "left" }}></td>
            </tr>
            <tr>
                <td data-f-bold="true" style={{ width: "100vw", fontSize: "16px", border: 0, fontWeight: 800, textAlign: "left" }}>I. PHẦN 1. KẾT QUẢ TRAO ĐỔI DỮ LIỆU TỬ VONG GIỮA Y TẾ VÀ TƯ PHÁP</td>
            </tr>
            <tr>
                <td data-f-bold="true" style={{ width: "100vw", fontSize: "16px", border: 0, fontWeight: 800, textAlign: "left" }}>1. Bảng 1: Kết quả thực hiện của {period.labelStartDate.toLowerCase()}{period.fromTo ? ` đến ${period.labelEndDate.toLowerCase()}` : ''} </td>
            </tr>
            {
                notAvailable && <tr>
                    <td style={{ width: "100vw", fontSize: "16px", border: 0, textAlign: "left" }}>Không áp dụng cho kỳ báo cáo từ tháng tới tháng</td>
                </tr>
            }

        </table>}
    </>
}

export function SectionHeaderTable2({ period }) {
    return <table style={{ border: 0 }}>
        <tr>
            <td colSpan={10} style={{ width: "100vw", fontSize: "16px", border: 0, fontWeight: 800, textAlign: "left" }}></td>
        </tr>
        <tr>
            <td colSpan={10} style={{ width: "100vw", fontSize: "16px", border: 0, fontWeight: 800, textAlign: "left" }}></td>
        </tr>
        <tr>
            <td data-f-bold="true" colSpan={10} style={{ width: "100vw", fontSize: "16px", border: 0, fontWeight: 800, textAlign: "left" }}>2. Bảng 2: Kết quả thực hiện
                {period.fromTo ? ` từ ${period.labelStartDate.toLowerCase()} đến ${period.labelEndDate.toLowerCase()}` : ` từ tháng 4/2024 đến ${period.labelStartDate.toLowerCase()} `}</td>
        </tr>
    </table>
}

export function HeaderUILayoutTable3({ listColumnConfig, periodAsArray = ['202401', '202402', 202403] }) {
    return <thead>
        <tr>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                {...findColStyleByKey({ listColumnConfig, key: 'stt' })}
            >TT</th>
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                {...findColStyleByKey({ listColumnConfig, key: 'org' })}
            >Đơn vị</th>
            {periodAsArray.map((e, idx) => {
                return <th key={idx} data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                >Tháng {
                        format(parse(e, 'yyyyMM', new Date()), 'MM/yyyy')
                    }</th>
            })}
            <th data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
            >Tổng số</th>
        </tr>

        <tr>
            {
                listColumnConfig.map((e, idx) =>
                    <th key={idx} data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s='thin'
                        // className="min-w-[5vw]"
                        className={`${e.colClassName || ''}`}
                        style={e.colStyle}
                    >{idx + 1}</th>
                )
            }
        </tr>
    </thead>
}

export function SectionHeaderTable3({
    period,
    tableIdx
}) {
    return <table style={{ border: 0 }}>
        <tr>
            <td data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" colSpan={10} style={{ width: "100vw", fontSize: "16px", border: 0, fontWeight: 800, textAlign: "left" }}></td>
        </tr>
        <tr>
            <td data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" colSpan={10} style={{ width: "100vw", fontSize: "16px", border: 0, fontWeight: 800, textAlign: "left" }}></td>
        </tr>
        <tr>
            <td data-a-v="middle" data-f-bold="true" data-a-wrap="true" colSpan={10} style={{ width: "100vw", fontSize: "16px", border: 0, fontWeight: 800, textAlign: "left" }}>
                Bảng 3. Số trường hợp tử vong theo tháng
                {/* , {period?.fromTo ? ` từ ${period?.labelStartDate.toLowerCase()} đến ${period.labelEndDate.toLowerCase()}` : ` từ tháng 4/2024 đến ${period.labelStartDate.toLowerCase()} `} (để đối chiếu với Tư pháp) {tableIdx > 0 ? ' (tiếp theo)' : ''} */}
            </td>
        </tr>
    </table>
}
export function SectionFooterTable({
    period,
    tableIdx
}) {
    const Section = ({ sectionName }) => {
        return <>
            <tr>
                <td data-b-a-s="thin" colSpan={5} style={{ width: "100vw", fontSize: "16px", border: "1px solid black", textAlign: "left" }}>{sectionName}</td>
                <td data-b-a-s="thin" colSpan={5} style={{ width: "100vw", fontSize: "16px", border: "1px solid black", textAlign: "left" }}></td>
            </tr>
            <tr>
                <td data-b-a-s="thin" colSpan={5} style={{ width: "100vw", fontSize: "16px", border: "1px solid black", textAlign: "left" }}>1</td>
                <td data-b-a-s="thin" colSpan={5} style={{ width: "100vw", fontSize: "16px", border: "1px solid black", textAlign: "left" }}></td>
            </tr>
            <tr>
                <td data-b-a-s="thin" colSpan={5} style={{ width: "100vw", fontSize: "16px", border: "1px solid black", textAlign: "left" }}>2</td>
                <td data-b-a-s="thin" colSpan={5} style={{ width: "100vw", fontSize: "16px", border: "1px solid black", textAlign: "left" }}></td>
            </tr>
            <tr>
                <td data-b-a-s="thin" colSpan={5} style={{ width: "100vw", fontSize: "16px", border: "1px solid black", textAlign: "left" }}>3</td>
                <td data-b-a-s="thin" colSpan={5} style={{ width: "100vw", fontSize: "16px", border: "1px solid black", textAlign: "left" }}></td>
            </tr>
        </>
    }
    return <table style={{ border: 0 }}>
        <tr>
            <td data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" colSpan={10} style={{ width: "100vw", fontSize: "16px", border: 0, fontWeight: 800, textAlign: "left" }}></td>
        </tr>
        <tr>
            <td data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" colSpan={10} style={{ width: "100vw", fontSize: "16px", border: 0, fontWeight: 800, textAlign: "left" }}></td>
        </tr>
        <table style={{ border: 0 }}>
            <tr>
                <td colSpan={10} data-f-bold="true" style={{ width: "100vw", fontSize: "16px", fontWeight: 800, textAlign: "left" }}>
                    II. PHẦN 2. TỔNG HỢP NHỮNG VẤN ĐỀ GẶP PHẢI TRONG QUÁ TRÌNH TRIỂN KHAI
                </td>
            </tr>
        </table>
        <table>
            <tr>
                <td data-b-a-s="thin" data-f-bold="true" colSpan={5} style={{ width: "50vw", fontSize: "16px", border: "1px solid black", fontWeight: 800, textAlign: "center" }}>Một số vấn đề</td>
                <td data-b-a-s="thin" data-f-bold="true" colSpan={5} style={{ width: "50vw", fontSize: "16px", border: "1px solid black", fontWeight: 800, textAlign: "center" }}>Hướng giải quyết/khuyến nghị</td>
            </tr>

            <Section sectionName={"* Liên quan đến phần mềm và IT:"} />
            <Section sectionName={"* Liên quan đến qui trình thực hiện của cán bộ:"} />
            <Section sectionName={"* Khác:"} />
        </table>
        <tr>
            <td data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" colSpan={10} style={{ width: "100vw", fontSize: "16px", border: 0, fontWeight: 800, textAlign: "left" }}></td>
        </tr>
        <tr>
            <td data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" colSpan={10} style={{ width: "100vw", fontSize: "16px", border: 0, fontWeight: 800, textAlign: "left" }}></td>
        </tr>
        <table style={{ border: 0 }}>
            <table style={{ border: 0, width: '90vw' }}>
                <tr>
                    <td colSpan={5} data-f-bold="true" data-a-h="center" style={{ fontSize: "16px", border: 0, fontWeight: 800, textAlign: "center", width: '50vw' }}>Người lập báo cáo</td>
                    <td colSpan={5} data-f-bold="true" data-a-wrap="true" data-a-h="center" style={{ fontSize: "16px", border: 0, fontWeight: 800, textAlign: "center", width: '50vw' }}><div className="whitespace-break-spaces m-0">Ngày     tháng     năm     <br />Ký và đóng dấu của lãnh đạo</div></td>
                </tr>
            </table>
            <EmptyRow rowSpan={10} />

        </table>
    </table>
}

export const EmptyRow = ({ colSpan = 10, rowSpan }) => {
    return <>
        <tr> <td
            data-a-v="top"
            data-a-h="left"
            data-a-wrap="true"
            colSpan={colSpan} rowSpan={rowSpan + 1} style={{ width: "100vw", fontSize: "16px", border: 0, fontWeight: 800, textAlign: "left" }}></td></tr>
        {Array(rowSpan).fill(undefined).map((e, idx) => <Fragment key={idx}>
            <tr> <td colSpan={colSpan} style={{ width: "100vw", fontSize: "16px", border: 0, fontWeight: 800, textAlign: "left" }}></td></tr>
        </Fragment>)}
    </>
}