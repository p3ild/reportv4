import { getCoreMetaStateByPath } from "@core/stateManage/metadataState";
import { numToLocaleString } from "@core/utils/stringutils";
import { parallelLimit } from "async";
import { endOfISOWeek, format as formatDate, setISOWeek, setYear, startOfISOWeek } from 'date-fns';
import { useEffect, useState } from "react";
import { getValueDE } from "../../common/DataValueUtils";
import { usePrepareData } from "../../common/hooks/prepareData";
const _get = getCoreMetaStateByPath(`_get`);


let cssOps = {
    defaultCss: `style='font-family:Times, Times New Roman, Georgia, serif;vertical-align: middle; text-align: center;'`,
    ignoreDataCss: `style='font-family:Times, Times New Roman, Georgia, serif;background-color: #aaa;'`
}

const listDataElement = [
    { ID: "N5KvPlsayPK", title: 'Total tested by hospital' },
    { ID: "Myh67Gksnjo", title: 'Total negative cases by hospital' },
    { ID: "Zl7eODuKUCm", title: 'Tỷ lệ mẫu cúm âm tính theo BV' },

    { ID: "zWCVa4gW48m", title: 'B (Yamagata) positive cases by hospital' },
    { ID: "aequJB1FbCL", title: 'Tỷ lệ mẫu dương tính cúm B (Yamagata) theo BV' },

    { ID: "Bz5TVS1vICZ", title: 'B (Victoria) positive cases by hospital' },
    { ID: "h1RsHP3lGO2", title: 'Tỷ lệ mẫu dương tính cúm B (Victoria) theo BV' },

    { ID: "dRyFz6seuQL", title: 'Cúm B (Không xác định) theo BV' },
    { ID: "rbe3pc9rsbQ", title: 'Tỷ lệ Cúm B (Không xác định) theo BV' },

    { ID: "P54qeZeasJY", title: 'A(H1N1pdm09) positive  cases by hospital' },
    { ID: "OQds1tmaFVS", title: 'Tỷ lệ mẫu dương tính cúm A(H1N1pdm09) theo BV' },

    { ID: "HiIlgyITGNn", title: 'A(H3N2) positive cases by hospital' },
    { ID: "GX7DdbuB4aq", title: 'Tỷ lệ mẫu dương tính cúm A(H3N2) theo BV' },

    { ID: "uRS7FO8cuqq", title: 'A/H5 positive cases by hospital' },
    { ID: "szotXMUxcJ2", title: 'Tỷ lệ mẫu dương tính cúm A/H5 theo BV' },

    { ID: "saF8jnZLVPi", title: 'A/H7 positive cases by hospital' },
    { ID: "YPUh6wNzGDe", title: 'Tỷ lệ mẫu dương tính cúm A/H7 theo BV' },

    { ID: "A7qbOz7f0xb", title: 'Type A (undefined) positive cases by hospital' },
    { ID: "ntOdQCeMuCD", title: 'Tỷ lệ mẫu dương tính cúm A chưa xác định theo BV' },

    { ID: "momNMsULM1A", title: 'Other virus positive cases by hospital' },
    { ID: "rem5Gs34OZk", title: 'Tỷ lệ mẫu dương tính virus cúm khác theo BV' },
]

