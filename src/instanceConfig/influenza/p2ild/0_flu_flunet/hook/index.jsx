import { useEffect, useState } from "react";
import { usePrepareData } from "../../common/hooks/prepareData";
import { DATASET, HeaderUILayoutTable1, ORG_GROUP, ORG_SELECTED_TYPE } from "../constant";
import { getListColumnConfig } from "../columnConfig";
import { parallel } from "async"; 
import * as CurrentlyOrgSelectedAction from "../actions/CurrentlyOrgSelected";
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
            // defaultCol: 39 - 2,
            dx: [
                "N5KvPlsayPK", "QjPSe2i97Eg", "P54qeZeasJY", "HiIlgyITGNn", "uRS7FO8cuqq", "saF8jnZLVPi", "A7qbOz7f0xb", "zWCVa4gW48m", "Bz5TVS1vICZ", "dRyFz6seuQL", "Myh67Gksnjo"
            ]
        }
        try {
            let orgType = orgSelected?.orgType?.key;
            let targetAction;
            targetAction = CurrentlyOrgSelectedAction
            // throw new BaseError({ msg: 'Báo cáo không hỗ trợ đơn vị này' })
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