/**
 * @author p2ild
 * @reference extract from dhis2.period.js
 * @version 1.0.0
 */

import moment from 'moment';

class PeriodManager {

  constructor(options = {}) {
    this.dateFormat = options.dateFormat || 'DD-MM-YYYY';
    this.locale = options.locale || 'en';

    // Set moment locale
    moment.locale(this.locale);

    // Available period types
    this.periodTypes = {
      'Daily': 'Daily',
      'Weekly': 'Weekly',
      'WeeklyWednesday': 'WeeklyWednesday',
      'WeeklyThursday': 'WeeklyThursday',
      'WeeklySaturday': 'WeeklySaturday',
      'WeeklySunday': 'WeeklySunday',
      'BiWeekly': 'BiWeekly',
      'Monthly': 'Monthly',
      'BiMonthly': 'BiMonthly',
      'Quarterly': 'Quarterly',
      'QuarterlyNov': 'QuarterlyNov',
      'SixMonthly': 'SixMonthly',
      'SixMonthlyApril': 'SixMonthlyApril',
      'SixMonthlyNov': 'SixMonthlyNov',
      'Yearly': 'Yearly',
      'FinancialApril': 'FinancialApril',
      'FinancialJuly': 'FinancialJuly',
      'FinancialOct': 'FinancialOct',
      'FinancialNov': 'FinancialNov'
    };

    // Month names mapping for translations
    this.monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  }

  convertToCompatibleYear(offsetOrYear) {
    const currentYear = moment().year();
    let targetYear;

    if (offsetOrYear > 1900 && offsetOrYear < 2200) {
      targetYear = offsetOrYear;
    } else {
      targetYear = currentYear + offsetOrYear;
    }
    return targetYear
  }

  /**
   * Generate periods for a specific type and offset, then reverse the array
   * This is the main function extracted from dhis2.period.js
   * 
   * @param {string} generator - Period type (e.g., 'Monthly', 'Quarterly')
   * @param {number} offset - Year offset from current year (default: 0)
   * @returns {Array} Array of periods in reversed order
   * @throws {Error} If generator type is not supported
   */
  generateReversedPeriods(generator, offset = 0) {
    if (!this.periodTypes[generator]) {
      throw new Error(`Unsupported period generator: ${generator}`);
    }

    const periods = this.generatePeriods(generator, offset);
    return this.reverse(periods);
  }

  /**
   * Generate periods for a specific type and offset
   * 
   * @param {string} generator - Period type
   * @param {number} offset - Year offset from current year (default: 0)
   * @returns {Array} Array of period objects
   */
  generatePeriods(generator, offset = 0) {
    const methodName = `generate${generator}Periods`;

    if (typeof this[methodName] !== 'function') {
      throw new Error(`Generator method not implemented: ${methodName}`);
    }

    return this[methodName](offset);
  }

  /**
   * Reverse an array of periods (out-of-place)
   * 
   * @param {Array} periods - Array of period objects to reverse
   * @returns {Array} New reversed array
   */
  reverse(periods) {
    if (!Array.isArray(periods)) {
      throw new Error('Periods must be an array');
    }
    return periods.slice(0).reverse();
  }

  /**
   * Filter periods to show only open periods within a specified range
   * 
   * @param {string} generator - Period type
   * @param {Array} periods - Array of periods to filter
   * @param {number} n - Number of open periods in the future
   * @param {string} checkStartDate - Optional start date to check against
   * @param {string} checkEndDate - Optional end date to check against
   * @returns {Array} Filtered periods array
   */
  filterOpenPeriods(generator, periods, n = 0, checkStartDate = null, checkEndDate = null) {
    const today = moment();
    const max = this.datePlusPeriods(generator, today, n);
    const filteredPeriods = [];

    const startDate = checkStartDate ? moment(checkStartDate.split(" ")[0]) : null;
    const endDate = checkEndDate ? moment(checkEndDate.split(" ")[0]) : null;

    periods.forEach(period => {
      const periodEndDate = moment(period.endDate);

      if (checkStartDate || checkEndDate) {
        const periodStartDate = moment(period.startDate);
        const startCheck = !checkStartDate || !periodStartDate.isBefore(startDate);
        const endCheck = !checkEndDate || !periodEndDate.isAfter(endDate);

        if (startCheck && endCheck && periodEndDate.isBefore(max)) {
          filteredPeriods.push(period);
        }
      } else if (periodEndDate.isBefore(max)) {
        filteredPeriods.push(period);
      }
    });

    return filteredPeriods;
  }

