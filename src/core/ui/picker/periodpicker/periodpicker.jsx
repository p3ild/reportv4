import React, { useRef, useState } from 'react';
import { DatePicker, Divider, Select } from 'antd';
import dayjs from 'dayjs';
import { FaCheckCircle } from "react-icons/fa";
import { isArray, upperFirst } from 'lodash';
import { eachDayOfInterval, eachMonthOfInterval, eachYearOfInterval, format, parse } from 'date-fns';
import { SixMonthlyPicker } from './custom/SixMonth';
import { useTranslation } from 'react-i18next';
import en from 'antd/es/date-picker/locale/en_US';
import enUS from 'antd/es/locale/en_US';
import { SpecifiedPeriodPicker } from './custom';
import { PERIOD_TYPE } from './constant';
export { PERIOD_TYPE };
const { RangePicker } = DatePicker;



const PeriodPicker = (props) => {
  let {
    periodType = 'date',
    placeholder,
    inputFormat,
    outputFormat,
    labelFormat,
    onChange,
    className,
    prefix,
    combinePrefix = false, // Display prefix and default prefix together 

    antdOpts
  } = props;
  let fromTo = periodType.includes('2');
  periodType = periodType.split('2')[0];
  const { t } = useTranslation();
  let genOutput;

  let picker = periodType;
  let defaultPrefix = '';
  switch (true) {
    case periodType === 'date':
      defaultPrefix = t('common:periodPicker.selectType.date')
      inputFormat = "DD-MM-YYYY";
      outputFormat = 'YYYY-MM-DD';
      labelFormat = `[${t('common:periodPicker.selectType.date')}] ` + inputFormat;
      genOutput = ({ start, end }) => {
        let outputFormat = end
          ? eachDayOfInterval({
            start: start.dayjs?.toDate(),
            end: end.dayjs?.toDate(),
          }).map((e) => {
            return format(e, 'yyyyMMDD')
          })
          : [
            start.outputFormat
          ];

        return {
          outputFormat: outputFormat.join(';'),
        };
      }
      break;
    case periodType === 'week':
      defaultPrefix = t('common:periodPicker.selectType.date')
      inputFormat = "ww-YYYY";
      outputFormat = 'YYYYww';
      labelFormat = `[${t('common:periodPicker.selectType.date')}] ` + inputFormat
      break;
      break;
    case periodType === 'month':
      defaultPrefix = t('common:periodPicker.month')
      outputFormat = 'YYYYMM';
      inputFormat = 'MM-YYYY';
      labelFormat = `[${t('common:periodPicker.month')}] ` + inputFormat;
      genOutput = ({ start, end }) => {
        let outputFormat = end
          ? eachMonthOfInterval({
            start: start.dayjs?.toDate(),
            end: end.dayjs?.toDate(),
          }).map((e) => {
            return format(e, 'yyyyMM')
          })
          : [
            start.outputFormat
          ];

        return {
          outputFormat: outputFormat.join(';'),
        };
      }
      break;

    case periodType === 'year':
      defaultPrefix = t('common:periodPicker.selectType.year')
      inputFormat = 'YYYY';
      outputFormat = 'YYYY';
      labelFormat = `[${t('common:periodPicker.selectType.year')}] ` + inputFormat
      genOutput = ({ start, end }) => {
        let outputFormat = end
          ? eachYearOfInterval({
            start: start.dayjs?.toDate(),
            end: end.dayjs?.toDate(),
          }).map((e) => {
            return format(e, 'yyyy')
          })
          : [
            start.outputFormat
          ];

        return {
          outputFormat: outputFormat.join(';'),
        };
      }
      break;

    case periodType === 'sixMonth':
      break;


    default: break;
  }

  const handleChange = (value) => {
    let [startValue, endValue] = isArray(value) ? value : [value]
    if (onChange) {
      const [
        startDayJS,
        endDayJS
      ] = [
          startValue ? dayjs(startValue) : undefined,
          endValue ? dayjs(endValue) : undefined
        ];
      const preFormat = {
        fromTo,
        start: {
          dayjs: startDayJS,
          inputFormat: startDayJS.format(inputFormat),
          outputFormat: startDayJS.format(outputFormat),
          labelFormat: startDayJS.format(labelFormat)
        },
        end: endValue ? {
          dayjs: endDayJS,
          inputFormat: endDayJS.format(inputFormat),
          outputFormat: endDayJS.format(outputFormat),
          labelFormat: endDayJS.format(labelFormat)
        } : undefined
      }

      preFormat.result = genOutput(preFormat);

      if (value) {
        onChange(preFormat);
      } else {
        onChange(null);
      }
    }
  };

  const opts = {
    picker: picker,
    onChange: handleChange,
    format: inputFormat,
    allowClear: true,
    style: { width: 'auto' },
    prefix: combinePrefix
      ? <div className='flex flex-row gap-2 items-center'>
        {prefix}
        {defaultPrefix}
      </div>
      : (prefix || defaultPrefix),
    placeholder: upperFirst((`${t('common:periodPicker.select')} ` + ((placeholder === 'none' ? '' : placeholder) || defaultPrefix)).toLowerCase()),
    ...antdOpts
  }

  switch (periodType) {
    case PERIOD_TYPE.sixMonth:
      return <SixMonthlyPicker {...{
        ...props, ...opts, onChange
      }} />;
    case PERIOD_TYPE.biWeek:
      return <SpecifiedPeriodPicker {...{
        periodType: PERIOD_TYPE.biWeek,
        ...props, ...opts, onChange
      }} />;

    default:
      return <>
        {
          !fromTo
            ? <DatePicker
              {
              ...{
                className: '!w-fit ' + className,
                ...antdOpts,
                ...opts
              }} />
            : <RangePicker
              {
              ...{
                className: '!w-fit ' + className,
                ...antdOpts,
                ...opts
              }
              } />
        }
      </>
  }
};

export default PeriodPicker;