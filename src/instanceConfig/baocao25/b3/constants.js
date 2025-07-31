const REPORT_NAME = "b3";

const ROW_GENERATE_FOR_NATION_LEVEL = [
  { label: "Tuyến trung ương", ougs: ["UlhXS5yPKpZ"] },
  { label: "Tuyến tỉnh", ougs: ["ImtV96dR0JK"] },
  { label: "Tuyến xã", ougs: ["uyuiasZ82O4"] },
  { label: "Tư nhân", ougs: ["yvriG1o5Xqh"] },
];

const ROW_GENERATE_FOR_PROVINCE_LEVEL = [
  {
    id: "publicHeath",
    label: "Y tế công",
    prefix: "A",
    children: [
      { label: "Tuyến trung ương", prefix: "I", ougs: ["UlhXS5yPKpZ"] },
      { label: "Tuyến tỉnh", prefix: "II", ougs: ["ImtV96dR0JK"] },
      { label: "Tuyến xã", prefix: "III", ougs: ["uyuiasZ82O4"] },
    ],
  },
  {
    id: "privateHealth",
    label: "Y tế tư nhân",
    prefix: "B",
    ougs: ["yvriG1o5Xqh"],
  },
];

const ROW_GENERATE_FOR_COMMUNE_LEVEL = [
  {
    id: "medicalStation",
    label: "Trạm y tế",
    prefix: "I",
    ougs: ["OHWM3DxkeMR"],
  },
  {
    id: "otherMedicalFacilities",
    label: "Cơ sở y tế khác",
    prefix: "II",
    ougs: ["eHs95ggJw7J"],
  },
];
//table 1
const HEADER_TABLE_1 = [
  [
    { label: "TT", rowSpan: 3, className: "sticky-col", "sticky-col": 0 },
    {
      label: "Tên cơ sở",
      rowSpan: 3,
      className: "sticky-col",
      "sticky-col": 1,
    },
    {
      label: "NLYT  toàn tỉnh",
      colSpan: 3,
    },
    {
      label: "Sau đại học Y khoa",
      colSpan: 3,
    },
    {
      label: "Bác sỹ ",
      colSpan: 3,
    },
    {
      label: " YTCC (ĐH và SĐH)",
      colSpan: 3,
    },
    {
      label: "Điều dưỡng ĐH và sau ĐH",
      colSpan: 3,
    },
  ],
  [
    { label: "Tổng số", rowSpan: 2 },
    { label: "Trong đó", colSpan: 2 },
    { label: "Tổng số", rowSpan: 2 },
    { label: "Trong đó", colSpan: 2 },
    { label: "Tổng số", rowSpan: 2 },
    { label: "Trong đó", colSpan: 2 },
    { label: "Tổng số", rowSpan: 2 },
    { label: "Trong đó", colSpan: 2 },
    { label: "Tổng số", rowSpan: 2 },
    { label: "Trong đó", colSpan: 2 },
  ],
  [
    {
      label: "Nữ",
    },
    {
      label: "Dân tộc thiểu số",
    },
    {
      label: "Nữ",
    },
    {
      label: "Dân tộc thiểu số",
    },
    {
      label: "Nữ",
    },
    {
      label: "Dân tộc thiểu số",
    },
    {
      label: "Nữ",
    },
    {
      label: "Dân tộc thiểu số",
    },
    {
      label: "Nữ",
    },
    {
      label: "Dân tộc thiểu số",
    },
  ],
];
const DATA_ELEMENTS_TABLE_1 = [
  "q89OtnM0Eh2",
  "uT4AyDAaTrg",
  "ebqyUZOnSkm",
  "icS2nkzzdv8",
  "icS2nkzzdv8.GvoEANq375m",
  "d9dkr72ldLN",
  "i4jo4Fh5zPN",
  "i4jo4Fh5zPN.GvoEANq375m",
  "GjqYq9b8bFn",
  "B7yP8MmG3HJ",
  "B7yP8MmG3HJ.GvoEANq375m",
  "Yd7yygLgYue",
  "HcyREHmKrPM",
  "HcyREHmKrPM.GvoEANq375m",
  "BNuK7qsDc5V",
];