  /**
   * Add specified number of periods to a date
   * 
   * @param {string} generator - Period type
   * @param {moment.Moment|Date|string} date - Starting date
   * @param {number} n - Number of periods to add
   * @returns {moment.Moment} Date with periods added
   */
  datePlusPeriods(generator, date, n = 0) {
    const momentDate = moment(date);

    switch (generator) {
      case 'Daily':
        return momentDate.add(n, 'days');
      case 'Weekly':
      case 'WeeklyWednesday':
      case 'WeeklyThursday':
      case 'WeeklySaturday':
      case 'WeeklySunday':
        return momentDate.add(n, 'weeks');
      case 'BiWeekly':
        return momentDate.add(n * 2, 'weeks');
      case 'Monthly':
        return momentDate.add(n, 'months');
      case 'BiMonthly':
        return momentDate.add(n * 2, 'months');
      case 'Quarterly':
      case 'QuarterlyNov':
        return momentDate.add(n * 3, 'months');
      case 'SixMonthly':
      case 'SixMonthlyApril':
      case 'SixMonthlyNov':
        return momentDate.add(n * 6, 'months');
      case 'Yearly':
      case 'FinancialApril':
      case 'FinancialJuly':
      case 'FinancialOct':
      case 'FinancialNov':
        return momentDate.add(n, 'years');
      default:
        throw new Error(`Unknown period type: ${generator}`);
    }
  }

  /**
   * Helper function to get start date of year for weekly periods
   * Based on ISO standard (first week always contains 4th Jan) and week start day
   * 
   * @param {number} year - Year to calculate for
   * @param {number} startDayOfWeek - Week start day (0=Sunday, 1=Monday, etc.)
   * @returns {moment.Moment} Start date of the year
   */
  getStartDateOfYear(year, startDayOfWeek) {
    const day4OfYear = moment({ year, month: 0, day: 4 }); // January 4th
    let startDate = day4OfYear.clone();

    const dayDiff = day4OfYear.day() - startDayOfWeek;

    if (dayDiff > 0) {
      startDate.subtract(dayDiff, 'days');
    } else if (dayDiff < 0) {
      startDate.subtract(dayDiff + 7, 'days');
    }

    return startDate;
  }

  /**
   * Helper function to get month name translation
   * @param {string} monthName - Month name or number
   * @returns {string} Translated month name
   */
  getMonthTranslation(monthName) {
    // For Node.js implementation, we'll use the month names directly
    // In a full DHIS2 implementation, this would connect to i18n
    if (typeof monthName === 'number') {
      return this.monthNames[monthName - 1] || monthName.toString();
    }
    return monthName;
  }

  /**
   * Helper function to create a period object with all required fields
   * @param {moment.Moment} startDate - Start date
   * @param {moment.Moment} endDate - End date
   * @param {string} name - Period name
   * @param {string} id - Period ID
   * @param {string} iso - ISO format
   * @returns {Object} Period object with all required fields
   */
  createPeriod(startDate, endDate, name, id, iso) {
    return {
      startDate: startDate.format(this.dateFormat),
      endDate: endDate.format(this.dateFormat),
      name: name,
      id: id,
      iso: iso,
      _startDate: moment(startDate),
      _endDate: moment(endDate)
    };
  }

  /**
   * Generate Daily periods
   * @param {number} offset - Year offset
   * @returns {Array} Array of daily periods
   */
  generateDailyPeriods(offset = 0) {
    const year = moment().year() + offset;
    const periods = [];
    const startDate = moment({ year, month: 0, day: 1 });
    const daysInYear = moment({ year, month: 11, day: 31 }).dayOfYear();

    for (let day = 1; day <= daysInYear; day++) {
      const currentDate = moment(startDate).dayOfYear(day);
      const period = this.createPeriod(
        currentDate,
        currentDate,
        currentDate.format(this.dateFormat),
        'Daily_' + currentDate.format(this.dateFormat),
        currentDate.format('YYYYMMDD')
      );
      periods.push(period);
    }

    return periods;
  }

