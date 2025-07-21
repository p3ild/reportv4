import { useEffect, useState } from "react";
import { HeaderUILayoutTable1, ORG_SELECTED_TYPE, SectionHeaderTable1, } from "../constant";
import { getListColumnConfig } from "../columnConfig";
import { parallel, reflect } from "async";
import { BaseError } from "../../common/BaseError";
import { usePrepareData } from "../../common/hooks/prepareData";

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
            ]
        }
        try {
            let orgType = orgSelected?.orgType?.key;
            let targetAction;
            switch (orgType) {
                case ORG_SELECTED_TYPE.COUNTRY.key:
                    targetAction = await import('../actions/Country')
                    break;
                case ORG_SELECTED_TYPE.PROVINCE.key:
                    targetAction = await import('../actions/Province');
                    break;
                case ORG_SELECTED_TYPE.COMMUNE.key:
                    targetAction = await import('../actions/Commune');
                    break;
                default:
                    targetAction = await import('../actions/CurrentlyOrgSelected')
            }
            {


                let loadTable1 = (callback) => {
                    targetAction.getDataCommon({
                        ...props,
                        separateTotalRow: true,
                        HeaderUI: HeaderUILayoutTable1,
                        SectionHeader: <SectionHeaderTable1 period={period} />
                    }).then(newData => {
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
            .join(' - ')
    }

}