import { APPROVAL_ROW_TYPE } from '@core/network/ApprovalUtils';
import { listingRowByOuGroup } from '../../common/ui/RowRender';
import { DATASET, ORG_GROUP } from '../constant';
import { getCoreMetaStateByPath } from '@core/stateManage/metadataState';

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
        ... (props?.periodSelected?.type == 'month')
            ? {
                approvalConfig: {
                    ds: [DATASET.BMTE_B4_TYT],
                    pe: props.period,
                    approvalKey: 'LEVEL4',
                    approvalRowType: APPROVAL_ROW_TYPE.BOTH,
                }
            }
            : {}
    });

    return {
        dataByRow: listRow
    }
}
