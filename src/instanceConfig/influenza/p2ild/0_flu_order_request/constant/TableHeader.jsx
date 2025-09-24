
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
            <th className={[`sticky-col-0`, BORDER.NONE_BOTTOM, WIDTH.SMALL].join(' ')}>Ord</th>
            <th className={[`sticky-col-1`, WIDTH.MEDIUM, BORDER.NONE_BOTTOM].join(' ')}>Hospital code</th>
            <th className={[`sticky-col-2`, WIDTH.LARGE, BORDER.NONE_BOTTOM].join(' ')}>Order require date</th>
            <th className={[defaultWidth, WIDTH.LARGE, BORDER.NONE_BOTTOM].join(' ')}>Code</th>
            <th className={[defaultWidth, WIDTH.LARGE,BORDER.NONE_BOTTOM].join(' ')}>Name of goods/services</th>
            <th className={[defaultWidth, BORDER.NONE_BOTTOM].join(' ')}>Manufacturer</th>
            <th className={[defaultWidth, BORDER.NONE_BOTTOM].join(' ')}>Packing</th>
            <th className={[defaultWidth, BORDER.NONE_BOTTOM].join(' ')}>Unit</th>
            <th className={[defaultWidth, BORDER.NONE_BOTTOM].join(' ')}>Quantity</th>
            <th className={[defaultWidth, BORDER.NONE_BOTTOM].join(' ')}>Unit cost</th>
            <th className={[defaultWidth, BORDER.NONE_BOTTOM].join(' ')}>Total cost</th>
            <th className={[defaultWidth, BORDER.NONE_BOTTOM].join(' ')}>Order request number</th>
            <th className={[defaultWidth, BORDER.NONE_BOTTOM].join(' ')}>Selected vendor</th>
            <th className={[defaultWidth, WIDTH.LARGE, BORDER.NONE_BOTTOM].join(' ')}>Quotation date</th>
            <th className={[defaultWidth, WIDTH.LARGE, BORDER.NONE_BOTTOM].join(' ')}>Received date</th>
            <th className={[defaultWidth, WIDTH.LARGE, BORDER.NONE_BOTTOM].join(' ')}>Note</th>
        </tr>

        <tr>
            <th className={[`sticky-col-0`, BORDER.NONE_TOP].join(' ')}> TT</th>
            <th className={[`sticky-col-1`, BORDER.NONE_TOP].join(' ')}> Mã bệnh viện</th>
            <th className={[`sticky-col-2`, WIDTH.LARGE, BORDER.NONE_TOP].join(' ')}> Ngày đặt hàng</th>
            <th className={[defaultWidth, BORDER.NONE_TOP].join(' ')}> Mã hàng hóa</th>
            <th className={[defaultWidth, BORDER.NONE_TOP].join(' ')}> Tên hàng hóa</th>
            <th className={[defaultWidth, BORDER.NONE_TOP].join(' ')}>  Nhà sản xuất</th>
            <th className={[defaultWidth, BORDER.NONE_TOP].join(' ')}> Quy cách đóng gói</th>
            <th className={[defaultWidth, BORDER.NONE_TOP].join(' ')}> Đơn vị tính</th>
            <th className={[defaultWidth, BORDER.NONE_TOP].join(' ')}> Số lượng</th>
            <th className={[defaultWidth, BORDER.NONE_TOP].join(' ')}> Đơn giá</th>
            <th className={[defaultWidth, BORDER.NONE_TOP].join(' ')}> Thành tiền</th>
            <th className={[defaultWidth, BORDER.NONE_TOP].join(' ')}> Mã số đơn hàng</th>
            <th className={[defaultWidth, BORDER.NONE_TOP].join(' ')}> Nhà cung cấp</th>
            <th className={[defaultWidth, WIDTH.LARGE, BORDER.NONE_TOP].join(' ')}> Ngày nhận báo giá</th>
            <th className={[defaultWidth, WIDTH.LARGE, BORDER.NONE_TOP].join(' ')}> Ngày nhận hàng</th>
            <th className={[defaultWidth, BORDER.NONE_TOP].join(' ')}> Ghi chú</th>
        </tr>


        <tr>
            {
                listColumnConfig.map((e, idx) =>
                    <th key={idx}
                        className={idx < 3 ? `sticky-col-${idx} w-[80px]` : ""}
                    >{idx + 1}</th>
                )
            }
        </tr>
    </thead >
}
