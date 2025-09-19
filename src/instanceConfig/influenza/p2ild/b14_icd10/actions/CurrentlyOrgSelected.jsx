import { getCoreMetaStateByPath } from "@core/stateManage/metadataState";
import { groupBy, uniqBy } from "lodash";
import { numberWithThousands } from "../../common/DataValueUtils";


const chapterCodes = ["A00-B99", "C00-D48", "D50-D89", "E00-E90", "F00-F99", "G00-G99", "H00-H59", "H60-H95", "I00-I99", "J00-J99", "K00-K93", "L00-L99", "M00-M99", "N00-N99", "O00-O99", "P00-P96", "Q00-Q99", "R00-R99", "S00-T98", "V01-Y98", "Z00-Z99", " "];
var chapter = {
    "A00-B99": "Chương I: Bệnh nhiễm khuẩn và kí sinh vật",
    "C00-D48": "Chương II: Khối u",
    "D50-D89": "Chương III: Bệnh của máu , cơ quan tạo máu và cơ chế miễn dịch",
    "E00-E90": "Chương IV: Bệnh nội tiết, dinh dưỡng chuyển hoá",
    "F00-F99": "Chương V: Rối loạn tâm thần và hành vi",
    "G00-G99": "Chương VI: Bệnh của hệ thống thần kinh",
    "H00-H59": "Chương VII: Bệnh của mắt và phần phụ",
    "H60-H95": "Chương VIII: Bệnh của tai và xương chũm",
    "I00-I99": "Chương IX: Bệnh của hệ tuần hoàn",
    "J00-J99": "Chương X: Bệnh của hệ hô hấp",
    "K00-K93": "Chương XI: Bệnh của hệ tiêu hoá",
    "L00-L99": "Chương XII: Bệnh của da và tổ chức dưới da.",
    "M00-M99": "Chương XIII: Bệnh của hệ thống cơ, xương và mô liên kết Chapter XIII",
    "N00-N99": "Chương XIV: Bệnh của hệ tiết niệu sinh dục",
    "O00-O99": "Chương XV: Chửa,đẻ và sau đẻ",
    "P00-P96": "Chương XVI: Một số bệnh trong thời kì chu sinh",
    "Q00-Q99": "Chương XVII: Dị dạng bẩm sinh, biến dạng của cromosom",
    "R00-R99": "Chương XVIII: Triệu chứng, dấu hiệu và phát hiện bất thường lâm sàng, xét nghiệm",
    "S00-T98": "Chương XIX: Vết thương, ngộ độc và kết quả của các nguyên nhân bên ngoài",
    "V01-Y98": "Chương XX: Nguyên nhân bên ngoài của bệnh tật và tử vong",
    "Z00-Z99": "Chương XXI: Các yếu tố ảnh hưởng đến sức khoẻ người khám nghiệm và điều tra",
    // " ": "Chương XXII: Mã dành cho những mục đích đặc biệt",
};


function reduceWidthRowString(str, delimeter, amountWord) {
    amountWord = amountWord || 4;
    delimeter = delimeter || " ";
    return (str).split(delimeter).map((e, idx) => { return (idx + 1) % amountWord == 0 ? `${e}<br>` : e }).join(delimeter)
}


function sumByChapter() {

    Object.keys(chapter).forEach(function (key) {
        var sumValues = [];
        for (var i = 0; sumValues.push(i) < 17;);
        $("#printing [name='fillData " + key + "']").each(function () {
            for (var j = 3; j <= 19; j++) {
                sumValues[j - 3] += Number($(this).children()[j].innerText.replace(/\./g, ""));
            }
        });

        // render Sum
        $("#printing [name='sumData " + key + "']").each(function () {
            for (var j = 3; j <= 19; j++) {
                $(this).children()[j].innerText = numberWithThousands(sumValues[j - 3]);
            }
        });

    })
};

function getHeadersIndex(headers) {
    return headers.reduce((obj, x, idx) => {
        var obj;
        obj[x.name] = idx;
        return obj;
    }, {});
}

