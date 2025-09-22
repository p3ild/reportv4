import { useEffect, useState } from 'react';
import { setupEnvironment, wait } from '../network';
import { useShallow } from 'zustand/react/shallow'
import { getCoreMetaStateByPath, useCoreMetaState } from '@core/stateManage/metadataState';
import { useCorePickerState } from '@core/stateManage/corePickerState';
import i18n from '../translation/i18n';
import { parallel } from 'async';
import { flatten, omit } from 'lodash';
import ProgressNotificationBuilder from '../ui/picker/ProgressData';

let progressNotification = ProgressNotificationBuilder({
    NOTIFICATION_KEY: Math.random(),
    label: 'Đang chuẩn bị dữ liệu hệ thống',
});


//Define instance
export const useDefiningInstance = () => {
    const [
        setInstanceTarget,
        firstLoadApp
    ] = useCoreMetaState(useShallow(state => ([
        state.actions.setInstanceTarget,
        state.firstLoadApp
    ])));

    useEffect(() => {
        (async () => {
            let processEnvTargetInstance = import.meta.env.VITE_TARGET_BUILD_INSTANCE;
            let tmp;
            let instanceConfig = [
                {
                    key: 'INFLUENZA_NEW_ORG_STRUCTURE',
                    path: '../../instanceConfig/influenza/index.js'
                },
                {
                    key: 'BAOCAO25',
                    path: '../../instanceConfig/baocao25/index.js'
                }
            ].find(e => e.key == processEnvTargetInstance);
            if (instanceConfig) {
                tmp = await import(instanceConfig.path)/* @vite-ignore */
            } else {
                tmp = Promise.resolve(undefined);
            }
            let instance = tmp.default;

            await instance.init({});
            setInstanceTarget({
                ...instance,
                ...omit(tmp, ['default'])// Get all export from instance.jsx file without default export
            })
        })()
    }, [])
}
//Define network baseOn instance
export const useNetwork = () => {
    const [
        instanceTarget,
        networkUtils,
        setNetworkUtils,
        setGlobalOverlay
    ] = useCoreMetaState(useShallow(state => ([
        state.instanceTarget,
        state.networkUtils,
        state.actions.setNetworkUtils,
        state.actions.setGlobalOverlay,
    ])));


    useEffect(() => {
        (async () => {
            if (instanceTarget && !networkUtils) {
                let { host, auth } = setupEnvironment({ instanceTarget });
                const { networkUtils: mUtils } = await import("../network")
                mUtils.init({ host, auth, instanceTarget });
                mUtils.ping({}).then(e => {
                    if (e.isAuthorize) {
                        setNetworkUtils(mUtils);
                    } else {
                        setGlobalOverlay({ isOpen: false })
                        getCoreMetaStateByPath('actions.setError')(e)
                    }
                })

            }
        })()
    }, [instanceTarget]);

    return {
        ...networkUtils
    }
}

