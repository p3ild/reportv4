import { useState, useEffect, useMemo, useCallback } from "react";
import PeriodPicker from "../periodpicker";
import { Divider, notification, Select } from "antd";
import { FaArrowTurnDown } from "react-icons/fa6";

export const QuarterPicker = (props) => {
    const { onChange, isRange } = props;

    const [startYear, setStartYear] = useState();
    const [startQuarter, setStartQuarter] = useState();
    const [endYear, setEndYear] = useState();
    const [endQuarter, setEndQuarter] = useState();

    useEffect(() => {
        if (!isRange) {
            setEndYear(null);
            setEndQuarter(null);
        }
    }, [isRange]);

    const quarterOptions = useMemo(() => [
        { label: "Quý 1", value: "Q01" },
        { label: "Quý 2", value: "Q02" },
        { label: "Quý 3", value: "Q03" },
        { label: "Quý 4", value: "Q04" }
    ], []);

    const generateQuarterRange = useCallback((startYear, startQuarter, endYear, endQuarter) => {
        const quarters = [];
        let currentYear = parseInt(startYear);
        let currentQuarter = parseInt(startQuarter.replace('Q', ''));
        const finalYear = parseInt(endYear);
        const finalQuarter = parseInt(endQuarter.replace('Q', ''));

        while (currentYear < finalYear || (currentYear === finalYear && currentQuarter <= finalQuarter)) {
            quarters.push(`${currentYear}Q${currentQuarter.toString().padStart(2, '0')}`);
            currentQuarter++;
            if (currentQuarter > 4) {
                currentQuarter = 1;
                currentYear++;
            }
            if (quarters.length > 40) break;
        }
        return quarters.join(';');
    }, []);

    const buildResult = useCallback((sYear, sQuarter, eYear, eQuarter) => {
        if (!sYear || !sQuarter) return null;

        const startFormat = `${sYear}${sQuarter.value}`;
        let result = {
            start: {
                inputFormat: startFormat,
                outputFormat: startFormat,
                labelFormat: `${sQuarter.label}/${sYear}`
            }
        };

        if (isRange && eYear && eQuarter) {
            const startValue = parseInt(sYear) * 10 + parseInt(sQuarter.value.replace('Q', ''));
            const endValue = parseInt(eYear) * 10 + parseInt(eQuarter.value.replace('Q', ''));

            if (endValue < startValue) {
                notification.warning({
                    placement: 'bottomRight',
                    message: <p>Quý bắt đầu không được sau quý kết thúc</p>
                });
                return null;
            }

            const endFormat = `${eYear}${eQuarter.value}`;
            result.end = {
                inputFormat: endFormat,
                outputFormat: endFormat,
                labelFormat: `${eQuarter.label}/${eYear}`
            };
            result.result = {
                outputFormat: generateQuarterRange(sYear, sQuarter.value, eYear, eQuarter.value),
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
    }, [isRange, generateQuarterRange]);

    const handleStartChange = ({ start, option }) => {
        const newStartYear = start?.outputFormat || startYear;
        const newStartQuarter = option || startQuarter;

        if (start?.outputFormat) setStartYear(newStartYear);
        if (option) setStartQuarter(newStartQuarter);

        const result = buildResult(newStartYear, newStartQuarter, endYear, endQuarter);
        if (result) onChange(result);
    };

    const handleEndChange = ({ start, option }) => {
        if (!isRange) return;

        const newEndYear = start?.outputFormat || endYear;
        const newEndQuarter = option || endQuarter;

        if (start?.outputFormat) setEndYear(newEndYear);
        if (option) setEndQuarter(newEndQuarter);

        const result = buildResult(startYear, startQuarter, newEndYear, newEndQuarter);
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
                        placeholder: '',
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
                    placeholder={'Chọn quý'}
                    value={startQuarter?.value}
                    options={quarterOptions}
                />
            </div>
            {isRange && <div className="flex flex-row items-center border border-1 rounded-lg border-gray-400">
                <PeriodPicker {
                    ...{
                        ...props,
                        onChange: handleEndChange,
                        periodType: 'year',
                        placeholder: '',
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
                    placeholder={'Chọn quý'}
                    value={endQuarter?.value}
                    options={quarterOptions}
                />
            </div>}
        </div>

        {isRange && <FaArrowTurnDown className="text-lg" />}



    </div>
}