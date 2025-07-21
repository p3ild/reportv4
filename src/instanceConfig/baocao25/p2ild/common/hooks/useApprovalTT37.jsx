import { useCustomState, useSelectionStore } from "@/state";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useApproval, useMultipleDataSetApproval } from '../../../../hooks';

export const usePrepareApproval = () => {

    const { reload } = useSelectionStore(useShallow((state) => ({
        reload: state.reload
    })));
    const [listOrgApprove, setListOrgApprove] = useState([])

    useEffect(() => {
        setListOrgApprove([]);
    }, [reload])

    const [dataSets, approvalWorkflows] = useCustomState(useShallow((state) => ([state.dataSets, state.approvalWorkflows])));
    let approveObject = useMultipleDataSetApproval(listOrgApprove)
    const setCustomState = useCustomState(useShallow((state) => state.actions.setState));

    useEffect(() => {
        setCustomState("approveObject", approveObject);
    }, [approvalWorkflows, dataSets, listOrgApprove, JSON.stringify(approveObject)]);

    return {
        setListOrgApprove
    }
}