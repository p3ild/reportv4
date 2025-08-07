import { getCoreMetaStateByPath } from "@core/stateManage/metadataState";
import { groupBy, uniqBy } from "lodash";
import { numberWithThousands } from "../../common/DataValueUtils";
import { getCustomReportStateByPath } from "@core/stateManage/customState";
import { format, lastDayOfMonth, parse } from "date-fns";



var chapters = [
    "Tổng số"
    , "I. Bệnh nhiễm trùng và kí sinh trùng"
    , "Ung thư"
    , "Bệnh nội tiết và dinh dưỡng"
    , "Bệnh tuần hoàn"
    , "Các rối loạn hệ hô hấp"
    , "Các rối loạn hệ tiêu hóa"
    , "Các rối loạn hệ tiết niệu"
    , "Các rối loạn tâm thần vầ hệ thần kinh"
    , "Các rồi loạn liện quan đến thời kỳ thai nghén, sinh đẻ và hậu sản"
    , "Các nguyên nhân tử vong sơ sinh"
    , "Thai chết lưu/ThaiChết trong tử vong"
    , "II. Bệnh không lây nhiễm"
    , "III. Các nguyên nhân bên ngoài gây tử vong"
    , "IV. Khác"
];

function sumByChapter() {
    var sumValues = [];

    chapters.forEach(function (key) {
        sumValues = [];
        for (var i = 0; sumValues.push(i) < 27;);
        $("[child_sum='" + key + "']").each(function () {
            for (var j = 3; j <= 29; j++) {
                sumValues[j - 3] += Number($(this).children()[j].innerText.replace(/\./g, ""));
            }
        });

        // render Sum
        $("[parent_sum='" + key + "']").each(function () {
            for (var j = 3; j <= 29; j++) {
                if ($(this).children()[j].children[0]) {
                    $(this).children()[j].children[0].innerHTML = numberWithThousands(sumValues[j - 3]);
                } else {
                    $(this).children()[j].innerHTML = numberWithThousands(sumValues[j - 3]);
                }

                // console.log(sumValues[j - 3]);
            }
        });
    })

    // render total
    sumValues = [];
    for (var i = 0; sumValues.push(i) < 28;);

    chapters.forEach(function (key) {
        if (key.includes(".")) {
            $("[parent_sum='" + key + "']").each(function () {
                for (var j = 3; j <= 29; j++) {
                    sumValues[j - 2] += Number($(this).children()[j].innerText.replace(/\./g, ""));
                    if ($("[parent_sum='Tổng số']").children()[j].children[0]) {
                        $("[parent_sum='Tổng số']").children()[j].children[0].innerHTML = numberWithThousands(sumValues[j - 2]);
                    } else {
                        $("[parent_sum='Tổng số']").children()[j].innerHTML = numberWithThousands(sumValues[j - 2]);
                    }

                    // console.log(sumValues[j - 2]);
                }
            });
        }
    })
};
export const getDataCommon = async (props) => {
    const _get = getCoreMetaStateByPath('_get')


    console.log(props)
    let json = await _get('/api/optionSets/XbbUOlVRCHo.json?fields=id,name,options[id,name,code,displayName,attributeValues,translations,sortOrder]');
    var current_parent_chapter = "";
    let current_child_chapter = "";
    var totalHtml = "<tr  name='fillData' parent_sum=\"Tổng số\">\n<td></td>\n<td><strong>Tổng số</strong></td>\n<td><strong></strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n</tr>\n";

    var configData = json.options.map(op => {
        let attribute = op.attributeValues[0].value.split("_")
        return {
            op,
            total: attribute[0],
            subTotal: attribute[1]

        }
    });

    var sortChapByIncludes =
        //SortConfig
        [
            "I. Bệnh nhiễm trùng và kí sinh trùng",
            "II. Bệnh không lây nhiễm",
            "III. Các nguyên nhân bên ngoài gây tử vong",
            'IV. Khác',
        ].map(totalChapTarget => {
            let valueMath = configData.filter(e => e.total == totalChapTarget)
                .sort((a, b) => {
                    if (a.subTotal < b.subTotal) {
                        return -1
                    }
                    if (a.subTotal > b.subTotal) {
                        return 1
                    };
                    return 0
                });//Sort subTotal by alphabetic
            return valueMath
        }).reduce((rs, e) => {
            rs = rs.concat(e);
            return rs;
        }, [])

    $("#tableICD").append(totalHtml);

    sortChapByIncludes.forEach(function ({ op, subTotal, total }, idx) {
        let chapterTags = op.attributeValues[0].value
        var html = "";
        let sumTags = chapterTags.split("_")
        if (sumTags.length > 1) {
            //add parent sum
            if (current_parent_chapter != sumTags[0]) {
                html += "<tr  name='fillData' parent_sum=\"" + sumTags[0] + "\">\n<td></td>\n<td><strong>" + sumTags[0] + "</strong></td>\n<td><strong></strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n</tr>\n";
                current_parent_chapter = sumTags[0]
                current_child_chapter = sumTags[0]
            }

            //add child sum
            if (current_child_chapter != sumTags[1]) {
                html += "<tr  name='fillData' parent_sum=\"" + sumTags[1] + "\" child_sum=\"" + sumTags[0] + "\">\n<td></td>\n<td><strong>" + sumTags[1] + "</strong></td>\n<td><strong></strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n</tr>\n";
                current_child_chapter = sumTags[1]
            }

            html += "<tr name='fillData' child_sum=\"" + current_child_chapter + "\">\n<td align=\"center\"><strong>" + ++idx + "</strong></td>\n<td>" + (op.name.replace(op.code + ". ", '') || op.name.replace(op.code + ". ", '')) + "</td>\n<td><strong>" + op.code + "</strong></td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n</tr>";
        } else {
            if (chapterTags !== current_parent_chapter) {
                html += "<tr  name='fillData' parent_sum=\"" + chapterTags + "\">\n<td></td>\n<td><strong>" + chapterTags + "</strong></td>\n<td><strong></strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n<td align=\"center\"><strong>0</strong></td>\n</tr>\n";

                current_parent_chapter = chapterTags;
            }
            html += "<tr name='fillData' child_sum=\"" + current_parent_chapter + "\">\n<td align=\"center\"><strong>" + ++idx + "</strong></td>\n<td>" + (op.name.replace(op.code + ". ", '') || op.name.replace(op.code + ". ", '')) + "</td>\n<td><strong>" + op.code + "</strong></td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n<td align=\"center\">0</td>\n</tr>"
        }
        $("#tableICD").append(html);
    });


    async function pullAll({
        pageSize = 500000
    }) {

        const periodDhis2 = props.period?.split(';')
        const fromDate = parse(periodDhis2[0], 'yyyyMM', new Date())
        const endDate = parse(periodDhis2[periodDhis2.length - 1], 'yyyyMM', new Date())
        const firstDateOfMonth = format(fromDate, 'yyyy-MM-01')
        const lastDateOfMonth = format(lastDayOfMonth(endDate), 'yyyy-MM-dd')
        let queryType = getCustomReportStateByPath('customData.queryType') || 'queryByEventDate'
        let isQueryEventData = queryType != 'queryByDeathDate'
        let customPeriod = {
            periodDhis2: isQueryEventData ? props.period : 'THIS_YEAR;LAST_5_YEARS',
            dxType: isQueryEventData ? "" : `&filter=qgYbmBm4kx8.j3Yo9Dl5wN5:GE:${firstDateOfMonth}:LE:${lastDateOfMonth}`
        }


        let ouTarget = props.orgUnit;
        let firstPage = await _get(`/api/analytics/events/query/uX3pS8aZHN2.json?dimension=pe:${customPeriod.periodDhis2}${customPeriod.dxType}&dimension=ou:${ouTarget}&dimension=qgYbmBm4kx8.O24nNmlRpxX&dimension=qgYbmBm4kx8.iEz9szT8t1L:!like:%27%27&dimension=qgYbmBm4kx8.v32efSNbncR&dimension=qgYbmBm4kx8.lzpaZruNgBK&dimension=qgYbmBm4kx8.lR8ENNJ8S4C&dimension=qgYbmBm4kx8.rQuQyPKAX9q&displayProperty=NAME&outputType=EVENT&pageSize=${pageSize}&page=1`);
        let pageCount = firstPage.metaData?.pager?.pageCount;
        let listFetchAll = Array(pageCount - 1).fill().map((e, idx) => idx + 2).map(page => {
            return _get(`/api/analytics/events/query/uX3pS8aZHN2.json?dimension=pe:${customPeriod.periodDhis2}${customPeriod.dxType}&dimension=ou:${ouTarget}&dimension=qgYbmBm4kx8.O24nNmlRpxX&dimension=qgYbmBm4kx8.iEz9szT8t1L:!like:%27%27&dimension=qgYbmBm4kx8.v32efSNbncR&dimension=qgYbmBm4kx8.lzpaZruNgBK&dimension=qgYbmBm4kx8.lR8ENNJ8S4C&dimension=qgYbmBm4kx8.rQuQyPKAX9q&displayProperty=NAME&outputType=EVENT&pageSize=${pageSize}&page=${page}`).then(e => e.json())
        });
        return new Promise(async (resolve, reject) => {
            Promise.all(listFetchAll).then(x => {

                let allPage = {
                    metaData: firstPage.metaData,
                    headers: firstPage.headers,
                    rows: [
                        ...firstPage.rows,
                        ...x.reduce((tt, el) => {
                            tt = tt.concat(el.rows);
                            return tt;
                        }, [])
                    ]
                }
                resolve({ ...allPage });
                console.log(allPage)
            })
        })
    }

    await pullAll(
        {
            pagesize: 60000
        }).then((json) => {
            let headerIndex = defineHeader(json.headers);
            console.log(`before uniq: ${json.rows.length}`)
            json.rows = uniqBy(json.rows, 0);
            console.log(`after uniq: ${json.rows.length}`)
            let groupedData = groupBy(json.rows, headerIndex.iNguyenNhanTuVong);

            Object.keys(groupedData).forEach(key => {
                $("[name*=fillData]").each(function () {
                    if ($(this).children()[2].children[0].innerHTML === key) {
                        let less28d = filterAge(headerIndex, groupedData[key], 0, 28)//Ngay tuoi
                        let less1y = filterAge(headerIndex, groupedData[key], 28, 366)//Thang tuoi

                        let less5y = filterAge(headerIndex, groupedData[key], 1, 5)//Nam tuoi
                        let less10y = filterAge(headerIndex, groupedData[key], 5, 10)
                        let less15y = filterAge(headerIndex, groupedData[key], 10, 15)
                        let less20y = filterAge(headerIndex, groupedData[key], 15, 20)
                        let less30y = filterAge(headerIndex, groupedData[key], 20, 30)
                        let less40y = filterAge(headerIndex, groupedData[key], 30, 40)
                        let less50y = filterAge(headerIndex, groupedData[key], 40, 50)
                        let less60y = filterAge(headerIndex, groupedData[key], 50, 60)
                        let less70y = filterAge(headerIndex, groupedData[key], 60, 70)
                        let less200y = filterAge(headerIndex, groupedData[key], 70, 3000)

                        // if(groupedData[key])
                        $(this).children()[3].innerText = groupedData[key].length                           //4 _Tử vong chung  _ Tổng 
                        $(this).children()[4].innerText = groupedData[key].filter(e => e[headerIndex.iGioiTinh] == "F").length   //5 _Tử vong chung  _ Nữ

                        $(this).children()[5].innerText = less28d.length            //6
                        $(this).children()[6].innerText = less28d.filter(e => e[headerIndex.iGioiTinh] == "F").length                                    //7

                        $(this).children()[7].innerText = less1y.length             //8 
                        $(this).children()[8].innerText = less1y.filter(e => e[headerIndex.iGioiTinh] == "F").length                                     //9

                        $(this).children()[9].innerText = less5y.length             //10
                        $(this).children()[10].innerText = less5y.filter(e => e[headerIndex.iGioiTinh] == "F").length                                    //11

                        $(this).children()[11].innerText = less10y.length           //12
                        $(this).children()[12].innerText = less10y.filter(e => e[headerIndex.iGioiTinh] == "F").length                                   //13

                        $(this).children()[13].innerText = less15y.length           //14
                        $(this).children()[14].innerText = less15y.filter(e => e[headerIndex.iGioiTinh] == "F").length                                   //15

                        $(this).children()[15].innerText = less20y.length           //16
                        $(this).children()[16].innerText = less20y.filter(e => e[headerIndex.iGioiTinh] == "F").length                                   //17

                        $(this).children()[17].innerText = less30y.length           //18
                        $(this).children()[18].innerText = less30y.filter(e => e[headerIndex.iGioiTinh] == "F").length                                   //19

                        $(this).children()[19].innerText = less40y.length           //20
                        $(this).children()[20].innerText = less40y.filter(e => e[headerIndex.iGioiTinh] == "F").length                                   //21

                        $(this).children()[21].innerText = less50y.length           //22
                        $(this).children()[22].innerText = less50y.filter(e => e[headerIndex.iGioiTinh] == "F").length                                   //23

                        $(this).children()[23].innerText = less60y.length           //24
                        $(this).children()[24].innerText = less60y.filter(e => e[headerIndex.iGioiTinh] == "F").length                                   //25

                        $(this).children()[25].innerText = less70y.length           //26
                        $(this).children()[26].innerText = less70y.filter(e => e[headerIndex.iGioiTinh] == "F").length                                   //27

                        $(this).children()[27].innerText = less200y.length          //28
                        $(this).children()[28].innerText = less200y.filter(e => e[headerIndex.iGioiTinh] == "F").length                                  //29

                        $(this).children()[29].innerText = filterTVMom(headerIndex, groupedData[key]).length                                  //29
                    }
                });
            });
            sumByChapter();
        }

        );
}


