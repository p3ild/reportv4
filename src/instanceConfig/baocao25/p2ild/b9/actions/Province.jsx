import { parallel } from 'async';
import { fetchAnalyticsData } from '../../common/request/request';
import { getDisableColDataObject, listingRowByOuGroup, sumMultiRow } from '../../common/ui/RowRender';
import { ORG_GROUP, ORG_GROUP_SET } from '../constant';
import { flatten, zip } from 'lodash';
import { getPickerStateByPath, useCorePickerState } from '@core/stateManage/corePickerState';

export const getDataCommon = async (props) => {
    props = {
        ...props,
        // dx: props,
        DEFAULT_COL_LENGTH: props.defaultCol,
        listColumnConfig: props.listColumnConfig,
    };

    let orgFlatMap = getPickerStateByPath('orgFlatMap')

    let reqPublicHealth_I = {
        orgUnitGroup: [
            ORG_GROUP.TW_CSYT_KCB,
            ORG_GROUP.TW_YT_NGANH,
        ],
        includeTotalRow: ["I", <p>Tuyến TW, Y tế ngành</p>],
    };

    let reqPublicHealth_II = [
        {
            orgUnitGroup: [
                ORG_GROUP.TINH_KCB_COGIUONG_BV_DK,
                ORG_GROUP.TINH_KCB_COGIUONG_BV_YHCT,
                ORG_GROUP.TINH_KCB_COGIUONG_BV_PDL,
                ORG_GROUP.TINH_KCB_COGIUONG_BV_PHCN,
                ORG_GROUP.TINH_KCB_COGIUONG_BV_CKK,
                ORG_GROUP.TINH_KCB_COGIUONG_BV_DKKV,
                ORG_GROUP.TINH_KCB_COGIUONG_CSYT_KHAC,
            ],
            includeTotalRow: ["II.1", <p>Cơ sở có giường</p>],
            sortOptions: (data, { orgUnitGroup }) => {
                if (!data) return [];
                let filter = orgUnitGroup.map(e => {
                    return data?.filter(orgID => {
                        return orgFlatMap[orgID].organisationUnitGroups.map(x => x.id).includes(e)
                    })
                })
                return flatten(filter)
            }
        },
        {
            orgUnitGroup: [
                ORG_GROUP.TINH_CSYT_KHONGGIUONG,
            ],
            includeTotalRow: ["II.2", <p>Cơ sở không giường</p>]
        },
    ];

    let reqPublicHealth_III = {
        orgUnitGroup: [
            ORG_GROUP.XA_DVHC
        ],
        includeTotalRow: ["III", <p>Tuyến xã</p>]
    }

    let reqPrivateHealthGroup =
    {
        orgUnitGroup: [
            ORG_GROUP.TINH_YTTN
        ],
        includeTotalRow: ["B", <p>Y tế tư nhân</p>]
    }



    await parallel(
        [
            cb => listingRowByOuGroup({
                ...props,
                ...reqPublicHealth_I,
                sortOrgUnits: reqPublicHealth_I.sortOptions
            }).then(res => {
                res.listRow[0][0].className = 'sticky-row-2';
                reqPublicHealth_I = {
                    ...reqPublicHealth_I,
                    ...res
                };
                cb(null, res)
            }),
            ...reqPublicHealth_II.map((reqProps, idx) => {
                return cb => listingRowByOuGroup({
                    ...props,
                    ...reqProps,
                    sortOrgUnits: reqProps.sortOptions
                }).then(res => {
                    res.listRow[0][0].className = 'sticky-row-2';
                    reqPublicHealth_II[idx] = {
                        ...reqPublicHealth_II[idx],
                        ...res
                    };
                    cb(null, res)
                })
            }),
            cb => listingRowByOuGroup({
                ...props,
                ...reqPublicHealth_III,
            }).then(res => {
                res.listRow[0][0].className = 'sticky-row-2';
                reqPublicHealth_III = {
                    ...reqPublicHealth_III,
                    ...res
                };
                cb(null, res)
            })
            ,
            cb => listingRowByOuGroup({
                ...props,
                ...reqPrivateHealthGroup
            }).then(res => {
                res.listRow[0][0].className = 'sticky-row-1';

                reqPrivateHealthGroup = {
                    ...reqPrivateHealthGroup,
                    ...res
                };
                cb(null, res)
            })

        ]

    )
    // ==== Pull data completed! ====


    // ==== A_II.PUBLIC PROVINCE ====
    let rowTotal_PublicHealth_II = sumMultiRow({
        ...props,
        listRow: reqPublicHealth_II.map(e => e.listRow[0]),
        includeTotalRow: ["II.2", <p>Tuyến tỉnh</p>]
    });

    // ==== A.PUBLIC HEALTH ====
    let rowTotal_PublicHealth = sumMultiRow({
        ...props,
        listRow: [
            reqPublicHealth_I.listRow[0],
            rowTotal_PublicHealth_II,
            reqPublicHealth_III.listRow[0]
        ],
        includeTotalRow: ["A", <p>Y tế công</p>]
    })
    rowTotal_PublicHealth[0].className = 'sticky-row-1';

    let rowList_publicHealth = [
        rowTotal_PublicHealth,
        ...reqPublicHealth_I.listRow,
        rowTotal_PublicHealth_II,
        ...flatten(reqPublicHealth_II.map(e => e.listRow)),
        ...reqPublicHealth_III.listRow
    ]

    let rowTotal_All = sumMultiRow({
        ...props,
        listRow: [
            rowTotal_PublicHealth,
            reqPrivateHealthGroup.listRow[0]
        ],
        includeTotalRow: ["", <p>Tổng số</p>]
    })
    rowTotal_All[0].className = 'sticky-row-0';

    let listRow = [
        rowTotal_All,
        ...rowList_publicHealth,
        ...reqPrivateHealthGroup.listRow
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
