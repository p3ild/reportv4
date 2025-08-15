import { APPROVAL_ROW_TYPE } from "@core/network/ApprovalUtils";

export function getApprovalConfig(props) {
    let allowApproval = props?.periodSelected?.type == 'month'
    let rs = allowApproval
        ? {
            approvalConfig: {
                ds: [props.ds],
                pe: props.period,
                approvalKey: props.approvalKey,
                approvalRowType: APPROVAL_ROW_TYPE.BOTH,
            }
        }
        : {}
    return rs;
}