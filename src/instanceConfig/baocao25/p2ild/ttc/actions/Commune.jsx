import { APPROVAL_ROW_TYPE } from '@core/network/ApprovalUtils';
import { getDisableColDataObject, listingRowByOuGroup, sumMultiRow } from '../../common/ui/RowRender';
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

    let { listRow: rowAll } = await listingRowByOuGroup({
        ...props,
    });
    let approvalConfig = (props?.periodSelected?.type == 'year')
        ? {
            approvalConfig: {
                ds: [DATASET.TTC_TYT],
                pe: props.period,
                approvalKey: 'LEVEL4',
                approvalRowType: APPROVAL_ROW_TYPE.BOTH,
            }
        }
        : {}
    let { listRow: communeHFListRow } = await listingRowByOuGroup({
        ...props,
        orgUnitGroup: [ORG_GROUP.XA, ORG_GROUP.XA_CSYT_KHAC],
        ...approvalConfig
    });
    const colDisable = [
        2, 3, 4, 5, 6,
        14, 15, 16

    ]
    let includeTotalRow = [
        "",
        <p>Tổng số</p>,
    ];

    colDisable.forEach(col => {
        includeTotalRow[col] = rowAll[0]?.[col]?.value || ''
    })

    let rowTotal = sumMultiRow({
        ...props,
        ...approvalConfig,
        listRow: [
            communeHFListRow[0],

        ],
        includeTotalRow
    });

    communeHFListRow = communeHFListRow.map(eachRow => {
        colDisable.forEach(colDisable => eachRow[colDisable] = getDisableColDataObject())
        return eachRow
    })

    return {
        dataByRow: [
            rowTotal,
            ...communeHFListRow,
        ]
    }
}
