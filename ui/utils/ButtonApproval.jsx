import { useShallow } from "zustand/react/shallow";
import { useCoreMetaState } from "../../stateManage/metadataState";
import { Flex, notification, Spin } from "antd";
import { faCheck, faXmark, faCheckDouble, faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { add, groupBy } from "lodash";
import { useEffect, useState } from "react"

export const APPROVAL_TYPE = {
    ACCEPT: 'Chấp nhận',
    APPROVE: 'Phê duyệt',
}

export const APPROVAL_VISIBLE = {
    CHILD: 'CHILD',
    PARENT: 'PARENT',
    BOTH: "BOTH"
}


export const ButtonApproval = ({
    dsID, period, orgID,
    approvalType = APPROVAL_TYPE.APPROVE,
    isApproveAll = false,
    customLabel,
    approvalKey
}) => {

    const [
        networkUtils,
        me
    ] = useCoreMetaState(useShallow(state => ([
        state.networkUtils,
        state.me,
    ])));

    let [visibleButton, setVisibleButton] = useState(false);

    useEffect(
        () => {
            if (!me) return;
            switch (true) {
                case approvalType == APPROVAL_TYPE.APPROVE && !me?.approvalAuthorization?.canApprove:
                case approvalType == APPROVAL_TYPE.ACCEPT && !me?.approvalAuthorization?.canAccept:
                    setVisibleButton(false);
                    break;
                default: {
                    setVisibleButton(true)
                }

            }
       
        },
        [me]
    )

    const [approvalByKey] = useCoreMetaState(state => ([
        state.approvalData?.[approvalKey],
    ]));
    let errors = [];
    let isApproved = true;

    let APPROVAL_MAPPING_TT37 = {
        APPROVE: {
            key: "APPROVE",
            label: isApproveAll ? `${approvalType} ${customLabel || "tất cả"}` : approvalType,
            style: "btn-success",
            icon: isApproveAll ? faCheckDouble : faCheck
        },
        UN_APPROVE: {
            key: "UN_APPROVE",
            label: isApproveAll ? `Bỏ ${approvalType} ${customLabel || "tất cả"}` : `Bỏ ${approvalType}`,
            style: "btn-danger",
            icon: faXmark
        },
        NOT_AVAILABLE: {
            key: "NOT_AVAILABLE",
            label: "Không khả dụng",
            style: "btn-unavailable",
            icon: faBan
        },
    };

    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(APPROVAL_MAPPING_TT37.NOT_AVAILABLE);


    const { fetchApprove, approve, unApprove } = networkUtils.ApprovalUtils
    useEffect(e => {
        setLoading(true)
        if (!networkUtils || !dsID || !period || !orgID || !approvalByKey) return

        if (approvalByKey.reloaded) {
            getCurrentStatus();
        }
    }, [networkUtils, JSON.stringify(approvalByKey)]);

    const getCurrentStatus = async () => {
        setLoading(true)
        isApproved = true;
        let checkError;
        if (isApproveAll) {
            let groupByState = Object.entries(groupBy(approvalByKey?.approvalData, 'state')).filter(e => e[1].length != 0);

            let err = groupByState.some(([stateCheck, arrByState]) => {
                checkError = findError({ state: stateCheck });
                errors = checkError.errors;
                if (errors.length != 0) return true;
            });

            if (!err) {

                if (groupByState.every(([stateCheck, arrByState]) =>
                    (
                        (//For APPROVE DATA
                            approvalType == APPROVAL_TYPE.APPROVE && ["APPROVED_HERE", "APPROVED_ELSEWHERE", "ACCEPTED_HERE"].includes(stateCheck))
                    )
                    ||
                    (//For ACCEPT DATA
                        approvalType == APPROVAL_TYPE.ACCEPT && ["ACCEPTED_HERE"].includes(stateCheck)
                    )
                )) {
                    isApproved = true;
                } else {
                    isApproved = false;
                }
            }
        } else {
            let { state } = approvalByKey?.approvalData?.find(e => e.ou == orgID && e.pe == period) || {}
            if (!state) {
                let tmpStatus = APPROVAL_MAPPING_TT37.NOT_AVAILABLE;
                tmpStatus.label = errors[0]
                setStatus(tmpStatus)
                setLoading(false)
                return;
            }
            checkError = findError({ state });
            errors = checkError.errors
            isApproved = checkError.isApproved;
        }




        let allowApproval = errors.length == 0;
        if (!allowApproval) {
            let tmpStatus = APPROVAL_MAPPING_TT37.NOT_AVAILABLE;
            tmpStatus.label = errors[0]
            setStatus(tmpStatus)
            setLoading(false)
            return;
        }
        if (
            isApproved
        ) {
            setStatus(APPROVAL_MAPPING_TT37.UN_APPROVE)
        } else {
            setStatus(APPROVAL_MAPPING_TT37.APPROVE)
        }
        setLoading(false)
    }

    const findError = ({ state }) => {
        let isApproved = true;
        let errors = []
        if (approvalType == APPROVAL_TYPE.ACCEPT) {
            switch (true) {
                case ["APPROVED_HERE"].includes(state):
                    isApproved = false
                    break;
                case ['ACCEPTED_HERE'].includes(state):
                    isApproved = true
                    break;
                case ["UNAPPROVED_READY"].includes(state):
                    let message = "Tuyến dưới chưa phê duyệt.";
                    isApproved = false
                    errors.push(message);
                    break;
                default:
                    isApproved = false
                    break
            }
        } else {
            switch (true) {
                case ["APPROVED_HERE", "APPROVED_ELSEWHERE"].includes(state):
                    isApproved = true
                    break;
                case (["UNAPPROVED_WAITING"].includes(state)): {
                    // let message = "Vui lòng phê duyệt ở tuyến dưới."; 
                    let message = "Tuyến dưới chưa phê duyệt.";
                    errors.push(message);
                }
                case (["ACCEPTED_HERE"].includes(state)): {
                    let message = "Đã được chấp nhận."; errors.push(message);
                }
                case (["APPROVED_ABOVE"].includes(state)): {
                    let message = "Đã được chấp nhận ở tuyến trên."; errors.push(message);
                }
                case (["UNAPPROVED_ABOVE"].includes(state)): {
                    let message = "Chỉ hỗ trợ duyệt ở tuyến cao hơn."; errors.push(message); break;
                }

                default:
                    isApproved = false
                    break
            }
        }

        if (isApproveAll) errors = errors.map(e => `Không thể ${`${approvalType} ${customLabel || "tất cả"}`}`)

        return {
            isApproved,
            errors
        }
    }

    const onClickApprove = async function () {

        try {

            if (event.shiftKey) {
                approvalByKey.reloadFnc();
                // await getCurrentStatus();
                setLoading(false)
                return
            }

            if (!approvalByKey.reloaded) {
                notification.warning({ message: 'Chưa sẵn sàng' })
                return
            }
            setLoading(true)
            switch (true) {
                case APPROVAL_MAPPING_TT37.NOT_AVAILABLE.key == status.key:
                    return;
                case APPROVAL_MAPPING_TT37.UN_APPROVE.key == status.key:
                    setStatus(APPROVAL_MAPPING_TT37.APPROVE);
                    if (isApproveAll) approvalByKey.unApprovalAll({ approvalType });
                    else {
                        await networkUtils.ApprovalUtils.unApprove({ dsID, period, orgID, approvalType })
                        await approvalByKey.reloadFnc();
                    }
                    break;
                default:
                    setStatus(APPROVAL_MAPPING_TT37.UN_APPROVE)
                    if (isApproveAll) approvalByKey.approvalAll({ approvalType });
                    else {
                        await networkUtils.ApprovalUtils.approve({ dsID, period, orgID, approvalType })
                        await approvalByKey.reloadFnc();
                    }

            }
        } catch (e) {
            setLoading(false)
        } finally {
        }


        // await getCurrentStatus();
        // setLoading(false)
    }


    return !visibleButton
        ? <div className="no-print" justify={"center"} />
        : <Flex className="no-print" justify={"center"}>
            <button className={`space-x-2 ${status.style}`} onClick={function () {
                onClickApprove()
            }}>
                <Flex gap={5} align={"center"}>
                    {loading
                        ? <Spin />
                        :
                        <FontAwesomeIcon icon={status.icon} />}
                    {status.label}
                </Flex>

            </button>
        </Flex>
}