import Base from "@core/base/ReportBase";
import "./index.css";
import locale from "./locale.json";
import { classifyingOrgSelected } from "./p2ild/common/request/utils";
export { classifyingOrgSelected, locale };

class Config extends Base {
  // Server configuration
  // BASE_URL = "https://dev.tkyt.vn/bc25";
  BASE_URL = "https://baocao.tkyt.vn";

  init = async () => {
    // getPickerStateByPath("actions.setAllowPeriodTypes")([PERIOD_TYPE.month]);
  };

  listFolder = {
    core: {
      key: "core",
      label: "Báo cáo theo thông tư 23",
    },
    A6: {
      key: "a6",
      label: "Sổ tử vong A6",
    },
    // other: {
    //   key: "other",
    //   label: "Báo cáo mẫu khác",
    // },
  };

  listReport = [
    {
      key: "bzTX9jvywsh",
      folder: [this.listFolder.A6],
      displayName: "a6 theo tt37",
      getReportInstance: async () => await import("./p2ild/a6"),
    },
    {
      key: "jTlHI1Ahjtg",
      folder: [this.listFolder.A6],
      displayName: "vs-event",
      getReportInstance: async () => await import("./p2ild/vs_a6_event"),
    },
    {
      key: "UWBW0xLXb8f",
      folder: [this.listFolder.A6],
      displayName: "vs-aggregate",
      getReportInstance: async () => await import("./p2ild/vs_a6_aggregate"),
    },
    {
      key: "b2",
      folder: [this.listFolder.core],
      displayName: "b2-tài chính",
      getReportInstance: async () => await import("./p2ild/b2"),
    },
    {
      key: "eOlFpQQhgL4",
      folder: [this.listFolder.core],
      displayName: "Thông tin chung",
      getReportInstance: async () => await import("./p2ild/ttc"),
    },
    {
      folder: [this.listFolder.core],
      key: "R6v6PxC0JM8",
      displayName: "TÌNH HÌNH NHÂN LỰC Y TẾ",
      getReportInstance: async () => await import("./p2ild/b3_new"),
    },
    {
      folder: [this.listFolder.core],
      key: "mMx0kzgX6Uv",
      displayName: "Hoạt động chăm sóc bà mẹ",
      getReportInstance: async () => await import("./p2ild/bmte_b4"),
    },
    {
      folder: [this.listFolder.core],
      key: "IL0TrfanQdq",
      displayName: "vu_bmte_x3",
      getReportInstance: async () => await import("./p2ild/bmte_x3"),
    },
    {
      folder: [this.listFolder.core],
      key: "ctoSw0XuKp7",
      displayName: "TÌNH HÌNH MẮC VÀ TỬ VONG DO TAI BIẾN SẢN KHOA",
      getReportInstance: async () => await import("./p2ild/bmte_b5"),
    },
    {
      folder: [this.listFolder.core],
      key: "r2gK5JEiaxW",
      displayName:
        "HOẠT ĐỘNG KHÁM, CHỮA PHỤ KHOA VÀ SÀNG LỌC UNG THƯ CỔ TỬ CUNG",
      getReportInstance: async () => await import("./p2ild/bmte_b6"),
    },
    {
      folder: [this.listFolder.core],
      key: "xsJNZLJHG6u",
      displayName: "HOẠT ĐỘNG KHHGĐ VÀ PHÁ THAI",
      getReportInstance: async () => await import("./p2ild/bmte_b7"),
    },
    {
      folder: [this.listFolder.core],
      key: "Fdp0zf5qF8L",
      displayName: "TÌNH HÌNH SỨC KHỎE TRẺ EM",
      getReportInstance: async () => await import("./p2ild/bmte_b8"),
    },
    {
      folder: [this.listFolder.core],
      key: "wK2fhfTGl6r",
      displayName: "CƠ SỞ, GIƯỜNG BỆNH VÀ HOẠT ĐỘNG KHÁM CHỮA BỆNH",
      getReportInstance: async () => await import("./p2ild/b9"),
    },
    {
      key: "mV9DjhMHvEp",
      folder: [this.listFolder.core],
      displayName:
        "HOẠT ĐỘNG PHÒNG CHỐNG SỐT RÉT, HIV/AIDS, TNTT, LAO, PHONG VÀ SỨC KHỎE TÂM THẦN",
      getReportInstance: async () => await import("./p2ild/b10_new"),
    },
    {
      key: "Iqmu0dxxYCl",
      folder: [this.listFolder.core],
      displayName: "TÌNH HÌNH MẮC VÀ TỬ VONG BỆNH TRUYỀN NHIỄM GÂY DỊCH",
      getReportInstance: async () => await import("./p2ild/b11_new"),
    },
    {
      key: "YjSRTN0MbGa",
      folder: [this.listFolder.core],
      displayName: "HOẠT ĐỘNG PHÁT HIỆN, QUẢN LÝ ĐIỀU TRỊ BỆNH KHÔNG LÂY NHIỄM",
      getReportInstance: async () => await import("./p2ild/b12_new"),
    },
    {
      key: "test",
      folder: [this.listFolder.core],
      displayName: "TÌNH HÌNH BỆNH TẬT VÀ TỬ VONG TẠI BỆNH VIỆN THEO ICD 10",
      getReportInstance: async () => await import("./b14_icd10"),
    },
    {
      key: "qCzOvTJTt5q",
      folder: [this.listFolder.core],
      displayName: "qCzOvTJTt5q",
      getReportInstance: async () => await import("./p2ild/b13"),
    },
    {
      key: "SCPeFETGN8x",
      folder: [this.listFolder.core],
      displayName: "b14-ICD10",
      getReportInstance: async () => await import("./p2ild/b14_icd10"),
    },
  ];
}

export default new Config();
