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
                key: "TjsrDy8W8h3",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["TjsrDy8W8h3"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "TyqF8uBkL7B",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["TyqF8uBkL7B"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "CR18qa3xmiF",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["CR18qa3xmiF"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "RRnKZsIUweW",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["RRnKZsIUweW"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "S4NScJXJ0Bx",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["S4NScJXJ0Bx"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "U5RaHHmpAFs",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["U5RaHHmpAFs"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "ChgePBcK76w",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["ChgePBcK76w"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "mzyg9Os6CYe",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["mzyg9Os6CYe"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "TgPeB3Q82Az",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["TgPeB3Q82Az"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "PFBtIcnqhNV",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["PFBtIcnqhNV"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            }
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
                key: "DkOZff7DZkl",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["DkOZff7DZkl"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "ZIOSE2mQfW9",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["ZIOSE2mQfW9"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "U3cZRl5Hci5",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["U3cZRl5Hci5"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "rbCiI7G5WDu",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["rbCiI7G5WDu"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "fUaToKQ0ZpI",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["fUaToKQ0ZpI"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "L5TaiYbqD6w",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["L5TaiYbqD6w"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "JXXc1zqIIwf",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["JXXc1zqIIwf"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "HKg6QgHYSiu",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["HKg6QgHYSiu"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "a8twU2lbca9",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["a8twU2lbca9"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "VA1GARaJqcO",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["VA1GARaJqcO"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            }
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