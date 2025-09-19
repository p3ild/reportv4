import { getCoreMetaStateByPath } from '@core/stateManage/metadataState';
import { listingRowByOuGroup } from '../../common/ui/RowRender';
import { DATASET, ORG_GROUP } from '../constant';
import { APPROVAL_ROW_TYPE } from '@core/network/ApprovalUtils';

export const getDataCommon = async (props) => {
    props = {
        ...props,
        // dx: props,
        DEFAULT_COL_LENGTH: props.defaultCol,
        listColumnConfig: props.listColumnConfig,
        includeTotalRow: ["", "", "", <p>Tổng số</p>],
        approvalUtils: getCoreMetaStateByPath('networkUtils.ApprovalUtils')
    };


    let { listRow, apiData } = await listingRowByOuGroup({
        ...props,
        orgUnitGroup: [ORG_GROUP.XA_DVHC],
        includeTotalRow: ["", <p>Tổng số</p>],
        ... (props?.periodSelected?.type == 'year')
            ? {
                approvalConfig: {
                    ds: [DATASET.TTC_XA],
                    pe: props.period,
                    approvalKey: 'LEVEL3',
                    approvalRowType: APPROVAL_ROW_TYPE.BOTH,
                }
            }
            : {}
    });

    return {
        dataByRow: listRow
    }
}
