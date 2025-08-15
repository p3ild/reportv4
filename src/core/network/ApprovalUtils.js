import { getApprovalStateByPath } from "@core/stateManage/approvalState";
export const APPROVAL_TYPE = {
    ACCEPT: 'Chấp nhận',
    APPROVE: 'Phê duyệt',
}
export * from "@core/ui/approval/ButtonApproval";

class ApprovalUtils {
    init = function ({
        host = '../../',
        auth,
        headers
    }) {
        this.INIT_HOST = host;
        this.INIT_AUTH = auth;
        this.headers = headers
        this.approvalState = getApprovalStateByPath()
        return this;
    }

    getWfInfo = (wf) => {
        let api = `/api/dataApprovalWorkflows.json?filter=id:in:[${wfs}]&fields=id,name,dataApprovalLevels,dataSets[id,name]&paging=false`;
        return this._get({ api })
    }

    getDsInfo = ({ ds }) => {
        let api = `/api/dataSets.json?filter=id:in:[${ds.join(',')}]&fields=id,name,workflow,periodType&paging=false`;
        return this._get({ api }).then(e =>
            e.dataSets.map(e => {
                e.workflow = e?.workflow?.id
                return e;
            }).filter(e => e.workflow))
    }

    fetchApprove = ({ dsID, wf, period, orgID, isBulk = true }) => {
        let api = isBulk ? [
            `/api/dataApprovals/approvals?wf=${wf.join(',')}`
            , `pe=${period.join(',')}`
            , `ou=${orgID.join(',')}`
        ].join('&') : `/api/dataApprovals?ds=${dsID}&pe=${period}&ou=${orgID}`;
        return this._get({ api })
    }

    approve({ dsID, period, orgID, approvalType, payload, isBulk = true }) {
       
        let api = `/api/${approvalType == APPROVAL_TYPE.ACCEPT ? "dataAcceptances" : "dataApprovals"}?ds=${dsID}&pe=${period}&ou=${orgID}`;
        return this._post({ api })
    }

    unApprove({ dsID, period, orgID, approvalType }) {
        let api = `/api/${approvalType == APPROVAL_TYPE.ACCEPT ? "dataAcceptances" : "dataApprovals"}?ds=${dsID}&pe=${period}&ou=${orgID}`;
        return this._post({ api, method: 'DELETE' })
    }

    approvalBulk({ wf, pe, ou, approvalType }) {
        let bulk =
        {
            wf: Array.isArray(wf) ? wf : [wf],
            pe: Array.isArray(pe) ? pe : [pe],
            approvals: (Array.isArray(ou) ? ou : [ou]).map(e => ({
                ou: e
            }))
        };
        let api = `/api/33${approvalType == APPROVAL_TYPE.ACCEPT ? "/dataAcceptances/acceptances" : "/dataApprovals/approvals"}`
        return this._post({ api, data: bulk })
    }

    unApprovalBulk({ wf, pe, ou, approvalType }) {
        let bulk =
        {
            wf: Array.isArray(wf) ? wf : [wf],
            pe: Array.isArray(pe) ? pe : [pe],
            approvals: (Array.isArray(ou) ? ou : [ou]).map(e => ({
                ou: e
            }))
        };
        let api = `/api/33${approvalType == APPROVAL_TYPE.ACCEPT ? "/dataAcceptances/unacceptances" : "/dataApprovals/unapprovals"}`
        return this._post({ api, data: bulk })
    }


    //======================================== Helper function ========================================
    addGroupApproval = (props) => {
        ; (async () => {
            let { ds, wf, pe, org, key } = props;
            let dsInfo = await this.getDsInfo({ ds })
            wf = dsInfo.map(e => e.workflow);

            if (!Array.isArray(pe)) {
                pe = pe.split(';')
            }
            this.updateApprovalGroupByKey({
                key, data: {
                    reloaded: false
                }
            });

            let fetchApprovalData = await this.fetchApprove({
                wf,
                period: pe,
                orgID: org
            })

            let fetchNewState = this.addGroupApproval.bind(this, props);

            let approvalObj = {
                approvalData: fetchApprovalData,
                reloaded: true,
                fetchNewState,
                unApprovalAll: this.unApprovalAll.bind({
                    ...props,
                    updateApprovalGroupByKey: this.updateApprovalGroupByKey.bind(this),
                    unApprovalBulk: this.unApprovalBulk.bind(this),
                    dsInfo,
                    approvalData: fetchApprovalData,
                    fetchNewState
                }),
                approvalAll: this.approvalAll.bind({
                    ...props,
                    updateApprovalGroupByKey: this.updateApprovalGroupByKey.bind(this),
                    approvalBulk: this.approvalBulk.bind(this),
                    dsInfo,
                    approvalData: fetchApprovalData,
                    fetchNewState
                }),
            }
            this.updateApprovalGroupByKey({ key, data: approvalObj });
        })()
    }

    updateApprovalGroupByKey = function ({ key, data }) {
        let newApprovalData = this.approvalState.approvalData || {};
        newApprovalData[key] = data
        this.approvalState.actions.setApprovalData(newApprovalData);
    }

    unApprovalAll = async function (props) {
        let { fetchNewState, approvalData, dsInfo, key, updateApprovalGroupByKey } = this;
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
        let dataApproval = await this.unApprovalBulk({
            ...this,
            approvalType,
            ou: listApproval.map(e => e.ou),
            wf: listApproval.map(e => e.wf)
        })
        await fetchNewState()
    }

    approvalAll = async function (props) {
        let { fetchNewState, approvalData, dsInfo, key, updateApprovalGroupByKey } = this;
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
        let dataApproval = await this.approvalBulk({
            ...this,
            approvalType,
            ou: listApproval.map(e => e.ou),
            wf: listApproval.map(e => e.wf)
        })
        await fetchNewState()
    }

}

export default new ApprovalUtils();