import { parallel } from 'async';
import { flatten, zip } from 'lodash';
import { listingRowByOuGroup, sumMultiRow } from '../../common/ui/RowRender';
import { ORG_GROUP, ORG_GROUP_SET } from '../constant';

export const getDataCommon = async (props) => {
    props = {
        ...props,
        // dx: props,
        DEFAULT_COL_LENGTH: props.defaultCol,
        listColumnConfig: props.listColumnConfig,
    };


    let rsDataOrgGroupSet = [
        { id: ORG_GROUP.TUYEN_TRUNG_UONG, name: 'Cấp trung ương' },
        { id: ORG_GROUP.TUYEN_TINH, name: 'Cấp tỉnh' },
        { id: ORG_GROUP.TUYEN_XA, name: 'Cấp xã' },
        { id: ORG_GROUP.TINH_YTTN, name: 'Tư nhân', }
    ];

    let dataOrgGroupSet = await parallel(rsDataOrgGroupSet.map(orgGroup => {
        return cb => listingRowByOuGroup({
            ...props,
            // includeTotalRow: ["", <p>{orgGroup.name}</p>],
            idOrgGroupSet: `${ORG_GROUP_SET.TUYEN}:${orgGroup.id}`,
            orgUnitGroup: [ORG_GROUP.TINH_DVHC],
            ouGroupSetQueryType: 'dimension'
        }).then(x => cb(null, x))
    })).then(e => {
        //Disable col 2,3,4,5 for group which is not TUYEN_XA
        e.forEach((x, idx) => {
            rsDataOrgGroupSet[idx].data = x;
        })
    })
    let listRowTotalProvince = [];
    let groupByProvince = zip(...rsDataOrgGroupSet.map(e => e.data.listRow))
    let addTotalRowForProvince = groupByProvince.map((provinceData, provinceIdx) => {
        let rowTotalProvince = sumMultiRow({
            ...props,
            listRow: provinceData,
            includeTotalRow: [provinceIdx + 1, provinceData[0][1].view],
        });
        // rowTotalProvince[0].className = 'sticky-row-1';
        listRowTotalProvince.push(rowTotalProvince)
        return [
            rowTotalProvince,
            ...provinceData.map((e, rowIdx) => {
                e[0].view = <></>
                e[0].value = ""
                e[1].view = <p style={{ marginLeft: '10px' }}>{rsDataOrgGroupSet[rowIdx].name}</p>
                return e;
            })
        ]
    });
    let listRow = flatten(addTotalRowForProvince);

    let rowTotalAll = sumMultiRow({
        ...props,
        listRow: listRowTotalProvince,
        includeTotalRow: ["", <p>Tổng cộng</p>],
    });
    // rowTotalAll[0].className = 'sticky-row-0';

    listRow = [
        rowTotalAll,
        ...listRow
    ]

    return {
        dataByRow: listRow
    }
}
