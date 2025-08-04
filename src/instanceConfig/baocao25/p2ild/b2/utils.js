import { PHAN_LOAI_TU_CHU, mockFunctions } from './constants.js'

const { p2ild, _ } = mockFunctions

/**
 * Filter function for autonomous classification (Tu Chu)
 * @param {Object} json - API response data
 * @param {string} orgID - Organization ID
 * @returns {Object} Filtered result with classification data
 */
export function filterTuChu(json, orgID) {
  const jsonHeader = p2ild.dvu.defineHeader(json.headers)
  
  // Default result
  let arrResultTuChu = {}
  arrResultTuChu[PHAN_LOAI_TU_CHU.DEFAULT] = Array(4).fill("")
  arrResultTuChu[PHAN_LOAI_TU_CHU.KCB] = Array(4).fill("")
  arrResultTuChu[PHAN_LOAI_TU_CHU.YTDP] = Array(4).fill("")
  arrResultTuChu[PHAN_LOAI_TU_CHU.TOTAL] = Array(4).fill("")

  let listValidOrg
  // Filter all valid org param
  listValidOrg = json.rows.filter(x => x[jsonHeader.iOu] == orgID)

  let arrColumn = Array(4).fill("")
  listValidOrg.forEach(row => {
    if ([PHAN_LOAI_TU_CHU.DEFAULT,
      PHAN_LOAI_TU_CHU.KCB,
      PHAN_LOAI_TU_CHU.YTDP,
      PHAN_LOAI_TU_CHU.TOTAL
    ].includes(row[jsonHeader.iDe])) {
      arrColumn = Array(4).fill("")
      arrColumn[row[jsonHeader.iValue] - 1] = "1"
      arrResultTuChu[row[jsonHeader.iDe]] = arrColumn
    }
  })

  let arrColumnSum = Array(4).fill("")
  let arrGroupByPhanLoai = orgID != undefined
    ?
    _.groupBy(json.rows.filter(e =>
      [PHAN_LOAI_TU_CHU.DEFAULT,
        PHAN_LOAI_TU_CHU.KCB,
        PHAN_LOAI_TU_CHU.YTDP
      ].includes(e[jsonHeader.iDe]) && orgID == e[jsonHeader.iOu]
    ), jsonHeader.iValue)
    : _.groupBy(json.rows.filter(e =>
      [PHAN_LOAI_TU_CHU.DEFAULT,
        PHAN_LOAI_TU_CHU.KCB,
        PHAN_LOAI_TU_CHU.YTDP
      ].includes(e[jsonHeader.iDe])
    ), jsonHeader.iValue)

  Object.keys(arrGroupByPhanLoai).forEach(function (key) {
    arrColumnSum[key - 1] = arrGroupByPhanLoai[key].length
  })

  arrResultTuChu[PHAN_LOAI_TU_CHU.TOTAL] = arrColumnSum

  // Hard coded values
  arrResultTuChu[PHAN_LOAI_TU_CHU.DEFAULT] = ["", "", "", ""]
  arrResultTuChu[PHAN_LOAI_TU_CHU.KCB] = ["", "", "", ""]
  arrResultTuChu[PHAN_LOAI_TU_CHU.YTDP] = ["", "", "", ""]
  arrResultTuChu[PHAN_LOAI_TU_CHU.TOTAL] = ["", "", "", ""]
  
  return arrResultTuChu
} 