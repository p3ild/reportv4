import { getCoreMetaStateByPath } from '@core/stateManage/metadataState';
import { listingRowByOuGroup } from '../../common/ui/RowRender';
import { DATASET, ORG_GROUP } from '../constant';
import { APPROVAL_ROW_TYPE } from '@core/network/ApprovalUtils';
import { getApprovalConfig } from '../../common/utils/approval';
export const getDataCommon = async (props) => {
    props = {
        ...props,
        // dx: props,
        DEFAULT_COL_LENGTH: props.defaultCol,
        listColumnConfig: props.listColumnConfig,
        approvalUtils: getCoreMetaStateByPath('networkUtils.ApprovalUtils')
    };

    let { listRow } = await listingRowByOuGroup({
        ...props,
        orgUnitGroup: [ORG_GROUP.XA, ORG_GROUP.XA_CSYT_KHAC],
        includeTotalRow: ["", <p>Tổng số</p>],
        ...getApprovalConfig({ ...props, ds: DATASET.B12_NCD_TYT, approvalKey: 'LEVEL4', approvalRowType: APPROVAL_ROW_TYPE.BOTH, })
    });

    return {
        dataByRow: listRow
    }
}
