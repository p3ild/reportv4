import { useEffect, useState } from "react";
import { usePrepareData } from "../../common/hooks/prepareData";
import { DATASET, HeaderUILayoutTable1, ORG_GROUP, ORG_SELECTED_TYPE } from "../constant";
import { getListColumnConfig } from "../columnConfig";
import { parallel, reflect } from "async";
import { BaseError } from "../../common/BaseError";
import { APPROVAL_ROW_TYPE } from "@core/network/ApprovalUtils";
import * as UserMutilOrgAction from "../../common/UserMutilOrgAction";
import * as CountryAction from "../actions/Country";
import * as ProvinceAction from "../actions/Province";
import * as CommuneAction from "../actions/Commune";
import * as CurrentlyOrgSelectedAction from "../actions/CurrentlyOrgSelected";
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
            "cnzF1Wsyll7",
            "EfO3KDWNMde"
        ]

        props = {
            ...props,
            // approvalHook,
            orgUnit: orgSelected.id,
            period: period?.outputDataDhis2,
            periodSelected: period,
            orgSelected,
            listColumnConfig: getListColumnConfig(props),
            defaultCol: 39 - 2,
            dx: [
                ...(period.type == 'month' ? DE_NO_CUMULATIVE : []),
                'fzWfb5NkUXR.N13A1fU7DAu',
                'OofwmXf2vAi',
                'MZEU8meruHx',
                'niRcB5DsPI9',
                'WpK3CA1GiFB',
                'q9TgXtGb497',
                'JTBxLXQRhKp',
                'YgF4A2VhFm9',
                'fzWfb5NkUXR',
                'LSlYBmMhM5E',
                'mYN2cR5UuWb',
                'Nix9Ht2BTot',
                'eW3TnNPwPBA',
                'Rb7YZo0877Z',
                'Vov1ZBQDPGA',
                'Wf8ywubJAEC',
                'QqPcpJ7yLhR',
                'PZkzL05NpNg',
                'SGDhfZGXzL2',
                'CaUTXHA9zK5',
                'SZpvMstnLjc',
                'DZ4gp6GzBkJ',
                'ckrGFqdrq1O',
                'Jpn3u1SCEI3',
                'cdnqvBRbLNA',
                'SPFzGeY7ENH',
                'XGxKRz2pyqF',
                'NveBdKInM5m',
                'BrEASMFixuK',
                'wsyfR9oCbBg',
                'DWCz9b0uIkA',
                'tQG9ii5Zh1g',
                'j6cPf2NjluG',
                'aTKuaZLHkMG',
                'MdnijP0QA7c',
                'g8Rnn7j2ccS',
                'ewHRN8vKSLo',
                'fMyhbxbf6mU',
                'FowjUrhGgEr'
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
                        // PROVINCE: DATASET.BMTE_B4
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