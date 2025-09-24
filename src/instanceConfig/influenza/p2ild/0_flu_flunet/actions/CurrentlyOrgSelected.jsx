import { listingRowByOuGroup } from '../../common/ui/RowRender';

export const getDataCommon = async (props) => {
    props = {
        ...props,
        // dx: props,
        DEFAULT_COL_LENGTH: props.defaultCol,
        listColumnConfig: props.listColumnConfig,
    };


    let { listRow, apiData } = await listingRowByOuGroup({
        ...props,
    });

    return {
        dataByRow: listRow
    }
}
