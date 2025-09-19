import { APPROVAL_ROW_TYPE, APPROVAL_TYPE, ButtonApproval } from "@core/network/ApprovalUtils";
import { numToLocaleString } from "@core/utils/stringutils";
import { getValueDE } from "../../common/DataValueUtils";
import { ListColumnConfigBuilder } from "../../common/ui/RowRender";

export const getListColumnConfig_table1 = ({ }) => {
    return ListColumnConfigBuilder({
        listColumnConfig: [
            {
                key: "stt",
                label: 'STT',
                isApprovalColumn: true,
                excelOpts: {
                    "data-a-wrap": "true",
                    "data-a-h": "center",
                    "data-a-v": "center",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = props.orgIdx + 1;
                    let { orgUnit, period, approvalConfig } = props;
                    let { approvalKey, approvalVisible, approvalType, ds } = approvalConfig || {};


                    return {
                        view: <div className="flex flex-row w-full items-center justify-center" >
                            {(
                                approvalConfig && ![APPROVAL_ROW_TYPE.PARENT].includes(approvalVisible) && approvalKey
                            )
                                ? <ButtonApproval {
                                    ...{
                                        title: value,
                                        dsID: ds[0],
                                        orgID: orgUnit,
                                        approvalKey,
                                        period,
                                        approvalType: approvalType || APPROVAL_TYPE.APPROVE
                                    }
                                } />
                                : value
                            }
                        </div>
                    }
                }
            },
            {
                key: "orgName",
                colDataClassName: '!text-left !text-nowrap',
                excelOpts: {
                    "data-a-wrap": "true",
                },
                render: (props) => {
                    return {
                        view: props.orgName
                    }
                }
            },
            {
                key: "qI0aviwI9JS",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["qI0aviwI9JS"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "iWThCH73sWu",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["iWThCH73sWu"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "Vs6TWC5SxbB",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["Vs6TWC5SxbB"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "Vs6TWC5SxbB",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["Vs6TWC5SxbB.GvoEANq375m"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "pvzHrKHH3I5",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["pvzHrKHH3I5"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "pvzHrKHH3I5",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["pvzHrKHH3I5.GvoEANq375m"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "WvJoHH7IjFL",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["WvJoHH7IjFL"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "WvJoHH7IjFL",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["WvJoHH7IjFL.GvoEANq375m"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "wSak01RyjQ7",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["wSak01RyjQ7"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "T01fetxyjry",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["T01fetxyjry"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "T01fetxyjry",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["T01fetxyjry.GvoEANq375m"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
        ].filter(e => e).map((e, colIdx) => {
            e.colDataClassName = e.colDataClassName || ''
            if ([]
                .includes(colIdx)) {
                e.colClassName = e.colClassName || e.colClassName + ' w-[2vw]'
            } else {
                e.colClassName = e.colClassName || e.colClassName + ' w-[5vw]'
            }

            return e
        })
    });
}

export const getListColumnConfig_table2 = ({ }) => {
    return ListColumnConfigBuilder({
        listColumnConfig: [
            {
                key: "stt",
                label: 'STT',
                excelOpts: {
                    "data-a-wrap": "true",
                    "data-a-h": "center",
                    "data-a-v": "center",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = props.orgIdx + 1;
                    let { orgUnit, period, approvalConfig } = props;
                    let { approvalKey, approvalVisible, approvalType, ds } = approvalConfig || {};


                    return {
                        view: value
                    }
                }
            },
            {
                key: "orgName",
                colDataClassName: '!text-left !text-nowrap',
                excelOpts: {
                    "data-a-wrap": "true",
                },
                render: (props) => {
                    return {
                        view: props.orgName
                    }
                }
            },
            {
                key: "sFUAD4MnkHI",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["sFUAD4MnkHI"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "y1ilq7olBtd",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["y1ilq7olBtd"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "SU5TCu78G5r",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["SU5TCu78G5r"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "C2irCIrpkkr",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["C2irCIrpkkr"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "XLYCEsxbKNy",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["XLYCEsxbKNy"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "YWMQ8PsEBsT",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["YWMQ8PsEBsT"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "L94SudtYkGW",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["L94SudtYkGW"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "WlHO5LcGWP2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["WlHO5LcGWP2"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "GrNc7zoULxR",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["GrNc7zoULxR"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "gbwSwTveKtm",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["gbwSwTveKtm"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "DlvwHheog9N",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["DlvwHheog9N"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
        ].filter(e => e).map((e, colIdx) => {
            e.colDataClassName = e.colDataClassName || ''
            if ([]
                .includes(colIdx)) {
                e.colClassName = e.colClassName || e.colClassName + ' w-[2vw]'
            } else {
                e.colClassName = e.colClassName || e.colClassName + ' w-[5vw]'
            }

            return e
        })
    });
}

export const getListColumnConfig_table3 = ({ }) => {
    return ListColumnConfigBuilder({
        listColumnConfig: [
            {
                key: "stt",
                label: 'STT',
                excelOpts: {
                    "data-a-wrap": "true",
                    "data-a-h": "center",
                    "data-a-v": "center",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = props.orgIdx + 1;
                    let { orgUnit, period, approvalConfig } = props;
                    let { approvalKey, approvalVisible, approvalType, ds } = approvalConfig || {};


                    return {
                        view: value
                    }
                }
            },
            {
                key: "orgName",
                colDataClassName: '!text-left !text-nowrap',
                excelOpts: {
                    "data-a-wrap": "true",
                },
                render: (props) => {
                    return {
                        view: props.orgName
                    }
                }
            },
            {
                key: "Gx8E2HsAjVp",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["Gx8E2HsAjVp"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "SOmWBc5Ygym",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["SOmWBc5Ygym"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "j6hjO2EvUOH",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["j6hjO2EvUOH"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "CwwMLAEYbuD",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["CwwMLAEYbuD"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "QRIgOI9CRNd",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["QRIgOI9CRNd"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "UM3QlJaRPC2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["UM3QlJaRPC2"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "uI19xKbu3FK",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["uI19xKbu3FK"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "TbLiWnKhIHl",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["TbLiWnKhIHl"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "ose2S8zvDqP",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["ose2S8zvDqP"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "f66ZItJ5oIg",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["f66ZItJ5oIg"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "f66ZItJ5oIg",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["f66ZItJ5oIg-GvoEANq375m"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "VahmSj3Qy7r",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["VahmSj3Qy7r"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "nRHsIIl3soX",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["nRHsIIl3soX"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "nRHsIIl3soX",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["nRHsIIl3soX-GvoEANq375m"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "cmtE2AIEOmS",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["cmtE2AIEOmS"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "LdIfOeZFCXU",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["LdIfOeZFCXU"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
        ].filter(e => e).map((e, colIdx) => {
            e.colDataClassName = e.colDataClassName || ''
            if ([]
                .includes(colIdx)) {
                e.colClassName = e.colClassName || e.colClassName + ' w-[2vw]'
            } else {
                e.colClassName = e.colClassName || e.colClassName + ' w-[5vw]'
            }

            return e
        })
    });
}