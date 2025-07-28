import { PERIOD_TYPE } from "@core/ui/picker/periodpicker/periodpicker";
import Base from "@core/base/ReportBase";
import { getPickerStateByPath } from "@core/stateManage/corePickerState";
import { classifyingOrgSelected } from "./p2ild/common/request/utils";
import locale from "./locale.json";
export { locale, classifyingOrgSelected };

class Config extends Base {
  // Server configuration
  BASE_URL = "https://dev.tkyt.vn/bc25";

  init = async () => {
    getPickerStateByPath("actions.setAllowPeriodTypes")([PERIOD_TYPE.year]);
  };

  listFolder = {
    core: {
      key: "core",
      label: "Báo cáo cốt lõi ",
    },

    other: {
      key: "other",
      label: "Báo cáo mẫu khác",
    },
  };

  listReport = [
    {
      key: "",
      folder: [this.listFolder.core],
      displayName: "HOẠT ĐỘNG PHÒNG CHỐNG SỐT RÉT, HIV/AIDS",
      getReportInstance: async () => await import("./b10_tntt_hiv_sktt"),
    },
    {
      key: "",
      folder: [this.listFolder.core],
      displayName: "TÌNH HÌNH MẮC VÀ TỬ VONG BỆNH  TRUYỀN NHIỄM GÂY DỊCH  ",
      getReportInstance: async () => await import("./b11_tngd"),
    },
    {
      key: "eOlFpQQhgL4",
      folder: [this.listFolder.core],
      displayName: "Thông tin chung",
      getReportInstance: async () => await import("./p2ild/ttc"),
    },
    {
      folder: [this.listFolder.core],
      key: "mMx0kzgX6Uv",
      displayName: "Hoạt động chăm sóc bà mẹ",
      getReportInstance: async () => await import("./p2ild/bmte_b4"),
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
  ];
}

export default new Config();
