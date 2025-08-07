import { RenderValue } from ".";
import { numberWithThousands } from "../DataValueUtils";
import { fetchAnalyticsData } from "../request/request";
import { cloneDeep, omit, sum, toNumber, zip } from 'lodash'
import { ApproveButton } from "./ApproveButtonTT37";
import { Flex } from "antd";
import { APPROVAL_VISIBLE, ButtonApproval } from "@core/hooks/useApproval";
import { numToLocaleString } from "@core/utils/stringutils";
/** return rows as array.
 *  Flow: query api -> 
 * 
 */
export const ORG_ALLOW_APPROVE = {
    CHILD_ROW: "CHILD_ROW",
    TOTAL_ROW: "TOTAL_ROW",
    ALL_ROW: "ALL_ROW",
}
export const listingRowByOuGroup = async (props) => {
    let {
        dx,//List data element
        orgUnitGroup,
        idOrgGroupSet,
        orgUnit,
        period,
        customDimension,

        includeTotalRow,// init total row with col NO. and col title 
        totalRowUsingParticularApi = false,

        includeChild = true,
        ouQueryType,
        ouGroupSetQueryType,
        DEFAULT_COL_LENGTH,// if data not exists. Return all col value as 0

        colClassName,//apply tailwind class

        listColumnConfig,//column config

        overrideResult,
        rowBold,
        periodQueryType,
        approvalConfig,
        sortOrgUnits
    } = props;
    let apiData = await fetchAnalyticsData({
        dx,
        orgUnit,
        period,
        idOrgGroupSet,
        ouGroupSetQueryType,
        ouQueryType,
        orgUnitGroup,
        includeCo: false,
        customDimension,
        periodQueryType
    }).catch(e => e)
    let listOrgUID = apiData.metaData?.dimensions?.ou || [];
    let listOrgApproval = approvalConfig?.approvalVisible == APPROVAL_VISIBLE.PARENT ? [orgUnit] : listOrgUID
    approvalConfig && props.approvalUtils.addGroupApproval({
        ds: approvalConfig?.ds,
        wf: undefined,
        pe: period,
        org: listOrgApproval,
        key: approvalConfig?.approvalKey
    });

    let listRow = []
    if (ouQueryType != 'filter') {
        listRow =
            ((sortOrgUnits
                ? sortOrgUnits(apiData.metaData?.dimensions?.ou, props)
                : apiData.metaData?.dimensions?.ou?.sort(function (a, b) {
                    if (apiData.metaData.items[a].name < apiData.metaData.items[b].name) return -1;
                    if (apiData.metaData.items[a].name > apiData.metaData.items[b].name) return 1;
                    return 0;
                })
            ) || [])
                ?.map((eachOrg, orgIdx, arr) => {
                    return getDataEachRow({
                        ...props,
                        apiData,
                        orgUnit: eachOrg,
                        orgName: apiData?.metaData?.items?.[eachOrg]?.name,
                        includeTotalRow,
                        orgIdx,
                        listColumnConfig,
                    })
                }) || [];
    } else {
        listRow = (!apiData.rows || apiData.rows.length == 0)
            ? []
            : [
                getDataEachRow({
                    ...props,
                    apiData,
                    orgUnit: undefined,
                    orgName: "",
                    includeTotalRow,
                    listColumnConfig,
                })
            ]
    }



    if (includeTotalRow) {
        let totalRow = [];
        if (listRow.length == 0) {
            totalRow = [...totalRow, ...includeTotalRow, ...Array(DEFAULT_COL_LENGTH).fill(0)].map((e, cellIdx) => {
                let colConfig = listColumnConfig[cellIdx];
                let isTotalRowContent = includeTotalRow[cellIdx]
                return {
                    view: <p className="flex flex-col font-bold">{isTotalRowContent ? e : 0}</p>,
                    value: isTotalRowContent ? e : 0,
                    ...colConfig,
                    excelOpts: {
                        'data-f-bold': true,
                        ...(colConfig?.excelOpts || {})
                    },
                }
            });
        } else {
            let listRowTotal = listRow;
            if (totalRowUsingParticularApi) {
                let apiData = await fetchAnalyticsData({
                    dx,
                    orgUnit,
                    period,
                    idOrgGroupSet,
                    ouQueryType,
                    includeCo: false,
                    customDimension,
                })

                listRowTotal = [
                    getDataEachRow({
                        ...props,
                        apiData,
                        orgUnit: orgUnit,
                        orgName: apiData?.metaData?.items?.[orgUnit]?.name,
                        includeTotalRow,
                        listColumnConfig,
                    })
                ]
            }
            totalRow = sumMultiRow({ ...props, listRow: listRowTotal, includeTotalRow, listColumnConfig, rowBold, colClassName, listOrgUID, totalRowUsingParticularApi })
        }
        if (includeChild) listRow = [
            totalRow || [],
            ...listRow
        ]
        else listRow = [
            totalRow || []
        ]

    }
    if (overrideResult) listRow = overrideResult(listRow);
    return { listRow, listOrgUID, apiData }
}

