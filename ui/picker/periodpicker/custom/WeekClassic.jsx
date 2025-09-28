import { useState, useEffect, useMemo, useCallback } from "react";
import PeriodPicker from "../periodpicker";
import { Divider, notification, Select } from "antd";
import { FaArrowTurnDown } from "react-icons/fa6";

export const WeekClassicPicker = (props) => {
    const { onChange, isRange } = props;

    const [startYear, setStartYear] = useState();
    const [startWeek, setStartWeek] = useState();
    const [endYear, setEndYear] = useState();
    const [endWeek, setEndWeek] = useState();

    useEffect(() => {
        if (!isRange) {
            setEndYear(null);
            setEndWeek(null);
        }
    }, [isRange]);

    const weekOptions = useMemo(() =>
        Array(52).fill(0).map((_, idx) => ({
            label: `Tuần ${idx + 1}`,
            value: idx < 9 ? `W0${idx + 1}` : `W${idx + 1}`
        })), []);

    const generateWeekRange = useCallback((startYear, startWeek, endYear, endWeek) => {
        const weeks = [];
        let currentYear = parseInt(startYear);
        let currentWeek = parseInt(startWeek.replace('W', ''));
        const finalYear = parseInt(endYear);
        const finalWeek = parseInt(endWeek.replace('W', ''));

        while (currentYear < finalYear || (currentYear === finalYear && currentWeek <= finalWeek)) {
            weeks.push(`${currentYear}W${currentWeek.toString().padStart(2, '0')}`);
            currentWeek++;
            if (currentWeek > 52) {
                currentWeek = 1;
                currentYear++;
            }
            if (weeks.length > 104) break;
        }
        return weeks.join(';');
    }, []);

    const buildResult = useCallback((sYear, sWeek, eYear, eWeek) => {
        if (!sYear || !sWeek) return null;

        const startFormat = `${sYear}${sWeek.value}`;
        let result = {
            start: {
                inputFormat: startFormat,
                outputFormat: startFormat,
                labelFormat: `${sWeek.label}/${sYear}`
            }
        };

        if (isRange && eYear && eWeek) {
            const startValue = parseInt(sYear) * 1000 + parseInt(sWeek.value.replace('W', ''));
            const endValue = parseInt(eYear) * 1000 + parseInt(eWeek.value.replace('W', ''));

            if (endValue < startValue) {
                notification.warning({
                    placement: 'bottomRight',
                    message: <p>Tuần bắt đầu không được sau tuần kết thúc</p>
                });
                return null;
            }

            const endFormat = `${eYear}${eWeek.value}`;
            result.end = {
                inputFormat: endFormat,
                outputFormat: endFormat,
                labelFormat: `${eWeek.label}/${eYear}`
            };
            result.result = {
                outputFormat: generateWeekRange(sYear, sWeek.value, eYear, eWeek.value),
                startDate: startFormat,
                endDate: endFormat
            };
        } else if (!isRange) {
            result.result = {
                outputFormat: startFormat,
                startDate: startFormat,
                endDate: null
            };
        }

        return result;
    }, [isRange, generateWeekRange]);

    const handleStartChange = ({ start, option }) => {
        const newStartYear = start?.outputFormat || startYear;
        const newStartWeek = option || startWeek;

        if (start?.outputFormat) setStartYear(newStartYear);
        if (option) setStartWeek(newStartWeek);

        const result = buildResult(newStartYear, newStartWeek, endYear, endWeek);
        if (result) onChange(result);
    };

    const handleEndChange = ({ start, option }) => {
        if (!isRange) return;

        const newEndYear = start?.outputFormat || endYear;
        const newEndWeek = option || endWeek;

        if (start?.outputFormat) setEndYear(newEndYear);
        if (option) setEndWeek(newEndWeek);

        const result = buildResult(startYear, startWeek, newEndYear, newEndWeek);
        if (result) onChange(result);
    };
    return <div className={'flex flex-row items-center gap-1 p-1'
    }>
        <div className={"flex flex-col" + (isRange ? ' gap-2 my-2' : '')}>
            <div className={"flex flex-row items-center" + (isRange ? ' border border-1 rounded-lg border-gray-400' : '')}>
                <PeriodPicker {
                    ...{
                        ...props,
                        onChange: handleStartChange,
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
                    onChange={(value, option) => handleStartChange({ option })}
                    variant='borderless'
                    size='middle'
                    placeholder={'Chọn tuần'}
                    value={startWeek?.value}
                    options={weekOptions}
                />
            </div>
            {isRange && <div className="flex flex-row items-center border border-1 rounded-lg border-gray-400">
                <PeriodPicker {
                    ...{
                        ...props,
                        onChange: handleEndChange,
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
                    onChange={(value, option) => handleEndChange({ option })}
                    variant='borderless'
                    size='middle'
                    placeholder={'Chọn tuần'}
                    value={endWeek?.value}
                    options={weekOptions}
                />
            </div>}
        </div>

        {isRange && <FaArrowTurnDown className="text-lg" />}



    </div>
}