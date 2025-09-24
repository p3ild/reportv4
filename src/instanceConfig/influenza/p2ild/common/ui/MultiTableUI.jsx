import { applyStickyTableStyles } from "@core/ui/tableUtils/sticky";
import { JsonViewDebug } from "@core/ui/utils/Debug";
import { format } from "date-fns";
import { useCallback, useEffect, useRef } from "react";
import { useResizeDetector } from 'react-resize-detector';
import { serializeError } from "serialize-error";
import './tableUtils/table.css';
import { debounce } from "lodash";
import { getPickerStateByPath } from "@core/stateManage/corePickerState";
import { SECTIONS } from "@core/ui/picker/corePicker";

// Individual table component with its own resize detection
const TableWithResize = ({ tableData, tableIndex, tableClassName, tableStyle }) => {
    const table_id = `table-${tableIndex}`;

    const debounceOnResize = useCallback(
        debounce((payload) => {
            if (payload.width !== null && payload.height !== null) {
                applyStickyTableStyles({ tableID: table_id });
            }
        }, 300),
        [table_id]
    );

    const { ref } = useResizeDetector({ onResize: debounceOnResize });

    return (
        <div key={table_id}>
            {tableData.SectionHeader ? <div className="my-5">{tableData.SectionHeader}</div> : <div className="m-5"></div>}

            <table
                id={table_id}
                table_id={table_id}
                key={tableIndex + 'table'}
                ref={ref}
                className={'report-table-main ' + tableClassName}
                style={tableStyle}
            >
                {tableData.TableHeader}
                <tbody>
                    {
                        tableData.dataByRow.map((eachRow, rowIdx) => {
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
                                    if (cell.view === '') cell.view = ' '
                                    return <td
                                        data-b-a-s='thin'
                                        {...cell?.excelOpts}
                                        key={cellIdx}
                                        className={(cell?.colDataClassName || "") + ' ' + (cell?.colClassName || "")}
                                        name={cell?.name}
                                        style={style}>
                                        {cell.view || 'render_error'}
                                    </td>
                                })}
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};
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



    if (errors) {
        return <div className="p-2">
            <JsonViewDebug data={serializeError(errors)} />


        </div>
    }
    return <div className="p-2">
        <div className="sticky left-0 !w-full">
            {
                ReportHeader || <table
                    style={{ border: 0 }} className=' mb-5 sticky left-0'>
                    <tbody>
                        {reportCode && <tr>
                            <td style={{ width: "100vw", fontSize: "16px", border: 0, textAlign: "left" }}
                            >
                                <p>{reportCode || ''}</p>
                            </td>
                        </tr>}
                        <tr>
                            <td
                                colSpan={totalCol}
                                style={{ width: "100vw", fontSize: "16px", border: 0, textAlign: "left" }}>
                                <p className="cursor-pointer" onClick={() => getPickerStateByPath("actions.openCorePicker")(true, [SECTIONS.ORG_UNIT])}>Đơn vị báo cáo: {orgReportName}</p>
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
                                <p className="cursor-pointer" onClick={() => getPickerStateByPath("actions.openCorePicker")(true, [SECTIONS.PERIOD])}>Báo cáo {dhis2Period}</p>
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
            data?.map((tableData, tableIndex) => (
                <TableWithResize
                    key={`table-${tableIndex}`}
                    tableData={tableData}
                    tableIndex={tableIndex}
                    tableClassName={tableClassName}
                    tableStyle={tableStyle}
                />
            ))
        }
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


