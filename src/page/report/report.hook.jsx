import { useCorePickerState } from "@core/stateManage/corePickerState";
import { getCustomReportStateByPath } from "@core/stateManage/customState";
import { useCoreMetaState } from "@core/stateManage/metadataState";
import { setDefaultNameSpace, trans } from "@core/translation/i18n";
import { notification } from "antd";
import { parse } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";


export function useListParam() {
    const [searchParams] = useSearchParams();
    let [listParam, setListParam] = useState([]);

    useEffect(() => {
        let result = {};
        for (const entry of searchParams.entries()) {
            const [param, value] = entry;
            result[param] = value;
        }
        setListParam(result);
    }, []);

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
    }, [periodSelected, orgSelected, listParam])

    return newParams
}

//Return variable from report instance
export function useReportTarget({ listParam, setOrgSelected, metadata_utils }) {
    let [
        instanceTarget,
        setReportTarget,
        listReport
    ] = useCoreMetaState(useShallow(state => ([
        state.instanceTarget,
        state.actions.setReportTarget,
        state.listReport
    ])))

    let [loaded, setLoaded] = useState(false);
    const { t, i18n } = useTranslation();


    useEffect(() => {
        if (!listParam || listParam.length == 0) return undefined;
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

export const usePreparePicker = () => {
    let [
        reportTarget,
        setGlobalOverlay,
    ] = useCoreMetaState(useShallow(state => ([
        state.reportTarget,
        state.actions.setGlobalOverlay,
    ])))

    const [setCorePicker] = useCorePickerState(useShallow(state => ([state.actions.setCorePicker])));


    const openPicker = useCallback((bool = true) => {
        setGlobalOverlay({
            isOpen: bool,
            closeable: true,
            type: {
                key: 'corePicker',
                title: trans('common:corePicker.title'),
                // content: <CorePicker />
            }
        })
    })

    useEffect(() => {
        if (reportTarget && !reportTarget?.errors) {
            setCorePicker({
                pickCompleted: false
            })
            openPicker(true);
        }
    }, [reportTarget])

    return { openPicker }
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