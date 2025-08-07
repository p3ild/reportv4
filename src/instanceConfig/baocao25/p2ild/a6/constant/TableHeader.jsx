


export function HeaderUILayout({ listColumnConfig, title }) {
    const defaultWidth = "w-[130px]"
    return <thead>
        <tr>
            <th className="w-[50px]"
            >TT</th>
            <th className={`${defaultWidth}`}
            >Ngày tháng năm ghi sổ</th>
            <th className={`${defaultWidth}`}
            >Ngày tháng năm nhập liệu vào phần mềm</th>
            <th className="w-[170px]"
            >Đơn vị nhập</th>
            <th className="w-[150px]"
            >Họ và tên</th>
            <th className={`${defaultWidth}`}
            >Giới tính</th>
            <th className={`${defaultWidth}`}
            >Ngày tháng năm sinh</th>
            <th className={`${defaultWidth}`}
            >ĐDCN/ Giấy tờ tùy thân</th>
            <th className="w-[130px]"
            >Địa chỉ</th>
            <th className={`${defaultWidth}`}
            >Nghề nghiệp</th>
            <th className={`${defaultWidth}`}
            >Dân tộc</th>
            <th className={`${defaultWidth}`}
            >Ngày tháng tử  vong</th>
            <th className={`${defaultWidth}`}
            >Nơi tử vong</th>
            <th className="w-[150px]"
            >Nguyên nhân chính gây tử vong</th>
            <th className="w-[150px]"
            >Mã VN</th>
            <th className="w-[150px]"
            >Đã khám/điều trị tại CSYT trong vòng 30 ngày trước khi tử vong</th>
            <th className="w-[150px]"
            >Được CBYT chăm sóc  khi tử vong</th>
            <th className={`${defaultWidth}`}
            >Được cấp giấy báo tử</th>
            <th className={`${defaultWidth}`}
            >Người thu thập</th>
            <th className="w-[170px]"
            >Số điện thoại người nhà của trường hợp tử vong</th>
            <th>Ghi chú</th>
        </tr>
        <tr>
            {
                listColumnConfig.map((e, idx) =>
                    <th key={idx}
                    >{idx + 1}</th>
                )
            }
        </tr>
    </thead>
}