export let sumMultiRow = (props) => {
    let {
        listRow, includeTotalRow, listColumnConfig, rowBold = true, listOrgUID,
        orgUnit, period,
        approvalConfig
    } = props
    let { approvalVisible, approvalKey } = approvalConfig || {};
    listRow = listRow.filter(e => e);
    let colSum =
        listRow.length > 0
            ? zip(
                ...listRow.map(row => row.map(col => toNumber(col.value)))
            ).map(col => {
                return sum(col)
            })
            : getDataEachRow({ ...props, emptyValue: true }).map(e => e.value)



    listRow = colSum?.map((cell, cellIndex, arr) => {
        if (![undefined, null, 'undefined', 'null'].includes(includeTotalRow[cellIndex])) {
            return includeTotalRow[cellIndex]
        } else {
            return cell
        }
    })
        .map((e, idx, arr) => {

            return {

                view: <div {...{
                }} className="flex flex-col font-bold">
                    {numToLocaleString(e)}
                    {listColumnConfig[idx].isApprovalColumn
                        && approvalConfig && ![APPROVAL_VISIBLE.CHILD].includes(approvalVisible)
                        && <ButtonApproval {
                            ...{
                                ...approvalConfig,
                                isApproveAll: [APPROVAL_VISIBLE.BOTH].includes(approvalVisible) && true,
                                orgID: orgUnit,
                                period,
                                dsID: approvalConfig.ds[0]
                            }
                        } />}
                </div>,
                value: e,
                ...listColumnConfig[idx],
                excelOpts: {
                    'data-f-bold': rowBold,
                    ...listColumnConfig[idx].excelOpts
                },
            }
        });


    return listRow;
}

export const getDataEachRow = (data) => {
    let rowData = data?.listColumnConfig?.map(e => {
        if (data.emptyValue || e.emptyValue) {
            e = {
                ...e,
                view: 0,
                value: 0,
                ...omit(e, ['colStyle']),
            }
        } else if (e.render) {
            e = {
                ...e.render({
                    ...data,
                    //Ignore width apply to <p> tag
                    ...omit(e, ['colStyle']),
                }),
                ...e
            }
        }
        return e;
    })

    return rowData
}

export const getClassNameColFreeze = ({ listColumnConfig, offsetX }) => {
    // return listColumnConfig;
    let lastColWidth = "0vw - 10px";
    return listColumnConfig.map(e => {
        if (e.freezeColWidth) {
            e.colClassName = [
                e.colClassName || ''
            ].join(' ');

            e.colStyle = {
                ...e.colStyle,
                // "minWidth": `${e.freezeColWidth}`,
                // // "background": 'transparent',
                // "maxWidth": `${e.freezeColWidth}`,
                // width: `${e.freezeColWidth}`,
                // left: `calc(${lastColWidth})`,
            };

            lastColWidth = `${lastColWidth} + ${e.freezeColWidth}`;

        }
        return e
    })
}

export const ListColumnConfigBuilder = ({ listColumnConfig }) => {
    //Apply freeze col
    let colClassName = getClassNameColFreeze({ listColumnConfig });
    // return colClassName
    return listColumnConfig
}

export const findColByKey = ({ listColumnConfig, key, index }) => {
    return;
    return listColumnConfig.find(e => e.key == key);
}

export const findColStyleByKey = (data) => {
    return;
    let col = findColByKey(data);
    let style = {
        ...(col?.colStyle || {}),
        // border: '0.5px solid black'
    }
    let rs = {
        className:
            [...col?.colClassName?.split(' ')?.filter(e => !e.includes("bg")), data.colClassName].filter(e => e)
                .join(' '),
        style,
        name: col?.name,
    };
    return rs
}

export const getDisableColDataObject = () => {
    return {
        colClassName: '!bg-gray-300',
        view: <p className="flex flex-col font-bold"></p>,
        value: 0,
    }
}