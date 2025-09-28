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

    // Updated metadata from dsbv.js
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
            col: 2,
            id: "mHlRLTlZaZU",
            title: "Mã số ca giám sát (trước 1/7/2024)",
            fixed: 'left',

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
            col: 9, id: "dgVezB0RUIZ", title: "Địa chỉ (Tỉnh)", isOptionGSO: true
        },
        {
            col: 10, id: "BIFHWWJR2XX", title: "Địa chỉ  (Xã)", isOptionGSO: true
        },
    ];

    const coreDhisMetadata = []

    const eventCOPDMetadata = [
        {
            id: "TydLYSi5F0r.rz0F067VnjC", title: "Khoa Phòng"
            , col: 11
        },
        {
            id: "TydLYSi5F0r.GkWVHuIIbeC", title: "Ngày khởi phát"
            , col: 12, convertOutputValue: (data) => {
                let { event, jsonHeaders, rawValue } = data;

                return ![``].includes(rawValue) ? format(rawValue, 'dd-MM-yyyy') : ''
            }
        },
        {
            id: "TydLYSi5F0r.hvy77loFYSz", title: "Ho"
            , col: 13, isOption: default_optionSetYesNo
        },
        {
            id: "TydLYSi5F0r.HbxONzrAxoZ", title: "Sốt"
            , col: 14, isOption: default_optionSetYesNo
        },
        {
            id: "TydLYSi5F0r.t4I16OkmGHB", title: "Triệu chứng trong vòng 10 ngày"
            , col: 15, isOption: default_optionSetYesNo
        },
        {
            id: "TydLYSi5F0r.dCwEyKloVTJ", title: "Tiếp xúc gia cầm"
            , col: 16, isOption: true
        },
        {
            id: "TydLYSi5F0r.oOhB6l53Kr2", title: "Dùng Oseltamivir  7 ngày trước"
            , col: 17, isOption: true
        },
        {
            id: "TydLYSi5F0r.s7BiWQ81ndf", title: "Tiêm vắc xin cúm 12 tháng trờ lại"
            , col: 18, isOption: true
        },
        {
            id: "TydLYSi5F0r.sx8MkJvWZba", title: "ICD10 - Bệnh chính"
            , col: 19, isOption: true, outputAsCode: true
        },
        {
            id: "TydLYSi5F0r.TyE0pZUzfej", title: "ICD10 - Bệnh kèm theo 1"
            , col: 20, isOption: true, outputAsCode: true
        },
        {
            id: "TydLYSi5F0r.ZVOYUrIO1sA", title: "ICD10 - Bệnh kèm theo 2"
            , col: 21, isOption: true, outputAsCode: true
        },
        {
            id: "TydLYSi5F0r.CV3piEtkxQJ", title: "ICD10 - Bệnh kèm theo 3"
            , col: 22, isOption: true, outputAsCode: true
        },
        {
            id: "TydLYSi5F0r.gH0kkMOKKZ4", title: "ICD10 - Bệnh kèm theo 4"
            , col: 23, isOption: true, outputAsCode: true
        },
        {
            id: "TydLYSi5F0r.NrIxKa2sc4M", title: "ICD10 - Bệnh kèm theo 5"
            , col: 24, isOption: true, outputAsCode: true
        },

        {
            id: "ngay_lay_mau", title: "Ngày lấy mẫu", isDimension: false
            , col: 25, convertOutputValue: (data) => {
                let { event, jsonHeaders, extraInfoTei } = data;
                let foundEventTesting = extraInfoTei?.events?.find(a => a.ps == 'TydLYSi5F0r');
                if (foundEventTesting) {
                    return format(foundEventTesting.eventDate, 'dd-MM-yyyy')
                } else {
                    return ""
                }
            }
        },
        {
            id: "TydLYSi5F0r.HoyZ7upMcJN"
        },
        {
            id: "TydLYSi5F0r.MRAMvFbKHNt"
        },
        {
            id: "TydLYSi5F0r.NxGPeofbdwz"
        },
        {
            id: "TydLYSi5F0r.XUY8Rn9NWM5"
        },
        {
            id: "loai_benh_pham", isDimension: false, title: "Loại bệnh phẩm"
            , col: 26, convertOutputValue: (data) => {
                // HoyZ7upMcJN == '1' ~> Dịch tỵ hầu
                // MRAMvFbKHNt == '1' ~> Dịch ngoáy họng
                // NxGPeofbdwz == '1' ~> Dịch nội khí quản
                // XUY8Rn9NWM5 == '1' ~> Khác 
                let { event, jsonHeaders, extraInfoTei } = data;
                let foundEventTesting = extraInfoTei?.events?.find(a => a.ps == 'TydLYSi5F0r');
                if (foundEventTesting) {
                    let value = [];
                    if (foundEventTesting?.dataValues?.find(e => e.dataElement == "HoyZ7upMcJN")?.value == "true") value.push('Dịch tỵ hầu');
                    if (foundEventTesting?.dataValues?.find(e => e.dataElement == "MRAMvFbKHNt")?.value == "true") value.push('Dịch ngoáy họng');
                    if (foundEventTesting?.dataValues?.find(e => e.dataElement == "NxGPeofbdwz")?.value == "true") value.push('Dịch nội khí quản');
                    if (foundEventTesting?.dataValues?.find(e => e.dataElement == "XUY8Rn9NWM5")?.value == "true") value.push('Khác');
                    return value.join(', ');
                } else {
                    return ''
                }
            }
        },
        {
            id: "TydLYSi5F0r.Fzpv9fipOw2", title: `KQ XN nhanh`
            , col: 27, isOption: true
        },
        {
            id: "don_vi_xet_nghiem", isDimension: false, title: `Đơn vị XN`
            , col: 28
            , convertOutputValue: (data) => {
                let { extraInfoTei } = data;
                let ps = extraInfoTei?.events?.find(a => a.ps == 'On65MQh79YB');
                let createdBy = ps?.createdByUserInfo?.username;
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
        },
        {
            id: "On65MQh79YB.esZfsAdFId1", title: "Ngày nhận bệnh phẩm"
            , col: 39, convertOutputValue: (data) => {
                let { event, jsonHeaders, rawValue } = data;

                return ![``].includes(rawValue) ? format(rawValue, 'dd-MM-yyyy') : ''
            }
        },
        {
            id: "On65MQh79YB.Npl5aVLRzpQ", title: "Tình trạng bệnh phẩm"
            , col: 30, isOption: true
        },
        {
            id: "On65MQh79YB.kLvth8YFcab", title: "Lý do từ chối XN"
            , col: 31
        },
        {
            id: "ngayXetNghiem", isDimension: false, title: "Ngày XN"
            , col: 32
            , convertOutputValue: (data) => {
                let { extraInfoTei } = data;
                let ps = extraInfoTei?.events?.find(a => a.ps == 'On65MQh79YB');
                if (!ps) return ''
                return format(ps?.eventDate, 'dd-MM-yyyy') || ''
            }
        },
        {
            id: "On65MQh79YB.CnqhmAfDijA", title: "A/H1N1pdm09"
            , col: 33, isOption: default_optionSetYesNo
        },
        {
            id: "On65MQh79YB.P9cr6CXwS21", title: "CT-value - A/H1N1pdm09", col: 34
        },
        {
            id: "On65MQh79YB.ORLGGRvVvF2", title: "A/H3N2"
            , col: 35, isOption: default_optionSetYesNo
        },
        {
            id: "On65MQh79YB.BkPxBF9BQpd", title: "CT-value - A/H3N2", col: 36
        },
        {
            id: "On65MQh79YB.VRra2bvpr3r", title: "A/H5"
            , col: 37, isOption: default_optionSetYesNo
        },
        {
            id: "On65MQh79YB.UXRgFntUOpW", title: "CT-value - A/H5", col: 38
        },
        {
            id: "On65MQh79YB.VpPRdt7wIzQ", title: "A/H7"
            , col: 39, isOption: default_optionSetYesNo
        },
        {
            id: "On65MQh79YB.bzZ0B0i6urO", title: "CT-value - A/H7", col: 40
        },
        {
            id: "On65MQh79YB.not6JUfkX3L", title: "Cúm A (chưa xác định)"
            , col: 41, isOption: default_optionSetYesNo
        },
        {
            id: "On65MQh79YB.UvXUKa6R8Cq", title: "CT-value - Cúm A (chưa xác định)", col: 42
        },
        {
            id: "On65MQh79YB.UGKFXsUwY1g", title: "B Yamagata"
            , col: 43, isOption: default_optionSetYesNo
        },
        {
            id: "On65MQh79YB.Yy4GtO8xm9h", title: "CT-value - Dương tính (B Yamagata)", col: 44
        },
        {
            id: "On65MQh79YB.ALkPkfpeEHc", title: "B Victoria"
            , col: 45, isOption: default_optionSetYesNo
        },
        {
            id: "On65MQh79YB.cHZIB4e9V8w", title: "CT-value -B Victoria", col: 46
        },
        {
            id: "On65MQh79YB.i3FiWwZd6et", title: "Cúm B (chưa xác định)"
            , col: 47, isOption: default_optionSetYesNo
        },
        {
            id: "On65MQh79YB.ZHDy44BCFHQ", title: "CT-value - Cúm B (chưa xác định)", col: 48
        },
        {
            id: "On65MQh79YB.gt2Ng8ALtlX", title: "CT-value type A (ban đầu)", col: 49
        },
        {
            id: "On65MQh79YB.dd6EcosQ1tM", title: "CT-value type B (ban đầu)", col: 50
        },
        {
            id: "On65MQh79YB.n0BWbydFz5u", title: "Âm tính cúm"
            , col: 51, isOption: default_optionSetYesNo
        },
        {
            id: "On65MQh79YB.d7ZcDxFA70f", title: "SARS-CoV-2"
            , col: 52, isOption: default_optionSetPositive
        },
        {
            id: "On65MQh79YB.jZmZcF5dDDO", title: "CT-value - SARS-CoV-2 (S gene)", col: 53
        },


        {
            id: "On65MQh79YB.umyqYm01fEM", title: "CT-value - SARS-CoV-2 (RdRp gene)", col: 54
        },
        {
            id: "On65MQh79YB.KuGwdUMsNKL", title: "CT-value - SARS-CoV-2 (N gene)", col: 55
        },



        {
            id: "On65MQh79YB.OrXlyabaGoC", title: "RSV"
            , col: 56, isOption: default_optionSetPositive
        },
        {
            id: "On65MQh79YB.wf1SCFhxl8h", title: "CT-value - RSV", col: 57
        },
        {
            id: "On65MQh79YB.RAWQ3odgVNw", title: "Các vi rút cúm khác"
            , col: 58, isOption: default_optionSetYesNo
        },
        {
            id: "On65MQh79YB.r8eQHYpeIGp", title: "CT-value - Các vi rút cúm khác", col: 59
        },
        {
            id: "created_date_of_event_TydLYSi5F0r", isDimension: false, title: "Ngày nhập thông tin ca bệnh"
            , col: 60, convertOutputValue: (data) => {
                let { event, jsonHeaders, rawValue, extraInfoTei } = data;
                let createdDateEvent = extraInfoTei.events.find(e => e.ps == 'TydLYSi5F0r')?.created;
                return format(createdDateEvent, 'dd-MM-yyyy') || ""
            }
        },
        {
            id: "daysBetween(enrollmentDate_created_date_of_event_TydLYSi5F0r)", isDimension: false, title: "Số ngày từ khi lấy mẫu đến khi nhập vào hệ thống"
            , col: 61, convertOutputValue: (data) => {
                let { event, jsonHeaders, rawValue, extraInfoTei } = data;
                let createdDateEvent = extraInfoTei.events.find(e => e.ps == 'TydLYSi5F0r')?.created;
                let diffDay = differenceInDays(new Date(createdDateEvent), new Date(extraInfoTei.enrollmentDate));
                return diffDay || ""
            }
        },
        {
            id: "created_date_of_event_On65MQh79YB", isDimension: false, title: "Ngày nhập kết quả XN"
            , col: 62, convertOutputValue: (data) => {
                let { event, jsonHeaders, rawValue, extraInfoTei } = data;
                let createdDateEvent = extraInfoTei.events.find(e => e.ps == 'On65MQh79YB')?.created;
                return createdDateEvent ? format(createdDateEvent, 'dd-MM-yyyy') : ""
            }
        },
        {
            id: "daysBetween(enrollmentDate_created_date_of_event_On65MQh79YB)", isDimension: false, title: "Số ngày từ khi lấy mẫu đến khi nhập kết quả XN"
            , col: 63, convertOutputValue: (data) => {
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
        let urlApiCOPD = [
            `/api/analytics/events/query/A381Q22G8kJ.json?dimension=pe:${period}&dimension=ou:${orgID}`,
            `stage=TydLYSi5F0r&paging=false`,
            teiMetaData.filter(e => e.isDimension != false && !['undefined', undefined, ''].includes(e.id)).map(
                e => e.id.split('_').map(x => "dimension=" + x).join('&')
            ).join("&"),
            eventCOPDMetadata.filter(e => e.isDimension != false && !['undefined', undefined, ''].includes(e.id)).map(
                e => e.id.split('_').map(x => "dimension=" + x).join('&')
            ).join("&")
        ].join('&');

        let apiRows = await _get(urlApiCOPD);

        let urlApiGetMetadataItem = [
            `/api/analytics/events/query/A381Q22G8kJ.json?dimension=pe:${period}&dimension=ou:${orgID}`,
            `&paging=false`,
            teiMetaData.filter(e => e.isDimension != false && !['undefined', undefined, ''].includes(e.id)).map(
                e => e.id.split('_').map(x => "dimension=" + x).join('&')
            ).join("&"),
            eventCOPDMetadata.filter(e => e.isDimension != false && !['undefined', undefined, ''].includes(e.id)).map(
                e => e.id.split('_').map(x => "dimension=" + x).join('&')
            ).join("&")
        ].join('&')

        let apiDimensions = await _get(urlApiGetMetadataItem);
        apiRows.metaData.dimensions = apiDimensions.metaData.dimensions;
        apiRows.metaData.items = apiDimensions.metaData.items;
        let dataOutput = await prepareDataTable({
            json: apiRows,
            listColumn: [...teiMetaData, ...eventCOPDMetadata, ...coreDhisMetadata]
        })

        taskStatus.PULL_PATIENT_DATA.status = true;
        progressNotification.open(taskStatus);
        return dataOutput;
    }

    const prepareDataTable = async function ({ json, listColumn }) {
        let dataAsArray = [];
        let dataForTable = [];
        let dataForExcel = [];


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
                            cb(null, [])
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
            pullTeiData = await _get([
                `/api/trackedEntityInstances/${teiID}.json?`,
                `program=A381Q22G8kJ`,
                `&fields=*`
            ].join(''))
        } catch (e) {
            return { error: e }
        }

        rs.rawData = pullTeiData;
        let enrollTei = pullTeiData.enrollments[0];

        rs['enrollmentOrgUnitName'] = enrollTei.orgUnitName;
        rs['enrollmentOrgUnit'] = enrollTei.orgUnit;
        rs['enrollmentDate'] = enrollTei.enrollmentDate;
        rs['events'] = pullTeiData.enrollments[0].events.map(a => {
            return {
                ps: a.programStage,
                ...pick(a, [
                    'lastUpdated',
                    "created",
                    "orgUnit",
                    "orgUnitName",
                    "eventDate",
                    "dataValues",
                    "createdByUserInfo.username"
                ])
            }
        })

        return rs
    }

    async function getTeiEventToArray(data) {
        let { oriJson, jsonHeaders, teiID, teiData, listColumn } = data
        let eventByStage = groupBy(teiData, jsonHeaders.ps);
        let extraInfoTei = await getExtraInfoTeiData({ teiID });
        if (extraInfoTei?.error) { return undefined }
        return getRowData({ eventByStage, listColumn, extraInfoTei });


        function getRowData({ eventByStage, listColumn, extraInfoTei }) {
            let rowForTable = {};
            let rowForExcel = {};
            let tempColumnForTable = [];

            let maxCol = listColumn.filter(e => { return e.col }).sort((a, b) => { return a.col - b.col });
            maxCol = maxCol[maxCol.length - 1].col + 1
            let dataAsArray = Array(maxCol).fill('').map((value, colIdx, arrOutput) => {
                if (value != undefined && value != '') return value

                let foundCol = listColumn.find(e => e.col == colIdx)
                if (!foundCol) { return ''; }
                let idWithStage = foundCol.id.split('.');
                let stage, elementID, event, rawValue;

                if (idWithStage.length > 1) { // get value DE. Must with state like TydLYSi5F0r.rz0F067VnjC
                    [stage, elementID] = idWithStage;
                    let stageExtra = extraInfoTei?.events?.find(e => e.ps == stage);
                    rawValue = stageExtra?.dataValues?.find(e => e.dataElement == elementID)?.value || ""
                } else { // Attribute. Only attributeUID
                    elementID = foundCol.id;
                    event = Object.values(eventByStage)[0][0];
                    event = event?.map(e => { return e ? e : "" });
                    rawValue = event?.[jsonHeaders[elementID]] || "";
                }


                switch (true) {
                    case foundCol.isOption != undefined:
                        rawValue == ''
                            ? value = ''
                            : value = getValueAsOptionName({ listColumn, jsonMetaData: oriJson.metaData, rawValue, de: foundCol?.id })
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
                    && foundCol.id == 'JdnCiW3gapd'
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
                            width: foundCol?.width || 200,
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
        let foundCol = listColumn.find(e => e.id.includes(de))
        switch (true) {
            case typeof (foundCol?.isOption) == 'object':
                return foundCol.isOption
                    .find(e => e.code == rawValue)?.new || ""
            case foundCol?.isOption:
                let option = jsonMetaData.dimensions[de]
                    ?.map(e => jsonMetaData.items[e])
                    .find(e => e.code == rawValue);
                let value = "";
                value = foundCol?.outputAsCode ? option?.code : option?.name
                return value;
            default:
                console.info('getValueAsOptionName: switch to default')
                return jsonMetaData.dimensions[de]
                    ?.map(e => jsonMetaData.items[e])
                    .find(e => e.code == rawValue)?.name || ""
        }
    }

    const getOptionForOrgGSOAttribute = async function ({ listGSO }) {
        if (listGSO.length === 0) return;

        let listRq = chunk(listGSO, 100).map(items => {
            return cb => _get([
                `/api/organisationUnits.json?fields=:owner&filter=code:in:[`,
                items.join(','),
                `]&paging=false`
            ].join('')
            ).then(e => cb(null, e))
        })
        let organisationUnits = [];
        let pull = await parallelLimit(listRq, 3);
        organisationUnits = pull.reduce((rs, item) => {
            rs = [...rs, ...item.organisationUnits];
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
