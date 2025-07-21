import { fetchAnalyticsData } from '../../common/request/request';
import { listingRowByOuGroup, sumMultiRow } from '../../common/ui/RowRender';
import { ORG_GROUP } from '../constant';

export const getDataCommon = async (props) => {
    props = {
        ...props,
        // dx: props,
        DEFAULT_COL_LENGTH: props.defaultCol,
        listColumnConfig: props.listColumnConfig,
        includeTotalRow: ["", "", "", <p>Tổng số</p>],
    };


    let { listRow: communeHFListRow } = await listingRowByOuGroup({
        ...props,
        orgUnitGroup: [ORG_GROUP.XA],
        includeTotalRow: ["I", <p>Trạm y tế</p>]
    });
    let { listRow: communeOtherHFListRow } = await listingRowByOuGroup({
        ...props,
        orgUnitGroup: [ORG_GROUP.XA_CSYT_KHAC],
        includeTotalRow: ["I", <p>Cơ sở y tế khác</p>]
    });

    let rowTotalProvince = sumMultiRow({
        ...props,
        listRow: [
            communeHFListRow[0],
            communeOtherHFListRow[0]
        ],
        includeTotalRow: ['', <p>Tổng số</p>],
    });

    return {
        SectionHeader: props.SectionHeader,
        TableHeader: props.HeaderUI({
            listColumnConfig: props.listColumnConfig,
            title: props.title,
            ...props
        }),
        dataByRow: [
            rowTotalProvince,
            ...communeHFListRow,
            ...communeOtherHFListRow
        ]
    }
}
