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

    let reqProvinceGroup = [
        {
            orgUnitGroup: [
                ORG_GROUP.TINH_KCB_COGIUONG_BV_DK,
                ORG_GROUP.TINH_KCB_COGIUONG_BV_YHCT,
                ORG_GROUP.TINH_KCB_COGIUONG_BV_PDL,
                ORG_GROUP.TINH_KCB_COGIUONG_BV_PHCN,
                ORG_GROUP.TINH_KCB_COGIUONG_BV_CKK,
                ORG_GROUP.TINH_KCB_COGIUONG_BV_DKKV,
                ORG_GROUP.TINH_KCB_COGIUONG_CSYT_KHAC,
                ORG_GROUP.TINH_CSYT_KHONGGIUONG,
            ],
            ignoreInTotal: true,
            includeTotalRow: ["II", <p>Tuyến tỉnh</p>],
            ouQueryType: 'filter',
            includeChild: false,
        },
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
            includeTotalRow: ["II.1", <p>Có giường</p>],
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
            includeTotalRow: ["II.2", <p>Không giường</p>]
        },
    ];

    let reqPublicHealthGroup = [
        {
            orgUnitGroup: [
                ORG_GROUP.TW_CSYT_KCB,
                ORG_GROUP.TW_YT_NGANH,
            ],
            includeTotalRow: ["I", <p>Tuyến TW, Y tế ngành</p>],
        },
        ...reqProvinceGroup,
        {
            orgUnitGroup: [
                ORG_GROUP.XA_DVHC
            ],
            includeTotalRow: ["III", <p>Tuyến xã</p>]
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
                    ...reqProps,
                    sortOrgUnits: reqProps.sortOptions
                }).then(res => {
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
        listRow: reqPublicHealthGroup.filter(e => !e.ignoreInTotal).map(e => e.listRow[0]),
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
