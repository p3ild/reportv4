import { useEffect, useState } from "react";
import PeriodPicker from "../periodpicker";
import { Divider, Select } from "antd";
import PeriodManager from "../PeriodManager";
import { PERIOD_TYPE } from "../constant";
export const SPECIFIED_PERIOD_TYPE = {
    [PERIOD_TYPE.biWeek]: {
        key: PERIOD_TYPE.biWeek,
        label: '2 tuần 1 lần',
        placeholder: 'Chọn kỳ',
        generateFunction: PeriodManager.generateBiWeeklyPeriods.bind(PeriodManager)
    },
    [PERIOD_TYPE.biMonth]: {
        key: 'sixMonth',
        label: '6 tháng 1 lần',
        placeholder: 'Chọn kỳ'
    }
};

export const SpecifiedPeriodPicker = (props) => {
    let { periodType = 'year', inputFormat, outputFormat, labelFormat, onChange } = props;
    const periodTypeTarget = SPECIFIED_PERIOD_TYPE[periodType];
    if (!periodTypeTarget) {
        console.log({
            err: 'NOT_FOUND',
            periodType
        })
        return <div></div>
    }
    
    const [customPeriodYearValue, setCustomPeriodYearValue] = useState();
    const [sixMonthTypeValue, setSixMonthTypeValue] = useState();

    const [outputSelected, setOutputSelected] = useState();

    const [options, setOptions] = useState([]);

    const onChangeLocal = ({
        start, end, // Handle period from antd picker
        value, option // handle period from <Select />
    }) => {

        const year = start?.outputFormat || customPeriodYearValue;
        const type = option || sixMonthTypeValue;

        let options = periodTypeTarget.generateFunction(year);
        if (options.length > 0) {
            options = options.map(x => ({
                label: x.name,
                value: x.iso.split(year)[1]
            }));
        }
        setOptions(options);

        if (start?.outputFormat) setCustomPeriodYearValue(year)
        if (option?.value) setSixMonthTypeValue(type);
        if (!year || !type) {
            return;
        }

        let result = {
            start: {
                inputFormat: year + type.value,
                outputFormat: year + type.value,
                labelFormat: `${type.label} ${year}`
            }

            //Todo: Handle select range
            // end: endValue ? {
            //   inputFormat: dayjs(endValue).format(inputFormat),
            //   outputFormat: dayjs(endValue).format(outputFormat),
            //   labelFormat: dayjs(endValue).format(labelFormat)
            // } : undefined

        }
        setOutputSelected(result);
        onChange(result)
    }

    return <div className={'flex items-center gap-1 p-1'
        // +'border border-1  border-rounded rounded-lg'
    }>
        <PeriodPicker {
            ...{
                ...props,
                onChange: onChangeLocal,
                periodType: 'year',
                placeholder: '',//Prevent add placeholder string twice. One from props, one from current
                className: '!w-fit',
                antdOpts: {
                    variant: 'borderless'
                }
            }
        } />
        <Divider type={"vertical"} className="!p-0 h-[20px] !border-[1.5px]" />
        <Select
            className="!min-w-[15vw]"
            key={customPeriodYearValue}
            onChange={(value, option) => onChangeLocal({ value, option })}
            variant='borderless'
            size='middle'
            prefix={'Kỳ: '}
            placeholder={'Chọn kỳ'}
            options={options}
        />

        {false && outputSelected?.start?.labelFormat && <div className='grid grid-rows-2 col-span-2'>
            <Divider className='!p-0 m-0' />
            <p className='flex items-center gap-1 ml-3 font-bold'>Đã chọn: {outputSelected?.start?.labelFormat} <FaCheckCircle className='text-green-400' /></p>
        </div>}


    </div>
}