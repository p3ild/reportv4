import { numToLocaleString } from "@core/utils/stringutils";
import { Flex } from "antd";
import { getValueDE } from "../../common/DataValueUtils";
import { RenderValue } from "../../common/ui";
import { ListColumnConfigBuilder } from "../../common/ui/RowRender";
import { ORG_GROUP } from "../constant";
import { getPickerStateByPath } from "@core/stateManage/corePickerState";

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
                    "data-a-v": "center",
                    // "data-t":'n'
                },
                render: ({ orgIdx }) => {
                    let value = orgIdx + 1;
                    return {
                        excelOpts: {
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
                freezeColWidth: '10vw',
                colDataClassName: '!text-left !text-nowrap',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let { orgIdx, orgName, orgUnit, period, approvalConfig } = props;

                    let { approvalKey, approvalVisible, approvalType } = approvalConfig || {};

                    return {
                        excelOpts: {
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
                    let orgFlatMap = getPickerStateByPath('orgFlatMap')
                    let value =
                    orgFlatMap[props.orgUnit]?.organisationUnitGroups.map(x => x.id).some(m => [ORG_GROUP.TUYEN_XA, ORG_GROUP.TUYEN_TINH, ORG_GROUP.TUYEN_TRUNG_UONG, ORG_GROUP.TINH_YTTN].includes(m))
                            ? 1
                            : Object.values(orgFlatMap)
                                .filter(e =>
                                    e.ancestors.map(x => x.id).join('_').includes(props.orgUnit)
                                    && e.organisationUnitGroups.map(x => x.id).includes(ORG_GROUP.TUYEN_XA)
                                ).length
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
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ["c6jDQSQhVpR"]
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
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ["I1vZQ4MI5hP"]
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
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ["QfSJtngOK7c"]
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
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ["QfSJtngOK7c.GvoEANq375m"]
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
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ["rrQkixe4Vqc"]
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
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ["BxwLDew2XkX"]
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
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ["KfJOeNWNzuB"]
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
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ["XprPxm6c373"]
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
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ["GmxEQNcg72P"]
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
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ["GmxEQNcg72P.GvoEANq375m"]
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
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ["irh3ID7zYcm"]
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
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ["qqGVFEKHwNT"]
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
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ["ZykDhCuora9"]
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
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ["ZNe5Id7Pw11"]
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
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ["SJ3MWLZS4C7"]
                        }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "19",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ["LpKmvWUeN9p"]
                        }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "20",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ["umHMm1zLFF9"]
                        }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "21",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ["RJVXpWTeq6D"]
                        }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "22",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ["DBAlTEDNafV"]
                        }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "23",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ["fgL3hP3B3Nc"]
                        }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
        ].filter(e => e).map((e, colIdx) => {
            e.colDataClassName = e.colDataClassName || ''
            if (!e.freezeColWidth) {
                if ([
                    7
                ]
                    .includes(colIdx)) {
                    e.colClassName = (e.colClassName || '') + ' w-[2vw]'
                } else {
                    e.colClassName = (e.colClassName || '') + ' w-[5vw]'
                }
            }

            return e
        })
    });
}