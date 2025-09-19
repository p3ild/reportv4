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

        props = {
            ...props,
            // approvalHook,
            orgUnit: orgSelected.id,
            period: period?.outputDataDhis2,
            orgSelected,
            periodSelected: period,
            listColumnConfig: getListColumnConfig(props),
            defaultCol: 16 - 2,
            dx: [
                'xR1SRHBmOSl',
                'EbgigboTmrd',
                'OOvABOGvmwx',
                'XCOxyF9ZvFn',
                'VJVi4KCxpzU',
                'ojeJgOjf9vm',
                'nOKoSAWmBaJ',
                'HjOtfiHHCVv',
                'ycVdXnxxwHs',
                'hoegsBrTcwt',
                'SL8sVvRQK6P',
                'hMHRO6boyNh',
                'dBlYwCRZr0b',
                'KzU9muBt4Le',
                'eqChBVhTqkF'
            ]
        }
        try {
            let orgType = orgSelected?.orgType?.key;
            let targetAction;
            switch (true) {
                case orgSelected.id == 'CUSTOM_MULTI_ORG': {
                    targetAction = await import('../../common/UserMutilOrgAction')
                    props.customDataSet = {
                        COMMUNE: DATASET.BMTE_B4_TYT,
                        // PROVINCE: DATASET.BMTE_B7
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
                        callback(undefined, newData)
                    }).catch(e => callback(e))
                }


                let loadedTable = await parallel([
                    loadTable1
                ]
                    .filter(e => e)
                );

                setCustomData(loadedTable[0]);
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