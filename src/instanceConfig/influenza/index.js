import Base from "@core/base/ReportBase";
import "./index.css";
import locale from "./locale.json";
import { classifyingOrgSelected } from "./p2ild/common/request/utils";
export { classifyingOrgSelected, locale };

class Config extends Base {
  // Server configuration
  // BASE_URL = "https://dev.tkyt.vn/bc25";
  BASE_URL = "https://flu.kcb.vn/influenzanew";

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
      key: "key_flunet",
      displayName: "Báo cáo Flunet",
      getReportInstance: async () => await import("./p2ild/0_flu_flunet"),
    },
  ];
}

export default new Config();
