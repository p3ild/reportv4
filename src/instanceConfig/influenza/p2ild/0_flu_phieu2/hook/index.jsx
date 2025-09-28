import { getCoreMetaStateByPath } from "@core/stateManage/metadataState";
import { numToLocaleString } from "@core/utils/stringutils";
import { parallelLimit } from "async";
import { endOfISOWeek, format as formatDate, setISOWeek, setYear, startOfISOWeek } from 'date-fns';
import { useEffect, useState } from "react";
import { getValueDE } from "../../common/DataValueUtils";
import { usePrepareData } from "../../common/hooks/prepareData";
const _get = getCoreMetaStateByPath(`_get`);
const listDENgoaiTru = [
    // Tổng số BN đến khám/nhập viện
    { ID: "oZiW3Z4P2Mv.XK2dAwC8mNz", title: 'Ngoại trú - Tổng số BN đến khám/nhập viện' },

    //Tổng số BN viêm đường hô hấp cấp tính đến khám/nhập viện
    { ID: "p8bkmllQ7BJ.XK2dAwC8mNz", title: 'Ngoại trú - Tổng số BN viêm đường hô hấp cấp tính đến khám/nhập viện' },

    // Tổng số BN được XN cúm
    { ID: "cDgDtwnokmb.XK2dAwC8mNz", title: 'Ngoại trú - Tổng số BN được XN cúm' },

    //Tổng số XN cúm nhanh
    { ID: "juaXCIYjJmy.G7nfoJjuWBJ", title: 'Ngoại trú - Tổng số XN cúm nhanh - Âm tính' },
    { ID: "juaXCIYjJmy.Y3Tscxw6dSD", title: 'Ngoại trú - Tổng số XN cúm nhanh - Cúm A' },
    { ID: "juaXCIYjJmy.iCThFyFIhCZ", title: 'Ngoại trú - Tổng số XN cúm nhanh - Cúm B' },

    //Real-Time RT-PCR 
    { ID: "tfx25CQ8uV9.G7nfoJjuWBJ", title: 'Ngoại trú - Tổng số XN cúm bằng Real-Time RT-PCR - Âm tính' },
    { ID: "tfx25CQ8uV9.Y3Tscxw6dSD", title: 'Ngoại trú - Tổng số XN cúm bằng Real-Time RT-PCR - Cúm A' },
    { ID: "tfx25CQ8uV9.iCThFyFIhCZ", title: 'Ngoại trú - Tổng số XN cúm bằng Real-Time RT-PCR - Cúm B' },

    //Hô Hấp khác 
    { ID: "gLrzUIV18qn.Iqyho1VKq0E", title: 'Nội trú - Tổng số BN dương tính với các vi rút đường hô hấp khác - SARS-CoV-2' },//sars - am tinh
    { ID: "gLrzUIV18qn.v8CLLYJ5HdH", title: 'Nội trú - Tổng số BN dương tính với các vi rút đường hô hấp khác - SARS-CoV-2' },//sars - duong tinh

    { ID: "DoA4ako0kHq.Iqyho1VKq0E", title: 'Nội trú - Tổng số BN dương tính với các vi rút đường hô hấp khác - RSV' },//rsv - am tinh
    { ID: "DoA4ako0kHq.v8CLLYJ5HdH", title: 'Nội trú - Tổng số BN dương tính với các vi rút đường hô hấp khác - RSV' },//rsv - duong tinh

    { ID: "WBJgEharpPw.Iqyho1VKq0E", title: 'Nội trú - Tổng số BN dương tính với các vi rút đường hô hấp khác - Adeno' },//adeno - am tinh
    { ID: "WBJgEharpPw.v8CLLYJ5HdH", title: 'Nội trú - Tổng số BN dương tính với các vi rút đường hô hấp khác - Adeno' },//adeno - duong tinh

    { ID: "bZz5lVQ3Iq3.Iqyho1VKq0E", title: 'Nội trú - Tổng số BN dương tính với các vi rút đường hô hấp khác - Rhino' },//rhino - am tinh
    { ID: "bZz5lVQ3Iq3.v8CLLYJ5HdH", title: 'Nội trú - Tổng số BN dương tính với các vi rút đường hô hấp khác - Rhino' },//rhino - duong tinh

    { ID: "mTP8c8vP8nc", title: 'Tên tác nhân' },
    { ID: "etQjK8Ql0OY", title: 'Âm tính' },
    { ID: "bcpMFKvbsK6", title: 'Dương tính' },
];

