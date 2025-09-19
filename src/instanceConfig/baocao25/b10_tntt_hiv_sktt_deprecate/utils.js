const findHeaderIndex = (headers, target) => {
  return headers.findIndex((header) => header.name === target);
};

const flatten = (items) => {
  const result = [];

  const recurse = (array) => {
    for (const item of array) {
      const { children, ...rest } = item;
      result.push(rest);
      if (children && Array.isArray(children)) {
        recurse(children);
      }
    }
  };

  recurse(items);
  return result;
};

const getLatestMonth = (year) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  if (year !== currentYear) return `${year}12`;
  return `${year}${currentMonth.toString().padStart(2, "0")}`;
};

export { findHeaderIndex, flatten, getLatestMonth };
