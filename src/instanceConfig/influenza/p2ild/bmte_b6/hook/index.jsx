import { useEffect, useState } from "react";
import { usePrepareData } from "../../common/hooks/prepareData";
import { DATASET, HeaderUILayoutTable1, ORG_SELECTED_TYPE } from "../constant";
import { getListColumnConfig } from "../columnConfig";
import { parallel, reflect } from "async";
import { BaseError } from "../../common/BaseError";
import * as UserMutilOrgAction from "../../common/UserMutilOrgAction";
import * as CountryAction from "../actions/Country";
import * as ProvinceAction from "../actions/Province";
import * as CommuneAction from "../actions/Commune";
import * as CurrentlyOrgSelectedAction from "../actions/CurrentlyOrgSelected";

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
            periodSelected: period,
            orgSelected,
            listColumnConfig: getListColumnConfig(props),
            defaultCol: 17 - 2,
            dx: [
                'VnQNEJEQgBG',
                'PlEEec2kdNT',
                'f3Q8ePAjrnl',
                'Rbla6Z81z9l',
                'PERMQRLP8eD',
                'aCxlog8nTP9',
                'mIh3UPtjTXc',
                'swLTD7Obkns',
                'JvUdl1Prp9C',
                'PjCNurYlbM7',
                'EQY2K3TQdmq',
                'jSIcvmxyzJG',
                'T9qCKalHUQ0',
                'sGJybKlS1d1',
                'R1nUXApza8n'
            ]
        }
        try {
            let orgType = orgSelected?.orgType?.key;
            let targetAction;
            switch (true) {
                case orgSelected.id == 'CUSTOM_MULTI_ORG': {
                    targetAction = UserMutilOrgAction
                    props.customDataSet = {
                        COMMUNE: DATASET.BMTE_B4_TYT,
                        // PROVINCE: DATASET.BMTE_B6
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