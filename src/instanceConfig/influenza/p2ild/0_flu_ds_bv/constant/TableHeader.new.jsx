
const BORDER = {
    NONE_TOP: "!border-t-0 !pt-0",
    NONE_BOTTOM: "!border-b-0 !pb-0",
}
const WIDTH = {
    LARGE: "!w-[180px]",
    MEDIUM: "!w-[100px]",
    SMALL: "!w-[80px]",
}
export function HeaderUILayout({ listColumnConfig, title }) {
    const defaultWidth = "w-[130px]"
    return <thead>
        <tr>
            <th className={[defaultWidth, 'sticky-col-0'].join(' ')}>{`Đơn vị gửi mẫu`}</th>
            <th className={[defaultWidth, 'sticky-col-1'].join(' ')}>{`Mã số ca giám sát (từ 1/7/2024)`}</th>
            <th className={[WIDTH.LARGE, 'sticky-col-2'].join(' ')}>{`Mã số ca giám sát (trước 1/7/2024)`}</th>
            <th className={[defaultWidth].join(' ')} >{`Mã bệnh án`}</th>
            <th className={[defaultWidth].join(' ')} >{`Mã bệnh phẩm`}</th>
            <th className={[defaultWidth].join(' ')} >{"Họ tên"}</th>
            <th className={[defaultWidth].join(' ')} >{"Tuổi"}</th>
            <th className={[defaultWidth].join(' ')} >{"Tháng tuổi"}</th>
            <th className={[defaultWidth].join(' ')} >{"Giới tính"}</th>
            <th className={[defaultWidth].join(' ')} >{"Địa chỉ (Tỉnh)"}</th>
            <th className={[defaultWidth].join(' ')} >{"Địa chỉ  (Xã)"}</th>
            <th className={[defaultWidth].join(' ')} >{"Khoa Phòng"}</th>
            <th className={[defaultWidth].join(' ')} >{"Ngày khởi phát"}</th>
            <th className={[defaultWidth].join(' ')} >{"Ho"}</th>
            <th className={[defaultWidth].join(' ')} >{"Sốt"}</th>
            <th className={[defaultWidth].join(' ')} >{"Triệu chứng trong vòng 10 ngày"}</th>
            <th className={[defaultWidth].join(' ')} >{"Tiếp xúc gia cầm"}</th>
            <th className={[defaultWidth].join(' ')} >{"Dùng Oseltamivir  7 ngày trước"}</th>
            <th className={[defaultWidth].join(' ')} >{"Tiêm vắc xin cúm 12 tháng trờ lại"}</th>
            <th className={[defaultWidth].join(' ')} >{"ICD10 - Bệnh chính"}</th>
            <th className={[defaultWidth].join(' ')} >{"ICD10 - Bệnh kèm theo 1"}</th>
            <th className={[defaultWidth].join(' ')} >{"ICD10 - Bệnh kèm theo 2"}</th>
            <th className={[defaultWidth].join(' ')} >{"ICD10 - Bệnh kèm theo 3"}</th>
            <th className={[defaultWidth].join(' ')} >{"ICD10 - Bệnh kèm theo 4"}</th>
            <th className={[defaultWidth].join(' ')} >{"ICD10 - Bệnh kèm theo 5"}</th>
            <th className={[defaultWidth].join(' ')} >{"Ngày lấy mẫu"}</th>
            <th className={[defaultWidth].join(' ')} >{"Loại bệnh phẩm"}</th>
            <th className={[defaultWidth].join(' ')} >{"KQ XN nhanh"}</th>
            <th className={[defaultWidth].join(' ')} >{"Đơn vị XN"}</th>
            <th className={[defaultWidth].join(' ')} >{"Ngày nhận bệnh phẩm"}</th>
            <th className={[defaultWidth].join(' ')} >{"Tình trạng bệnh phẩm"}</th>
            <th className={[defaultWidth].join(' ')} >{"Lý do từ chối XN"}</th>
            <th className={[defaultWidth].join(' ')} >{"Ngày XN"}</th>
            <th className={[defaultWidth].join(' ')} >{"A/H1N1pdm09"}</th>
            <th className={[defaultWidth].join(' ')} >{"CT-value - A/H1N1pdm09"}</th>
            <th className={[defaultWidth].join(' ')} >{"A/H3N2"}</th>
            <th className={[defaultWidth].join(' ')} >{"CT-value - A/H3N2"}</th>
            <th className={[defaultWidth].join(' ')} >{"A/H5"}</th>
            <th className={[defaultWidth].join(' ')} >{"CT-value - A/H5"}</th>
            <th className={[defaultWidth].join(' ')} >{"A/H7"}</th>
            <th className={[defaultWidth].join(' ')} >{"CT-value - A/H7"}</th>
            <th className={[defaultWidth].join(' ')} >{"Cúm A (chưa xác định)"}</th>
            <th className={[defaultWidth].join(' ')} >{"CT-value - Cúm A (chưa xác định)"}</th>
            <th className={[defaultWidth].join(' ')} >{"B Yamagata"}</th>
            <th className={[defaultWidth].join(' ')} >{"CT-value - Dương tính (B Yamagata)"}</th>
            <th className={[defaultWidth].join(' ')} >{"B Victoria"}</th>
            <th className={[defaultWidth].join(' ')} >{"CT-value -B Victoria"}</th>
            <th className={[defaultWidth].join(' ')} >{"Cúm B (chưa xác định)"}</th>
            <th className={[defaultWidth].join(' ')} >{"CT-value - Cúm B (chưa xác định)"}</th>
            <th className={[defaultWidth].join(' ')} >{"CT-value type A (ban đầu)"}</th>
            <th className={[defaultWidth].join(' ')} >{"CT-value type B (ban đầu)"}</th>
            <th className={[defaultWidth].join(' ')} >{"Âm tính cúm"}</th>
            <th className={[defaultWidth].join(' ')} >{"SARS-CoV-2"}</th>
            <th className={[defaultWidth].join(' ')} >{"CT-value - SARS-CoV-2 (S gene)"}</th>
            <th className={[defaultWidth].join(' ')} >{"CT-value - SARS-CoV-2 (RdRp gene)"}</th>
            <th className={[defaultWidth].join(' ')} >{"CT-value - SARS-CoV-2 (N gene)"}</th>
            <th className={[defaultWidth].join(' ')} >{"RSV"}</th>
            <th className={[defaultWidth].join(' ')} >{"CT-value - RSV"}</th>
            <th className={[defaultWidth].join(' ')} >{"Các vi rút cúm khác"}</th>
            <th className={[defaultWidth].join(' ')} >{"CT-value - Các vi rút cúm khác"}</th>
            <th className={[defaultWidth].join(' ')} >{"Ngày nhập thông tin ca bệnh"}</th>
            <th className={[defaultWidth].join(' ')} >{"Số ngày từ khi lấy mẫu đến khi nhập vào hệ thống"}</th>
            <th className={[defaultWidth].join(' ')} >{"Ngày nhập kết quả XN"}</th>
            <th className={[defaultWidth].join(' ')} >{"Số ngày từ khi lấy mẫu đến khi nhập kết quả XN"}</th>
            ˝       </tr>

        <tr>
            {
                Array(65).fill(0).map((e, idx) =>
                    <th key={idx}
                        className={idx < 3 ? `sticky-col-${idx} w-[80px]` : ""}
                    >{idx + 1}</th>
                )
            }
        </tr>
    </thead >
}
