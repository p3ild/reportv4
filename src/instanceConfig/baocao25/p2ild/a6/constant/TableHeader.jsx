


export function HeaderUILayout({ listColumnConfig, title }) {
    return <thead>
        <tr>
            <th className="w-[50px]"
            >TT</th>
            <th className="w-[100px] "
            >Ngày tháng năm ghi sổ</th>
            <th className="w-[100px] "
            >Ngày tháng năm nhập liệu vào phần mềm</th>
            <th
            >Đơn vị nhập</th>
            <th
            >Họ và tên</th>
            <th
            >Giới tính</th>
            <th
            >Ngày tháng năm sinh</th>
            <th
            >ĐDCN/ Giấy tờ tùy thân</th>
            <th
            >Địa chỉ</th>
            <th
            >Nghề nghiệp</th>
            <th
            >Dân tộc</th>
            <th
            >Ngày tháng tử  vong</th>
            <th
            >Nơi tử vong</th>
            <th
            >Nguyên nhân chính gây tử vong</th>
            <th
            >Mã VN</th>
            <th className="w-[150px]"
            >Đã khám/điều trị tại CSYT trong vòng 30 ngày trước khi tử vong</th>
            <th
            >Được CBYT chăm sóc  khi tử vong</th>
            <th
            >Được cấp giấy báo tử</th>
            <th
            >Người thu thập</th>
            <th
            >Số điện thoại người nhà của trường hợp tử vong</th>
            <td align="center">Ghi chú</td>
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
