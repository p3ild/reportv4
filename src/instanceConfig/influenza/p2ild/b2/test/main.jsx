import React, { useState, useEffect } from 'react'
import {
    groupSelectTinh,
    LEVEL_ORG_SELECT_TYPE,
    PHAN_LOAI_TU_CHU,
    mockData,
    mockFunctions
} from '../constants.js'
import { filterTuChu } from '../utils.js'
import { getCoreMetaStateByPath } from '@core/stateManage/metadataState.js'
import { DATA_TYPE, defineHeader, getValueDE, getValueSum } from '../../common/DataValueUtils.js'

// Extract mock data and functions to global scope for compatibility
export const Main = () => {
    // Add loading state
    const [isLoading, setIsLoading] = useState(false)
    const [loadStatus, setLoadStatus] = useState('')

    let {
        orgSelected,
        periods,
        sumI,
        sumII,
        sumIII,
        sumI_1_1,
        sumI_1_2,
        sumI_1_3,
        sumB1,
        sumB2,
        numberColumnCatch
    } = mockData

    // Global variables - declare first before using
    let orgHirch = mockData.orgHirch
    let load = mockData.load
    let seri = mockData.seri
    let stt = mockData.stt
    let arrColumn = mockData.arrColumn
    let arrGroupByPhanLoai = mockData.arrGroupByPhanLoai
    let orgUnitSelectedGroupID = mockData.orgUnitSelectedGroupID

    // ------------------------- Script -------------------------
    let orgUnitSelectedID = orgSelected.id

    // Calculate dynamic organization groups based on org type
    let sumAll = []
    let sumA = []
    let sumB = []

    // Set up organization groups based on hierarchy type

    const { p2ild, _ } = mockFunctions

    // Enhanced jQuery mock that actually works with DOM
    const $ = (selector) => ({
        append: (html) => {
            console.log(`Appending HTML to ${selector}`)
            const element = document.querySelector(selector)
            if (element) {
                element.innerHTML += html
                console.log(`Successfully appended to ${selector}`)
            } else {
                console.warn(`Element not found: ${selector}`)
            }
        }
    })

    // Enhanced mock functions for better data simulation
    const enhancedMockFunctions = {
        ...mockFunctions,
        get: (url, callback) => {

            let nu = getCoreMetaStateByPath('networkUtils');
            return nu._get({
                host: 'https://baocao.tkyt.vn',
                api: url,
                auth: {
                    username: 'duylp',
                    password: '$P2ild1994'
                }
            }).then(e => {
                callback(e)
            })
        },
        p2ild: {
            ...mockFunctions.p2ild,
            dvu: {
                getValueSum,
                getValueDE,
                defineHeader: (headers) => ({
                    iDe: 0,
                    iOu: 1,
                    iPe: 2,
                    iValue: 3
                }),
                dataTypesSupport: {
                    MONEY: 'MONEY',
                    NUMBER: 'NUMBER'
                }
            },
            ou: {
                stringGroups: (groups, selectedId) => {
                    return groups.join(';') + ';' + selectedId
                },
                remapResultByAncestor: (json, level) => {
                    return Promise.resolve(json)
                },
                filterCloseOrgUnit: function filterCloseOrgUnit(childOrg, periods) {
                    /** 
                     * remove closeOrgUnit is closed
                     * return orgUnit available by startData&endDate
                     * @param childOrg : Array org from sourceJson. Ex:  organisationUnits:["a","b","c",...]
                     * @param periods : result output period in link analystic . Ex : 202001;202002;202003;202004
                     */

                    let listOrg = cloneObject(childOrg)


                    var validateOrgDate = function (
                        removeEle
                        // = {
                        //     openingDate: '2024-12-01',
                        //     closedDate: '2024-12-01'
                        // }
                        ,
                        period
                        // = '2025'
                    ) {
                        let firstPeriod = periods.split(";").shift();
                        let lastPeriod = periods.split(";").pop();
                        try {
                            const { parseISO, isBefore, isAfter } = dateFns
                            let startDate, endDate;

                            if (/^\d{4}$/.test(firstPeriod)) { // Yearly period in format YYYY
                                startDate = parseISO(`${firstPeriod}-01-01`);
                                endDate = parseISO(`${lastPeriod}-12-31`);
                            } else if (/^\d{6}$/.test(firstPeriod)) { // Monthly period in format YYYYMM
                                const year = firstPeriod.slice(0, 4);
                                startDate = parseISO(`${year}-${firstPeriod.slice(4, 6)}-01`);
                                endDate = parseISO(`${year}-${lastPeriod.slice(4, 6)}-01`);
                                endDate.setMonth(endDate.getMonth() + 1);
                                endDate.setDate(endDate.getDate() - 1);
                            } else if (/^\d{4}Q[1-4]$/.test(firstPeriod)) { // Quarterly period in format YYYYQ1, YYYYQ2, YYYYQ3, YYYYQ4
                                const year = firstPeriod.slice(0, 4);
                                const quarter = period.slice(5);
                                if (quarter === 'Q1') {
                                    startDate = parseISO(`${year}-01-01`);
                                    endDate = parseISO(`${year}-03-31`);
                                } else if (quarter === 'Q2') {
                                    startDate = parseISO(`${year}-04-01`);
                                    endDate = parseISO(`${year}-06-30`);
                                } else if (quarter === 'Q3') {
                                    startDate = parseISO(`${year}-07-01`);
                                    endDate = parseISO(`${year}-09-30`);
                                } else if (quarter === 'Q4') {
                                    startDate = parseISO(`${year}-10-01`);
                                    endDate = parseISO(`${year}-12-31`);
                                }
                            } else {
                                throw new Error('Unsupported period format');
                            }
                            const openingDate = parseISO(removeEle.openingDate);
                            const closedDate = removeEle.closedDate ? parseISO(removeEle.closedDate) : null;

                            if (closedDate && isBefore(closedDate, startDate)) {
                                return false;
                            }

                            if (isAfter(openingDate, endDate)) {
                                return false;
                            }

                            return true;
                        } catch (e) {

                        }
                    }


                    return new Promise((resolve, reject) => {
                        function chunkArrayToPromise(mArray, chunk) {
                            let resultArray = []
                            var i, j, temparray;
                            for (i = 0, j = mArray.length; i < j; i += chunk) {
                                temparray = mArray.slice(i, i + chunk);
                                // console.log(`chunkSize`,temparray.length)
                                console.log(`arr:`, `http://baocao.tkyt.vn/api/organisationUnits.json?fields=id,closedDate,openingDate&paging=false&filter=id:in:[${temparray.join(",")}]`)
                                let url = `../api/organisationUnits.json?fields=id,closedDate,openingDate&paging=false&filter=id:in:[${temparray.join(",")}]`
                                resultArray.push(fetch(`${url}`))
                            }
                            return resultArray
                        }

                        (
                            async () => {
                                try {
                                    promises = chunkArrayToPromise(childOrg, 300)
                                    const res = await Promise.all(promises);
                                    let data = await Promise.all(res.map(r => r.json()))
                                    let resultAllPromise = data.flat()
                                    let organisationUnits = resultAllPromise.reduce((total, value, idx, arr) => {
                                        total = total.concat(value.organisationUnits)
                                        return total
                                    }, [])
                                    if (organisationUnits.length > 0) {
                                        organisationUnits.forEach(removeEle => {


                                            //Case hide
                                            if (!validateOrgDate(removeEle, periods)) {
                                                var index = listOrg.indexOf(removeEle.id);
                                                if (index > -1) {
                                                    listOrg.splice(index, 1);
                                                }
                                            }
                                        })
                                    }
                                    return resolve(listOrg);
                                } catch (e) {
                                    console.log(e)
                                    reject(e)
                                }
                            }
                        )()
                    })
                }

            },
            ExportDataUtils: {
                cloneTableDataWithoutLib: {
                    apply: function () {
                        console.log("Mock export data utils applied")
                    }
                }
            },
            DesignUtil: {
                hidePreload: () => console.log("Mock preload hidden")
            }
        }
    }

    // Generate mock data rows for analytics
    function generateMockDataRows() {
        const rows = []
        const dataElements = [
            'uMmm9GZneMR.AMARAl67O0W', 'uMmm9GZneMR.je3ZoC0J1J2', 'uMmm9GZneMR.W3J7OtuzmSr',
            'JPyFARPu7zV', 'dbThC9ZIqvB', 'Ff7B08GIU5z', 'HcKlezEKswk', 'n2yWJTs36lZ',
            'YwZDwgKpNoD', 'AXPRYRVmtKV', 'hDGQf04ot5x', 'itAHBgwcw7w', 'wNLX1JVg5aB'
        ]

        dataElements.forEach(de => {
            rows.push([de, orgSelected.id, periods.split(';')[0], Math.floor(Math.random() * 1000000)])
        })

        return rows
    }

    // FilterTuChu function from old.js
    function filterTuChu(json, orgID) {
        const jsonHeader = enhancedMockFunctions.p2ild.dvu.defineHeader(json.headers)

        // Default result
        let arrResultTuChu = {}
        arrResultTuChu[PHAN_LOAI_TU_CHU.DEFAULT] = Array(4).fill("")
        arrResultTuChu[PHAN_LOAI_TU_CHU.KCB] = Array(4).fill("")
        arrResultTuChu[PHAN_LOAI_TU_CHU.YTDP] = Array(4).fill("")
        arrResultTuChu[PHAN_LOAI_TU_CHU.TOTAL] = Array(4).fill("")

        let listValidOrg
        // Filter all de valid org param
        listValidOrg = json.rows.filter(x => x[jsonHeader.iOu] == orgID)

        arrColumn = Array(4).fill("")
        listValidOrg.forEach(row => {
            if ([PHAN_LOAI_TU_CHU.DEFAULT,
            PHAN_LOAI_TU_CHU.KCB,
            PHAN_LOAI_TU_CHU.YTDP,
            PHAN_LOAI_TU_CHU.TOTAL
            ].includes(row[jsonHeader.iDe])) {
                arrColumn = Array(4).fill("")
                arrColumn[row[jsonHeader.iValue] - 1] = "1"
                arrResultTuChu[row[jsonHeader.iDe]] = arrColumn
            }
        })

        var arrColumnSum = Array(4).fill("")
        arrGroupByPhanLoai = orgID != undefined
            ? _.groupBy(json.rows.filter(e =>
                [PHAN_LOAI_TU_CHU.DEFAULT,
                PHAN_LOAI_TU_CHU.KCB,
                PHAN_LOAI_TU_CHU.YTDP
                ].includes(e[jsonHeader.iDe]) && orgID == e[jsonHeader.iOu]
            ), jsonHeader.iValue)
            : _.groupBy(json.rows.filter(e =>
                [PHAN_LOAI_TU_CHU.DEFAULT,
                PHAN_LOAI_TU_CHU.KCB,
                PHAN_LOAI_TU_CHU.YTDP
                ].includes(e[jsonHeader.iDe])
            ), jsonHeader.iValue)

        Object.keys(arrGroupByPhanLoai).forEach(function (key) {
            arrColumnSum[key - 1] = arrGroupByPhanLoai[key].length
        })

        arrResultTuChu[PHAN_LOAI_TU_CHU.TOTAL] = arrColumnSum

        // Hard code for mock data
        arrResultTuChu[PHAN_LOAI_TU_CHU.DEFAULT] = ["", "", "", ""]
        arrResultTuChu[PHAN_LOAI_TU_CHU.KCB] = ["", "", "", ""]
        arrResultTuChu[PHAN_LOAI_TU_CHU.YTDP] = ["", "", "", ""]
        arrResultTuChu[PHAN_LOAI_TU_CHU.TOTAL] = ["", "", "", ""]

        return arrResultTuChu
    }

    // Main loadData function to initialize the data loading process
    function loadData() {
        console.log("Starting loadData function...")
        setIsLoading(true)
        setLoadStatus('Initializing data load...')

        // Reset load counter
        load = 0

        // Clear any existing data in tables
        const mainTable1 = document.getElementById('mainTable1')
        const mainTable2 = document.getElementById('mainTable2')

        if (mainTable1) {
            // Keep header rows, remove data rows if any exist
            const tbody = mainTable1.querySelector('tbody')
            const headerRows = tbody.querySelectorAll('tr')
            // Keep first 4 rows (headers), remove the rest
            for (let i = headerRows.length - 1; i >= 4; i--) {
                headerRows[i].remove()
            }
        }

        if (mainTable2) {
            // Keep header rows, remove data rows if any exist  
            const tbody = mainTable2.querySelector('tbody')
            const headerRows = tbody.querySelectorAll('tr')
            // Keep first 4 rows (headers), remove the rest
            for (let i = headerRows.length - 1; i >= 4; i--) {
                headerRows[i].remove()
            }
        }

        setLoadStatus('Checking organization unit...')

        // Check organization unit and start loading report
        checkSelectedOrganisationUnit()
            .then((orgType) => {
                console.log("Organization type determined:", orgType)
                setLoadStatus(`Organization type: ${orgType.type || 'Unknown'}`)
                orgHirch = orgType;
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

                // Start the loading process
                setTimeout(() => {
                    console.log("Starting loadReport process...")
                    setLoadStatus('Loading report data...')
                    loadReport()
                }, 500)
            })
            .catch((error) => {
                console.error("Error checking organization unit:", error)
                setLoadStatus('Error checking org unit, using fallback...')
                // Fallback to default loading
                setTimeout(() => {
                    console.log("Fallback: Starting loadReport process...")
                    setLoadStatus('Loading report data (fallback)...')
                    loadReport()
                }, 500)
            })
    }

    function checkSelectedOrganisationUnit() {
        return new Promise((resolve, reject) => {
            enhancedMockFunctions.get("/api/organisationUnits/" + orgUnitSelectedID + ".json?fields=id,organisationUnitGroups[id],level", function (json) {
                orgUnitSelectedGroupID = json.organisationUnitGroups
                if (orgUnitSelectedID == "LOdti1gATwC") { //TW
                    orgHirch = (LEVEL_ORG_SELECT_TYPE.TW)
                } else if (json.organisationUnitGroups.some(x => x.id == "mH8ggZyC39Z")) { //Tinh
                    orgHirch = (LEVEL_ORG_SELECT_TYPE.TINH)
                } else if (json.organisationUnitGroups.some(x => x.id == "W4U1KdFeIJH")) { //Huyen
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
                    sum(sumIII, "III", "Cấp xã", true)
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
                    sumTb1(sumII, "II", "Cấp xã", true)
                        .then(() => { loadReport() })
                        .catch((e) => { loadReport() })
                }
                if (load == 7) {

                    writeRow_huyen(sumII, true)
                        .then(e => { lastLoad(); })
                        .catch((e) => { lastLoad(); })
                }
                break;

            case LEVEL_ORG_SELECT_TYPE.INDIVIDUAL_TINH:
                if (load == 1) {
                    sumRow_tdv([], true)
                        .then(e => { lastLoad(); })
                        .catch((e) => { lastLoad(); })
                }
            case LEVEL_ORG_SELECT_TYPE.INDIVIDUAL_HUYEN:
            case LEVEL_ORG_SELECT_TYPE.HUYEN_TTTYT:
                if (load == 1) {
                    sumTb1_tdv([], true)
                        .then(e => { lastLoad(); })
                        .catch((e) => { lastLoad(); })
                }
            default:
                break;
        }
    }

    function lastLoad() {
        enhancedMockFunctions.p2ild.ExportDataUtils.cloneTableDataWithoutLib.apply(enhancedMockFunctions.p2ild.ExportDataUtils);
        load = 0;
        setIsLoading(false)

        // Removed approval button logic

        // Update loading state

        setLoadStatus('Data loading completed!')

        // Clear status after a few seconds
        setTimeout(() => {
            setLoadStatus('')
        }, 3000)
    }

    let sum = function (idGroups, seri, title, isGroup) {
        let htmlReport1 = "";
        let htmlReport2 = "";
        stt = 0;
        let strButton = "";

        // Removed approval button logic
        strButton = ""

        htmlReport1 += "<tr class='data-row'><td align='center'><strong>" + seri + strButton + "</strong></td>"; //1
        htmlReport2 += "<tr class='data-row'><td align='center'><strong>" + seri + "</strong></td>"; //1
        if (title == "TỔNG SỐ") {
            htmlReport1 += "<td align='center'><strong>" + title + "</strong></td>"; //2
            htmlReport2 += "<td align='center'><strong>" + title + "</strong></td>"; //2
        } else {
            htmlReport1 += "<td align='left'><strong>" + title + "</strong></td>"; //2}
            htmlReport2 += "<td align='left'><strong>" + title + "</strong></td>"; //2}
        }
        const des = "uMmm9GZneMR.AMARAl67O0W;uMmm9GZneMR.je3ZoC0J1J2;uMmm9GZneMR.W3J7OtuzmSr;uMmm9GZneMR.Ky9vKtpkbsi;rjWwV8cqhAZ;JPyFARPu7zV;LL7qpUiC3hZ;OQBOipGcNOK;dbThC9ZIqvB;DXgyPsmNqyK;Ff7B08GIU5z;HcKlezEKswk;n2yWJTs36lZ;YwZDwgKpNoD;AXPRYRVmtKV;rO33E6B0ZWO;yfdj9NBMWHW;hDGQf04ot5x;itAHBgwcw7w;wNLX1JVg5aB;gSMOBV405ZL;a99Sg2Rye5x;Ff7B08GIU5z.L8pQx55Qgli;HcKlezEKswk.L8pQx55Qgli;n2yWJTs36lZ.L8pQx55Qgli;YwZDwgKpNoD.L8pQx55Qgli;AXPRYRVmtKV.L8pQx55Qgli;hDGQf04ot5x.L8pQx55Qgli;itAHBgwcw7w.L8pQx55Qgli;wNLX1JVg5aB.L8pQx55Qgli;gSMOBV405ZL.L8pQx55Qgli;a99Sg2Rye5x.L8pQx55Qgli;Ff7B08GIU5z.E1n8AO47ANx;HcKlezEKswk.E1n8AO47ANx;n2yWJTs36lZ.E1n8AO47ANx;YwZDwgKpNoD.E1n8AO47ANx;AXPRYRVmtKV.E1n8AO47ANx;Unq2JxoZ08H;hDGQf04ot5x.E1n8AO47ANx;itAHBgwcw7w.E1n8AO47ANx;wNLX1JVg5aB.E1n8AO47ANx;gSMOBV405ZL.E1n8AO47ANx;a99Sg2Rye5x.E1n8AO47ANx;oYEG52Q9lF9;qt7P3z8zfHr;iE3PisJv4UD;heFbKPFOAYX;VUujYXiLcQo;RrIm3S7jizc;teZ9uzWsdC8;IAEwNuqpwJ6;RyVb0zCOSm5;glJjiwPA4nz;i4GretwfRCc;itvyP8whBc4;PJ3NRljqpdC;ak98gs8nPyq;LbJkh0Bhfdj;JHh30oApLHO;q8Vt5iqopMh;gzQmDaPEAOt;bX0BZBY87ey;eT2Ghp7Dhhj;heFbKPFOAYX.L8pQx55Qgli;VUujYXiLcQo.L8pQx55Qgli;RrIm3S7jizc.L8pQx55Qgli;teZ9uzWsdC8.L8pQx55Qgli;IAEwNuqpwJ6.L8pQx55Qgli;RyVb0zCOSm5.L8pQx55Qgli;glJjiwPA4nz.L8pQx55Qgli;i4GretwfRCc.L8pQx55Qgli;LbJkh0Bhfdj.L8pQx55Qgli;JHh30oApLHO.L8pQx55Qgli;q8Vt5iqopMh.L8pQx55Qgli;gzQmDaPEAOt.L8pQx55Qgli;bX0BZBY87ey.L8pQx55Qgli;eT2Ghp7Dhhj.L8pQx55Qgli;heFbKPFOAYX.E1n8AO47ANx;VUujYXiLcQo.E1n8AO47ANx;RrIm3S7jizc.E1n8AO47ANx;teZ9uzWsdC8.E1n8AO47ANx;IAEwNuqpwJ6.E1n8AO47ANx;RyVb0zCOSm5.E1n8AO47ANx;glJjiwPA4nz.E1n8AO47ANx;i4GretwfRCc.E1n8AO47ANx;LbJkh0Bhfdj.E1n8AO47ANx;JHh30oApLHO.E1n8AO47ANx;q8Vt5iqopMh.E1n8AO47ANx;gzQmDaPEAOt.E1n8AO47ANx;bX0BZBY87ey.E1n8AO47ANx;eT2Ghp7Dhhj.E1n8AO47ANx"
        return new Promise((resolve, reject) => {
            enhancedMockFunctions.get("/api/analytics.json?dimension=dx:" + des + "&dimension=ou:" + stringGroups(idGroups, orgUnitSelectedID) + "&filter=pe:" + periods + "&skipRounding=true", function (json) {
                //---------------------------------- TB1 ----------------------------------
                //default sumRow
                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["uMmm9GZneMR.AMARAl67O0W"], undefined) + "</strong></td>"; //3
                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["uMmm9GZneMR.je3ZoC0J1J2"], undefined) + "</strong></td>"; //4
                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["uMmm9GZneMR.W3J7OtuzmSr"], undefined) + "</strong></td>"; //5
                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["uMmm9GZneMR.Ky9vKtpkbsi"], undefined) + "</strong></td>"; //6
                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["JPyFARPu7zV"], undefined, DATA_TYPE.MONEY) + "</strong></td>"; //7
                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["dbThC9ZIqvB"], undefined, DATA_TYPE.MONEY) + "</strong></td>"; //8
                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["Ff7B08GIU5z"], undefined, DATA_TYPE.MONEY) + "</strong></td>"; //9
                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["HcKlezEKswk"], undefined, DATA_TYPE.MONEY) + "</strong></td>"; //10
                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["n2yWJTs36lZ"], undefined, DATA_TYPE.MONEY) + "</strong></td>"; //11
                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["YwZDwgKpNoD"], undefined, DATA_TYPE.MONEY) + "</strong></td>"; //12
                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["AXPRYRVmtKV"], undefined, DATA_TYPE.MONEY) + "</strong></td>"; //13
                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["yfdj9NBMWHW"], undefined, DATA_TYPE.MONEY) + "</strong></td>"; //8
                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["hDGQf04ot5x"], undefined, DATA_TYPE.MONEY) + "</strong></td>"; //15
                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["itAHBgwcw7w"], undefined, DATA_TYPE.MONEY) + "</strong></td>"; //16
                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["wNLX1JVg5aB"], undefined, DATA_TYPE.MONEY) + "</strong></td>"; //17
                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["gSMOBV405ZL"], undefined, DATA_TYPE.MONEY) + "</strong></td>"; //18
                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["a99Sg2Rye5x"], undefined, DATA_TYPE.MONEY) + "</strong></td>"; //19

                htmlReport1 += "</tr>";

                //---------------------------------- TB2 ----------------------------------

                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["oYEG52Q9lF9"], undefined, DATA_TYPE.MONEY) + "</strong></td>"; //3
                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["heFbKPFOAYX"], undefined, DATA_TYPE.MONEY) + "</strong></td>"; //4
                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["VUujYXiLcQo"], undefined, DATA_TYPE.MONEY) + "</strong></td>"; //5
                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["RrIm3S7jizc"], undefined, DATA_TYPE.MONEY) + "</strong></td>"; //7
                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["teZ9uzWsdC8"], undefined, DATA_TYPE.MONEY) + "</strong></td>"; //8
                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["IAEwNuqpwJ6"], undefined, DATA_TYPE.MONEY) + "</strong></td>"; //9
                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["RyVb0zCOSm5"], undefined, DATA_TYPE.MONEY) + "</strong></td>"; //10
                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["glJjiwPA4nz"], undefined, DATA_TYPE.MONEY) + "</strong></td>"; //11
                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["i4GretwfRCc"], undefined, DATA_TYPE.MONEY) + "</strong></td>"; //12
                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["ak98gs8nPyq"], undefined, DATA_TYPE.MONEY) + "</strong></td>"; //13
                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["LbJkh0Bhfdj"], undefined, DATA_TYPE.MONEY) + "</strong></td>"; //14
                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["JHh30oApLHO"], undefined, DATA_TYPE.MONEY) + "</strong></td>"; //15
                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["q8Vt5iqopMh"], undefined, DATA_TYPE.MONEY) + "</strong></td>"; //16
                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["gzQmDaPEAOt"], undefined, DATA_TYPE.MONEY) + "</strong></td>"; //17
                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["bX0BZBY87ey"], undefined, DATA_TYPE.MONEY) + "</strong></td>"; //18
                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["eT2Ghp7Dhhj"], undefined, DATA_TYPE.MONEY) + "</strong></td>"; //19

                htmlReport2 += "</tr>";
                $("#formreport #mainTable1").append(htmlReport1);
                $("#formreport #mainTable2").append(htmlReport2);

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
    function remapResultByAncestor(json, levelOrgDestination, functionMap) {
        // json.metaData.dimensions.ou = json.metaData.dimensions.ou.filter(e => json.metaData.items[e]?.name);
        const mExec = async function (resolve, reject) {
            try {
                var dh = defineHeader(json.headers)
                let result = cloneObject(json);

                //Let prepare dataByHierarchy
                let missingOuHierarchy = json.metaData.dimensions.ou.filter(a => !json.metaData.ouHierarchy[a]);
                let dataHierarchyAddition = await $.get(`../api/organisationUnits.json?fields=id,name,path,ancestors[id,name,level]&filter=id:in:[${missingOuHierarchy.join(',')}]`).catch((e) => reject(e));

                var getOrgIDByLevel = function (strAncestor, ouID) {
                    let mStrResult = ""
                    strAncestor = strAncestor || dataHierarchyAddition?.find(e => e.id == ouID)?.path;

                    //format ancestor string lv1/lv2/lv3/lv4
                    if (!strAncestor?.includes("LOdti1gATwC")) {
                        strAncestor = "LOdti1gATwC/" + strAncestor
                    }
                    mStrResult = strAncestor.substr(12 * (levelOrgDestination - 1), 11);

                    if (!mStrResult || mStrResult == "") {
                        console.log(`!!Warn: ArrayOutOfRange OugAfterSubString:${mStrResult}. Please check orgPath:${strAncestor}[levelDes:[${levelOrgDestination}])`)
                        mStrResult = ouID
                    } else if (missingOuHierarchy.includes(ouID)) {
                        result.metaData.ouHierarchy[mStrResult] = dataHierarchyAddition?.find(e => e.id == ouID).ancestors.find(e => e.level == levelOrgDestination - 1);
                    }

                    return mStrResult
                }


                //remap array "metadata.dimensions.ou" match to "levelOrgDestination"
                result.metaData.dimensions.ou = result.metaData.dimensions.ou.reduce((total, a, index, arrOrigin) => {
                    let orgIdByLevel = getOrgIDByLevel(json.metaData.ouHierarchy[a], a);
                    if (orgIdByLevel != "") total.push(orgIdByLevel)
                    return total
                }, []).filter(function (v, i, a) {
                    return a.indexOf(v) === i
                })

                //Count child of each ou is levelOrgDestination
                result.metaData.dimensions.countChildByLevel = cloneObject(result.metaData.dimensions.ou).map((e) => {
                    let arrOu = cloneObject(json.metaData.dimensions.ou)
                        .filter((m) => { return getOrgIDByLevel(json.metaData.ouHierarchy[m], m).includes(e) });
                    return [
                        e,
                        arrOu.length
                    ]
                })
                // handle function map
                if (functionMap) {
                    result = await functionMap(result, rawData = json)
                }
                result.rows = result.rows.map(data => {
                    data.push({
                        originalOu: {
                            id: data[dh.iOu],
                            path: json.metaData.ouHierarchy[data[1]],
                            name: json.metaData.items[data[dh.iOu]]
                        }
                    });
                    data[dh.iOu] = getOrgIDByLevel(json.metaData.ouHierarchy[data[1]], data[1]);
                    return data
                })
                resolve(result)
            } catch (e) {
                reject(e)
            }
        }
        return new Promise((resolve, reject) => {
            mExec(resolve, reject)
        })
    }

    // Additional functions from old.js
    function stringGroups(groups, orgUnitSelectedID) {
        /**
         * parse OU demension and push to Api
         * @param groups listOrg
         * @param orgUnitSelectedID Org selected
         * 
         */
        if (groups == undefined) {
            return ""
        } else if (0 == groups.length) {
            return orgUnitSelectedID
        } else {
            return (groups.map(e => "OU_GROUP-" + e + ";")).join("") + orgUnitSelectedID
        }
    }

    // writeRow function
    let writeRow = function (idGroups, isGroup, remapJson, parentTitle) {
        stt = 0;
        let htmlReport1 = "";
        let htmlReport2 = "";
        let childOrg = [];
        const des = "uMmm9GZneMR.AMARAl67O0W;uMmm9GZneMR.je3ZoC0J1J2;uMmm9GZneMR.W3J7OtuzmSr;uMmm9GZneMR.Ky9vKtpkbsi;JPyFARPu7zV;dbThC9ZIqvB;oYEG52Q9lF9;rjWwV8cqhAZ;LL7qpUiC3hZ;OQBOipGcNOK;DXgyPsmNqyK;Ff7B08GIU5z;HcKlezEKswk;n2yWJTs36lZ;YwZDwgKpNoD;AXPRYRVmtKV;rO33E6B0ZWO;yfdj9NBMWHW;hDGQf04ot5x;itAHBgwcw7w;wNLX1JVg5aB;gSMOBV405ZL;a99Sg2Rye5x";
        let urlSubRow = "/api/analytics.json?dimension=dx:" + des + "&filter=pe:" + periods + "&skipRounding=true&dimension=ou:"
        return new Promise((resolve, reject) => {
            enhancedMockFunctions.get(urlSubRow + stringGroups(idGroups, orgUnitSelectedID), function (json) {
                if (remapJson) json = remapJson;
                childOrg = json.metaData?.dimensions?.ou || [];

                childOrg.sort(function (a, b) {
                    if ((json.metaData?.items?.[a]?.name || '') < (json.metaData?.items?.[b]?.name || '')) return -1;
                    if ((json.metaData?.items?.[a]?.name || '') > (json.metaData?.items?.[b]?.name || '')) return 1;
                    return 0;
                });

                childOrg.forEach(function (childID) {
                    stt++;
                    htmlReport1 += getRowDataWithoutCatTb1(stt, json, json.metaData?.items?.[childID]?.name || 'Unknown', childID, idGroups);
                    htmlReport2 += getRowDataWithoutCatTb2(stt, json, json.metaData?.items?.[childID]?.name || 'Unknown', childID);
                });

                $("#formreport #mainTable1").append(htmlReport1);
                $("#formreport #mainTable2").append(htmlReport2);
                resolve();
            }).catch(e => {
                reject(e);
            });
        });
    };

    // writeRowByLevelOrgAggregate function
    let writeRowByLevelOrgAggregate = function (idGroups, isGroup, levelOrgAggregate) {
        const des = "uMmm9GZneMR.AMARAl67O0W;uMmm9GZneMR.je3ZoC0J1J2;uMmm9GZneMR.W3J7OtuzmSr;uMmm9GZneMR.Ky9vKtpkbsi;JPyFARPu7zV;dbThC9ZIqvB;oYEG52Q9lF9;rjWwV8cqhAZ;LL7qpUiC3hZ;OQBOipGcNOK;DXgyPsmNqyK;Ff7B08GIU5z;HcKlezEKswk;n2yWJTs36lZ;YwZDwgKpNoD;AXPRYRVmtKV;rO33E6B0ZWO;yfdj9NBMWHW;hDGQf04ot5x;itAHBgwcw7w;wNLX1JVg5aB;gSMOBV405ZL;a99Sg2Rye5x";
        return new Promise((resolve, reject) => {
            enhancedMockFunctions.get("/api/analytics.json?dimension=dx:" + des + "&dimension=ou:" + stringGroups(idGroups, orgUnitSelectedID) + "&filter=pe:" + periods + "&hierarchyMeta=true&skipRounding=true")
                .then((json) => {
                    remapResultByAncestor(json, levelOrgAggregate).then((remapJson) => {
                        writeRow(idGroups, isGroup, remapJson).then(() => resolve()).catch((e) => reject(e));
                    });
                });
        });
    };

    // sumTb1 function - exact logic from old.js
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
            enhancedMockFunctions.get("/api/analytics.json?dimension=dx:" + des + "&dimension=ou:" + stringGroups(idGroups, orgUnitSelectedID) + "&filter=pe:" + periods + "&skipRounding=true", function (json) {
                //filter row without org closed 

                //---------------------------------- TB1 ----------------------------------
                //default sumRow
                //Phân loại tự chủ
                const arrTuChu = filterTuChu(json, orgUnitSelectedID)
                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["uMmm9GZneMR.AMARAl67O0W"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//3
                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["uMmm9GZneMR.je3ZoC0J1J2"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//4
                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["uMmm9GZneMR.W3J7OtuzmSr"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//5
                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["uMmm9GZneMR.Ky9vKtpkbsi"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//6

                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["JPyFARPu7zV"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//7
                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["dbThC9ZIqvB"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//8

                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["Ff7B08GIU5z"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//9
                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["HcKlezEKswk"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//10
                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["n2yWJTs36lZ"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//11
                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["YwZDwgKpNoD"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//12
                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["AXPRYRVmtKV"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//13

                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["yfdj9NBMWHW"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//14
                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["hDGQf04ot5x"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//15
                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["itAHBgwcw7w"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//16
                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["wNLX1JVg5aB"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//17
                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["gSMOBV405ZL"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//18
                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["a99Sg2Rye5x"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//19

                //2SubRow sum (KCB + YTCC)
                if (sumI_1_3 == idGroups) {
                    htmlReport1 += "</tr><tr><td align='center'>" + seri + ".2.1</td>";
                    htmlReport1 += "<td align='center'>Hoạt động khám chữa bệnh</td>"; //2
                    htmlReport1 += "<td align='center'><strong>" + filterTuChu(json)[PHAN_LOAI_TU_CHU.TOTAL][0] + "</strong></td>";//3
                    htmlReport1 += "<td align='center'><strong>" + filterTuChu(json)[PHAN_LOAI_TU_CHU.TOTAL][1] + "</strong></td>";//4
                    htmlReport1 += "<td align='center'><strong>" + filterTuChu(json)[PHAN_LOAI_TU_CHU.TOTAL][2] + "</strong></td>";//5
                    htmlReport1 += "<td align='center'><strong>" + filterTuChu(json)[PHAN_LOAI_TU_CHU.TOTAL][3] + "</strong></td>";//6
                    htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["rjWwV8cqhAZ"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//4
                    htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["OQBOipGcNOK"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//5
                    htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["Ff7B08GIU5z.L8pQx55Qgli"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//6
                    htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["HcKlezEKswk.L8pQx55Qgli"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//3
                    htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["n2yWJTs36lZ.L8pQx55Qgli"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//4
                    htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["YwZDwgKpNoD.L8pQx55Qgli"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//5
                    htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["AXPRYRVmtKV.L8pQx55Qgli"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//6
                    htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["rO33E6B0ZWO"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//3
                    htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["hDGQf04ot5x.L8pQx55Qgli"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//4
                    htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["itAHBgwcw7w.L8pQx55Qgli"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//5
                    htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["wNLX1JVg5aB.L8pQx55Qgli"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//6
                    htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["gSMOBV405ZL.L8pQx55Qgli"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//3
                    htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["a99Sg2Rye5x.L8pQx55Qgli"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//4
                    htmlReport1 += "</tr>";
                    htmlReport1 += "</tr><tr><td align='center'>" + seri + ".2.2</td>";
                    htmlReport1 += "<td align='center'>Hoạt động Y tế dự phòng, YTCC</td>"; //2
                    htmlReport1 += "<td align='center'><strong>" + filterTuChu(json)[PHAN_LOAI_TU_CHU.TOTAL][0] + "</strong></td>";//3
                    htmlReport1 += "<td align='center'><strong>" + filterTuChu(json)[PHAN_LOAI_TU_CHU.TOTAL][1] + "</strong></td>";//4
                    htmlReport1 += "<td align='center'><strong>" + filterTuChu(json)[PHAN_LOAI_TU_CHU.TOTAL][2] + "</strong></td>";//5
                    htmlReport1 += "<td align='center'><strong>" + filterTuChu(json)[PHAN_LOAI_TU_CHU.TOTAL][3] + "</strong></td>";//6
                    htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["LL7qpUiC3hZ"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//4
                    htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["DXgyPsmNqyK"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//5
                    htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["Ff7B08GIU5z.E1n8AO47ANx"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//6
                    htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["HcKlezEKswk.E1n8AO47ANx"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//3
                    htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["n2yWJTs36lZ.E1n8AO47ANx"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//4
                    htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["YwZDwgKpNoD.E1n8AO47ANx"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//5
                    htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["AXPRYRVmtKV.E1n8AO47ANx"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//6
                    htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["Unq2JxoZ08H"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//3
                    htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["hDGQf04ot5x.E1n8AO47ANx"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//4
                    htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["itAHBgwcw7w.E1n8AO47ANx"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//5
                    htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["wNLX1JVg5aB.E1n8AO47ANx"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//6
                    htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["gSMOBV405ZL.E1n8AO47ANx"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//3
                    htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["a99Sg2Rye5x.E1n8AO47ANx"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//4
                }
                htmlReport1 += "</tr>";
                //---------------------------------- TB2 ----------------------------------
                if (sumI_1_3 == idGroups || sumII == idGroups) {
                    htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["qt7P3z8zfHr", "iE3PisJv4UD"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//3
                } else {
                    htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["oYEG52Q9lF9"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//3
                }
                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["heFbKPFOAYX"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//4
                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["VUujYXiLcQo"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//5
                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["RrIm3S7jizc"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//7
                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["teZ9uzWsdC8"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//8
                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["IAEwNuqpwJ6"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//9
                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["RyVb0zCOSm5"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//10
                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["glJjiwPA4nz"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//11
                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["i4GretwfRCc"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//12
                if (sumI_1_3 == idGroups || sumII == idGroups) {
                    htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["PJ3NRljqpdC", "ak98gs8nPyq"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//3
                } else {
                    htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["itvyP8whBc4"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//3
                }
                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["LbJkh0Bhfdj"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//14
                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["JHh30oApLHO"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//15
                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["q8Vt5iqopMh"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//16
                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["gzQmDaPEAOt"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//17
                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["bX0BZBY87ey"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//18
                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["eT2Ghp7Dhhj"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//19
                if (idGroups == sumI_1_3) {
                    htmlReport2 += "</tr><tr><td align='center'>" + seri + ".2.1</td>";
                    htmlReport2 += "<td align='center'>Hoạt động khám chữa bệnh</td>"; //2
                    htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["qt7P3z8zfHr"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//3
                    htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["heFbKPFOAYX.L8pQx55Qgli"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//4
                    htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["VUujYXiLcQo.L8pQx55Qgli"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//5
                    htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["RrIm3S7jizc.L8pQx55Qgli"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//4
                    htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["teZ9uzWsdC8.L8pQx55Qgli"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//5
                    htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["IAEwNuqpwJ6.L8pQx55Qgli"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//6
                    htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["RyVb0zCOSm5.L8pQx55Qgli"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//3
                    htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["glJjiwPA4nz.L8pQx55Qgli"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//4
                    htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["i4GretwfRCc.L8pQx55Qgli"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//5
                    htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["PJ3NRljqpdC"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//6
                    htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["LbJkh0Bhfdj.L8pQx55Qgli"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//3
                    htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["JHh30oApLHO.L8pQx55Qgli"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//4
                    htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["q8Vt5iqopMh.L8pQx55Qgli"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//5
                    htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["gzQmDaPEAOt.L8pQx55Qgli"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//6
                    htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["bX0BZBY87ey.L8pQx55Qgli"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//3
                    htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["eT2Ghp7Dhhj.L8pQx55Qgli"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//4
                    htmlReport2 += "</tr>";
                    htmlReport2 += "</tr><tr><td align='center'>" + seri + ".2.2</td>";
                    htmlReport2 += "<td align='center'>Hoạt động Y tế dự phòng, YTCC</td>"; //2
                    htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["iE3PisJv4UD"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//3
                    htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["heFbKPFOAYX.E1n8AO47ANx"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//5
                    htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["VUujYXiLcQo.E1n8AO47ANx"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//6
                    htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["RrIm3S7jizc.E1n8AO47ANx"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//4
                    htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["teZ9uzWsdC8.E1n8AO47ANx"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//5
                    htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["IAEwNuqpwJ6.E1n8AO47ANx"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//6
                    htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["RyVb0zCOSm5.E1n8AO47ANx"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//3
                    htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["glJjiwPA4nz.E1n8AO47ANx"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//4
                    htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["i4GretwfRCc.E1n8AO47ANx"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//5
                    htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["ak98gs8nPyq"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//6
                    htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["LbJkh0Bhfdj.E1n8AO47ANx"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//3
                    htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["JHh30oApLHO.E1n8AO47ANx"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//4
                    htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["q8Vt5iqopMh.E1n8AO47ANx"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//5
                    htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["gzQmDaPEAOt.E1n8AO47ANx"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//6
                    htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["bX0BZBY87ey.E1n8AO47ANx"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//3
                    htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["eT2Ghp7Dhhj.E1n8AO47ANx"], undefined, DATA_TYPE.MONEY) + "</strong></td>";//4
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

    // writeRow_huyen function - exact logic from old.js
    function writeRow_huyen(idGroups, isGroup) {
        let htmlReport1 = "";
        let htmlReport2 = "";
        var childOrg = [];
        const des = "uMmm9GZneMR.AMARAl67O0W;uMmm9GZneMR.je3ZoC0J1J2;uMmm9GZneMR.W3J7OtuzmSr;uMmm9GZneMR.Ky9vKtpkbsi;AHjo8UIXD3A.HllvX50cXC0;AHjo8UIXD3A.L8pQx55Qgli;AHjo8UIXD3A.E1n8AO47ANx;rjWwV8cqhAZ;LL7qpUiC3hZ;OQBOipGcNOK;DXgyPsmNqyK;Ff7B08GIU5z;HcKlezEKswk;n2yWJTs36lZ;YwZDwgKpNoD;AXPRYRVmtKV;rO33E6B0ZWO;yfdj9NBMWHW;hDGQf04ot5x;itAHBgwcw7w;wNLX1JVg5aB;gSMOBV405ZL;a99Sg2Rye5x;Ff7B08GIU5z.L8pQx55Qgli;HcKlezEKswk.L8pQx55Qgli;n2yWJTs36lZ.L8pQx55Qgli;YwZDwgKpNoD.L8pQx55Qgli;AXPRYRVmtKV.L8pQx55Qgli;hDGQf04ot5x.L8pQx55Qgli;itAHBgwcw7w.L8pQx55Qgli;wNLX1JVg5aB.L8pQx55Qgli;gSMOBV405ZL.L8pQx55Qgli;a99Sg2Rye5x.L8pQx55Qgli;Ff7B08GIU5z.E1n8AO47ANx;HcKlezEKswk.E1n8AO47ANx;n2yWJTs36lZ.E1n8AO47ANx;YwZDwgKpNoD.E1n8AO47ANx;AXPRYRVmtKV.E1n8AO47ANx;Unq2JxoZ08H;hDGQf04ot5x.E1n8AO47ANx;itAHBgwcw7w.E1n8AO47ANx;wNLX1JVg5aB.E1n8AO47ANx;gSMOBV405ZL.E1n8AO47ANx;a99Sg2Rye5x.E1n8AO47ANx;qt7P3z8zfHr;iE3PisJv4UD;heFbKPFOAYX;VUujYXiLcQo;RrIm3S7jizc;teZ9uzWsdC8;IAEwNuqpwJ6;RyVb0zCOSm5;glJjiwPA4nz;i4GretwfRCc;PJ3NRljqpdC;ak98gs8nPyq;LbJkh0Bhfdj;JHh30oApLHO;q8Vt5iqopMh;gzQmDaPEAOt;bX0BZBY87ey;eT2Ghp7Dhhj;heFbKPFOAYX.L8pQx55Qgli;VUujYXiLcQo.L8pQx55Qgli;RrIm3S7jizc.L8pQx55Qgli;teZ9uzWsdC8.L8pQx55Qgli;IAEwNuqpwJ6.L8pQx55Qgli;RyVb0zCOSm5.L8pQx55Qgli;glJjiwPA4nz.L8pQx55Qgli;i4GretwfRCc.L8pQx55Qgli;LbJkh0Bhfdj.L8pQx55Qgli;JHh30oApLHO.L8pQx55Qgli;q8Vt5iqopMh.L8pQx55Qgli;gzQmDaPEAOt.L8pQx55Qgli;bX0BZBY87ey.L8pQx55Qgli;eT2Ghp7Dhhj.L8pQx55Qgli;heFbKPFOAYX.E1n8AO47ANx;VUujYXiLcQo.E1n8AO47ANx;RrIm3S7jizc.E1n8AO47ANx;teZ9uzWsdC8.E1n8AO47ANx;IAEwNuqpwJ6.E1n8AO47ANx;RyVb0zCOSm5.E1n8AO47ANx;glJjiwPA4nz.E1n8AO47ANx;i4GretwfRCc.E1n8AO47ANx;LbJkh0Bhfdj.E1n8AO47ANx;JHh30oApLHO.E1n8AO47ANx;q8Vt5iqopMh.E1n8AO47ANx;gzQmDaPEAOt.E1n8AO47ANx;bX0BZBY87ey.E1n8AO47ANx;eT2Ghp7Dhhj.E1n8AO47ANx"
        return new Promise((resolve, reject) => {
            enhancedMockFunctions.get("/api/analytics.json?dimension=dx:" + des + "&dimension=ou:" + stringGroups(idGroups, orgUnitSelectedID) + "&filter=pe:" + periods + "&skipRounding=true", function (json) {

                childOrg = json.metaData.dimensions.ou;
                childOrg.sort(function (a, b) {
                    if (json.metaData.items[a].name < json.metaData.items[b].name) return -1;
                    if (json.metaData.items[a].name > json.metaData.items[b].name) return 1;
                    return 0;
                })
                console.log(childOrg)
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
            }).catch(e => {
                reject(e);
            });
        })
    }

    // sumRow_tdv function - exact logic from old.js
    function sumRow_tdv(idGroups, seri, title, isGroup) {
        let htmlReport1 = "";
        let htmlReport2 = "";
        stt = 0;

        htmlReport1 += "<tr><td align='center'><strong></strong></td>"; //1
        htmlReport2 += "<tr><td align='center'><strong></strong></td>"; //1
        const des = "uMmm9GZneMR.AMARAl67O0W;uMmm9GZneMR.je3ZoC0J1J2;uMmm9GZneMR.W3J7OtuzmSr;uMmm9GZneMR.Ky9vKtpkbsi;rjWwV8cqhAZ;JPyFARPu7zV;LL7qpUiC3hZ;OQBOipGcNOK;dbThC9ZIqvB;DXgyPsmNqyK;Ff7B08GIU5z;HcKlezEKswk;n2yWJTs36lZ;YwZDwgKpNoD;AXPRYRVmtKV;rO33E6B0ZWO;yfdj9NBMWHW;hDGQf04ot5x;itAHBgwcw7w;wNLX1JVg5aB;gSMOBV405ZL;a99Sg2Rye5x;Ff7B08GIU5z.L8pQx55Qgli;HcKlezEKswk.L8pQx55Qgli;n2yWJTs36lZ.L8pQx55Qgli;YwZDwgKpNoD.L8pQx55Qgli;AXPRYRVmtKV.L8pQx55Qgli;hDGQf04ot5x.L8pQx55Qgli;itAHBgwcw7w.L8pQx55Qgli;wNLX1JVg5aB.L8pQx55Qgli;gSMOBV405ZL.L8pQx55Qgli;a99Sg2Rye5x.L8pQx55Qgli;Ff7B08GIU5z.E1n8AO47ANx;HcKlezEKswk.E1n8AO47ANx;n2yWJTs36lZ.E1n8AO47ANx;YwZDwgKpNoD.E1n8AO47ANx;AXPRYRVmtKV.E1n8AO47ANx;Unq2JxoZ08H;hDGQf04ot5x.E1n8AO47ANx;itAHBgwcw7w.E1n8AO47ANx;wNLX1JVg5aB.E1n8AO47ANx;gSMOBV405ZL.E1n8AO47ANx;a99Sg2Rye5x.E1n8AO47ANx;oYEG52Q9lF9;qt7P3z8zfHr;iE3PisJv4UD;heFbKPFOAYX;VUujYXiLcQo;RrIm3S7jizc;teZ9uzWsdC8;IAEwNuqpwJ6;RyVb0zCOSm5;glJjiwPA4nz;i4GretwfRCc;itvyP8whBc4;PJ3NRljqpdC;ak98gs8nPyq;LbJkh0Bhfdj;JHh30oApLHO;q8Vt5iqopMh;gzQmDaPEAOt;bX0BZBY87ey;eT2Ghp7Dhhj;heFbKPFOAYX.L8pQx55Qgli;VUujYXiLcQo.L8pQx55Qgli;RrIm3S7jizc.L8pQx55Qgli;teZ9uzWsdC8.L8pQx55Qgli;IAEwNuqpwJ6.L8pQx55Qgli;RyVb0zCOSm5.L8pQx55Qgli;glJjiwPA4nz.L8pQx55Qgli;i4GretwfRCc.L8pQx55Qgli;LbJkh0Bhfdj.L8pQx55Qgli;JHh30oApLHO.L8pQx55Qgli;q8Vt5iqopMh.L8pQx55Qgli;gzQmDaPEAOt.L8pQx55Qgli;bX0BZBY87ey.L8pQx55Qgli;eT2Ghp7Dhhj.L8pQx55Qgli;heFbKPFOAYX.E1n8AO47ANx;VUujYXiLcQo.E1n8AO47ANx;RrIm3S7jizc.E1n8AO47ANx;teZ9uzWsdC8.E1n8AO47ANx;IAEwNuqpwJ6.E1n8AO47ANx;RyVb0zCOSm5.E1n8AO47ANx;glJjiwPA4nz.E1n8AO47ANx;i4GretwfRCc.E1n8AO47ANx;LbJkh0Bhfdj.E1n8AO47ANx;JHh30oApLHO.E1n8AO47ANx;q8Vt5iqopMh.E1n8AO47ANx;gzQmDaPEAOt.E1n8AO47ANx;bX0BZBY87ey.E1n8AO47ANx;eT2Ghp7Dhhj.E1n8AO47ANx"
        return new Promise((resolve, reject) => {
            enhancedMockFunctions.get("/api/analytics.json?dimension=dx:" + des + "&dimension=ou:" + stringGroups(idGroups, orgUnitSelectedID) + "&filter=pe:" + periods + "&skipRounding=true", function (json) {
                //---------------------------------- TB1 ----------------------------------
                //default sumRow
                htmlReport1 += "<td align='center'><strong>" + json.metaData.items[orgUnitSelectedID].name + "</strong></td>"; //2
                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["uMmm9GZneMR.AMARAl67O0W"]) + "</strong></td>";//3
                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["uMmm9GZneMR.je3ZoC0J1J2"]) + "</strong></td>";//4
                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["uMmm9GZneMR.W3J7OtuzmSr"]) + "</strong></td>";//5
                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["uMmm9GZneMR.Ky9vKtpkbsi"]) + "</strong></td>";//6

                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["JPyFARPu7zV"]) + "</strong></td>";//7
                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["dbThC9ZIqvB"]) + "</strong></td>";//8

                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["Ff7B08GIU5z"]) + "</strong></td>";//9
                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["HcKlezEKswk"]) + "</strong></td>";//10
                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["n2yWJTs36lZ"]) + "</strong></td>";//11
                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["YwZDwgKpNoD"]) + "</strong></td>";//12
                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["AXPRYRVmtKV"]) + "</strong></td>";//13

                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["yfdj9NBMWHW"]) + "</strong></td>";//8
                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["hDGQf04ot5x"]) + "</strong></td>";//15
                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["itAHBgwcw7w"]) + "</strong></td>";//16
                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["wNLX1JVg5aB"]) + "</strong></td>";//17
                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["gSMOBV405ZL"]) + "</strong></td>";//18
                htmlReport1 += "<td align='center'><strong>" + getValueSum(json, ["a99Sg2Rye5x"]) + "</strong></td>";//19

                htmlReport1 += "</tr>";

                //---------------------------------- TB2 ----------------------------------
                htmlReport2 += "<td align='center'><strong>" + json.metaData.items[orgUnitSelectedID].name + "</strong></td>"; //2
                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["oYEG52Q9lF9"]) + "</strong></td>";//3
                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["heFbKPFOAYX"]) + "</strong></td>";//4
                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["VUujYXiLcQo"]) + "</strong></td>";//5
                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["RrIm3S7jizc"]) + "</strong></td>";//7
                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["teZ9uzWsdC8"]) + "</strong></td>";//8
                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["IAEwNuqpwJ6"]) + "</strong></td>";//9
                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["RyVb0zCOSm5"]) + "</strong></td>";//10
                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["glJjiwPA4nz"]) + "</strong></td>";//11
                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["i4GretwfRCc"]) + "</strong></td>";//12
                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["itvyP8whBc4"]) + "</strong></td>";//3
                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["LbJkh0Bhfdj"]) + "</strong></td>";//14
                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["JHh30oApLHO"]) + "</strong></td>";//15
                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["q8Vt5iqopMh"]) + "</strong></td>";//16
                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["gzQmDaPEAOt"]) + "</strong></td>";//17
                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["bX0BZBY87ey"]) + "</strong></td>";//18
                htmlReport2 += "<td align='center'><strong>" + getValueSum(json, ["eT2Ghp7Dhhj"]) + "</strong></td>";//19

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

    // Helper functions for row data - exact logic from old.js
    function getRowDataWithoutCatTb1(stt, json, name, childID, idGroups) {
        let strButton = ""
        // Remove approval button logic for now
        strButton = ""

        var result = "";
        result += "<tr>"
        result += "<td align='center'>" + stt + strButton + "</td>";
        result += "<td>" + name + "</td>";
        result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" +
            (getValueDE({ jsonDhis: json, de: ["uMmm9GZneMR.AMARAl67O0W"], org: childID, typeOfData: DATA_TYPE.MONEY })) + "</td>";
        result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" +
            (getValueDE({ jsonDhis: json, de: ["uMmm9GZneMR.je3ZoC0J1J2"], org: childID, typeOfData: DATA_TYPE.MONEY })) + "</td>";
        result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" +
            (getValueDE({ jsonDhis: json, de: ["uMmm9GZneMR.W3J7OtuzmSr"], org: childID, typeOfData: DATA_TYPE.MONEY })) + "</td>";
        result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" +
            (getValueDE({ jsonDhis: json, de: ["uMmm9GZneMR.Ky9vKtpkbsi"], org: childID, typeOfData: DATA_TYPE.MONEY })) + "</td>";
        result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" +
            (getValueDE({ jsonDhis: json, de: ["JPyFARPu7zV"], org: childID, typeOfData: DATA_TYPE.MONEY })) + "</td>";
        result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" +
            (getValueDE({ jsonDhis: json, de: ["dbThC9ZIqvB"], org: childID, typeOfData: DATA_TYPE.MONEY })) + "</td>";
        result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" +
            (getValueDE({ jsonDhis: json, de: ["Ff7B08GIU5z"], org: childID, typeOfData: DATA_TYPE.MONEY })) + "</td>";
        result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" +
            (getValueDE({ jsonDhis: json, de: ["HcKlezEKswk"], org: childID, typeOfData: DATA_TYPE.MONEY })) + "</td>";
        result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" +
            (getValueDE({ jsonDhis: json, de: ["n2yWJTs36lZ"], org: childID, typeOfData: DATA_TYPE.MONEY })) + "</td>";
        result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" +
            (getValueDE({ jsonDhis: json, de: ["YwZDwgKpNoD"], org: childID, typeOfData: DATA_TYPE.MONEY })) + "</td>";
        result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" +
            (getValueDE({ jsonDhis: json, de: ["AXPRYRVmtKV"], org: childID, typeOfData: DATA_TYPE.MONEY })) + "</td>";
        result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" +
            (getValueDE({ jsonDhis: json, de: ["yfdj9NBMWHW"], org: childID, typeOfData: DATA_TYPE.MONEY })) + "</td>";
        result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" +
            (getValueDE({ jsonDhis: json, de: ["hDGQf04ot5x"], org: childID, typeOfData: DATA_TYPE.MONEY })) + "</td>";
        result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" +
            (getValueDE({ jsonDhis: json, de: ["itAHBgwcw7w"], org: childID, typeOfData: DATA_TYPE.MONEY })) + "</td>";
        result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" +
            (getValueDE({ jsonDhis: json, de: ["wNLX1JVg5aB"], org: childID, typeOfData: DATA_TYPE.MONEY })) + "</td>";
        result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" +
            (getValueDE({ jsonDhis: json, de: ["gSMOBV405ZL"], org: childID, typeOfData: DATA_TYPE.MONEY })) + "</td>";
        result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" +
            (getValueDE({ jsonDhis: json, de: ["a99Sg2Rye5x"], org: childID, typeOfData: DATA_TYPE.MONEY })) + "</td>";
        result += "</tr>"

        return result
    }

    function getRowDataWithoutCatTb2(stt, json, name, childID) {
        var result = ""
        result += "<tr>"
        result += "<td align='center'>" + stt + "</td>"
        result += "<td>" + name + "</td>"
        result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (getValueDE({ jsonDhis: json, de: ["oYEG52Q9lF9"], org: childID, typeOfData: DATA_TYPE.MONEY })) + "</td>"
        result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (getValueDE({ jsonDhis: json, de: ["heFbKPFOAYX"], org: childID, typeOfData: DATA_TYPE.MONEY })) + "</td>"
        result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (getValueDE({ jsonDhis: json, de: ["VUujYXiLcQo"], org: childID, typeOfData: DATA_TYPE.MONEY })) + "</td>"
        result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (getValueDE({ jsonDhis: json, de: ["RrIm3S7jizc"], org: childID, typeOfData: DATA_TYPE.MONEY })) + "</td>"
        result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (getValueDE({ jsonDhis: json, de: ["teZ9uzWsdC8"], org: childID, typeOfData: DATA_TYPE.MONEY })) + "</td>"
        result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (getValueDE({ jsonDhis: json, de: ["IAEwNuqpwJ6"], org: childID, typeOfData: DATA_TYPE.MONEY })) + "</td>"
        result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (getValueDE({ jsonDhis: json, de: ["RyVb0zCOSm5"], org: childID, typeOfData: DATA_TYPE.MONEY })) + "</td>"
        result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (getValueDE({ jsonDhis: json, de: ["glJjiwPA4nz"], org: childID, typeOfData: DATA_TYPE.MONEY })) + "</td>"
        result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (getValueDE({ jsonDhis: json, de: ["i4GretwfRCc"], org: childID, typeOfData: DATA_TYPE.MONEY })) + "</td>"
        result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (getValueDE({ jsonDhis: json, de: ["itvyP8whBc4"], org: childID })) + "</td>"
        result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (getValueDE({ jsonDhis: json, de: ["LbJkh0Bhfdj"], org: childID })) + "</td>"
        result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (getValueDE({ jsonDhis: json, de: ["JHh30oApLHO"], org: childID })) + "</td>"
        result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (getValueDE({ jsonDhis: json, de: ["q8Vt5iqopMh"], org: childID })) + "</td>"
        result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (getValueDE({ jsonDhis: json, de: ["gzQmDaPEAOt"], org: childID })) + "</td>"
        result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (getValueDE({ jsonDhis: json, de: ["bX0BZBY87ey"], org: childID })) + "</td>"
        result += "<td align='center' style='font-family:Times, Times New Roman, Georgia, serif'>" + (getValueDE({ jsonDhis: json, de: ["eT2Ghp7Dhhj"], org: childID })) + "</td>"
        result += "</tr>"
        return result
    }

    // Call loadData instead of loadReport directly
    // loadData();

    return <div id="downloadExcel" style={{ fontFamily: 'Arial, sans-serif', margin: '20px', backgroundColor: '#f5f5f5' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            {/* Load Data Button and Status */}
            <div style={{
                margin: '10px 0',
                textAlign: 'center',
                padding: '15px',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px'
            }}>
                <button
                    onClick={loadData}
                    disabled={isLoading}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: isLoading ? '#6c757d' : '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        fontSize: '14px',
                        marginRight: '10px'
                    }}
                >
                    {isLoading ? 'Loading...' : 'Load Data'}
                </button>
                {loadStatus && (
                    <span style={{
                        color: '#28a745',
                        fontSize: '14px',
                        fontWeight: 'bold'
                    }}>
                        {loadStatus}
                    </span>
                )}
            </div>

            <table id="tableHeader" className="mainTable" border="0" width="100%" cellSpacing="0" cellPadding="0" style={{ borderCollapse: 'collapse', margin: '10px 0' }}>
                <tbody>
                    <tr>
                        <td>
                            <p id="orgUnits" align="left">&nbsp;</p>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" colSpan="19">
                            <strong style={{ fontSize: '16px' }}>TÌNH HÌNH THU CHI NGÂN SÁCH Y TẾ</strong>
                        </td>
                    </tr>
                    <tr>
                        <td className="periods" align="center" colSpan="19">&nbsp;</td>
                    </tr>
                    <tr>
                        <td>
                            <div align='left'>Biểu số 2</div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div id="formreport">
                <table id="mainTable1" width="100%" border="1" cellPadding="2" cellSpacing="0" style={{ borderCollapse: 'collapse', margin: '10px 0' }}>
                    <tbody>
                        <tr>
                            <td style={{ textAlign: "center" }} rowSpan="3">TT</td>
                            <td style={{ textAlign: "center" }} rowSpan="3">Tên cơ sở</td>
                            <td style={{ textAlign: "center" }} colSpan="4">Phân loại tự chủ</td>
                            <td style={{ textAlign: "center" }} colSpan="13">TỔNG NGUỒN THU</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: "center" }} rowSpan="2">Nhóm 1</td>
                            <td style={{ textAlign: "center" }} rowSpan="2">Nhóm 2</td>
                            <td style={{ textAlign: "center" }} rowSpan="2">Nhóm 3</td>
                            <td style={{ textAlign: "center" }} rowSpan="2">Nhóm 4</td>
                            <td style={{ textAlign: "center" }} rowSpan="2">TỔNG SỐ</td>
                            <td style={{ textAlign: "center" }} colSpan="4">Nguồn NSNN cấp chi thường xuyên</td>
                            <td style={{ textAlign: "center" }} rowSpan="2">NSNN cấp chi đầu tư và XDCB</td>
                            <td style={{ textAlign: "center" }} rowSpan="2">Kinh phí viện trợ</td>
                            <td style={{ textAlign: "center" }} colSpan="6">Nguồn thu</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: "center" }}>Tổng số</td>
                            <td style={{ textAlign: "center" }}>NSNN cấp chi thường xuyên</td>
                            <td style={{ textAlign: "center" }}>NSNN cấp chi không thường xuyên (không có CTMT)</td>
                            <td style={{ textAlign: "center" }}>NSNN cấp chi CTMT</td>
                            <td style={{ textAlign: "center" }}>Tổng số</td>
                            <td style={{ textAlign: "center" }}>Thu BHYT</td>
                            <td style={{ textAlign: "center" }}>Thu viện phí trực tiếp</td>
                            <td style={{ textAlign: "center" }}>Thu dịch vụ y tế dự phòng </td>
                            <td style={{ textAlign: "center" }}>Thu KCB theo yêu cầu</td>
                            <td style={{ textAlign: "center" }}>Các khoản thu sự nghiệp khác</td>
                        </tr>
                        <tr>
                            <td style={{ fontStyle: "italic", textAlign: "center" }}>1</td>
                            <td style={{ fontStyle: "italic", textAlign: "center" }}>2</td>
                            <td style={{ fontStyle: "italic", textAlign: "center" }}>3</td>
                            <td style={{ fontStyle: "italic", textAlign: "center" }}>4</td>
                            <td style={{ fontStyle: "italic", textAlign: "center" }}>5</td>
                            <td style={{ fontStyle: "italic", textAlign: "center" }}>6</td>
                            <td style={{ fontStyle: "italic", textAlign: "center" }}>7 =8+12+13+14</td>
                            <td style={{ fontStyle: "italic", textAlign: "center" }}>8 =9+10+11</td>
                            <td style={{ fontStyle: "italic", textAlign: "center" }}>9</td>
                            <td style={{ fontStyle: "italic", textAlign: "center" }}>10</td>
                            <td style={{ fontStyle: "italic", textAlign: "center" }}>11</td>
                            <td style={{ fontStyle: "italic", textAlign: "center" }}>12</td>
                            <td style={{ fontStyle: "italic", textAlign: "center" }}>13</td>
                            <td style={{ fontStyle: "italic", textAlign: "center" }}>14 =15+...+19</td>
                            <td style={{ fontStyle: "italic", textAlign: "center" }}>15</td>
                            <td style={{ fontStyle: "italic", textAlign: "center" }}>16</td>
                            <td style={{ fontStyle: "italic", textAlign: "center" }}>17</td>
                            <td style={{ fontStyle: "italic", textAlign: "center" }}>18</td>
                            <td style={{ fontStyle: "italic", textAlign: "center" }}>19</td>
                        </tr>
                    </tbody>
                </table>

                <table id="tableHeader2" className="mainTable" border="0" width="100%" cellSpacing="0" cellPadding="0" style={{ borderCollapse: 'collapse', margin: '10px 0' }}>
                    <tbody>
                        <tr>
                            <td align="center" colSpan="16">
                                <strong style={{ fontSize: '16px' }}>TÌNH HÌNH CHI NGÂN SÁCH Y TẾ</strong>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <table id="mainTable2" width="100%" border="1" cellPadding="2" cellSpacing="0" style={{ borderCollapse: 'collapse', margin: '10px 0' }}>
                    <tbody>
                        <tr>
                            <td style={{ textAlign: "center" }} rowSpan="3">TT</td>
                            <td style={{ textAlign: "center" }} rowSpan="3">Tên cơ sở</td>
                            <td style={{ textAlign: "center" }} rowSpan="3">TỔNG CHI</td>
                            <td style={{ textAlign: "center" }} colSpan="2">Chi nghiệp vụ</td>
                            <td style={{ textAlign: "center" }} rowSpan="3">Chi đầu tư XDCB</td>
                            <td style={{ textAlign: "center" }} rowSpan="3">Chi trả nợ đọng</td>
                            <td style={{ textAlign: "center" }} rowSpan="3">Chi khác</td>
                            <td style={{ textAlign: "center" }} rowSpan="3">Số dư cuối kỳ</td>
                            <td style={{ textAlign: "center" }} rowSpan="3">Trích lập Quỹ Khen thưởng, Phúc lợi</td>
                            <td style={{ textAlign: "center" }} rowSpan="2" colSpan="2">Trích lập Quỹ ổn định thu nhập (bao gồm chi thu nhập tăng thêm)</td>
                            <td style={{ textAlign: "center" }} rowSpan="3">Trích lập Quỹ khác </td>
                            <td style={{ textAlign: "center" }} rowSpan="3">Kinh phí cải cách tiền lương</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: "center" }} rowSpan="2">Tổng số</td>
                            <td style={{ textAlign: "center" }} colSpan="2">Trong đó</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: "center" }}>Chi thuốc của Nhà thuốc Bệnh viện</td>
                            <td style={{ textAlign: "center" }}>Chi thuốc, vật tư, hóa chất, máu.. phục vụ KC,CB</td>
                            <td style={{ textAlign: "center" }} rowSpan="1">Tổng số</td>
                            <td style={{ textAlign: "center" }} rowSpan="1">Tỷ lệ so với Tiền lương ngạch bậc (hệ số thu nhập tăng thêm)</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: "center", fontStyle: "italic" }}>1</td>
                            <td style={{ textAlign: "center", fontStyle: "italic" }}>2</td>
                            <td style={{ textAlign: "center", fontStyle: "italic" }}>20 =21+22+25+26</td>
                            <td style={{ textAlign: "center", fontStyle: "italic" }}>21</td>
                            <td style={{ textAlign: "center", fontStyle: "italic" }}>22</td>
                            <td style={{ textAlign: "center", fontStyle: "italic" }}>23</td>
                            <td style={{ textAlign: "center", fontStyle: "italic" }}>24</td>
                            <td style={{ textAlign: "center", fontStyle: "italic" }}>25</td>
                            <td style={{ textAlign: "center", fontStyle: "italic" }}>26</td>
                            <td style={{ textAlign: "center", fontStyle: "italic" }}>27</td>
                            <td style={{ textAlign: "center", fontStyle: "italic" }}>28</td>
                            <td style={{ textAlign: "center", fontStyle: "italic" }}>29 =7-20-27-28</td>
                            <td style={{ textAlign: "center", fontStyle: "italic" }}>30</td>
                            <td style={{ textAlign: "center", fontStyle: "italic" }}>31</td>
                            <td style={{ textAlign: "center", fontStyle: "italic" }}>32</td>
                            <td style={{ textAlign: "center", fontStyle: "italic" }}>33</td>
                            <td style={{ textAlign: "center", fontStyle: "italic" }}>34</td>
                            <td style={{ textAlign: "center", fontStyle: "italic" }}>35</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
}
