import { cloneDeep, omit } from "lodash";
import { DATA_TYPE, defineHeader, defineValueWithTypeData, getValueDE, getValueWithOption } from "../../common/DataValueUtils";
import { RenderValue } from "../../common/ui";
import { ListColumnConfigBuilder } from "../../common/ui/RowRender";

export const listColumnConfig = ListColumnConfigBuilder({
    listColumnConfig: [
        {
            key: "stt",
            label: 'STT',
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
            key: "Ngày nhập dữ liệu vào sổ A6 điện tử",
            label: "Ngày nhập dữ liệu vào sổ A6 điện tử",
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
            label: "Đơn vị",
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
            key: "Loại giấy tờ tuỳ thân/Định danh cá nhân",
            label: "Loại giấy tờ tuỳ thân/Định danh cá nhân",
            align: 'left',
            de: "qgYbmBm4kx8.nsMLAhezeHp",
            render: (props) => {
                let { json, rawDataRow, defineHeader, colConfig } = props;
                let value = getValueWithOption(
                    json,
                    defineHeader,
                    rawDataRow,
                    colConfig.de
                )
                // let value = rawDataRow[defineHeader[colConfig.de || ""]];
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
            key: "Số giấy tờ tuỳ thân",
            label: "Số giấy tờ tuỳ thân",
            colClassName: 'line-break-anywhere ',
            align: 'left',
            de: "qgYbmBm4kx8.W636zm2n4bX",
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
            align: 'left',
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
            key: "Ngày tháng tử vong theo tư pháp (tham khảo)",
            label: "Ngày tháng tử vong theo tư pháp (tham khảo)",

            de: "qgYbmBm4kx8.TGWnfY7u1hs",
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
            key: "Nơi tử vong theo tư pháp (tham khảo)",
            label: "Nơi tử vong theo tư pháp (tham khảo)",
            align: 'left',
            de: "qgYbmBm4kx8.KGZANMISs5K",
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
            key: "Nguyên nhân chính gây tử vong (ban đầu)",
            label: "Nguyên nhân chính gây tử vong (ban đầu)",
            align: "left",
            de: "qgYbmBm4kx8.t7NHqtYqncz",
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
            label: "Mã VN của nguyên nhân chính gây tử vong (ban đầu)",
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
            key: "Nguyên nhân chính gây tử vong (xác định)",
            label: "Nguyên nhân chính gây tử vong (xác định)",
            align: "left",
            de: "qgYbmBm4kx8.f3vMvXFidOr",
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
            key: "Mã VN của nguyên nhân chính gây tử vong (xác định)",
            label: "Mã VN của nguyên nhân chính gây tử vong (xác định)",
            align: "left",
            de: "qgYbmBm4kx8.vwczPFDKv9X",
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
            key: "Có khai thác Hồ sơ sức khoẻ",
            label: "Có khai thác Hồ sơ sức khoẻ",
            de: "qgYbmBm4kx8.ksXGblaQZHL",
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
            key: "Ngày xác định nguyên nhân chính gây tử vong",
            label: "Ngày xác định nguyên nhân chính gây tử vong",
            de: "qgYbmBm4kx8.EfvY4Ig7n6n",
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
            key: "Nguyên nhân tử vong theo tư pháp (tham khảo)",
            label: "Nguyên nhân tử vong theo tư pháp (tham khảo)",
            align: "left",
            de: "qgYbmBm4kx8.vshLwzSkK1a",
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
            key: "Tình trạng đăng ký khai tử",
            label: "Tình trạng đăng ký khai tử",
            de: "qgYbmBm4kx8.ONipRLfjDrQ",
            render: (props) => {
                let { rawDataRow, defineHeader, colConfig } = props;

                let value = defineValueWithTypeData(
                    rawDataRow[defineHeader[colConfig.de || ""]],
                    DATA_TYPE.RADIO_BUTTON
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
            key: "Ngày đăng ký khai tử theo tư pháp (tham khảo)",
            label: "Ngày đăng ký khai tử theo tư pháp (tham khảo)",
            de: "qgYbmBm4kx8.zE55pkddJ0D",
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
            key: "Người thu thập thông tin",
            label: "Người thu thập thông tin",
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
            key: "Họ và tên người cung cấp thông tin",
            label: "Họ và tên người cung cấp thông tin",
            align: "left",
            de: "qgYbmBm4kx8.xFuCxD7I7dm",
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
            key: "Số điện thoại người cung cấp thông tin",
            label: "Số điện thoại người cung cấp thông tin",
            align: "left",
            de: "qgYbmBm4kx8.TNAffIjJ5fu",
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
            key: "Mối quan hệ của người cung cấp thông tin với người đã chết",
            label: "Mối quan hệ của người cung cấp thông tin với người đã chết",
            align: "left",
            de: "qgYbmBm4kx8.CCLebncCrqd",
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
        {
            key: "Trường hợp tử vong được ghi nhận từ hệ thống tư pháp",
            label: "Trường hợp tử vong được ghi nhận từ hệ thống tư pháp",
            de: "qgYbmBm4kx8.peKcCT3x7H8",
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
            key: "Ngày ghi nhận từ hệ thống tư pháp",
            label: "Ngày ghi nhận từ hệ thống tư pháp",
            de: "qgYbmBm4kx8.Hnymqs1ZflO",
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
            key: "Ngày cập nhật từ hệ thống tư pháp",
            label: "Ngày cập nhật từ hệ thống tư pháp",
            de: "qgYbmBm4kx8.v8xMS84OMhc",
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