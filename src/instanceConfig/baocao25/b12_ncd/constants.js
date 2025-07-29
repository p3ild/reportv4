const REPORT_NAME = "b12_ncd";
const ROW_GENERATE_FOR_NATION_LEVEL = [
  {
    label: "Tuyến trung ương",
    ougs: ["HBkLjXEWSBZ"],
    blocks: [
      "TjsrDy8W8h3",
      "TyqF8uBkL7B",
      "U5RaHHmpAFs",
      "ChgePBcK76w",
      "DkOZff7DZkl",
      "ZIOSE2mQfW9",
      "L5TaiYbqD6w",
      "JXXc1zqIIwf",
    ],
  },
  {
    label: "Tuyến tỉnh",
    ougs: ["kh9FwPDWgUi"],
    blocks: [
      "TjsrDy8W8h3",
      "TyqF8uBkL7B",
      "U5RaHHmpAFs",
      "ChgePBcK76w",
      "DkOZff7DZkl",
      "ZIOSE2mQfW9",
      "L5TaiYbqD6w",
      "JXXc1zqIIwf",
    ],
  },
  { label: "Tuyến xã", ougs: ["uyuiasZ82O4"] },
  {
    label: "Tư nhân",
    ougs: ["rz2nPhBJoVo"],
    blocks: [
      "TjsrDy8W8h3",
      "TyqF8uBkL7B",
      "U5RaHHmpAFs",
      "ChgePBcK76w",
      "DkOZff7DZkl",
      "ZIOSE2mQfW9",
      "L5TaiYbqD6w",
      "JXXc1zqIIwf",
    ],
  },
];

const ROW_GENERATE_FOR_PROVINCE_LEVEL = [
  {
    id: "publicHeath",
    label: "Y tế công",
    prefix: "A",
    children: [
      {
        label: "Tuyến trung ương",
        prefix: "I",
        ougs: ["HBkLjXEWSBZ"],
        blocks: [
          "TjsrDy8W8h3",
          "TyqF8uBkL7B",
          "U5RaHHmpAFs",
          "ChgePBcK76w",
          "DkOZff7DZkl",
          "ZIOSE2mQfW9",
          "L5TaiYbqD6w",
          "JXXc1zqIIwf",
        ],
      },
      {
        label: "Tuyến tỉnh",
        prefix: "II",
        ougs: ["kh9FwPDWgUi"],
        blocks: [
          "TjsrDy8W8h3",
          "TyqF8uBkL7B",
          "U5RaHHmpAFs",
          "ChgePBcK76w",
          "DkOZff7DZkl",
          "ZIOSE2mQfW9",
          "L5TaiYbqD6w",
          "JXXc1zqIIwf",
        ],
      },
      { label: "Tuyến xã", prefix: "III", ougs: ["uyuiasZ82O4"] },
    ],
  },
  {
    id: "privateHealth",
    label: "Y tế tư nhân",
    blocks: [
      "TjsrDy8W8h3",
      "TyqF8uBkL7B",
      "U5RaHHmpAFs",
      "ChgePBcK76w",
      "DkOZff7DZkl",
      "ZIOSE2mQfW9",
      "L5TaiYbqD6w",
      "JXXc1zqIIwf",
    ],
    prefix: "B",
    ougs: ["rz2nPhBJoVo"],
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
    { label: "TT", rowSpan: 4, className: "sticky-col", "sticky-col": 0 },
    {
      label: "Tên cơ sở",
      rowSpan: 4,
      className: "sticky-col",
      "sticky-col": 1,
    },
    { label: "Bệnh tăng huyết áp", colSpan: 5 },
    { label: "Bệnh đái tháo đường", colSpan: 5 },
  ],
  [
    { label: "Phát hiện", colSpan: 2 },
    { label: "Quản lý điều trị", colSpan: 3 },
    { label: "Phát hiện", colSpan: 2 },
    { label: "Quản lý điều trị", colSpan: 3 },
  ],
  [
    { label: "Tổng số người được phát hiện", rowSpan: 2 },
    { label: "Số người mới phát hiện trong kỳ báo cáo", rowSpan: 2 },
    { label: "Tổng số BN đang được quản lý", rowSpan: 2 },
    { label: "Trong đó", colSpan: 2 },
    { label: "Tổng số người được phát hiện", rowSpan: 2 },
    { label: "Số người mới phát hiện trong kỳ báo cáo", rowSpan: 2 },
    { label: "Tổng số BN đang được quản lý", rowSpan: 2 },
    { label: "Trong đó", colSpan: 2 },
  ],
  [
    {
      label: "Khám cấp thuốc tháng vừa qua",
    },
    {
      label: "Điều tri đạt huyết áp mục tiêu",
    },
    {
      label: "Khám cấp thuốc tháng vừa qua",
    },
    {
      label: "Điều tri đạt huyết áp mục tiêu",
    },
  ],
];
const DATA_ELEMENTS_TABLE_1 = [
  "TjsrDy8W8h3",
  "TyqF8uBkL7B",
  "CR18qa3xmiF",
  "RRnKZsIUweW",
  "S4NScJXJ0Bx",
  "U5RaHHmpAFs",
  "ChgePBcK76w",
  "mzyg9Os6CYe",
  "TgPeB3Q82Az",
  "PFBtIcnqhNV",
];

//table 2
const DATA_ELEMENTS_TABLE_2 = [
  "DkOZff7DZkl",
  "ZIOSE2mQfW9",
  "U3cZRl5Hci5",
  "rbCiI7G5WDu",
  "fUaToKQ0ZpI",
  "L5TaiYbqD6w",
  "JXXc1zqIIwf",
  "HKg6QgHYSiu",
  "a8twU2lbca9",
  "VA1GARaJqcO",
];
const HEADER_TABLE_2 = [
  [
    { label: "TT", rowSpan: 4, className: "sticky-col", "sticky-col": 0 },
    {
      label: "Tên cơ sở",
      rowSpan: 4,
      className: "sticky-col",
      "sticky-col": 1,
    },
    { label: "Bệnh phổi tắc nghẽn mạn tính và hen phế quản", colSpan: 5 },
    { label: "Bệnh không lây nhiễm khác", colSpan: 5 },
  ],
  [
    { label: "Phát hiện", colSpan: 2 },
    { label: "Quản lý điều trị", colSpan: 3 },
    { label: "Phát hiện", colSpan: 2 },
    { label: "Quản lý điều trị", colSpan: 3 },
  ],
  [
    { label: "Tổng số người được phát hiện", rowSpan: 2 },
    { label: "Số người mới phát hiện trong kỳ báo cáo", rowSpan: 2 },
    { label: "Tổng số BN đang được quản lý", rowSpan: 2 },
    { label: "Trong đó", colSpan: 2 },
    { label: "Tổng số người được phát hiện", rowSpan: 2 },
    { label: "Số người mới phát hiện trong kỳ báo cáo", rowSpan: 2 },
    { label: "Tổng số BN đang được quản lý", rowSpan: 2 },
    { label: "Trong đó", colSpan: 2 },
  ],
  [
    {
      label: "Khám cấp thuốc tháng vừa qua",
    },
    {
      label: "Điều tri đạt huyết áp mục tiêu",
    },
    {
      label: "Khám cấp thuốc tháng vừa qua",
    },
    {
      label: "Điều tri đạt huyết áp mục tiêu",
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
};
