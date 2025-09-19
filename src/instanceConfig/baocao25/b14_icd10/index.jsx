import {
  getPickerStateByPath,
  useCorePickerState,
} from "@core/stateManage/corePickerState";
import { PERIOD_TYPE } from "@core/ui/picker/periodpicker/constant";
import React, { useEffect, useState } from "react";
import { ORG_GROUP } from "../p2ild/common/constant";

import { findHeaderIndex } from "../p2ild/common/utils";

import { useCoreMetaState } from "@core/stateManage/metadataState";
import { useShallow } from "zustand/react/shallow";
import { isInputAllWithinRange, pickTranslation } from "./utils";
import useSticky from "./hooks/useSticky";

const REPORT_NAME = "b14_icd10";
const B14 = () => {
  const [data, setData] = useState();

  const { _get, setGlobalOverlay, me, setExcelOptions } = useCoreMetaState(
    useShallow((state) => ({
      _get: state._get,
      setGlobalOverlay: state.actions.setGlobalOverlay,
      setExcelOptions: state.actions.setExcelOptions,
      me: state.me,
    }))
  );
  const { corePicker } = useCorePickerState(
    useShallow((state) => ({
      corePicker: state.corePicker,
    }))
  );
  useEffect(() => {
    getPickerStateByPath("actions.setAllowPeriodTypes")([
      PERIOD_TYPE.year,
      PERIOD_TYPE.month,
    ]);

    getPickerStateByPath("actions.setOrgPickerConfig")({
      orgGroupVisible: [
        ORG_GROUP.TINH_YTTN,
        ORG_GROUP.TINH_CSYT_CONG_KCB,
        ORG_GROUP.TW_CSYT_KCB,
        ORG_GROUP.TW_YT_NGANH,
        ORG_GROUP.TINH_DVHC,
      ],
      // levelsToHideIfEmpty: [3]
    });
    setExcelOptions({
      columnWidths: "10,40,20",
      excelFileName: "Báo cáo 14",
    });
  }, []);

  const [options, setOptions] = useState();

  const getMetaData = async () => {
    try {
      const result = await _get(
        `/api/optionSets/OXH5bk60BAx?fields=options[id,code,name,translations]`
      );
      setOptions(result.options);
    } catch (error) {
      console.log(error);
    }
  };

  //   const getData = async () => {
  //     try {
  //       setGlobalOverlay({ isOpen: true });

  //       const result = await _get(
  //         `/api/analytics?dimension=dx:${[
  //           ...DATA_ELEMENTS_TABLE_1,
  //           ...DATA_ELEMENTS_TABLE_2,
  //           ...DATA_ELEMENTS_TABLE_3,
  //         ].join(";")},ou:${
  //           corePicker.orgSelected.id
  //         };LEVEL-1;LEVEL-2;LEVEL-3;LEVEL-4&filter=pe:${
  //           corePicker.periodSelected.outputDataDhis2
  //         }`
  //       );
  //       const valueIndex = findHeaderIndex(result, "value");
  //       const dxIndex = findHeaderIndex(result, "dx");
  //       const ouIndex = findHeaderIndex(result, "ou");

  //       const dataResult = result.rows.map((row) => ({
  //         value: row[valueIndex] * 1,
  //         ou: row[ouIndex],
  //         dx: row[dxIndex],
  //       }));
  //       setData(dataResult);
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setGlobalOverlay({ isOpen: false });
  //     }
  //   };

  useEffect(() => {
    (async () => {
      if (corePicker && corePicker.pickCompleted) {
        setGlobalOverlay({ isOpen: true });

        //   getData();

        !options && (await getMetaData());
        setGlobalOverlay({ isOpen: false });
      }
    })();
  }, [corePicker.pickCompleted]);

  const ref = useSticky("table-1");

  return (
    <div className="font-serif h-full report-container  b14_icd10-report-container  flex flex-col gap-6">
      {options && (
        <table id="table-1" ref={ref}>
          <thead>
            {headers.map((row, index) => {
              return (
                <tr
                  className="row-sticky !left-0"
                  key={`${REPORT_NAME}-header-${index}`}
                >
                  {row.map((cell, indexCell) => {
                    const { label, ...props } = cell;
                    return (
                      <th
                        data-f-name="Times New Roman"
                        data-f-sz="12"
                        data-a-h="center"
                        data-a-v="middle"
                        data-f-bold="true"
                        data-a-wrap="true"
                        data-b-a-s="thin"
                        key={`${REPORT_NAME}-header-${index}-cell-${indexCell}`}
                        {...props}
                      >
                        {label}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody>
            <tr className="[&>*]:!italic">
              {Array.from({ length: 20 })
                .fill(0)
                .map((_, index) => (
                  <td
                    data-f-name="Times New Roman"
                    data-f-sz="12"
                    data-a-h="center"
                    data-a-wrap="true"
                    data-b-a-s="thin"
                    data-a-v="middle"
                    data-f-italic="true"
                    key={`${REPORT_NAME}-body-count-${index}`}
                  >
                    {index + 1}
                  </td>
                ))}
            </tr>
            {(() => {
              let i = 0;
              return rowGroups.map((group, index) => {
                return (
                  <React.Fragment key={group.label}>
                    <tr className="[&>*]:!font-bold sticky-row-0">
                      <td
                        data-f-name="Times New Roman"
                        data-f-sz="12"
                        data-a-h="center"
                        data-a-v="middle"
                        data-b-a-s="thin"
                        data-f-bold="true"
                      >{`C${index.toString().padStart(2, "0")}`}</td>
                      <td
                        data-f-name="Times New Roman"
                        data-f-sz="12"
                        data-a-h="left"
                        data-b-a-s="thin"
                        data-f-bold="true"
                        data-a-wrap="true"
                        data-a-v="middle"
                        className="!text-left"
                      >
                        {group.label}
                      </td>
                      <td
                        data-f-name="Times New Roman"
                        data-f-sz="12"
                        data-a-h="left"
                        data-b-a-s="thin"
                        data-f-bold="true"
                        data-a-wrap="true"
                        data-a-v="middle"
                        className="!text-left"
                      >
                        {`${group.start}-${group.end}`.replaceAll("_", "")}
                      </td>
                      {Array.from({ length: 17 })
                        .fill(0)
                        .map((_, colIndex) => (
                          <td
                            data-f-name="Times New Roman"
                            data-f-sz="12"
                            data-a-h="center"
                            data-b-a-s="thin"
                            data-a-v="middle"
                            data-f-bold="true"
                            key={`${REPORT_NAME}-body-${group.label}-${colIndex}`}
                          >
                            0
                          </td>
                        ))}
                    </tr>
                    {options
                      .filter((option) =>
                        isInputAllWithinRange(
                          option.code,
                          group.start,
                          group.end
                        )
                      )
                      .map((option) => {
                        i += 1;
                        return (
                          <tr key={option.code}>
                            <td
                              data-f-name="Times New Roman"
                              data-f-sz="12"
                              data-a-h="center"
                              data-a-v="middle"
                              data-b-a-s="thin"
                              data-f-bold="true"
                              className="font-bold"
                            >
                              {i.toString().padStart(3, "0")}
                            </td>
                            <td
                              data-f-name="Times New Roman"
                              data-f-sz="12"
                              data-a-h="left"
                              data-b-a-s="thin"
                              data-a-wrap="true"
                              data-a-v="middle"
                              className="!text-left"
                            >
                              {`${pickTranslation(
                                option,
                                "vi",
                                "name"
                              )} - ${pickTranslation(
                                option,
                                "en",
                                "name"
                              )}`.replaceAll(`${option.code}. `, "")}
                            </td>
                            <td
                              data-f-name="Times New Roman"
                              data-f-sz="12"
                              data-a-h="left"
                              data-b-a-s="thin"
                              data-a-wrap="true"
                              data-a-v="middle"
                              className="!text-left"
                            >
                              {option.code}
                            </td>
                            {Array.from({ length: 17 })
                              .fill(0)
                              .map((_, colIndex) => (
                                <td
                                  data-f-name="Times New Roman"
                                  data-f-sz="12"
                                  data-a-h="center"
                                  data-b-a-s="thin"
                                  data-a-v="middle"
                                  key={`${REPORT_NAME}-body-${group.label}-${option.code}-${colIndex}`}
                                >
                                  0
                                </td>
                              ))}
                          </tr>
                        );
                      })}
                  </React.Fragment>
                );
              });
            })()}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default B14;
const headers = [
  [
    { label: "TT", rowSpan: 4, className: "sticky-col", "sticky-col": 0 },
    {
      label: "Tên bệnh/ nhóm bệnh",
      rowSpan: 4,
      className: "sticky-col w-[20%]",
      "sticky-col": 1,
    },
    {
      label: "Mã ICD 10",
      rowSpan: 4,
      className: "sticky-col",
      "sticky-col": 1,
    },
    {
      label: "Tại khoa khám bệnh",
      colSpan: 6,
      rowSpan: 2,
    },
    {
      label: "Điều trị nội trú",
      colSpan: 10,
    },
    {
      label: "Số trường hợp tử vong được cấp giấy báo tử",
      rowSpan: 4,
      className: "w-[2%]",
    },
  ],
  [
    { label: "Tổng số", colSpan: 6 },
    { label: "Trong đó TE<15 tuổi", colSpan: 4 },
  ],
  [
    { label: "Tổng số", rowSpan: 2, className: "w-[4%]" },
    { label: "Trong đó", colSpan: 5 },

    {
      label: "Mắc",
      colSpan: 2,
    },
    {
      label: "BN nặng xin về",
      colSpan: 2,
    },
    {
      label: "Số tử vong",
      colSpan: 2,
    },
    {
      label: "Mắc",
      colSpan: 2,
    },
    {
      label: "Số tử vong",
      colSpan: 2,
    },
  ],
  [
    {
      className: "w-[4%]",
      label: "Nữ",
    },
    {
      className: "w-[4%]",
      label: "TE <15",
    },
    {
      className: "w-[4%]",
      label: "BN nặng xin về",
    },
    {
      className: "w-[4%]",
      label: "Tử vong trước viện",
    },
    {
      className: "w-[4%]",
      label: "Tử vong tại viện",
    },
    {
      className: "w-[4%]",
      label: "TS",
    },
    {
      className: "w-[4%]",
      label: "Nữ",
    },
    {
      className: "w-[4%]",
      label: "TS",
    },
    {
      className: "w-[4%]",
      label: "Nữ",
    },
    {
      className: "w-[4%]",
      label: "TS",
    },
    {
      className: "w-[4%]",
      label: "Nữ",
    },
    {
      className: "w-[4%]",
      label: "TS",
    },
    {
      className: "w-[4%]",
      label: "<5 tuổi",
    },
    {
      className: "w-[4%]",
      label: "TS",
    },
    {
      className: "w-[4%]",
      label: "<5 tuổi",
    },
  ],
];

const rowGroups = [
  {
    // label: "chapter1B14Icd10",
    label:
      "Chương I: Bệnh nhiễm khuẩn và kí sinh vật - Chapter I: Certain infectious and parasistic diseases.",
    start: "A_00",
    end: "B_99",
  },
  {
    // label: "chapter2B14Icd10",
    label: "Chương II: Khối u - Chapter II: Neoplasms",
    start: "C_00",
    end: "D_48",
  },
  {
    // label: "chapter3B14Icd10",
    label:
      "Chương III:  Bệnh của máu , cơ quan tạo máu và cơ chế miễn dịch.Chapter III: Diseases of the blood and blood - forming organ and disorders involving the immune mechanism",
    start: "D_50",
    end: "D_89",
  },
  {
    // label: "chapter4B14Icd10",
    label:
      "Chương IV: Bệnh nội tiết, dinh dưỡng chuyển hoá  - Chapter IV: Endocrine,Nutritional and metabolic diseases",
    start: "E_00",
    end: "E_90",
  },
  {
    // label: "chapter5B14Icd10",
    label:
      "Chương V: Rối loạn tâm thần và hành vi - Chapter V: Mental and behavioural  disorders",
    start: "F_00",
    end: "F_90",
  },
  {
    // label: "chapter6B14Icd10",
    label:
      "Chương VI: Bệnh của hệ thống thần kinh - Chapter VI: Diseases of the nervous system",
    start: "G_00",
    end: "G_90",
  },
  {
    // label: "chapter7B14Icd10",
    label:
      "Chương VII: Bệnh của mắt và phần phụ  - Chapter VII:   Diseases of the eye and adnexa",
    start: "H_00",
    end: "H_69",
  },
  {
    // label: "chapter8B14Icd10",
    label:
      "Chương VIII:   Bệnh của tai và xương chũm Chapter VIII:   Diseases of the ear and mastoid process",
    start: "H_60",
    end: "H_95",
  },
  {
    // label: "chapter9B14Icd10",
    label:
      "Chương IX:  Bệnh của hệ tuần hoàn - Chapter IX: Diseases of the circulatory system",
    start: "I_00",
    end: "I_99",
  },
  {
    // label: "chapter10B14Icd10",
    label:
      "Chương X: Bệnh của hệ hô hấp - Chapter X: Diseases of the respiratory system",
    start: "J_00",
    end: "J_99",
  },
  {
    // label: "chapter11B14Icd10",
    label:
      "Chương XI: Bệnh của hệ tiêu hoá - Chapter XI: Diseases of the digestive system",
    start: "K_00",
    end: "K_93",
  },
  {
    // label: "chapter12B14Icd10",
    label:
      "Chương XII: Bệnh của da và tổ chức dưới da. - Chapter XII: Diseases of skin  and subcutanneous tissue",
    start: "L_00",
    end: "L_99",
  },
  {
    // label: "chapter13B14Icd10",
    label:
      "Chương XIII: Bệnh của hệ thống cơ, xương và  mô liên kết Chapter XIII: Diseases of the musculoskeletal system and connective tissue",
    start: "M_00",
    end: "M_99",
  },
  {
    // label: "chapter14B14Icd10",
    label:
      "Chương XIV: Bệnh của hệ tiết niệu sinh dục - Chapter XIV:  Diseases of the genitourinary system B212",
    start: "N_00",
    end: "N_99",
  },
  {
    // label: "chapter15B14Icd10",
    label:
      "Chương XV: Chửa,đẻ và sauđẻ - Chapter XV: Pregnancy, childbirth and the puerperium",
    start: "O_00",
    end: "O_99",
  },
  {
    // label: "chapter16B14Icd10",
    label:
      "Chương XVI: Một số bệnh trong thời kì chu sinh - Chapter XVI: Certain conditions originating in the perinatal period",
    start: "P_00",
    end: "P_96",
  },
  {
    // label: "chapter17B14Icd10",
    label:
      "Chương XVII: Dị dạng bẩm sinh, biến dạng của cromosom - Chapter XVII: Congenital malformations, deformations and chromosomal abnormalities",
    start: "Q_00",
    end: "Q_99",
  },
  {
    // label: "chapter18B14Icd10",
    label:
      "Chương XVIII: Triệu chứng, dấu hiệu và phát hiện bất thường lâm sàng, xét  nghiệm - Chapter XVIII: Symptoms, signs and abnormal clinical     and laboratory  findings, not elsewhere classified",
    start: "R_00",
    end: "R_99",
  },
  {
    // label: "chapter19B14Icd10",
    label:
      "Chương XIX: Vết thương, ngộ độc và kết quả của các nguyên  nhân bên ngoàiChapter XIX: Iinjury, poisoning and certain other consequences of external causes",
    start: "S_00",
    end: "T_98",
  },
  {
    // label: "chapter20B14Icd10",
    label:
      "Chương XX: Nguyên nhân bên ngoài của bệnh tật và tử vong - Chapter XX:   External causes of morbidity and mortality",
    start: "V_01",
    end: "Y_98",
  },
  {
    // label: "chapter21B14Icd10",
    label:
      "Chương XXI: Các yếu tố ảnh hưởng đến sức khoẻ người khám nghiệm và điều tra - Chapter XXI: Person encountering health services for examination and investigation.",
    start: "Z_01",
    end: "Z_99",
  },
];
