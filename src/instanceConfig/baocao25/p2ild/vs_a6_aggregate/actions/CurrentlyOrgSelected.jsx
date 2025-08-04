import { fetchAnalyticsData } from '../../common/request/request';
import { listingRowByOuGroup } from '../../common/ui/RowRender';

export const getDataCommon = async (props) => {
    let apiXaCoNVYT_HD = await fetchAnalyticsData({
        ...props,
        dx: ["asUEKT8RT5Q"],
        period: ('' + props.period)?.substring(0, 4),
        includeCo: false
    });

    props = {
        ...props,
        apiXaCoNVYT_HD,
        // dx: props,
        listColumnConfig: props.listColumnConfig,
    };
    let totalRow = []
    if (props.separateTotalRow) {
        let { listRow: listRowTotal } = await listingRowByOuGroup({
            ...props,
            ouQueryType: 'filter',
            includeTotalRow: ['', 'Tổng số'],
            includeChild: false,
            DEFAULT_COL_LENGTH: 10,
        });
        totalRow = listRowTotal
    }




    let { listRow } = await listingRowByOuGroup({
        ...props,
        DEFAULT_COL_LENGTH: props.periodAsArray?.length ? (props.periodAsArray?.length + 1) : 10,
    });
    return {
        SectionHeader: props.SectionHeader,
        TableHeader: props.HeaderUI({
            listColumnConfig: props.listColumnConfig,
            title: props.title,
            ...props,
        }),
        dataByRow: [,
            ...totalRow,
            ...listRow
        ]
    }
}
