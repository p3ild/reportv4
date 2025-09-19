import { useEffect, useState } from "react";
import { usePrepareData } from "../../common/hooks/prepareData";
import { DATASET, HeaderUILayoutTable1, ORG_SELECTED_TYPE } from "../constant";
import { getListColumnConfig } from "../columnConfig";
import { parallel, reflect } from "async";
import { BaseError } from "../../common/BaseError";

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
        let dx = [
            'aEAHtEcKe8e',
            'hqKW7yCrXH9',
            'sbyDKnwZcOy',
            'bp4fjBzE1sw',
            'wtfsRmDu2CP',
            'mLtnuPFSxxZ',
            'uK1n7dFEI1N',
            'WanOM8J3Suj',
            'CGEpgEX247O',
            'LxvbLJOjdg2',
            'DkAOzZslOSs',
            'YG7omyyd4PR',
            'cpaW1UIFvGp',
            'TSspKDE6jAN',
            'DLsz1yBTbb7',
            'vFawHfMzRgI'
        ]
        props = {
            ...props,
            // approvalHook,
            orgUnit: orgSelected.id,
            period: period?.outputDataDhis2,
            periodSelected: period,
            orgSelected,
            listColumnConfig: getListColumnConfig(props),
            dx,
            defaultCol: dx.length,

        }
        try {
            let orgType = orgSelected?.orgType?.key;
            let targetAction;
            switch (true) {
                case orgSelected.id == 'CUSTOM_MULTI_ORG': {
                    targetAction = await import('../../common/UserMutilOrgAction')
                    props.customDataSet = {
                        COMMUNE: DATASET.BMTE_B4_TYT,
                        // PROVINCE: DATASET.BMTE_B5
                    }
                    break;
                }
                case orgType == ORG_SELECTED_TYPE.COUNTRY.key:
                    targetAction = await import('../actions/Country')
                    break;
                case orgType == ORG_SELECTED_TYPE.PROVINCE.key:
                    targetAction = await import('../actions/Province');
                    break;
                case orgType == ORG_SELECTED_TYPE.COMMUNE.key:
                    targetAction = await import('../actions/Commune');
                    break;
                default:
                    targetAction = await import('../actions/CurrentlyOrgSelected')
                // throw new BaseError({ msg: 'Báo cáo không hỗ trợ đơn vị này' })
            }
            {


                let loadTable1 = (callback) => {
                    targetAction.getDataCommon({
                        ...props,
                        separateTotalRow: true,

                    }).then(newData => {
                        newData.TableHeader = <HeaderUILayoutTable1 />;
                        callback(undefined, newData);
                    }).catch(e => {
                        throw e
                    })
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