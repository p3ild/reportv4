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

export { findHeaderIndex, flatten };
