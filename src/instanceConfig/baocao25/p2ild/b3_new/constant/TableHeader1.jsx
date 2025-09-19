
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
const excelConfig = {
    "data-a-h": "center",
    "data-a-v": "middle",
    "data-f-bold": "true",
    "data-a-wrap": "true",
    "data-b-a-s": 'thin',
}
export function HeaderUILayoutTable1({ listColumnConfig }) {
    return <>
        <thead>
            <tr>
                <th
                    {...excelConfig}
                    rowSpan={3}
                    className="sticky-col-0"
                    style={{
                        width: '30px'
                    }}
                >TT</th>
                <th {...excelConfig}
                    rowSpan={3}
                    style={{
                        width: '200px'
                    }}
                    className="sticky-col-1"
                >Tên cơ sở</th>
                <th {...excelConfig}
                    colSpan={3}>NLYT toàn tỉnh</th>
                <th {...excelConfig}
                    colSpan={3}>Sau đại học Y khoa</th>
                <th {...excelConfig}
                    colSpan={3}>Bác sỹ</th>
                <th {...excelConfig}
                    colSpan={3}>{`YTCC (ĐH và SĐH)`}</th>
                <th {...excelConfig}
                    colSpan={3}>{`Điều dưỡng ĐH và sau ĐH`}</th>
            </tr>

            <tr>
                <th {...excelConfig}
                    rowSpan={2}>Tổng số</th>
                <th {...excelConfig}
                    colSpan={2}>Trong đó</th>
                <th {...excelConfig}
                    rowSpan={2}>Tổng số</th>
                <th {...excelConfig}
                    colSpan={2}>Trong đó</th>
                <th {...excelConfig}
                    rowSpan={2}>Tổng số</th>
                <th {...excelConfig}
                    colSpan={2}>Trong đó</th>
                <th {...excelConfig}
                    rowSpan={2}>Tổng số</th>
                <th {...excelConfig}
                    colSpan={2}>Trong đó</th>
                <th {...excelConfig}
                    rowSpan={2}>Tổng số</th>
                <th {...excelConfig}
                    colSpan={2}>Trong đó</th>
            </tr>

            <tr>
                <th {...excelConfig}>Nữ</th>
                <th {...excelConfig}>Dân tộc thiểu số</th>
                <th {...excelConfig}>Nữ</th>
                <th {...excelConfig}>Dân tộc thiểu số</th>
                <th {...excelConfig}>Nữ</th>
                <th {...excelConfig}>Dân tộc thiểu số</th>
                <th {...excelConfig}>Nữ</th>
                <th {...excelConfig}>Dân tộc thiểu số</th>
                <th {...excelConfig}>Nữ</th>
                <th {...excelConfig}>Dân tộc thiểu số</th>
            </tr>

            <tr>
                <th {...excelConfig}
                    className="sticky-col-0 col-no"
                >1</th>
                <th {...excelConfig}
                    className="sticky-col-1 col-no"
                >2</th>
                <th {...excelConfig} className={"col-no"}>3</th>
                <th {...excelConfig} className={"col-no"}>4</th>
                <th {...excelConfig} className={"col-no"}>5</th>
                <th {...excelConfig} className={"col-no"}>6</th>
                <th {...excelConfig} className={"col-no"}>7</th>
                <th {...excelConfig} className={"col-no"}>8</th>
                <th {...excelConfig} className={"col-no"}>9</th>
                <th {...excelConfig} className={"col-no"}>10</th>
                <th {...excelConfig} className={"col-no"}>11</th>
                <th {...excelConfig} className={"col-no"}>12</th>
                <th {...excelConfig} className={"col-no"}>13</th>
                <th {...excelConfig} className={"col-no"}>14</th>
                <th {...excelConfig} className={"col-no"}>15</th>
                <th {...excelConfig} className={"col-no"}>16</th>
                <th {...excelConfig} className={"col-no"}>17</th>
            </tr>
        </thead>
    </>
}

