import { create } from 'zustand'
import { get } from 'lodash';
import { trans } from '@core/translation/i18n';

export const useApprovalState = create((set, get) => ({
    supportApproval: false,
    approvalData: {},

    // UI settings
    showIcon: false,
    showButton: true,

    actions: {
        setSupportApproval: (supportApproval) => {
            set(state => ({
                supportApproval
            }))
        },
        setShowIcon: (showIcon) => {
            set(state => ({
                showIcon
            }))
        },
        setShowButton: (showButton) => {
            set(state => ({
                showButton
            }))
        },
        setApprovalData: async (approvalData) => {
            set(state => {
                let newObj = {
                    ...state.approvalData,
                    ...approvalData
                };
                return {
                    supportApproval: true,
                    approvalData: newObj
                }
            })
        },
        async reloadApprovalByKey(key) {
            let fetchNewState = get().approvalData?.[key]?.fetchNewState;
            fetchNewState && await fetchNewState();
        },
        reset() {
            set(state => ({
                approvalData: {},
                supportApproval: false
            }))
        }
    }
}))

export const getApprovalStateByPath = (path) => {
    let approvalState = useApprovalState.getState();
    if (!path) return approvalState;
    let data = get(
        approvalState,
        path
    )
    return data
} 