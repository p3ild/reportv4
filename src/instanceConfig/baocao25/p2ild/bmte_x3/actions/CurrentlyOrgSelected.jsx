import { numToLocaleString } from "@core/utils/stringutils";
import { getLastesPeriodValue, getValueDE } from "../../common/DataValueUtils";
import { fetchAnalyticsData } from "../../common/request/request";
import { getDisableColDataObject } from "../../common/ui/RowRender";
import { getCoreMetaStateByPath, useCoreMetaState } from "@core/stateManage/metadataState";
import { chunk } from "lodash";
import { getNonCummulativePeriod } from "../../common/utils";
import { logger } from "@core/utils/logger";

export const getDataCommon = async (props) => {
    const _get = getCoreMetaStateByPath(`_get`);
    const orgUnitSelectedID = props.orgUnit
    const periods = props.period
    const periodNonCummulative = getNonCummulativePeriod(props.period);
    setValue();

    function setValue() {
        let stringDENonCummulative = ["cnzF1Wsyll7.HllvX50cXC0", "EfO3KDWNMde.HllvX50cXC0"];
        let stringDEs = ["WpK3CA1GiFB.HllvX50cXC0", "q9TgXtGb497.HllvX50cXC0", "JTBxLXQRhKp.IEweiFaTu3a", "JTBxLXQRhKp.N13A1fU7DAu", "YgF4A2VhFm9.IEweiFaTu3a", "YgF4A2VhFm9.N13A1fU7DAu", "fzWfb5NkUXR.IEweiFaTu3a", "fzWfb5NkUXR.N13A1fU7DAu", "zc1XKRhd9f5.HllvX50cXC0", "LSlYBmMhM5E.IEweiFaTu3a", "LSlYBmMhM5E.N13A1fU7DAu", "HuCDOiwdL6c.HllvX50cXC0", "mYN2cR5UuWb.IEweiFaTu3a", "mYN2cR5UuWb.N13A1fU7DAu", "TxLjw6hd0yt.HllvX50cXC0", "Nix9Ht2BTot.IEweiFaTu3a", "Nix9Ht2BTot.N13A1fU7DAu", "e6zJo1kcJxJ.HllvX50cXC0", "eW3TnNPwPBA.IEweiFaTu3a", "eW3TnNPwPBA.N13A1fU7DAu", "cfrapgQemM1.HllvX50cXC0", "Rb7YZo0877Z.IEweiFaTu3a", "Rb7YZo0877Z.N13A1fU7DAu", "A6NjontTGPD.HllvX50cXC0", "Vov1ZBQDPGA.IEweiFaTu3a", "Vov1ZBQDPGA.N13A1fU7DAu", "PMY8GxXQ6g9.HllvX50cXC0", "Wf8ywubJAEC.IEweiFaTu3a", "Wf8ywubJAEC.N13A1fU7DAu", "RbCdwT3sPMN.HllvX50cXC0", "MZEU8meruHx.IEweiFaTu3a", "MZEU8meruHx.N13A1fU7DAu", "PIq2vxNHxFO.HllvX50cXC0", "QqPcpJ7yLhR.IEweiFaTu3a", "gSjiM6ajL5h.HllvX50cXC0", "PZkzL05NpNg.IEweiFaTu3a", "PZkzL05NpNg.N13A1fU7DAu", "LpJcOfvhmqf.HllvX50cXC0", "SGDhfZGXzL2.IEweiFaTu3a", "SGDhfZGXzL2.N13A1fU7DAu", "kvF5zxxmhrr.HllvX50cXC0", "niRcB5DsPI9.IEweiFaTu3a", "niRcB5DsPI9.N13A1fU7DAu", "GP67Tp2Qdjx.HllvX50cXC0", "CaUTXHA9zK5.IEweiFaTu3a", "QDuMzfdC2CE.HllvX50cXC0", "SZpvMstnLjc.IEweiFaTu3a", "SZpvMstnLjc.N13A1fU7DAu", "FcjVomauoY9.HllvX50cXC0", "DZ4gp6GzBkJ.IEweiFaTu3a", "DZ4gp6GzBkJ.N13A1fU7DAu", "BaDOQgmTTwR.HllvX50cXC0", "ckrGFqdrq1O.IEweiFaTu3a", "ckrGFqdrq1O.N13A1fU7DAu", "jPjyJGM0Xpe.HllvX50cXC0", "cdnqvBRbLNA.IEweiFaTu3a", "cdnqvBRbLNA.N13A1fU7DAu", "xYF6wnkt6v8.HllvX50cXC0", "Jpn3u1SCEI3.IEweiFaTu3a", "Jpn3u1SCEI3.N13A1fU7DAu", "M2YPAEsSP7B.HllvX50cXC0", "XGxKRz2pyqF.IEweiFaTu3a", "XGxKRz2pyqF.N13A1fU7DAu", "AZaIUVETowy.HllvX50cXC0", "NveBdKInM5m.IEweiFaTu3a", "NveBdKInM5m.N13A1fU7DAu", "m4OMVZvniL2.HllvX50cXC0", "DWCz9b0uIkA.HllvX50cXC0", "tQG9ii5Zh1g.IEweiFaTu3a", "tQG9ii5Zh1g.N13A1fU7DAu", "j6cPf2NjluG.IEweiFaTu3a", "j6cPf2NjluG.N13A1fU7DAu", "Nvx0MVk5sug.HllvX50cXC0", "aTKuaZLHkMG.IEweiFaTu3a", "aTKuaZLHkMG.N13A1fU7DAu", "Paf7Ct3jf17.HllvX50cXC0", "OofwmXf2vAi", "g8Rnn7j2ccS.HllvX50cXC0", "ewHRN8vKSLo.HllvX50cXC0", "sbyDKnwZcOy.IEweiFaTu3a", "bp4fjBzE1sw.IEweiFaTu3a", "sbyDKnwZcOy.N13A1fU7DAu", "bp4fjBzE1sw.N13A1fU7DAu", "wtfsRmDu2CP.IEweiFaTu3a", "mLtnuPFSxxZ.IEweiFaTu3a", "wtfsRmDu2CP.N13A1fU7DAu", "mLtnuPFSxxZ.N13A1fU7DAu", "uK1n7dFEI1N.IEweiFaTu3a", "WanOM8J3Suj.IEweiFaTu3a", "uK1n7dFEI1N.N13A1fU7DAu", "WanOM8J3Suj.N13A1fU7DAu", "CGEpgEX247O.IEweiFaTu3a", "LxvbLJOjdg2.IEweiFaTu3a", "CGEpgEX247O.N13A1fU7DAu", "LxvbLJOjdg2.N13A1fU7DAu", "DkAOzZslOSs.IEweiFaTu3a", "YG7omyyd4PR.IEweiFaTu3a", "DkAOzZslOSs.N13A1fU7DAu", "YG7omyyd4PR.N13A1fU7DAu", "cpaW1UIFvGp.IEweiFaTu3a", "TSspKDE6jAN.IEweiFaTu3a", "cpaW1UIFvGp.N13A1fU7DAu", "TSspKDE6jAN.N13A1fU7DAu", "DLsz1yBTbb7.IEweiFaTu3a", "vFawHfMzRgI.IEweiFaTu3a", "DLsz1yBTbb7.N13A1fU7DAu", "vFawHfMzRgI.N13A1fU7DAu", "fMyhbxbf6mU.IEweiFaTu3a", "fMyhbxbf6mU.N13A1fU7DAu", "FowjUrhGgEr.IEweiFaTu3a", "FowjUrhGgEr.N13A1fU7DAu", "VnQNEJEQgBG.HllvX50cXC0", "swLTD7Obkns.HllvX50cXC0", "JvUdl1Prp9C.HllvX50cXC0", "PjCNurYlbM7.HllvX50cXC0", "J9D8TfIFQy7.HllvX50cXC0", "Kyc2UW89wVj.HllvX50cXC0", "PlEEec2kdNT.HllvX50cXC0", "yaoNKUeOyvE.HllvX50cXC0", "OOvABOGvmwx.HllvX50cXC0", "XCOxyF9ZvFn.HllvX50cXC0", "VJVi4KCxpzU.HllvX50cXC0", "nOKoSAWmBaJ.HllvX50cXC0", "HjOtfiHHCVv.HllvX50cXC0", "ycVdXnxxwHs.HllvX50cXC0", "ojeJgOjf9vm.HllvX50cXC0", "N0DkTju2ygs.HllvX50cXC0", "xR1SRHBmOSl.HllvX50cXC0", "hMHRO6boyNh.IEweiFaTu3a", "eqChBVhTqkF.IEweiFaTu3a", "hvS0ROXGv9e.HdSWnxLkSpK", "hvS0ROXGv9e.kqQCGrF7Cwh", "EREAmT1IEt0.NZTXFyz6GLm", "hvS0ROXGv9e.hACnDcxd9Hv", "hvS0ROXGv9e.ShfX7e0nuja", "EREAmT1IEt0.GvoEANq375m", "ezhAgYWPwre.IEweiFaTu3a", "ezhAgYWPwre.N13A1fU7DAu", "hrHMgwjc0s9.HllvX50cXC0", "lHfpcZ01biD.IEweiFaTu3a", "lHfpcZ01biD.N13A1fU7DAu", "FDTbZf4ZedQ.HllvX50cXC0", "d4iPeJgrz7K.IEweiFaTu3a", "d4iPeJgrz7K.N13A1fU7DAu", "emBJLUOROR1.HllvX50cXC0", "mQ8QJXYcRFP.IEweiFaTu3a", "mQ8QJXYcRFP.N13A1fU7DAu", "ScXGu9cpsqJ.HllvX50cXC0", "mLlHmnCH4Nw.IEweiFaTu3a", "mLlHmnCH4Nw.N13A1fU7DAu", "TW3GMpmBiDq.HllvX50cXC0", "CjM6Xjwuohw.IEweiFaTu3a", "CjM6Xjwuohw.N13A1fU7DAu", "wyg61jfON6Y.HllvX50cXC0", "aos3iUZ9u9T.IEweiFaTu3a", "aos3iUZ9u9T.N13A1fU7DAu", "HiErmXLzqqT.HllvX50cXC0", "RHsZDNIbPxi.IEweiFaTu3a", "RHsZDNIbPxi.N13A1fU7DAu", "kBsOZgPQvVN.HllvX50cXC0", "t82Gp0IG71J.IEweiFaTu3a", "t82Gp0IG71J.N13A1fU7DAu", "xbY5B05iNrA.HllvX50cXC0", "mUy244qjDuH.IEweiFaTu3a", "mUy244qjDuH.N13A1fU7DAu", "F2sgq3l9m1Q.HllvX50cXC0", "K4iyoGAYqkP.IEweiFaTu3a", "K4iyoGAYqkP.N13A1fU7DAu", "MASGKcCBi5I.HllvX50cXC0", "HXpr0QXWRmJ.IEweiFaTu3a", "QqPcpJ7yLhR.N13A1fU7DAu", "Z0gXj8Qtph1.HllvX50cXC0", "klseO42Bsms.IEweiFaTu3a", "klseO42Bsms.N13A1fU7DAu", "ML3GPrLYGeY.HllvX50cXC0", "BArq67DfpRK.IEweiFaTu3a", "BArq67DfpRK.N13A1fU7DAu", "gO4scNKIWZf.HllvX50cXC0", "Sra1fElVxHA.IEweiFaTu3a", "Sra1fElVxHA.N13A1fU7DAu", "eqxDWuHJzXS.HllvX50cXC0", "lkWJaJx1oaM.IEweiFaTu3a", "lkWJaJx1oaM.N13A1fU7DAu", "OeMdOutMpVN.HllvX50cXC0", "wPlQmAEhVXa.IEweiFaTu3a", "wPlQmAEhVXa.N13A1fU7DAu", "otLlFWL8SSY.HllvX50cXC0", "QXPKZgJlnqM.IEweiFaTu3a", "QXPKZgJlnqM.N13A1fU7DAu", "zVD1j6iRT91.HllvX50cXC0", "Uz0R3QwHrje.IEweiFaTu3a", "Uz0R3QwHrje.N13A1fU7DAu", "qfawD1Ln20x.HllvX50cXC0", "axloWTL6DpA.IEweiFaTu3a", "axloWTL6DpA.N13A1fU7DAu", "vIRRjad46tO.HllvX50cXC0", "HXpr0QXWRmJ.N13A1fU7DAu"];
        let stringTotalDE = ["totalJTBxLXQRhKp", "totalYgF4A2VhFm9", "totalfzWfb5NkUXR", "totalLSlYBmMhM5E", "totalmYN2cR5UuWb", "totalNix9Ht2BTot", "totaleW3TnNPwPBA", "totalRb7YZo0877Z", "totalVov1ZBQDPGA", "totalWf8ywubJAEC", "totalMZEU8meruHx", "totalQqPcpJ7yLhR", "totalPZkzL05NpNg", "totalSGDhfZGXzL2", "totalniRcB5DsPI9", "totalCaUTXHA9zK5", "totalSZpvMstnLjc", "totalDZ4gp6GzBkJ", "totalckrGFqdrq1O", "totalcdnqvBRbLNA", "totalJpn3u1SCEI3", "totalXGxKRz2pyqF", "totalNveBdKInM5m", "totaltQG9ii5Zh1g", "totalj6cPf2NjluG", "totalaTKuaZLHkMG", "totalsbyDKnwZcOy", "totalbp4fjBzE1sw", "totalwtfsRmDu2CP", "totalmLtnuPFSxxZ", "totaluK1n7dFEI1N", "totalWanOM8J3Suj", "totalCGEpgEX247O", "totalLxvbLJOjdg2", "totalDkAOzZslOSs", "totalYG7omyyd4PR", "totalcpaW1UIFvGp", "totalTSspKDE6jAN", "totalDLsz1yBTbb7", "totalvFawHfMzRgI", "totalfMyhbxbf6mU", "totalFowjUrhGgEr", "totalhvS0ROXGv9e", "totalEREAmT1IEt0", "totalezhAgYWPwre", "totallHfpcZ01biD", "totald4iPeJgrz7K", "totalmQ8QJXYcRFP", "totalmLlHmnCH4Nw", "totalCjM6Xjwuohw", "totalaos3iUZ9u9T", "totalRHsZDNIbPxi", "totalt82Gp0IG71J", "totalmUy244qjDuH", "totalK4iyoGAYqkP", "totalHXpr0QXWRmJ", "totalklseO42Bsms", "totalBArq67DfpRK", "totalSra1fElVxHA", "totallkWJaJx1oaM", "totalwPlQmAEhVXa", "totalQXPKZgJlnqM", "totalUz0R3QwHrje", "totalaxloWTL6DpA"];
        let stringIndicatorDE = ["indicatorXSdJYlH8vwk", "indicatorhXfYMmrISaf", "indicatorratsfcVTp7F", "indicatorswkskJJvLMp", "indicatorqydcnPEDbmB", "indicatorsa492jWpjDf", "indicatorm2PgSXO8ve6", "indicatormcblBvyah4o", "indicatorEbgigboTmrd", "indicatorHIydN4UJex2", "indicatorZ287TyXoKVB", "indicatoruRuorRx2UR1", "indicatorlvbITHwRkkg", "indicatorPsy27hX3MrZ", "indicatorifocZOceGZX", 'indicatorhoegsBrTcwt', "indicatorEYDDQJdwWzE", "indicatorSP8fU9unOSC", "indicatorlf0BrDLpp5m", "indicatorgZJ4tj8OMWF", "indicatorAtRPXxTrG3W", "indicatorfdptEnfQIjQ", "indicatorsw4HsEooMSp"];
        let resultDe = [...stringDEs, ...stringTotalDE, ...stringIndicatorDE].map(e => {
            let rs;
            ['total', 'indicator'].some(m => {
                if (e.includes(m)) {
                    rs = e.split(m)[1]
                    return true
                }
            })
            return rs || e
        });

        (async () => {

            let apiDENonCummulative = "/api/analytics.json?dimension=dx:" +
                stringDENonCummulative.join(';') +
                "&dimension=ou:" +
                orgUnitSelectedID +
                ";&dimension=pe:" + periodNonCummulative;

            let allData = [
                ...resultDe,
                ...(periodNonCummulative ? [] : stringDENonCummulative)
            ]
            let a = await Promise.all(
                [
                    ...chunk(allData, 300).reduce((total, bundleDE, idx, arr) => {
                        let api = "/api/analytics.json?dimension=dx:" +
                            bundleDE.join(';') +
                            "&dimension=ou:" +
                            orgUnitSelectedID +
                            ";&filter=pe:" + periods?.outputDataDhis2
                            ;
                        total.push(_get(api))
                        return total
                    }, []),
                    periodNonCummulative ? _get(apiDENonCummulative) : undefined
                ].filter(e => e)
            )

            let json = await Promise.all(a);

            let foundData = [];
            [...resultDe, ...stringDENonCummulative].forEach(function (de) {
                let value = 0;
                json.some(searchValue => {
                    let getValue = ({ de, colSpan, disable, pe }) => {
                        if (disable) return '-';

                        if (de) {
                            let value = getValueDE({ jsonDhis: searchValue, de, pe })
                            return value
                        } else {
                            return 0
                        }
                    }

                    if (searchValue.metaData.dimensions.dx.includes(de)) {
                        if (stringDENonCummulative.includes(de)) {
                            value = getValue({ de, pe: periodNonCummulative });
                        } else {
                            value = getValue({ de });
                        }

                        return true
                    }
                })

                //Indicator
                let idIndi = $("#indicator" + de);
                if (idIndi != null) {
                    idIndi.text(value);
                    foundData.push({ id: idIndi, value })
                } else {
                }

                try {
                    $(".indicator" + de).each(function (e) { $(this).text(value) })
                    foundData.push({ id: ".indicator" + de, value })
                } catch (e) {

                }


                //Total
                let idTotal = $("#total" + de);
                if (idTotal != null) {
                    idTotal.text(value);
                    foundData.push({ id: idTotal, value })
                }

                //DataElement
                let idDefineObj;
                if (de.indexOf(".") != -1) {
                    let splited = de.split(".");
                    idDefineObj = "#" + splited[0] + "-" + splited[1] + "-val";
                } else {
                    idDefineObj = "#" + de + "-" + "HllvX50cXC0-val";
                }
                try {
                    $(idDefineObj).text(value);
                    //Try with class
                    $(idDefineObj).text(value);
                    $(idDefineObj.replace('#', '.')).each(function (e) { $(this).text(value) })
                } catch (e) {

                }


            });
            logger.dev(foundData)
        })()
    }

}