//table 2
const DATA_ELEMENTS_TABLE_2 = [
  "Fgfyca3IVuM",
  "Fgfyca3IVuM.GvoEANq375m",
  "me9mk1OXcW2",
  "WSUkqeqXbWO",
  "WSUkqeqXbWO.GvoEANq375m",
  "sxCM4oRCF5z",
  "RpJeDDGzpYt",
  "RpJeDDGzpYt.GvoEANq375m",
  "qz30Vcs4UOE",
  "aDIlmHjdxch",
  "aDIlmHjdxch.GvoEANq375m",
  "oQ1eUbQXnA4",
  "d4idAZBs7aR",
  "d4idAZBs7aR.GvoEANq375m",
  "ecnwSBnApM3",
];
const HEADER_TABLE_2 = [
  [
    { label: "TT", rowSpan: 3, className: "sticky-col", "sticky-col": 0 },
    {
      label: "Tên cơ sở",
      rowSpan: 3,
      className: "sticky-col",
      "sticky-col": 1,
    },

    {
      label: "KTV y  ĐH và sau ĐH",
      colSpan: 3,
    },
    {
      label: "Hộ sinh đại học",
      colSpan: 3,
    },
    {
      label: "Y sĩ",
      colSpan: 3,
    },
    {
      label: "KTV Cao đẳng và TH y",
      colSpan: 3,
    },
    {
      label: "Điều dưỡng CĐ&TH",
      colSpan: 3,
    },
  ],
  [
    { label: "Tổng số", rowSpan: 2 },
    { label: "Trong đó", colSpan: 2 },
    { label: "Tổng số", rowSpan: 2 },
    { label: "Trong đó", colSpan: 2 },
    { label: "Tổng số", rowSpan: 2 },
    { label: "Trong đó", colSpan: 2 },
    { label: "Tổng số", rowSpan: 2 },
    { label: "Trong đó", colSpan: 2 },
    { label: "Tổng số", rowSpan: 2 },
    { label: "Trong đó", colSpan: 2 },
  ],
  [
    {
      label: "Nữ",
    },
    {
      label: "Dân tộc thiểu số",
    },
    {
      label: "Nữ",
    },
    {
      label: "Dân tộc thiểu số",
    },
    {
      label: "Nữ",
    },
    {
      label: "Dân tộc thiểu số",
    },
    {
      label: "Nữ",
    },
    {
      label: "Dân tộc thiểu số",
    },
    {
      label: "Nữ",
    },
    {
      label: "Dân tộc thiểu số",
    },
  ],
];
//table 3
const DATA_ELEMENTS_TABLE_3 = [
  "lQniaEDE0zj",
  "lQniaEDE0zj.GvoEANq375m",
  "RoNWo78P92J",
  "moUhfe3z4xn",
  "moUhfe3z4xn.GvoEANq375m",
  "cUnrKRSxFcg",
  "pRF4qURyWHq",
  "pRF4qURyWHq.GvoEANq375m",
  "aUaYRtA4OuZ",
  "hAh6A8CC4IW",
  "hAh6A8CC4IW.GvoEANq375m",
  "fgdUu6zpu5T",
  "qQeyMtOYpRS",
  "qQeyMtOYpRS.GvoEANq375m",
  "hBrE4YgsrZU",
];
const HEADER_TABLE_3 = [
  [
    { label: "TT", rowSpan: 3, className: "sticky-col", "sticky-col": 0 },
    {
      label: "Tên cơ sở",
      rowSpan: 3,
      className: "sticky-col",
      "sticky-col": 1,
    },

    {
      label: "Hộ sinh cao đẳng và TH",
      colSpan: 3,
    },
    {
      label: "Sau đại học dược ",
      colSpan: 3,
    },
    {
      label: "Đại học dược",
      colSpan: 3,
    },
    {
      label: "Cao đẳng, trung học dược",
      colSpan: 3,
    },
    {
      label: "Nhân lực y tế khác",
      colSpan: 3,
    },
  ],
  [
    { label: "Tổng số", rowSpan: 2 },
    { label: "Trong đó", colSpan: 2 },
    { label: "Tổng số", rowSpan: 2 },
    { label: "Trong đó", colSpan: 2 },
    { label: "Tổng số", rowSpan: 2 },
    { label: "Trong đó", colSpan: 2 },
    { label: "Tổng số", rowSpan: 2 },
    { label: "Trong đó", colSpan: 2 },
    { label: "Tổng số", rowSpan: 2 },
    { label: "Trong đó", colSpan: 2 },
  ],
  [
    {
      label: "Nữ",
    },
    {
      label: "Dân tộc thiểu số",
    },
    {
      label: "Nữ",
    },
    {
      label: "Dân tộc thiểu số",
    },
    {
      label: "Nữ",
    },
    {
      label: "Dân tộc thiểu số",
    },
    {
      label: "Nữ",
    },
    {
      label: "Dân tộc thiểu số",
    },
    {
      label: "Nữ",
    },
    {
      label: "Dân tộc thiểu số",
    },
  ],
];
export {
  REPORT_NAME,
  HEADER_TABLE_1,
  DATA_ELEMENTS_TABLE_1,
  ROW_GENERATE_FOR_NATION_LEVEL,
  ROW_GENERATE_FOR_PROVINCE_LEVEL,
  ROW_GENERATE_FOR_COMMUNE_LEVEL,
  DATA_ELEMENTS_TABLE_2,
  HEADER_TABLE_2,
  DATA_ELEMENTS_TABLE_3,
  HEADER_TABLE_3,
};
