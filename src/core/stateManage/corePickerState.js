import { create } from 'zustand'
import { get } from 'lodash';

export const useCorePickerState = create((set, get) => (
    {
        corePicker: {
            periodSelected: {},
            orgSelected: undefined,
            dataPeriodByType: {},
        },

        orgPickerConfig: undefined,
        customPicker: undefined,
        allowPeriodTypes: [],

        actions: {
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