const listDENoiTru = [
    // Tổng số BN đến khám/nhập viện
    { ID: "oZiW3Z4P2Mv.WaMQR4RXjzt", title: 'Nội trú - Tổng số BN đến khám/nhập viện' },

    //Tổng số BN viêm đường hô hấp cấp tính đến khám/nhập viện
    { ID: "p8bkmllQ7BJ.WaMQR4RXjzt", title: 'Nội trú - Tổng số BN viêm đường hô hấp cấp tính đến khám/nhập viện' },

    // Tổng số BN được XN cúm
    { ID: "cDgDtwnokmb.WaMQR4RXjzt", title: 'Nội trú - Tổng số BN được XN cúm' },

    //Tổng số XN cúm nhanh
    { ID: "juaXCIYjJmy.EKYs3Np6K4B", title: 'Nội trú - Tổng số XN cúm nhanh - Âm tính' },
    { ID: "juaXCIYjJmy.fU8wVvrHjyJ", title: 'Nội trú - Tổng số XN cúm nhanh - Cúm A' },
    { ID: "juaXCIYjJmy.D6OSlpdR2Wd", title: 'Nội trú - Tổng số XN cúm nhanh - Cúm B' },

    //Real-Time RT-PCR 
    { ID: "tfx25CQ8uV9.EKYs3Np6K4B", title: 'Nội trú - Tổng số XN cúm bằng Real-Time RT-PCR - Âm tính' },
    { ID: "tfx25CQ8uV9.fU8wVvrHjyJ", title: 'Nội trú - Tổng số XN cúm bằng Real-Time RT-PCR - Cúm A' },
    { ID: "tfx25CQ8uV9.D6OSlpdR2Wd", title: 'Nội trú - Tổng số XN cúm bằng Real-Time RT-PCR - Cúm B' },

    //Hô Hấp khác 
    { ID: "gLrzUIV18qn.lH7ScPoshoR", title: 'Nội trú - Tổng số BN dương tính với các vi rút đường hô hấp khác - SARS-CoV-2' },//sars - am tinh
    { ID: "gLrzUIV18qn.ocUJv3ANTdy", title: 'Nội trú - Tổng số BN dương tính với các vi rút đường hô hấp khác - SARS-CoV-2' },//sars - duong tinh

    { ID: "DoA4ako0kHq.lH7ScPoshoR", title: 'Nội trú - Tổng số BN dương tính với các vi rút đường hô hấp khác - RSV' },//rsv - am tinh
    { ID: "DoA4ako0kHq.ocUJv3ANTdy", title: 'Nội trú - Tổng số BN dương tính với các vi rút đường hô hấp khác - RSV' },//rsv - duong tinh

    { ID: "WBJgEharpPw.lH7ScPoshoR", title: 'Nội trú - Tổng số BN dương tính với các vi rút đường hô hấp khác - Adeno' },//adeno - am tinh
    { ID: "WBJgEharpPw.ocUJv3ANTdy", title: 'Nội trú - Tổng số BN dương tính với các vi rút đường hô hấp khác - Adeno' },//adeno - duong tinh

    { ID: "bZz5lVQ3Iq3.lH7ScPoshoR", title: 'Nội trú - Tổng số BN dương tính với các vi rút đường hô hấp khác - Rhino' },//rhino - am tinh
    { ID: "bZz5lVQ3Iq3.ocUJv3ANTdy", title: 'Nội trú - Tổng số BN dương tính với các vi rút đường hô hấp khác - Rhino' },//rhino - duong tinh

    { ID: "mTP8c8vP8nc", title: 'Tên tác nhân' },
    { ID: "ll2BOeSn3z8", title: 'Âm tính' },
    { ID: "LuN90JBw5zf", title: 'Dương tính' },
];

let cssOps = {
    defaultCss: `style='font-family:Times, Times New Roman, Georgia, serif;vertical-align: middle; text-align: center;'`,
    ignoreDataCss: `style='font-family:Times, Times New Roman, Georgia, serif;background-color: #aaa;'`
}

