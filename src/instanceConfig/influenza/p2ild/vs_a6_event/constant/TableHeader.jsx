


export function HeaderUILayout({ listColumnConfig, title }) {
    const defaultWidth = "w-[130px]"
    return <thead>
        <tr>
            <th className={`sticky-col-0`} style={{ width: '70px' }}
            >TT</th>
            <th className={`sticky-col-1`} style={{ width: '130px' }}
            >Ngày tháng năm ghi sổ</th>
            <th className={` sticky-col-2`} style={{ width: '130px' }}
            >Ngày tháng năm nhập liệu vào phần mềm</th>
            <th className={` sticky-col-3`} style={{ width: '150px' }}
            >Đơn vị</th>
            <th className={` sticky-col-4`} style={{ width: '130px' }}
            >Loại giấy tờ tuỳ thân/Định danh cá nhân</th>
            <th className={` sticky-col-5`} style={{ width: '130px' }}
            >Số giấy tờ tuỳ thân</th>
            <th className={` sticky-col-6`} style={{ width: '130px' }}
            >Họ và tên</th>
            <th className={`${defaultWidth}`}
            >Giới tính</th>
            <th className={`${defaultWidth}`}
            >Ngày tháng năm sinh</th>
            <th className={`${defaultWidth} `}
            >Địa chỉ</th>
            <th className={`${defaultWidth}`}
            >Nghề nghiệp</th>
            <th className={`${defaultWidth}`}
            >Dân tộc</th>
            <th className={`${defaultWidth}`}
            >Ngày tháng tử vong</th>
            <th className={`${defaultWidth}`}
            >Ngày tháng tử vong theo tư pháp (tham khảo)</th>
            <th className={`${defaultWidth}`}
            >Nơi tử vong</th>
            <th className={`${defaultWidth}`}
            >Nơi tử vong theo tư pháp (tham khảo)</th>
            <th className={`${defaultWidth}`}
            >Nguyên nhân chính gây tử vong (ban đầu)</th>
            <th className={`${defaultWidth}`}
            >Mã VN của nguyên nhân chính gây tử vong (ban đầu)</th>
            <th className={`${defaultWidth}`}
            >Nguyên nhân chính gây tử vong (xác định)</th>
            <th className={`${defaultWidth}`}
            >Mã VN của nguyên nhân chính gây tử vong (xác định)</th>
            <th className={`${defaultWidth}`}
            >Có khai thác Hồ sơ sức khoẻ</th>
            <th className={`${defaultWidth}`}
            >Ngày xác định nguyên nhân chính gây tử vong</th>
            <th className={`${defaultWidth}`}
            >Nguyên nhân tử vong theo tư pháp (tham khảo)</th>
            <th className={`${defaultWidth}`}
            >Đã khám/điều trị tại CSYT trong vòng 30 ngày trước khi tử vong</th>
            <th className={`${defaultWidth}`}
            >Được CBYT chăm sóc khi tử vong</th>
            <th className={`${defaultWidth}`}
            >Được cấp giấy báo tử</th>
            <th className={`${defaultWidth}`}
            >Tình trạng đăng ký khai tử</th>
            <th className={`${defaultWidth}`}
            >Ngày đăng ký khai tử theo tư pháp (tham khảo)</th>
            <th className={`${defaultWidth}`}
            >Người thu thập thông tin</th>
            <th className={`${defaultWidth}`}
            >Họ và tên người cung cấp thông tin</th>
            <th className={`${defaultWidth}`}
            >Số điện thoại người cung cấp thông tin</th>
            <th className={`${defaultWidth}`}
            >Mối quan hệ của người cung cấp thông tin với người đã chết</th>
            <th className={`${defaultWidth}`}
            >Ghi chú</th>
            <th className={`${defaultWidth}`}
            >Trường hợp tử vong được ghi nhận từ hệ thống tư pháp</th>
            <th className={`${defaultWidth}`}
            >Ngày ghi nhận từ hệ thống tư pháp</th>
            <th className={`${defaultWidth}`}
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
