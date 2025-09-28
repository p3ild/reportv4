import { cloneDeep } from "lodash";

export const ORG_GROUP = {
  // ------------------------------------- BAOCAO25 -------------------------------------
  TINH_DVHC: "mH8ggZyC39Z",
  XA_DVHC: "uyuiasZ82O4",
  XA_TYT: "OHWM3DxkeMR",
  XA_CSYT_KHAC_TYT: "eHs95ggJw7J",

  XA: "OHWM3DxkeMR",
  XA_CSYT_KHAC: "eHs95ggJw7J",

  TINH_YTTN: "yvriG1o5Xqh",
  TUYEN_TINH: "iilcfvQ4zI1",
  TUYEN_TRUNG_UONG: "UlhXS5yPKpZ",
  TUYEN_XA: "fpnukMBDvUf",


  //CSSK_BM
  TW_CSYT_CSSK_BM: "WBaGiDFEZjL",
  TINH_CSYT_CONG_CSSK_BM: "ImtV96dR0JK",
  TINH_YTTN_CSSK_BM: "KKrseu3RYOe",


  //CSSK_TE
  TW_CSYT_CSSK_TE: "zcK3oaWU7aJ",
  TINH_CSYT_CONG_CSSK_TE: "eYgD642nSuM",
  TINH_YTTN_CSSK_TE: "hRu4T6QBtCM",

  //KLN
  TINH_CSYT_CONG_KLN: "kh9FwPDWgUi",
  TINH_YTTN_KLN: "rz2nPhBJoVo",
  TW_CSYT_KLN: 'HBkLjXEWSBZ',

  //KCB
  TINH_CSYT_CONG_KCB: "prigYTb70un",
  TW_CSYT_KCB: "LnayCg8zlUA",
  TW_YT_NGANH: "sNVZhZdlqvt",

  TINH_KCB_COGIUONG_BV_DK: "Kbec89XZO2Q",
  TINH_KCB_COGIUONG_BV_YHCT: "Oa18cP4yTFk",
  TINH_KCB_COGIUONG_BV_PDL: "DbuYu2drACX",
  TINH_KCB_COGIUONG_BV_PHCN: "VB2XMTYwPc2",
  TINH_KCB_COGIUONG_BV_CKK: "BgQLE8mwUqz",
  TINH_KCB_COGIUONG_BV_DKKV: "cok1O2ZxSq6",
  TINH_KCB_COGIUONG_CSYT_KHAC: "CPpqxf5ApAf",

  TINH_CSYT_KHONGGIUONG: "LohXBTuLCRJ",

  //PHONG_DA_LIEU
  TW_CSYT_CONG_SR_PHONG_HIV_TT: "a8tDjfQpPbK",
  TINH_CSYT_CONG_SR_PHONG_HIV_TT: "ubpcYbv2aKe",
  TINH_YTTN_BENH_VIEN_SR_PHONG_HIV_TT: "b3Fa4WDUKDl",
  TINH_YTTN_PHONG_KHAM_SR_PHONG_HIV_TT: "LDueUOVxA6b",

  // ------------------------------------- BAOCAO -------------------------------------
  // HUYEN_DVHC: "W4U1KdFeIJH",
  // HUYEN_DVHC_BF_2025: "BP9QnWc3imF",
  // HUYEN_DVHC_AF_2025: "MCE5maEazYj",
  // XA_DVHC_BF_2025: "RN21bo5CSCY",
  // XA_DVHC_AF_2025: "ET3BlMSPD7x",

  // TINH_353: {
  //     INCLUDE: "ckwgZYOYF0q",
  //     EXCLUDE: "mH8ggZyC39Z"
  // },

  // HUYEN_353: {
  //     INCLUDE: "AIcqlANFqtC",
  //     EXCLUDE: "aVCye9sObKR"
  // },

  // XA_353: {
  //     INCLUDE: "t9ajCzvEYRB",
  //     EXCLUDE: "QW1NbMvLMjP"
  // },

  // "Vùng_Bắc_Trung_Bộ_và_duyên_hải_miền_Trung": "cGDQ0sqLmFK",
  // "Vùng_Trung_du_và_miền_núi_phía_Bắc": "tpWjiIDBUHI",
  // "Vùng_Tây_Nguyên": "H5L0ZxyoJIW",
  // "Vùng_Đông_Nam_Bộ": "cxi2i36k2VI",
  // "Vùng_Đồng_bằng_sông_Cửu_Long": "vNu8mOy7Rdg",
  // "Vùng_Đồng_bằng_sông_Hồng": "YpvY3ghB2WW",
};

export const DATASET = {
  TTC_TYT: 'xbnK3phORM1',
  TTC_XA: 'kdxiku4uqkM',
  B3: 'fMnhvVDp2iR',
  BMTE_B4_TYT: 'H4WdjchZhmF',
  BMTE_B4: 'qmHOBSh3e7c',
  BMTE_B5: 'doDhUa33IQr',
  BMTE_B6: 'slZ3BACPnzP',
  BMTE_B7: 'OzgHVXWePlJ',
  BMTE_B8: 'PWTIzTyc2xs',
  B9: 'kGIKK18IMN1',
  B10: 'Akfl0BIspMj',
  B11: 'gp8FpVbQHvU',
  B12_NCD: 'pAP1uaBYloe',
  B12_NCD_TYT: 'OEI6O1pvDPa',
}

export const WF_DATASET = {

}

export const ORG_GROUP_SET = {
  TUYEN: "VO3DdltSDqy",
};

export const ORG_SELECTED_TYPE = {
  COUNTRY: {
    key: "COUNTRY",
  },

  PROVINCE: { key: "PROVINCE" },
  PROVINCE_INDIVIDUAL: { key: "PROVINCE_INDIVIDUAL" },

  UNDER_MINISTRY: { key: "UNDER_MINISTRY" },
  UNDER_MINISTRY_INDIVIDUAL: { key: "UNDER_MINISTRY_INDIVIDUAL" },

  DIRECTLY_UNDER_MINISTRY: { key: "DIRECTLY_UNDER_MINISTRY" },
  DIRECTLY_UNDER_MINISTRY_INDIVIDUAL: {
    key: "DIRECTLY_UNDER_MINISTRY_INDIVIDUAL",
  },

  DISTRICT: { key: "DISTRICT" },
  DISTRICT_INDIVIDUAL: { key: "DISTRICT_INDIVIDUAL" },

  COMMUNE: { key: "COMMUNE" },
};
