import { DATA_ELEMENTS_TABLE_1, HEADER_TABLE_1 } from "./constants";

import DataTable from "./components/DataTable";

// eslint-disable-next-line react/prop-types
const Table_1 = ({ data }) => {
  return (
    <DataTable
      dataElements={DATA_ELEMENTS_TABLE_1}
      headers={HEADER_TABLE_1}
      title="PHÁT HIỆN, QUẢN LÝ ĐIỀU TRỊ BỆNH KHÔNG LÂY"
      code="Báo cáo 12"
      data={data}
      id={"table-1"}
    />
  );
};

export default Table_1;
