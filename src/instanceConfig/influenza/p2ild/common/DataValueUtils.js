
/**
 * dataValueUtil
 */

import { format } from "date-fns";

export const DATA_TYPE = {
    NUMBER: 1,
    CHECK_BOX: 2,
    RADIO_BUTTON: 3,
    MONEY: 4,
    RATE: 5,
    STRING: 6,
    DATE_TIME: 7
}
export function getValueWithOption(json, headerIndex, itemData, deID) {
    let arrOption = json.metaData.dimensions[deID];
    let optionID = itemData[headerIndex[deID]]
    if (optionID == "") { return "" }
    let arrItems = Object.keys(json.metaData.items).map((key) => [key, json.metaData.items[key]])
    let resultOptionItem = arrItems.find(e => { return e[1].code == optionID && arrOption.includes(e[0]) })
    return resultOptionItem ? resultOptionItem[1].name : ""
}

export function getValueDE({ jsonDhis, de, co, org, typeOfData, isConvertToNumberWithThousand = false, pe }) {
    /*
    @param listJson: singleJson or arrayJson return api from dhis. Ex: api/analystic.json .... 
    @param de:
        option 1 : String(de UID) 
        option 2 : Array String
    @param valueReturn:
    */
    /*
    @param jsonDhis: return api from dhis. Ex: api/analystic.jsonDhis .... 
    @param de:
        option 1 : String(de UID) 
        option 2 : Array String
    @param valueReturn:
    */
    let dh = defineHeader(jsonDhis.headers);
    var valueReturn;
    if (jsonDhis.rows.length == 0) {
        if ([DATA_TYPE.RADIO_BUTTON, DATA_TYPE.CHECK_BOX, DATA_TYPE.STRING].includes(typeOfData)) {
            return "";
        } else {
            return 0;
        }
    }

    //Multi DE
    if (de instanceof Array) {
        valueReturn = 0;
        de.forEach(function (deItem) {
            jsonDhis.rows.forEach((eDataValue, idx, arr) => {
                if (
                    eDataValue[dh.iDe] == deItem &&
                    (co ? eDataValue[dh.iCo] == co : true) &&
                    (org ? eDataValue[dh.iOu] == org : true) &&
                    (pe ? eDataValue[dh.iPe] == pe : true)
                ) {
                    var value = eDataValue[dh.iValue];
                    if (typeOfData == DATA_TYPE.MONEY) {
                        valueReturn = sumMoney(valueReturn, value)
                    } else {
                        valueReturn += defineValueWithTypeData(value, typeOfData);
                    }
                }
            })
        });
    }
    //Single DE
    else {
        if ([DATA_TYPE.RADIO_BUTTON, DATA_TYPE.CHECK_BOX, DATA_TYPE.STRING].includes(typeOfData)) {
            valueReturn = "";
        } else {
            valueReturn = 0;
        }

        jsonDhis.rows.forEach((eDataValue, idx, arr) => {
            if (eDataValue[dh.iDe] == de &&
                (co ? eDataValue[dh.iCo] == co : true) &&
                (org ? eDataValue[dh.iOu] == org : true) &&
                (pe ? eDataValue[dh.iPe] == pe : true)
            ) {
                if (typeOfData == DATA_TYPE.STRING) valueReturn = defineValueWithTypeData(eDataValue[dh.iValue], typeOfData)

                else if (typeOfData == DATA_TYPE.MONEY) valueReturn = sumMoney(valueReturn, eDataValue[dh.iValue])

                else valueReturn += defineValueWithTypeData(eDataValue[dh.iValue], typeOfData);
            }
        });

    }

    if (
        (isConvertToNumberWithThousand != undefined || isConvertToNumberWithThousand == false)
        || [DATA_TYPE.RADIO_BUTTON, DATA_TYPE.CHECK_BOX, DATA_TYPE.STRING].includes(typeOfData)
    ) {
        return valueReturn
    } else {
        return numberWithThousands(valueReturn)
    }
}

