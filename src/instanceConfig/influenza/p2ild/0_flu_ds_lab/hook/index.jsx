import { useEffect, useState } from "react";
import { usePrepareData } from "../../common/hooks/prepareData";
import { listColumnConfig } from "../actions/common";
import { usePreFetchData } from "../../common/hooks/usePreFetchData";
import { flatten, omit } from "lodash";
import { RenderValue } from "../../common/ui";
import { compareDesc, format, lastDayOfMonth, parse } from 'date-fns'
import { HeaderUILayout } from "../constant";
import { getCustomReportStateByPath } from "@core/stateManage/customState";
let count = 1;
export const useLoadData = (props) => {
    const {
        loaded,
        orgSelected, period,
        setGlobalOverlay,
        corePicker
    } = usePrepareData({});

    const [data, setData] = useState([]);
    const { setInputTasks, ButtonLoadMore, setUpdateLoading, reset: resetPrefetch } = usePreFetchData({
        onLoadMoreCompleted: ({ moreData, preloadData }) => {
            count = 1;
            if (preloadData && !preloadData?.isLoadAll) {
                let oldData = data[0] || {
                    dataByRow: [],
                    TableHeader: moreData[0].TableHeader
                };
                let newArrayRow = flatten(moreData.map(x => x.dataByRow));
                newArrayRow = [
                    ...oldData.dataByRow,
                    ...newArrayRow
                ].map((e, idx) => {
                    let value = count++;
                    e[0] = {
                        view: <RenderValue {...{
                            value,
                            ...omit(listColumnConfig[0], ["colStyle"]) //Ignore style of sticky
                        }}
                        />,
                        value,
                        ...listColumnConfig[0]
                    };
                    return e
                });
                let newData = {
                    key: corePicker.pickCompleted,
                    ...oldData,
                    dataByRow: newArrayRow
                }
                setData((pre) => [
                    newData
                ]);
            }
            if (preloadData?.isLoadAll) resetPrefetch();
        }
    })
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
        setData([]);
        resetPrefetch();
        setInputTasks([]);

        props = {
            ...props,
            orgUnit: orgSelected.id,
            period: period.outputDataDhis2,
            program: "SW127yJuN9L",
            stage: 'oSxAjrStVj4',
            dx: [
                "oSxAjrStVj4.tMhNfMPlea0",
                "oSxAjrStVj4.fAjreCUH5LS",
                "oSxAjrStVj4.imgjthupvbQ",
                "oSxAjrStVj4.JDXLd6II1Li",
                "oSxAjrStVj4.abACvIJh6xW",
                "oSxAjrStVj4.V1KvUGrW74D",
                "oSxAjrStVj4.wI87C5tKztz",
                "oSxAjrStVj4.Fs5MsYKIAup",
                "oSxAjrStVj4.uTZxkgJ6MK7",
                "oSxAjrStVj4.hb7YfSdXs7K",
                "oSxAjrStVj4.OXh9oS81aot",
                "oSxAjrStVj4.ceDgKzhxaFr",
                "oSxAjrStVj4.By3WuKlefGD",
            ],
            orgSelected,
            HeaderUI: HeaderUILayout,
            listColumnConfig: listColumnConfig,
            defaultCol: 10 - 2,

        }

        try {
            let orgType = orgSelected?.orgType?.key;
            let targetAction = await import('../actions/CurrentlyOrgSelected');

            //pull first page for get page count
            let dataPage1 = await targetAction.getDataCommon({ ...props, page: 1 });
            count = 1;
            dataPage1.dataByRow = dataPage1.dataByRow
                .sort((a, b) => {
                    let dayEventA, dayEventB;
                    dayEventA = new Date(a.find(e => e.de == 'eventdate')?.rawValue)
                    dayEventB = new Date(b.find(e => e.de == 'eventdate')?.rawValue)
                    if (!dayEventA || !dayEventB) return 0
                    return compareDesc(
                        dayEventA,
                        dayEventB,
                    )
                })
                .map(e => {

                    let value = count++;
                    e = e.map(x => ({ view: x, value: 0 }))
                    return e
                })
            setData((pre) => [
                dataPage1
            ]);
            if (dataPage1.pager.pageCount > 1) {
                let listRequest = Array(dataPage1.pager.pageCount - 1).fill(undefined)
                    .map((e, idx) => idx + 2)//Ignore page 1
                    .map(
                        page => {
                            console.log({ pageCurrentAdd: page, pager: dataPage1.pager })
                            return targetAction.getDataCommon.bind(undefined, { ...props, page })
                        }
                    )
                setInputTasks(listRequest);
            }


            setGlobalOverlay({
                isOpen: false
            });
            return;

            // setTableHeader(targetAction.HeaderUI)
        } catch (err) {
            console.log(err)

        } finally {
            // setIsDataLoadSuccess(true)
        }
    }

    return {
        data,
        orgReportName: orgSelected.displayName,
        dhis2Period: [
            corePicker?.periodSelected?.labelStartDate,
            corePicker?.periodSelected?.labelEndDate
                ? `${corePicker?.periodSelected?.labelEndDate}`
                : undefined,
        ]
            .filter((e) => e)
            .join(" đến ")
            .replaceAll("-", "/"),
        ButtonLoadMore
    }

}