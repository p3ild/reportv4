import { DATA_ELEMENTS_TABLE_2, HEADER_TABLE_2 } from "./constants";

import DataTable from "./components/DataTable";

// eslint-disable-next-line react/prop-types
const Table_2 = () => {
  return (
    <DataTable
      dataElements={DATA_ELEMENTS_TABLE_2}
      headers={HEADER_TABLE_2}
      title="HOẠT ĐỘNG PHÒNG CHỐNG TAI NẠN THƯƠNG  TÍCH"
      code="Báo cáo 10"
    />
  );
};

export default Table_2;
