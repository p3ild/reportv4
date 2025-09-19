import { useShallow } from "zustand/react/shallow";
import { useEffect, useState } from "react";

import { groupBy } from "lodash";
import { Checkbox, notification, Spin, Tooltip } from "antd";
import { upperFirst } from "@core/utils/stringutils";

//===== STATE ======
import { APPROVAL_TYPE } from "@core/network/ApprovalUtils";
import { useApprovalState } from "@core/stateManage/approvalState";
import { useCoreMetaState } from "@core/stateManage/metadataState";

//===== ICONS ======
import { BiSolidError } from "react-icons/bi";
import { FaArrowDownLong, FaArrowUpLong, FaCheck } from "react-icons/fa6";
import { IoCheckmarkSharp } from "react-icons/io5";

import { RiCheckDoubleLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { MdRemoveDone } from "react-icons/md";
import { GrDocumentMissing } from "react-icons/gr";



const iconStyle = "w-4 h-4"

export const APPROVAL_ROW_TYPE = {
    CHILD: 'CHILD',
    PARENT: 'PARENT',
    BOTH: "BOTH"
}


export const ButtonApproval = ({
    dsID, period, orgID,
    approvalType = APPROVAL_TYPE.APPROVE,
    isApproveAll = false,
    customLabel,
    approvalKey,
    onPostClick,
    title,
}) => {

    const [
        networkUtils,
        me
    ] = useCoreMetaState(useShallow(state => ([
        state.networkUtils,
        state.me,
    ])));

    useEffect(
        () => {
            // if (!me) return;
            // switch (true) {
            //     case approvalType == APPROVAL_TYPE.APPROVE && !me?.approvalAuthorization?.canApprove:
            //     case approvalType == APPROVAL_TYPE.ACCEPT && !me?.approvalAuthorization?.canAccept:
            //         setVisibleButton(false);
            //         break;
            //     default: {
            //         setVisibleButton(true)
            //     }
            // }
        },
        [me]
    )

    let [
        supportApproval,
        uiSettings,
        activeApprovalAllKey,
        setActiveApprovalAllKey
    ] = useApprovalState(state => [
        state.supportApproval,
        state.uiSettings,
        state.activeApprovalAllKey,
        state.actions.setActiveApprovalAllKey
    ])

    let { showIcon, showButton } = uiSettings
    const [approvalByKey] = useApprovalState(state => ([
        state.approvalData?.[approvalKey],
    ]));

    let errors = [];
    let isApproved = true;

    let APPROVAL_MAPPING = {
        APPROVE: {
            key: "APPROVE",
            label: upperFirst(isApproveAll ? `${approvalType} ${customLabel || "tất cả"}` : approvalType),
            style: "btn-success",
            description: 'Khi phê duyệt biểu nhập sẽ bị khóa và đơn vị không thể sửa số liệu',
            icon: isApproveAll ? <RiCheckDoubleLine className={iconStyle} /> : <IoCheckmarkSharp className={iconStyle} />
        },
        UN_APPROVE: {
            key: "UN_APPROVE",
            label: upperFirst(isApproveAll ? `Bỏ ${approvalType} ${customLabel || "tất cả"}` : `Bỏ ${approvalType}`),
            style: "btn-danger",
            description: 'Khi bỏ duyệt biểu nhập sẽ được mở và đơn vị có thể sửa số liệu.',
            icon: isApproveAll ? <MdRemoveDone className={iconStyle} /> : <IoClose className={iconStyle} />
        },
        NOT_AVAILABLE: {
            key: "NOT_AVAILABLE",
            label: upperFirst("Không thể " + approvalType),
            description: "Liên hệ với quản trị viên để được hỗ trợ.",
            style: "btn-unavailable",
            icon: <BiSolidError className={iconStyle} />
        }
    };

    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(APPROVAL_MAPPING.NOT_AVAILABLE);


    useEffect(e => {
        setLoading(true)
        if (!networkUtils || !dsID || !period || !orgID || !approvalByKey) return

        if (approvalByKey.reloaded) {
            getCurrentStatus();
        }
    }, [networkUtils, JSON.stringify(approvalByKey)]);

    useEffect(() => {
        console.log('supportApproval', supportApproval)
    }, [supportApproval])


    const getCurrentStatus = async () => {
        setLoading(true)
        isApproved = true;
        let checkError;
        if (isApproveAll) {
            let groupByState = Object.entries(groupBy(approvalByKey?.approvalData, 'state')).filter(e => e[1].length != 0);

            let err = groupByState.some(([stateCheck, arrByState]) => {
                checkError = classifyError({ state: stateCheck });
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
            checkError = classifyError({ state });
            errors = checkError.errors
            isApproved = checkError.isApproved;
            if (!state) {
                let tmpStatus = APPROVAL_MAPPING.NOT_AVAILABLE;

                tmpStatus = {
                    ...tmpStatus,
                    ...(errors[0] || {})
                }

                setStatus(tmpStatus)
                setLoading(false)
                return;
            }
        }


        let allowApproval = errors.length == 0;
        if (!allowApproval) {
            let tmpStatus = APPROVAL_MAPPING.NOT_AVAILABLE;
            tmpStatus = {
                ...tmpStatus,
                ...(errors[0] || {})
            }

            setStatus(tmpStatus)
            setLoading(false)
            return;
        }
        if (
            isApproved
        ) {
            setStatus(APPROVAL_MAPPING.UN_APPROVE)
        } else {
            setStatus(APPROVAL_MAPPING.APPROVE)
        }
        setLoading(false)
    }

    const classifyError = ({ state }) => {
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
                    let message = "Cấp xã chưa duyệt";
                    isApproved = false
                    errors.push({ message, icon: <></> });
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
                    errors.push({
                        label: "Cấp xã chưa duyệt",
                        description: "Yêu cầu cấp xã phê duyệt trước khi duyệt cấp tỉnh.",
                        additionalIcon: <FaArrowDownLong />
                    });
                }
                case (["ACCEPTED_HERE"].includes(state)): {
                    errors.push({
                        label: "Đã được duyệt.",
                        additionalIcon: <></>
                    });
                }
                case (["APPROVED_ABOVE"].includes(state)): {
                    errors.push({
                        label: "Cấp tỉnh đã duyệt",
                        description: "Nếu cần sửa số liệu, liên hệ cấp tỉnh để bỏ duyệt.",
                        additionalIcon: <FaArrowUpLong />
                    });
                }
                case (["UNAPPROVED_ABOVE"].includes(state)): {
                    errors.push({
                        label: "Chỉ hỗ trợ duyệt ở tuyến cao hơn.",
                        additionalIcon: <></>
                    });
                }

                case ["undefined", undefined].includes(state): {
                    isApproved = false
                    errors.push({
                        label: "Đơn vị chưa được phân quyền nhập biểu",
                        description: "Không thể phê duyệt do đơn vị chưa được phân quyền nhập biểu này. Liên hệ quản trị viên để kiểm tra.",
                        icon: <GrDocumentMissing />
                    });
                    break;

                }

                default:
                    isApproved = false
                    break
            }
        }

        if (isApproveAll) errors = errors.map(e => (
            {
                style: "btn-unavailable",
                ...e,
                label: `Không thể ${`${approvalType} ${customLabel || "tất cả"}`}`,
                description: e.label + " " + e.description,

            }
        ))

        return {
            isApproved,
            errors
        }
    }

    const onClickDebug = async (event) => {
        if (event.shiftKey) {
            approvalByKey.fetchNewState();
            await getCurrentStatus();
            setLoading(false)
            return
        }
    }

    const onClickApprove = async function () {

        try {
            onClickDebug(event)
            if (event.shiftKey) {
                approvalByKey.fetchNewState();
                await getCurrentStatus();
                setLoading(false)
                return
            }

            if (loading) return;

            await getCurrentStatus();
            if (!approvalByKey.reloaded) {
                notification.warning({ message: 'Chưa sẵn sàng' })
                return
            }
            setLoading(true)
            switch (true) {
                case APPROVAL_MAPPING.NOT_AVAILABLE.key == status.key:
                    setLoading(false)
                    return;
                case APPROVAL_MAPPING.UN_APPROVE.key == status.key:
                    setStatus(APPROVAL_MAPPING.APPROVE);
                    if (isApproveAll) approvalByKey.unApprovalAll({ approvalType });
                    else {
                        await networkUtils.ApprovalUtils.unApprove({ dsID, period, orgID, approvalType })
                        await approvalByKey.fetchNewState();
                    }
                    break;
                default:
                    setStatus(APPROVAL_MAPPING.UN_APPROVE)
                    if (isApproveAll) approvalByKey.approvalAll({ approvalType });
                    else {
                        await networkUtils.ApprovalUtils.approve({ dsID, period, orgID, approvalType })
                        await approvalByKey.fetchNewState();
                    }
            }
            onPostClick?.();

        } catch (e) {
            setLoading(false)
        }
    }


    let hiddenButton =
        //User role
        (
            !(me?.approvalAuthorization?.canAccept && approvalType == APPROVAL_TYPE.ACCEPT)
            || !(me?.approvalAuthorization?.canApprove && approvalType == APPROVAL_TYPE.APPROVE)
        )

        //UI settings
        && (!showButton || !supportApproval)
        ;


    let isHoverToAll = activeApprovalAllKey?.includes(approvalKey);
    return <div>
        {
            <div className={!hiddenButton ? 'text-transparent w-[0px] h-[0px]' : ''}>
                {title}
            </div>
        }
        <div className={[
            "no-print flex justify-center items-center",
            hiddenButton ? "hidden" : "",
            showIcon ? "w-[60px]" : "w-[100px]"
        ].join(' ')
        }>
            {<div className={`relative w-full cursor-pointer p-1 ${status.style}`}
                onClick={onClickApprove}>
                <div className={"absolute top-0 left-0 rounded-lg w-[100%] h-[100%] flex items-center justify-center bg-white/50 backdrop-blur-[1px] " + (loading ? "" : "hidden")}>
                    <Tooltip title="Đang xử lý">
                        <Spin />
                    </Tooltip>
                </div>
                <div
                    className={`flex gap-1 items-center p-0 px-1`}
                    onMouseEnter={() => isApproveAll && status.key != APPROVAL_MAPPING.NOT_AVAILABLE.key && setActiveApprovalAllKey([approvalKey])}
                    onMouseLeave={() => isApproveAll && status.key != APPROVAL_MAPPING.NOT_AVAILABLE.key && setActiveApprovalAllKey(undefined)}
                >
                    <Tooltip title={
                        <p className="flex flex-col p-1 tracking-tight text-xs">
                            <span className="text-base font-bold justify-center">Lưu ý</span>
                            <span className=" font-semibold text-xs justify-center mb-4">{upperFirst(status.label)}</span>
                            <span className=" text-xs justify-center">{(status.description)}</span>
                        </p>
                    }>
                        <div className={"flex flex-col w-full items-center justify-center"} >
                            <div className="font-bold text-md">{title}</div>
                            <Divider className={(!title) ? "hidden" : ""} />
                            <p className={["whitespace-break-spaces tracking-tight text-xs flex flex-row gap-2 items-center", ((!showIcon) ? "" : "hidden"), isApproveAll ? 'font-semibold' : ''].join(' ')}>
                                <Checkbox className={isHoverToAll ? "" : "hidden"} checked={isHoverToAll} />
                                {upperFirst(status.label)}
                            </p>
                            <div className={["flex flex-row w-full items-center justify-center my-1", (!showIcon ? "hidden" : "")].join(' ')}>
                                {status.icon}
                                {status.additionalIcon}
                            </div>
                        </div>
                    </Tooltip>
                </div>
            </div>
            }
        </div>

    </div >
}

function Divider({ className }) {
    return <div className={"flex flex-row w-[100%] h-[1px] mb-1 bg-white items-center justify-center " + className} />
}