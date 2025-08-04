


export function HeaderUILayout({ listColumnConfig, title }) {
    return <thead>
        <tr>
            <th className="w-[50px] sticky-col-0"
            >TT</th>
            <th className="w-[100px] sticky-col-1"
            >Ngày tháng năm ghi sổ</th>
            <th className="w-[100px] sticky-col-2"
            >Ngày tháng năm nhập liệu vào phần mềm</th>
            <th className="sticky-col-3"
            >Đơn vị</th>
            <th className="sticky-col-4"
            >Loại giấy tờ tuỳ thân/Định danh cá nhân</th>
            <th className="w-[150px] sticky-col-5"
            >Số giấy tờ tuỳ thân</th>
            <th className="sticky-col-6"
            >Họ và tên</th>
            <th
            >Giới tính</th>
            <th
            >Ngày tháng năm sinh</th>
            <th
            >Địa chỉ</th>
            <th
            >Nghề nghiệp</th>
            <th
            >Dân tộc</th>
            <th
            >Ngày tháng tử  vong</th>
            <th
            >Ngày tháng tử vong theo tư pháp (tham khảo)</th>
            <th
            >Nơi tử vong</th>
            <th
            >Nơi tử vong theo tư pháp (tham khảo)</th>
            <th
            >Nguyên nhân chính gây tử vong (ban đầu)</th>
            <th
            >Mã VN của nguyên nhân chính gây tử vong (ban đầu)</th>
            <th
            >Nguyên nhân chính gây tử vong (xác định)</th>
            <th
            >Mã VN của nguyên nhân chính gây tử vong (xác định)</th>
            <th
            >Có khai thác Hồ sơ sức khoẻ</th>
            <th
            >Ngày xác định nguyên nhân chính gây tử vong</th>
            <th
            >Nguyên nhân tử vong theo tư pháp (tham khảo)</th>
            <th
            >Đã khám/điều trị tại CSYT trong vòng 30 ngày trước khi tử vong</th>
            <th
            >Được CBYT chăm sóc  khi tử vong</th>
            <th
            >Được cấp giấy báo tử</th>
            <th
            >Tình trạng đăng ký khai tử</th>
            <th
            >Ngày đăng ký khai tử theo tư pháp (tham khảo)</th>
            <th
            >Người thu thập thông tin</th>
            <th
            >Họ và tên người cung cấp thông tin</th>
            <th
            >Số điện thoại người cung cấp thông tin</th>
            <th
            >Mối quan hệ của người cung cấp thông tin với người đã chết</th>
            <th
            >Ghi chú</th>
            <th
            >Trường hợp tử vong được ghi nhận từ hệ thống tư pháp</th>
            <th
            >Ngày ghi nhận từ hệ thống tư pháp</th>
            <th
            >Ngày cập nhật từ hệ thống tư pháp</th>
        </tr>

        <tr>
            {
                listColumnConfig.map((e, idx) =>
                    <th key={idx} className={idx < 7 ? `sticky-col-${idx}` : ""}
                    >{idx + 1}</th>
                )
            }
        </tr>
    </thead >
}