export const useMetadataAddition = () => {
    const [loaded, setLoaded] = useState(false);
    let [
        networkUtils, language, instanceTarget,
        setSystemSettings,
        setMe,
        setListReport,
        setListFolder,
        firstLoadApp,
        setLanguage
    ] = useCoreMetaState(useShallow(state => [
        state.networkUtils, state.language, state.instanceTarget,
        state.actions.setSystemSettings,
        state.actions.setMe,
        state.actions.setListReport,
        state.actions.setListFolder,
        state.firstLoadApp,
        state.actions.setLanguage,

    ]));


    useEffect(() => {
        setLoaded(false);
        (async () => {
            if (networkUtils && instanceTarget) {
                let listRequest = [
                    {
                        key: "ME_DATA",
                        fetch: () => {
                            return networkUtils.getMe({ includeSettings: true }).then(me => {
                                language = language || me?.userSettings?.keyUiLocale;
                                if (import.meta.env.DEV) language = import.meta.env.VITE_TARGET_LANG;
                                i18n.changeLanguage(language || me?.userSettings?.keyUiLocale)
                                setMe(me);
                                setLanguage(language);
                            });
                        }
                    },
                    {
                        key: "SYSTEM_SETTINGS",
                        fetch: () => {
                            return networkUtils.getSystemSettings({}).then(settings => setSystemSettings(settings));
                        }
                    },
                    // {
                    //     key: "SYSTEM_SETTINGS",
                    //     fetch: () => {
                    //         return networkUtils.getSystemSettings({}).then(settings => setSystemSettings(settings));
                    //     }
                    // },
                    {
                        key: "LIST_REPORT",
                        fetch: () => {
                            return instanceTarget.getListReport({ networkUtils, instanceTarget })
                                .then(({ listReport, listFolder }) => {
                                    setListReport(listReport)
                                    setListFolder(listFolder)
                                });
                        }
                    },
                    // {
                    //     key: "PROGRAM",
                    //     fetch: () => {
                    //         return networkUtils._get({ api: '/api/optionSets.json?fields=id,name,options[id,name,code]&paging=false' }).then();
                    //     }
                    // },
                    // {
                    //     key: "OPTION_SET",
                    //     fetch: () => {
                    //         return networkUtils._get({ api: '/api/programs.json?fields=id,name,programStages[id,name,access,programStageDataElements[dataElement[id,name,optionSet[options[name,code,id]]]]]&paging=false' })
                    //     }
                    // }
                ].map((e, idx) => {
                    return (callback) => {
                        let taskStatus = getCoreMetaStateByPath('initAppTask');
                        let currentTaskStatus = taskStatus[e.key].status;
                        if (!currentTaskStatus) {
                            e.fetch().then((data) => {
                                callback(undefined, data)
                                taskStatus[e.key].status = true;
                                getCoreMetaStateByPath('actions.setInitAppTask')(taskStatus);
                                progressNotification.open(taskStatus);

                            })
                        } else callback(undefined)


                    }
                })


                await parallel(listRequest)
                setLoaded(true)


            }
        })()
    }, [networkUtils, instanceTarget])
    return loaded
}
//Prepare for load single report
const usePrefetchForReport = ({ loaded }) => {
    const [
        networkUtils, me,
        setMe,
    ] = useCoreMetaState(useShallow(state => ([
        state.networkUtils, state.me,
        state.actions.setMe,
    ])));

    const [corePicker, setCorePicker] = useCorePickerState(
        useShallow(state => ([
            state.corePicker,
            state.actions.setCorePicker,
        ])));

    useEffect(
        () => {

            (async () => {
                let taskStatus = getCoreMetaStateByPath('initAppTask');
                if (loaded && networkUtils && !me?.orgViewData) {
                    progressNotification.open(taskStatus);
                    let orgViewData = await parallel(
                        me?.dataViewOrganisationUnits?.map(orgObj => {
                            return (callback) => {
                                return networkUtils.queryOrgByLevel({ orgID: orgObj.id }).then(({ data }) => {
                                    callback(undefined, data)
                                })
                            }
                        })
                    );
                    !corePicker.orgSelected && setCorePicker({
                        orgSelected: {
                            id: orgViewData[0]?.organisationUnits?.[0]?.id,
                            displayName: orgViewData[0]?.organisationUnits?.[0]?.displayName,
                            level: orgViewData[0]?.organisationUnits?.[0]?.level
                        }
                    })

                    taskStatus.ORG.status = true;
                    getCoreMetaStateByPath('actions.setInitAppTask')(taskStatus);

                    progressNotification.open(taskStatus);

                    progressNotification.destroy(taskStatus, 0.3);

                    setMe({
                        ...me,
                        orgViewData: flatten(orgViewData)
                    });
                }
            })();

        },
        [networkUtils, me?.id, loaded]
    )
}

// ________ ON PREPARE APP COMPLETED _________
export default function usePrepareApp() {
    const [
        instanceTarget, networkUtils, language,
        setGlobalOverlay,
        firstLoadApp,
        setFirstLoadApp,
    ] = useCoreMetaState(useShallow(state => ([
        state.instanceTarget, state.networkUtils, state.language,
        state.actions.setGlobalOverlay,

        state.firstLoadApp,
        state.actions.setFirstLoadApp,
    ])));

    const [setCorePicker] = useCorePickerState(
        useShallow(state => ([
            state.actions.setCorePicker,
        ])));

    useDefiningInstance();
    useNetwork();

    usePrefetchForReport({ loaded: firstLoadApp })
    const metadataAddition = useMetadataAddition()

    // useEffect(() => {
    //     console.log(taskStatus)
    // }, [])

    useEffect(() => {
        setGlobalOverlay({
            isOpen: true,
        });
        setFirstLoadApp(false);
        if (instanceTarget
            && networkUtils
            && metadataAddition) {
            setFirstLoadApp(true);
            setGlobalOverlay({
                isOpen: false,
            });
            setCorePicker({ reloadReport: Math.random() });
        }
    }, [instanceTarget, networkUtils, metadataAddition, language])

    return {
        loaded: firstLoadApp,
        instanceTarget,
        networkUtils,
        language
    }
}

