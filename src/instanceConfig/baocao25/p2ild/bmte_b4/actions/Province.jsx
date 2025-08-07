import { parallel } from 'async';
import { fetchAnalyticsData } from '../../common/request/request';
import { getDisableColDataObject, listingRowByOuGroup, sumMultiRow } from '../../common/ui/RowRender';
import { ORG_GROUP, ORG_GROUP_SET } from '../constant';
import { flatten, zip } from 'lodash';

export const getDataCommon = async (props) => {
    props = {
        ...props,
        // dx: props,
        DEFAULT_COL_LENGTH: props.defaultCol,
        listColumnConfig: props.listColumnConfig,
    };

    let reqPublicHealthGroup = [
        {
            orgUnitGroup: [
                ORG_GROUP.TW_CSYT_CSSK_BM,
            ],
            includeTotalRow: ["I", <p>Tuyến TW, Y tế ngành</p>],
        },
        {
            orgUnitGroup: [
                ORG_GROUP.TINH_CSYT_CONG_CSSK_BM
            ],
            includeTotalRow: ["II", <p>TUYẾN TỈNH</p>]
        },
        {
            orgUnitGroup: [
                ORG_GROUP.XA_DVHC
            ],
            includeTotalRow: ["III", <p>TUYẾN XÃ</p>]
        }
    ];

    let reqPrivateHealthGroup = [
        {
            orgUnitGroup: [
                ORG_GROUP.TINH_YTTN_CSSK_BM
            ],
            includeTotalRow: ["B", <p>Y tế tư nhân</p>]
        }
    ]


    let dataOrgGroupSet = await parallel(
        [
            ...reqPublicHealthGroup.map((reqProps, idx) => {
                return cb => listingRowByOuGroup({
                    ...props,
                    ...reqProps
                }).then(res => {
                    if (!reqPublicHealthGroup[idx].orgUnitGroup.some(x => x == ORG_GROUP.XA_DVHC)) {
                        [2, 3, 4, 5].forEach(colDisable => res.listRow.map(e => {
                            e[colDisable] = getDisableColDataObject();
                            return e
                        }))
                    }


                    res.listRow[0][0].className = 'sticky-row-2';
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
                    res.listRow[0][0].className = 'sticky-row-1';

                    if (!reqPublicHealthGroup[idx].orgUnitGroup.some(x => x == ORG_GROUP.XA_DVHC)) {
                        [2, 3, 4, 5].forEach(colDisable => res.listRow.map(e => {
                            e[colDisable] = getDisableColDataObject();
                            return e
                        }))
                    }

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
    rowTotalPublicHealth[0].className = 'sticky-row-1';

    let rowTotalAll = sumMultiRow({
        ...props,
        listRow: [
            rowTotalPublicHealth,
            listRowPrivateHealth[0]
        ],
        includeTotalRow: ["", <p>Tổng số</p>]
    })
    rowTotalAll[0].className = 'sticky-row-0';

    let listRow = [
        rowTotalAll,
        rowTotalPublicHealth,
        ...listRowPublicHealth,
        ...listRowPrivateHealth
    ]

    return {
        SectionHeader: props.SectionHeader,
        TableHeader: props.HeaderUI({
            listColumnConfig: props.listColumnConfig,
            title: props.title,
            ...props
        }),
        dataByRow: [,

            ...listRow
        ]
    }
}
