import _, { cloneDeep, flatten, groupBy, intersection, uniq } from "lodash";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

export const APPROVAL_TYPE = {
  ACCEPT: 'Chấp nhận',
  APPROVE: 'Phê duyệt',
}


export const ApproveButton = ({
  approvalArray,
  approvalType = APPROVAL_TYPE.APPROVE,//Default TYPE
  customLabel,
  isApproveAll
}) => {
  let APPROVAL_MAPPING_TT37 = {
    APPROVE: {
      key: "APPROVE",
      label: isApproveAll ? `${approvalType} ${customLabel || "tất cả"}` : approvalType,
      color: "success",
      icon: isApproveAll ? faCheckDouble : faCheck
    },
    UN_APPROVE: {
      key: "UN_APPROVE",
      label: isApproveAll ? `Bỏ ${approvalType} ${customLabel || "tất cả"}` : `Bỏ ${approvalType}`,
      color: "danger",
      icon: faXmark
    },
    NOT_AVAILABLE: {
      key: "NOT_AVAILABLE",
      label: "Không khả dụng",
      color: "default",
      icon: faBan
    },

  };
  const { ready, allApproval, approve, unapprove, load } = useCustomState(useShallow((state) => state.approveObject || {}));
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(APPROVAL_MAPPING_TT37.NOT_AVAILABLE);
  let requestApprovalArray = cloneDeep(approvalArray)

  /**
         * DOCS: https://paste.ee/p/WhiCg
         */
  let errors = [];
  let isApproved = true;

  const foundErrorsEachApproval = (requestApproval, allApprovalByWf) => {
    let { orgUnits, wf } = requestApproval;
    let orgApprovalPulled = allApprovalByWf[wf];
    let orgDataApproval = orgApprovalPulled?.filter(e => orgUnits.includes(e.ou)) || [];

    //Check can approve
    if (
      !orgDataApproval.every(x => {
        return ["APPROVED_HERE", "APPROVED_ELSEWHERE"].includes(x.state)
      })
      // || orgApprovalPulled.length != requestApproval.orgUnits.length
    ) isApproved = false;

    if (!orgApprovalPulled) return errors.push({ message: "Vui lòng phê duyệt ở tuyến dưới." })
    //Found errors
    cloneDeep(orgDataApproval)
      .forEach(x => {
        if (["UNAPPROVED_WAITING"].includes(x.state)) { x.message = "Vui lòng phê duyệt ở tuyến dưới."; errors.push(x); }
        if (["APPROVED_ABOVE"].includes(x.state)) { x.message = "Đã được chấp nhận ở tuyến trên."; errors.push(x); }
        if (["UNAPPROVED_ABOVE"].includes(x.state)) { x.message = "Chỉ hỗ trợ duyệt ở tuyến cao hơn."; errors.push(x); }

      });
  }

  useEffect(() => {
    getButtonStatus()
  }, [
    JSON.stringify(allApproval),
    JSON.stringify(approve)
  ]);

  const getButtonStatus = () => {
    errors = [];
    isApproved = true;
    let allApprovalByWf = groupBy(allApproval, 'wf');
    requestApprovalArray.forEach(requestApproval => foundErrorsEachApproval(requestApproval, allApprovalByWf));
    let allowApproval = errors.length == 0;
    if (!allowApproval) {
      let tmpStatus = APPROVAL_MAPPING_TT37.NOT_AVAILABLE;
      tmpStatus.label = errors[0].message
      setStatus(tmpStatus)
      return;
    }

    if (
      isApproved
    ) {
      setStatus(APPROVAL_MAPPING_TT37.UN_APPROVE)
    } else {
      setStatus(APPROVAL_MAPPING_TT37.APPROVE)
    }
  }

  // getButtonStatus();

  const handleApprove = async () => {
    setLoading(true);
    let allApprovalByWf = groupBy(allApproval, 'wf');
    if (event.shiftKey) {
      getButtonStatus();
      load();
      setLoading(false);
      return
    }
    try {
      switch (status.key) {
        case APPROVAL_MAPPING_TT37.UN_APPROVE.key:
          // orgUnits is only include org can approve
          if (isApproveAll) {
            requestApprovalArray = requestApprovalArray.map(e => {
              let { orgUnits, wf } = e;
              e.orgUnits = allApprovalByWf[wf]?.filter(x =>
                orgUnits.includes(x.ou)
                && ["APPROVED_HERE", "APPROVED_ELSEWHERE"].includes(x.state)
              ).map(e => e.ou) || [];
              return e
            })
          }
          await unapprove(requestApprovalArray);
          break;
        case APPROVAL_MAPPING_TT37.APPROVE.key:
          // orgUnits is only include org cannot approve
          if (isApproveAll) {
            requestApprovalArray = requestApprovalArray.map(e => {
              let { orgUnits, wf } = e;
              // e.orgUnits = orgUnits.filter(x => !allApprovalByWf[wf]?.map(x => x?.ou).includes(x));
              e.orgUnits = allApprovalByWf[wf]?.filter(x =>
                orgUnits.includes(x.ou)
                && !["APPROVED_HERE", "APPROVED_ELSEWHERE"].includes(x.state)
              ).map(e => e.ou) || [];
              return e
            })
          }
          await approve(requestApprovalArray);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return !ready ? (
    <Spinner size="sm" />
  ) : (
    <>
      <Button
        size="sm"
        className="font-bold p-2 text-wrap h-fit"
        onClick={handleApprove}
        color={status.color}
        isLoading={loading}
        style={{ fontSize: 13, color: "white" }}
      >
        <FontAwesomeIcon icon={status.icon} />
        <p>
          {status.label}
        </p>

      </Button></>

  );
};

export const groupApprovalBy = (approvalList, by) => {
  return Object.values(groupBy(approvalList, by)).map(approvalSameDSorWF => {
    let dataSetApproval = cloneDeep(approvalSameDSorWF[0]);
    let orgs = flatten(approvalSameDSorWF.map(e => e.orgUnits));
    dataSetApproval.orgUnits = uniq(orgs);
    return dataSetApproval;
  })
}