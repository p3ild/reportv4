import { applyStickyTableStyles } from "@core/ui/tableUtils/sticky";
import { JsonViewDebug } from "@core/ui/utils/Debug";
import { format } from "date-fns";
import { useCallback, useEffect, useRef } from "react";
import { useResizeDetector } from 'react-resize-detector';
import { serializeError } from "serialize-error";
import './tableUtils/table.css';
export const TableData = function (props) {
    let {
        reportName,
        reportCode,
        orgReportName,
        dhis2Period,

        ReportHeader,

        width,
        style,
        data,
        errors
    } = props

    let tableClassName = ``, tableStyle = {};
    if (width) tableClassName = width ? `!w-[${width}]` : ''
    if (style) tableStyle = style
    let totalCol = data?.[0]?.["dataByRow"]?.[1]?.length;

    let tableObject = useRef(null)
    const onResize = useCallback((payload) => {
        if (payload.width !== null && payload.height !== null) {
            let tableID = payload.entry.target.getAttribute('table_id')
            applyStickyTableStyles({ tableID });
        } else {
            console.log('Element unmounted');
        }

    }, []);
    const { ref } = useResizeDetector({ onResize });

    if (errors) {
        return <div className="p-2">
            <JsonViewDebug data={serializeError(errors)} />


        </div>
    }
    return <div className="p-2">
        <div className="sticky left-0 !w-full">
            {
                <table
                    style={{ border: 0 }} className=' mb-5 sticky left-0'>
                    <tbody>
                        {reportCode && <tr>
                            <td style={{ width: "100vw", fontSize: "16px", border: 0, textAlign: "left" }}>
                                <p>{reportCode || ''}</p>
                            </td>
                        </tr>}
                        <tr>
                            <td
                                colSpan={totalCol}
                                style={{ width: "100vw", fontSize: "16px", border: 0, textAlign: "left" }}>
                                <p>Đơn vị báo cáo: {orgReportName}</p>
                            </td>
                        </tr>
                        <tr>
                            <td
                                colSpan={totalCol}
                                data-a-h="center" data-a-v="center" data-f-bold="true" style={{ width: "100vw", fontSize: "16px", border: 0, fontWeight: 800, textAlign: "center" }}>
                                <p>{reportName?.toUpperCase()}</p></td>
                        </tr>
                        <tr>
                            <td
                                colSpan={totalCol}
                                data-a-h="center" data-a-v="center" data-f-bold="true" style={{ width: "100vw", fontSize: "16px", border: 0, fontWeight: 800, textAlign: "center" }}>
                                <p>Báo cáo {dhis2Period}</p>
                            </td>
                        </tr>
                        <tr>
                            <td
                                colSpan={totalCol}
                                data-a-h="center" data-a-v="center" data-f-bold="true" style={{ width: "100vw", fontSize: "16px", border: 0, fontWeight: 800, textAlign: "center" }}>
                                <p className="italic">Ngày kết xuất báo cáo: {format(new Date(), 'dd/MM/yyyy')} - Nguồn dữ liệu: Phần mềm Thống kê y tế</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            }
        </div>

        {
            data?.map((e, tableIndex) => {
                let table_id = `table-${tableIndex}`;
                return <div key={tableIndex} >
                    {e.SectionHeader ? <div className="my-5">{e.SectionHeader}</div> : <div className="m-5"></div>}

                    <table
                        id={table_id}
                        table_id={table_id}
                        ref={ref}
                        className={
                            'report-table-main ' +
                            tableClassName} style={{
                                ...tableStyle
                            }}
                    >
                        {e.TableHeader}
                        <tbody>
                            {
                                e.dataByRow.map((eachRow, rowIdx) => {
                                    if (!eachRow || !Array.isArray(eachRow)) {
                                        console.log("Error")
                                    }

                                    return <tr key={rowIdx} {
                                        ...{
                                            style: eachRow[0]?.rowStyle,
                                            className: eachRow[0]?.className,
                                        }
                                    }
                                    >
                                        {eachRow.map((cell, cellIdx,) => {
                                            let style = {
                                                ...(cell?.colStyle || {})
                                            }
                                            return <td
                                                data-b-a-s='thin'
                                                {...cell?.excelOpts}
                                                key={cellIdx}
                                                className={(cell?.colClassName || "") + ' ' + (cell?.colDataClassName || "")}
                                                name={cell?.name}
                                                style={style}>
                                                {cell?.view || 'render_error'}
                                            </td>
                                        })}
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            })}
    </div>
}

export const BreakLine = () => {
    const brRef = useRef(null);

    useEffect(() => {
        if (brRef.current) {
            brRef.current.setAttribute('style', 'mso-data-placement: same-cell');
        }
    }, []);

    return <br ref={brRef} />;
};

