import { useEffect, useState } from 'react';
import { setupEnvironment } from '../network';
import { useShallow } from 'zustand/react/shallow'
import { useCoreMetaState } from '@core/stateManage/metadataState';
import { useCorePickerState } from '@core/stateManage/corePickerState';
import i18n from '../translation/i18n';
import { parallel } from 'async';
import { flatten } from 'lodash';
import ProgressNotificationBuilder from '../ui/picker/ProgressData';

let progressNotification = ProgressNotificationBuilder({
    NOTIFICATION_KEY: Math.random(),
    label: 'Đang chuẩn bị dữ liệu hệ thống',
});

let taskStatus = {
    ME_DATA: {
        title: "Dữ liệu người dùng",
    },
    VERSION: {
        title: "Dữ liệu cài đặt",
    },
    LIST_REPORT: {
        title: "Dữ liệu báo cáo",
    },
    ORG: {
        title: "Dữ liệu đơn vị",
    },
    // PROGRAM: {
    //     title: "Dữ liệu chương trình",
    // },
    // OPTION_SET: {
    //     title: "Dữ liệu danh mục",
    // },


}

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
            switch (processEnvTargetInstance) {
                case 'BAOCAO25':
                    tmp = await import('../../instanceConfig/baocao25');
                    break;
                default:
                    tmp = Promise.resolve(undefined);
                    // setUnknowError(`Instance env not found: ${process.env.REACT_APP_TARGET_BUILD_INSTANCE}`);
                    break;
            }
            let {
                default: instance,
                locale
            } = tmp;
            await instance.init({
                locale
            });
            setInstanceTarget({
                ...instance, locale
            })
        })()
    }, [])
}
//Define network baseOn instance
export const useNetwork = () => {
    const [
        instanceTarget,
        networkUtils,
        setNetworkUtils
    ] = useCoreMetaState(useShallow(state => ([
        state.instanceTarget,
        state.networkUtils,
        state.actions.setNetworkUtils
    ])));

    useEffect(() => {
        (async () => {
            if (instanceTarget && !networkUtils) {
                let { host, auth } = setupEnvironment({ instanceTarget });
                const { networkUtils: mUtils } = await import("../network")
                mUtils.init({ host, auth, instanceTarget });
                setNetworkUtils(mUtils);
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
        setVersion,
        setMe,
        setListReport,
        setListFolder,
        firstLoadApp,
        setLanguage
    ] = useCoreMetaState(useShallow(state => [
        state.networkUtils, state.language, state.instanceTarget,
        state.actions.setVersion,
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
                        key: "VERSION",
                        fetch: () => {
                            return networkUtils.getVersion({}).then(version => setVersion(version));
                        }
                    },
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
                        taskStatus[e.key].status = true
                        progressNotification.open(taskStatus);
                        e.fetch().then((data) => {
                            callback(undefined, data)
                        });
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
                            id: orgViewData[0]?.organisationUnits?.[0]?.id, displayName: orgViewData[0]?.organisationUnits?.[0]?.displayName, level: orgViewData[0]?.organisationUnits?.[0]?.level
                        }
                    })

                    taskStatus.ORG.status = true;
                    progressNotification.open(taskStatus);

                    progressNotification.destroy(taskStatus, 1.5);

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
        instanceTarget, networkUtils, language, me,
        setGlobalOverlay,
        firstLoadApp,
        setFirstLoadApp,
    ] = useCoreMetaState(useShallow(state => ([
        state.instanceTarget, state.networkUtils, state.language, state.me,
        state.actions.setGlobalOverlay,

        state.firstLoadApp,
        state.actions.setFirstLoadApp,
    ])));

    const [corePicker, setCorePicker] = useCorePickerState(
        useShallow(state => ([
            state.corePicker,
            state.actions.setCorePicker,
        ])));

    useDefiningInstance();
    useNetwork();

    usePrefetchForReport({ loaded: firstLoadApp })
    const metadataAddition = useMetadataAddition()

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