export function HeaderUILayoutTable2({ listColumnConfig }) {
    return <>
        <thead>
            <tr>
                <th
                    {...excelConfig}
                    rowSpan={3}
                    className="sticky-col-0"
                    style={{
                        width: '30px'
                    }}
                >TT</th>
                <th {...excelConfig}
                    rowSpan={3}
                    style={{
                        width: '200px'
                    }}
                    className="sticky-col-1"
                >Tên cơ sở</th>
                <th {...excelConfig}
                    colSpan={3}>KTV y ĐH và sau ĐH</th>
                <th {...excelConfig}
                    colSpan={3}>Hộ sinh đại học</th>
                <th {...excelConfig}
                    colSpan={3}>Y sĩ</th>
                <th {...excelConfig}
                    colSpan={3}>{`KTV Cao đẳng và TH y`}</th>
                <th {...excelConfig}
                    colSpan={3}>{`Điều dưỡng CĐ&TH`}</th>
            </tr>

            <tr>
                <th {...excelConfig}
                    rowSpan={2}>Tổng số</th>
                <th {...excelConfig}
                    colSpan={2}>Trong đó</th>
                <th {...excelConfig}
                    rowSpan={2}>Tổng số</th>
                <th {...excelConfig}
                    colSpan={2}>Trong đó</th>
                <th {...excelConfig}
                    rowSpan={2}>Tổng số</th>
                <th {...excelConfig}
                    colSpan={2}>Trong đó</th>
                <th {...excelConfig}
                    rowSpan={2}>Tổng số</th>
                <th {...excelConfig}
                    colSpan={2}>Trong đó</th>
                <th {...excelConfig}
                    rowSpan={2}>Tổng số</th>
                <th {...excelConfig}
                    colSpan={2}>Trong đó</th>
            </tr>

            <tr>
                <th {...excelConfig}>Nữ</th>
                <th {...excelConfig}>Dân tộc thiểu số</th>
                <th {...excelConfig}>Nữ</th>
                <th {...excelConfig}>Dân tộc thiểu số</th>
                <th {...excelConfig}>Nữ</th>
                <th {...excelConfig}>Dân tộc thiểu số</th>
                <th {...excelConfig}>Nữ</th>
                <th {...excelConfig}>Dân tộc thiểu số</th>
                <th {...excelConfig}>Nữ</th>
                <th {...excelConfig}>Dân tộc thiểu số</th>
            </tr>

            <tr>
                <th {...excelConfig}
                    className="sticky-col-0 col-no"
                >1</th>
                <th {...excelConfig}
                    className="sticky-col-1 col-no"
                >2</th>
                <th {...excelConfig} className={"col-no"}>3</th>
                <th {...excelConfig} className={"col-no"}>4</th>
                <th {...excelConfig} className={"col-no"}>5</th>
                <th {...excelConfig} className={"col-no"}>6</th>
                <th {...excelConfig} className={"col-no"}>7</th>
                <th {...excelConfig} className={"col-no"}>8</th>
                <th {...excelConfig} className={"col-no"}>9</th>
                <th {...excelConfig} className={"col-no"}>10</th>
                <th {...excelConfig} className={"col-no"}>11</th>
                <th {...excelConfig} className={"col-no"}>12</th>
                <th {...excelConfig} className={"col-no"}>13</th>
                <th {...excelConfig} className={"col-no"}>14</th>
                <th {...excelConfig} className={"col-no"}>15</th>
                <th {...excelConfig} className={"col-no"}>16</th>
                <th {...excelConfig} className={"col-no"}>17</th>
            </tr>
        </thead>
    </>
}

export function HeaderUILayoutTable3({ listColumnConfig }) {
    return <>
        <thead>
            <tr>
                <th
                    {...excelConfig}
                    rowSpan={3}
                    className="sticky-col-0"
                    style={{
                        width: '30px'
                    }}
                >TT</th>
                <th {...excelConfig}
                    rowSpan={3}
                    style={{
                        width: '200px'
                    }}
                    className="sticky-col-1"
                >Tên cơ sở</th>
                <th {...excelConfig}
                    colSpan={3}>Hộ sinh cao đẳng và TH</th>
                <th {...excelConfig}
                    colSpan={3}>Sau đại học dược</th>
                <th {...excelConfig}
                    colSpan={3}>Đại học dược</th>
                <th {...excelConfig}
                    colSpan={3}>{`Cao đẳng, trung học dược`}</th>
                <th {...excelConfig}
                    colSpan={3}>{`Nhân lực y tế khác`}</th>
            </tr>

            <tr>
                <th {...excelConfig}
                    rowSpan={2}>Tổng số</th>
                <th {...excelConfig}
                    colSpan={2}>Trong đó</th>
                <th {...excelConfig}
                    rowSpan={2}>Tổng số</th>
                <th {...excelConfig}
                    colSpan={2}>Trong đó</th>
                <th {...excelConfig}
                    rowSpan={2}>Tổng số</th>
                <th {...excelConfig}
                    colSpan={2}>Trong đó</th>
                <th {...excelConfig}
                    rowSpan={2}>Tổng số</th>
                <th {...excelConfig}
                    colSpan={2}>Trong đó</th>
                <th {...excelConfig}
                    rowSpan={2}>Tổng số</th>
                <th {...excelConfig}
                    colSpan={2}>Trong đó</th>
            </tr>

            <tr>
                <th {...excelConfig}>Nữ</th>
                <th {...excelConfig}>Dân tộc thiểu số</th>
                <th {...excelConfig}>Nữ</th>
                <th {...excelConfig}>Dân tộc thiểu số</th>
                <th {...excelConfig}>Nữ</th>
                <th {...excelConfig}>Dân tộc thiểu số</th>
                <th {...excelConfig}>Nữ</th>
                <th {...excelConfig}>Dân tộc thiểu số</th>
                <th {...excelConfig}>Nữ</th>
                <th {...excelConfig}>Dân tộc thiểu số</th>
            </tr>

            <tr>
                <th {...excelConfig}
                    className="sticky-col-0 col-no"
                >1</th>
                <th {...excelConfig}
                    className="sticky-col-1 col-no"
                >2</th>
                <th {...excelConfig} className={"col-no"}>3</th>
                <th {...excelConfig} className={"col-no"}>4</th>
                <th {...excelConfig} className={"col-no"}>5</th>
                <th {...excelConfig} className={"col-no"}>6</th>
                <th {...excelConfig} className={"col-no"}>7</th>
                <th {...excelConfig} className={"col-no"}>8</th>
                <th {...excelConfig} className={"col-no"}>9</th>
                <th {...excelConfig} className={"col-no"}>10</th>
                <th {...excelConfig} className={"col-no"}>11</th>
                <th {...excelConfig} className={"col-no"}>12</th>
                <th {...excelConfig} className={"col-no"}>13</th>
                <th {...excelConfig} className={"col-no"}>14</th>
                <th {...excelConfig} className={"col-no"}>15</th>
                <th {...excelConfig} className={"col-no"}>16</th>
                <th {...excelConfig} className={"col-no"}>17</th>
            </tr>
        </thead>
    </>
} 