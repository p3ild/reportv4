import { format, parse } from "date-fns";
import { Result } from "antd";
import { useEffect, useRef } from "react";

export const TableData = function ({
    reportName,
    reportCode,
    orgReportName,
    dhis2Period,

    ReportHeader,

    width,
    style,

    customData,
    data,
    errors
}) {
    let tableClassName = ``, tableStyle = {};
    if (width) tableClassName = width ? `!w-[${width}]` : ''
    if (style) tableStyle = style
    let totalCol = data?.[0]?.["dataByRow"]?.[1]?.length;
    return <>
        {errors ? <Result
            status="error"
            title={
                errors?.message
            }
        // subTitle=
        // extra={<button className="btn-primary space-x-2"
        //     onClick={() => {
        //         navigate(`/`);
        //     }} ><UnorderedListOutlined /> <span>Quay lại danh sách </span></button>
        // }
        // {<Button onClick={() => {
        //     navigate(`/`);
        // }}
        //     type="primary"
        //     icon={<LeftCircleOutlined />}
        // >Quay lại danh sách</Button>}
        />
            :
            <>
                <div name="export-excel-title">
                    {
                        (ReportHeader && <ReportHeader
                            {
                            ...{
                                reportName,
                                reportCode,
                                orgReportName,
                                dhis2Period,
                                totalCol,
                                customData
                            }
                            }
                        />) || <table style={{ border: 0 }} className='mb-5'>
                            <tr>
                                <td data-f-bold="true"
                                    colSpan={10}
                                    style={{ width: "100vw", fontSize: "16px", border: 0, textAlign: "left", fontWeight: '600' }}>
                                    <p>Sở Y tế Tỉnh Nghệ An</p>
                                </td>
                            </tr>
                            <tr>
                                <td
                                    colSpan={10}
                                    style={{ width: "100vw", fontSize: "16px", border: 0, textAlign: "left" }}>
                                    <p>Đơn vị báo cáo: {orgReportName}</p>
                                </td>
                            </tr>
                            {reportCode && <tr>
                                <td style={{ width: "100vw", fontSize: "16px", border: 0, textAlign: "left" }}>
                                    <p>{reportCode || ''}</p>
                                </td>
                            </tr>}
                            <tr>
                                <td
                                    colSpan={10}
                                    data-a-h="center" data-a-v="center" data-f-bold="true" style={{ width: "100vw", fontSize: "16px", border: 0, fontWeight: 800, textAlign: "center" }}>
                                    <p>{reportName}</p></td>
                            </tr>
                            <tr>
                                <td
                                    colSpan={10}
                                    data-a-h="center" data-a-v="center" data-f-bold="true" style={{ width: "100vw", fontSize: "16px", border: 0, fontWeight: 800, textAlign: "center" }}>
                                    <p>Báo cáo: {dhis2Period}</p>
                                </td>
                            </tr>
                            <tr>
                                <td
                                    colSpan={10}
                                    data-a-h="center" data-a-v="center" data-f-bold="true" style={{ width: "100vw", fontSize: "16px", border: 0, fontWeight: 800, textAlign: "center" }}>
                                    <p className="italic">Ngày kết xuất dữ liệu cho báo cáo: {format(new Date(), 'dd/MM/yyyy')}  Nguồn dữ liệu: Phần mềm Thống kê Y tế DHIS2/A6</p>
                                </td>
                            </tr>
                        </table>
                    }
                </div>

                {
                    data?.map((tableData, tableDataIndex) => {
                        return <div key={tableDataIndex} >
                            {tableData.SectionHeader ? <div className="my-5">{tableData.SectionHeader}</div> : <div className="m-5"></div>}

                            <table
                                // className="w-full min-w-max table-auto text-left"
                                data-cols-width="200,400"
                                className={'report-table-main ' + tableClassName} style={{
                                    ...tableStyle
                                }}
                            >
                                {tableData.TableHeader}
                                <tbody>
                                    {
                                        tableData.dataByRow.map((eachRow, rowIdx) => {
                                            if (!eachRow || !Array.isArray(eachRow)) {
                                                console.log("Error")
                                            }

                                            return <tr key={rowIdx}
                                            >
                                                {eachRow.map((cell, cellIdx,) => {
                                                    let style = {
                                                        ...(cell?.colStyle || {})
                                                    }
                                                    return <td
                                                        key={cellIdx}
                                                        data-b-a-s='thin'
                                                        {...cell?.excelOpts}
                                                        className={cell?.colClassName}
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

            </>
        }
    </>
}

export const BreakLine1 = () => {
    return <span dangerouslySetInnerHTML={{ __html: '<br style="mso-data-placement: same-cell"/>' }} />
    return <>
        <br style={{
            textAlign: 'center',
            background: 'red',
            "mso-data-placement": "same-cell"
        }} />
    </>
    // return <br dangerouslySetInnerHTML={{ __html: '<br style="mso-data-placement: same-cell">' }} />
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
