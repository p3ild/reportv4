import Base from "@core/base/ReportBase";
import "./index.css";
import locale from "./locale.json";
import { classifyingOrgSelected } from "./p2ild/common/request/utils";
export { classifyingOrgSelected, locale };

class Config extends Base {
  // Server configuration
  // BASE_URL = "https://dev.tkyt.vn/bc25";
  BASE_URL = "https://flu.kcb.vn/influenzanew";
  // BASE_URL = "https://flu.kcb.vn/influenza";

  init = async () => {
    // getPickerStateByPath("actions.setAllowPeriodTypes")([PERIOD_TYPE.month]);
  };

  listFolder = {
    core: {
      key: "core",
      label: "Báo cáo chung",
    }
  };

  listReport = [
    {
      folder: [this.listFolder.core],
      key: "HMVW2QrdCg9",
      displayName: "Báo cáo Flunet",
      getReportInstance: async () => await import("./p2ild/0_flu_flunet"),
    },
    {
      folder: [this.listFolder.core],
      key: "jbI9SpB3vnk",
      displayName: "Đề xuất mua sắm vật tư, sinh phẩm",
      getReportInstance: async () => await import("./p2ild/0_flu_order_request"),
    },
    {
      folder: [this.listFolder.core],
      key: "R2r10ZV2Z7g",
      displayName: "Danh sách lab",
      getReportInstance: async () => await import("./p2ild/0_flu_ds_lab"),
    },
    {
      folder: [this.listFolder.core],
      key: "Ik4J9q93KF1",
      displayName: "Danh sách bv",
      getReportInstance: async () => await import("./p2ild/0_flu_ds_bv"),
    },
    {
      folder: [this.listFolder.core],
      key: "qy3vLJrruct",
      displayName: "Phiếu 2",
      getReportInstance: async () => await import("./p2ild/0_flu_phieu2"),
    },
    {
      folder: [this.listFolder.core],
      key: "mSMg49wJAGd",
      displayName: "Phiếu 4",
      getReportInstance: async () => await import("./p2ild/0_flu_phieu4"),
    },
  ];
}

export default new Config();
