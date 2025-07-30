import { DATA_ELEMENTS_TABLE_3, HEADER_TABLE_3 } from "./constants";

import DataTable from "./components/DataTable";

// eslint-disable-next-line react/prop-types
const Table_3 = ({ data }) => {
  return (
    <DataTable
      dataElements={DATA_ELEMENTS_TABLE_3}
      headers={HEADER_TABLE_3}
      title="TÌNH HÌNH NHÂN LỰC Y TẾ TOÀN TỈNH"
      code="Báo cáo 3"
      data={data}
      id={"table-3"}
    />
  );
};

export default Table_3;
