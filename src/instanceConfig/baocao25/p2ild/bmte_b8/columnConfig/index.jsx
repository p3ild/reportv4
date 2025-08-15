import { numToLocaleString } from "@core/utils/stringutils";
import { Flex } from "antd";
import { getValueDE } from "../../common/DataValueUtils";
import { RenderValue } from "../../common/ui";
import { ListColumnConfigBuilder } from "../../common/ui/RowRender";
import { APPROVAL_ROW_TYPE, APPROVAL_TYPE, ButtonApproval } from "@core/network/ApprovalUtils";

export const getListColumnConfig = ({ }) => {
    return ListColumnConfigBuilder({
        listColumnConfig: [
            {
                key: "stt",
                isApprovalColumn: true,
                label: 'STT',
                excelOpts: {
                    "data-a-wrap": "true",
                    "data-a-h": "center",
                    "data-a-v": "center"
                },
                render: (props) => {
                    let value = props.orgIdx + 1;
                    let { orgUnit, period, approvalConfig } = props;
                    let { approvalKey, approvalVisible, approvalType, ds } = approvalConfig || {};


                    return {
                        view: <div className="flex flex-row w-full items-center justify-center" >
                            {approvalConfig && ![APPROVAL_ROW_TYPE.PARENT].includes(approvalVisible) && approvalKey &&
                                <ButtonApproval {
                                    ...{
                                        title: value,
                                        dsID: ds[0],
                                        orgID: orgUnit,
                                        approvalKey,
                                        period,
                                        approvalType: approvalType || APPROVAL_TYPE.APPROVE
                                    }
                                } />
                            }
                        </div>
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
                    return {
                        view: props.orgName
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
                            de: ["hvS0ROXGv9e"]
                        }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "4a",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ["sw4HsEooMSp"]
                        }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "4b",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ["ezhAgYWPwre"]
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
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ["d4iPeJgrz7K"]
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
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ["mQ8QJXYcRFP"]
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
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ["mLlHmnCH4Nw"]
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
                            de: ["CjM6Xjwuohw"]
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
                            de: ["aos3iUZ9u9T"]
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
                            de: ["RHsZDNIbPxi"]
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
                            de: ["t82Gp0IG71J"]
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
                            de: ["mUy244qjDuH"]
                        }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "11a",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ["K4iyoGAYqkP"]
                        }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "11b",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ["HXpr0QXWRmJ"]
                        }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "11c",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ["klseO42Bsms"]
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
                            de: ["djtGcmFzTpk"]
                        }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "13a",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ["JXkcVU1drui"]
                        }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "13b",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ["yI3xgOU7VxK"]
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
                            de: ["BArq67DfpRK"]
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
                            de: ["Sra1fElVxHA"]
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
                            de: ["lkWJaJx1oaM"]
                        }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "17a",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ["wPlQmAEhVXa"]
                        }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "17b",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ["QXPKZgJlnqM"]
                        }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "18a",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ["Uz0R3QwHrje"]
                        }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "18b",
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                },
                render: (props) => {
                    let value = //faker.number.int({ min: 1000, max: 9999, }) || 
                        getValueDE({
                            jsonDhis: props.apiData,
                            org: props.orgUnit,
                            de: ["axloWTL6DpA"]
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
                    e.colClassName = e.colClassName || e.colClassName + ' w-[2vw]'
                } else {
                    e.colClassName = e.colClassName || e.colClassName + ' w-[5vw]'
                }
            }

            return e
        })
    });
}