import { format } from "date-fns";
import { Result } from "antd";
import { useCallback, useEffect, useRef } from "react";
import { min, toArray } from "lodash";
import { useResizeDetector } from 'react-resize-detector';
import tableBuilder from "./tableUtils/tableBuilder";
import './tableUtils/table.css'
import ReactJson from "react-json-view";
import { JsonViewDebug } from "@core/ui/utils/Debug";
import { serializeError } from "serialize-error";
import { RiErrorWarningFill } from "react-icons/ri";
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
            tableBuilder({
                tableID: `#${tableID}`,
                tableObject
            })
            applyStickyRowStyles({ tableID });
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
                <table style={{ border: 0 }} className=' mb-5 sticky left-0'>
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
                                <p className="italic">Ngày kết xuất dữ liệu cho báo cáo: {format(new Date(), 'dd/MM/yyyy')} - Nguồn dữ liệu: Phần mềm Thống kê Y tế</p>
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
                        // className="w-full min-w-max table-auto text-left"
                        id={table_id}
                        table_id={table_id}
                        ref={ref}
                        data-cols-width="200,400"
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


function applyStickyRowStyles({ tableID }) {
    {
        const thead = document.querySelectorAll(`table[table_id="${tableID}"] thead`)[0];
        if (!thead?.offsetHeight) return;
        let threadOffset = thead.offsetHeight - 10
        const stickyRows = document.querySelectorAll(`table[table_id="${tableID}"] tbody tr[class*="sticky-row-"]`);
        let levelOffsets = {};

        let minLevel = min(toArray(stickyRows).map(row => row.className.match(/sticky-row-(\d+)/)[1]));
        stickyRows.forEach(row => {
            const match = row.className.match(/sticky-row-(\d+)/);
            if (match) {
                let level = match[1], levelName = 'level-' + match[1];
                if (level == minLevel) levelOffsets[levelName] = threadOffset
                else levelOffsets[levelName] = levelOffsets[`level-${level - 1}`] + row.offsetHeight

                row.style.position = 'sticky';
                row.style.top = `${levelOffsets[levelName]}px`;
                row.style.zIndex = 4;
                row.style.background = 'white';
            }
        });
    }
    // applyStickyColStyles({table_id})
}

function applyStickyColStyles({ tableID }) {
    const stickyCols = document.querySelectorAll(`table[table_id="${tableID}"] td[sticky-col]`);
    let levelOffsets = {};

    let minLevel = min(toArray(stickyCols).map(col => parseInt(col.getAttribute('sticky-col'))));
    ([...stickyCols]).forEach((col, index, arr) => {
        const level = col.getAttribute('sticky-col');
        console.log('Col')
        if (level !== null) {
            let levelName = 'level-' + level;
            if (level == minLevel && !levelOffsets[levelName]) levelOffsets[levelName] = -10
            else levelOffsets[levelName] = levelOffsets[`level-${level - 1}`] + arr[index - 1].offsetWidth
            console.log({ levelName, levelOffsets })
            col.style.position = 'sticky';
            col.style.left = `${levelOffsets[levelName]}px`;

            // Check if this cell is also in a sticky row (intersection)
            const parentRow = col.closest('tr');
            const isInStickyRow = parentRow && parentRow.className.includes('sticky-row-');

            col.style.zIndex = 1; // Higher z-index for intersections
            col.style.background = 'white';
        }
    });
}
