import { create } from 'zustand'
import { Spin } from 'antd';
import { get } from 'lodash';
import { INIT_APP_TASK } from './constant';



export const useCoreMetaState = create((set, get) => (
    {
        firstLoadApp: false,
        instanceTarget: undefined,
        reportTarget: undefined,
        isDownloadExcelTrigger: false,
        initAppTask: INIT_APP_TASK,

        meData: undefined,
        networkUtils: undefined,
        version: undefined,
        language: undefined,

        listReport: [],
        listFolder: [],
        activeFolder: '',
        approvalData: {},

        excelOptions: {
            /**
             *Support: 
                excelFileName: '', // Excel file nam
                excelOnlyTable: '' // Only export table and ignore header
             */
        },
        globalOverlay: {
            isOpen: true,
            closeable: false
        },

        customReportData: {},
        _get: async (api) => {
            const networkUtils = get().networkUtils;
            if (!networkUtils) return "NetworkUtils is not loaded";
            return networkUtils._get({ api })
        },
        actions: {
            setTriggerDownloadExcel(isDownloadExcelTrigger) {
                set(state => ({ isDownloadExcelTrigger }))
            },
            setCustomReportData(newData, clear) {
                set(state => {
                    if (clear) {
                        return {
                            customReportData: {}
                        }
                    }
                    return {
                        customReportData: {
                            ...state.customReportData,
                            ...newData
                        }
                    }
                });
            },
            setInitAppTask: async (initAppTask) => {
                set(state => ({ initAppTask }));
            },
            setFirstLoadApp: async (bool) => {
                set(state => ({ firstLoadApp: bool }));
            },
            setActiveFolder: async (activeFolder) => {
                set(state => ({ activeFolder }));
            },
            setGlobalOverlay: async (globalOverlay) => {
                set(state => ({ globalOverlay }));
            },
            setExcelOptions: (excelOptions, reset) => {
                set(state => ({ excelOptions }));
            },
            setInstanceTarget: async (instanceTarget) => { set(state => ({ instanceTarget })); },
            setReportTarget: async (reportTarget) => { set(state => ({ reportTarget })); },
            setLanguage: async (language) => {
                set(state => ({ language }));
            },

            setVersion: async (version) => {
                set(state => ({ version }));
            },
            setMe: async (me) => {
                set(state => ({ me }));
            },
            setListReport: async (listReport) => {
                set(state => ({ listReport }));
            },
            setListFolder: async (listFolder) => {
                set(state => ({ listFolder }));
            },
            setNetworkUtils: async (networkUtils) => {
                set(state => ({ networkUtils }));
            },

            setApprovalData: async (approvalData) => {

                set(state => {
                    let newObj = {
                        ...state.approvalData,
                        ...approvalData
                    };
                    return {
                        approvalData: newObj
                    }
                })
            },


        }
    }
));

export const getCoreMetaStateByPath = (path) => {
    let coreMetaState = useCoreMetaState.getState();
    return get(
        coreMetaState
        , path
    )
}