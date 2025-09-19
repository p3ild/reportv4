import { parallel } from "async";
import { useEffect, useState } from "react";
import { usePrepareData } from "../../common/hooks/prepareData";
import * as UserMutilOrgAction from "../../common/UserMutilOrgAction";
import * as CommuneAction from "../actions/Commune";
import * as CountryAction from "../actions/Country";
import * as CurrentlyOrgSelectedAction from "../actions/CurrentlyOrgSelected";
import * as ProvinceAction from "../actions/Province";
import { getListColumnConfig_table1, getListColumnConfig_table2, getListColumnConfig_table3 } from "../columnConfig";
import { DATASET, HeaderUILayoutTable1, HeaderUILayoutTable2, HeaderUILayoutTable3, ORG_SELECTED_TYPE } from "../constant";
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

        props = {
            ...props,
            // approvalHook,
            orgUnit: orgSelected.id,
            period: period?.outputDataDhis2,
            periodSelected: period,
            orgSelected,
            defaultCol: 15,
            dx: [
                //Tb1
                "q89OtnM0Eh2",
                "uT4AyDAaTrg",
                "ebqyUZOnSkm",
                "icS2nkzzdv8",
                "icS2nkzzdv8.GvoEANq375m",
                "d9dkr72ldLN",
                "i4jo4Fh5zPN",
                "i4jo4Fh5zPN.GvoEANq375m",
                "GjqYq9b8bFn",
                "B7yP8MmG3HJ",
                "B7yP8MmG3HJ.GvoEANq375m",
                "Yd7yygLgYue",
                "HcyREHmKrPM",
                "HcyREHmKrPM.GvoEANq375m",
                "BNuK7qsDc5V",
                //Tb2
                "Fgfyca3IVuM",
                "Fgfyca3IVuM.GvoEANq375m",
                "me9mk1OXcW2",
                "WSUkqeqXbWO",
                "WSUkqeqXbWO.GvoEANq375m",
                "sxCM4oRCF5z",
                "RpJeDDGzpYt",
                "RpJeDDGzpYt.GvoEANq375m",
                "qz30Vcs4UOE",
                "aDIlmHjdxch",
                "aDIlmHjdxch.GvoEANq375m",
                "oQ1eUbQXnA4",
                "d4idAZBs7aR",
                "d4idAZBs7aR.GvoEANq375m",
                "ecnwSBnApM3",


                //Tb3
                "lQniaEDE0zj",
                "lQniaEDE0zj",
                "RoNWo78P92J",
                "moUhfe3z4xn",
                "moUhfe3z4xn",
                "cUnrKRSxFcg",
                "pRF4qURyWHq",
                "pRF4qURyWHq",
                "aUaYRtA4OuZ",
                "hAh6A8CC4IW",
                "hAh6A8CC4IW",
                "fgdUu6zpu5T",
                "qQeyMtOYpRS",
                "qQeyMtOYpRS",
                "hBrE4YgsrZU",


            ]
        }
        try {
            let orgType = orgSelected?.orgType?.key;
            let targetAction;
            switch (true) {
                case orgSelected.id == 'CUSTOM_MULTI_ORG': {
                    targetAction = UserMutilOrgAction
                    props.customDataSet = {
                        COMMUNE: DATASET.B3,
                        // PROVINCE: DATASET.B3
                    }
                    break;
                }
                case orgType == ORG_SELECTED_TYPE.COUNTRY.key:
                    targetAction = CountryAction
                    break;
                case orgType == ORG_SELECTED_TYPE.PROVINCE.key:
                    targetAction = ProvinceAction
                    break;
                case orgType == ORG_SELECTED_TYPE.COMMUNE.key:
                    targetAction = CommuneAction
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