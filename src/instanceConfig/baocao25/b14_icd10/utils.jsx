function normalize(code) {
  const letter = code[0];
  const number = code.slice(1).padStart(2, "0");
  return `${letter}_${number}`;
}

function isCodeOrRangeInCustomRange(codeOrRange, startRange, endRange) {
  if (codeOrRange.includes("-")) {
    const [start, end] = codeOrRange.split("-").map((c) => c.trim());
    const startNorm = normalize(start);
    const endNorm = normalize(end);
    return startNorm >= startRange && endNorm <= endRange;
  } else {
    const norm = normalize(codeOrRange.trim());
    return norm >= startRange && norm <= endRange;
  }
}

function isInputAllWithinRange(input, startRange, endRange) {
  const parts = input
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);
  return parts.every((part) =>
    isCodeOrRangeInCustomRange(part, startRange, endRange)
  );
}
const pickTranslation = (object, language, field) => {
  const fieldMapping = {
    formName: "FORM_NAME",
    name: "NAME",
  };
  if (!object) return "";
  if (!object.translations) {
    return (
      object[field] ||
      object["displayFormName"] ||
      object["displayName"] ||
      object["name"]
    );
  }
  const foundTranslation = object.translations.find(
    (t) => t.property === fieldMapping[field] && t.locale === language
  );
  return foundTranslation
    ? foundTranslation.value
    : object[field] ||
        object["displayFormName"] ||
        object["displayName"] ||
        object["name"];
};

export { isInputAllWithinRange, pickTranslation };
