const REPORT_NAME = "b10_tntt_hiv_sktt";
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
    { label: "Phòng chống sốt rét", colSpan: 2 },
    { label: "Phòng chống HIV/AIDS", colSpan: 9 },
  ],
  [
    { label: "Tổng số BN SR mới phát hiện", rowSpan: 2 },
    { label: "Số BN tử vong do sốt rét", rowSpan: 2 },
    { label: "Số ca nhiễm HIV mới phát hiện", colSpan: 2 },
    { label: "Số hiện nhiễm HIV được phát hiện", colSpan: 2 },
    {
      label: "Số hiện nhiễm HIV được phát hiện trong nhóm tuổi 15-49",
      colSpan: 2,
    },
    { label: "Số hiện mắc AIDS", rowSpan: 2 },
    { label: "Số ca tử vong do HIV/ AIDS", colSpan: 2 },
  ],
  [
    {
      label: "Tổng số",
    },
    {
      label: "Trđ: Nữ",
    },
    {
      label: "Tổng số",
    },
    {
      label: "Trđ: Nữ",
    },
    {
      label: "Tổng số",
    },
    {
      label: "Trđ: Nữ",
    },
    {
      label: "Tổng số",
    },
    {
      label: "Trđ: Nữ1",
    },
  ],
];
const DATA_ELEMENTS_TABLE_1 = [
  "qI0aviwI9JS",
  "iWThCH73sWu",
  "Vs6TWC5SxbB",
  "Vs6TWC5SxbB.GvoEANq375m",
  "pvzHrKHH3I5",
  "pvzHrKHH3I5.GvoEANq375m",
  "WvJoHH7IjFL",
  "WvJoHH7IjFL.GvoEANq375m",
  "wSak01RyjQ7",
  "T01fetxyjry",
  "T01fetxyjry.GvoEANq375m",
];

const ROW_GENERATE_FOR_NATION_LEVEL = [
  { label: "Tuyến trung ương", ougs: ["a8tDjfQpPbK"] },
  { label: "Tuyến tỉnh", ougs: ["ubpcYbv2aKe"] },
  { label: "Tuyến xã", ougs: ["uyuiasZ82O4"] },
  { label: "Tư nhân", ougs: ["b3Fa4WDUKDl", "LDueUOVxA6b"] },
];

const ROW_GENERATE_FOR_PROVINCE_LEVEL = [
  {
    id: "publicHeath",
    label: "Y tế công",
    prefix: "A",
    children: [
      { label: "Tuyến trung ương", prefix: "I", ougs: ["a8tDjfQpPbK"] },
      { label: "Tuyến tỉnh", prefix: "II", ougs: ["ubpcYbv2aKe"] },
      { label: "Tuyến xã", prefix: "III", ougs: ["uyuiasZ82O4"] },
    ],
  },
  {
    id: "privateHealth",
    label: "Y tế tư nhân",
    prefix: "B",
    children: [
      { label: "Bệnh viện", prefix: "I", ougs: ["b3Fa4WDUKDl"] },
      { label: "Phòng khám", prefix: "II", ougs: ["LDueUOVxA6b"] },
    ],
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
//table 2
const DATA_ELEMENTS_TABLE_2 = [
  "sFUAD4MnkHI",
  "y1ilq7olBtd",
  "SU5TCu78G5r",
  "C2irCIrpkkr",
  "XLYCEsxbKNy",
  "YWMQ8PsEBsT",
  "L94SudtYkGW",
  "WlHO5LcGWP2",
  "GrNc7zoULxR",
  "gbwSwTveKtm",
  "DlvwHheog9N",
];
const HEADER_TABLE_2 = [
  [
    { label: "TT", rowSpan: 2, className: "sticky-col", "sticky-col": 0 },
    {
      label: "Tên cơ sở",
      rowSpan: 2,
      className: "sticky-col",
      "sticky-col": 1,
    },
    { label: "Tai nạn thương tích (*)", colSpan: 11 },
  ],
  [
    {
      label: "Tai nạn Giao thông",
    },
    {
      label: "Tai nạn lao động",
    },
    {
      label: "Đuối nước",
    },
    {
      label: "Ngã",
    },
    {
      label: "Bỏng",
    },
    {
      label: "Tự tử",
    },
    {
      label: "Ngộ độc (hóa chất, thực phẩm)",
    },
    {
      label: "Hóc sặc dị vật",
    },
    {
      label: "Động vật cắn, đốt, húc",
    },
    {
      label: "Bạo lực xung đột",
    },
    {
      label: "Tai nạn khác",
    },
  ],
];
//table 3
const DATA_ELEMENTS_TABLE_3 = [
  "Gx8E2HsAjVp",
  "SOmWBc5Ygym",
  "j6hjO2EvUOH",
  "CwwMLAEYbuD",
  "QRIgOI9CRNd",
  "UM3QlJaRPC2",
  "uI19xKbu3FK",
  "TbLiWnKhIHl",
  "ose2S8zvDqP",
  "f66ZItJ5oIg",
  "f66ZItJ5oIg.GvoEANq375m",
  "VahmSj3Qy7r",
  "nRHsIIl3soX",
  "nRHsIIl3soX.GvoEANq375m",
  "cmtE2AIEOmS",
  "LdIfOeZFCXU",
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
    { label: "Sức khỏe tâm thần", colSpan: 6 },
    { label: "Phòng chống Lao", colSpan: 5 },
    { label: "Phòng chống bệnh Phong", colSpan: 5 },
  ],
  [
    {
      label: "Số BN hiện mắc động kinh",
      colSpan: 3,
    },
    {
      label: "Số BN hiện mắc tâm thần phân liệt",
      colSpan: 3,
    },
    { label: "Số BN lao phổi có bằng chứng VK học mới phát hiện", rowSpan: 2 },
    { label: "Số BN lao các thể được phát hiện", rowSpan: 2 },
    {
      label: "Số BN lao mới có bằng chứng VK học được điều trị khỏi",
      rowSpan: 2,
    },
    { label: "Số BN tử vong trong thời gian điều trị lao", colSpan: 2 },
    { label: "Số BN hiện mắc được phát hiện", rowSpan: 2 },
    { label: "Số BN mới phát hiện", colSpan: 3 },
    { label: "Số BN Phong mới bị tàn tật độ II", rowSpan: 2 },
  ],
  [
    { label: "Tổng số" },
    { label: "Số BN được quản lý" },
    { label: "Số BN mới phát hiện" },
    { label: "Tổng số" },
    { label: "Số BN được quản lý" },
    { label: "Số BN mới phát hiện" },
    { label: "Tổng số" },
    { label: "Trđ: Nữ" },
    { label: "Tổng số" },
    { label: "Trđ: Nữ" },
    { label: "Trẻ em < 15 tuổi" },
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
