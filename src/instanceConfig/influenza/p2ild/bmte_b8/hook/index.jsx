import { useEffect, useState } from "react";
import { usePrepareData } from "../../common/hooks/prepareData";
import { DATASET, HeaderUILayoutTable1, ORG_SELECTED_TYPE } from "../constant";
import { getListColumnConfig } from "../columnConfig";
import { parallel, reflect } from "async";
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
            defaultCol: 26 - 2,
            dx: [
                "hvS0ROXGv9e",
                "hvS0ROXGv9e.GvoEANq375m",
                "sw4HsEooMSp",
                "ezhAgYWPwre",
                "d4iPeJgrz7K",
                "mQ8QJXYcRFP",
                "mLlHmnCH4Nw",
                "CjM6Xjwuohw",
                "aos3iUZ9u9T",
                "RHsZDNIbPxi",
                "t82Gp0IG71J",
                "mUy244qjDuH",
                "K4iyoGAYqkP",
                "HXpr0QXWRmJ",
                "klseO42Bsms",
                "djtGcmFzTpk",
                "JXkcVU1drui",
                "yI3xgOU7VxK",
                "BArq67DfpRK",
                "Sra1fElVxHA",
                "lkWJaJx1oaM",
                "wPlQmAEhVXa",
                "QXPKZgJlnqM",
                "Uz0R3QwHrje",
                "axloWTL6DpA"
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
                        // PROVINCE: DATASET.BMTE_B8
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