  /**
   * Generate Weekly periods (Monday start)
   * @param {number} offset - Year offset
   * @returns {Array} Array of weekly periods
   */
  generateWeeklyPeriods(offset = 0) {
    const year = this.convertToCompatibleYear(offset);
    const periods = [];

    let startDate = this.getStartDateOfYear(year, 1); // Monday = 1
    const nextYearStartDate = this.getStartDateOfYear(year + 1, 1);

    for (let week = 1; week < 200; week++) {
      const endDate = startDate.clone().add(1, 'week').subtract(1, 'day');

      const isNextYearWeek = startDate.valueOf() <= nextYearStartDate.valueOf() &&
        nextYearStartDate.valueOf() <= endDate.valueOf();

      if (startDate.week() === 1 && week > 50 || isNextYearWeek) {
        break;
      }

      const period = this.createPeriod(
        startDate,
        endDate,
        `Week ${week} - ${startDate.format(this.dateFormat)} - ${endDate.format(this.dateFormat)}`,
        'Weekly_' + startDate.format(this.dateFormat),
        year + 'W' + week
      );

      periods.push(period);
      startDate.add(1, 'week');
    }

    return periods;
  }

  /**
   * Generate Weekly Wednesday periods
   * @param {number} offset - Year offset
   * @returns {Array} Array of weekly periods starting on Wednesday
   */
  generateWeeklyWednesdayPeriods(offset = 0) {
    const year = this.convertToCompatibleYear(offset);
    const periods = [];

    let startDate = this.getStartDateOfYear(year, 3); // Wednesday = 3
    const nextYearStartDate = this.getStartDateOfYear(year + 1, 1);

    for (let week = 1; week < 200; week++) {
      const endDate = startDate.clone().add(1, 'week').subtract(1, 'day');

      const isNextYearWeek = startDate.valueOf() <= nextYearStartDate.valueOf() &&
        nextYearStartDate.valueOf() <= endDate.valueOf();

      if (startDate.week() === 1 && week > 50 || isNextYearWeek) {
        break;
      }

      const period = {
        startDate: startDate.format(this.dateFormat),
        endDate: endDate.format(this.dateFormat),
        name: `Week ${week} - ${startDate.format(this.dateFormat)} - ${endDate.format(this.dateFormat)}`,
        id: 'WeeklyWednesday_' + startDate.format(this.dateFormat),
        iso: year + 'WedW' + week
      };

      periods.push(period);
      startDate.add(1, 'week');
    }

    return periods;
  }

  /**
   * Generate Weekly Thursday periods
   * @param {number} offset - Year offset
   * @returns {Array} Array of weekly periods starting on Thursday
   */
  generateWeeklyThursdayPeriods(offset = 0) {
    const year = this.convertToCompatibleYear(offset);
    const periods = [];

    let startDate = this.getStartDateOfYear(year, 4); // Thursday = 4
    const nextYearStartDate = this.getStartDateOfYear(year + 1, 1);

    for (let week = 1; week < 200; week++) {
      const endDate = startDate.clone().add(1, 'week').subtract(1, 'day');

      const isNextYearWeek = startDate.valueOf() <= nextYearStartDate.valueOf() &&
        nextYearStartDate.valueOf() <= endDate.valueOf();

      if (startDate.week() === 1 && week > 50 || isNextYearWeek) {
        break;
      }

      const period = {
        startDate: startDate.format(this.dateFormat),
        endDate: endDate.format(this.dateFormat),
        name: `Week ${week} - ${startDate.format(this.dateFormat)} - ${endDate.format(this.dateFormat)}`,
        id: 'WeeklyThursday_' + startDate.format(this.dateFormat),
        iso: year + 'ThuW' + week
      };

      periods.push(period);
      startDate.add(1, 'week');
    }

    return periods;
  }

  /**
   * Generate Weekly Saturday periods
   * @param {number} offset - Year offset
   * @returns {Array} Array of weekly periods starting on Saturday
   */
  generateWeeklySaturdayPeriods(offset = 0) {
    const year = this.convertToCompatibleYear(offset);
    const periods = [];

    let startDate = this.getStartDateOfYear(year, 6); // Saturday = 6
    const nextYearStartDate = this.getStartDateOfYear(year + 1, 1);

    for (let week = 1; week < 200; week++) {
      const endDate = startDate.clone().add(1, 'week').subtract(1, 'day');

      const isNextYearWeek = startDate.valueOf() <= nextYearStartDate.valueOf() &&
        nextYearStartDate.valueOf() <= endDate.valueOf();

      if (startDate.week() === 1 && week > 50 || isNextYearWeek) {
        break;
      }

      const period = {
        startDate: startDate.format(this.dateFormat),
        endDate: endDate.format(this.dateFormat),
        name: `Week ${week} - ${startDate.format(this.dateFormat)} - ${endDate.format(this.dateFormat)}`,
        id: 'WeeklySaturday_' + startDate.format(this.dateFormat),
        iso: year + 'SatW' + week
      };

      periods.push(period);
      startDate.add(1, 'week');
    }

    return periods;
  }

