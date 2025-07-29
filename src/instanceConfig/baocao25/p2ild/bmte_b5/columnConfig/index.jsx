import { faker } from '@faker-js/faker';
import { Flex } from "antd";
import { numToLocaleString } from "@core/utils/stringutils";
import { getValueDE } from "../../common/DataValueUtils";
import { RenderValue } from "../../common/ui";
import { ListColumnConfigBuilder } from "../../common/ui/RowRender";
const fakeNumber = () => {
    return undefined
    // return faker.number.int({ min: 1, max: 10,fractionDigits:1 })
    return faker.number.float({ min: 1000, max: 9999, fractionDigits: 1 })
}
export const getListColumnConfig = ({ }) => {
    return ListColumnConfigBuilder({
        listColumnConfig: [
            {
                key: "stt",
                freezeColWidth: '2vw',
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
                freezeColWidth: '13vw',
                colDataClassName: '!text-left !text-nowrap',
                excelOpts: {
                    "data-a-wrap": "true",
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
                key: "3",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = //fakeNumber() ||
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ['aEAHtEcKe8e']
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
                    let value = //fakeNumber() ||
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ['hqKW7yCrXH9']
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
                    let value = //fakeNumber() ||
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ['sbyDKnwZcOy']
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
                    let value = //fakeNumber() ||
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ['bp4fjBzE1sw']
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
                    let value = //fakeNumber() ||
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ['wtfsRmDu2CP']
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
                    let value = //fakeNumber() ||
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ['mLtnuPFSxxZ']
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
                    let value = //fakeNumber() ||
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ['uK1n7dFEI1N']
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
                    let value = //fakeNumber() ||
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ['WanOM8J3Suj']
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
                    let value = //fakeNumber() ||
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ['CGEpgEX247O']
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
                    let value = //fakeNumber() ||
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ['LxvbLJOjdg2']
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
                    let value = //fakeNumber() ||
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ['DkAOzZslOSs']
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
                    let value = //fakeNumber() ||
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ['YG7omyyd4PR']
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
                    let value = //fakeNumber() ||
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ['cpaW1UIFvGp']
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
                    let value = //fakeNumber() ||
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ['TSspKDE6jAN']
                        }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "17",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = //fakeNumber() ||
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ['DLsz1yBTbb7']
                        }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "18",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = //fakeNumber() ||
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ['vFawHfMzRgI']
                        }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
        ]
    });
}