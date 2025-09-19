import { numToLocaleString } from "@core/utils/stringutils";
import { getValueDE } from "../../common/DataValueUtils";
import { fetchAnalyticsData } from "../../common/request/request";
import { getDisableColDataObject } from "../../common/ui/RowRender";


export const getDataCommon = async (props) => {

    let dx = [
        'WpK3CA1GiFB.HllvX50cXC0',
        'q9TgXtGb497.HllvX50cXC0',
        'JTBxLXQRhKp',
        'JTBxLXQRhKp.IEweiFaTu3a',
        'YgF4A2VhFm9',
        'YgF4A2VhFm9.IEweiFaTu3a',
        'fzWfb5NkUXR',
        'fzWfb5NkUXR.IEweiFaTu3a',
        'zc1XKRhd9f5.HllvX50cXC0',
        'LSlYBmMhM5E',
        'LSlYBmMhM5E.IEweiFaTu3a',
        'HuCDOiwdL6c.HllvX50cXC0',
        'Rb7YZo0877Z',
        'Rb7YZo0877Z.IEweiFaTu3a',
        'A6NjontTGPD.HllvX50cXC0',
        'Wf8ywubJAEC',
        'Wf8ywubJAEC.IEweiFaTu3a',
        'RbCdwT3sPMN.HllvX50cXC0',
        'SGDhfZGXzL2',
        'SGDhfZGXzL2.IEweiFaTu3a',
        'kvF5zxxmhrr.HllvX50cXC0',
        'DZ4gp6GzBkJ',
        'DZ4gp6GzBkJ.IEweiFaTu3a',
        'BaDOQgmTTwR.HllvX50cXC0',
        'cdnqvBRbLNA',
        'cdnqvBRbLNA.IEweiFaTu3a',
        'xYF6wnkt6v8.HllvX50cXC0',
        'Jpn3u1SCEI3',
        'Jpn3u1SCEI3.IEweiFaTu3a',
        'M2YPAEsSP7B.HllvX50cXC0',
        'XGxKRz2pyqF',
        'XGxKRz2pyqF.IEweiFaTu3a',
        'AZaIUVETowy.HllvX50cXC0',
        'j6cPf2NjluG',
        'j6cPf2NjluG.IEweiFaTu3a',
        'Nvx0MVk5sug.HllvX50cXC0',
        'aTKuaZLHkMG',
        'aTKuaZLHkMG.IEweiFaTu3a',
        'g8Rnn7j2ccS.HllvX50cXC0',
        'ewHRN8vKSLo.HllvX50cXC0',
        'sbyDKnwZcOy',
        'bp4fjBzE1sw',
        'sbyDKnwZcOy.IEweiFaTu3a',
        'bp4fjBzE1sw.IEweiFaTu3a',
        'GxjW6cu2f06.HllvX50cXC0',
        'dCjkbfCY4NU.HllvX50cXC0',
        'wtfsRmDu2CP',
        'mLtnuPFSxxZ',
        'wtfsRmDu2CP.IEweiFaTu3a',
        'mLtnuPFSxxZ.IEweiFaTu3a',
        'clQ8GZLViaB.HllvX50cXC0',
        'Fb6ChUIgIqG.HllvX50cXC0',
        'uK1n7dFEI1N',
        'WanOM8J3Suj',
        'uK1n7dFEI1N.IEweiFaTu3a',
        'WanOM8J3Suj.IEweiFaTu3a',
        'G03w1UBpgVj.HllvX50cXC0',
        'i1iayOs0GFM.HllvX50cXC0',
        'CGEpgEX247O',
        'LxvbLJOjdg2',
        'CGEpgEX247O.IEweiFaTu3a',
        'LxvbLJOjdg2.IEweiFaTu3a',
        'KMqxzRS6SA2.HllvX50cXC0',
        'doy4j9Xcw1o.HllvX50cXC0',
        'DkAOzZslOSs',
        'YG7omyyd4PR',
        'DkAOzZslOSs.IEweiFaTu3a',
        'YG7omyyd4PR.IEweiFaTu3a',
        'zXQPS3Hwcbf.HllvX50cXC0',
        'qbysma911vk.HllvX50cXC0',
        'cpaW1UIFvGp',
        'TSspKDE6jAN',
        'cpaW1UIFvGp.IEweiFaTu3a',
        'TSspKDE6jAN.IEweiFaTu3a',
        'U6m1vPx03u3.HllvX50cXC0',
        'SbrW8NXugFy.HllvX50cXC0',
        'DLsz1yBTbb7',
        'vFawHfMzRgI',
        'DLsz1yBTbb7.IEweiFaTu3a',
        'vFawHfMzRgI.IEweiFaTu3a',
        'dZJ9U0JibfE.HllvX50cXC0',
        'Mj36tEF3lOG.HllvX50cXC0',
        'XSdJYlH8vwk',
        'VnQNEJEQgBG.HllvX50cXC0',
        'hXfYMmrISaf',
        'swLTD7Obkns.HllvX50cXC0',
        'ratsfcVTp7F',
        'JvUdl1Prp9C.HllvX50cXC0',
        'swkskJJvLMp',
        'PjCNurYlbM7.HllvX50cXC0',
        'qydcnPEDbmB',
        'J9D8TfIFQy7.HllvX50cXC0',
        'rRa48XFjyFC',
        'Kyc2UW89wVj.HllvX50cXC0',
        'sa492jWpjDf',
        'PlEEec2kdNT.HllvX50cXC0',
        'EbgigboTmrd',
        'HIydN4UJex2',
        'OOvABOGvmwx.HllvX50cXC0',
        'Z287TyXoKVB',
        'XCOxyF9ZvFn.HllvX50cXC0',
        'uRuorRx2UR1',
        'VJVi4KCxpzU.HllvX50cXC0',
        'lvbITHwRkkg',
        'nOKoSAWmBaJ.HllvX50cXC0',
        'Psy27hX3MrZ',
        'HjOtfiHHCVv.HllvX50cXC0',
        'CBQNnqykPeA',
        'hoegsBrTcwt.HllvX50cXC0',
        'SP8fU9unOSC',
        'N0DkTju2ygs.HllvX50cXC0',
        'dnP5tpGvziR.HllvX50cXC0',
        'lf0BrDLpp5m',
        'xR1SRHBmOSl.HllvX50cXC0',
        'GzshVKdoZBg',
        'hMHRO6boyNh.HllvX50cXC0',
        'NE8zptDwyFQ',
        'eqChBVhTqkF.HllvX50cXC0',
        'hvS0ROXGv9e',
        'gZJ4tj8OMWF',
        'EREAmT1IEt0',
        'fdptEnfQIjQ',
        'hvS0ROXGv9e.HdSWnxLkSpK',
        'EREAmT1IEt0.NZTXFyz6GLm',
        'sw4HsEooMSp',
        'hvS0ROXGv9e.hACnDcxd9Hv',
        'EREAmT1IEt0.GvoEANq375m',
        'lHfpcZ01biD',
        'lHfpcZ01biD.HllvX50cXC0',
        'FDTbZf4ZedQ.HllvX50cXC0',
        'CjM6Xjwuohw',
        'CjM6Xjwuohw.IEweiFaTu3a',
        'wyg61jfON6Y.HllvX50cXC0',
        'aos3iUZ9u9T',
        'aos3iUZ9u9T.IEweiFaTu3a',
        'HiErmXLzqqT.HllvX50cXC0',
        'RHsZDNIbPxi',
        'RHsZDNIbPxi.IEweiFaTu3a',
        'kBsOZgPQvVN.HllvX50cXC0',
        't82Gp0IG71J',
        't82Gp0IG71J.IEweiFaTu3a',
        'xbY5B05iNrA.HllvX50cXC0',
        'mUy244qjDuH',
        'mUy244qjDuH.IEweiFaTu3a',
        'F2sgq3l9m1Q.HllvX50cXC0',
        'K4iyoGAYqkP',
        'K4iyoGAYqkP.IEweiFaTu3a',
        'MASGKcCBi5I.HllvX50cXC0',
        'BArq67DfpRK',
        'BArq67DfpRK.IEweiFaTu3a',
        'gO4scNKIWZf.HllvX50cXC0'
    ]
    let jsonDhis = await fetchAnalyticsData({
        ...props,
        includeCo: false,
        dx
    });
    let getValue = ({ de, colSpan, disable }) => {
        if (disable) return {
            ...getDisableColDataObject(),
            excelOpts: {
                colSpan: colSpan || undefined
            }
        };

        if (de) {
            let value = getValueDE({ jsonDhis, de })
            return {
                value,
                view: <>{value}</>,
                excelOpts: {
                    colSpan: colSpan || undefined
                }
            }
        } else {
            return {
                value: 0,
                view: <></>,
                excelOpts: {
                    colSpan: colSpan || undefined
                }
            }
        }
    }


    let listRow = [
        ["I", <p className="text-left">{`Chăm sóc sức khỏe bà mẹ`}</p>, getValue({ colSpan: 2 }), getValue({ disable: true, colSpan: 2 }), getValue({ disable: true, colSpan: 2 })],
        ["1", <p className="text-left">{`Phụ nữ có thai(Số phụ nữ mới có thai trong kỳ báo cáo)`}</p>, getValue({ de: 'WpK3CA1GiFB.HllvX50cXC0', colSpan: 2 }), getValue({ disable: true, colSpan: 2 }), getValue({ disable: true, colSpan: 2 })],
        ["2", <p className="text-left">{`Trđ: - vị thành niên`}</p>, getValue({ de: 'q9TgXtGb497.HllvX50cXC0', colSpan: 2 }), getValue({ disable: true, colSpan: 2 }), getValue({ disable: true, colSpan: 2 })],
        ["3", <p className="text-left">{`Tổng số lượt khám thai`}</p>, getValue({ de: 'JTBxLXQRhKp', colSpan: 2 }), getValue({ de: 'JTBxLXQRhKp.IEweiFaTu3a', colSpan: 2 }), getValue({ disable: true, colSpan: 2 })],
        ["4", <p className="text-left">{`Trđ: Số lượt xét nghiệm protein niệu`}</p>, getValue({ de: 'YgF4A2VhFm9', colSpan: 2 }), getValue({ de: 'YgF4A2VhFm9.IEweiFaTu3a', colSpan: 2 }), getValue({ disable: true, colSpan: 2 })],
        ["5", <p className="text-left">{`Số phụ nữ đẻ`}</p>, getValue({ de: 'fzWfb5NkUXR', colSpan: 2 }), getValue({ de: 'fzWfb5NkUXR.IEweiFaTu3a', colSpan: 2 }), getValue({ de: 'zc1XKRhd9f5.HllvX50cXC0', colSpan: 2 })],
        ["5.1", <p className="text-left">{`Trđ: - Số đẻ tuổi vị thành niên`}</p>, getValue({ de: 'LSlYBmMhM5E', colSpan: 2 }), getValue({ de: 'LSlYBmMhM5E.IEweiFaTu3a', colSpan: 2 }), getValue({ de: 'HuCDOiwdL6c.HllvX50cXC0', colSpan: 2 })],
        ["5.2", <p className="text-left">{`    - Số được khám thai ≥4 lần trong 3 thời kỳ`}</p>, getValue({ de: 'Rb7YZo0877Z', colSpan: 2 }), getValue({ de: 'Rb7YZo0877Z.IEweiFaTu3a', colSpan: 2 }), getValue({ de: 'A6NjontTGPD.HllvX50cXC0', colSpan: 2 })],
        ["5.3", <p className="text-left">{`    - Số được xét nghiệm viêm gan B trong lần mang thai này`}</p>, getValue({ de: 'Wf8ywubJAEC', colSpan: 2 }), getValue({ de: 'Wf8ywubJAEC.IEweiFaTu3a', colSpan: 2 }), getValue({ de: 'RbCdwT3sPMN.HllvX50cXC0', colSpan: 2 })],
        ["5.4", <p className="text-left">{`    - Số được xét nghiệm Giang mai trong lần mang thai này`}</p>, getValue({ de: 'SGDhfZGXzL2', colSpan: 2 }), getValue({ de: 'SGDhfZGXzL2.IEweiFaTu3a', colSpan: 2 }), getValue({ de: 'kvF5zxxmhrr.HllvX50cXC0', colSpan: 2 })],
        ["5.5", <p className="text-left">{`    - Số xét nghiệm HIV trước và trong mang thai lần này`}</p>, getValue({ de: 'DZ4gp6GzBkJ', colSpan: 2 }), getValue({ de: 'DZ4gp6GzBkJ.IEweiFaTu3a', colSpan: 2 }), getValue({ de: 'BaDOQgmTTwR.HllvX50cXC0', colSpan: 2 })],
        ["5.6", <p className="text-left">{`    - Số có kết quả khẳng định nhiễm HIV`}</p>, getValue({ de: 'cdnqvBRbLNA', colSpan: 2 }), getValue({ de: 'cdnqvBRbLNA.IEweiFaTu3a', colSpan: 2 }), getValue({ de: 'xYF6wnkt6v8.HllvX50cXC0', colSpan: 2 })],
        ["5.7", <p className="text-left">{`     Trđ: + Số được khẳng định trong thời kỳ mang thai`}</p>, getValue({ de: 'Jpn3u1SCEI3', colSpan: 2 }), getValue({ de: 'Jpn3u1SCEI3.IEweiFaTu3a', colSpan: 2 }), getValue({ de: 'M2YPAEsSP7B.HllvX50cXC0', colSpan: 2 })],
        ["5.8", <p className="text-left">{`    - Số được XN đường huyết`}</p>, getValue({ de: 'XGxKRz2pyqF', colSpan: 2 }), getValue({ de: 'XGxKRz2pyqF.IEweiFaTu3a', colSpan: 2 }), getValue({ de: 'AZaIUVETowy.HllvX50cXC0', colSpan: 2 })],
        ["5.9", <p className="text-left">{`    - Số được cán bộ có kỹ năng đỡ`}</p>, getValue({ de: 'j6cPf2NjluG', colSpan: 2 }), getValue({ de: 'j6cPf2NjluG.IEweiFaTu3a', colSpan: 2 }), getValue({ de: 'Nvx0MVk5sug.HllvX50cXC0', colSpan: 2 })],
        ["6", <p className="text-left">{`Số được cấp giấy chứng sinh`}</p>, getValue({ de: 'aTKuaZLHkMG', colSpan: 2 }), getValue({ de: 'aTKuaZLHkMG.IEweiFaTu3a', colSpan: 2 }), getValue({ disable: true, colSpan: 2 })],
        ["7", <p className="text-left">{`Tổng số bà mẹ/TSS được chăm sóc tuần đầu tại nhà`}</p>, getValue({ de: 'g8Rnn7j2ccS.HllvX50cXC0', colSpan: 2 }), getValue({ disable: true, colSpan: 2 }), getValue({ disable: true, colSpan: 2 })],
        ["8", <p className="text-left">{`Tổng số bà mẹ/TSS được chăm sóc từ tuần 2 đến hết 6 tuần tại nhà`}</p>, getValue({ de: 'ewHRN8vKSLo.HllvX50cXC0', colSpan: 2 }), getValue({ disable: true, colSpan: 2 }), getValue({ disable: true, colSpan: 2 })],
        ["9", <p className="text-left">{`Số mắc và tử vong do tai biến sản khoa`}</p>, 'Mắc', 'TV', 'Mắc', 'TV', 'Mắc', 'TV'],
        ["9.1", <p className="text-left">{` Trđ: - Băng huyết`}</p>, getValue({ de: 'sbyDKnwZcOy' }), getValue({ de: 'bp4fjBzE1sw' }), getValue({ de: 'sbyDKnwZcOy.IEweiFaTu3a' }), getValue({ de: 'bp4fjBzE1sw.IEweiFaTu3a' }), getValue({ de: 'GxjW6cu2f06.HllvX50cXC0' }), getValue({ de: 'dCjkbfCY4NU.HllvX50cXC0' })],
        ["9.2", <p className="text-left">{`     - Sản giật`}</p>, getValue({ de: 'wtfsRmDu2CP' }), getValue({ de: 'mLtnuPFSxxZ' }), getValue({ de: 'wtfsRmDu2CP.IEweiFaTu3a' }), getValue({ de: 'mLtnuPFSxxZ.IEweiFaTu3a' }), getValue({ de: 'clQ8GZLViaB.HllvX50cXC0' }), getValue({ de: 'Fb6ChUIgIqG.HllvX50cXC0' })],
        ["9.3", <p className="text-left">{`     - Uốn ván sơ sinh`}</p>, getValue({ de: 'uK1n7dFEI1N' }), getValue({ de: 'WanOM8J3Suj' }), getValue({ de: 'uK1n7dFEI1N.IEweiFaTu3a' }), getValue({ de: 'WanOM8J3Suj.IEweiFaTu3a' }), getValue({ de: 'G03w1UBpgVj.HllvX50cXC0' }), getValue({ de: 'i1iayOs0GFM.HllvX50cXC0' })],
        ["9.4", <p className="text-left">{`     - Vỡ tử cung`}</p>, getValue({ de: 'CGEpgEX247O' }), getValue({ de: 'LxvbLJOjdg2' }), getValue({ de: 'CGEpgEX247O.IEweiFaTu3a' }), getValue({ de: 'LxvbLJOjdg2.IEweiFaTu3a' }), getValue({ de: 'KMqxzRS6SA2.HllvX50cXC0' }), getValue({ de: 'doy4j9Xcw1o.HllvX50cXC0' })],
        ["9.5", <p className="text-left">{`     - Nhiễm trùng`}</p>, getValue({ de: 'DkAOzZslOSs' }), getValue({ de: 'YG7omyyd4PR' }), getValue({ de: 'DkAOzZslOSs.IEweiFaTu3a' }), getValue({ de: 'YG7omyyd4PR.IEweiFaTu3a' }), getValue({ de: 'zXQPS3Hwcbf.HllvX50cXC0' }), getValue({ de: 'qbysma911vk.HllvX50cXC0' })],
        ["9.6", <p className="text-left">{`     - Tai biến do phá thai`}</p>, getValue({ de: 'cpaW1UIFvGp' }), getValue({ de: 'TSspKDE6jAN' }), getValue({ de: 'cpaW1UIFvGp.IEweiFaTu3a' }), getValue({ de: 'TSspKDE6jAN.IEweiFaTu3a' }), getValue({ de: 'U6m1vPx03u3.HllvX50cXC0' }), getValue({ de: 'SbrW8NXugFy.HllvX50cXC0' })],
        ["9.7", <p className="text-left">{`     - Tai biến khác`}</p>, getValue({ de: 'DLsz1yBTbb7' }), getValue({ de: 'vFawHfMzRgI' }), getValue({ de: 'DLsz1yBTbb7.IEweiFaTu3a' }), getValue({ de: 'vFawHfMzRgI.IEweiFaTu3a' }), getValue({ de: 'dZJ9U0JibfE.HllvX50cXC0' }), getValue({ de: 'Mj36tEF3lOG.HllvX50cXC0' })],
        ["I", <p className="text-left">{`Khám chữa phụ khoa, sàng lọc ung thư cổ tử cung, thực hiện BPTT và phá thai`}</p>, getValue({ colSpan: 2 }), getValue({ disable: true, colSpan: 2 }), getValue({ disable: true, colSpan: 2 })],
        ["1", <p className="text-left">{`Tổng số lượt khám phụ khoa`}</p>, getValue({ de: 'XSdJYlH8vwk', colSpan: 2 }), getValue({ de: 'VnQNEJEQgBG.HllvX50cXC0', colSpan: 2 }), getValue({ disable: true, colSpan: 2 })],
        ["1.1", <p className="text-left">{`Trđ: - Số áp dụng VIA/VILI`}</p>, getValue({ de: 'hXfYMmrISaf', colSpan: 2 }), getValue({ de: 'swLTD7Obkns.HllvX50cXC0', colSpan: 2 }), getValue({ disable: true, colSpan: 2 })],
        ["1.2", <p className="text-left">{`        + Số có kết quả dương tính`}</p>, getValue({ de: 'ratsfcVTp7F', colSpan: 2 }), getValue({ de: 'JvUdl1Prp9C.HllvX50cXC0', colSpan: 2 }), getValue({ disable: true, colSpan: 2 })],
        ["1.3", <p className="text-left">{`        + Số có kết quả nghi ngờ`}</p>, getValue({ de: 'swkskJJvLMp', colSpan: 2 }), getValue({ de: 'PjCNurYlbM7.HllvX50cXC0', colSpan: 2 }), getValue({ disable: true, colSpan: 2 })],
        ["1.4", <p className="text-left">{`     - Số được lấy mẫu bệnh phẩm gửi tuyến trên XN TB`}</p>, getValue({ de: 'qydcnPEDbmB', colSpan: 2 }), getValue({ de: 'J9D8TfIFQy7.HllvX50cXC0', colSpan: 2 }), getValue({ disable: true, colSpan: 2 })],
        ["1.5", <p className="text-left">{`     - Số được lấy mẫu bệnh phẩm gửi tuyến trên XN HPV`}</p>, getValue({ de: 'rRa48XFjyFC', colSpan: 2 }), getValue({ de: 'Kyc2UW89wVj.HllvX50cXC0', colSpan: 2 }), getValue({ disable: true, colSpan: 2 })],
        ["2", <p className="text-left">{`Tổng số lượt chữa phụ khoa`}</p>, getValue({ de: 'sa492jWpjDf', colSpan: 2 }), getValue({ de: 'PlEEec2kdNT.HllvX50cXC0', colSpan: 2 }), getValue({ disable: true, colSpan: 2 })],
        ["3", <p className="text-left">{`Tổng số lượt người mới thực hiện các BPTT`}</p>, getValue({ de: 'EbgigboTmrd', colSpan: 2 }), getValue({ de: 'EbgigboTmrd', colSpan: 2 }), getValue({ disable: true, colSpan: 2 })],
        ["3.1", <p className="text-left">{`Tr đó:- Số mới đặt DCTC`}</p>, getValue({ de: 'HIydN4UJex2', colSpan: 2 }), getValue({ de: 'OOvABOGvmwx.HllvX50cXC0', colSpan: 2 }), getValue({ disable: true, colSpan: 2 })],
        ["3.2", <p className="text-left">{`     - Số mới dùng thuốc tiêm tránh thai`}</p>, getValue({ de: 'Z287TyXoKVB', colSpan: 2 }), getValue({ de: 'XCOxyF9ZvFn.HllvX50cXC0', colSpan: 2 }), getValue({ disable: true, colSpan: 2 })],
        ["3.3", <p className="text-left">{`     - Số mới dùng thuốc cấy tránh thai`}</p>, getValue({ de: 'uRuorRx2UR1', colSpan: 2 }), getValue({ de: 'VJVi4KCxpzU.HllvX50cXC0', colSpan: 2 }), getValue({ disable: true, colSpan: 2 })],
        ["3.4", <p className="text-left">{`     - Số mới triệt sản`}</p>, getValue({ de: 'lvbITHwRkkg', colSpan: 2 }), getValue({ de: 'nOKoSAWmBaJ.HllvX50cXC0', colSpan: 2 }), getValue({ disable: true, colSpan: 2 })],
        ["3.5", <p className="text-left">{`       Trđ: + nam`}</p>, getValue({ de: 'Psy27hX3MrZ', colSpan: 2 }), getValue({ de: 'HjOtfiHHCVv.HllvX50cXC0', colSpan: 2 }), getValue({ disable: true, colSpan: 2 })],
        ["3.6", <p className="text-left">{`     - Biện pháp khác`}</p>, getValue({ de: 'CBQNnqykPeA', colSpan: 2 }), getValue({ de: 'hoegsBrTcwt.HllvX50cXC0', colSpan: 2 }), getValue({ disable: true, colSpan: 2 })],
        ["4", <p className="text-left">{`Tai biến sử dụng BPTT`}</p>, getValue({ de: 'SP8fU9unOSC', colSpan: 2 }), getValue({ de: 'N0DkTju2ygs.HllvX50cXC0', colSpan: 2 }), getValue({ de: 'dnP5tpGvziR.HllvX50cXC0', colSpan: 2 })],
        ["5", <p className="text-left">{`Số phá thai`}</p>, getValue({ de: 'lf0BrDLpp5m', colSpan: 2 }), getValue({ de: 'xR1SRHBmOSl.HllvX50cXC0', colSpan: 2 }), getValue({ disable: true, colSpan: 2 })],
        ["5.1", <p className="text-left">{`Trđ: - &lt;=7 tuần`}</p>, getValue({ de: 'GzshVKdoZBg', colSpan: 2 }), getValue({ de: 'hMHRO6boyNh.HllvX50cXC0', colSpan: 2 }), getValue({ disable: true, colSpan: 2 })],
        ["5.2", <p className="text-left">{`    - Vị thành niên`}</p>, getValue({ de: 'NE8zptDwyFQ', colSpan: 2 }), getValue({ de: 'eqChBVhTqkF.HllvX50cXC0', colSpan: 2 }), getValue({ disable: true, colSpan: 2 })],
        ["I", <p className="text-left">{`Chăm sóc sức khỏe trẻ em`}</p>, getValue({ colSpan: 2 }), getValue({ disable: true, colSpan: 2 }), getValue({ disable: true, colSpan: 2 })],
        ["1", <p className="text-left">{`Trẻ đẻ ra sống`}</p>, getValue({ de: 'hvS0ROXGv9e', colSpan: 2 }), getValue({ de: 'gZJ4tj8OMWF', colSpan: 2 }), getValue({ de: 'EREAmT1IEt0', colSpan: 2 })],
        ["1.1", <p className="text-left">{`Trđ: - nam`}</p>, getValue({ de: 'fdptEnfQIjQ', colSpan: 2 }), getValue({ de: 'hvS0ROXGv9e.HdSWnxLkSpK', colSpan: 2 }), getValue({ de: 'EREAmT1IEt0.NZTXFyz6GLm', colSpan: 2 })],
        ["", <p className="text-left">{`Trđ: - nữ`}</p>, getValue({ de: 'sw4HsEooMSp', colSpan: 2 }), getValue({ de: 'hvS0ROXGv9e.hACnDcxd9Hv', colSpan: 2 }), getValue({ de: 'EREAmT1IEt0.GvoEANq375m', colSpan: 2 })],
        ["2", <p className="text-left">{`Số trẻ sơ sinh được chăm sóc thiết yếu sớm trong và ngay sau đẻ (EENC)`}</p>, getValue({ de: 'lHfpcZ01biD', colSpan: 2 }), getValue({ de: 'lHfpcZ01biD.HllvX50cXC0', colSpan: 2 }), getValue({ de: 'FDTbZf4ZedQ.HllvX50cXC0', colSpan: 2 })],
        ["3", <p className="text-left">{`Số trẻ đẻ non`}</p>, getValue({ de: 'CjM6Xjwuohw', colSpan: 2 }), getValue({ de: 'CjM6Xjwuohw.IEweiFaTu3a', colSpan: 2 }), getValue({ de: 'wyg61jfON6Y.HllvX50cXC0', colSpan: 2 })],
        ["4", <p className="text-left">{`Số trẻ bị ngạt`}</p>, getValue({ de: 'aos3iUZ9u9T', colSpan: 2 }), getValue({ de: 'aos3iUZ9u9T.IEweiFaTu3a', colSpan: 2 }), getValue({ de: 'HiErmXLzqqT.HllvX50cXC0', colSpan: 2 })],
        ["5", <p className="text-left">{`Trẻ sơ sinh được cân`}</p>, getValue({ de: 'RHsZDNIbPxi', colSpan: 2 }), getValue({ de: 'RHsZDNIbPxi.IEweiFaTu3a', colSpan: 2 }), getValue({ de: 'kBsOZgPQvVN.HllvX50cXC0', colSpan: 2 })],
        ["6", <p className="text-left">{`Trẻ sơ sinh có trọng lượng &lt; 2500 gram`}</p>, getValue({ de: 't82Gp0IG71J', colSpan: 2 }), getValue({ de: 't82Gp0IG71J.IEweiFaTu3a', colSpan: 2 }), getValue({ de: 'xbY5B05iNrA.HllvX50cXC0', colSpan: 2 })],
        ["7", <p className="text-left">{`Trẻ sơ sinh có trọng lượng &gt; 4000 gram`}</p>, getValue({ de: 'mUy244qjDuH', colSpan: 2 }), getValue({ de: 'mUy244qjDuH.IEweiFaTu3a', colSpan: 2 }), getValue({ de: 'F2sgq3l9m1Q.HllvX50cXC0', colSpan: 2 })],
        ["8", <p className="text-left">{`Số được tiêm vitamin K1`}</p>, getValue({ de: 'K4iyoGAYqkP', colSpan: 2 }), getValue({ de: 'K4iyoGAYqkP.IEweiFaTu3a', colSpan: 2 }), getValue({ de: 'MASGKcCBi5I.HllvX50cXC0', colSpan: 2 })],
        ["9", <p className="text-left">{`Tử vong thai nhi từ 22 tuần đến khi đẻ`}</p>, getValue({ de: 'BArq67DfpRK', colSpan: 2 }), getValue({ de: 'BArq67DfpRK.IEweiFaTu3a', colSpan: 2 }), getValue({ de: 'gO4scNKIWZf.HllvX50cXC0', colSpan: 2 })],
    ].map((row, rowIndex) => {
        return row.map((col, colIndex, arrCol) => {
            let className = ['I', 'II',].includes(arrCol[0]) ? `sticky-row-1` : ``
            if (col?.view || !col) return {
                value: 0,
                view: <></>,
                ...col,
                className
            };

            return {
                value: [0, 1].includes(colIndex) ? 0 : col,
                view: numToLocaleString(col),
                className
            }
        })
    });


    return {
        TableHeader: props.HeaderUI({
            listColumnConfig: props.listColumnConfig,
            title: props.title,
            ...props
        }),
        dataByRow: [,
            ...listRow
        ]
    }
}