  /**
   * Generate Weekly Sunday periods
   * @param {number} offset - Year offset
   * @returns {Array} Array of weekly periods starting on Sunday
   */
  generateWeeklySundayPeriods(offset = 0) {
    const year = this.convertToCompatibleYear(offset);
    const periods = [];

    let startDate = this.getStartDateOfYear(year, 0); // Sunday = 0
    const nextYearStartDate = this.getStartDateOfYear(year + 1, 1);

    for (let week = 1; week < 200; week++) {
      const endDate = startDate.clone().add(1, 'week').subtract(1, 'day');

      const isNextYearWeek = startDate.valueOf() <= nextYearStartDate.valueOf() &&
        nextYearStartDate.valueOf() <= endDate.valueOf();

      if (startDate.week() === 1 && week > 50 || isNextYearWeek) {
        break;
      }

      const period = {
        startDate: startDate.format(this.dateFormat),
        endDate: endDate.format(this.dateFormat),
        name: `Week ${week} - ${startDate.format(this.dateFormat)} - ${endDate.format(this.dateFormat)}`,
        id: 'WeeklySunday_' + startDate.format(this.dateFormat),
        iso: year + 'SunW' + week
      };

      periods.push(period);
      startDate.add(1, 'week');
    }

    return periods;
  }

  /**
   * Generate BiWeekly periods
   * @param {number} offset - Year offset
   * @returns {Array} Array of bi-weekly periods
   */
  generateBiWeeklyPeriods(offset = 0) {
    const year = this.convertToCompatibleYear(offset);
    const periods = [];

    let startDate = this.getStartDateOfYear(year, 1); // Monday start

    for (let biWeek = 1; biWeek < 200; biWeek++) {
      const endDate = startDate.clone().add(2, 'weeks').subtract(1, 'day');

      const period = {
        startDate: startDate.format(this.dateFormat),
        endDate: endDate.format(this.dateFormat),
        name: `${biWeek} (${startDate.format(this.dateFormat)} - ${endDate.format(this.dateFormat)})`,
        id: 'Bi-week' + startDate.format(this.dateFormat),
        iso: year + 'BiW' + biWeek
      };

      periods.push(period);
      startDate.add(2, 'weeks');

      if ((startDate.week() === 1 || startDate.week() === 2) && biWeek > 25) {
        break;
      }
    }

    return periods;
  }

  /**
   * Generate Monthly periods
   * @param {number} offset - Year offset
   * @returns {Array} Array of monthly periods
   */
  generateMonthlyPeriods(offset = 0) {
    const year = this.convertToCompatibleYear(offset);
    const periods = [];

    for (let month = 1; month <= 12; month++) {
      const startDate = moment({ year, month: month - 1, day: 1 });
      const endDate = startDate.clone().endOf('month');

      const period = this.createPeriod(
        startDate,
        endDate,
        this.getMonthTranslation(startDate.format('MMMM')) + ' ' + year,
        'Monthly_' + startDate.format(this.dateFormat),
        startDate.format('YYYYMM')
      );
      periods.push(period);
    }

    return periods;
  }

  /**
   * Generate BiMonthly periods
   * @param {number} offset - Year offset
   * @returns {Array} Array of bi-monthly periods
   */
  generateBiMonthlyPeriods(offset = 0) {
    const year = this.convertToCompatibleYear(offset);
    const periods = [];

    for (let month = 1, idx = 1; month <= 12; month += 2, idx++) {
      const startDate = moment({ year, month: month - 1, day: 1 });
      const endDate = moment({ year, month: month, day: 1 }).endOf('month');

      const period = this.createPeriod(
        startDate,
        endDate,
        this.getMonthTranslation(startDate.format('MMMM')) + ' - ' +
        this.getMonthTranslation(endDate.format('MMMM')) + ' ' + year,
        'BiMonthly_' + startDate.format(this.dateFormat),
        year + '0' + idx + 'B'
      );
      periods.push(period);
    }

    return periods;
  }

