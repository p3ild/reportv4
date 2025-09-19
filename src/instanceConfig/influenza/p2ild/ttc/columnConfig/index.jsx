
import { APPROVAL_ROW_TYPE, APPROVAL_TYPE, ButtonApproval } from "@core/network/ApprovalUtils";
import { numToLocaleString } from "@core/utils/stringutils";
import { getValueDE } from "../../common/DataValueUtils";
import { ListColumnConfigBuilder } from "../../common/ui/RowRender";


export const getListColumnConfig = ({ }) => {
    return ListColumnConfigBuilder({
        listColumnConfig: [
            {
                key: "stt",
                label: 'STT',
                isApprovalColumn: true,
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
                colClassName: 'w-[25vw]',
                colDataClassName: '!text-left !text-nowrap',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    return {
                        view: props.orgName
                    }
                }
            },
            {
                key: "Tổng số",
                colClassName: 'w-[15vw]',
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["ZYDqKZDP7Rz"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "Nữ",
                colClassName: 'w-[15vw]',
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["ZYDqKZDP7Rz.GvoEANq375m"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "Trẻ em &lt;5 tuổi",
                colClassName: 'w-[15vw]',
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["xcvRHk5OWIY"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "Trẻ em &lt;15 tuổi",
                colClassName: 'w-[15vw]',
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["o2lbJLDJ0YX"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "PN từ 15-49 tuổi",
                colClassName: 'w-[15vw]',
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["BUYJMCnJun7"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "Xã đạt tiêu chí QG về YT",
                colClassName: 'w-[15vw]',
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["xVJx9A4MwWH"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "TYT triển khai dự phòng, quản lý điều trị bệnh không lây nhiễm",
                colClassName: 'w-[25vw]',
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["WbZdhvTmYiU"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "Xã/ phường có TYT",
                colClassName: 'w-[15vw]',
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["v9f7yBuGbi6"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "Bác sỹ định biên",
                colClassName: 'w-[15vw]',
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["NdEWLvw94po"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "Bác sỹ làm việc",
                colClassName: 'w-[15vw]',
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["A1HRS93Y8IU"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "YHCT",
                colClassName: 'w-[15vw]',
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["z3IfKG0JvOi"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "HS/ YSSN",
                colClassName: 'w-[15vw]',
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["yuq8HkHFuDG"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },

            {
                key: "Tổng số",
                colClassName: 'w-[15vw]',
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["S117HX9INOg"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "Có nhân viên y tế hoạt động",
                colClassName: 'w-[15vw]',
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["KaNOeN9lTVb"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "Có cô đỡ được đào tạo",
                colClassName: 'w-[15vw]',
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                    // "data-t":'n'
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["c74rVPtTJRc"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },

            {
                key: "",
                colClassName: 'w-[15vw]',
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["HAcXJupQpZO"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "",
                colClassName: 'w-[15vw]',
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["CFnatCKrNQB"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "",
                colClassName: 'w-[15vw]',
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["XQsBth4T7fx"]
                    }) + "";
                    return {
                        value,
                        view: numToLocaleString(value)
                    }
                }
            },
            {
                key: "",
                colClassName: 'w-[15vw]',
                colDataClassName: '!text-right',
                excelOpts: {
                    "data-a-wrap": "true",
                },
                render: (props) => {
                    let value = getValueDE({
                        jsonDhis: props.apiData,
                        org: props.orgUnit,
                        de: ["AoI4Bcw6Bwp"]
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