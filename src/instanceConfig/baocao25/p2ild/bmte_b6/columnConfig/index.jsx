import { Flex } from "antd";
import { cloneDeep } from "lodash";
import { DATA_TYPE, getValueDE, numberWithThousands, roundNumber } from "../../common/DataValueUtils";
import { fetchAnalyticsData } from "../../common/request/request";
import { RenderValue } from "../../common/ui";
import { ApproveButton } from "../../common/ui/ApproveButtonTT37";
import { ListColumnConfigBuilder } from "../../common/ui/RowRender";
import { faker } from '@faker-js/faker';
import { numToLocaleString } from "@core/utils/stringutils";

export const getListColumnConfig = ({ }) => {
    return ListColumnConfigBuilder({
        listColumnConfig: [
            {
                key: "stt",
                freezeColWidth: '3vw',
                label: 'STT',
                excelOpts: {
                    "data-a-wrap": "true",
                    "data-a-h": "center",
                    "data-a-v": "center"
                },
                render: ({ orgIdx }) => {
                    let value = orgIdx + 1;
                    return {
                        view: <RenderValue {...{
                            value
                        }}
                        ></RenderValue>
                    }
                }
            },
            {
                key: "orgName",
                freezeColWidth: '10vw',
                colDataClassName: '!text-left !text-nowrap',
                excelOpts: {
                    "data-a-wrap": "true"
                },
                render: (props) => {
                    let { orgIdx, orgName, orgUnit, period, approvalConfig } = props;

                    let { approvalKey, approvalVisible, approvalType } = approvalConfig || {};

                    return {
                        view: <Flex vertical >
                            <RenderValue {...{
                                value: props.orgName,
                                ...props,
                            }}
                            ></RenderValue>
                            {/* {approvalConfig && ![APPROVAL_VISIBLE.PARENT].includes(approvalVisible) && approvalKey &&
                                <ButtonApproval {
                                    ...{
                                        dsID: [rc7A].includes(reportCode) ? "MqtODSonraB" : "V8EEowMeUTO", period, orgID: orgUnit,
                                        approvalKey,
                                        approvalType: approvalType || APPROVAL_TYPE.APPROVE
                                    }
                                } />
                            } */}
                        </Flex>
                    }
                }
            },
            {
                key: "3a",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ['VnQNEJEQgBG']
                        }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "3b",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ['']
                        }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "4",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ['PlEEec2kdNT']
                        }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "5",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ['f3Q8ePAjrnl']
                        }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "6",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ['Rbla6Z81z9l']
                        }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "7",
                colDataClassName: '!text-right w-[5vw]',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ['PERMQRLP8eD']
                        }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "8",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ['aCxlog8nTP9']
                        }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "9",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ['mIh3UPtjTXc']
                        }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "10",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ['swLTD7Obkns']
                        }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "11",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ['JvUdl1Prp9C']
                        }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "12",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ['PjCNurYlbM7']
                        }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "13",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ['EQY2K3TQdmq']
                        }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "14",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ['jSIcvmxyzJG']
                        }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "15",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ['T9qCKalHUQ0']
                        }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "16",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ['sGJybKlS1d1']
                        }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            }
        ].filter(e => e).map((e, colIdx) => {
            e.colDataClassName = e.colDataClassName || ''
            if (!e.freezeColWidth) {
                if ([
                    7
                ]
                    .includes(colIdx)) {
                    e.colClassName = e.colClassName || e.colClassName + ' w-[2vw]'
                } else {
                    e.colClassName = e.colClassName || e.colClassName + ' w-[5vw]'
                }
            }

            return e
        })
    });
}