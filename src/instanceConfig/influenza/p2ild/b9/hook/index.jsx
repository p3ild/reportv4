import { parallel } from "async";
import { useEffect, useState } from "react";
import { usePrepareData } from "../../common/hooks/prepareData";
import { getListColumnConfig } from "../columnConfig";
import { DATASET, HeaderUILayoutTable1, ORG_SELECTED_TYPE } from "../constant";
import * as UserMutilOrgAction from "../../common/UserMutilOrgAction";
import * as CommuneAction from "../actions/Commune";
import * as CountryAction from "../actions/Country";
import * as CurrentlyOrgSelectedAction from "../actions/CurrentlyOrgSelected";
import * as ProvinceAction from "../actions/Province";

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
            listColumnConfig: getListColumnConfig(props),
            defaultCol: 23 - 2,
            dx: [
                // 'Bu8BJMiHMAd',
                "c6jDQSQhVpR",
                "I1vZQ4MI5hP",
                "QfSJtngOK7c",
                "QfSJtngOK7c.GvoEANq375m",
                "rrQkixe4Vqc",
                "BxwLDew2XkX",
                "KfJOeNWNzuB",
                "XprPxm6c373",
                "GmxEQNcg72P",
                "GmxEQNcg72P.GvoEANq375m",
                "irh3ID7zYcm",
                "qqGVFEKHwNT",
                "ZykDhCuora9",
                "ZNe5Id7Pw11",
                "SJ3MWLZS4C7",
                "LpKmvWUeN9p",
                "umHMm1zLFF9",
                "RJVXpWTeq6D",
                "DBAlTEDNafV",
                "fgL3hP3B3Nc"
            ]
        }
        try {
            let orgType = orgSelected?.orgType?.key;
            let targetAction;
            switch (true) {
                case orgSelected.id == 'CUSTOM_MULTI_ORG': {
                    targetAction = UserMutilOrgAction
                    props.customDataSet = {
                        COMMUNE: DATASET.B9,
                        // PROVINCE: DATASET.B9
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
            }
            {


                let loadTable1 = (callback) => {
                    targetAction.getDataCommon({
                        ...props,
                        separateTotalRow: true,
                    }).then(newData => {
                        newData.TableHeader = <HeaderUILayoutTable1 />;
                        callback(undefined, newData)

                    }).catch(e => callback(e))
                }


                let loadedTable = await parallel([
                    loadTable1
                ]
                    .filter(e => e)
                );

                setData(loadedTable);

            }

            // setTableHeader(targetAction.HeaderUI)
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