export function getLastesPeriodValueByAncestor(periods, json, de, ou, isConvertToNumberWithThousand) {
    /**
     * INUPT:
     * require json is output from remapResultByAncestor()
     * require dimension pe (exam: ..api/../dimension=dx:...&demension=pe:...)
     * 
     * OUTPUT:
     * return value of the last @param periods
     */
    var dh
    let lastesPeriod = periods.split(";").pop();
    try {
        dh = defineHeader(json.headers);
    } catch (e) {
        console.log("require METADATA in json response")
        return 0;
    }

    let result = cloneObject(json)

    result.rows = result.rows.filter(row => row[dh.iDe] == de).filter(e => {
        return result.metaData.ouHierarchy[ou] == undefined ?
            result.metaData.ouHierarchy[e[dh.iOu]].includes(ou) :
            e[dh.iOu] == ou
    })

    let outputResult =
        //filter row match de,ou and with last pe exists data
        cloneObject(result.metaData.dimensions.ou).reduce((newRows, childOu) => {
            var row =
                result.rows.filter(m => m[dh.iOu] == childOu && m[dh.iPe] == lastesPeriod).length != 0 ?
                    result.rows.filter(m => m[dh.iOu] == childOu && m[dh.iPe] == lastesPeriod).sort((a, b) => b[dh.iPe] - a[dh.iPe])[0] : {}
            newRows.push(row)
            return newRows
        }, [])
            //Sum de
            .reduce((sum, row) => {
                return sum += row[dh.iValue] != undefined ? defineValueWithTypeData(row[dh.iValue]) : 0, sum
            }, 0);
    if (isConvertToNumberWithThousand != undefined || isConvertToNumberWithThousand == false) {
        return outputResult
    } else {
        return numberWithThousands(outputResult)
    }
}

function cloneObject(object) {
    return JSON.parse(JSON.stringify(object));
}


export function getLastesPeriodValue(periods, json, de, ou, isConvertToNumberWithThousand) {
    /**
     * require dimension pe (exam: ..api/../dimension=dx:...&demension=pe:...)
     * return value of the last @param periods
     */
    var dh
    try {
        dh = defineHeader(json.headers);
    } catch (e) {
        console.log("require metadata in json response")
        return 0;
    }
    let lastesPeriod = periods.split(";").pop();
    let r = (null != ou) ?
        /**
         * deprecate : use for get last period have value
           json.rows.filter(e => e[dh.iDe] == de && e[dh.iOu] == ou).sort((a, b) => b[dh.iPe] - a[dh.iPe]) :
           json.rows.filter(e => e[dh.iDe] == de).sort((a, b) => b[dh.iPe] - a[dh.iPe])
         */
        json.rows.filter(e => e[dh.iDe] == de && e[dh.iOu] == ou && e[dh.iPe] == lastesPeriod).sort((a, b) => b[dh.iPe] - a[dh.iPe]) :
        json.rows.filter(e => e[dh.iDe] == de && e[dh.iPe] == lastesPeriod).sort((a, b) => b[dh.iPe] - a[dh.iPe])
    if (isConvertToNumberWithThousand != undefined || isConvertToNumberWithThousand == false) {
        return r[0] == null ? 0 : defineValueWithTypeData(r[0][dh.iValue])
    } else {
        return r[0] == null ? 0 : numberWithThousands(defineValueWithTypeData(r[0][dh.iValue]))
    }
}


export function defineValueWithTypeData(value, typeOfData) {
    if (typeOfData == null) {
        typeOfData = DATA_TYPE.NUMBER; //default is number;
    }

    switch (typeOfData) {
        case DATA_TYPE.STRING:
            if (value == null) {
                return "";
            } else {
                return value;
            }
        case DATA_TYPE.NUMBER:
            if (value == null) {
                return 0;
            } else {
                return parseFloat(value);
            }
        case DATA_TYPE.CHECK_BOX:
            if (value == 1.0) {
                return "x";
            } else {
                return "";
            }
            break;
        case DATA_TYPE.RADIO_BUTTON:
            if (value == 1.0) {
                return "Có";
            } else if (value == 0) {
                return "Không";
            }
        case DATA_TYPE.DATE_TIME:
            if (!value) return ''
            let dateConvert = new Date(value)//parse(value, 'yyyy-mm-dd', new Date());
            return format(dateConvert, 'dd-MM-yyyy');
            break;
        default:
            break;
    }
}

