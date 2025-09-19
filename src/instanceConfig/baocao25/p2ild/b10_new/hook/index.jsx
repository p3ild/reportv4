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
import { getNonCummulativePeriod } from "../../common/utils";
import { cloneDeep } from "lodash";
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
            "pvzHrKHH3I5",
            "pvzHrKHH3I5.GvoEANq375m",
            "WvJoHH7IjFL",
            "WvJoHH7IjFL.GvoEANq375m",
            "wSak01RyjQ7",
            "Gx8E2HsAjVp",
            "SOmWBc5Ygym",
            "CwwMLAEYbuD",
            "QRIgOI9CRNd",
            "VahmSj3Qy7r"
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
                "qI0aviwI9JS",
                "iWThCH73sWu",
                "Vs6TWC5SxbB",
                "Vs6TWC5SxbB.GvoEANq375m",

                "T01fetxyjry",
                "T01fetxyjry.GvoEANq375m",
                //Tb2
                "sFUAD4MnkHI",
                "y1ilq7olBtd",
                "SU5TCu78G5r",
                "C2irCIrpkkr",
                "XLYCEsxbKNy",
                "YWMQ8PsEBsT",
                "L94SudtYkGW",
                "WlHO5LcGWP2",
                "GrNc7zoULxR",
                "gbwSwTveKtm",
                "DlvwHheog9N",

                //Tb3

                "j6hjO2EvUOH",
                "UM3QlJaRPC2",
                "uI19xKbu3FK",
                "TbLiWnKhIHl",
                "ose2S8zvDqP",
                "f66ZItJ5oIg",
                "f66ZItJ5oIg.GvoEANq375m",
                "nRHsIIl3soX",
                "nRHsIIl3soX.GvoEANq375m",
                "cmtE2AIEOmS",
                "LdIfOeZFCXU",
            ]
        }
        try {
            let orgType = orgSelected?.orgType?.key;
            let targetAction;
            switch (true) {
                case orgSelected.id == 'CUSTOM_MULTI_ORG': {
                    targetAction = UserMutilOrgAction
                    props.customDataSet = {
                        COMMUNE: DATASET.B10,
                        // PROVINCE: DATASET.B10
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
                data.period = getNonCummulativePeriod(cloneDeep(period))
                if (data.period == period.outputDataDhis2) {
                    return oldData;
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