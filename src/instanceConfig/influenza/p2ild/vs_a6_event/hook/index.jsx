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

        //Filter event by "Ngày nhập dữ liệu vào sổ A6 điện tử" instead of eventDate
        const periodDhis2 = period?.outputDataDhis2.split(';')
        const fromDate = parse(periodDhis2[0], 'yyyyMM', new Date())
        const endDate = parse(periodDhis2[periodDhis2.length - 1], 'yyyyMM', new Date())
        const firstDateOfMonth = format(fromDate, 'yyyy-MM-01')
        const lastDateOfMonth = format(lastDayOfMonth(endDate), 'yyyy-MM-dd')
        let queryType = getCustomReportStateByPath('customData.queryType') || 'queryByEventDate'
        let isQueryEventData = queryType != 'queryByDeathDate'
        let customPeriod = {
            periodDhis2: isQueryEventData ? period?.outputDataDhis2 : 'THIS_YEAR;LAST_5_YEARS',
            dxType: isQueryEventData ? "qgYbmBm4kx8.j3Yo9Dl5wN5" : `qgYbmBm4kx8.j3Yo9Dl5wN5:GE:${firstDateOfMonth}:LE:${lastDateOfMonth}`
        }
        props = {
            ...props,
            orgUnit: orgSelected.id,
            period: customPeriod.periodDhis2,
            program: "uX3pS8aZHN2",
            stage: 'qgYbmBm4kx8',
            dx: [
                customPeriod.dxType,
                `qgYbmBm4kx8.fcbbx6y83mn`,
                `qgYbmBm4kx8.amfixvUrTEW`,
                "qgYbmBm4kx8.nsMLAhezeHp", "qgYbmBm4kx8.W636zm2n4bX", "qgYbmBm4kx8.f0wPk4WKCmU", "qgYbmBm4kx8.O24nNmlRpxX", "qgYbmBm4kx8.RRoodjfWLoX", "qgYbmBm4kx8.F8ONvz0jpwf", "qgYbmBm4kx8.VKt28EykKgX", "qgYbmBm4kx8.TGWnfY7u1hs", "qgYbmBm4kx8.tfXeGE4u5ok", "qgYbmBm4kx8.KGZANMISs5K", "qgYbmBm4kx8.t7NHqtYqncz", "qgYbmBm4kx8.iEz9szT8t1L", "qgYbmBm4kx8.f3vMvXFidOr", "qgYbmBm4kx8.vwczPFDKv9X",
                "qgYbmBm4kx8.O24nNmlRpxX",//Sex
                "qgYbmBm4kx8.v32efSNbncR",//Year
                "qgYbmBm4kx8.lzpaZruNgBK",//Month
                "qgYbmBm4kx8.lR8ENNJ8S4C",//Day
                // ,"qgYbmBm4kx8.ksXGblaQZHL"
                , "qgYbmBm4kx8.EfvY4Ig7n6n", "qgYbmBm4kx8.vshLwzSkK1a", "qgYbmBm4kx8.e9Fi3vqopEy", "qgYbmBm4kx8.gKXlrrRCNOn", "qgYbmBm4kx8.ATSqSaZnepy", "qgYbmBm4kx8.ONipRLfjDrQ", "qgYbmBm4kx8.zE55pkddJ0D", "qgYbmBm4kx8.apLYj7N7izK", "qgYbmBm4kx8.xFuCxD7I7dm", "qgYbmBm4kx8.TNAffIjJ5fu", "qgYbmBm4kx8.CCLebncCrqd", "qgYbmBm4kx8.rQuQyPKAX9q", "qgYbmBm4kx8.peKcCT3x7H8", "qgYbmBm4kx8.Hnymqs1ZflO", "qgYbmBm4kx8.v8xMS84OMhc"],
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
                    if (isQueryEventData) {
                        dayEventA = new Date(a.find(e => e.de == 'eventdate')?.rawValue)
                        dayEventB = new Date(b.find(e => e.de == 'eventdate')?.rawValue)
                    } else {
                        dayEventA = new Date(a.find(e => e.de == 'qgYbmBm4kx8.j3Yo9Dl5wN5')?.rawValue)
                        dayEventB = new Date(b.find(e => e.de == 'qgYbmBm4kx8.j3Yo9Dl5wN5')?.rawValue)
                    }
                    if (!dayEventA || !dayEventB) return 0
                    return compareDesc(
                        dayEventA,
                        dayEventB,
                    )
                })
                .map(e => {

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