  /**
   * Generate Quarterly periods
   * @param {number} offset - Year offset
   * @returns {Array} Array of quarterly periods
   */
  generateQuarterlyPeriods(offset = 0) {
    const year = this.convertToCompatibleYear(offset);
    const periods = [];

    for (let month = 1, idx = 1; month <= 12; month += 3, idx++) {
      const startDate = moment({ year, month: month - 1, day: 1 });
      const endDate = moment({ year, month: month + 1, day: 1 }).endOf('month');

      const period = this.createPeriod(
        startDate,
        endDate,
        this.getMonthTranslation(startDate.format('MMMM')) + ' - ' +
        this.getMonthTranslation(endDate.format('MMMM')) + ' ' + year,
        'Quarterly_' + startDate.format(this.dateFormat),
        year + 'Q' + idx
      );
      periods.push(period);
    }

    return periods;
  }

  /**
   * Generate QuarterlyNov periods (Financial November Quarterly)
   * @param {number} offset - Year offset
   * @returns {Array} Array of quarterly periods starting in November
   */
  generateQuarterlyNovPeriods(offset = 0) {
    const year = this.convertToCompatibleYear(offset);
    const periods = [];

    // Q1: Nov (prev year) - Jan (current year)
    let startDate = moment({ year: year - 1, month: 10, day: 1 }); // November (month 10)
    let endDate = moment({ year, month: 0, day: 31 }); // January 31st

    periods.push({
      startDate: startDate.format(this.dateFormat),
      endDate: endDate.format(this.dateFormat),
      name: this.getMonthTranslation(startDate.format('MMMM')) + ' ' + (year - 1) + ' - ' +
        this.getMonthTranslation(endDate.format('MMMM')) + ' ' + year,
      id: 'FinancialNovQuarterly' + startDate.format(this.dateFormat),
      iso: year + 'NovQ1'
    });

    // Q2: Feb - Apr
    startDate = moment({ year, month: 1, day: 1 }); // February
    endDate = moment({ year, month: 3, day: 30 }); // April 30th

    periods.push({
      startDate: startDate.format(this.dateFormat),
      endDate: endDate.format(this.dateFormat),
      name: this.getMonthTranslation(startDate.format('MMMM')) + ' ' + year + ' - ' +
        this.getMonthTranslation(endDate.format('MMMM')) + ' ' + year,
      id: 'FinancialNovQuarterly' + startDate.format(this.dateFormat),
      iso: year + 'NovQ2'
    });

    // Q3: May - Jul
    startDate = moment({ year, month: 4, day: 1 }); // May
    endDate = moment({ year, month: 6, day: 31 }); // July 31st

    periods.push({
      startDate: startDate.format(this.dateFormat),
      endDate: endDate.format(this.dateFormat),
      name: this.getMonthTranslation(startDate.format('MMMM')) + ' ' + year + ' - ' +
        this.getMonthTranslation(endDate.format('MMMM')) + ' ' + year,
      id: 'FinancialNovQuarterly' + startDate.format(this.dateFormat),
      iso: year + 'NovQ3'
    });

    // Q4: Aug - Oct
    startDate = moment({ year, month: 7, day: 1 }); // August
    endDate = moment({ year, month: 9, day: 31 }); // October 31st

    periods.push({
      startDate: startDate.format(this.dateFormat),
      endDate: endDate.format(this.dateFormat),
      name: this.getMonthTranslation(startDate.format('MMMM')) + ' ' + year + ' - ' +
        this.getMonthTranslation(endDate.format('MMMM')) + ' ' + year,
      id: 'FinancialNovQuarterly' + startDate.format(this.dateFormat),
      iso: year + 'NovQ4'
    });

    return periods;
  }

