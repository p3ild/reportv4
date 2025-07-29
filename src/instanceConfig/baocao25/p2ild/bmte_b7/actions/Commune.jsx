import { listingRowByOuGroup } from '../../common/ui/RowRender';
import { ORG_GROUP } from '../constant';

export const getDataCommon = async (props) => {
    props = {
        ...props,
        // dx: props,
        DEFAULT_COL_LENGTH: props.defaultCol,
        listColumnConfig: props.listColumnConfig,
    };
    let { listRow } = await listingRowByOuGroup({
        ...props,
        orgUnitGroup: [ORG_GROUP.XA, ORG_GROUP.XA_CSYT_KHAC],
        includeTotalRow: ["", <p>Tổng số</p>]
    });

    return {
        SectionHeader: props.SectionHeader,
        TableHeader: props.HeaderUI({
            listColumnConfig: props.listColumnConfig,
            title: props.title,
            ...props
        }),
        dataByRow: [
            ...listRow
        ]
    }
}
