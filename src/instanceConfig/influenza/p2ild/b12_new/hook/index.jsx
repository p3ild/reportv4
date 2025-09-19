import { parallel } from "async";
import { useEffect, useState } from "react";
import { usePrepareData } from "../../common/hooks/prepareData";
import * as UserMutilOrgAction from "../../common/UserMutilOrgAction";
import * as CommuneAction from "../actions/Commune";
import * as CountryAction from "../actions/Country";
import * as CurrentlyOrgSelectedAction from "../actions/CurrentlyOrgSelected";
import * as ProvinceAction from "../actions/Province";
import { getListColumnConfig_table1, getListColumnConfig_table2 } from "../columnConfig";
import { DATASET, HeaderUILayoutTable1, HeaderUILayoutTable2, ORG_SELECTED_TYPE } from "../constant";
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

        const DE_NO_CUMULATIVE = [
            "TjsrDy8W8h3",
            "CR18qa3xmiF",
            "RRnKZsIUweW",
            "S4NScJXJ0Bx",
            "U5RaHHmpAFs",
            "mzyg9Os6CYe",
            "TgPeB3Q82Az",
            "PFBtIcnqhNV",
            "DkOZff7DZkl",
            "U3cZRl5Hci5",
            "rbCiI7G5WDu",
            "fUaToKQ0ZpI",
            "L5TaiYbqD6w",
            "HKg6QgHYSiu",
            "a8twU2lbca9",
            "VA1GARaJqcO"
        ]
        props = {
            ...props,
            // approvalHook,
            orgUnit: orgSelected.id,
            period: period?.outputDataDhis2,
            periodSelected: period,
            orgSelected,
            dx: [

                ...(period.type == 'month' ? DE_NO_CUMULATIVE : []),
                //Tb1
                "TyqF8uBkL7B",
                "ChgePBcK76w",

                //Tb2
                "ZIOSE2mQfW9",
                "JXXc1zqIIwf"
            ]
        }
        try {
            let orgType = orgSelected?.orgType?.key;
            let targetAction;
            switch (true) {
                case orgSelected.id == 'CUSTOM_MULTI_ORG': {
                    targetAction = UserMutilOrgAction
                    props.customDataSet = {
                        COMMUNE: DATASET.B12_NCD_TYT,
                        // PROVINCE: DATASET.B12_NCD
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

            props.overrideDataAnalytics = async (data) => {
                let oldData = data.apiData;
                if (period.type == 'month') {
                    return oldData;
                }

                if (period.type == 'month2') {
                    data.period = data.period.split(';').reverse()[0]
                }

                if (period.type == 'year') {
                    //If current year is data.period(ex:2025) so get month present of this year-> output 
                    //If current year is not data.period(ex:2024) so get lastMonth in year-> output 12
                    let currentYear = new Date().getFullYear();
                    let currentMonth = new Date().getMonth() + 1;
                    let dataYear = data.period;
                    if (currentYear == dataYear) {
                        data.period = currentYear + (currentMonth < 10 ? ('0' + currentMonth) : currentMonth);
                    } else {
                        data.period = dataYear + `12`;
                    }
                }

                let queryDataNonCumulative = await data.fetchAnalyticsData({
                    ...data,
                    dx: DE_NO_CUMULATIVE,
                }).catch(e => {
                    // console.log(e)
                });

                let newData = { ...oldData }

                if (newData.rows) {
                    newData.rows = [
                        ...newData.rows,
                        ...(queryDataNonCumulative.rows || [])
                    ]

                }

                return newData;
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

                let loadedTable = await parallel([
                    loadTable1,
                    loadTable2,
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