export function defineHeader(jsonHeaderDhis, defineAll) {
    return !defineAll
        ? jsonHeaderDhis.reduce((total, eHeader, idx, arr) => {
            if (eHeader.name == "dx") total['iDe'] = idx
            if (eHeader.name == "co") total['iCo'] = idx
            else if (eHeader.name == "ou") total['iOu'] = idx;
            else if (eHeader.name == "pe") total['iPe'] = idx;
            else if (eHeader.name == "value") total['iValue'] = idx;

            return total
        }, {})
        : jsonHeaderDhis.reduce((total, eHeader, idx, arr) => {
            total[eHeader.name] = idx;
            return total
        }, {})
        ;
}

export function numberWithThousands(num, isRevert) {

    if (['', undefined, 'undefined'].includes(num)) return 0;
    let n = num.toString(),
        p = n.indexOf(',');
    // if (n.split('.').length > 1) return num
    if (isRevert) {
        return parseFloat(
            n
                .replace(/[^\d^\,^-]/g, '')//keep digit & , & - and replace other to '' 
                .replace(/\,/g, '.')//replace ( , ) to ''
        )
    } else {
        let result = '0';
        let arrDecimal = n.split(".")
        if (arrDecimal.length == 1) {
            result = n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, function ($0, i) {
                return p < 0 || i < p ? ($0 + '.') : $0;
            });
        } else {
            let nWholeNumber = n.split(".")[0].replace(/\d(?=(?:\d{3})+(?:\.|$))/g, function ($0, i) {
                return p < 0 || i < p ? ($0 + '.') : $0;
            })
            let nDecimal = n.split(".")[1]
            result = `${nWholeNumber},${nDecimal}`
        }
        return result
    }
}


export function sumMoney(a, b) {
    function roundMoney(mAmount) { // roundMoney
        /**
         * For money's unit is Million (triệu đồng)
         */
        let mAmountToString = mAmount + ""
        let tryDecimal = mAmountToString.split(".")

        if (tryDecimal.length == 1) { // is whole number
            return mAmount
        } else { // is decimal
            // let wholeNumberPart = tryDecimal[0]
            // let decimalPart = tryDecimal[1]

            // let countWholeNumberPart = wholeNumberPart.split('')
            // let countDecimalPart = decimalPart.split('')
            // mFixed = (countWholeNumberPart.length > countDecimalPart.length) ? (Math.pow(10, countDecimalPart.length)) : (Math.pow(10, countWholeNumberPart.length));
            return roundNumber(mAmountToString, 3)
        }
    }
    return roundMoney(roundMoney(a) + roundMoney(b))
}

export function roundNumber(number, fixed = 0, toString) {
    let mFixed = Math.pow(10, fixed)
    let rs = Math.round(parseFloat(number.toString()) * mFixed) / mFixed;
    if (toString) {
        rs = rs.toString().replace(/\./g, ',');
    }
    return rs

}

export function getValueSum(json, de, ou, typeOfData) {
    var dh = defineHeader(json.headers),

        resultSum = 0;
    // typeOfData != null
    return (
        null != ou ?
            json.rows.filter(function (e) {
                return de instanceof Array ?
                    de.includes(e[dh.iDe]) && e[dh.iOu] == ou :
                    e[dh.iDe] == de && e[dh.iOu] == ou
            }) :
            json.rows.filter(function (e) {
                return de instanceof Array ?
                    de.includes(e[dh.iDe]) :
                    e[dh.iDe] == de
            })).forEach(function (e) {
                if (typeOfData == DATA_TYPE.MONEY) {
                    resultSum = sumMoney(resultSum, e[dh.iValue])
                } else {
                    resultSum += parseFloat(defineValueWithTypeData(e[dh.iValue], typeOfData))
                }
            }), numberWithThousands(resultSum);
}