  /**
   * Generate SixMonthly periods
   * @param {number} offset - Year offset
   * @returns {Array} Array of six-monthly periods
   */
  generateSixMonthlyPeriods(offset = 0) {
    const year = moment().year() + offset;
    const periods = [];

    // First half: Jan - Jun
    let startDate = moment({ year, month: 0, day: 1 }); // January
    let endDate = moment({ year, month: 5, day: 30 }); // June 30th

    periods.push({
      startDate: startDate.format(this.dateFormat),
      endDate: endDate.format(this.dateFormat),
      name: this.getMonthTranslation(startDate.format('MMMM')) + ' - ' +
        this.getMonthTranslation(endDate.format('MMMM')) + ' ' + year,
      id: 'SixMonthly_' + startDate.format(this.dateFormat),
      iso: year + 'S1'
    });

    // Second half: Jul - Dec
    startDate = moment({ year, month: 6, day: 1 }); // July
    endDate = moment({ year, month: 11, day: 31 }); // December 31st

    periods.push({
      startDate: startDate.format(this.dateFormat),
      endDate: endDate.format(this.dateFormat),
      name: this.getMonthTranslation(startDate.format('MMMM')) + ' - ' +
        this.getMonthTranslation(endDate.format('MMMM')) + ' ' + year,
      id: 'SixMonthly_' + startDate.format(this.dateFormat),
      iso: year + 'S2'
    });

    return periods;
  }

  /**
   * Generate SixMonthlyApril periods
   * @param {number} offset - Year offset
   * @returns {Array} Array of six-monthly periods starting in April
   */
  generateSixMonthlyAprilPeriods(offset = 0) {
    const year = moment().year() + offset;
    const periods = [];

    // First half: Apr - Sep
    let startDate = moment({ year, month: 3, day: 1 }); // April
    let endDate = moment({ year, month: 8, day: 30 }); // September 30th

    periods.push({
      startDate: startDate.format(this.dateFormat),
      endDate: endDate.format(this.dateFormat),
      name: this.getMonthTranslation(startDate.format('MMMM')) + ' - ' +
        this.getMonthTranslation(endDate.format('MMMM')) + ' ' + year,
      id: 'SixMonthlyApril_' + startDate.format(this.dateFormat),
      iso: year + 'AprilS1'
    });

    // Second half: Oct (current year) - Mar (next year)
    startDate = moment({ year, month: 9, day: 1 }); // October
    endDate = moment({ year: year + 1, month: 2, day: 31 }); // March 31st next year

    periods.push({
      startDate: startDate.format(this.dateFormat),
      endDate: endDate.format(this.dateFormat),
      name: startDate.format('MM YYYY') + ' - ' + endDate.format('MM YYYY'),
      id: 'SixMonthlyApril_' + startDate.format(this.dateFormat),
      iso: year + 'AprilS2'
    });

    return periods;
  }

  /**
   * Generate SixMonthlyNov periods
   * @param {number} offset - Year offset
   * @returns {Array} Array of six-monthly periods starting in November
   */
  generateSixMonthlyNovPeriods(offset = 0) {
    const year = moment().year() + offset;
    const periods = [];

    // First half: Nov (current year) - Apr (next year)
    let startDate = moment({ year, month: 10, day: 1 }); // November
    let endDate = moment({ year: year + 1, month: 3, day: 30 }); // April 30th next year

    periods.push({
      startDate: startDate.format(this.dateFormat),
      endDate: endDate.format(this.dateFormat),
      name: this.getMonthTranslation(startDate.format('MMMM YYYY')) + ' - ' +
        this.getMonthTranslation(endDate.format('MMMM YYYY')),
      id: 'SixMonthlyNov_' + startDate.format(this.dateFormat),
      iso: (year + 1) + 'NovS1'
    });

    // Second half: May - Oct (next year)
    startDate = moment({ year: year + 1, month: 4, day: 1 }); // May next year
    endDate = moment({ year: year + 1, month: 9, day: 31 }); // October 31st next year

    periods.push({
      startDate: startDate.format(this.dateFormat),
      endDate: endDate.format(this.dateFormat),
      name: startDate.format('MM YYYY') + ' - ' + endDate.format('MM YYYY'),
      id: 'SixMonthlyNov_' + startDate.format(this.dateFormat),
      iso: (year + 1) + 'NovS2'
    });

    return periods;
  }