const listDataElement = [
    ...listDENgoaiTru,
    ...listDENoiTru,

]

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

        try {
            setError(undefined)
            setData(Math.random());
            let numberColumnCatch = 21;
            let childOrg = [];
            let htmlReport = ``

            props = {
                ...props,
                // approvalHook,
                orgUnit: orgSelected.id,
                period: period?.outputDataDhis2,
                orgSelected,
            }
                ; (async () => {
                    // let periods = '2025W01;2025W02;2025W03;2025W04;2025W05;2025W06'//props.periods.split(';');
                    // let org = 'hdXUjjz7tQ0'//props.periods.split(';');
                    let periods = period?.outputDataDhis2;
                    let org = orgSelected.id;
                    const idRowAnchor = 'tb1ColumnIncrise';

                    let generateApiEndpoint = (period) => {
                        return [`/api/analytics.json?dimension=dx:${listDataElement.map(e => e.ID).join(';')}`
                            , `&dimension=ou:${org}`
                            , `&filter=pe:${period}`
                            , `&skipRounding=true`
                        ].join('')
                    };


                    let dataPeriod = await parallelLimit(
                        periods.split(';')
                            .map(period => {
                                return cb => _get(generateApiEndpoint(period))
                                    .then(x => {
                                        x.period = period
                                        cb(null, x)
                                    }
                                    )
                            })
                        ,
                        3
                    );

                    let json = dataPeriod;

                    json.forEach(mDataPeriod => {
                        if (mDataPeriod.err || !mDataPeriod?.data?.metaData?.dimensions?.ou) {
                            if (!mDataPeriod?.data?.metaData?.dimensions?.ou) { return }
                            htmlReport += "<tr>";
                            for (let m = 0; m < numberColumnCatch; m++) {
                                htmlReport += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif;vertical-align: middle; text-align: center;'>0</td>";//21
                            }
                            htmlReport += "</tr>";
                            $(`#${idRowAnchor}`).after(htmlReport);
                            return
                        }

                    })
                    childOrg = json[0]?.metaData.dimensions.ou;
                    childOrg.sort(function (a, b) {
                        if (json[0]?.metaData.items[a].name < json[0]?.metaData.items[b].name) return -1;
                        if (json[0]?.metaData.items[a].name > json[0]?.metaData.items[b].name) return 1;
                        return 0;
                    })

                    childOrg.forEach(function (childID) {
                        cssOps = {
                            defaultCss: `style='font-family:Times, Times New Roman, Georgia, serif;vertical-align: middle; text-align: center;'`,
                            ignoreDataCss: `style='font-family:Times, Times New Roman, Georgia, serif;background-color: #aaa;'`
                        }

                        dataPeriod.forEach(dataEachPeriod => {
                            let weekDay = getWeekDay({ targetYear: dataEachPeriod.period.substr(0, 4), targetWeek: dataEachPeriod.period.substr(5, 2) });
                            htmlReport += `<tr>`;
                            htmlReport += `<td  rowSpan='2' align='center' style='vertical-align: middle; text-align: center;'>
                            Tuần ${weekDay.targetWeek}<br style="mso-data-placement:same-cell;">
                            Từ ngày ${weekDay.result.startDay}<br style="mso-data-placement:same-cell;">
                            Đến ngày ${weekDay.result.endDay}
                            </td>`;
                            htmlReport += `<td style='vertical-align: middle; text-align: center;'><br style="mso-data-placement:same-cell;">BN ngoại trú <br style="mso-data-placement:same-cell;"></td>`;
                            listDENgoaiTru.forEach((deElement, idx, arr) => {
                                let css;
                                let data = '';

                                switch (true) {
                                    default:
                                        css = cssOps.defaultCss;
                                        data = getValueDE({
                                            jsonDhis: dataEachPeriod,
                                            de: deElement.ID,
                                            // co,
                                            org: childID,
                                            // typeOfData,
                                            isConvertToNumberWithThousand: true,
                                            // pe: dataEachPeriod?.period
                                        })
                                        break;
                                }
                                // htmlReport += `<td align='center' ${css}>${data}</td>`;
                                htmlReport += `<td align='center' ${css}>${[0, '0'].includes(data) ? '' : numToLocaleString(data)}</td>`;
                            })

                            htmlReport += "</tr>";

                            htmlReport += `<tr>`;
                            htmlReport += `<td style='vertical-align: middle; text-align: center;'><br style="mso-data-placement:same-cell;">BN nội trú
                            <br style="mso-data-placement:same-cell;">
                            </td>`;
                            listDENoiTru.forEach((deElement, idx, arr) => {
                                let css;
                                let data = '';

                                switch (true) {
                                    default:
                                        css = cssOps.defaultCss;
                                        data = getValueDE({
                                            jsonDhis: dataEachPeriod,
                                            de: deElement.ID,
                                            // co,
                                            org: childID,
                                            // typeOfData,
                                            isConvertToNumberWithThousand: true,
                                            // pe: dataEachPeriod?.period
                                        })
                                        break;
                                }
                                // htmlReport += `<td align='center' class="data-value" ${css}>${data}</td>`;
                                htmlReport += `<td align='center' class="data-value" ${css}>${[0, '0'].includes(data) ? '' : numToLocaleString(data)}</td>`;
                            })
                            htmlReport += "</tr>";
                        })
                    })



                    $(`#${idRowAnchor}`).after(htmlReport);
                })()
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

function getAPI({ api, period }) {
    let dataApi = _get(api)

}

function getWeekDay({ targetYear, targetWeek, format = 'DD-MM-YYYY' }) {
    if (!targetYear) { console.log('Missing argument!! (!targetYear)'); return }

    // Create a date for the target year and ISO week
    let baseDate = setYear(new Date(), targetYear)
    let weekDate = setISOWeek(baseDate, targetWeek)

    // Get start (Monday) and end (Sunday) of the ISO week
    let startDay = formatDate(startOfISOWeek(weekDate), 'dd-MM-yyyy')
    let endDay = formatDate(endOfISOWeek(weekDate), 'dd-MM-yyyy')

    // Convert format if needed (moment format to date-fns format)
    if (format !== 'DD-MM-YYYY') {
        const dateFnsFormat = format.replace(/DD/g, 'dd').replace(/MM/g, 'MM').replace(/YYYY/g, 'yyyy')
        startDay = formatDate(startOfISOWeek(weekDate), dateFnsFormat)
        endDay = formatDate(endOfISOWeek(weekDate), dateFnsFormat)
    }

    return {
        targetYear, targetWeek,
        result: {
            startDay, endDay
        }
    }
}