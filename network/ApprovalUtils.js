import { APPROVAL_TYPE } from "../hooks/useApproval";

class ApprovalUtils {
    init = function ({
        host = '../../',
        auth,
        headers
    }) {
        this.INIT_HOST = host;
        this.INIT_AUTH = auth;
        this.headers = headers
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
        // if (isBulk) {
        //     api = '/api/33/dataApprovals/approvals'

        // }
        let api = `/api/${approvalType == APPROVAL_TYPE.ACCEPT ? "dataAcceptances" : "dataApprovals"}?ds=${dsID}&pe=${period}&ou=${orgID}`;
        return this._post({ api })
    }

    unApprove({ dsID, period, orgID, approvalType }) {
        let api = `/api/${approvalType == APPROVAL_TYPE.ACCEPT ? "dataAcceptances" : "dataApprovals"}?ds=${dsID}&pe=${period}&ou=${orgID}`;
        return this._post({ api, method: 'DELETE' })
    }

    approvalBulk({ wf, pe, ou, approvalType }) {
        let bulk =
        // {
        //     "wf": [
        //         "pBOMPrpg1QX", "lyLU2wR22tC"
        //     ],
        //     "pe": Array.isArray(period) ? period : [period],
        //     "approvals": [
        //         {
        //             "ou": "cDw53Ej8rju",
        //             "aoc": "ranftQIH5M9"
        //         },
        //         {
        //             "ou": "cDw53Ej8rju",
        //             "aoc": "fC3z1lcAW5x"
        //         }
        //     ]
        // }
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
        // {
        //     "wf": [
        //         "pBOMPrpg1QX", "lyLU2wR22tC"
        //     ],
        //     "pe": Array.isArray(period) ? period : [period],
        //     "approvals": [
        //         {
        //             "ou": "cDw53Ej8rju",
        //             "aoc": "ranftQIH5M9"
        //         },
        //         {
        //             "ou": "cDw53Ej8rju",
        //             "aoc": "fC3z1lcAW5x"
        //         }
        //     ]
        // }
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
}

export default new ApprovalUtils();