export const getDataCommon = async (props) => {
    const _get = getCoreMetaStateByPath('_get')


    let json = await _get('/api/optionSets/OXH5bk60BAx.json?fields=id,name,options[id,name,code,displayName,attributeValues,translations,sortOrder]');


    var check_chapter = "";
    json.options.filter(e => e.id != "yAgzJhugg6m").forEach(function (op) {
        var html = "";
        if (op.attributeValues[0].value !== check_chapter) {
            check_chapter = op.attributeValues[0].value;
            html = "<tr name=\"sumData " + check_chapter + "\">\n                            <td></td>\n                            <td class='text-left font-bold'>" + reduceWidthRowString(chapter[check_chapter], " ") + "</td>\n                            <td><strong>" + check_chapter + "</strong></td>\n                            <td align=\"center\"></td>\n                            <td align=\"center\"></td>\n                            <td align=\"center\"></td>\n                            <td align=\"center\"></td>\n                            <td align=\"center\"></td>\n                            <td align=\"center\"></td>\n                            <td align=\"center\"></td>\n                            <td align=\"center\"></td>\n                            <td align=\"center\"></td>\n                            <td align=\"center\"></td>\n                            <td align=\"center\"></td>\n                            <td align=\"center\"></td>\n <td align=\"center\"></td>\n <td align=\"center\"></td>\n <td align=\"center\"></td>\n <td align=\"center\"></td>\n <td align=\"center\"></td>\n                        </tr>";
            $("#printing  #tableICD").append(html);
            html = "";
        }
        let nameChapter = true
            ? reduceWidthRowString(op.name.replace(op.code + ". ", ''), " ")
            // : reduceWidthRowString(op.translations[0].value.replace(op.code + ". ", ''), " ");//Eng
            : reduceWidthRowString(op.name.replace(op.code + ". ", ''), " ");//Allway use vi
        let codeChapter = reduceWidthRowString(op.code, ",", 2);//"";
        html = "<tr name=\"fillData " + check_chapter + "\">\n                        <td align=\"center\"><strong>" + op.sortOrder + "</strong></td>\n                        <td>" + nameChapter + "</td>\n                        <td><strong>" + codeChapter + "</strong></td>\n                        <td align=\"center\">0</td>\n                        <td align=\"center\">0</td>\n                        <td align=\"center\">0</td>\n                        <td align=\"center\">0</td>\n                        <td align=\"center\">0</td>\n                        <td align=\"center\">0</td>\n                        <td align=\"center\">0</td>\n                        <td align=\"center\">0</td>\n                        <td align=\"center\">0</td>\n                        <td align=\"center\">0</td>\n                        <td align=\"center\">0</td>\n                        <td align=\"center\">0</td>\n <td align=\"center\">0</td>\n <td align=\"center\">0</td>\n <td align=\"center\">0</td>\n <td align=\"center\">0</td>\n <td align=\"center\">0</td>\n                    </tr>";
        $("#printing #tableICD").append(html);
    });


    const pullICD10TT37 = async ({ result, page, pagesize, callBackOnCompelete }) => {
        let ouTarget = props.orgUnit;
        let api = `/api/analytics/events/query/OXMrd8oAmoG.json?dimension=pe:${props.period}&dimension=ou:${ouTarget}&dimension=ifbJ4AaAfFA&dimension=E1CA5ybd7GG&dimension=fgwGV3PWZTI&dimension=S7p0pDTsVjW&dimension=Adojv33Izrp&dimension=JwoiOADNWSU&dimension=gufyNU7ZgR1&dimension=cTBCMyhf9b2&dimension=ORZnYwOC0E0&dimension=XPfzjZVywVR&dimension=Xfi5zfhnMjb&dimension=QsqILOYIL4D&dimension=cpIQEtVoyq5&dimension=wEvOu9QQyaU&dimension=kYhZfwahHs4&dimension=qWfrkgx3wur&dimension=S54r4Rb0CG0&dimension=gzaIFkV0dAE&stage=dL7pqw4eWsg&displayProperty=NAME&outputType=EVENT&pageSize=${pagesize}&page=${page}`
        let fetchPage = await _get(api);
        let data = fetchPage;
        if (!result.rows) {
            result = data;
        } else {
            result.rows = [...result.rows, ...data.rows];
        }

        console.log({ page, result: result.rows.length, data: data.rows.length })
        if (data.height == pagesize) {
            pullICD10TT37({ result, page: ++page, pagesize, callBackOnCompelete });
        } else {
            callBackOnCompelete(result);
        }
    }
    let values = []
    await pullICD10TT37(
        {
            result: {},
            page: 1,//startPage
            pagesize: 40000,
            callBackOnCompelete: (json) => {
                //....
                values.push(json);
                console.log("callback@@", values);


                // TT37 data
                var json = values[0];
                let chapterCodeIndex = 26;
                var cleanrRedundancyData = json.rows.filter(e => !chapterCodes.includes(e[chapterCodeIndex]));
                var uniqCleanrRedundancyData = uniqBy(cleanrRedundancyData, e => e[0])
                var groupedData = groupBy(uniqCleanrRedundancyData, chapterCodeIndex);
                var indexHeader = getHeadersIndex(json.headers);
                console.log(`notUniq/Uniq: ${cleanrRedundancyData.length}/${uniqCleanrRedundancyData.length}`)

                // TT27 data
                // var clean27Data = values[0].rows.filter(e => !chapterCodes.includes(e[chapterCodeIndex]));
                // var grouped27Data = _.groupBy(clean27Data, chapterCodeIndex);
                // var index27Header = getHeadersIndex(values[0].headers);
                // debugger;

                Object.keys(groupedData).forEach(key => {
                    $("[name*=fillData]").each(function () {
                        if ($(this).children()[2].children[0].innerHTML.replace(/<br>/g, "") === key) {

                            $(this).children()[3].innerText = numberWithThousands(groupedData[key].map(a => a[indexHeader["E1CA5ybd7GG"]]).reduce((a, b) => Number(a) + Number(b), 0));
                            $(this).children()[4].innerText = numberWithThousands(groupedData[key].map(a => a[indexHeader["fgwGV3PWZTI"]]).reduce((a, b) => Number(a) + Number(b), 0));
                            $(this).children()[5].innerText = numberWithThousands(groupedData[key].map(a => a[indexHeader["S7p0pDTsVjW"]]).reduce((a, b) => Number(a) + Number(b), 0));
                            $(this).children()[6].innerText = numberWithThousands(groupedData[key].map(a => a[indexHeader["Adojv33Izrp"]]).reduce((a, b) => Number(a) + Number(b), 0));
                            $(this).children()[7].innerText = numberWithThousands(groupedData[key].map(a => a[indexHeader["JwoiOADNWSU"]]).reduce((a, b) => Number(a) + Number(b), 0));
                            $(this).children()[8].innerText = numberWithThousands(groupedData[key].map(a => a[indexHeader["gufyNU7ZgR1"]]).reduce((a, b) => Number(a) + Number(b), 0));
                            $(this).children()[9].innerText = numberWithThousands(groupedData[key].map(a => a[indexHeader["cTBCMyhf9b2"]]).reduce((a, b) => Number(a) + Number(b), 0));
                            $(this).children()[10].innerText = numberWithThousands(groupedData[key].map(a => a[indexHeader["ORZnYwOC0E0"]]).reduce((a, b) => Number(a) + Number(b), 0));
                            $(this).children()[11].innerText = numberWithThousands(groupedData[key].map(a => a[indexHeader["XPfzjZVywVR"]]).reduce((a, b) => Number(a) + Number(b), 0));
                            $(this).children()[12].innerText = numberWithThousands(groupedData[key].map(a => a[indexHeader["Xfi5zfhnMjb"]]).reduce((a, b) => Number(a) + Number(b), 0));
                            $(this).children()[13].innerText = numberWithThousands(groupedData[key].map(a => a[indexHeader["QsqILOYIL4D"]]).reduce((a, b) => Number(a) + Number(b), 0));
                            $(this).children()[14].innerText = numberWithThousands(groupedData[key].map(a => a[indexHeader["cpIQEtVoyq5"]]).reduce((a, b) => Number(a) + Number(b), 0));
                            $(this).children()[15].innerText = numberWithThousands(groupedData[key].map(a => a[indexHeader["wEvOu9QQyaU"]]).reduce((a, b) => Number(a) + Number(b), 0));
                            $(this).children()[16].innerText = numberWithThousands(groupedData[key].map(a => a[indexHeader["kYhZfwahHs4"]]).reduce((a, b) => Number(a) + Number(b), 0));
                            $(this).children()[17].innerText = numberWithThousands(groupedData[key].map(a => a[indexHeader["qWfrkgx3wur"]]).reduce((a, b) => Number(a) + Number(b), 0));
                            $(this).children()[18].innerText = numberWithThousands(groupedData[key].map(a => a[indexHeader["S54r4Rb0CG0"]]).reduce((a, b) => Number(a) + Number(b), 0));
                            $(this).children()[19].innerText = numberWithThousands(groupedData[key].map(a => a[indexHeader["gzaIFkV0dAE"]]).reduce((a, b) => Number(a) + Number(b), 0));
                        }
                    });
                })
                sumByChapter();
            }
        }
    );


    return {

    }
}
