import { DATA_ELEMENTS_TABLE_1, HEADER_TABLE_1 } from "./constants";

import DataTable from "./components/DataTable";

// eslint-disable-next-line react/prop-types
const Table_1 = ({ data }) => {
  return (
    <DataTable
      dataElements={DATA_ELEMENTS_TABLE_1}
      headers={HEADER_TABLE_1}
      title="HOẠT ĐỘNG PHÒNG CHỐNG SỐT RÉT, HIV/AIDS"
      code="Báo cáo 10"
      data={data}
    />
  );
};

export default Table_1;
