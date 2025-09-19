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
                        de: ['q89OtnM0Eh2']
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "uT4AyDAaTrg",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ['uT4AyDAaTrg']
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "ebqyUZOnSkm",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ['ebqyUZOnSkm']
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "icS2nkzzdv8",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ['icS2nkzzdv8']
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "icS2nkzzdv8.GvoEANq375m",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ['icS2nkzzdv8.GvoEANq375m']
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "d9dkr72ldLN",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ['d9dkr72ldLN']
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "i4jo4Fh5zPN",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ['i4jo4Fh5zPN']
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "i4jo4Fh5zPN.GvoEANq375m",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ['i4jo4Fh5zPN.GvoEANq375m']
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "GjqYq9b8bFn",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ['GjqYq9b8bFn']
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "B7yP8MmG3HJ",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ['B7yP8MmG3HJ']
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "B7yP8MmG3HJ.GvoEANq375m",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ['B7yP8MmG3HJ.GvoEANq375m']
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "Yd7yygLgYue",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ['Yd7yygLgYue']
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "HcyREHmKrPM",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ['HcyREHmKrPM']
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "HcyREHmKrPM.GvoEANq375m",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ['HcyREHmKrPM.GvoEANq375m']
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "BNuK7qsDc5V",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ['BNuK7qsDc5V']
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
                key: "Fgfyca3IVuM",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ['Fgfyca3IVuM']
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "Fgfyca3IVuM.GvoEANq375m",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ['Fgfyca3IVuM.GvoEANq375m']
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "me9mk1OXcW2",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ['me9mk1OXcW2']
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "WSUkqeqXbWO",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ['WSUkqeqXbWO']
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "WSUkqeqXbWO.GvoEANq375m",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ['WSUkqeqXbWO.GvoEANq375m']
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "sxCM4oRCF5z",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ['sxCM4oRCF5z']
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "RpJeDDGzpYt",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ['RpJeDDGzpYt']
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "RpJeDDGzpYt.GvoEANq375m",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ['RpJeDDGzpYt.GvoEANq375m']
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "qz30Vcs4UOE",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ['qz30Vcs4UOE']
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "aDIlmHjdxch",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ['aDIlmHjdxch']
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "aDIlmHjdxch.GvoEANq375m",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ['aDIlmHjdxch.GvoEANq375m']
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "oQ1eUbQXnA4",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ['oQ1eUbQXnA4']
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "d4idAZBs7aR",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ['d4idAZBs7aR']
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "d4idAZBs7aR.GvoEANq375m",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ['d4idAZBs7aR.GvoEANq375m']
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "ecnwSBnApM3",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ['ecnwSBnApM3']
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
                key: "lQniaEDE0zj",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ['lQniaEDE0zj']
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "lQniaEDE0zj",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ['lQniaEDE0zj']
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "RoNWo78P92J",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ['RoNWo78P92J']
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "moUhfe3z4xn",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ['moUhfe3z4xn']
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "moUhfe3z4xn",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ['moUhfe3z4xn']
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "cUnrKRSxFcg",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ['cUnrKRSxFcg']
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "pRF4qURyWHq",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ['pRF4qURyWHq']
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "pRF4qURyWHq",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ['pRF4qURyWHq']
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "aUaYRtA4OuZ",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ['aUaYRtA4OuZ']
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "hAh6A8CC4IW",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ['hAh6A8CC4IW']
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "hAh6A8CC4IW",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ['hAh6A8CC4IW']
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "fgdUu6zpu5T",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ['fgdUu6zpu5T']
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "qQeyMtOYpRS",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ['qQeyMtOYpRS']
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "qQeyMtOYpRS",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ['qQeyMtOYpRS']
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "hBrE4YgsrZU",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ['hBrE4YgsrZU']
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