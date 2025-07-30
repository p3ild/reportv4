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
  "IjU8czIZwdy",
  "icS2nkzzdv8.PBCrMhM5tG1",
  "d9dkr72ldLN.ZpUNdAWTzju",
  "yrhc5FZua1f",
  "i4jo4Fh5zPN.PBCrMhM5tG1",
  "GjqYq9b8bFn.ZpUNdAWTzju",
  "zk5j0ZwHOF2",
  "B7yP8MmG3HJ.PBCrMhM5tG1",
  "Yd7yygLgYue.ZpUNdAWTzju",
  "f9n1XoZt4rq",
  "HcyREHmKrPM.PBCrMhM5tG1",
  "BNuK7qsDc5V.ZpUNdAWTzju",
];

//table 2
const DATA_ELEMENTS_TABLE_2 = [
  "anDGJRgg3F0",
  "Fgfyca3IVuM.PBCrMhM5tG1",
  "me9mk1OXcW2.ZpUNdAWTzju",
  "BvvkhL6tcdx",
  "WSUkqeqXbWO.PBCrMhM5tG1",
  "sxCM4oRCF5z.ZpUNdAWTzju",
  "SbynxVeBEyk",
  "RpJeDDGzpYt.PBCrMhM5tG1",
  "qz30Vcs4UOE.ZpUNdAWTzju",
  "pzvYHsdnpSI",
  "aDIlmHjdxch.PBCrMhM5tG1",
  "oQ1eUbQXnA4.ZpUNdAWTzju",
  "gvu1wrEt6mY",
  "d4idAZBs7aR.PBCrMhM5tG1",
  "ecnwSBnApM3.ZpUNdAWTzju",
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
  "qLIFtZ8Y64i",
  "lQniaEDE0zj.PBCrMhM5tG1",
  "RoNWo78P92J.ZpUNdAWTzju",
  "wGes0drSMQw",
  "moUhfe3z4xn.PBCrMhM5tG1",
  "cUnrKRSxFcg.ZpUNdAWTzju",
  "ReHMvJAUjLn",
  "pRF4qURyWHq.PBCrMhM5tG1",
  "aUaYRtA4OuZ.ZpUNdAWTzju",
  "iDsJbm7bZtX",
  "hAh6A8CC4IW.PBCrMhM5tG1",
  "fgdUu6zpu5T.ZpUNdAWTzju",
  "oE2GzyDa7O2",
  "qQeyMtOYpRS.PBCrMhM5tG1",
  "hBrE4YgsrZU.ZpUNdAWTzju",
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
