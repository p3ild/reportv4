import { create } from 'zustand'
import { get } from 'lodash';
import { getCoreMetaStateByPath } from './metadataState';
import { trans } from '@core/translation/i18n';

export const useCorePickerState = create((set, get) => (
    {
        corePicker: {
            periodSelected: undefined,
            orgSelected: undefined,
            dataPeriodByType: {},
            autoLoadReport: false,
        },
        orgFlatten: {},
        orgTreeData: undefined,
        orgPickerConfig: {},
        customPicker: undefined,
        allowPeriodTypes: [],
        actions: {
            setOrgTreeData: (orgTreeData, orgFlatMap) => {

                set(state => ({
                    orgTreeData,
                    orgFlatMap,
                    corePicker: {
                        ...state.corePicker,
                        orgSelected: {
                            ...state.corePicker.orgSelected,
                            support: !orgTreeData ? undefined : state.corePicker.orgSelected?.support
                        },
                    }
                }));
            },
            openCorePicker(bool = true) {
                getCoreMetaStateByPath("actions.setGlobalOverlay")({
                    isOpen: bool,
                    closeable: true,
                    hiddenMode: {
                        isEnabled: false,
                    },
                    type: {
                        key: 'corePicker',
                        title: trans('common:corePicker.title'),
                        // content: <CorePicker />
                    }
                })
            },
            setCorePicker: async (corePicker) => {
                set(state => {
                    let newCorePicker = {
                        ...state.corePicker,
                        ...corePicker
                    };
                    return {
                        corePicker: newCorePicker
                    }
                })
            },

            setOrgPickerConfig: async (orgPickerConfig) => {
                set(state => ({ orgPickerConfig }));
            },

            setCustomPicker: async (customPicker) => {
                set(state => ({ customPicker }));
            },
            setAllowPeriodTypes: (allowPeriodTypes) => {
                set(state => ({ allowPeriodTypes }));
            },
        }
    }
));

export const getPickerStateByPath = (path) => {
    let corePickerState = useCorePickerState.getState();
    return get(
        corePickerState,
        path
    )
} 