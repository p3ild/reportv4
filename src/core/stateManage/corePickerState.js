import { create } from 'zustand'
import { get } from 'lodash';
import { getCoreMetaStateByPath } from './metadataState';
import { trans } from '@core/translation/i18n';
import { SECTIONS } from '@core/ui/picker/corePicker';
export const useCorePickerState = create((set, get) => (
    {
        corePicker: {
            periodSelected: undefined,
            orgSelected: undefined,
            dataPeriodByType: {},
            autoLoadReport: false,
            sectionsActive: undefined,
        },
        orgFlatMap: {},
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
            setSectionsActive: (sectionsActive) => {
                let targetSections = sectionsActive ? [...sectionsActive, SECTIONS.CONFIRMATION] : Object.values(SECTIONS);
                set(state => ({ corePicker: { ...state.corePicker, sectionsActive: targetSections } }))
            },
            openCorePicker(bool = true, sectionsActive) {
                get().actions.setSectionsActive(sectionsActive)
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