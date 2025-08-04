
// ------------------------- Script -------------------------
var isDebug = true;

//Common
/*Option:
            1.Quarter
            2.Yearly
            3.Six-monthly
*/


var groupSelectTinh = "W4U1KdFeIJH";


let LEVEL_ORG_SELECT_TYPE = {
    TW: { type: 'bctw', tableID: 'bch', err: 'Biểu này không áp dụng cho tuyến trung ương' },
    TINH: { type: 'bct', tableID: 'bch' },
    HUYEN: { type: 'bch', tableID: 'bch' },
    XA: { type: 'bcx', tableID: 'bcx', err: 'Biểu này không áp dụng cho tuyến xã' },
    INDIVIDUAL_TINH: { type: 'INDIVIDUAL_TINH', tableID: 'bch' },
    INDIVIDUAL_HUYEN: { type: 'INDIVIDUAL_HUYEN', tableID: 'bch' },
    HUYEN_TTTYT: { type: 'HUYEN_TTYT', tableID: 'bch' }
}

var orgUnitSelectedGroupID;
function checkSelectedOrganisationUnit() {
    return new Promise((resolve, reject) => {
        $.get("../api/organisationUnits/" + orgUnitSelectedID + ".json?fields=id,organisationUnitGroups[id],level", function (json) {
            orgUnitSelectedGroupID = json.organisationUnitGroups
            if (orgUnitSelectedID == "LOdti1gATwC") { //TW
                orgHirch = (LEVEL_ORG_SELECT_TYPE.TW)
            } else if (json.organisationUnitGroups.some(x => x.id == "mH8ggZyC39Z")) { //Tinh
                orgHirch = (LEVEL_ORG_SELECT_TYPE.TINH)
            } else if (json.organisationUnitGroups.some(x => x.id == "W4U1KdFeIJH")) { //Huyen
                // sumAll = ['OHWM3DxkeMR']

                orgHirch = (LEVEL_ORG_SELECT_TYPE.HUYEN)
            } else if (json.organisationUnitGroups.some(x => x.id == "OHWM3DxkeMR")) { //Xa
                orgHirch = (LEVEL_ORG_SELECT_TYPE.XA)
            } else {
                if (json.level == 3) {
                    orgHirch = LEVEL_ORG_SELECT_TYPE.INDIVIDUAL_TINH;
                } else if (json.level == 4) {
                    if (json.organisationUnitGroups.some(x =>
                        ["JchZd7bGhgr"].includes(x.id)
                    )) orgHirch = LEVEL_ORG_SELECT_TYPE.HUYEN_TTTYT;//JchZd7bGhgr
                    else {
                        orgHirch = LEVEL_ORG_SELECT_TYPE.INDIVIDUAL_HUYEN;//"cok1O2ZxSq6", "lk5CPOZigtj"
                    }
                }
            }
            resolve(orgHirch)
        });
    })
}

function load_period_form(type) {
    var today = new Date();
    var yyyy = today.getFullYear();
    $("#peValue").show();
    console.log(type_reported);
    get_period_dialog();
}

/*Init Report*/
function create_report(string_period) {
    (async () => {
        if ($('#btnReload').toArray().length == 1) $('#header > div > div:nth-child(2)').before(`<input type="button" id="btnReload" value="Chọn lại đơn vị và thời điểm xem dữ liệu" onclick="get_period_dialog()" style="margin: 10px 10px 10px 0px;border-radius: 5px;opacity: 2%;">`)
        var btn = Object.assign({}, ApproveButtonBuilder);

        switch (orgHirch) {
            case LEVEL_ORG_SELECT_TYPE.TINH:
            case LEVEL_ORG_SELECT_TYPE.INDIVIDUAL_TINH:
                sumI = ["jgV9URjpxg6"];
                sumII = ["yqvDZQJVy6M"]
                sumIII = ["OHWM3DxkeMR"]
                sumA = [].concat(sumI, sumII, sumIII)
                sumB1 = ["CWJhX4J23Z0"]
                sumB2 = ["YmgWbPl47ua"]
                sumB = [].concat(sumB1, sumB2);
                sumAll = [].concat(sumA, sumB);
                btn.initButton(btn.BUTTON_TYPE.TYPE_APPROVE, orgUnitSelectedID, ["gp8FpVbQHvU"], periods);
                btn.createButtonWithPosition($("#printing"));
                break;
            case LEVEL_ORG_SELECT_TYPE.HUYEN:
            case LEVEL_ORG_SELECT_TYPE.INDIVIDUAL_HUYEN:
            case LEVEL_ORG_SELECT_TYPE.HUYEN_TTTYT:
                sumI_1_1 = ["cok1O2ZxSq6"]//Bv huyen,pkdk(pyt thiếu)
                sumI_1_2 = ["lk5CPOZigtj", "h72BaPhNC5o"]
                sumI_1_3 = ["JchZd7bGhgr"]//ttyt
                sumII = ["OHWM3DxkeMR"]//xa
                sumI = [].concat(sumI_1_1, sumI_1_2, sumI_1_3)
                sumAll = [].concat(sumI, sumII);
                break;
            default:
                break;
        }
        $("#orgUnits").append(orgUnitSelected.name);
        console.log(type_reported, string_period);
        $("#periods").append(string_period);
        loadReport();
    })()
}

/*---------------------------------------------------MainFunc/*---------------------------------------------------*/

/* Fragment organisationUnit by level */
let sumAll, strTitleTongHuyen, levelHuyen, subHuyen1, subHuyen2, subHuyen3, subHuyen4, subHuyen5, subHuyen6, strTitleTongXa, strTitleTongTuNhan, levelTuNhan, subTuNhan1, subTuNhan2, subTuNhan3, strTitleSubTuNhan1, strTitleSubTuNhan2, strTitleSubTuNhan3, sumB1, sumB2;

let numberColumnCatch = 17;
load = 0