let periodByYear = [
    { iso: 'W1;W2;W3;W4', title: 'Tuần 1-4' },
    { iso: 'W5;W6;W7;W8', title: 'Tuần 5-8' },
    { iso: 'W9;W10;W11;W12', title: 'Tuần 9-12' },
    { iso: 'W13;W14;W15;W16', title: 'Tuần 13-16' },
    { iso: 'W17;W8;W9;W20', title: 'Tuần 17-20' },
    { iso: 'W21;W22;W23;W24', title: 'Tuần 21-24' },
    { iso: 'W25;W26;W27;W28', title: 'Tuần 25-28' },
    { iso: 'W29;W30;W31;W32', title: 'Tuần 29-32' },
    { iso: 'W33;W34;W35;W36', title: 'Tuần 33-36' },
    { iso: 'W37;W38;W39;W40', title: 'Tuần 37-40' },
    { iso: 'W41;W42;W43;W44', title: 'Tuần 41-44' },
    { iso: 'W45;W46;W47;W48', title: 'Tuần 45-48' },
    { iso: 'W49;W50;W51;W52', title: 'Tuần 49-52' }
];

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
                    let periods = period?.outputDataDhis2; //'2025W01;2025W02;2025W03;2025W04;2025W05;2025W06'//props.periods.split(';');
                    let org = orgSelected.id//'hdXUjjz7tQ0'//props.periods.split(';');
                    const idRowAnchor = 'tb1ColumnIncrise';

                    let generateApiEndpoint = (period) => {
                        return [`/api/analytics.json?dimension=dx:${listDataElement.map(e => e.ID).join(';')}`
                            , `&dimension=ou:${org}`
                            , `&filter=pe:${period}`
                            , `&skipRounding=true`
                        ].join('')
                    };


                    let dataPeriod
                    switch (true) {
                        case period.type == 'year':
                            {
                                dataPeriod = await parallelLimit(
                                    periodByYear.map(e => {
                                        const periodString = e.iso.split(';').map(x => `${periods}${x}`).join(';')
                                        return cb => _get(generateApiEndpoint(periodString))
                                            .then(x => {
                                                x.period = e.title
                                                cb(null, x)
                                            })
                                    }),
                                    3
                                )
                                break;
                            }
                        case ['quarter', 'quarter2'].includes(period.type):
                            {
                                dataPeriod = await parallelLimit(
                                    [
                                        cb => _get(generateApiEndpoint(periods))
                                            .then(x => {
                                                x.period = `Quý ${periods.substr(5, 2)}`
                                                cb(null, x)
                                            })
                                    ],
                                    3
                                )
                                break;
                            }
                        case ['month', 'month2'].includes(period.type):
                            {
                                dataPeriod = await parallelLimit(
                                    periods.split(';').map(month => {
                                        return cb => _get(generateApiEndpoint(month))
                                            .then(x => {
                                                x.period = `Tháng ${parseInt(month.substr(4, 3))}`
                                                cb(null, x)
                                            })
                                    }),
                                    3
                                )
                                break;
                            }
                        case ['weekClassic', 'weekClassic2'].includes(period.type):
                            {
                                dataPeriod = await parallelLimit(
                                    periods.split(';').map(month => {
                                        return cb => _get(generateApiEndpoint(month))
                                            .then(x => {
                                                x.period = `Tuần ${parseInt(month.substr(5, 3))}`
                                                cb(null, x)
                                            })
                                    }),
                                    3
                                )
                                break;
                            }
                    }

                    // let dataPeriod = await parallelLimit(
                    //     periods.split(';')
                    //         .map(period => {
                    //             return cb => _get(generateApiEndpoint(period))
                    //                 .then(x => {
                    //                     x.period = period
                    //                     cb(null, x)
                    //                 }
                    //                 )
                    //         })
                    //     ,
                    //     3
                    // );

                    let json = dataPeriod;

                    json.forEach(mDataPeriod => {
                        if (mDataPeriod.err || !mDataPeriod?.metaData?.dimensions?.ou) {

                            // worker.getOwnerManager().setRequestStatusByRowID(idRowAnchor, p2ild.asyncLoadSupport.STATUS_API.SUCCESS);
                            if (!mDataPeriod?.metaData?.dimensions?.ou) { return }
                            htmlReport += "<tr>";
                            for (let m = 0; m < numberColumnCatch; m++) {
                                htmlReport += "<td align='center'>0</td>";//21
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
                            defaultCss: `style='font-family:Times, Times New Roman, Georgia, serif'`,
                            ignoreDataCss: `style='font-family:Times, Times New Roman, Georgia, serif;background-color: #aaa;'`
                        }

                        dataPeriod.forEach(dataEachPeriod => {
                            htmlReport += `<tr><td class='ngoaitru' align='center'>
                        ${dataEachPeriod.period}
                        </td>`;
                            listDataElement.forEach((deElement, idx, arr) => {
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
                                htmlReport += `<td align='center' ${css}>${numToLocaleString(data)}</td>`;
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

