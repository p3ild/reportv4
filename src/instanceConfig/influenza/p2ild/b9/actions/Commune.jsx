import { getCoreMetaStateByPath } from '@core/stateManage/metadataState';
import { listingRowByOuGroup } from '../../common/ui/RowRender';
import { DATASET, ORG_GROUP } from '../constant';
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
        ...getApprovalConfig({ ...props, ds: DATASET.B9, approvalKey: 'XA' })
    });

    return {
        dataByRow: listRow
    }
}
