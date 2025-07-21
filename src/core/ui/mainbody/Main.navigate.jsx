import { Button } from "@dhis2/ui";
import { memo, useMemo } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router";
import { BrowserRouter } from "react-router-dom";

import { Link } from "react-router-dom";
import { Home } from "../../../page/home";
import { Report } from "../../../page/report";
import { useCoreMetaState } from "../../stateManage/metadataState";
import { useShallow } from "zustand/react/shallow";

export const NavigateMainComponenet = ({
    targetInstanceConfig,
    metadata_utils,
    orgTreeByUser
}) => {
    const navigate = useNavigate()
    const [
        me
    ] = useCoreMetaState(useShallow(state => [
        state.me
    ]))
    const ReportMemo = useMemo(() => {
        return <Report
            {...{
                targetInstanceConfig,
                metadata_utils,
                me,
                orgTreeByUser
            }}
        // targetInstanceConfig={targetInstanceConfig}
        // metadata_utils={metadata_utils}
        // meData={meData}
        // orgTreeByUser={orgTreeByUser}
        />
    }, [me?.id])
    return <>
        <Routes>
            <Route
                path="/"
                element={<Navigate to="/home" replace />}
            />
            <Route path="/home" element={<HomeMemo
                {...{
                    targetInstanceConfig,
                    metadata_utils,
                }}
            />} />
            <Route path="/report" element={
                ReportMemo
            }
            />
        </Routes>
    </>
}

const HomeMemo = memo(({
    targetInstanceConfig,
    metadata_utils,
    meData,
}) => {

    return <Home {...{
        targetInstanceConfig,
        metadata_utils,
        meData,
    }} />

}, (pre, next) => {
    return true
})