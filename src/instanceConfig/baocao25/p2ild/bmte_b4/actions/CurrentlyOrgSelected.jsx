import { listingRowByOuGroup } from '../../common/ui/RowRender';

export const getDataCommon = async (props) => {
    props = {
        ...props,
        // dx: props,
        DEFAULT_COL_LENGTH: props.defaultCol,
        listColumnConfig: props.listColumnConfig,
        includeTotalRow: ["", "", "", <p>Tổng số</p>],
    };


    let { listRow, apiData } = await listingRowByOuGroup({
        ...props,
        includeTotalRow: ["", <p>Tổng số</p>]
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
