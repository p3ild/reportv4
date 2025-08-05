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
        },
        orgTreeData: undefined,
        orgPickerConfig: undefined,
        customPicker: undefined,
        allowPeriodTypes: [],

        actions: {
            setOrgTreeData: (orgTreeData) => {

                set(state => ({
                    orgTreeData,
                    corePicker: {
                        ...state.corePicker,
                        orgSelected: {
                            ...state.corePicker.orgSelected,
                            support: undefined
                        },
                    }
                }));
            },
            openCorePicker(bool = true) {
                getCoreMetaStateByPath("actions.setGlobalOverlay")({
                    isOpen: bool,
                    closeable: true,
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
                        ...corePicker,
                        rePick: Math.random()
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