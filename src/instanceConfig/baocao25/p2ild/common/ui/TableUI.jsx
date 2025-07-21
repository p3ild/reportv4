import { Table } from "@mui/material";
import { useMemo } from "react";
 export const TableData = function ({
    reportName,
    reportCode,
    TableHeader,
    dataByRow,
    orgReportName,
    dhis2Period }) {
    const Header = useMemo(() => {
        return TableHeader
    }, [orgReportName])
    return <>
        {/* <div>
            <p>Đơn vị báo cáo: {orgReportName}</p>
            {reportCode || ''}
            <br />
            <div className="flex flex-col gap-1 text-center">
                <p className="font-bold">{reportName}</p>
                <p className="font-bold mb-2">Năm {dhis2Period}</p>
            </div>
        </div> */}
        <div name="">
            {/* <Table style={{ border: 0 }}> */}
            <tr>
                <td style={{ width: "100vw", fontSize: "16px", border: 0, textAlign: "left" }}>
                    <p>Đơn vị báo cáo: {orgReportName}</p>
                </td>
            </tr>
            <tr>
                <td style={{ width: "100vw", fontSize: "16px", border: 0, textAlign: "left" }}>
                    <p>{reportCode || ''}</p>
                </td>
            </tr>
            <tr>
                <td colSpan={dataByRow?.[0]?.length} style={{ width: "100vw", fontSize: "16px", border: 0, fontWeight: 800 }}>
                    <p>{reportName}</p></td>
            </tr>
            <tr>
                <td colSpan={dataByRow?.[0]?.length} style={{ width: "100vw", fontSize: "16px", border: 0, fontWeight: 800 }}>
                    <p>Năm {dhis2Period}</p>
                </td>
            </tr>
            <br />
            <tr>
                
            </tr>
            {/* </Table> */}
        </div>

        <Table>
            {Header}
            <tbody>
                {
                    dataByRow.map((eachRow, rowIdx) => {
                        return <tr key={rowIdx}>
                            {eachRow.map((cell, cellIdx,) => {
                                return <td
                                    key={cellIdx}
                                    className={cell?.colClassName}
                                    name={cell?.name}
                                    style={cell?.colStyle} >
                                    {cell?.view || cell || 'render_error'}
                                </td>
                            })}
                        </tr>
                    }
                    )
                }
            </tbody>
        </Table>
    </>

}