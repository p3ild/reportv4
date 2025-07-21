import { useEffect, useState } from "react";
import { usePrepareData } from "../../common/hooks/prepareData";
import { HeaderUILayoutTable1, ORG_GROUP, ORG_SELECTED_TYPE, SectionHeaderTable1, } from "../constant";
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
            listColumnConfig: getListColumnConfig(props),
            defaultCol: 39 - 2,
            dx: [
                'WpK3CA1GiFB',
                'q9TgXtGb497',
                'cnzF1Wsyll7',
                'EfO3KDWNMde',
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
                    // throw new BaseError({ msg: 'Báo cáo không hỗ trợ đơn vị này' })
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