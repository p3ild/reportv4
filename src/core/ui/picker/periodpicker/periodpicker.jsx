import { DatePicker } from 'antd';
import { eachDayOfInterval, eachMonthOfInterval, eachWeekOfInterval, eachYearOfInterval, format } from 'date-fns';
import { DatePicker } from 'antd';
import { eachDayOfInterval, eachMonthOfInterval, eachWeekOfInterval, eachYearOfInterval, format } from 'date-fns';
import dayjs from 'dayjs';
import { isArray, upperFirst } from 'lodash';
import { useTranslation } from 'react-i18next';
import { PERIOD_TYPE } from './constant';
import { PERIOD_TYPE } from './constant';
import { SpecifiedPeriodPicker } from './custom';
import { SixMonthlyPicker } from './custom/SixMonth';
import { WeekClassicPicker } from './custom/WeekClassic';
import { QuarterPicker } from './custom/Quarter';
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
            return format(e, 'yyyyMMdd')
          })
          : [
            start.outputFormat
          ];

        return {
          outputFormat: outputFormat.join(';'),
          startDate: start.outputFormat, endDate: end?.outputFormat
        };
      }
      break;
    case periodType === 'week':
      defaultPrefix = t('common:periodPicker.selectType.week')
      inputFormat = "ww-YYYY";
      outputFormat = "YYYY[W]ww";
      labelFormat = `[${t('common:periodPicker.selectType.week')}] ` + inputFormat
      genOutput = ({ start, end }) => {
        let outputFormat = end
          ? eachWeekOfInterval({
            start: start.dayjs?.toDate(),
            end: end.dayjs?.toDate(),
          }).map((e) => {
            return format(e, `yyyy'W'ww`)
          })
          : [
            start.outputFormat
          ];

        return {
          outputFormat: outputFormat.join(';'),
        };
      }
      break;
    case periodType === 'month':
      defaultPrefix = t('common:periodPicker.month')
      outputFormat = 'YYYYMM';
      inputFormat = 'MM/YYYY';
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
    let [startValue, endValue] = isArray(value) ? value : [value];
    if (!startValue && !endValue) {
      onChange(null); return;
      onChange(null); return;
    }
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
    case PERIOD_TYPE.weekClassic:
    case PERIOD_TYPE.weekClassic2:

      return <WeekClassicPicker {...{
        ...props, ...opts, onChange, isRange: fromTo
      }} />;
    case PERIOD_TYPE.quarterClassic:
    case PERIOD_TYPE.quarterClassic2:

      return <QuarterPicker {...{
        ...props, ...opts, onChange, isRange: fromTo
      }} />;

    case PERIOD_TYPE.biWeek:
      return <SpecifiedPeriodPicker {...{
        periodType: PERIOD_TYPE.biWeek,
        ...props, ...opts, onChange
      }} />;

    default:
      return <div className=''>
        {
          !fromTo
            ? <DatePicker
              {
              ...{
                className: '!w-full ' + className,
                ...antdOpts,
                ...opts
              }} />
            : <RangePicker
              {
              ...{
                className: '!w-full ' + className,
                ...antdOpts,
                ...opts
              }
              } />
        }
      </div>
  }
};

export default PeriodPicker;