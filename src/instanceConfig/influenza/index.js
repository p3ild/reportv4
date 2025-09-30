import Base from "@core/base/ReportBase";
import "./index.css";
import locale from "./locale.json";
import { classifyingOrgSelected } from "./p2ild/common/request/utils";
export { classifyingOrgSelected, locale };

class Config extends Base {
  // Server configuration
  // BASE_URL = "https://dev.tkyt.vn/bc25";
  // BASE_URL = "https://flu.kcb.vn/influenzanew";
  BASE_URL = "https://flu.kcb.vn/influenza";

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
      getReportInstance: async () => await import("./p2ild/0_flu_flunet"),
    },
    {
      folder: [this.listFolder.core],
      key: "jbI9SpB3vnk",
      getReportInstance: async () => await import("./p2ild/0_flu_order_request"),
    },
    {
      folder: [this.listFolder.core],
      key: "R2r10ZV2Z7g",
      getReportInstance: async () => await import("./p2ild/0_flu_ds_lab"),
    },
    {
      folder: [this.listFolder.core],
      key: "Ik4J9q93KF1",
      getReportInstance: async () => await import("./p2ild/0_flu_ds_bv"),
    },
    {
      folder: [this.listFolder.core],
      key: "qy3vLJrruct",
      getReportInstance: async () => await import("./p2ild/0_flu_phieu2"),
    },
    {
      folder: [this.listFolder.core],
      key: "mSMg49wJAGd",
      getReportInstance: async () => await import("./p2ild/0_flu_phieu4"),
    },
  ];
}

export default new Config();
