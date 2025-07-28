import { DATA_ELEMENTS_TABLE_3, HEADER_TABLE_3 } from "./constants";

import DataTable from "./components/DataTable";

// eslint-disable-next-line react/prop-types
const Table_3 = () => {
  return (
    <DataTable
      dataElements={DATA_ELEMENTS_TABLE_3}
      headers={HEADER_TABLE_3}
      title="HOẠT ĐỘNG PHÒNG CHỐNG SỨC KHỎE TÂM THẦN, LAO, PHONG"
      code="Báo cáo 10"
    />
  );
};

export default Table_3;
