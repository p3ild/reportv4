import { Divider, Select, Tabs } from "antd"
import PeriodPicker from "./periodpicker"
import { useEffect, useMemo, useState } from "react"
import { useShallow } from "zustand/react/shallow"
import { useTranslation } from "react-i18next"
import { useCoreMetaState } from "../../../stateManage/metadataState"
import { trans, useTrans } from "../../../translation/i18n"
import { CustomCard } from "../../utils/customCard"
import dayjs from 'dayjs';
import customLocale from 'dayjs/plugin/updateLocale';
import vi from 'antd/es/date-picker/locale/vi_VN';
import CustomPickerElement from "../CustomPickerElement"
import KeepAlive from 'react-activation'
import { useCorePickerState } from "../../../stateManage/corePickerState"
import { upperFirst } from "lodash"

const VNLocale = {
    ...vi,
    lang: {
        ...vi.lang,
        today: 'Hôm nay',
        "backToToday": "Về lại hôm nay",
        // fieldMonthFormat: 'MM-YYYY',
        fieldDateFormat: 'YY-MM-DD',
        // fieldDateTimeFormat: 'DD-MM-YYYY HH:mm:ss',

        // monthFormat:'MM',
        // yearFormat: 'YYYY',
        // cellYearFormat: 'YYYY',
    }
}

export default () => {
    const { t } = useTranslation;
    const [locale, setLocale] = useState({});

    const [
        language,
    ] = useCoreMetaState(useShallow(state => [
        state.language
    ]));

    const [
        customPicker,
        corePicker,
        setCorePicker,
        allowPeriodTypes
    ] = useCorePickerState(
        useShallow(state => ([
            state.customPicker,
            state.corePicker,
            state.actions.setCorePicker,
            state.allowPeriodTypes,
        ])));



    useEffect(() => {
        if (language == 'vi') {
            dayjs.extend(customLocale);
            dayjs.updateLocale('en', {
                monthsShort: [
                    'Th1',
                    'Th2',
                    'Th3',
                    'Th4',
                    'Th5',
                    'Th6',
                    'Th7',
                    'Th8',
                    'Th9',
                    'Th10',
                    'Th11',
                    'Th12',
                ],
                months: [
                    'Tháng 1',
                    'Tháng 2',
                    'Tháng 3',
                    'Tháng 4',
                    'Tháng 5',
                    'Tháng 6',
                    'Tháng 7',
                    'Tháng 8',
                    'Tháng 9',
                    'Tháng 10',
                    'Tháng 11',
                    'Tháng 12',
                ],
                weekdaysShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
                weekdaysMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
            });
            setLocale(VNLocale)
        }
    }, [])

    let types = allowPeriodTypes.filter(e => e);

    const [currentPeriodType, setCurrentPeriodType] = useState(types[0]);
    useEffect(() => {
        let currentType = corePicker?.dataPeriodByType?.currentType
        if (
            !types.includes(currentType)
        ) {
            currentType = types[0]
        }
        setCurrentPeriodType(currentType);

        setCorePicker({
            ...corePicker,
            periodSelected: corePicker?.dataPeriodByType?.[currentType]
        })

    },
        [
            JSON.stringify({ types, currentPeriodType })
        ])

    const typeTaget = types
        .find((e) => {
            return types.includes(currentPeriodType) ? e == currentPeriodType : true
        })

    return <CustomCard
        {
        ...{
            required: true,
            className: `w-full `,
            title: trans('common:periodPicker.title')
        }
        }
    >
        <CustomPickerElement
            label={
                upperFirst(('Chọn ' + trans('common:periodPicker.title')).toLowerCase())
            }>
            <div className="flex flex-row px-3 gap-3 rounded-lg border border-1 border-black/20 w-fit flex-wrap md:flex-nowrap justify-center">
                <SelectType setCurrentPeriodType={setCurrentPeriodType} />
                <KeepAlive
                    cacheKey={currentPeriodType}
                >
                    <PeriodPicker
                        prefix={<></>}
                        antdOpts={{
                            locale,
                            variant: 'borderless'
                        }}
                        onChange={(props) => {
                            let { fromTo, start, end, result } = props || {};
                            let dataConverted = {
                                periodSelected: undefined
                            }
                            dataConverted.dataPeriodByType = corePicker?.dataPeriodByType || {};
                            dataConverted.dataPeriodByType[currentPeriodType] = dataConverted.periodSelected;
                            if (props) {
                                dataConverted = {
                                    periodSelected: {
                                        type: typeTaget,

                                        startDate: start.outputFormat,
                                        labelStartDate: start.labelFormat,

                                        endDate: end?.outputFormat,
                                        labelEndDate: end?.labelFormat,

                                        outputDataDhis2: result?.outputFormat || `${start.outputFormat}${end?.outputFormat ? ('...' + end?.outputFormat) : ''}`,

                                        fromTo,
                                        errors: undefined,
                                    },

                                };

                                dataConverted.dataPeriodByType = corePicker?.dataPeriodByType || {};
                                dataConverted.dataPeriodByType[currentPeriodType] = dataConverted.periodSelected;
                            }


                            setCorePicker(dataConverted);
                        }}
                        periodType={typeTaget} required />
                </KeepAlive>
            </div>
        </CustomPickerElement>
    </CustomCard>
}

const SelectType = ({ setCurrentPeriodType }) => {
    const [
        allowPeriodTypes,
        corePicker,
        setCorePicker,
    ] = useCorePickerState(useShallow(state => [
        state.allowPeriodTypes,
        state.corePicker,
        state.actions.setCorePicker
    ]));

    let types = allowPeriodTypes.filter(e => e);
    let currentPeriodType = corePicker?.dataPeriodByType?.currentType;

    const isCurrentTypeInclude = (types || []).includes(currentPeriodType);
    currentPeriodType = isCurrentTypeInclude ? currentPeriodType : types[0]
    useEffect(() => {
        setCurrentPeriodType(currentPeriodType)
    },
        [
            JSON.stringify({ types, currentPeriodType })
        ])

    const onChange = (index) => {
        let currentPeriodType = types[index];
        setCurrentPeriodType(currentPeriodType);
        let newCorePicker = {
            periodSelected: corePicker?.dataPeriodByType?.[currentPeriodType],
            dataPeriodByType: {
                ...corePicker.dataPeriodByType,
                currentType: currentPeriodType
            }
        }
        setCorePicker(newCorePicker);
    }


    return <Select
        key={JSON.stringify({ currentPeriodType, types })}
        className="min-w-[150px] ml-[-5px]"
        onClick={(e) => e.stopPropagation()}
        placeholder={'Kỳ dữ liệu'}
        variant='borderless'
        // variant='filled'
        options={
            types.map((type, index) => {
                let opts = {
                    key: index,
                    value: index,
                    label: useTrans(`common:periodPicker.selectType.${type}`)
                }
                return opts
            })
        }
        defaultValue={(() => {
            return useTrans(`common:periodPicker.selectType.${currentPeriodType || types[0]}`)
        })()}
        onChange={onChange}
    />

}