export const findHeaderIndex = (result, name) =>
  result.headers.findIndex((h) => h.name === name);

var romanMatrix = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

export const convertToRoman = (num) => {
  if (num === 0) {
    return "";
  }
  for (var i = 0; i < romanMatrix.length; i++) {
    if (num >= romanMatrix[i][0]) {
      return romanMatrix[i][1] + convertToRoman(num - romanMatrix[i][0]);
    }
  }
};

export const convertChar = (num) => {
  return String.fromCharCode((num || 10) + 64);
};

export const getNonCummulativePeriod = (periodObject) => {
  let { outputDataDhis2, type } = periodObject
  let resultPeriod = outputDataDhis2;
  if (type == 'month') {
    return resultPeriod;
  }

  if (type == 'month2') {
    resultPeriod = resultPeriod.split(';').reverse()[0]
  }

  if (type == 'year') {
    //If current year is data.period(ex:2025) so get month present of this year-> output 
    //If current year is not data.period(ex:2024) so get lastMonth in year-> output 12
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth() + 1;
    let dataYear = resultPeriod;
    if (currentYear == dataYear) {
      resultPeriod = currentYear + (currentMonth < 10 ? ('0' + currentMonth) : currentMonth);
    } else {
      resultPeriod = dataYear + `12`;
    }
  }

  return resultPeriod;

}
