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
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["sBt60K8QjaF"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["xHiXnwpt9Xi"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["fPTXIoHzrk4"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["sjCCvNcYbHB"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["B5GqKG9VXQO"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["UTE413dUrfc"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["Yp7Da5QxFoC"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["o2mFOm8ywhn"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["Jvpu7xWS1Ex"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["tSJ2dEwmXkB"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["mLkKBW4E1g1"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["dEmoO5MzOQH"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["l80MOAkvVmU"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["jBzodX3jiYQ"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["eDR35tmgEit"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["JJiWlbvsC26"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["tQ8DS3VvTHh"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["W7Rb0Gl5YD4"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["mKk6a62kEzA"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["LbXovj5cLLV"]
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
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["sUG3FfYcW9C"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["K3jJ7PsTmCz"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["CRbZUey5FmZ"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["tEewiEvBCFh"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["DmtZQI9mgV3"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["ko3YTitQutr"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["YTKjL9NhV0s"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["HsKNGfqp6ua"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["BlPpMf7JVhL"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["VP75iYycepp"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["U07W2Bnm6zP"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["xaClBj5XFof"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["tAnI2monttO"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["tjWAmJdy8Ui"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["SaeS16zlsdL"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["Hk7UyDojPSV"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["niJ1WbDyHNr"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["dzf3gZhIxxF"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["ppTmybhZ1Pz"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["nsr6sr2o2rj"]
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
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["m0MrJMPF20m"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["e3FI14TdzXI"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["nX7ULG9910Z"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["SdeBkbLEYbu"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["YekyOwXs8YG"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["R3o4l0wMAcz"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["wuuyNVYp2xL"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["hvooCwSKgeV"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["ZQDNZRCdfmj"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["sw3nKSwjMRs"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["P29peKP3FW3"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["DUaRjh7mGro"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["nQUm9HUWRFk"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["sMt9g0oXC9J"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["aPoi2dHWeVi"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["oyN4tiDAeMz"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["DI9bEVW9nhK"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["ZGA32hV9es4"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["DlDcFq9obQm"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["ykST4Kc8zRT"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["copAByC0cPm"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["zKjqPYMNV7D"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["VK3FyPHCT38"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "q89OtnM0Eh2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["puRKLFuqohO"]
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