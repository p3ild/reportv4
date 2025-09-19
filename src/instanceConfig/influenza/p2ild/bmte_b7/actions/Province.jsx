import { parallel } from 'async';
import { fetchAnalyticsData } from '../../common/request/request';
import { getDisableColDataObject, listingRowByOuGroup, sumMultiRow } from '../../common/ui/RowRender';
import { DATASET, ORG_GROUP, ORG_GROUP_SET } from '../constant';
import { flatten, zip } from 'lodash';
import { getCoreMetaStateByPath } from '@core/stateManage/metadataState';
import { getApprovalConfig } from '../../common/utils/approval';

export const getDataCommon = async (props) => {
    props = {
        ...props,
        // dx: props,
        DEFAULT_COL_LENGTH: props.defaultCol,
        listColumnConfig: props.listColumnConfig,
        approvalUtils: getCoreMetaStateByPath('networkUtils.ApprovalUtils')
    };

    let reqPublicHealthGroup = [
        {
            orgUnitGroup: [
                ORG_GROUP.TW_CSYT_CSSK_BM,
            ],
            includeTotalRow: ["I", <p>Cấp TW, Y tế ngành</p>],
            ...getApprovalConfig({ ...props, ds: DATASET.BMTE_B7, approvalKey: 'TW' })
        },
        {
            orgUnitGroup: [
                ORG_GROUP.TINH_CSYT_CONG_CSSK_BM
            ],
            includeTotalRow: ["II", <p>Cấp tỉnh</p>],
            ...getApprovalConfig({ ...props, ds: DATASET.BMTE_B7, approvalKey: 'TINH' })
        },
        {
            orgUnitGroup: [
                ORG_GROUP.XA_DVHC
            ],
            includeTotalRow: ["III", <p>Cấp xã</p>],
            ...getApprovalConfig({ ...props, ds: DATASET.BMTE_B4_TYT, approvalKey: 'XA' })
        }
    ];

    let reqPrivateHealthGroup = [
        {
            orgUnitGroup: [
                ORG_GROUP.TINH_YTTN_CSSK_BM
            ],
            includeTotalRow: ["B", <p>Y tế tư nhân</p>],
            ...getApprovalConfig({ ...props, ds: DATASET.BMTE_B7, approvalKey: 'TN' })

        }
    ]


    let dataOrgGroupSet = await parallel(
        [
            ...reqPublicHealthGroup.map((reqProps, idx) => {
                return cb => listingRowByOuGroup({
                    ...props,
                    ...reqProps
                }).then(res => {
                    // res.listRow[0][0].className = 'sticky-row-2';
                    reqPublicHealthGroup[idx] = {
                        ...reqPublicHealthGroup[idx],
                        ...res
                    };
                    cb(null, res)
                })
            }),
            ...reqPrivateHealthGroup.map((reqProps, idx) => {
                return cb => listingRowByOuGroup({
                    ...props,
                    ...reqProps
                }).then(res => {
                    // res.listRow[0][0].className = 'sticky-row-1';

                    reqPrivateHealthGroup[idx] = {
                        ...reqPrivateHealthGroup[idx],
                        ...res
                    };
                    cb(null, res)
                })
            }),
        ]

    )

    let listRowPublicHealth = flatten(reqPublicHealthGroup.map(e => e.listRow));
    let listRowPrivateHealth = flatten(reqPrivateHealthGroup.map(e => e.listRow));

    let rowTotalPublicHealth = sumMultiRow({
        ...props,
        listRow: reqPublicHealthGroup.map(e => e.listRow[0]),
        includeTotalRow: ["A", <p>Y tế công</p>]
    })
    // rowTotalPublicHealth[0].className = 'sticky-row-1';

    let rowTotalAll = sumMultiRow({
        ...props,
        listRow: [
            rowTotalPublicHealth,
            listRowPrivateHealth[0]
        ],
        includeTotalRow: ["", <p>Tổng số</p>]
    })
    // rowTotalAll[0].className = 'sticky-row-0';

    let listRow = [
        rowTotalAll,
        rowTotalPublicHealth,
        ...listRowPublicHealth,
        ...listRowPrivateHealth
    ]

    return {

        dataByRow: listRow
    }
}