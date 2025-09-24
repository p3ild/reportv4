import { omit } from "lodash";
import { DATA_TYPE, defineValueWithTypeData, getValueWithOption } from "../../common/DataValueUtils";
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
            key: "Hospital_code",
            label: 'Hospital code',
            de: 'oucode',
            render: (props) => {
                let { json, rawDataRow, defineHeader, colConfig } = props;
                let value = (rawDataRow[defineHeader[colConfig.de || ""]]);
                value = value?.replace('F', '')
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
            },
        },
        {
            key: "order_require",
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
            key: "",
            colClassName: 'line-break-anywhere ',
            align: 'left',
            de: 'oSxAjrStVj4.tMhNfMPlea0',
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
            key: "",
            colClassName: 'line-break-anywhere ',
            align: 'left',
            de: 'oSxAjrStVj4.fAjreCUH5LS',
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
            key: "",
            colClassName: 'line-break-anywhere ',
            align: 'left',
            de: 'oSxAjrStVj4.imgjthupvbQ',
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
            key: "",
            colClassName: 'line-break-anywhere ',
            align: 'left',
            de: 'oSxAjrStVj4.JDXLd6II1Li',
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
            key: "",
            colClassName: 'line-break-anywhere ',
            align: 'left',
            de: 'oSxAjrStVj4.abACvIJh6xW',
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
            key: "",
            colClassName: 'line-break-anywhere ',
            align: 'left',
            de: 'oSxAjrStVj4.V1KvUGrW74D',
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
            key: "",
            colClassName: 'line-break-anywhere ',
            align: 'left',
            de: 'oSxAjrStVj4.wI87C5tKztz',
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
            key: "",
            colClassName: 'line-break-anywhere ',
            align: 'left',
            de: 'oSxAjrStVj4.Fs5MsYKIAup',
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
            key: "",
            colClassName: 'line-break-anywhere ',
            align: 'left',
            de: 'oSxAjrStVj4.uTZxkgJ6MK7',
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
            key: "",
            colClassName: 'line-break-anywhere ',
            align: 'left',
            de: 'oSxAjrStVj4.hb7YfSdXs7K',
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
            key: "",
            colClassName: 'line-break-anywhere ',
            align: 'left',
            de: 'oSxAjrStVj4.OXh9oS81aot',
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
            key: "",
            colClassName: 'line-break-anywhere ',
            align: 'left',
            de: 'oSxAjrStVj4.ceDgKzhxaFr',
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
            key: "",
            colClassName: 'line-break-anywhere ',
            align: 'left',
            de: 'oSxAjrStVj4.By3WuKlefGD',
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