import { DATA_ELEMENTS_TABLE_2, HEADER_TABLE_2 } from "./constants";

import DataTable from "./components/DataTable";

// eslint-disable-next-line react/prop-types
const Table_2 = ({ data }) => {
  return (
    <DataTable
      dataElements={DATA_ELEMENTS_TABLE_2}
      headers={HEADER_TABLE_2}
      title="BÁO CÁO 10 - HOẠT ĐỘNG PHÒNG CHỐNG SỐT RÉT, HIV/AIDS, TNTT, LAO, PHONG VÀ SỨC KHỎE TÂM THẦN"
      subTitle="HOẠT ĐỘNG PHÒNG CHỐNG TAI NẠN THƯƠNG  TÍCH"
      code="Báo cáo 10"
      data={data}
      id={"table-2"}
    />
  );
};

export default Table_2;
