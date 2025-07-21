import { useCoreMetaState } from "@core/stateManage/metadataState";
import { useEffect } from "react"

import { useShallow } from "zustand/react/shallow";
export * from "../ui/utils/ButtonApproval";

export const useApproval = ({ }) => {

    let [
        approvalData,
        networkUtils,
        setApprovalData
    ] = useCoreMetaState(useShallow(state => ([
        state.approvalData,
        state.networkUtils,
        state.actions.setApprovalData,
    ])));
    const { fetchApprove, getDsInfo, approve, unApprove } = networkUtils.ApprovalUtils;
    // const [dsInfo, setDsInfo] = useState();

    useEffect(
        () => {
            const dsID_test = ['MqtODSonraB'];
            const periodTest = ['2024S1', '2024S2'];
            const orgTest = ['iNZewtduXP4', 'NYkCSY7Hc2z', 'INBk31M3A2d', 'EX9h7KQhx2O', 'UzPiqJ3GbIP', 'fVLwK7QHXCP', 'Gusdn0YNwbG', 'apH2t1vMECK', 'iH3aSxgjCt2', 'oK2SeJ3SIrv'];
            // approval()
            // addGroupApproval({
            //     key: "TEST",
            //     ds: dsID_test,
            //     pe: periodTest,
            //     org: orgTest
            // })

        },
        []
    )

    const addGroupApproval = (props) => {
        ; (async () => {
            let { ds, wf, pe, org, key } = props;
            let dsInfo = await getDsInfo({ ds })
            wf = dsInfo.map(e => e.workflow);

            if (!Array.isArray(pe)) {
                pe = pe.split(';')
            }
            updateApprovalGroupByKey({
                key, data: {
                    reloaded: false
                }
            });

            let fetchApprovalData = await fetchApprove({
                wf,
                period: pe,
                orgID: org
            })

            let reloadFnc = addGroupApproval.bind(this, props);

            let approvalObj = {
                approvalData: fetchApprovalData,
                reloaded: true,
                reloadFnc,
                unApprovalAll: unApprovalAll.bind({
                    ...props,
                    dsInfo,
                    approvalData: fetchApprovalData,
                    reloadFnc
                }),
                approvalAll: approvalAll.bind({
                    ...props,
                    dsInfo,
                    approvalData: fetchApprovalData,
                    reloadFnc
                }),
            }
            updateApprovalGroupByKey({ key, data: approvalObj });
        })()
    }

    const updateApprovalGroupByKey = function ({ key, data }) {
        approvalData = approvalData || {};
        approvalData[key] = data
        setApprovalData(approvalData);
    }

    const unApprovalAll = async function (props) {
        let { reloadFnc, approvalData, dsInfo, key } = this;
        let { approvalType } = props;
        updateApprovalGroupByKey(
            {
                key,
                data: {
                    reloaded: false,
                }
            })

        let listApproval = approvalData.filter(e =>
            (
                (//For APPROVE DATA
                    approvalType == APPROVAL_TYPE.APPROVE && e.state == 'APPROVED_HERE')
            )
            ||
            (//For ACCEPT DATA
                approvalType == APPROVAL_TYPE.ACCEPT && e.state == "ACCEPTED_HERE"
            )
        ).map(e => ({
            ou: e.ou,
            wf: e.wf
        }));
        let dataApproval = await networkUtils.ApprovalUtils.unApprovalBulk({
            ...this,
            approvalType,
            ou: listApproval.map(e => e.ou),
            wf: listApproval.map(e => e.wf)
        })
        await reloadFnc()
    }

    const approvalAll = async function (props) {
        let { reloadFnc, approvalData, dsInfo, key } = this;
        let { approvalType } = props;
        updateApprovalGroupByKey(
            {
                key: key,
                data: {
                    reloaded: false,
                }
            });


        let listApproval = approvalData.filter(e =>
            (
                (//For APPROVE DATA
                    approvalType == APPROVAL_TYPE.APPROVE && e.state == 'UNAPPROVED_READY')
            )
            ||
            (//For ACCEPT DATA
                approvalType == APPROVAL_TYPE.ACCEPT && e.state == "APPROVED_HERE"
            )
        ).map(e => ({
            ou: e.ou,
            wf: e.wf
        }));
        let dataApproval = await networkUtils.ApprovalUtils.approvalBulk({
            ...this,
            approvalType,
            ou: listApproval.map(e => e.ou),
            wf: listApproval.map(e => e.wf)
        })
        await reloadFnc()
    }

    return {
        addGroupApproval
    }
}