import { Tooltip, List, Tag } from "antd";
import {
    CloseCircleOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';

const trans = ({ }) => {
    return "Implement trans"
}
export const DATA_TYPE = {
    NUMBER: 1,
    CHECK_BOX: 2,
    RADIO_BUTTON: 3,
    MONEY: 4,
    RATE: 5
}

export const RenderValue = ({ options, colClassName, colStyle, align, value }) => {
    if (value == undefined) return;
    let error = undefined;

    let rawValue = value?.value || value;
    let dataType = value?.dataType;
    if (value?.popupData != undefined) {
        rawValue = value.value;
    }

    let displayValue = 'Lỗi'
    let className = [],
        attr = {}
        , style = {
            // textAlign: "center",
            // whiteSpace: "pre-wrap"
        };
    if (options?.rowBold == true) {
        attr['data-f-bold'] = true;
        style.fontWeight = "bold";
    }
    let uiDisplayValue = <p {...attr}>{rawValue}</p>;





    if (align) {
        style.textAlign = align;
    }

    if (colClassName) {
        className = [colClassName, ...className]
    }
    if (colStyle) {
        style = { ...colStyle, ...style }
    }

    let valueOnly = (data) => <p {...attr} className={className.join(' ')} style={{
        ...error?.styles,
        ...style
    }}> {data}</p>

    if (options?.notAvailable) {
        className.push('bg-slate-400')
        return valueOnly('')
    }

    uiDisplayValue = valueOnly(rawValue)
    switch (true) {
        case [''].includes(rawValue):
            displayValue = 0;
            break;
        case ['NaN', 'Infinity'].includes(rawValue):
            displayValue = rawValue || trans("noti.validFraction");

            uiDisplayValue = <Tag className={className.join(' ')} style={{
                whiteSpace: "pre-wrap"
            }} icon={<CloseCircleOutlined />} color="error">
                {displayValue}
            </Tag>
            break;
        case dataType == DATA_TYPE.RATE && parseFloat(rawValue) > 100:
            displayValue = rawValue;
            uiDisplayValue = <div {...attr}>
                {valueOnly(displayValue)}
                <Tag className={className.join(' ')} style={{
                    whiteSpace: "pre-wrap"
                }} icon={<ExclamationCircleOutlined />} color="error">
                    {trans("noti.over100percentage")}
                </Tag>
            </div>
            break;
        default: break;
    }

    if (value.popupData) {
        return <Tooltip
            title={<List
                dataSource={value.popupData}
                renderItem={(item) => <List.Item style={{ color: 'white' }}>{item}</List.Item>
                }
            />}
            color={'orange'}
            key={'popup_data'}>
            {uiDisplayValue}
        </Tooltip>
    }
    return uiDisplayValue
}