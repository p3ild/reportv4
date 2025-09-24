import { groupBy, pick, chunk } from 'lodash';
import { getCoreMetaStateByPath, useCoreMetaState } from '@core/stateManage/metadataState';
import { defineHeader } from '../../common/DataValueUtils';
import { parallel, parallelLimit } from 'async';
import { differenceInDays, format } from 'date-fns';
import { logger } from '@core/utils/logger';
import ProgressNotificationBuilder from '@core/ui/picker/ProgressData';
const _get = useCoreMetaState.getState()._get;

export const getDataCommon = async (props) => {
    let LABEL_PULL_PATIENT_DATA = 'Đang tải dữ liệu bệnh nhân';
    let taskStatus = {
        PULL_PATIENT_DATA: {
            title: LABEL_PULL_PATIENT_DATA,
        },
    };
    let progressNotification = ProgressNotificationBuilder({
        NOTIFICATION_KEY: Math.random(),
        label: 'Đang chuẩn bị dữ liệu',
    });
    progressNotification.open(taskStatus);
    props = {
        ...props,
        // dx: props,
        DEFAULT_COL_LENGTH: props.defaultCol,
        listColumnConfig: props.listColumnConfig
    };
    let me = getCoreMetaStateByPath('me');
    let isCDCGroup = me.userGroups.some(e => e.id == 'Mca22i5o7op')
    let optionSetByID = {}

    let columnForTable = []

    function updateSpinLoading({ total, countTeiLoaded }) {
        logger.dev(`updateSpinLoading: ${total} - ${countTeiLoaded}`)
        taskStatus.PULL_PATIENT_DATA.title = LABEL_PULL_PATIENT_DATA + ' ' + `${countTeiLoaded}/${total}`
        progressNotification.open(taskStatus);
    }
    const default_optionSetPositive = [
        {
            "code": "true",
            "new": "Dương tính"
        },
        {
            "code": "false",
            "new": "Âm tính"
        }
    ];

    const default_optionSetYesNo = [
        {
            "code": "true",
            "name": "Có",
            "new": "Có"
        },
        {
            "code": "false",
            "name": "Không",
            "new": "Không"
        },
        {
            "code": "",
            "name": "",
            "new": ""
        }
    ];

    let teiMetaData = [

        {
            col: 0, id: "don_vi_gui_mau", isDimension: false, title: "Đơn vị gửi mẫu", fixed: 'left'
            , convertOutputValue: (data) => {
                let { extraInfoTei } = data;
                return extraInfoTei?.enrollmentOrgUnitName || ''
            }
        },
        {
            col: 1,
            id: "a8UKAO85uVJ",
            title: "Mã số ca giám sát (từ 1/7/2024)",
            fixed: 'left',

        },
        {
            col: 2, id: "mHlRLTlZaZU",
            title: "Mã số ca giám sát (trước 1/7/2024)",
            fixed: 'left'
        },
        {
            col: 3,
            id: "HqlaWu66lQk",
            title: "Mã bệnh án",
            fixed: 'left',
            width: 100
        },
        {
            col: 4, id: "Q6U0h0A91WE",
            title: "Mã bệnh phẩm",
            fixed: 'left',
            width: 100
        },
        {
            col: 5, id: "JdnCiW3gapd", title: "Họ tên", fixed: isCDCGroup ? '' : 'left'
        },
        {
            col: 6, id: "dlCVWnc3S6O", title: "Tuổi"
        },
        {
            col: 7, id: "yTAhxfEdQ2y", title: "Tháng tuổi"
        },
        {
            col: 8, id: "V63mZlMb7uk", title: "Giới tính", isOption: true
        },
        {
            col: 9, id: "don_vi_xet_ngiem", isDimension: false, title: "Đơn vị xét nghiệm",
            convertOutputValue: (data) => {
                let { extraInfoTei } = data;
                let ps = extraInfoTei?.events?.find(a => a.ps == 'On65MQh79YB');
                let createdBy = ps.createdByUserInfo.username;
                switch (createdBy) {
                    case "lab_bachmai":
                        return "BV Bạch Mai"
                    case "lab_nhitw":
                        return "BV Nhi Trung ương"
                    case "lab_ndhcm":
                        return "BV Nhiệt dới Hồ Chí Minh"
                    case "lab_choray":
                        return "BV Chợ Rẫy"
                    case "lab_twhue":
                        return "BV Trung ương Huế"
                }
                return createdBy
            }

        }
    ];

    const coreDhisMetadata = [

    ]

    const eventCOPDMetadata = [
        {
            id: "On65MQh79YB.esZfsAdFId1", title: "Ngày nhận bệnh phẩm"
            , col: 10, convertOutputValue: (data) => {
                let { rawValue } = data;
                return ![``].includes(rawValue) ? format(new Date(rawValue), 'dd-MM-yyyy') : ''
            }
        },
        {
            id: "On65MQh79YB.Npl5aVLRzpQ", title: "Tình trạng bệnh phẩm", isOption: true
            , col: 11
        },
        {
            id: "On65MQh79YB.kLvth8YFcab", title: "Lý do từ chối XN"
            , col: 12
        },
        {
            id: "ngay_xn", isDimension: false, title: "Ngày XN"
            , col: 13
            , convertOutputValue: (data) => {
                let { extraInfoTei } = data;
                let ps = extraInfoTei?.events?.find(a => a.ps == 'On65MQh79YB');
                if (!ps) return ''
                return ![``].includes(ps?.eventDate) ? format(new Date(ps?.eventDate), 'dd-MM-yyyy') : ''
            }
        },
        {
            id: "On65MQh79YB.CnqhmAfDijA", title: "A/H1N1pdm09"
            , col: 14, isOption: default_optionSetYesNo
        },
        {
            id: "On65MQh79YB.CnqhmAfDijA", title: "A/H1N1pdm09"
            , col: 15, isOption: default_optionSetYesNo
        },
        {
            id: "On65MQh79YB.P9cr6CXwS21", title: "CT-value - A/H1N1pdm09", col: 16
        },
        {
            id: "On65MQh79YB.ORLGGRvVvF2", title: "A/H3N2"
            , col: 17, isOption: default_optionSetYesNo
        },
        {
            id: "On65MQh79YB.BkPxBF9BQpd", title: "CT-value - A/H3N2", col: 18
        },
        {
            id: "On65MQh79YB.VRra2bvpr3r", title: "A/H5"
            , col: 19, isOption: default_optionSetYesNo
        },
        {
            id: "On65MQh79YB.UXRgFntUOpW", title: "CT-value - A/H5", col: 20
        },
        {
            id: "On65MQh79YB.VpPRdt7wIzQ", title: "A/H7"
            , col: 21, isOption: default_optionSetYesNo
        },
        {
            id: "On65MQh79YB.bzZ0B0i6urO", title: "CT-value - A/H7", col: 22
        },
        {
            id: "On65MQh79YB.not6JUfkX3L", title: "Cúm A (chưa xác định)"
            , col: 23, isOption: default_optionSetYesNo
        },
        {
            id: "On65MQh79YB.UvXUKa6R8Cq", title: "CT-value - Cúm A (chưa xác định)", col: 24
        },
        {
            id: "On65MQh79YB.UGKFXsUwY1g", title: "B Yamagata"
            , col: 25, isOption: default_optionSetYesNo
        },
        {
            id: "On65MQh79YB.Yy4GtO8xm9h", title: "CT-value - Dương tính (B Yamagata)", col: 26
        },
        {
            id: "On65MQh79YB.ALkPkfpeEHc", title: "B Victoria"
            , col: 27, isOption: default_optionSetYesNo
        },
        {
            id: "On65MQh79YB.cHZIB4e9V8w", title: "CT-value -B Victoria", col: 28
        },
        {
            id: "On65MQh79YB.i3FiWwZd6et", title: "Cúm B (chưa xác định)"
            , col: 29, isOption: default_optionSetYesNo
        },
        {
            id: "On65MQh79YB.ZHDy44BCFHQ", title: "CT-value - Cúm B (chưa xác định)", col: 30
        },
        {
            id: "On65MQh79YB.gt2Ng8ALtlX", title: "CT-value type A (ban đầu)", col: 31
        },
        {
            id: "On65MQh79YB.dd6EcosQ1tM", title: "CT-value type B (ban đầu)", col: 32
        },
        {
            id: "On65MQh79YB.n0BWbydFz5u", title: "Âm tính cúm"
            , col: 33, isOption: default_optionSetYesNo
        },
        {
            id: "On65MQh79YB.d7ZcDxFA70f", title: "SARS-CoV-2"
            , col: 34, isOption: default_optionSetPositive
        },
        {
            id: "On65MQh79YB.jZmZcF5dDDO", title: "CT-value - SARS-CoV-2 (S gene)", col: 35
        },

        {
            id: "On65MQh79YB.umyqYm01fEM", title: "CT-value - SARS-CoV-2 (RdRp gene)", col: 36
        },
        {
            id: "On65MQh79YB.KuGwdUMsNKL", title: "CT-value - SARS-CoV-2 (N gene)", col: 37
        },
        {
            id: "On65MQh79YB.OrXlyabaGoC", title: "RSV"
            , col: 38, isOption: default_optionSetPositive
        },
        {
            id: "On65MQh79YB.wf1SCFhxl8h", title: "CT-value - RSV", col: 39
        },
        {
            id: "On65MQh79YB.RAWQ3odgVNw", title: "Các vi rút cúm khác"
            , col: 40, isOption: default_optionSetYesNo
        },
        {
            id: "On65MQh79YB.r8eQHYpeIGp", title: "CT-value - Các vi rút cúm khác", col: 41
        },
        {
            id: "last_update_date_of_event_On65MQh79YB", isDimension: false, title: "Ngày nhập thông tin ca bệnh"
            , col: 42, convertOutputValue: (data) => {
                let { event, jsonHeaders, rawValue, extraInfoTei } = data;
                let createdDateEvent = extraInfoTei.events.find(e => e.ps == 'On65MQh79YB')?.created;
                return format(new Date(createdDateEvent), 'dd-MM-yyyy') || ""
            }
        },
        {
            id: "daysBetween(enrollmentDate_last_update_date_of_event_On65MQh79YB)", isDimension: false, title: "Số ngày từ khi lấy mẫu đến khi nhập vào hệ thống"
            , col: 43, convertOutputValue: (data) => {
                let { event, jsonHeaders, rawValue, extraInfoTei } = data;
                let createdDateEvent = extraInfoTei.events.find(e => e.ps == 'On65MQh79YB')?.created;
                let diffDay = differenceInDays(new Date(createdDateEvent), new Date(extraInfoTei.enrollmentDate));
                return diffDay || ""
            }
        },
    ];


    const loadReport = async function () {
        let period = props.period;
        let orgID = props.orgUnit;
        let apiTeiByEnrollmentDate = `/api/analytics/enrollments/query/A381Q22G8kJ.json?&dimension=pe:${period}&dimension=ou:${orgID}&paging=false`;

        let apiRows = await _get(apiTeiByEnrollmentDate);
        apiRows = apiRows;
        let listColumn = [...teiMetaData, ...eventCOPDMetadata, ...coreDhisMetadata];
        optionSetByID = await getOptionSetByID({ listColumn });

        let dataOutput = await prepareDataTable({
            json: apiRows,
            listColumn
        })
        taskStatus.PULL_PATIENT_DATA.status = true;
        progressNotification.open(taskStatus);
        return dataOutput;

    }

    const getOptionSetByID = async function ({ listColumn }) {
        let objectID = listColumn.map(foundCol => {
            let idWithStage = foundCol.id.split('.');
            let stage, elementID;

            if (idWithStage.length > 1) { // get value DE. Must with state like TydLYSi5F0r.rz0F067VnjC
                [stage, elementID] = idWithStage;
                return elementID
            } else { // Attribute. Only attributeUID
                return foundCol.id;
            }
        });
        let findOptionSetByDataElementID = await getCoreMetaStateByPath('networkUtils').findOptionSetByObjectID({
            dataElements: objectID,
            attributes: objectID,
        });
        return findOptionSetByDataElementID;
    }

    const prepareDataTable = async function ({ json, listColumn }) {
        let dataAsArray = [];
        let dataForTable = [];
        let dataForExcel = [];
        //re get data optionSets


        let jsonHeaders = defineHeader(json.headers, true)

        await getOptionForOrgGSOAttribute(
            {
                listGSO: json.rows.reduce((rs, row) => {
                    rs = rs.concat(
                        teiMetaData.filter(a => a.isOptionGSO)
                            .map(b => row[jsonHeaders[b.id]])
                    ).filter(e => ![undefined, ''].includes(e))
                    return rs
                }, [])
            }
        );

        let data = groupBy(json.rows, jsonHeaders.tei)
        let idx = 0;
        //For list tei
        let dataGroupByTei = Object.keys(data);
        let countTeiLoaded = 0;
        let rs = await parallelLimit(
            dataGroupByTei.map(
                teiID => cb => {
                    (async () => {
                        let initRow = await getTeiEventToArray({
                            oriJson: json, jsonHeaders,
                            teiID, teiData: data[teiID], listColumn
                        });
                        if (initRow) {
                            cb(null, initRow)
                            countTeiLoaded++;
                            updateSpinLoading({ total: dataGroupByTei.length, countTeiLoaded: countTeiLoaded });

                        } else {
                            cb(null, undefined)
                        }

                    })();
                }
            ), 3
        ).then(allTei => {
            allTei.filter(e => e).forEach(initRow => {
                dataAsArray.push(initRow.dataAsArray)
                dataForTable.push(initRow.rowForTable)
                dataForExcel.push(initRow.rowForExcel)
            })

        })

        return { dataAsArray, dataForTable, dataForExcel }
    }

    async function getExtraInfoTeiData({ teiID }) {
        let rs = {
            rawData: undefined
        }

        let pullTeiData;
        try {
            pullTeiData =
                await _get([
                    `/api/trackedEntityInstances/${teiID}.json?`
                    , `program=A381Q22G8kJ`
                    , `&fields=*`
                ].join(''))
        } catch (e) {
            return { error: e }
            if ([404].includes(pullTeiData?.data?.httpStatusCode)) { return { error: pullTeiData } }
        }




        rs.rawData = pullTeiData;
        let enrollTei = pullTeiData.enrollments[0];

        rs['enrollmentOrgUnitName'] = enrollTei.orgUnitName;
        rs['enrollmentOrgUnit'] = enrollTei.orgUnit;
        rs['enrollmentDate'] = enrollTei.enrollmentDate;
        rs['events'] = pullTeiData.enrollments[0].events.map(a => {
            return {
                ps: a.programStage,
                ...pick(a,
                    [
                        'lastUpdated',
                        "created",
                        "orgUnit",
                        "orgUnitName",
                        "eventDate",
                        "dataValues",
                        "createdByUserInfo.username"
                    ]
                )
            }
        })

        return rs
    }

    async function getTeiEventToArray(data) {
        let { oriJson, jsonHeaders, stt, teiID, teiData, listColumn } = data
        //Get monthDataTT37 for tt37
        let extraInfoTei = await getExtraInfoTeiData({ teiID });
        if (extraInfoTei?.events?.some(ev => ev?.ps === "On65MQh79YB")) {
            if (extraInfoTei?.error) { return undefined }
            return getRowData({ stt, listColumn, extraInfoTei });
        } else {
            return undefined
        }


        //Prepare each event data book
        function getRowData({ stt, listColumn, monthDataTT37, extraInfoTei }) {
            let rowForTable = {};
            let rowForExcel = {};
            let tempColumnForTable = [];

            let maxCol = listColumn.filter(e => { return e.col }).sort((a, b) => { return a.col - b.col });
            maxCol = maxCol[maxCol.length - 1].col + 1
            let dataAsArray = Array(maxCol).fill('').map((value, colIdx, arrOutput) => {
                if (value != undefined && value != '') return value
                // if (colIdx == 0) return stt

                let foundCol = listColumn.find(e => e.col == colIdx)
                if (!foundCol) { return ''; }
                let idWithStage = foundCol.id.split('.');
                let stage, elementID, event, rawValue;

                if (idWithStage.length > 1) { // get value DE. Must with state like TydLYSi5F0r.rz0F067VnjC
                    let stage = idWithStage[0];
                    elementID = idWithStage[1]
                    // [stage, elementID] = idWithStage;
                    let stageExtra = extraInfoTei?.events?.find(e => e.ps == stage);
                    rawValue = stageExtra?.dataValues?.find(e => e.dataElement == elementID)?.value || ""
                } else { // Attribute. Only attributeUID
                    //  {
                    elementID = foundCol.id;
                    //   event = Object.values(eventByStage)[0][0];
                    //   event = event?.map(e => { return e ? e : "" });
                    //   rawValue = event?.[jsonHeaders[elementID]] || "";
                    // }
                    rawValue = extraInfoTei?.rawData?.attributes?.find(attr => attr.attribute == elementID)?.value || ''
                }


                switch (true) {
                    case foundCol.isOption != undefined:
                        rawValue == ''
                            ? value = ''
                            : value = getValueAsOptionName({ listColumn, jsonMetaData: oriJson.metaData, rawValue, de: elementID })
                        break;
                    case foundCol.convertOutputValue != undefined:
                        let paramsCallback = { listColumn, jsonMetaData: oriJson.metaData, jsonHeaders, event, teiData, foundCol, rawValue, arrOutput, extraInfoTei }
                        value = foundCol.convertOutputValue(paramsCallback)
                        break
                    default:
                        value = rawValue
                        break;
                }

                //Decrypt value to blank if user is not in group
                if (
                    isCDCGroup
                ) {
                    value = ''
                }
                rowForTable[foundCol.id] = value;
                rowForExcel[foundCol.title] = value;
                if (columnForTable.length === 0) {
                    tempColumnForTable.push(
                        {
                            title: foundCol.title,
                            dataIndex: foundCol.id,
                            key: foundCol.id,
                            width: 200,
                            fixed: foundCol?.fixed
                        }

                    )
                }
                return value;


            }).map(e => { return e ? e : "" });

            if (columnForTable.length === 0) {
                columnForTable = tempColumnForTable;
            }
            return { dataAsArray, rowForTable, rowForExcel }
        }

    }

    const getValueAsOptionName = function (data) {
        let { listColumn, jsonMetaData, rawValue, de } = data
        let boilerplateIsOption = [//boilerplate for isOption as object
            {
                "code": "1",
                "name": "Nhẹ: FEV1 >= 80%",//Name isnt require
                "new": "Nhẹ"//new name is require

            },
            {
                "code": "2",
                "name": "Trung bình: 50% <= FEV1 < 80%",
                "new": "Trung bình"
            }
        ]
        let foundCol = listColumn.find(e => e.id.includes(de))
        switch (true) {
            case typeof (foundCol?.isOption) == 'object'://isOption attach object newName
                return foundCol.isOption
                    .find(e => e.code == rawValue)?.new || ""
            case foundCol?.isOption://isOption is boolean
                // return jsonMetaData.optionSets.find(e=>e.name == de)
                // ?.optionSet
                // ?.options?.find(e=>e.code == rawValue)?.name;
                let option = optionSetByID?.[de]?.optionSet?.options?.find(e => e.code == rawValue);
                let value = "";
                value = foundCol?.outputAsCode ? option?.code : option?.name
                return value;
            default://Call direct without foundCol
                console.info('getValueAsOptionName: switch to default')
                return jsonMetaData.dimensions[de]
                    ?.map(e => jsonMetaData.items[e])
                    .find(e => e.code == rawValue)?.name || ""
        }
    }

    const getOptionForOrgGSOAttribute = async function ({ listGSO }) {
        let listRq = chunk(listGSO, 100).map(items => {
            return cb => _get([
                `${host}/api/organisationUnits.json?fields=:owner&filter=code:in:[`
                , items.join(',')
                , `]&paging=false`
            ].join('')
            ).then(e => cb(null, e))
        })
        let organisationUnits = [];
        let pull = await parallelLimit(listRq, 3);
        organisationUnits = pull.reduce((rs, item) => {
            rs = [...rs, ...item.data.organisationUnits];
            return rs;
        }, []);
        teiMetaData.forEach(e => {
            if (e.isOptionGSO) {
                e.isOption = organisationUnits.map(a => {
                    return {
                        "code": a.code,
                        "name": a.name,
                        "new": a.name
                    }
                })
            }
        })
    }

    let dataByRow = await loadReport().then(e => e.dataAsArray)



    let HeaderUI = props.HeaderUI
    return {
        TableHeader: <HeaderUI {
            ...{ listColumnConfig: props.listColumnConfig, title: props.title }
        } />,
        dataByRow,
        pager: {
            total: dataByRow.length,
            page: 1,
            pageSize: 100
        }
    }
}
