import { fetchAnalyticsData } from '../../common/request/request';
import { listingRowByOuGroup } from '../../common/ui/RowRender';

export const getDataCommon = async (props) => {


    props = {
        ...props,
        // dx: props,
        DEFAULT_COL_LENGTH: props.defaultCol,
        listColumnConfig: props.listColumnConfig,
    };
    
    let { listRow } = await listingRowByOuGroup({
        ...props
    });


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
