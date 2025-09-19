
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
    }
    return <>
        <thead>
            <tr>
                <th
                    {...excelConfig}
                    rowSpan={2}
                    className="sticky-col-0"
                    style={{
                        width: '30px'
                    }}
                >TT</th>
                <th {...excelConfig}
                    rowSpan={2}
                    style={{
                        width: '200px'
                    }}
                    className="sticky-col-1"
                >Tên cơ sở</th>
                <th {...excelConfig}
                    colSpan={2}>PN mới có thai</th>
                <th {...excelConfig}
                    colSpan={2}>PN có thai</th>
                <th {...excelConfig}
                    colSpan={2}>Số khám thai</th>
                <th {...excelConfig}
                    rowSpan={2}>Tổng số phụ nữ đẻ</th>
                <th {...excelConfig}
                    colSpan={25}>Trong đó</th>
                <th {...excelConfig}
                    colSpan={3}>CS tại nhà sau sinh</th>
                <th {...excelConfig}
                    rowSpan={2}>Số ca tử vong mẹ</th>
                <th {...excelConfig}
                    rowSpan={2}>Số ca tử vong mẹ được thẩm định</th>
            </tr>
            <tr>
                <th {...excelConfig}>{`Tổng số`}</th>
                <th {...excelConfig}>{`Trđ Vị thành niên`}</th>
                <th {...excelConfig}
                >{`Tổng số`}</th>
                <th {...excelConfig}>{`Trđ Vị thành niên`}</th>
                <th {...excelConfig}>{`Tổng số`}</th>
                <th {...excelConfig}
                >{`Trđ Số lượt XN protein niệu`}</th>
                <th {...excelConfig}>{`Số đẻ VTN `}</th>
                <th {...excelConfig}>{`Số đẻ là người DTTS`}</th>
                <th {...excelConfig}>{`Số đẻ được quản lý thai`}</th>
                <th {...excelConfig}>{`Số đẻ được tiêm  UV đủ mũi`}</th>
                <th {...excelConfig}>{`Số đẻ được KT ≥ 4 lần/3 TK`}</th>
                <th {...excelConfig}>{`Số PN đẻ  DTTS được KT ≥4 lần/3 TK`}</th>
                <th {...excelConfig}>{`Số PN đẻ được XN VGB khi MT`}</th>
                <th {...excelConfig}>{`Số đẻ được XN VGB khi CD`}</th>
                <th {...excelConfig}>{`Số có KQ XN VGB (+)`}</th>
                <th {...excelConfig}>{`Số đẻ được XN GM khi MT`}</th>
                <th {...excelConfig}>{`Số đẻ được XN GM khi CD`}</th>
                <th {...excelConfig}>{`Số đẻ có KQ XN GM (+)`}</th>
                <th {...excelConfig}>{`Số đc XN HIV trước & trong lần MT này`}</th>
                <th {...excelConfig}>{`Số được XN HIV khi CD`}</th>
                <th {...excelConfig}>{`Số có KQ KĐ nhiễm HIV trong Tkỳ MT`}</th>
                <th {...excelConfig}>{`Số có KQ khẳng định nhiễm HIV`}</th>
                <th {...excelConfig}>{`Số PN đẻ HIV (+) được điều trị ARV`}</th>
                <th {...excelConfig}>{`Số đẻ được XN đường huyết`}</th>
                <th {...excelConfig}>{`Số đẻ có KQ XN ĐHcao hơn trị số bt`}</th>
                <th {...excelConfig}>{`Số PN đẻ được can thiệp FX/GH`}</th>
                <th {...excelConfig}>{`Số PN được mổ đẻ`}</th>
                <th {...excelConfig}>{`Số PN đẻ ngoài CSYT`}</th>
                <th {...excelConfig}>{`Số PN đẻ được NV Y tế đỡ`}</th>
                <th {...excelConfig}>{`Số PN đẻ được NV có kỹ năng đỡ`}</th>
                <th {...excelConfig}>{`Số trẻ được cấp giấy chứng sinh`}</th>
                <th {...excelConfig}>{`Trong vòng 6 tuần đầu`}</th>
                <th {...excelConfig}>{`Trđ: Tuần đầu`}</th>
                <th {...excelConfig}>{`Trđ: Từ tuần 2 đến hết 6 tuần`}</th>
            </tr>
            <tr>
                <th {...excelConfig}
                    className="sticky-col-0 col-no"
                >1</th>
                <th {...excelConfig}
                    className="sticky-col-1 col-no"
                >2</th>
                <th {...excelConfig} className={"col-no"}>3a</th>
                <th {...excelConfig} className={"col-no"}>3b</th>
                <th {...excelConfig} className={"col-no"}>4a</th>
                <th {...excelConfig} className={"col-no"}>4b</th>
                <th {...excelConfig} className={"col-no"}>5</th>
                <th {...excelConfig} className={"col-no"}
                    style={{
                        width: '100px'
                    }}
                >6</th>
                <th {...excelConfig} className={"col-no"}>7</th>
                <th {...excelConfig} className={"col-no"}>8a</th>
                <th {...excelConfig} className={"col-no"}>8b</th>
                <th {...excelConfig} className={"col-no"}>8c</th>
                <th {...excelConfig} className={"col-no"}>8d</th>
                <th {...excelConfig} className={"col-no"}>9a</th>
                <th {...excelConfig} className={"col-no"}>9b</th>
                <th {...excelConfig} className={"col-no"}>10a</th>
                <th {...excelConfig} className={"col-no"}>10b</th>
                <th {...excelConfig} className={"col-no"}>10c</th>
                <th {...excelConfig} className={"col-no"}>11a</th>
                <th {...excelConfig} className={"col-no"}>11b</th>
                <th {...excelConfig} className={"col-no"}>11c</th>
                <th {...excelConfig} className={"col-no"}>12a</th>
                <th {...excelConfig} className={"col-no"}>12b</th>
                <th {...excelConfig} className={"col-no"}>13a</th>
                <th {...excelConfig} className={"col-no"}>13b</th>
                <th {...excelConfig} className={"col-no"}>14</th>
                <th {...excelConfig} className={"col-no"}>15a</th>
                <th {...excelConfig} className={"col-no"}>15b</th>
                <th {...excelConfig} className={"col-no"}>16</th>
                <th {...excelConfig} className={"col-no"}>17</th>
                <th {...excelConfig} className={"col-no"}>18a</th>
                <th {...excelConfig} className={"col-no"}>18b</th>
                <th {...excelConfig} className={"col-no"}>18c</th>
                <th {...excelConfig} className={"col-no"}>19</th>
                <th {...excelConfig} className={"col-no"}>20</th>
                <th {...excelConfig} className={"col-no"}>21a</th>
                <th {...excelConfig} className={"col-no"}>21b</th>
                <th {...excelConfig} className={"col-no"}>22a</th>
                <th {...excelConfig} className={"col-no"}>22b</th>
            </tr>
        </thead>
    </>
}