function filterAge(headerIndex, array, from, to) {
    if (to == 28) {
        return array.filter(e => { return e[headerIndex.iNgayTuoi] != "" && e[headerIndex.iNgayTuoi] < 28 })
    } else if (to == 366) {
        return array.filter(e => { return e[headerIndex.iNgayTuoi] >= 28 || e[headerIndex.iThangTuoi] != "" })
    } else {
        return array.filter(e => { return from <= e[headerIndex.iNamTuoi] && to > e[headerIndex.iNamTuoi] })
    }
}


function filterTVMom(headerIndex, array) {
    return array.filter(e => { return e[headerIndex.iDeadMom] == "1" })
}

function defineHeader(jsonHeaderDhis) {
    var result = {
        iGioiTinh: "",
        iNguyenNhanTuVong: "",
        iNamTuoi: "",
        iThangTuoi: "",
        iNgayTuoi: ""
    }
    for (var i = 0; i < jsonHeaderDhis.length; i++) {
        if (jsonHeaderDhis[i].name == "qgYbmBm4kx8.O24nNmlRpxX") result.iGioiTinh = i;
        else if (jsonHeaderDhis[i].name == "qgYbmBm4kx8.iEz9szT8t1L") result.iNguyenNhanTuVong = i;
        else if (jsonHeaderDhis[i].name == "qgYbmBm4kx8.v32efSNbncR") result.iNamTuoi = i;
        else if (jsonHeaderDhis[i].name == "qgYbmBm4kx8.lzpaZruNgBK") result.iThangTuoi = i;
        else if (jsonHeaderDhis[i].name == "qgYbmBm4kx8.lR8ENNJ8S4C") result.iNgayTuoi = i;
        else if (jsonHeaderDhis[i].name == "qgYbmBm4kx8.rQuQyPKAX9q") result.iDeadMom = i;
    }
    return result;
}
