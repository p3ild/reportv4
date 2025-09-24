import { parallel } from "async";
import { useEffect, useState } from "react";
import { usePrepareData } from "../../common/hooks/prepareData";
import * as UserMutilOrgAction from "../../common/UserMutilOrgAction";
import * as CurrentlyOrgSelectedAction from "../actions/CurrentlyOrgSelected";
import { getListColumnConfig_table1, getListColumnConfig_table2, getListColumnConfig_table3 } from "../columnConfig";
import { DATASET, HeaderUILayoutTable1, HeaderUILayoutTable2, HeaderUILayoutTable3, ORG_GROUP, ORG_SELECTED_TYPE } from "../constant";
import { getApprovalConfig } from "../../common/utils/approval";
import { getCoreMetaStateByPath } from "@core/stateManage/metadataState";
import { getPickerStateByPath } from "@core/stateManage/corePickerState";
import { CompareString } from '@core/utils/stringutils';

export const useLoadData = (props) => {
    const {
        loaded,
        orgSelected, period,
        setGlobalOverlay
    } = usePrepareData({});

    const [errors, setError] = useState(undefined);
    const [data, setData] = useState([]);
    useEffect(
        () => {
            if (loaded && orgSelected && period?.outputDataDhis2) {
                setGlobalOverlay({
                    isOpen: true
                })
                main();
            }
        },
        [loaded,]
    )

    const main = async () => {
        setError(undefined)
        setData([]);
        let orgFlatMap = getPickerStateByPath('orgFlatMap')

        props = {
            ...props,
            // approvalHook,
            orgUnit: orgSelected.id,
            period: period?.outputDataDhis2,
            periodSelected: period,
            orgSelected,
            dx: [
                //Tb1
                "sBt60K8QjaF",
                "xHiXnwpt9Xi",
                "fPTXIoHzrk4",
                "sjCCvNcYbHB",
                "B5GqKG9VXQO",
                "UTE413dUrfc",
                "Yp7Da5QxFoC",
                "o2mFOm8ywhn",
                "Jvpu7xWS1Ex",
                "tSJ2dEwmXkB",
                "mLkKBW4E1g1",
                "dEmoO5MzOQH",
                "l80MOAkvVmU",
                "jBzodX3jiYQ",
                "eDR35tmgEit",
                "JJiWlbvsC26",
                "tQ8DS3VvTHh",
                "W7Rb0Gl5YD4",
                "mKk6a62kEzA",
                "LbXovj5cLLV",
                //Tb2
                "sUG3FfYcW9C",
                "K3jJ7PsTmCz",
                "CRbZUey5FmZ",
                "tEewiEvBCFh",
                "DmtZQI9mgV3",
                "ko3YTitQutr",
                "YTKjL9NhV0s",
                "HsKNGfqp6ua",
                "BlPpMf7JVhL",
                "VP75iYycepp",
                "U07W2Bnm6zP",
                "xaClBj5XFof",
                "tAnI2monttO",
                "tjWAmJdy8Ui",
                "SaeS16zlsdL",
                "Hk7UyDojPSV",
                "niJ1WbDyHNr",
                "dzf3gZhIxxF",
                "ppTmybhZ1Pz",
                "nsr6sr2o2rj",


                //Tb3
                "m0MrJMPF20m",
                "e3FI14TdzXI",
                "nX7ULG9910Z",
                "SdeBkbLEYbu",
                "YekyOwXs8YG",
                "R3o4l0wMAcz",
                "wuuyNVYp2xL",
                "hvooCwSKgeV",
                "ZQDNZRCdfmj",
                "sw3nKSwjMRs",
                "P29peKP3FW3",
                "DUaRjh7mGro",
                "nQUm9HUWRFk",
                "sMt9g0oXC9J",
                "aPoi2dHWeVi",
                "oyN4tiDAeMz",
                "DI9bEVW9nhK",
                "ZGA32hV9es4",
                "DlDcFq9obQm",
                "ykST4Kc8zRT",
                "copAByC0cPm",
                "zKjqPYMNV7D",
                "VK3FyPHCT38",
                "puRKLFuqohO",
            ]
        }
        try {
            let orgType = orgSelected?.orgType?.key;
            let targetAction;
            switch (true) {
                case orgSelected.id == 'CUSTOM_MULTI_ORG': {
                    targetAction = UserMutilOrgAction
                    props.customDataSet = {
                        COMMUNE: DATASET.B11,
                        // PROVINCE: DATASET.B11
                    }
                    break;
                }
                case orgType == ORG_SELECTED_TYPE.COUNTRY.key:
                    props.orgUnitGroup = [
                        ORG_GROUP.TINH_DVHC
                    ]
                    targetAction = CurrentlyOrgSelectedAction
                    break;
                case orgType == ORG_SELECTED_TYPE.PROVINCE.key:
                    props = {
                        ...props,
                        approvalUtils: getCoreMetaStateByPath('networkUtils.ApprovalUtils'),
                        orgUnitGroup: [ORG_GROUP.XA_DVHC],
                        ...getApprovalConfig({ ...props, ds: DATASET.B11, approvalKey: 'RANDOM' })
                    }
                    targetAction = CurrentlyOrgSelectedAction
                    break;
                case orgType == ORG_SELECTED_TYPE.COMMUNE.key:
                    const ORG_PREFIX_REMOVE = "removeorg"
                    let compareString = new CompareString()
                    compareString.SPEC_CHAR = [
                        ...compareString.SPEC_CHAR,
                        { from: '^pk', to: ORG_PREFIX_REMOVE },
                        { from: '^phong kham', to: ORG_PREFIX_REMOVE },
                    ]

                    props = {
                        ...props,
                        approvalUtils: getCoreMetaStateByPath('networkUtils.ApprovalUtils'),
                        orgUnitGroup: [
                            ORG_GROUP.XA_TYT,
                            ORG_GROUP.XA_CSYT_KHAC_TYT
                        ],
                        sortOrgUnits(ou, props) {
                            let ouFilter = ou.filter(ouTarget => {
                                return !compareString.cleanStr(orgFlatMap[ouTarget].name).includes(ORG_PREFIX_REMOVE)
                            })
                            return ouFilter
                        },
                        ...getApprovalConfig({ ...props, ds: DATASET.B11, approvalKey: 'RANDOM' })
                    }
                    targetAction = CurrentlyOrgSelectedAction
                    break;
                default:
                    targetAction = CurrentlyOrgSelectedAction
                // throw new BaseError({ msg: 'Báo cáo không hỗ trợ đơn vị này' })
            }
            {


                let loadTable1 = (callback) => {
                    targetAction.getDataCommon({
                        ...props,
                        listColumnConfig: getListColumnConfig_table1(props),
                    }).then(newData => {
                        newData.TableHeader = <HeaderUILayoutTable1 />
                        callback(undefined, newData)

                    }).catch(e => callback(e))
                }
                let loadTable2 = (callback) => {
                    targetAction.getDataCommon({
                        ...props,
                        listColumnConfig: getListColumnConfig_table2(props),
                        ignoreByTable: true,
                    }).then(newData => {
                        newData.TableHeader = <HeaderUILayoutTable2 />
                        callback(undefined, newData)

                    }).catch(e => callback(e))
                }
                let loadTable3 = (callback) => {
                    targetAction.getDataCommon({
                        ...props,
                        listColumnConfig: getListColumnConfig_table3(props),
                        ignoreByTable: true,
                    }).then(newData => {
                        newData.TableHeader = <HeaderUILayoutTable3 />
                        callback(undefined, newData)

                    }).catch(e => callback(e))
                }


                let loadedTable = await parallel([
                    loadTable1,
                    loadTable2,
                    loadTable3
                ]
                    .filter(e => e)
                );
                setData(loadedTable)


            }

        } catch (err) {

            setError(err)
        } finally {
            setGlobalOverlay({
                isOpen: false
            })
        }
    }

    return {
        errors,
        data,
        orgReportName: orgSelected.displayNameByPath,
        dhis2Period: [
            period?.labelStartDate,
            period?.labelEndDate ? `${period?.labelEndDate}` : undefined
        ]
            .filter(e => e)
            .join(' đến ')
    }

}