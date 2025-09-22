import { useState } from "react";
import PeriodPicker from "../periodpicker";
import { Divider, Select } from "antd";

export const SixMonthlyPicker = (props) => {
    let { periodType = 'year', inputFormat, outputFormat, labelFormat, onChange } = props;

    const [sixMonthYearValue, setSixMonthYearValue] = useState();
    const [sixMonthTypeValue, setSixMonthTypeValue] = useState();

    const [outputSelected, setOutputSelected] = useState();

    const onChangeLocal = ({
        start, end, // Handle period from antd picker
        value, option // handle period from <Select />
    }) => {

        const year = start?.outputFormat || sixMonthYearValue;
        const type = option || sixMonthTypeValue;

        if (start?.outputFormat) setSixMonthYearValue(year)
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
            onChange={(value, option) => onChangeLocal({ value, option })}
            variant='borderless'
            size='middle'
            prefix={'Loại: '}
            placeholder={'Chọn kỳ 6 tháng'}
            options={[
                {
                    label: `6 tháng đầu năm`,
                    value: 'S1'
                },
                {
                    label: `Cả năm`,
                    value: 'S2'
                },
            ]}
        />

        {false && outputSelected?.start?.labelFormat && <div className='grid grid-rows-2 col-span-2'>
            <Divider className='!p-0 m-0' />
            <p className='flex items-center gap-1 ml-3 font-bold'>Đã chọn: {outputSelected?.start?.labelFormat} <FaCheckCircle className='text-green-400' /></p>
        </div>}


    </div>
}