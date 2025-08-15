import { getApprovalStateByPath } from "@core/stateManage/approvalState";
import { getPickerStateByPath, useCorePickerState } from "@core/stateManage/corePickerState";
import { getCustomReportStateByPath } from "@core/stateManage/customState";
import { useCoreMetaState } from "@core/stateManage/metadataState";
import { setDefaultNameSpace } from "@core/translation/i18n";
import { notification } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { createSearchParams, useLocation, useSearchParams } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";


export function useListParam() {
    const [searchParams] = useSearchParams();
    let [listParam, setListParam] = useState({});

    useEffect(() => {
        let result = {};
        for (const entry of searchParams.entries()) {
            const [param, value] = entry;
            result[param] = value;
        }
        setListParam(result);
    }, [searchParams.get('id')]);

    return listParam;
}

export const useUpdateParamURL = ({ periodSelected, orgSelected, listParam, location, navigate }) => {
    const [newParams, setNewParams] = useState([]);
    useEffect(() => {
        let listPramUrlsTemp = { ...listParam };

        if (periodSelected) {
            if (periodSelected?.type) listPramUrlsTemp['periodType'] = periodSelected?.type
            if (periodSelected?.startDate) listPramUrlsTemp['start'] = periodSelected?.startDate
            if (periodSelected?.endDate) listPramUrlsTemp['end'] = periodSelected?.endDate
        }

        if (orgSelected) {
            listPramUrlsTemp['org'] = orgSelected?.id
        }

        listPramUrlsTemp = createSearchParams(listPramUrlsTemp)
        setNewParams({ listPramUrlsTemp })
    }, [periodSelected, orgSelected, JSON.stringify(listParam)]) // Fix: Use JSON.stringify to create stable reference

    return newParams
}

//Return variable from report instance
export function useReportTarget({ listParam, setOrgSelected, metadata_utils }) {
    let [
        instanceTarget,
        reportTarget,
        setReportTarget,
        setExcelOptions,
    ] = useCoreMetaState(useShallow(state => ([
        state.instanceTarget,
        state.reportTarget,
        state.actions.setReportTarget,
        state.actions.setExcelOptions,
    ])));

    let [
        corePicker,
        setCorePicker,
        allowPeriodTypes,
        openCorePicker
    ] = useCorePickerState(useShallow(state => ([
        state.corePicker,
        state.actions.setCorePicker,
        state.allowPeriodTypes,
        state.actions.openCorePicker
    ])));


    let [loaded, setLoaded] = useState(false);
    const { t, i18n } = useTranslation();


    useEffect(
        () => {
            setLoaded(false)
            if (reportTarget) {
                openCorePicker();
                //Default initExcelOptions
                setExcelOptions({
                    excelFileName: (reportTarget?.reportName || reportTarget?.reportCode || 'Báo cáo').toLocaleLowerCase().replace(/ /g, '_')
                });
            }
        },
        [reportTarget?.reportID]
    )

    useEffect(() => {
        let orgSelected = getPickerStateByPath('corePicker.orgSelected');

        if (
            reportTarget && !reportTarget?.errors // report ready
            && corePicker?.autoLoadReport // Check auto load report feature
            && allowPeriodTypes?.length != 0 // periodReady
            && orgSelected // orgReady
        ) {
            // console.log('check load immediately:', orgSelected?.support)


            // return;
            let currentPeriodType = corePicker?.dataPeriodByType?.currentType;
            let isSupportCurrentPeriodType = allowPeriodTypes
                && allowPeriodTypes?.includes(currentPeriodType)
                && !!corePicker?.dataPeriodByType[currentPeriodType];

            let isSupportOrg = !corePicker?.orgSelected?.error && orgSelected.support;


            const runImmediately = isSupportCurrentPeriodType && isSupportOrg;

            // return;
            // When open a report, default is open dialog picker. This funtion run at the last
            if (runImmediately
                && !corePicker?.pickCompleted // Only run when change report
            ) {
                setCorePicker({ pickCompleted: Math.random() })
                getPickerStateByPath('actions.openCorePicker')?.(false);
            } else {
                getPickerStateByPath('actions.openCorePicker')?.(true);
            }
        }

    }, [corePicker?.orgSelected?.support, allowPeriodTypes.join('_')])


    useEffect(() => {
        if (!listParam || Object.keys(listParam).length === 0) return undefined; // Fix: Check object keys instead of length
        (async () => {
            //Find target report over key ID
            let reportImport = await instanceTarget?.listReport?.find(e => e.key == listParam.id)?.getReportInstance();
            if (!reportImport) {
                reportImport = {
                    errors: [
                        // `Report (${listParam.id}) not found`
                        `Không tìm thấy báo cáo ${listParam.id}`
                    ]
                }
            } else {

                let { optionPickerDate, getTrans } = reportImport;

                /**
                 * Process period data from URL
                 * */
                if (listParam?.periodType && optionPickerDate) {
                    //Find type period match with @urlParam: periodType
                    let periodType = optionPickerDate?.find(e => e?.data?.id.toLowerCase() == listParam.periodType.toLowerCase());

                    if (!periodType) {
                        notification.warning({
                            message: "Lưu ý: Lỗi dường dẫn",
                            description: `Không hỗ trợ kỳ báo cáo ${listParam.periodType.toLowerCase()}`,
                        });
                    } else {
                        optionPickerDate = updateOptionPickerDate({ listParam, optionPickerDate })
                    }
                }

                /**
               * Process org data from URL
               * */
                if (listParam?.org) {
                    let orgParam = await metadata_utils.findOrgByID({ orgID: listParam.org });
                    if (orgParam?.error) {
                        notification.warning({
                            message: "Lưu ý: Lỗi dường dẫn",
                            description: `Kiểm tra lại mã đơn vị ${listParam.org}`,
                        });
                    } else {
                        setOrgSelected(orgParam)
                    }
                }

                //Update language
                // let resourceTrans = await reportImport?.getTrans();

                if (getTrans) {
                    let resourceTrans = await getTrans();
                    await i18n?.addResourceBundle('en', 'REPORT_TRANS', resourceTrans?.en);
                    await i18n?.addResourceBundle('vi', 'REPORT_TRANS', resourceTrans?.vi);
                    setDefaultNameSpace('REPORT_TRANS')
                }
            }

            getCustomReportStateByPath('actions.reset')();
            getApprovalStateByPath('actions.reset')();
            reportImport && setReportTarget(
                {
                    ...reportImport,
                    reportID: listParam.id,
                    // reportName: listReport
                }
            );

            setLoaded(true)

        })();
    }, [listParam]);

    return { loaded }
}

export const useExportExcel = (
    { triggerActionsReport,//variable for useEffect
        exportExcel,//Function excel
        dataFnc
    }
) => {
    useEffect(() => {
        if (!triggerActionsReport?.exportExcel) return;
        exportExcel(dataFnc)
    }, [triggerActionsReport?.exportExcel]);
}