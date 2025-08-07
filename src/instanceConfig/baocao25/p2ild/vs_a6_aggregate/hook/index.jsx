import { useEffect, useState } from "react";
import { usePrepareData } from "../../common/hooks/prepareData";
import { HeaderUILayoutTable1, HeaderUILayoutTable3, ORG_GROUP, ORG_SELECTED_TYPE, SectionFooterTable, SectionHeaderTable1, SectionHeaderTable2, SectionHeaderTable3 } from "../constant";
import { getListColumnConfig, listColumnConfigTb3 } from "../actions/common";
import { parallel } from "async";
import { eachMonthOfInterval, format, parse } from "date-fns";
import { groupBy } from "lodash";

export const useLoadData = (props) => {

    const {
        loaded,
        orgSelected, period,
        setGlobalOverlay
    } = usePrepareData({});

    const [data, setData] = useState([]);
    const [errors, setError] = useState();
    useEffect(
        () => {
            if (loaded && orgSelected && period?.outputDataDhis2) {
                setGlobalOverlay({
                    isOpen: true
                })
                main();
            }
        },
        [loaded]
    )

    const main = async () => {
        setData([]);
        setError();
        const isBefore2025 = period?.outputDataDhis2.includes('2024');
        let indicatorCountCommune = "TvibRSFuArD"

        let props = {
            orgUnit: orgSelected.id,
            period: period?.outputDataDhis2,
            orgSelected,
            listColumnConfig: getListColumnConfig({ indicatorCountCommune }),
            defaultCol: 11 - 2,
            dx: [
                indicatorCountCommune,
                "vaBWIsMITsM", "SFbNHpRRkrC", "nxFF6e9ZayD", "uqrEz0s2P5n", "w6l8WEQ2dMg", "oYA7IY2cgst", "lZnNgFzEpkB", "nmGZA76wG3N", "vXwof4t9JWj"]
        }
        try {
            let orgType = orgSelected?.orgType?.key;
            let targetAction;
            switch (orgType) {
                case ORG_SELECTED_TYPE.COUNTRY.key:
                    props.orgUnitGroup = [ORG_GROUP.TINH_DVHC];
                    break;
                case ORG_SELECTED_TYPE.PROVINCE.key:
                    props.orgUnitGroup = [ORG_GROUP.XA_DVHC];
                    break;
                default:
                    break
            }
            {
                targetAction = await import('../actions/CurrentlyOrgSelected')


                let loadTable1 = (callback) => {
                    if (period?.outputDataDhis2.split(';').length > 1) {
                        let newData = {
                            dataByRow: [],
                            SectionHeader: <SectionHeaderTable1 period={period} notAvailable />
                        };
                        callback(undefined, newData)
                    } else {
                        targetAction.getDataCommon({
                            ...props,
                            separateTotalRow: true,
                            HeaderUI: HeaderUILayoutTable1,
                            SectionHeader: <SectionHeaderTable1 period={period} />
                        }).then(newData => callback(undefined, newData))
                    }

                }

                let periodCustom = period?.fromTo
                    ? period.outputDataDhis2
                    : eachMonthOfInterval({
                        start: parse('202404', 'yyyyMM', new Date()),
                        end: parse(period?.outputDataDhis2, 'yyyyMM', new Date()),
                    }).map((e) => format(e, 'yyyyMM')).join(';');

                let loadTable2 = (callback) => {
                    targetAction.getDataCommon({
                        ...props,
                        separateTotalRow: true,
                        period: periodCustom,
                        HeaderUI: HeaderUILayoutTable1,
                        SectionHeader: <SectionHeaderTable2 period={period} />
                    }).then(newData => callback(undefined, newData))
                }

                let periodByYear = groupBy(periodCustom.split(';'), e => {
                    return e.substr(0, 4)
                });
                let loadTable3 = Object.values(periodByYear).map((monthByYear, tableIdx) => {
                    return (callback) => {
                        let listColumnTb3 = listColumnConfigTb3(monthByYear)
                        targetAction.getDataCommon({
                            ...props,
                            listColumnConfig: listColumnTb3,
                            periodAsArray: monthByYear,
                            period: periodCustom,
                            isTable3: true,
                            periodQueryType: 'dimension',
                            // customDimension: [
                            //     `dimension=pe:${periodCustom}`
                            // ],
                            includeTotalRow: ['', 'Tổng số'],
                            dx: ['YyhJl0txmOc'],
                            HeaderUI: HeaderUILayoutTable3,
                            SectionHeader: <SectionHeaderTable3 tableIdx={tableIdx} period={period} />
                        }).then(newData => callback(undefined, newData))
                    }
                })

                let loadTableFooter = (callback) => {

                    let newData = {
                        dataByRow: [],
                        SectionHeader: <SectionFooterTable />
                    };
                    callback(undefined, newData)
                }

                let loadedTable = await parallel([
                    period?.outputDataDhis2.split(';').length == 1 ? loadTable1 : undefined,
                    loadTable2,
                    ...loadTable3,
                    loadTableFooter
                ]
                    .filter(e => e)
                );
                loadedTable.forEach(newData => {
                    setData((pre) => [
                        ...pre,
                        {
                            ...newData
                        }
                    ]);
                })
                setGlobalOverlay({
                    isOpen: false
                })
            }

            // setTableHeader(targetAction.HeaderUI)
        } catch (err) {
            setError({
                message: err.message
            })
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
            .join(' - ')
    }

}