  /**
   * Generate Yearly periods
   * @param {number} offset - Year offset
   * @returns {Array} Array of yearly periods (11 years: current +/- 5)
   */
  generateYearlyPeriods(offset = 0) {
    const year = moment().year() + offset;
    const periods = [];

    // Generate 11 years: current year +/- 5 years
    for (let i = -5; i < 6; i++) {
      const currentYear = year + i;
      const startDate = moment({ year: currentYear, month: 0, day: 1 });
      const endDate = moment({ year: currentYear, month: 11, day: 31 });

      const period = this.createPeriod(
        startDate,
        endDate,
        currentYear.toString(),
        'Yearly_' + startDate.format(this.dateFormat),
        currentYear.toString()
      );
      periods.push(period);
    }

    return periods;
  }

  /**
   * Generate FinancialApril periods
   * @param {number} offset - Year offset
   * @returns {Array} Array of financial year periods starting in April
   */
  generateFinancialAprilPeriods(offset = 0) {
    return this.generateFinancialPeriods(offset, 4, 'April');
  }

  /**
   * Generate FinancialJuly periods
   * @param {number} offset - Year offset
   * @returns {Array} Array of financial year periods starting in July
   */
  generateFinancialJulyPeriods(offset = 0) {
    return this.generateFinancialPeriods(offset, 7, 'July');
  }

  /**
   * Generate FinancialOct periods
   * @param {number} offset - Year offset
   * @returns {Array} Array of financial year periods starting in October
   */
  generateFinancialOctPeriods(offset = 0) {
    return this.generateFinancialPeriods(offset, 10, 'Oct');
  }

  /**
   * Generate FinancialNov periods
   * @param {number} offset - Year offset
   * @returns {Array} Array of financial year periods starting in November
   */
  generateFinancialNovPeriods(offset = 0) {
    return this.generateFinancialPeriods(offset, 11, 'Nov');
  }

  /**
   * Helper method to generate financial periods
   * @param {number} offset - Year offset
   * @param {number} monthOffset - Starting month (1-12)
   * @param {string} monthShortName - Short name for the month
   * @returns {Array} Array of financial periods
   */
  generateFinancialPeriods(offset, monthOffset, monthShortName) {
    const year = moment().year() + offset;
    const periods = [];

    let startDate = moment({ year: year - 5, month: monthOffset - 1, day: 1 });

    // Generate 11 years: current year +/- 5 years
    for (let i = 1; i < 12; i++) {
      const endDate = startDate.clone().add(1, 'year').subtract(1, 'day');

      const period = {
        startDate: startDate.format(this.dateFormat),
        endDate: endDate.format(this.dateFormat),
        name: this.getMonthTranslation(startDate.format('MMMM')) + ' ' + startDate.year() + ' - ' +
          this.getMonthTranslation(endDate.format('MMMM')) + ' ' + endDate.year(),
        id: 'Financial' + monthShortName + '_' + startDate.format(this.dateFormat),
        iso: (monthShortName === 'Nov' ? endDate.year() : startDate.year()) + monthShortName
      };

      periods.push(period);
      startDate.add(1, 'year');
    }

    return periods;
  }

  // Convenience methods for backward compatibility
  daily(offset = 0) { return this.generateDailyPeriods(offset); }
  weekly(offset = 0) { return this.generateWeeklyPeriods(offset); }
  monthly(offset = 0) { return this.generateMonthlyPeriods(offset); }
  quarterly(offset = 0) { return this.generateQuarterlyPeriods(offset); }
  yearly(offset = 0) { return this.generateYearlyPeriods(offset); }
  biMonthly(offset = 0) { return this.generateBiMonthlyPeriods(offset); }

  // Convenience methods for reversed periods
  dailyReversed(offset = 0) { return this.generateReversedPeriods('Daily', offset); }
  weeklyReversed(offset = 0) { return this.generateReversedPeriods('Weekly', offset); }
  monthlyReversed(offset = 0) { return this.generateReversedPeriods('Monthly', offset); }
  quarterlyReversed(offset = 0) { return this.generateReversedPeriods('Quarterly', offset); }
  yearlyReversed(offset = 0) { return this.generateReversedPeriods('Yearly', offset); }
  biMonthlyReversed(offset = 0) { return this.generateReversedPeriods('BiMonthly', offset); }
}

// Test
(async (execute = false) => {
  if (execute) {
    const periodManager = new PeriodManager();

    let rs = {};
    Object.keys(periodManager.periodTypes).forEach((periodType, index) => {
      const periods = periodManager.generatePeriods(periodType, 0);
      rs[periodType] = periods;
    });
    console.log(rs.BiWeekly);
  }
})()

export default new PeriodManager(); 