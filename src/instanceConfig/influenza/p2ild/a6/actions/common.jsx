import { omit } from "lodash";
import { DATA_TYPE, defineValueWithTypeData, getValueWithOption } from "../../common/DataValueUtils";
import { RenderValue } from "../../common/ui";
import { ListColumnConfigBuilder } from "../../common/ui/RowRender";

export const listColumnConfig = ListColumnConfigBuilder({
    listColumnConfig: [
        {
            key: "stt",
            label: 'TT',
            render: (props) => {
                let value = ""
                return {
                    view: <RenderValue {...{
                        value,
                    }}
                    />,
                    value,
                    ...props
                }
            }
        },
        {
            key: "Ngày, tháng ghi sổ",
            label: "Ngày, tháng ghi sổ",
            de: "eventdate",
            render: (props) => {
                let { rawDataRow, defineHeader, colConfig } = props;
                let rawValue = rawDataRow[defineHeader[colConfig.de || ""]]
                let value = defineValueWithTypeData(
                    rawValue,
                    DATA_TYPE.DATE_TIME
                );
                return {
                    view: <RenderValue {...{
                        value
                    }}
                    />,
                    rawValue,
                    value,
                    ...props
                }
            }
        },
        {
            key: "Ngày, tháng ghi sổ",
            label: "Ngày, tháng ghi sổ",
            de: "qgYbmBm4kx8.fcbbx6y83mn",
            render: (props) => {
                let { rawDataRow, defineHeader, colConfig } = props;
                let value = defineValueWithTypeData(
                    rawDataRow[defineHeader[colConfig.de || ""]],
                    DATA_TYPE.DATE_TIME
                );
                return {
                    view: <RenderValue {...{
                        value
                    }}
                    />,
                    value,
                    ...props
                }
            }
        },
        {
            key: "Đơn vị",
            label: "Đơn vị nhập",
            align: "left",
            de: "ouname",
            render: (props) => {
                let { rawDataRow, defineHeader, colConfig, orgDetails, orgSelected } = props;

                let value = rawDataRow[defineHeader[colConfig.de || ""]];
                let orgID = rawDataRow[defineHeader.ou]
                let orgAncestors = orgDetails.find(e => e.id == orgID)?.ancestors;
                let sliceEnd = orgAncestors.findIndex(e => e.level == orgSelected.level);
                orgAncestors.splice(0, sliceEnd + 1);
                value = [
                    ...orgAncestors.map(e => e.displayName), rawDataRow[defineHeader['ouname']]
                ].join('/');
                return {
                    view: <RenderValue {...{
                        value,
                        ...omit(props, ["colStyle"]) //Ignore style of sticky
                    }}
                    />,
                    value,
                    ...props
                }
            }
        },
        {
            key: "Họ và tên",
            label: "Họ và tên",
            align: 'left',
            de: "qgYbmBm4kx8.f0wPk4WKCmU",
            render: (props) => {
                let { rawDataRow, defineHeader, colConfig } = props;

                let value = rawDataRow[defineHeader[colConfig.de || ""]] ||

                //Using tooltip
                {
                    value: rawDataRow[defineHeader[colConfig.de || ""]],
                    popupData: [
                        `PSI: ${rawDataRow[defineHeader['psi']]}`,
                        `Số giấy tờ tuỳ thân: ${rawDataRow[defineHeader['qgYbmBm4kx8.W636zm2n4bX']]}`
                    ]
                };
                return {
                    view: <RenderValue {...{
                        value,
                        ...omit(props, ["colStyle"]) //Ignore style of sticky
                    }}
                    />,
                    value,
                    ...props
                }
            }
        },
        {
            key: "Giới tính",
            label: "Giới tính",
            colClassName: '',
            de: "qgYbmBm4kx8.O24nNmlRpxX",
            render: (props) => {
                let { json, rawDataRow, defineHeader, colConfig } = props;
                let value = getValueWithOption(
                    json,
                    defineHeader,
                    rawDataRow,
                    colConfig.de
                )
                return {
                    view: <RenderValue {...{
                        value,
                        ...omit(props, ["colStyle"]) //Ignore style of sticky
                    }}
                    />,
                    value,
                    ...props
                }
            }
        },
        {
            key: "Ngày tháng năm sinh",
            label: "Ngày tháng năm sinh",
            colClassName: '',
            de: "qgYbmBm4kx8.amfixvUrTEW",
            render: (props) => {
                let { rawDataRow, defineHeader, colConfig } = props;
                let value = defineValueWithTypeData(
                    rawDataRow[defineHeader[colConfig.de || ""]],
                    DATA_TYPE.DATE_TIME
                );
                return {
                    view: <RenderValue {...{
                        value
                    }}
                    />,
                    value,
                    ...props
                }
            }
        },
        {
            key: "GTTT",
            label: "GTTT",
            de: "qgYbmBm4kx8.W636zm2n4bX",
            render: (props) => {
                let { rawDataRow, defineHeader, colConfig } = props;

                let value = rawDataRow[defineHeader[colConfig.de || ""]];
                return {
                    view: <RenderValue {...{
                        value
                    }}
                    />,
                    value,
                    ...props
                }
            }
        },
        {
            key: "Địa chỉ",
            label: "Địa chỉ",
            align: "left",
            de: "qgYbmBm4kx8.RRoodjfWLoX",
            render: (props) => {
                let { rawDataRow, defineHeader, colConfig } = props;

                let value = rawDataRow[defineHeader[colConfig.de || ""]];
                return {
                    view: <RenderValue {...{
                        value,
                        ...omit(props, ["colStyle"]) //Ignore style of sticky
                    }}
                    />,
                    value,
                    ...props
                }
            }
        },
        {
            key: "Nghề nghiệp",
            label: "Nghề nghiệp",
            align: "left",
            de: "qgYbmBm4kx8.F8ONvz0jpwf",
            render: (props) => {
                let { rawDataRow, defineHeader, colConfig } = props;

                let value = rawDataRow[defineHeader[colConfig.de || ""]];
                return {
                    view: <RenderValue {...{
                        value,
                        ...omit(props, ["colStyle"]) //Ignore style of sticky
                    }}
                    />,
                    value,
                    ...props
                }
            }
        },
        {
            key: "Dân tộc",
            label: "Dân tộc",
            align: 'left',
            de: "qgYbmBm4kx8.VKt28EykKgX",
            render: (props) => {
                let { json, rawDataRow, defineHeader, colConfig } = props;
                let value = getValueWithOption(
                    json,
                    defineHeader,
                    rawDataRow,
                    colConfig.de
                )
                return {
                    view: <RenderValue {...{
                        value,
                        ...omit(props, ["colStyle"]) //Ignore style of sticky
                    }}
                    />,
                    value,
                    ...props
                }
            }
        },
        {
            key: "Ngày tháng tử  vong",
            label: "Ngày tháng tử  vong",
            de: "qgYbmBm4kx8.j3Yo9Dl5wN5",
            render: (props) => {
                let { rawDataRow, defineHeader, colConfig } = props;
                let rawValue = rawDataRow[defineHeader[colConfig.de || ""]]
                let value = defineValueWithTypeData(
                    rawValue,
                    DATA_TYPE.DATE_TIME
                );
                return {
                    view: <RenderValue {...{
                        value
                    }}
                    />,
                    rawValue,
                    value,
                    ...props
                }
            }
        },
        {
            key: "Nơi tử vong",
            label: "Nơi tử vong",
            align: "left",
            de: "qgYbmBm4kx8.tfXeGE4u5ok",
            render: (props) => {
                let { json, rawDataRow, defineHeader, colConfig } = props;
                let value = getValueWithOption(
                    json,
                    defineHeader,
                    rawDataRow,
                    colConfig.de
                )
                return {
                    view: <RenderValue {...{
                        value,
                        ...omit(props, ["colStyle"]) //Ignore style of sticky
                    }}
                    />,
                    value,
                    ...props
                }
            }
        },
        {
            key: "Nguyên nhân chính gây tử vong (ban đầu)",
            label: "Nguyên nhân chính gây tử vong",
            align: "left",
            de: "qgYbmBm4kx8.iEz9szT8t1L",
            render: (props) => {
                let { rawDataRow, defineHeader, colConfig } = props;

                let value = rawDataRow[defineHeader[colConfig.de || ""]];
                return {
                    view: <RenderValue {...{
                        value,
                        ...omit(props, ["colStyle"]) //Ignore style of sticky
                    }}
                    />,
                    value,
                    ...props
                }
            }
        },
        {
            key: "Mã VN của nguyên nhân chính gây tử vong (ban đầu)",
            label: "Mã/Nhóm mã ICD",
            align: "left",
            de: "qgYbmBm4kx8.iEz9szT8t1L",
            render: (props) => {
                let { rawDataRow, defineHeader, colConfig } = props;

                let code = rawDataRow[defineHeader[colConfig.de || ""]];
                let value = Object.entries(props.json.metaData.items).find(([key, value]) => value.code == code)?.[1]?.name;


                return {
                    view: <RenderValue {...{
                        value,
                        ...omit(props, ["colStyle"]) //Ignore style of sticky
                    }}
                    />,
                    value,
                    ...props
                }
            }
        },
        {
            key: "Đã khám/điều trị tại CSYT trong vòng 30 ngày trước khi tử vong",
            label: "Đã khám/điều trị tại CSYT trong vòng 30 ngày trước khi tử vong",
            de: "qgYbmBm4kx8.e9Fi3vqopEy",
            render: (props) => {
                let { json, rawDataRow, defineHeader, colConfig } = props;
                let value = getValueWithOption(
                    json,
                    defineHeader,
                    rawDataRow,
                    colConfig.de
                )
                return {
                    view: <RenderValue {...{
                        value
                    }}
                    />,
                    value,
                    ...props
                }
            }
        },
        {
            key: "Được CBYT chăm sóc  khi tử vong",
            label: "Được CBYT chăm sóc  khi tử vong",
            de: "qgYbmBm4kx8.gKXlrrRCNOn",
            render: (props) => {
                let { json, rawDataRow, defineHeader, colConfig } = props;
                let value = getValueWithOption(
                    json,
                    defineHeader,
                    rawDataRow,
                    colConfig.de
                )
                return {
                    view: <RenderValue {...{
                        value
                    }}
                    />,
                    value,
                    ...props
                }
            }
        },
        {
            key: "Được cấp giấy báo tử",
            label: "Được cấp giấy báo tử",
            de: "qgYbmBm4kx8.ATSqSaZnepy",
            render: (props) => {
                let { rawDataRow, defineHeader, colConfig } = props;

                let value = defineValueWithTypeData(
                    rawDataRow[defineHeader[colConfig.de || ""]],
                    DATA_TYPE.CHECK_BOX
                );
                return {
                    view: <RenderValue {...{
                        value
                    }}
                    />,
                    value,
                    ...props
                }
            }
        },
        {
            key: "Người thu thập thông tin",
            label: "Người thu thập",
            align: "left",
            de: "qgYbmBm4kx8.apLYj7N7izK",
            render: (props) => {
                let { json, rawDataRow, defineHeader, colConfig } = props;
                let value = getValueWithOption(
                    json,
                    defineHeader,
                    rawDataRow,
                    colConfig.de
                )
                return {
                    view: <RenderValue {...{
                        value,
                        ...omit(props, ["colStyle"]) //Ignore style of sticky
                    }}
                    />,
                    value,
                    ...props
                }
            }
        },
        {
            key: "Số điện thoại người nhà của trường hợp tử vong",
            label: "Số điện thoại người nhà của trường hợp tử vong",
            align: "left",
            de: "qgYbmBm4kx8.TNAffIjJ5fu",
            render: (props) => {
                let { json, rawDataRow, defineHeader, colConfig } = props;
                let value = getValueWithOption(
                    json,
                    defineHeader,
                    rawDataRow,
                    colConfig.de
                )
                return {
                    view: <RenderValue {...{
                        value,
                        ...omit(props, ["colStyle"]) //Ignore style of sticky
                    }}
                    />,
                    value,
                    ...props
                }
            }
        },
        {
            key: "Ghi chú",
            label: "Ghi chú",
            de: "qgYbmBm4kx8.rQuQyPKAX9q",
            render: (props) => {
                let { rawDataRow, defineHeader, colConfig } = props;

                let value = rawDataRow[defineHeader[colConfig.de || ""]];
                return {
                    view: <RenderValue {...{
                        value
                    }}
                    />,
                    value,
                    ...props
                }
            }
        },
    ]
});

/**
getAgeBySex(
    itemData[headerIndex.O24nNmlRpxX]//Sex
    , itemData[headerIndex.v32efSNbncR]//Year age
    , itemData[headerIndex.lzpaZruNgBK]//Month age
    , itemData[headerIndex.lR8ENNJ8S4C])

    **/

function getAgeBySex(sex, y, m, d) {
    let resultHtml = ""
    let prefix = ""
    if (y != '0' && y != '') {
        prefix = ""
    } else if (m != '0' && m != '') {
        prefix = "th"
    }
    else if (d != '0' && d != '') {
        prefix = "ng"
    } else {
        prefix = "0"
    }


    let age = (y ? parseInt(y) : 0) + (m ? parseInt(m) : 0) + (d ? parseInt(d) : 0);
    age == 0 ? age = '' : {};

    if (sex == "M") return [age + prefix, '']
    if (sex == "F") return ['', age + prefix]
}