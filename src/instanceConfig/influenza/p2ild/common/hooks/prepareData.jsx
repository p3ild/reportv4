import { useCorePickerState } from "@core/stateManage/corePickerState";
import { useCoreMetaState } from "@core/stateManage/metadataState";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";


export const usePrepareData = ({ }) => {
    const [loaded, setLoaded] = useState(false);
    const [orgSelected, setOrgSelected] = useState(false);
    const [
        instanceTarget,
        setGlobalOverlay,
    ] = useCoreMetaState(useShallow(state => [
        state.instanceTarget,
        state.actions.setGlobalOverlay,
    ]));

    const [
        corePicker,
        setAllowPeriodTypes
    ] = useCorePickerState(
        useShallow(state => ([
            state.corePicker,
            state.actions.setAllowPeriodTypes
        ])));



    useEffect(() => {
        setLoaded(false);
        if (!corePicker.pickCompleted) return;
        (async () => {
            if (!corePicker.pickCompleted) return;
            setGlobalOverlay({
                isOpen: true
            })
            let orgTarget = corePicker?.orgSelected
            orgTarget.displayNameByPath = ([3, 4].includes(orgTarget.level)
                ? orgTarget.ancestors?.filter(e => e.level > 1).map(e => e.name).join(' - ') + " - " + orgTarget.displayName
                : orgTarget.displayName)?.toUpperCase()
            orgTarget.orgType = (instanceTarget.classifyingOrgSelected)(orgTarget);
            setOrgSelected(orgTarget);
            setLoaded(Math.random());
        })()
    }, [corePicker.pickCompleted])
    return {
        orgSelected,
        period: corePicker?.periodSelected,
        loaded,
        corePicker,
        setGlobalOverlay,
        setAllowPeriodTypes
    }
}