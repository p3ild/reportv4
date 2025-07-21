import { CustomDataProvider, Provider } from '@dhis2/app-runtime'
import { HeaderBar } from '@dhis2/ui';

import { Affix } from 'antd';
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useCoreMetaState } from '../../stateManage/metadataState';
const appName = import.meta.env.VITE_APP_NAME

export function usePrepareDataHeader() {
    const [providerData, setProviderData] = useState(undefined);
    const [customProviderData, setCustomProviderData] = useState(undefined);

    const [
        networkUtils,
        version,
        me
    ] = useCoreMetaState(useShallow(state => [
        state.networkUtils,
        state.version,
        state.me,

    ]));

    useEffect(() => {
        if (networkUtils && me && version) {
            (async () => {
                let data = await networkUtils.getDataHeaderBar.call(networkUtils, {});

                setProviderData({
                    baseUrl: networkUtils.INIT_HOST,
                    // apiVersion: version.versionDhis,
                    // version: version.versionDhis
                    serverVersion: {
                        full: version?.versionDhis,
                    },
                    appName,
                    appVersion: {
                        full: version?.versionApp || '1.0.0',
                        major: 1,
                        minor: 1,
                        patch: 1,
                        tag: 'beta.4'
                    },
                    systemInfo: {
                        calendar: 'iso8601',
                        contextPath: networkUtils.INIT_HOST,
                        dateFormat: 'yyyy-mm-dd',
                        instanceBaseUrl: networkUtils.INIT_HOST,
                        version: version.versionDhis
                    }
                });
                setCustomProviderData({
                    'action::menu/getModules': {
                        modules: data?.menuModule.data.modules || data?.menuModule.data
                    },
                    me: {
                        authorities: me?.authorities || [
                            'ALL'
                        ],
                        // email: me?.email,
                        name: me?.name,
                        settings: {
                            keyUiLocale: 'vi'
                        }
                    },
                    'me/dashboard': {
                        unreadInterpretations: 0,
                        unreadMessageConversations: 0
                    },
                    'systemSettings/applicationTitle': {
                        applicationTitle: 'DHIS2'
                    },
                    'systemSettings/helpPageLink': {
                        helpPageLink: '//custom-help-page-link'
                    }
                })
            })()
        }

    }, [networkUtils, me, version]);



    return { providerData, customProviderData }
}

export function CustomHeaderBar({
    providerData,
    customProviderData }) {
    // const { providerData, customProviderData } = usePrepareDataHeader(metaData);

    return (
        <div>
            {
                true &&
                //dataHeaderBar?.menuModule &&
                <Provider config={providerData}>
                    <CustomDataProvider
                        data={customProviderData}>
                        <HeaderBar appName={appName}
                            style={{ marginBottom: '10px' }}
                        />
                    </CustomDataProvider>
                </Provider>}
        </div>
    );
}

export default () => {
    const { providerData, customProviderData } = usePrepareDataHeader()

    return <>
        <Affix offsetTop={0}
            style={{ background: 'white' }}
        >
            {
                providerData && customProviderData &&
                <CustomHeaderBar
                    providerData={providerData}
                    customProviderData={customProviderData}
                    style={{ background: 'white' }}
                />}
        </Affix>
    </>
}