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
                freezeColWidth: '5vw',
                label: 'STT',
                excelOpts: {
                    "data-a-wrap": "true",
                    "data-a-h": "center",
                    "data-a-v": "center",
                    "sticky-col": 0
                    // "data-t":'n'
                },
                render: ({ orgIdx }) => {
                    let value = orgIdx + 1;
                    return {
                        excelOpts: {
                            "sticky-col": 0
                        },
                        view: <RenderValue {...{
                            value
                        }}
                        ></RenderValue>
                    }
                }
            },
            {
                key: "orgName",
                freezeColWidth: '13vw',
                colDataClassName: '!text-left !text-nowrap',
                excelOpts: {
                    "data-a-wrap": "true",
                    "sticky-col": 1
                    // "data-t":'n'
                },
                render: (props) => {
                    let { orgIdx, orgName, orgUnit, period, approvalConfig } = props;

                    let { approvalKey, approvalVisible, approvalType } = approvalConfig || {};

                    return {
                        excelOpts: {
                            "sticky-col": 0
                        },
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
                key: "3",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ['EbgigboTmrd']
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
                            de: ['OOvABOGvmwx']
                        }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "5a",
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
                            de: ['XCOxyF9ZvFn']
                        }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "5b",
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
                            de: ['VJVi4KCxpzU']
                        }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "5c",
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
                            de: ['ojeJgOjf9vm']
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
                            de: ['nOKoSAWmBaJ']
                        }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "7",
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
                            de: ['HjOtfiHHCVv']
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
                            de: ['ycVdXnxxwHs']
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
                            de: ['hoegsBrTcwt']
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
                            de: ['SL8sVvRQK6P']
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
                            de: ['hMHRO6boyNh']
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
                            de: ['dBlYwCRZr0b']
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
                            de: ['KzU9muBt4Le']
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
                            de: ['eqChBVhTqkF']
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