function loadReport() {
    load++;
    switch (orgHirch) {
        case LEVEL_ORG_SELECT_TYPE.TINH:
            if (load == 1) {
                sum(sumAll, "", "TỔNG SỐ", true)
                    .then(() => {
                        loadReport()
                    })
                    .catch((e) => {
                        loadReport()
                    })
            }
            if (load == 2) {
                sum(sumA, "A", "Y tế công", true)
                    .then(() => {
                        loadReport()
                    })
                    .catch((e) => {
                        loadReport()
                    })
            }
            if (load == 3) {
                sum(sumI, "I", "Tuyến tỉnh", true)
                    .then(() => {
                        loadReport()
                    })
                    .catch((e) => {
                        loadReport()
                    })
            }

            if (load == 4) {
                writeRow(sumI, true)
                    .then(() => {
                        loadReport()
                    })
                    .catch((e) => {
                        loadReport()
                    })
            }
            if (load == 5) {
                sum(sumII, "II", "Tuyến huyện", true)
                    .then(() => {
                        loadReport()
                    })
                    .catch((e) => {
                        loadReport()
                    })
            }
            if (load == 6) {
                writeRowByLevelOrgAggregate(sumII, true, 3)
                    .then(() => {
                        loadReport()
                    })
                    .catch((e) => {
                        loadReport()
                    })
            }
            if (load == 7) {
                sum(sumIII, "III", "Tuyến xã", true)
                    .then(() => {
                        loadReport()
                    })
                    .catch((e) => {
                        loadReport()
                    })
            }
            if (load == 8) {
                writeRowByLevelOrgAggregate(sumIII, true, 3)
                    .then(() => {
                        lastLoad()
                    })
                    .catch((e) => {
                        lastLoad()
                    })
            }
            // if (load == 9) {
            //     sum(sumB, "B", "Y tế tư nhân", true)
            //         .then(() => {
            //             loadReport()
            //         })
            //         .catch((e) => {
            //             loadReport()
            //         })
            // }

            // if (load == 10) {
            //     sum(sumB1, "1", "Bệnh viện", true)
            //         .then(() => {
            //             loadReport()
            //         })
            //         .catch((e) => {
            //             loadReport()
            //         })
            // }

            // if (load == 11) {
            //     writeRow(sumB1, true, undefined, "1")
            //         .then(() => {
            //             loadReport()
            //         })
            //         .catch((e) => {
            //             loadReport()
            //         })
            // }

            // if (load == 12) {
            //     sum(sumB2, "2", "Phòng khám", true)
            //         .then(() => {
            //             loadReport()
            //         })
            //         .catch((e) => {
            //             loadReport()
            //         })
            // }

            // if (load == 13) {
            //     writeRow(sumB2, true, undefined, "2")
            //         .then(() => {
            //             lastLoad()
            //         })
            //         .catch((e) => {
            //             lastLoad()
            //         })
            // }
            break;
        case LEVEL_ORG_SELECT_TYPE.HUYEN:
            if (load == 1) {
                sumTb1(sumAll, "", "TỔNG SỐ", true)
                    .then(() => { loadReport() })
                    .catch((e) => { loadReport() })
            }
            if (load == 2) {
                sumTb1(sumI, "I", "Tuyến huyện", true)
                    .then(() => { loadReport() })
                    .catch((e) => { loadReport() })
            }
            if (load == 3) {
                sumTb1(sumI_1_1, "1", "Bệnh viện huyện (>=200GB)", true)
                    .then(() => { loadReport() })
                    .catch((e) => { loadReport() })
            }
            if (load == 4) {
                sumTb1(sumI_1_2, "2", "Phòng khám đa khoa", true)
                    .then(() => { loadReport() })
                    .catch((e) => { loadReport() })
            }
            if (load == 5) {
                sumTb1(sumI_1_3, "3", "TTYT huyện", true)
                    .then(() => { loadReport() })
                    .catch((e) => { loadReport() })
            }
            if (load == 6) {
                sumTb1(sumII, "II", "Tuyến xã", true)
                    .then(() => { loadReport() })
                    .catch((e) => { loadReport() })
            }
            if (load == 7) {
                var btn = Object.assign({}, ApproveButtonBuilder)
                btn.initButton(btn.BUTTON_TYPE.TYPE_APPROVE, orgUnitSelectedID, ["UPKEou47AtY", "hXDlgWg5mSZ", "L6LscRxjezJ"], periods)
                btn.createButtonWithPosition($("#printing"))
                writeRow_huyen(sumII, true)
                    .then(e => { lastLoad(); p2ild.DesignUtil.hidePreload() })
                    .catch((e) => { lastLoad(); p2ild.DesignUtil.hidePreload() })
            }
            break;

        case LEVEL_ORG_SELECT_TYPE.INDIVIDUAL_TINH:
            if (load == 1) {
                sumRow_tdv([], true)
                    .then(e => { lastLoad(); p2ild.DesignUtil.hidePreload() })
                    .catch((e) => { lastLoad(); p2ild.DesignUtil.hidePreload() })
            }
        case LEVEL_ORG_SELECT_TYPE.INDIVIDUAL_HUYEN:
        case LEVEL_ORG_SELECT_TYPE.HUYEN_TTTYT:
            if (load == 1) {
                sumTb1_tdv([], true)
                    .then(e => { lastLoad(); p2ild.DesignUtil.hidePreload() })
                    .catch((e) => { lastLoad(); p2ild.DesignUtil.hidePreload() })
            }
        default:
            break;
    }
    const PHAN_LOAI_TU_CHU = {
        DEFAULT: "AHjo8UIXD3A.HllvX50cXC0",
        KCB: "AHjo8UIXD3A.L8pQx55Qgli",
        YTDP: "AHjo8UIXD3A.E1n8AO47ANx",
        TOTAL: "COUNT_DEFAULT_KCB_YTDP"
    };
    /**
       * return arrResultTuChu
          DEFAULT : default cat
          KCB : kcb cat
          YTDP : ytdp cat
          TOTAL : count all cat above
      */
    function filterTuChu(json, orgID) {
        const jsonHeader = p2ild.dvu.defineHeader(json.headers)
        //default result
        let arrResultTuChu = {};
        arrResultTuChu[PHAN_LOAI_TU_CHU.DEFAULT] = Array(4).fill("")
        arrResultTuChu[PHAN_LOAI_TU_CHU.KCB] = Array(4).fill("")
        arrResultTuChu[PHAN_LOAI_TU_CHU.YTDP] = Array(4).fill("")
        arrResultTuChu[PHAN_LOAI_TU_CHU.TOTAL] = Array(4).fill("")

        let listValidOrg;
        //filter all de valid org param
        listValidOrg = json.rows.filter(x => x[jsonHeader.iOu] == orgID)

        arrColumn = Array(4).fill("")
        listValidOrg.forEach(row => {
            if ([PHAN_LOAI_TU_CHU.DEFAULT
                , PHAN_LOAI_TU_CHU.KCB
                , PHAN_LOAI_TU_CHU.YTDP
                , PHAN_LOAI_TU_CHU.TOTAL
            ].includes(row[jsonHeader.iDe])) {
                arrColumn = Array(4).fill("")
                arrColumn[row[jsonHeader.iValue] - 1] = "1"
                arrResultTuChu[row[jsonHeader.iDe]] = arrColumnSum
            }
        })

        var arrColumnSum = Array(4).fill("")
        arrGroupByPhanLoai = orgID != undefined
            ?
            _.groupBy(json.rows.filter(e =>
                [PHAN_LOAI_TU_CHU.DEFAULT
                    , PHAN_LOAI_TU_CHU.KCB
                    , PHAN_LOAI_TU_CHU.YTDP
                ].includes(e[jsonHeader.iDe]) && orgID == e[jsonHeader.iOu]
            ), jsonHeader.iValue)
            : _.groupBy(json.rows.filter(e =>
                [PHAN_LOAI_TU_CHU.DEFAULT
                    , PHAN_LOAI_TU_CHU.KCB
                    , PHAN_LOAI_TU_CHU.YTDP
                ].includes(e[jsonHeader.iDe])
            ), jsonHeader.iValue)

        Object.keys(arrGroupByPhanLoai).forEach(function (key) {
            arrColumnSum[key - 1] = arrGroupByPhanLoai[key].length
        });


        arrResultTuChu[PHAN_LOAI_TU_CHU.TOTAL] = arrColumnSum


        // hardCode
        arrResultTuChu[PHAN_LOAI_TU_CHU.DEFAULT] = ["", "", "", ""]
        arrResultTuChu[PHAN_LOAI_TU_CHU.KCB] = ["", "", "", ""]
        arrResultTuChu[PHAN_LOAI_TU_CHU.YTDP] = ["", "", "", ""]
        arrResultTuChu[PHAN_LOAI_TU_CHU.TOTAL] = ["", "", "", ""]
        return arrResultTuChu
    }
    function sumTb1_tdv(idGroups, title, isGroup) {
        let htmlReport1 = "";
        let htmlReport2 = "";
        seri = 1;

        const des = "rjWwV8cqhAZ;JPyFARPu7zV;LL7qpUiC3hZ;OQBOipGcNOK;dbThC9ZIqvB;DXgyPsmNqyK;Ff7B08GIU5z;HcKlezEKswk;n2yWJTs36lZ;YwZDwgKpNoD;AXPRYRVmtKV;rO33E6B0ZWO;yfdj9NBMWHW;hDGQf04ot5x;itAHBgwcw7w;wNLX1JVg5aB;gSMOBV405ZL;a99Sg2Rye5x;Ff7B08GIU5z.L8pQx55Qgli;HcKlezEKswk.L8pQx55Qgli;n2yWJTs36lZ.L8pQx55Qgli;YwZDwgKpNoD.L8pQx55Qgli;AXPRYRVmtKV.L8pQx55Qgli;hDGQf04ot5x.L8pQx55Qgli;itAHBgwcw7w.L8pQx55Qgli;wNLX1JVg5aB.L8pQx55Qgli;gSMOBV405ZL.L8pQx55Qgli;a99Sg2Rye5x.L8pQx55Qgli;Ff7B08GIU5z.E1n8AO47ANx;HcKlezEKswk.E1n8AO47ANx;n2yWJTs36lZ.E1n8AO47ANx;YwZDwgKpNoD.E1n8AO47ANx;AXPRYRVmtKV.E1n8AO47ANx;Unq2JxoZ08H;hDGQf04ot5x.E1n8AO47ANx;itAHBgwcw7w.E1n8AO47ANx;wNLX1JVg5aB.E1n8AO47ANx;gSMOBV405ZL.E1n8AO47ANx;a99Sg2Rye5x.E1n8AO47ANx;oYEG52Q9lF9;qt7P3z8zfHr;iE3PisJv4UD;heFbKPFOAYX;VUujYXiLcQo;RrIm3S7jizc;teZ9uzWsdC8;IAEwNuqpwJ6;RyVb0zCOSm5;glJjiwPA4nz;i4GretwfRCc;itvyP8whBc4;PJ3NRljqpdC;ak98gs8nPyq;LbJkh0Bhfdj;JHh30oApLHO;q8Vt5iqopMh;gzQmDaPEAOt;bX0BZBY87ey;eT2Ghp7Dhhj;heFbKPFOAYX.L8pQx55Qgli;VUujYXiLcQo.L8pQx55Qgli;RrIm3S7jizc.L8pQx55Qgli;teZ9uzWsdC8.L8pQx55Qgli;IAEwNuqpwJ6.L8pQx55Qgli;RyVb0zCOSm5.L8pQx55Qgli;glJjiwPA4nz.L8pQx55Qgli;i4GretwfRCc.L8pQx55Qgli;LbJkh0Bhfdj.L8pQx55Qgli;JHh30oApLHO.L8pQx55Qgli;q8Vt5iqopMh.L8pQx55Qgli;gzQmDaPEAOt.L8pQx55Qgli;bX0BZBY87ey.L8pQx55Qgli;eT2Ghp7Dhhj.L8pQx55Qgli;heFbKPFOAYX.E1n8AO47ANx;VUujYXiLcQo.E1n8AO47ANx;RrIm3S7jizc.E1n8AO47ANx;teZ9uzWsdC8.E1n8AO47ANx;IAEwNuqpwJ6.E1n8AO47ANx;RyVb0zCOSm5.E1n8AO47ANx;glJjiwPA4nz.E1n8AO47ANx;i4GretwfRCc.E1n8AO47ANx;LbJkh0Bhfdj.E1n8AO47ANx;JHh30oApLHO.E1n8AO47ANx;q8Vt5iqopMh.E1n8AO47ANx;gzQmDaPEAOt.E1n8AO47ANx;bX0BZBY87ey.E1n8AO47ANx;eT2Ghp7Dhhj.E1n8AO47ANx"
        return new Promise((resolve, reject) => {
            $.get("../api/analytics.json?dimension=dx:" + des + "&dimension=ou:" + p2ild.ou.stringGroups(idGroups, orgUnitSelectedID) + "&filter=pe:" + periods + "&skipRounding=true", function (json) {
                //---------------------------------- TB1 ----------------------------------
                //default sumRow
                htmlReport1 += "<tr><td align='center'>" + seri + "</td>";
                htmlReport1 += "<td>" + json.metaData.items[orgUnitSelectedID].name + "</td>";
                htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, []) + "</strong></td>";//3
                htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, []) + "</strong></td>";//4
                htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, []) + "</strong></td>";//5
                htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, []) + "</strong></td>";//6

                if (orgHirch == LEVEL_ORG_SELECT_TYPE.HUYEN_TTTYT) {
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, [
                        "rjWwV8cqhAZ",
                        "LL7qpUiC3hZ",

                    ]) + "</strong></td>";//7
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, [
                        "OQBOipGcNOK",
                        "DXgyPsmNqyK",

                    ]) + "</strong></td>";//8

                } else {
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, [
                        "rjWwV8cqhAZ",
                        "LL7qpUiC3hZ",
                        "JPyFARPu7zV"// Chỉ dùng cho phòng khám và bệnh viện
                    ]) + "</strong></td>";//7
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, [
                        "OQBOipGcNOK",
                        "DXgyPsmNqyK",
                        "dbThC9ZIqvB"
                    ]) + "</strong></td>";//8

                }
                // if (sumI_1_3 == idGroups || sumII == idGroups) {
                //     htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["rjWwV8cqhAZ", "LL7qpUiC3hZ"]) + "</strong></td>";//7
                //     htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["OQBOipGcNOK", "DXgyPsmNqyK"]) + "</strong></td>";//8
                // } else {
                //     htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["JPyFARPu7zV"]) + "</strong></td>";//7
                //     htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["dbThC9ZIqvB"]) + "</strong></td>";//8
                // }

                htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["Ff7B08GIU5z"]) + "</strong></td>";//9
                htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["HcKlezEKswk"]) + "</strong></td>";//10
                htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["n2yWJTs36lZ"]) + "</strong></td>";//11
                htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["YwZDwgKpNoD"]) + "</strong></td>";//12
                htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["AXPRYRVmtKV"]) + "</strong></td>";//13


                htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["rO33E6B0ZWO", "Unq2JxoZ08H", "yfdj9NBMWHW"]) + "</strong></td>";//14
                // if (sumI_1_3 == idGroups || sumII == idGroups) {
                //     htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["rO33E6B0ZWO", "Unq2JxoZ08H"]) + "</strong></td>";//14
                // } else {
                //     htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["yfdj9NBMWHW"]) + "</strong></td>";//8
                // }
                htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["hDGQf04ot5x"]) + "</strong></td>";//15
                htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["itAHBgwcw7w"]) + "</strong></td>";//16
                htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["wNLX1JVg5aB"]) + "</strong></td>";//17
                htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["gSMOBV405ZL"]) + "</strong></td>";//18
                htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["a99Sg2Rye5x"]) + "</strong></td>";//19

                //2SubRow sum (KCB + YTCC)
                if (orgUnitSelectedGroupID.find(x => x.id == sumI_1_3[0])) {
                    htmlReport1 += "</tr><tr><td align='center'>" + seri + ".2.1</td>";
                    htmlReport1 += "<td align='center'>Hoạt động khám chữa bệnh</td>"; //2
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, []) + "</strong></td>";//3
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, []) + "</strong></td>";//4
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, []) + "</strong></td>";//5
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, []) + "</strong></td>";//6
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["rjWwV8cqhAZ"]) + "</strong></td>";//4
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["OQBOipGcNOK"]) + "</strong></td>";//5
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["Ff7B08GIU5z.L8pQx55Qgli"]) + "</strong></td>";//6
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["HcKlezEKswk.L8pQx55Qgli"]) + "</strong></td>";//3
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["n2yWJTs36lZ.L8pQx55Qgli"]) + "</strong></td>";//4
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["YwZDwgKpNoD.L8pQx55Qgli"]) + "</strong></td>";//5
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["AXPRYRVmtKV.L8pQx55Qgli"]) + "</strong></td>";//6
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["rO33E6B0ZWO"]) + "</strong></td>";//3
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["hDGQf04ot5x.L8pQx55Qgli"]) + "</strong></td>";//4
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["itAHBgwcw7w.L8pQx55Qgli"]) + "</strong></td>";//5
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["wNLX1JVg5aB.L8pQx55Qgli"]) + "</strong></td>";//6
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["gSMOBV405ZL.L8pQx55Qgli"]) + "</strong></td>";//3
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["a99Sg2Rye5x.L8pQx55Qgli"]) + "</strong></td>";//4
                    htmlReport1 += "</tr>";
                    htmlReport1 += "</tr><tr><td align='center'>" + seri + ".2.2</td>";
                    htmlReport1 += "<td align='center'>Hoạt động Y tế dự phòng, YTCC</td>"; //2
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, []) + "</strong></td>";//3
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, []) + "</strong></td>";//4
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, []) + "</strong></td>";//5
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, []) + "</strong></td>";//6
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["LL7qpUiC3hZ"]) + "</strong></td>";//4
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["DXgyPsmNqyK"]) + "</strong></td>";//5
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["Ff7B08GIU5z.E1n8AO47ANx"]) + "</strong></td>";//6
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["HcKlezEKswk.E1n8AO47ANx"]) + "</strong></td>";//3
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["n2yWJTs36lZ.E1n8AO47ANx"]) + "</strong></td>";//4
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["YwZDwgKpNoD.E1n8AO47ANx"]) + "</strong></td>";//5
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["AXPRYRVmtKV.E1n8AO47ANx"]) + "</strong></td>";//6
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["Unq2JxoZ08H"]) + "</strong></td>";//3
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["hDGQf04ot5x.E1n8AO47ANx"]) + "</strong></td>";//4
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["itAHBgwcw7w.E1n8AO47ANx"]) + "</strong></td>";//5
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["wNLX1JVg5aB.E1n8AO47ANx"]) + "</strong></td>";//6
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["gSMOBV405ZL.E1n8AO47ANx"]) + "</strong></td>";//3
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["a99Sg2Rye5x.E1n8AO47ANx"]) + "</strong></td>";//4
                }
                htmlReport1 += "</tr>";
                //---------------------------------- TB2 ----------------------------------
                htmlReport2 += "<tr><td align='center'>" + seri + "</td>";
                htmlReport2 += "<td>" + json.metaData.items[orgUnitSelectedID].name + "</td>";
                if (orgUnitSelectedGroupID.find(x => x.id == sumI_1_3[0]) || orgUnitSelectedGroupID.find(x => x.id == sumII[0])) {
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["qt7P3z8zfHr", "iE3PisJv4UD"]) + "</strong></td>";//3
                } else {
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["oYEG52Q9lF9"]) + "</strong></td>";//3
                }
                htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["heFbKPFOAYX"]) + "</strong></td>";//4
                htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["VUujYXiLcQo"]) + "</strong></td>";//5
                htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["RrIm3S7jizc"]) + "</strong></td>";//7
                htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["teZ9uzWsdC8"]) + "</strong></td>";//8
                htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["IAEwNuqpwJ6"]) + "</strong></td>";//9
                htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["RyVb0zCOSm5"]) + "</strong></td>";//10
                htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["glJjiwPA4nz"]) + "</strong></td>";//11
                htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["i4GretwfRCc"]) + "</strong></td>";//12

                if (
                    orgUnitSelectedGroupID.find(x => x.id == sumI_1_3[0])
                    || orgUnitSelectedGroupID.find(x => x.id == sumII[0])
                ) {
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["PJ3NRljqpdC", "ak98gs8nPyq"]) + "</strong></td>";//3
                } else {
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["itvyP8whBc4"]) + "</strong></td>";//3
                }
                htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["LbJkh0Bhfdj"]) + "</strong></td>";//14
                htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["JHh30oApLHO"]) + "</strong></td>";//15
                htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["q8Vt5iqopMh"]) + "</strong></td>";//16
                htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["gzQmDaPEAOt"]) + "</strong></td>";//17
                htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["bX0BZBY87ey"]) + "</strong></td>";//18
                htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["eT2Ghp7Dhhj"]) + "</strong></td>";//19

                if (orgUnitSelectedGroupID.find(x => x.id == sumI_1_3[0])) {
                    htmlReport2 += "</tr><tr><td align='center'>" + seri + ".2.1</td>";
                    htmlReport2 += "<td align='center'>Hoạt động khám chữa bệnh</td>"; //2
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["qt7P3z8zfHr"]) + "</strong></td>";//3
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["heFbKPFOAYX.L8pQx55Qgli"]) + "</strong></td>";//4
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["VUujYXiLcQo.L8pQx55Qgli"]) + "</strong></td>";//5
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["RrIm3S7jizc.L8pQx55Qgli"]) + "</strong></td>";//4
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["teZ9uzWsdC8.L8pQx55Qgli"]) + "</strong></td>";//5
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["IAEwNuqpwJ6.L8pQx55Qgli"]) + "</strong></td>";//6
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["RyVb0zCOSm5.L8pQx55Qgli"]) + "</strong></td>";//3
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["glJjiwPA4nz.L8pQx55Qgli"]) + "</strong></td>";//4
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["i4GretwfRCc.L8pQx55Qgli"]) + "</strong></td>";//5
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["PJ3NRljqpdC"]) + "</strong></td>";//6
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["LbJkh0Bhfdj.L8pQx55Qgli"]) + "</strong></td>";//3
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["JHh30oApLHO.L8pQx55Qgli"]) + "</strong></td>";//4
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["q8Vt5iqopMh.L8pQx55Qgli"]) + "</strong></td>";//5
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["gzQmDaPEAOt.L8pQx55Qgli"]) + "</strong></td>";//6
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["bX0BZBY87ey.L8pQx55Qgli"]) + "</strong></td>";//3
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["eT2Ghp7Dhhj.L8pQx55Qgli"]) + "</strong></td>";//4
                    htmlReport2 += "</tr>";
                    htmlReport2 += "</tr><tr><td align='center'>" + seri + ".2.2</td>";
                    htmlReport2 += "<td align='center'>Hoạt động Y tế dự phòng, YTCC</td>"; //2
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["iE3PisJv4UD"]) + "</strong></td>";//3
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["heFbKPFOAYX.E1n8AO47ANx"]) + "</strong></td>";//5
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["VUujYXiLcQo.E1n8AO47ANx"]) + "</strong></td>";//6
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["RrIm3S7jizc.E1n8AO47ANx"]) + "</strong></td>";//4
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["teZ9uzWsdC8.E1n8AO47ANx"]) + "</strong></td>";//5
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["IAEwNuqpwJ6.E1n8AO47ANx"]) + "</strong></td>";//6
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["RyVb0zCOSm5.E1n8AO47ANx"]) + "</strong></td>";//3
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["glJjiwPA4nz.E1n8AO47ANx"]) + "</strong></td>";//4
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["i4GretwfRCc.E1n8AO47ANx"]) + "</strong></td>";//5
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["ak98gs8nPyq"]) + "</strong></td>";//6
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["LbJkh0Bhfdj.E1n8AO47ANx"]) + "</strong></td>";//3
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["JHh30oApLHO.E1n8AO47ANx"]) + "</strong></td>";//4
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["q8Vt5iqopMh.E1n8AO47ANx"]) + "</strong></td>";//5
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["gzQmDaPEAOt.E1n8AO47ANx"]) + "</strong></td>";//6
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["bX0BZBY87ey.E1n8AO47ANx"]) + "</strong></td>";//3
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["eT2Ghp7Dhhj.E1n8AO47ANx"]) + "</strong></td>";//4
                }
                htmlReport2 += "</tr>";
                $("#formreport #mainTable1").append(htmlReport1);
                $("#formreport #mainTable2").append(htmlReport2);

                //---------------------------------- TB1 ----------------------------------

                resolve();
            }).catch(e => {
                for (let m = 0; m < numberColumnCatch; m++) {
                    htmlReport1 += "<td align='center'>0</td>";//21
                    if (m < numberColumnCatch - 1)
                        htmlReport2 += "<td align='center'>0</td>";//21

                }
                htmlReport1 += "</tr>";
                htmlReport2 += "</tr>";
                $("#formreport #mainTable1").append(htmlReport1);
                $("#formreport #mainTable2").append(htmlReport2);
                reject(e);
            });
        })
    }

    function sumRow_tdv(idGroups, seri, title, isGroup) {
        let htmlReport1 = "";
        let htmlReport2 = "";
        stt = 0;

        htmlReport1 += "<tr><td align='center'><strong></strong></td>"; //1
        htmlReport2 += "<tr><td align='center'><strong></strong></td>"; //1
        const des = "uMmm9GZneMR.AMARAl67O0W;uMmm9GZneMR.je3ZoC0J1J2;uMmm9GZneMR.W3J7OtuzmSr;uMmm9GZneMR.Ky9vKtpkbsi;rjWwV8cqhAZ;JPyFARPu7zV;LL7qpUiC3hZ;OQBOipGcNOK;dbThC9ZIqvB;DXgyPsmNqyK;Ff7B08GIU5z;HcKlezEKswk;n2yWJTs36lZ;YwZDwgKpNoD;AXPRYRVmtKV;rO33E6B0ZWO;yfdj9NBMWHW;hDGQf04ot5x;itAHBgwcw7w;wNLX1JVg5aB;gSMOBV405ZL;a99Sg2Rye5x;Ff7B08GIU5z.L8pQx55Qgli;HcKlezEKswk.L8pQx55Qgli;n2yWJTs36lZ.L8pQx55Qgli;YwZDwgKpNoD.L8pQx55Qgli;AXPRYRVmtKV.L8pQx55Qgli;hDGQf04ot5x.L8pQx55Qgli;itAHBgwcw7w.L8pQx55Qgli;wNLX1JVg5aB.L8pQx55Qgli;gSMOBV405ZL.L8pQx55Qgli;a99Sg2Rye5x.L8pQx55Qgli;Ff7B08GIU5z.E1n8AO47ANx;HcKlezEKswk.E1n8AO47ANx;n2yWJTs36lZ.E1n8AO47ANx;YwZDwgKpNoD.E1n8AO47ANx;AXPRYRVmtKV.E1n8AO47ANx;Unq2JxoZ08H;hDGQf04ot5x.E1n8AO47ANx;itAHBgwcw7w.E1n8AO47ANx;wNLX1JVg5aB.E1n8AO47ANx;gSMOBV405ZL.E1n8AO47ANx;a99Sg2Rye5x.E1n8AO47ANx;oYEG52Q9lF9;qt7P3z8zfHr;iE3PisJv4UD;heFbKPFOAYX;VUujYXiLcQo;RrIm3S7jizc;teZ9uzWsdC8;IAEwNuqpwJ6;RyVb0zCOSm5;glJjiwPA4nz;i4GretwfRCc;itvyP8whBc4;PJ3NRljqpdC;ak98gs8nPyq;LbJkh0Bhfdj;JHh30oApLHO;q8Vt5iqopMh;gzQmDaPEAOt;bX0BZBY87ey;eT2Ghp7Dhhj;heFbKPFOAYX.L8pQx55Qgli;VUujYXiLcQo.L8pQx55Qgli;RrIm3S7jizc.L8pQx55Qgli;teZ9uzWsdC8.L8pQx55Qgli;IAEwNuqpwJ6.L8pQx55Qgli;RyVb0zCOSm5.L8pQx55Qgli;glJjiwPA4nz.L8pQx55Qgli;i4GretwfRCc.L8pQx55Qgli;LbJkh0Bhfdj.L8pQx55Qgli;JHh30oApLHO.L8pQx55Qgli;q8Vt5iqopMh.L8pQx55Qgli;gzQmDaPEAOt.L8pQx55Qgli;bX0BZBY87ey.L8pQx55Qgli;eT2Ghp7Dhhj.L8pQx55Qgli;heFbKPFOAYX.E1n8AO47ANx;VUujYXiLcQo.E1n8AO47ANx;RrIm3S7jizc.E1n8AO47ANx;teZ9uzWsdC8.E1n8AO47ANx;IAEwNuqpwJ6.E1n8AO47ANx;RyVb0zCOSm5.E1n8AO47ANx;glJjiwPA4nz.E1n8AO47ANx;i4GretwfRCc.E1n8AO47ANx;LbJkh0Bhfdj.E1n8AO47ANx;JHh30oApLHO.E1n8AO47ANx;q8Vt5iqopMh.E1n8AO47ANx;gzQmDaPEAOt.E1n8AO47ANx;bX0BZBY87ey.E1n8AO47ANx;eT2Ghp7Dhhj.E1n8AO47ANx"
        return new Promise((resolve, reject) => {
            $.get("../api/analytics.json?dimension=dx:" + des + "&dimension=ou:" + p2ild.ou.stringGroups(idGroups, orgUnitSelectedID) + "&filter=pe:" + periods + "&skipRounding=true", function (json) {
                //---------------------------------- TB1 ----------------------------------
                //default sumRow
                htmlReport1 += "<td align='center'><strong>" + json.metaData.items[orgUnitSelectedID].name + "</strong></td>"; //2
                htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["uMmm9GZneMR.AMARAl67O0W"]) + "</strong></td>";//3
                htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["uMmm9GZneMR.je3ZoC0J1J2"]) + "</strong></td>";//4
                htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["uMmm9GZneMR.W3J7OtuzmSr"]) + "</strong></td>";//5
                htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["uMmm9GZneMR.Ky9vKtpkbsi"]) + "</strong></td>";//6

                htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["JPyFARPu7zV"]) + "</strong></td>";//7
                htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["dbThC9ZIqvB"]) + "</strong></td>";//8

                htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["Ff7B08GIU5z"]) + "</strong></td>";//9
                htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["HcKlezEKswk"]) + "</strong></td>";//10
                htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["n2yWJTs36lZ"]) + "</strong></td>";//11
                htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["YwZDwgKpNoD"]) + "</strong></td>";//12
                htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["AXPRYRVmtKV"]) + "</strong></td>";//13

                htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["yfdj9NBMWHW"]) + "</strong></td>";//8
                htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["hDGQf04ot5x"]) + "</strong></td>";//15
                htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["itAHBgwcw7w"]) + "</strong></td>";//16
                htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["wNLX1JVg5aB"]) + "</strong></td>";//17
                htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["gSMOBV405ZL"]) + "</strong></td>";//18
                htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["a99Sg2Rye5x"]) + "</strong></td>";//19

                htmlReport1 += "</tr>";


                //---------------------------------- TB2 ----------------------------------
                htmlReport2 += "<td align='center'><strong>" + json.metaData.items[orgUnitSelectedID].name + "</strong></td>"; //2
                htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["oYEG52Q9lF9"]) + "</strong></td>";//3
                htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["heFbKPFOAYX"]) + "</strong></td>";//4
                htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["VUujYXiLcQo"]) + "</strong></td>";//5
                htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["RrIm3S7jizc"]) + "</strong></td>";//7
                htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["teZ9uzWsdC8"]) + "</strong></td>";//8
                htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["IAEwNuqpwJ6"]) + "</strong></td>";//9
                htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["RyVb0zCOSm5"]) + "</strong></td>";//10
                htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["glJjiwPA4nz"]) + "</strong></td>";//11
                htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["i4GretwfRCc"]) + "</strong></td>";//12
                htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["itvyP8whBc4"]) + "</strong></td>";//3
                htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["LbJkh0Bhfdj"]) + "</strong></td>";//14
                htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["JHh30oApLHO"]) + "</strong></td>";//15
                htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["q8Vt5iqopMh"]) + "</strong></td>";//16
                htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["gzQmDaPEAOt"]) + "</strong></td>";//17
                htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["bX0BZBY87ey"]) + "</strong></td>";//18
                htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["eT2Ghp7Dhhj"]) + "</strong></td>";//19

                htmlReport2 += "</tr>";
                $("#formreport #mainTable1").append(htmlReport1);
                $("#formreport #mainTable2").append(htmlReport2);

                //---------------------------------- TB1 ----------------------------------

                resolve();
            }).catch(e => {
                for (let m = 0; m < numberColumnCatch; m++) {
                    htmlReport1 += "<td align='center'>0</td>";//21
                    if (m < numberColumnCatch - 1)
                        htmlReport2 += "<td align='center'>0</td>";//21

                }
                htmlReport1 += "</tr>";
                htmlReport2 += "</tr>";
                $("#formreport #mainTable1").append(htmlReport1);
                $("#formreport #mainTable2").append(htmlReport2);
                reject(e);
            });
        })
    }

    function sumTb1(idGroups, seri, title, isGroup) {
        let htmlReport1 = "";
        let htmlReport2 = "";
        stt = 0;

        htmlReport1 += "<tr><td align='center'><strong>" + seri + "</strong></td>"; //1
        htmlReport2 += "<tr><td align='center'><strong>" + seri + "</strong></td>"; //1
        if (title == "TỔNG SỐ") {
            htmlReport1 += "<td align='center'><strong>" + title + "</strong></td>"; //2
            htmlReport2 += "<td align='center'><strong>" + title + "</strong></td>"; //2
        } else {
            htmlReport1 += "<td align='left'><strong>" + title + "</strong></td>"; //2}
            htmlReport2 += "<td align='left'><strong>" + title + "</strong></td>"; //2}
        }
        const des = "uMmm9GZneMR.AMARAl67O0W;uMmm9GZneMR.je3ZoC0J1J2;uMmm9GZneMR.W3J7OtuzmSr;uMmm9GZneMR.Ky9vKtpkbsi;AHjo8UIXD3A.HllvX50cXC0;AHjo8UIXD3A.L8pQx55Qgli;AHjo8UIXD3A.E1n8AO47ANx;rjWwV8cqhAZ;JPyFARPu7zV;LL7qpUiC3hZ;OQBOipGcNOK;dbThC9ZIqvB;DXgyPsmNqyK;Ff7B08GIU5z;HcKlezEKswk;n2yWJTs36lZ;YwZDwgKpNoD;AXPRYRVmtKV;rO33E6B0ZWO;yfdj9NBMWHW;hDGQf04ot5x;itAHBgwcw7w;wNLX1JVg5aB;gSMOBV405ZL;a99Sg2Rye5x;Ff7B08GIU5z.L8pQx55Qgli;HcKlezEKswk.L8pQx55Qgli;n2yWJTs36lZ.L8pQx55Qgli;YwZDwgKpNoD.L8pQx55Qgli;AXPRYRVmtKV.L8pQx55Qgli;hDGQf04ot5x.L8pQx55Qgli;itAHBgwcw7w.L8pQx55Qgli;wNLX1JVg5aB.L8pQx55Qgli;gSMOBV405ZL.L8pQx55Qgli;a99Sg2Rye5x.L8pQx55Qgli;Ff7B08GIU5z.E1n8AO47ANx;HcKlezEKswk.E1n8AO47ANx;n2yWJTs36lZ.E1n8AO47ANx;YwZDwgKpNoD.E1n8AO47ANx;AXPRYRVmtKV.E1n8AO47ANx;Unq2JxoZ08H;hDGQf04ot5x.E1n8AO47ANx;itAHBgwcw7w.E1n8AO47ANx;wNLX1JVg5aB.E1n8AO47ANx;gSMOBV405ZL.E1n8AO47ANx;a99Sg2Rye5x.E1n8AO47ANx;oYEG52Q9lF9;qt7P3z8zfHr;iE3PisJv4UD;heFbKPFOAYX;VUujYXiLcQo;RrIm3S7jizc;teZ9uzWsdC8;IAEwNuqpwJ6;RyVb0zCOSm5;glJjiwPA4nz;i4GretwfRCc;itvyP8whBc4;PJ3NRljqpdC;ak98gs8nPyq;LbJkh0Bhfdj;JHh30oApLHO;q8Vt5iqopMh;gzQmDaPEAOt;bX0BZBY87ey;eT2Ghp7Dhhj;heFbKPFOAYX.L8pQx55Qgli;VUujYXiLcQo.L8pQx55Qgli;RrIm3S7jizc.L8pQx55Qgli;teZ9uzWsdC8.L8pQx55Qgli;IAEwNuqpwJ6.L8pQx55Qgli;RyVb0zCOSm5.L8pQx55Qgli;glJjiwPA4nz.L8pQx55Qgli;i4GretwfRCc.L8pQx55Qgli;LbJkh0Bhfdj.L8pQx55Qgli;JHh30oApLHO.L8pQx55Qgli;q8Vt5iqopMh.L8pQx55Qgli;gzQmDaPEAOt.L8pQx55Qgli;bX0BZBY87ey.L8pQx55Qgli;eT2Ghp7Dhhj.L8pQx55Qgli;heFbKPFOAYX.E1n8AO47ANx;VUujYXiLcQo.E1n8AO47ANx;RrIm3S7jizc.E1n8AO47ANx;teZ9uzWsdC8.E1n8AO47ANx;IAEwNuqpwJ6.E1n8AO47ANx;RyVb0zCOSm5.E1n8AO47ANx;glJjiwPA4nz.E1n8AO47ANx;i4GretwfRCc.E1n8AO47ANx;LbJkh0Bhfdj.E1n8AO47ANx;JHh30oApLHO.E1n8AO47ANx;q8Vt5iqopMh.E1n8AO47ANx;gzQmDaPEAOt.E1n8AO47ANx;bX0BZBY87ey.E1n8AO47ANx;eT2Ghp7Dhhj.E1n8AO47ANx"
        return new Promise((resolve, reject) => {
            $.get("../api/analytics.json?dimension=dx:" + des + "&dimension=ou:" + p2ild.ou.stringGroups(idGroups, orgUnitSelectedID) + "&filter=pe:" + periods + "&skipRounding=true", function (json) {
                p2ild.ou.filterCloseOrgUnit(json.metaData.dimensions.ou, periods).then(orgWithoutClosed => {
                    //filter row without org closed 
                    var headers = p2ild.dvu.defineHeader(json.headers)
                    json.rows = json.rows.filter(eRow => { return orgWithoutClosed.some(org => org == eRow[headers.iOu]) })

                    //---------------------------------- TB1 ----------------------------------
                    //default sumRow
                    //Phân loại tự chủ
                    const arrTuChu = filterTuChu(json, orgUnitSelectedID)
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["uMmm9GZneMR.AMARAl67O0W"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//3
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["uMmm9GZneMR.je3ZoC0J1J2"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//4
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["uMmm9GZneMR.W3J7OtuzmSr"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//5
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["uMmm9GZneMR.Ky9vKtpkbsi"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//6

                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["JPyFARPu7zV"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//7
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["dbThC9ZIqvB"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//8
                    // if (sumI_1_3 == idGroups || sumII == idGroups) {
                    //     htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["rjWwV8cqhAZ", "LL7qpUiC3hZ"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//7
                    //     htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["OQBOipGcNOK", "DXgyPsmNqyK"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//8
                    // } else {
                    //     htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["JPyFARPu7zV"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//7
                    //     htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["dbThC9ZIqvB"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//8
                    // }

                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["Ff7B08GIU5z"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//9
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["HcKlezEKswk"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//10
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["n2yWJTs36lZ"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//11
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["YwZDwgKpNoD"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//12
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["AXPRYRVmtKV"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//13


                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["yfdj9NBMWHW"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//14
                    // if (sumI_1_3 == idGroups || sumII == idGroups) {
                    //     htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["rO33E6B0ZWO", "Unq2JxoZ08H"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//14
                    // } else {
                    //     htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["yfdj9NBMWHW"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//8
                    // }
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["hDGQf04ot5x"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//15
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["itAHBgwcw7w"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//16
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["wNLX1JVg5aB"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//17
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["gSMOBV405ZL"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//18
                    htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["a99Sg2Rye5x"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//19

                    //2SubRow sum (KCB + YTCC)
                    if (sumI_1_3 == idGroups) {
                        htmlReport1 += "</tr><tr><td align='center'>" + seri + ".2.1</td>";
                        htmlReport1 += "<td align='center'>Hoạt động khám chữa bệnh</td>"; //2
                        htmlReport1 += "<td align='center'><strong>" + filterTuChu(json)[PHAN_LOAI_TU_CHU.TOTAL][0] + "</strong></td>";//3
                        htmlReport1 += "<td align='center'><strong>" + filterTuChu(json)[PHAN_LOAI_TU_CHU.TOTAL][1] + "</strong></td>";//4
                        htmlReport1 += "<td align='center'><strong>" + filterTuChu(json)[PHAN_LOAI_TU_CHU.TOTAL][2] + "</strong></td>";//5
                        htmlReport1 += "<td align='center'><strong>" + filterTuChu(json)[PHAN_LOAI_TU_CHU.TOTAL][3] + "</strong></td>";//6
                        htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["rjWwV8cqhAZ"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//4
                        htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["OQBOipGcNOK"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//5
                        htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["Ff7B08GIU5z.L8pQx55Qgli"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//6
                        htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["HcKlezEKswk.L8pQx55Qgli"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//3
                        htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["n2yWJTs36lZ.L8pQx55Qgli"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//4
                        htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["YwZDwgKpNoD.L8pQx55Qgli"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//5
                        htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["AXPRYRVmtKV.L8pQx55Qgli"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//6
                        htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["rO33E6B0ZWO"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//3
                        htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["hDGQf04ot5x.L8pQx55Qgli"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//4
                        htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["itAHBgwcw7w.L8pQx55Qgli"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//5
                        htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["wNLX1JVg5aB.L8pQx55Qgli"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//6
                        htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["gSMOBV405ZL.L8pQx55Qgli"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//3
                        htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["a99Sg2Rye5x.L8pQx55Qgli"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//4
                        htmlReport1 += "</tr>";
                        htmlReport1 += "</tr><tr><td align='center'>" + seri + ".2.2</td>";
                        htmlReport1 += "<td align='center'>Hoạt động Y tế dự phòng, YTCC</td>"; //2
                        htmlReport1 += "<td align='center'><strong>" + filterTuChu(json)[PHAN_LOAI_TU_CHU.TOTAL][0] + "</strong></td>";//3
                        htmlReport1 += "<td align='center'><strong>" + filterTuChu(json)[PHAN_LOAI_TU_CHU.TOTAL][1] + "</strong></td>";//4
                        htmlReport1 += "<td align='center'><strong>" + filterTuChu(json)[PHAN_LOAI_TU_CHU.TOTAL][2] + "</strong></td>";//5
                        htmlReport1 += "<td align='center'><strong>" + filterTuChu(json)[PHAN_LOAI_TU_CHU.TOTAL][3] + "</strong></td>";//6
                        htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["LL7qpUiC3hZ"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//4
                        htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["DXgyPsmNqyK"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//5
                        htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["Ff7B08GIU5z.E1n8AO47ANx"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//6
                        htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["HcKlezEKswk.E1n8AO47ANx"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//3
                        htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["n2yWJTs36lZ.E1n8AO47ANx"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//4
                        htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["YwZDwgKpNoD.E1n8AO47ANx"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//5
                        htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["AXPRYRVmtKV.E1n8AO47ANx"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//6
                        htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["Unq2JxoZ08H"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//3
                        htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["hDGQf04ot5x.E1n8AO47ANx"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//4
                        htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["itAHBgwcw7w.E1n8AO47ANx"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//5
                        htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["wNLX1JVg5aB.E1n8AO47ANx"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//6
                        htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["gSMOBV405ZL.E1n8AO47ANx"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//3
                        htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["a99Sg2Rye5x.E1n8AO47ANx"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//4
                    }
                    htmlReport1 += "</tr>";
                    //---------------------------------- TB2 ----------------------------------
                    if (sumI_1_3 == idGroups || sumII == idGroups) {
                        htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["qt7P3z8zfHr", "iE3PisJv4UD"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//3
                    } else {
                        htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["oYEG52Q9lF9"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//3
                    }
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["heFbKPFOAYX"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//4
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["VUujYXiLcQo"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//5
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["RrIm3S7jizc"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//7
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["teZ9uzWsdC8"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//8
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["IAEwNuqpwJ6"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//9
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["RyVb0zCOSm5"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//10
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["glJjiwPA4nz"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//11
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["i4GretwfRCc"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//12
                    if (sumI_1_3 == idGroups || sumII == idGroups) {
                        htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["PJ3NRljqpdC", "ak98gs8nPyq"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//3
                    } else {
                        htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["itvyP8whBc4"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//3
                    }
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["LbJkh0Bhfdj"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//14
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["JHh30oApLHO"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//15
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["q8Vt5iqopMh"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//16
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["gzQmDaPEAOt"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//17
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["bX0BZBY87ey"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//18
                    htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["eT2Ghp7Dhhj"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//19
                    if (idGroups == sumI_1_3) {
                        htmlReport2 += "</tr><tr><td align='center'>" + seri + ".2.1</td>";
                        htmlReport2 += "<td align='center'>Hoạt động khám chữa bệnh</td>"; //2
                        htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["qt7P3z8zfHr"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//3
                        htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["heFbKPFOAYX.L8pQx55Qgli"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//4
                        htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["VUujYXiLcQo.L8pQx55Qgli"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//5
                        htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["RrIm3S7jizc.L8pQx55Qgli"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//4
                        htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["teZ9uzWsdC8.L8pQx55Qgli"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//5
                        htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["IAEwNuqpwJ6.L8pQx55Qgli"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//6
                        htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["RyVb0zCOSm5.L8pQx55Qgli"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//3
                        htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["glJjiwPA4nz.L8pQx55Qgli"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//4
                        htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["i4GretwfRCc.L8pQx55Qgli"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//5
                        htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["PJ3NRljqpdC"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//6
                        htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["LbJkh0Bhfdj.L8pQx55Qgli"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//3
                        htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["JHh30oApLHO.L8pQx55Qgli"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//4
                        htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["q8Vt5iqopMh.L8pQx55Qgli"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//5
                        htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["gzQmDaPEAOt.L8pQx55Qgli"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//6
                        htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["bX0BZBY87ey.L8pQx55Qgli"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//3
                        htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["eT2Ghp7Dhhj.L8pQx55Qgli"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//4
                        htmlReport2 += "</tr>";
                        htmlReport2 += "</tr><tr><td align='center'>" + seri + ".2.2</td>";
                        htmlReport2 += "<td align='center'>Hoạt động Y tế dự phòng, YTCC</td>"; //2
                        htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["iE3PisJv4UD"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//3
                        htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["heFbKPFOAYX.E1n8AO47ANx"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//5
                        htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["VUujYXiLcQo.E1n8AO47ANx"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//6
                        htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["RrIm3S7jizc.E1n8AO47ANx"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//4
                        htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["teZ9uzWsdC8.E1n8AO47ANx"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//5
                        htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["IAEwNuqpwJ6.E1n8AO47ANx"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//6
                        htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["RyVb0zCOSm5.E1n8AO47ANx"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//3
                        htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["glJjiwPA4nz.E1n8AO47ANx"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//4
                        htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["i4GretwfRCc.E1n8AO47ANx"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//5
                        htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["ak98gs8nPyq"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//6
                        htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["LbJkh0Bhfdj.E1n8AO47ANx"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//3
                        htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["JHh30oApLHO.E1n8AO47ANx"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//4
                        htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["q8Vt5iqopMh.E1n8AO47ANx"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//5
                        htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["gzQmDaPEAOt.E1n8AO47ANx"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//6
                        htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["bX0BZBY87ey.E1n8AO47ANx"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//3
                        htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["eT2Ghp7Dhhj.E1n8AO47ANx"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>";//4
                    }
                    htmlReport2 += "</tr>";
                    $("#formreport #mainTable1").append(htmlReport1);
                    $("#formreport #mainTable2").append(htmlReport2);

                    //---------------------------------- TB1 ----------------------------------

                    resolve();

                })
            }).catch(e => {
                for (let m = 0; m < numberColumnCatch; m++) {
                    htmlReport1 += "<td align='center'>0</td>";//21
                    if (m < numberColumnCatch - 1)
                        htmlReport2 += "<td align='center'>0</td>";//21

                }
                htmlReport1 += "</tr>";
                htmlReport2 += "</tr>";
                $("#formreport #mainTable1").append(htmlReport1);
                $("#formreport #mainTable2").append(htmlReport2);
                reject(e);
            });
        })
    }

    function writeRow_huyen(idGroups, isGroup) {
        let htmlReport1 = "";
        let htmlReport2 = "";
        var childOrg = [];
        const des = "uMmm9GZneMR.AMARAl67O0W;uMmm9GZneMR.je3ZoC0J1J2;uMmm9GZneMR.W3J7OtuzmSr;uMmm9GZneMR.Ky9vKtpkbsi;AHjo8UIXD3A.HllvX50cXC0;AHjo8UIXD3A.L8pQx55Qgli;AHjo8UIXD3A.E1n8AO47ANx;rjWwV8cqhAZ;LL7qpUiC3hZ;OQBOipGcNOK;DXgyPsmNqyK;Ff7B08GIU5z;HcKlezEKswk;n2yWJTs36lZ;YwZDwgKpNoD;AXPRYRVmtKV;rO33E6B0ZWO;yfdj9NBMWHW;hDGQf04ot5x;itAHBgwcw7w;wNLX1JVg5aB;gSMOBV405ZL;a99Sg2Rye5x;Ff7B08GIU5z.L8pQx55Qgli;HcKlezEKswk.L8pQx55Qgli;n2yWJTs36lZ.L8pQx55Qgli;YwZDwgKpNoD.L8pQx55Qgli;AXPRYRVmtKV.L8pQx55Qgli;hDGQf04ot5x.L8pQx55Qgli;itAHBgwcw7w.L8pQx55Qgli;wNLX1JVg5aB.L8pQx55Qgli;gSMOBV405ZL.L8pQx55Qgli;a99Sg2Rye5x.L8pQx55Qgli;Ff7B08GIU5z.E1n8AO47ANx;HcKlezEKswk.E1n8AO47ANx;n2yWJTs36lZ.E1n8AO47ANx;YwZDwgKpNoD.E1n8AO47ANx;AXPRYRVmtKV.E1n8AO47ANx;Unq2JxoZ08H;hDGQf04ot5x.E1n8AO47ANx;itAHBgwcw7w.E1n8AO47ANx;wNLX1JVg5aB.E1n8AO47ANx;gSMOBV405ZL.E1n8AO47ANx;a99Sg2Rye5x.E1n8AO47ANx;qt7P3z8zfHr;iE3PisJv4UD;heFbKPFOAYX;VUujYXiLcQo;RrIm3S7jizc;teZ9uzWsdC8;IAEwNuqpwJ6;RyVb0zCOSm5;glJjiwPA4nz;i4GretwfRCc;PJ3NRljqpdC;ak98gs8nPyq;LbJkh0Bhfdj;JHh30oApLHO;q8Vt5iqopMh;gzQmDaPEAOt;bX0BZBY87ey;eT2Ghp7Dhhj;heFbKPFOAYX.L8pQx55Qgli;VUujYXiLcQo.L8pQx55Qgli;RrIm3S7jizc.L8pQx55Qgli;teZ9uzWsdC8.L8pQx55Qgli;IAEwNuqpwJ6.L8pQx55Qgli;RyVb0zCOSm5.L8pQx55Qgli;glJjiwPA4nz.L8pQx55Qgli;i4GretwfRCc.L8pQx55Qgli;LbJkh0Bhfdj.L8pQx55Qgli;JHh30oApLHO.L8pQx55Qgli;q8Vt5iqopMh.L8pQx55Qgli;gzQmDaPEAOt.L8pQx55Qgli;bX0BZBY87ey.L8pQx55Qgli;eT2Ghp7Dhhj.L8pQx55Qgli;heFbKPFOAYX.E1n8AO47ANx;VUujYXiLcQo.E1n8AO47ANx;RrIm3S7jizc.E1n8AO47ANx;teZ9uzWsdC8.E1n8AO47ANx;IAEwNuqpwJ6.E1n8AO47ANx;RyVb0zCOSm5.E1n8AO47ANx;glJjiwPA4nz.E1n8AO47ANx;i4GretwfRCc.E1n8AO47ANx;LbJkh0Bhfdj.E1n8AO47ANx;JHh30oApLHO.E1n8AO47ANx;q8Vt5iqopMh.E1n8AO47ANx;gzQmDaPEAOt.E1n8AO47ANx;bX0BZBY87ey.E1n8AO47ANx;eT2Ghp7Dhhj.E1n8AO47ANx"
        return new Promise((resolve, reject) => {
            $.get("../api/analytics.json?dimension=dx:" + des + "&dimension=ou:" + p2ild.ou.stringGroups(idGroups, orgUnitSelectedID) + "&filter=pe:" + periods + "&skipRounding=true", function (json) {

                childOrg = json.metaData.dimensions.ou;
                childOrg.sort(function (a, b) {
                    if (json.metaData.items[a].name < json.metaData.items[b].name) return -1;
                    if (json.metaData.items[a].name > json.metaData.items[b].name) return 1;
                    return 0;
                })
                console.log(childOrg)
                p2ild.ou.filterCloseOrgUnit(childOrg, periods).then(childOrg => {
                    childOrg.forEach(function (childID) {
                        stt++;
                        //---------------------------------- TB1 ----------------------------------
                        htmlReport1 += "<tr><td align='center'>" + stt + "</td>";
                        htmlReport1 += "<td>" + json.metaData.items[childID].name + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + p2ild.dvu.getValueSum(json, ["uMmm9GZneMR.AMARAl67O0W"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + p2ild.dvu.getValueSum(json, ["uMmm9GZneMR.je3ZoC0J1J2"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + p2ild.dvu.getValueSum(json, ["uMmm9GZneMR.W3J7OtuzmSr"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + p2ild.dvu.getValueSum(json, ["uMmm9GZneMR.Ky9vKtpkbsi"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["rjWwV8cqhAZ", "LL7qpUiC3hZ"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["OQBOipGcNOK", "DXgyPsmNqyK"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["Ff7B08GIU5z"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["HcKlezEKswk"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["n2yWJTs36lZ"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["YwZDwgKpNoD"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["AXPRYRVmtKV"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["rO33E6B0ZWO", "Unq2JxoZ08H"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["hDGQf04ot5x"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["itAHBgwcw7w"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["wNLX1JVg5aB"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["gSMOBV405ZL"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["a99Sg2Rye5x"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";

                        htmlReport1 += "</tr><tr><td align='center'>" + stt + ".2.1</td>";
                        htmlReport1 += "<td align='center'>Hoạt động khám chữa bệnh</td>"; //2
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + filterTuChu(json, childID)[PHAN_LOAI_TU_CHU.KCB][0] + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + filterTuChu(json, childID)[PHAN_LOAI_TU_CHU.KCB][1] + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + filterTuChu(json, childID)[PHAN_LOAI_TU_CHU.KCB][2] + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + filterTuChu(json, childID)[PHAN_LOAI_TU_CHU.KCB][3] + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["rjWwV8cqhAZ"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["OQBOipGcNOK"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["Ff7B08GIU5z.L8pQx55Qgli"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["HcKlezEKswk.L8pQx55Qgli"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["n2yWJTs36lZ.L8pQx55Qgli"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["YwZDwgKpNoD.L8pQx55Qgli"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["AXPRYRVmtKV.L8pQx55Qgli"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["rO33E6B0ZWO"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["hDGQf04ot5x.L8pQx55Qgli"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["itAHBgwcw7w.L8pQx55Qgli"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["wNLX1JVg5aB.L8pQx55Qgli"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["gSMOBV405ZL.L8pQx55Qgli"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["a99Sg2Rye5x.L8pQx55Qgli"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport1 += "</tr>";
                        htmlReport1 += "</tr><tr><td align='center'>" + stt + ".2.2</td>";
                        htmlReport1 += "<td align='center'>Hoạt động Y tế dự phòng, YTCC</td>"; //2
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + filterTuChu(json, childID)[PHAN_LOAI_TU_CHU.YTDP][0] + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + filterTuChu(json, childID)[PHAN_LOAI_TU_CHU.YTDP][1] + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + filterTuChu(json, childID)[PHAN_LOAI_TU_CHU.YTDP][2] + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + filterTuChu(json, childID)[PHAN_LOAI_TU_CHU.YTDP][3] + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["LL7qpUiC3hZ"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["DXgyPsmNqyK"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["Ff7B08GIU5z.E1n8AO47ANx"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["HcKlezEKswk.E1n8AO47ANx"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["n2yWJTs36lZ.E1n8AO47ANx"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["YwZDwgKpNoD.E1n8AO47ANx"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["AXPRYRVmtKV.E1n8AO47ANx"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["Unq2JxoZ08H"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["hDGQf04ot5x.E1n8AO47ANx"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["itAHBgwcw7w.E1n8AO47ANx"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["wNLX1JVg5aB.E1n8AO47ANx"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["gSMOBV405ZL.E1n8AO47ANx"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport1 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["a99Sg2Rye5x.E1n8AO47ANx"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport1 += "</tr>";
                        //---------------------------------- TB2 ----------------------------------
                        htmlReport2 += "<tr><td align='center'>" + stt + "</td>";
                        htmlReport2 += "<td>" + json.metaData.items[childID].name + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["qt7P3z8zfHr", "iE3PisJv4UD"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["heFbKPFOAYX"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["VUujYXiLcQo"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["RrIm3S7jizc"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["teZ9uzWsdC8"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["IAEwNuqpwJ6"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["RyVb0zCOSm5"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["glJjiwPA4nz"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["i4GretwfRCc"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["PJ3NRljqpdC", "ak98gs8nPyq"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["LbJkh0Bhfdj"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["JHh30oApLHO"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["q8Vt5iqopMh"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["gzQmDaPEAOt"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["bX0BZBY87ey"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["eT2Ghp7Dhhj"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";


                        htmlReport2 += "</tr><tr><td align='center'>" + stt + ".2.1</td>";
                        htmlReport2 += "<td align='center'>Hoạt động khám chữa bệnh</td>"; //2
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["qt7P3z8zfHr"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["heFbKPFOAYX.L8pQx55Qgli"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["VUujYXiLcQo.L8pQx55Qgli"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["RrIm3S7jizc.L8pQx55Qgli"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["teZ9uzWsdC8.L8pQx55Qgli"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["IAEwNuqpwJ6.L8pQx55Qgli"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["RyVb0zCOSm5.L8pQx55Qgli"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["glJjiwPA4nz.L8pQx55Qgli"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["i4GretwfRCc.L8pQx55Qgli"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["PJ3NRljqpdC"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["LbJkh0Bhfdj.L8pQx55Qgli"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["JHh30oApLHO.L8pQx55Qgli"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["q8Vt5iqopMh.L8pQx55Qgli"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["gzQmDaPEAOt.L8pQx55Qgli"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["bX0BZBY87ey.L8pQx55Qgli"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["eT2Ghp7Dhhj.L8pQx55Qgli"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "</tr>";
                        htmlReport2 += "</tr><tr><td align='center'>" + stt + ".2.2</td>";
                        htmlReport2 += "<td align='center'>Hoạt động Y tế dự phòng, YTCC</td>"; //2
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["iE3PisJv4UD"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["heFbKPFOAYX.E1n8AO47ANx"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["VUujYXiLcQo.E1n8AO47ANx"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["RrIm3S7jizc.E1n8AO47ANx"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["teZ9uzWsdC8.E1n8AO47ANx"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["IAEwNuqpwJ6.E1n8AO47ANx"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["RyVb0zCOSm5.E1n8AO47ANx"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["glJjiwPA4nz.E1n8AO47ANx"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["i4GretwfRCc.E1n8AO47ANx"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["ak98gs8nPyq"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["LbJkh0Bhfdj.E1n8AO47ANx"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["JHh30oApLHO.E1n8AO47ANx"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["q8Vt5iqopMh.E1n8AO47ANx"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["gzQmDaPEAOt.E1n8AO47ANx"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["bX0BZBY87ey.E1n8AO47ANx"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["eT2Ghp7Dhhj.E1n8AO47ANx"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
                        htmlReport2 += "</tr>";

                    })
                    $("#formreport #mainTable1").append(htmlReport1);
                    $("#formreport #mainTable2").append(htmlReport2);
                    resolve();
                });
            }).catch(e => {
                reject(e);
            });
        })
    }


}

function lastLoad() {
    p2ild.ExportDataUtils.cloneTableDataWithoutLib.apply(p2ild.ExportDataUtils);
    load = 0;
    p2ild.DesignUtil.hidePreload()
    if (listBtn.length != 0) {
        listBtn.forEach(e => {
            e.setStateButton()
            e.addOnClickBtn()
        })
    }
    p2ild?.ApproveUtil?.initForceAcceptAll.call(this, {
        anchor: '.custom-btn',
        listBtn: listBtn || []
    })
}

var sum = function (idGroups, seri, title, isGroup) {
    let htmlReport1 = "";
    let htmlReport2 = "";
    stt = 0;
    var strButton = "";

    switch (idGroups) {
        case sumI:
            btn = Object.assign({}, ApproveButtonBuilder)
            btn.initButton(btn.BUTTON_TYPE.TYPE_APPROVE, orgUnitSelectedID, ["UzwCwXGMIQq"], periods)
            strButton = btn.toStringHTML()
            listBtn.push(btn);
            break
        default:
            strButton = ""
            break;
    }

    htmlReport1 += "<tr><td align='center'><strong>" + seri + strButton + "</strong></td>"; //1
    htmlReport2 += "<tr><td align='center'><strong>" + seri + "</strong></td>"; //1
    if (title == "TỔNG SỐ") {
        htmlReport1 += "<td align='center'><strong>" + title + "</strong></td>"; //2
        htmlReport2 += "<td align='center'><strong>" + title + "</strong></td>"; //2
    } else {
        htmlReport1 += "<td align='left'><strong>" + title + "</strong></td>"; //2}
        htmlReport2 += "<td align='left'><strong>" + title + "</strong></td>"; //2}
    }
    const des = "uMmm9GZneMR.AMARAl67O0W;uMmm9GZneMR.je3ZoC0J1J2;uMmm9GZneMR.W3J7OtuzmSr;uMmm9GZneMR.Ky9vKtpkbsi;rjWwV8cqhAZ;JPyFARPu7zV;LL7qpUiC3hZ;OQBOipGcNOK;dbThC9ZIqvB;DXgyPsmNqyK;Ff7B08GIU5z;HcKlezEKswk;n2yWJTs36lZ;YwZDwgKpNoD;AXPRYRVmtKV;rO33E6B0ZWO;yfdj9NBMWHW;hDGQf04ot5x;itAHBgwcw7w;wNLX1JVg5aB;gSMOBV405ZL;a99Sg2Rye5x;Ff7B08GIU5z.L8pQx55Qgli;HcKlezEKswk.L8pQx55Qgli;n2yWJTs36lZ.L8pQx55Qgli;YwZDwgKpNoD.L8pQx55Qgli;AXPRYRVmtKV.L8pQx55Qgli;hDGQf04ot5x.L8pQx55Qgli;itAHBgwcw7w.L8pQx55Qgli;wNLX1JVg5aB.L8pQx55Qgli;gSMOBV405ZL.L8pQx55Qgli;a99Sg2Rye5x.L8pQx55Qgli;Ff7B08GIU5z.E1n8AO47ANx;HcKlezEKswk.E1n8AO47ANx;n2yWJTs36lZ.E1n8AO47ANx;YwZDwgKpNoD.E1n8AO47ANx;AXPRYRVmtKV.E1n8AO47ANx;Unq2JxoZ08H;hDGQf04ot5x.E1n8AO47ANx;itAHBgwcw7w.E1n8AO47ANx;wNLX1JVg5aB.E1n8AO47ANx;gSMOBV405ZL.E1n8AO47ANx;a99Sg2Rye5x.E1n8AO47ANx;oYEG52Q9lF9;qt7P3z8zfHr;iE3PisJv4UD;heFbKPFOAYX;VUujYXiLcQo;RrIm3S7jizc;teZ9uzWsdC8;IAEwNuqpwJ6;RyVb0zCOSm5;glJjiwPA4nz;i4GretwfRCc;itvyP8whBc4;PJ3NRljqpdC;ak98gs8nPyq;LbJkh0Bhfdj;JHh30oApLHO;q8Vt5iqopMh;gzQmDaPEAOt;bX0BZBY87ey;eT2Ghp7Dhhj;heFbKPFOAYX.L8pQx55Qgli;VUujYXiLcQo.L8pQx55Qgli;RrIm3S7jizc.L8pQx55Qgli;teZ9uzWsdC8.L8pQx55Qgli;IAEwNuqpwJ6.L8pQx55Qgli;RyVb0zCOSm5.L8pQx55Qgli;glJjiwPA4nz.L8pQx55Qgli;i4GretwfRCc.L8pQx55Qgli;LbJkh0Bhfdj.L8pQx55Qgli;JHh30oApLHO.L8pQx55Qgli;q8Vt5iqopMh.L8pQx55Qgli;gzQmDaPEAOt.L8pQx55Qgli;bX0BZBY87ey.L8pQx55Qgli;eT2Ghp7Dhhj.L8pQx55Qgli;heFbKPFOAYX.E1n8AO47ANx;VUujYXiLcQo.E1n8AO47ANx;RrIm3S7jizc.E1n8AO47ANx;teZ9uzWsdC8.E1n8AO47ANx;IAEwNuqpwJ6.E1n8AO47ANx;RyVb0zCOSm5.E1n8AO47ANx;glJjiwPA4nz.E1n8AO47ANx;i4GretwfRCc.E1n8AO47ANx;LbJkh0Bhfdj.E1n8AO47ANx;JHh30oApLHO.E1n8AO47ANx;q8Vt5iqopMh.E1n8AO47ANx;gzQmDaPEAOt.E1n8AO47ANx;bX0BZBY87ey.E1n8AO47ANx;eT2Ghp7Dhhj.E1n8AO47ANx"
    return new Promise((resolve, reject) => {
        $.get("../api/analytics.json?dimension=dx:" + des + "&dimension=ou:" + p2ild.ou.stringGroups(idGroups, orgUnitSelectedID) + "&filter=pe:" + periods + "&skipRounding=true", function (json) {
            //---------------------------------- TB1 ----------------------------------
            //default sumRow
            htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["uMmm9GZneMR.AMARAl67O0W"], undefined) + "</strong></td>"; //3
            htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["uMmm9GZneMR.je3ZoC0J1J2"], undefined) + "</strong></td>"; //4
            htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["uMmm9GZneMR.W3J7OtuzmSr"], undefined) + "</strong></td>"; //5
            htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["uMmm9GZneMR.Ky9vKtpkbsi"], undefined) + "</strong></td>"; //6
            htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["JPyFARPu7zV"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>"; //7
            htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["dbThC9ZIqvB"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>"; //8
            htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["Ff7B08GIU5z"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>"; //9
            htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["HcKlezEKswk"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>"; //10
            htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["n2yWJTs36lZ"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>"; //11
            htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["YwZDwgKpNoD"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>"; //12
            htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["AXPRYRVmtKV"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>"; //13
            htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["yfdj9NBMWHW"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>"; //8
            htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["hDGQf04ot5x"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>"; //15
            htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["itAHBgwcw7w"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>"; //16
            htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["wNLX1JVg5aB"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>"; //17
            htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["gSMOBV405ZL"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>"; //18
            htmlReport1 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["a99Sg2Rye5x"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>"; //19

            htmlReport1 += "</tr>";


            //---------------------------------- TB2 ----------------------------------

            htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["oYEG52Q9lF9"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>"; //3
            htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["heFbKPFOAYX"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>"; //4
            htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["VUujYXiLcQo"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>"; //5
            htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["RrIm3S7jizc"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>"; //7
            htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["teZ9uzWsdC8"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>"; //8
            htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["IAEwNuqpwJ6"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>"; //9
            htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["RyVb0zCOSm5"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>"; //10
            htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["glJjiwPA4nz"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>"; //11
            htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["i4GretwfRCc"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>"; //12
            htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["itvyP8whBc4"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>"; //3
            htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["LbJkh0Bhfdj"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>"; //14
            htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["JHh30oApLHO"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>"; //15
            htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["q8Vt5iqopMh"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>"; //16
            htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["gzQmDaPEAOt"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>"; //17
            htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["bX0BZBY87ey"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>"; //18
            htmlReport2 += "<td align='center'><strong>" + p2ild.dvu.getValueSum(json, ["eT2Ghp7Dhhj"], undefined, p2ild.dvu.dataTypesSupport.MONEY) + "</strong></td>"; //19
            htmlReport2 += "</tr>";
            $("#formreport #mainTable1").append(htmlReport1);
            $("#formreport #mainTable2").append(htmlReport2);

            //---------------------------------- TB1 ----------------------------------

            resolve();
        }).catch(e => {
            for (let m = 0; m < numberColumnCatch; m++) {
                htmlReport1 += "<td align='center'>0</td>"; //21
                if (m < numberColumnCatch - 1)
                    htmlReport2 += "<td align='center'>0</td>"; //21

            }
            htmlReport1 += "</tr>";
            htmlReport2 += "</tr>";
            $("#formreport #mainTable1").append(htmlReport1);
            $("#formreport #mainTable2").append(htmlReport2);
            reject(e);
        });
    })
}

var writeRowByLevelOrgAggregate = function (idGroups, isGroup, levelOrgAggregate) {
    const des = "uMmm9GZneMR.AMARAl67O0W;uMmm9GZneMR.je3ZoC0J1J2;uMmm9GZneMR.W3J7OtuzmSr;uMmm9GZneMR.Ky9vKtpkbsi;JPyFARPu7zV;dbThC9ZIqvB;oYEG52Q9lF9;rjWwV8cqhAZ;LL7qpUiC3hZ;OQBOipGcNOK;DXgyPsmNqyK;Ff7B08GIU5z;HcKlezEKswk;n2yWJTs36lZ;YwZDwgKpNoD;AXPRYRVmtKV;rO33E6B0ZWO;yfdj9NBMWHW;hDGQf04ot5x;itAHBgwcw7w;wNLX1JVg5aB;gSMOBV405ZL;a99Sg2Rye5x;Ff7B08GIU5z.L8pQx55Qgli;HcKlezEKswk.L8pQx55Qgli;n2yWJTs36lZ.L8pQx55Qgli;YwZDwgKpNoD.L8pQx55Qgli;AXPRYRVmtKV.L8pQx55Qgli;hDGQf04ot5x.L8pQx55Qgli;itAHBgwcw7w.L8pQx55Qgli;wNLX1JVg5aB.L8pQx55Qgli;gSMOBV405ZL.L8pQx55Qgli;a99Sg2Rye5x.L8pQx55Qgli;Ff7B08GIU5z.E1n8AO47ANx;HcKlezEKswk.E1n8AO47ANx;n2yWJTs36lZ.E1n8AO47ANx;YwZDwgKpNoD.E1n8AO47ANx;AXPRYRVmtKV.E1n8AO47ANx;Unq2JxoZ08H;hDGQf04ot5x.E1n8AO47ANx;itAHBgwcw7w.E1n8AO47ANx;wNLX1JVg5aB.E1n8AO47ANx;gSMOBV405ZL.E1n8AO47ANx;a99Sg2Rye5x.E1n8AO47ANx;qt7P3z8zfHr;iE3PisJv4UD;heFbKPFOAYX;VUujYXiLcQo;RrIm3S7jizc;teZ9uzWsdC8;IAEwNuqpwJ6;RyVb0zCOSm5;glJjiwPA4nz;i4GretwfRCc;PJ3NRljqpdC;ak98gs8nPyq;LbJkh0Bhfdj;JHh30oApLHO;q8Vt5iqopMh;gzQmDaPEAOt;bX0BZBY87ey;eT2Ghp7Dhhj;heFbKPFOAYX.L8pQx55Qgli;VUujYXiLcQo.L8pQx55Qgli;RrIm3S7jizc.L8pQx55Qgli;teZ9uzWsdC8.L8pQx55Qgli;IAEwNuqpwJ6.L8pQx55Qgli;RyVb0zCOSm5.L8pQx55Qgli;glJjiwPA4nz.L8pQx55Qgli;i4GretwfRCc.L8pQx55Qgli;LbJkh0Bhfdj.L8pQx55Qgli;JHh30oApLHO.L8pQx55Qgli;q8Vt5iqopMh.L8pQx55Qgli;gzQmDaPEAOt.L8pQx55Qgli;bX0BZBY87ey.L8pQx55Qgli;eT2Ghp7Dhhj.L8pQx55Qgli;heFbKPFOAYX.E1n8AO47ANx;VUujYXiLcQo.E1n8AO47ANx;RrIm3S7jizc.E1n8AO47ANx;teZ9uzWsdC8.E1n8AO47ANx;IAEwNuqpwJ6.E1n8AO47ANx;RyVb0zCOSm5.E1n8AO47ANx;glJjiwPA4nz.E1n8AO47ANx;i4GretwfRCc.E1n8AO47ANx;LbJkh0Bhfdj.E1n8AO47ANx;JHh30oApLHO.E1n8AO47ANx;q8Vt5iqopMh.E1n8AO47ANx;gzQmDaPEAOt.E1n8AO47ANx;bX0BZBY87ey.E1n8AO47ANx;eT2Ghp7Dhhj.E1n8AO47ANx;itvyP8whBc4"
    return new Promise((resolve, reject) => {
        $.get("../api/analytics.json?dimension=dx:" + des + "&dimension=ou:" + p2ild.ou.stringGroups(idGroups, orgUnitSelectedID) + "&filter=pe:" + periods + "&hierarchyMeta=true&skipRounding=true")
            .then((json) => {
                p2ild.ou.remapResultByAncestor(json, levelOrgAggregate).then((remapJson) => {
                    writeRow(idGroups, isGroup, remapJson).then(() => resolve()).catch((e) => reject(e))
                })
            })
    })
}
var stt = 0;
var writeRow = function (idGroups, isGroup, remapJson, parentTitle) {
    stt = 0;
    let htmlReport1 = "";
    let htmlReport2 = "";
    var childOrg = [];
    const des = "uMmm9GZneMR.AMARAl67O0W;uMmm9GZneMR.je3ZoC0J1J2;uMmm9GZneMR.W3J7OtuzmSr;uMmm9GZneMR.Ky9vKtpkbsi;JPyFARPu7zV;dbThC9ZIqvB;oYEG52Q9lF9;rjWwV8cqhAZ;LL7qpUiC3hZ;OQBOipGcNOK;DXgyPsmNqyK;Ff7B08GIU5z;HcKlezEKswk;n2yWJTs36lZ;YwZDwgKpNoD;AXPRYRVmtKV;rO33E6B0ZWO;yfdj9NBMWHW;hDGQf04ot5x;itAHBgwcw7w;wNLX1JVg5aB;gSMOBV405ZL;a99Sg2Rye5x;Ff7B08GIU5z.L8pQx55Qgli;HcKlezEKswk.L8pQx55Qgli;n2yWJTs36lZ.L8pQx55Qgli;YwZDwgKpNoD.L8pQx55Qgli;AXPRYRVmtKV.L8pQx55Qgli;hDGQf04ot5x.L8pQx55Qgli;itAHBgwcw7w.L8pQx55Qgli;wNLX1JVg5aB.L8pQx55Qgli;gSMOBV405ZL.L8pQx55Qgli;a99Sg2Rye5x.L8pQx55Qgli;Ff7B08GIU5z.E1n8AO47ANx;HcKlezEKswk.E1n8AO47ANx;n2yWJTs36lZ.E1n8AO47ANx;YwZDwgKpNoD.E1n8AO47ANx;AXPRYRVmtKV.E1n8AO47ANx;Unq2JxoZ08H;hDGQf04ot5x.E1n8AO47ANx;itAHBgwcw7w.E1n8AO47ANx;wNLX1JVg5aB.E1n8AO47ANx;gSMOBV405ZL.E1n8AO47ANx;a99Sg2Rye5x.E1n8AO47ANx;qt7P3z8zfHr;iE3PisJv4UD;heFbKPFOAYX;VUujYXiLcQo;RrIm3S7jizc;teZ9uzWsdC8;IAEwNuqpwJ6;RyVb0zCOSm5;glJjiwPA4nz;itvyP8whBc4;i4GretwfRCc;PJ3NRljqpdC;ak98gs8nPyq;LbJkh0Bhfdj;JHh30oApLHO;q8Vt5iqopMh;gzQmDaPEAOt;bX0BZBY87ey;eT2Ghp7Dhhj;heFbKPFOAYX.L8pQx55Qgli;VUujYXiLcQo.L8pQx55Qgli;RrIm3S7jizc.L8pQx55Qgli;teZ9uzWsdC8.L8pQx55Qgli;IAEwNuqpwJ6.L8pQx55Qgli;RyVb0zCOSm5.L8pQx55Qgli;glJjiwPA4nz.L8pQx55Qgli;i4GretwfRCc.L8pQx55Qgli;LbJkh0Bhfdj.L8pQx55Qgli;JHh30oApLHO.L8pQx55Qgli;q8Vt5iqopMh.L8pQx55Qgli;gzQmDaPEAOt.L8pQx55Qgli;bX0BZBY87ey.L8pQx55Qgli;eT2Ghp7Dhhj.L8pQx55Qgli;heFbKPFOAYX.E1n8AO47ANx;VUujYXiLcQo.E1n8AO47ANx;RrIm3S7jizc.E1n8AO47ANx;teZ9uzWsdC8.E1n8AO47ANx;IAEwNuqpwJ6.E1n8AO47ANx;RyVb0zCOSm5.E1n8AO47ANx;glJjiwPA4nz.E1n8AO47ANx;i4GretwfRCc.E1n8AO47ANx;LbJkh0Bhfdj.E1n8AO47ANx;JHh30oApLHO.E1n8AO47ANx;q8Vt5iqopMh.E1n8AO47ANx;gzQmDaPEAOt.E1n8AO47ANx;bX0BZBY87ey.E1n8AO47ANx;eT2Ghp7Dhhj.E1n8AO47ANx";
    let urlSubRow = "../api/analytics.json?dimension=dx:" + des + "&filter=pe:" + periods + "&skipRounding=true&dimension=ou:"
    return new Promise((resolve, reject) => {
        $.get(urlSubRow + p2ild.ou.stringGroups(idGroups, orgUnitSelectedID), function (json) {
            if (remapJson) json = remapJson;
            childOrg = json.metaData.dimensions.ou;

            childOrg.sort(function (a, b) {
                if (json.metaData.items[a].name < json.metaData.items[b].name) return -1;
                if (json.metaData.items[a].name > json.metaData.items[b].name) return 1;
                return 0;
            })
            console.log(childOrg)
            p2ild.ou.filterCloseOrgUnit(childOrg, periods).then(childOrg => {
                childOrg.forEach(function (childID) {
                    stt++
                    htmlReport1 += getRowDataWithoutCatTb1(stt, json, json.metaData.items[childID].name, childID, idGroups)
                    htmlReport2 += getRowDataWithoutCatTb2(stt, json, json.metaData.items[childID].name, childID)
                })
                $("#formreport #mainTable1").append(htmlReport1);
                $("#formreport #mainTable2").append(htmlReport2);
                resolve();
            });
        }).catch(e => {
            reject(e);
        });
    })
}

function getRowDataWithoutCatTb1(stt, json, name, childID, idGroups) {
    let strButton = ""
    switch (idGroups) {
        case sumII:
            btn = Object.assign({}, ApproveButtonBuilder)
            btn.initButton(btn.BUTTON_TYPE.TYPE_ACCEPT, childID, ["UPKEou47AtY", "hXDlgWg5mSZ"], periods)
            strButton = btn.toStringHTML()
            listBtn.push(btn);
            break;
        case sumIII:
            btn = Object.assign({}, ApproveButtonBuilder)
            btn.initButton(btn.BUTTON_TYPE.TYPE_ACCEPT, childID, ["L6LscRxjezJ"], periods)
            strButton = btn.toStringHTML()
            listBtn.push(btn);
            break
        default:
            strButton = ""
            break;
    }
    var result = "";
    result += "<tr>"
    result += "<td align='center'>" + stt + strButton + "</td>";
    result += "<td>" + name + "</td>";
    result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" +
        (p2ild.dvu.getValueDE(json, ["uMmm9GZneMR.AMARAl67O0W"], childID)) + "</td>";
    result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" +
        (p2ild.dvu.getValueDE(json, ["uMmm9GZneMR.je3ZoC0J1J2"], childID)) + "</td>";
    result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" +
        (p2ild.dvu.getValueDE(json, ["uMmm9GZneMR.W3J7OtuzmSr"], childID)) + "</td>";
    result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" +
        (p2ild.dvu.getValueDE(json, ["uMmm9GZneMR.Ky9vKtpkbsi"], childID)) + "</td>";
    result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" +
        (p2ild.dvu.getValueDE(json, ["JPyFARPu7zV"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
    result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" +
        (p2ild.dvu.getValueDE(json, ["dbThC9ZIqvB"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
    result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" +
        (p2ild.dvu.getValueDE(json, ["Ff7B08GIU5z"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
    result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" +
        (p2ild.dvu.getValueDE(json, ["HcKlezEKswk"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
    result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" +
        (p2ild.dvu.getValueDE(json, ["n2yWJTs36lZ"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
    result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" +
        (p2ild.dvu.getValueDE(json, ["YwZDwgKpNoD"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
    result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" +
        (p2ild.dvu.getValueDE(json, ["AXPRYRVmtKV"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
    result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" +
        (p2ild.dvu.getValueDE(json, ["yfdj9NBMWHW"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
    result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" +
        (p2ild.dvu.getValueDE(json, ["hDGQf04ot5x"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
    result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" +
        (p2ild.dvu.getValueDE(json, ["itAHBgwcw7w"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
    result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" +
        (p2ild.dvu.getValueDE(json, ["wNLX1JVg5aB"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
    result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" +
        (p2ild.dvu.getValueDE(json, ["gSMOBV405ZL"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
    result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" +
        (p2ild.dvu.getValueDE(json, ["a99Sg2Rye5x"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>";
    result += "</tr>"

    return result
}

function getRowDataWithoutCatTb2(stt, json, name, childID) {
    var result = ""
    result += "<tr>"
    result += "<td align='center'>" + stt + "</td>"
    result += "<td>" + name + "</td>"
    result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["oYEG52Q9lF9"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>"
    result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["heFbKPFOAYX"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>"
    result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["VUujYXiLcQo"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>"
    result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["RrIm3S7jizc"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>"
    result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["teZ9uzWsdC8"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>"
    result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["IAEwNuqpwJ6"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>"
    result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["RyVb0zCOSm5"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>"
    result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["glJjiwPA4nz"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>"
    result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["i4GretwfRCc"], childID, p2ild.dvu.dataTypesSupport.MONEY)) + "</td>"
    result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["itvyP8whBc4"], childID, null, null, true)) + "</td>"
    result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["LbJkh0Bhfdj"], childID, null, null, true)) + "</td>"
    result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["JHh30oApLHO"], childID, null, null, true)) + "</td>"
    result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["q8Vt5iqopMh"], childID, null, null, true)) + "</td>"
    result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["gzQmDaPEAOt"], childID, null, null, true)) + "</td>"
    result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["bX0BZBY87ey"], childID, null, null, true)) + "</td>"
    result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (p2ild.dvu.getValueDE(json, ["eT2Ghp7Dhhj"], childID, null, null, true)) + "</td>"
    result += "</tr>"
    return result
}
