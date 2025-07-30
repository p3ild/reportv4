import { DATA_ELEMENTS_TABLE_1, HEADER_TABLE_1 } from "./constants";

import DataTable from "./components/DataTable";

// eslint-disable-next-line react/prop-types
const Table_1 = ({ data }) => {
  return (
    <DataTable
      dataElements={DATA_ELEMENTS_TABLE_1}
      headers={HEADER_TABLE_1}
      title="BÁO CÁO 10 - HOẠT ĐỘNG PHÒNG CHỐNG SỐT RÉT, HIV/AIDS, TNTT, LAO, PHONG VÀ SỨC KHỎE TÂM THẦN"
      subTitle="HOẠT ĐỘNG PHÒNG CHỐNG SỐT RÉT, HIV/AIDS"
      code="Báo cáo 10"
      data={data}
      id={"table-1"}
    />
  );
};

export default Table_1;
