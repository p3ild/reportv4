import { parallel } from "async";
import { useEffect, useState } from "react";
import { usePrepareData } from "../../common/hooks/prepareData";
import * as UserMutilOrgAction from "../../common/UserMutilOrgAction";
import * as CommuneAction from "../actions/Commune";
import * as CountryAction from "../actions/Country";
import * as CurrentlyOrgSelectedAction from "../actions/CurrentlyOrgSelected";
import * as ProvinceAction from "../actions/Province";
import { getListColumnConfig } from "../columnConfig";
import { DATASET, HeaderUILayoutTable1, ORG_SELECTED_TYPE } from "../constant";

export const useLoadData = (props) => {
    const {
        loaded,
        orgSelected, period,
        setGlobalOverlay
    } = usePrepareData({});

    const [errors, setError] = useState(undefined);
    const [data, setData] = useState([]);
    const [customData, setCustomData] = useState([]);
    useEffect(
        () => {
            if (loaded && orgSelected && period?.outputDataDhis2) {
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
            defaultCol: 10 - 2,
            dx: [
                "ZYDqKZDP7Rz",
                "ZYDqKZDP7Rz.GvoEANq375m",
                "xcvRHk5OWIY",
                "o2lbJLDJ0YX",
                "BUYJMCnJun7",
                "xVJx9A4MwWH",
                "WbZdhvTmYiU",
                "v9f7yBuGbi6",
                "NdEWLvw94po",
                "A1HRS93Y8IU",
                "z3IfKG0JvOi",
                "yuq8HkHFuDG",
                "S117HX9INOg",
                "KaNOeN9lTVb",
                "c74rVPtTJRc",
                "ZlrWyjyJ4uM",
                "HAcXJupQpZO",
                "CFnatCKrNQB",
                "XQsBth4T7fx",
                "AoI4Bcw6Bwp",
            ]
        }
        try {
            let orgType = orgSelected?.orgType?.key;
            let targetAction;

            switch (true) {
                case orgSelected.id == 'CUSTOM_MULTI_ORG': {
                    targetAction = UserMutilOrgAction;
                    props.customDataSet = {
                        COMMUNE: DATASET.BMTE_B4_TYT,
                        // PROVINCE: DATASET.BMTE_B4
                    };
                    break;
                }
                case orgType == ORG_SELECTED_TYPE.COUNTRY.key:
                    targetAction = CountryAction;
                    break;
                case orgType == ORG_SELECTED_TYPE.PROVINCE.key:
                    targetAction = ProvinceAction;
                    break;
                case orgType == ORG_SELECTED_TYPE.COMMUNE.key:
                    targetAction = CommuneAction;
                    break;
                default:
                    targetAction = CurrentlyOrgSelectedAction;
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

                setCustomData(loadedTable[0]);
                setData((pre) => [
                    ...pre,
                    {
                        ...loadedTable[0]
                    }
                ]);

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
        customData,
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