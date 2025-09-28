import { parallelLimit } from 'async';
import { listingRowByOuGroup } from '../../common/ui/RowRender';
import { flatten } from 'lodash';

export const getDataCommon = async (props) => {
    props = {
        ...props,
        // dx: props,
        DEFAULT_COL_LENGTH: props.defaultCol,
        listColumnConfig: props.listColumnConfig,
    };

    let periodList = props.period.split(';');
    let requestList = periodList.map(period =>
        cb => {
            ; (async () => {
                let rs = await listingRowByOuGroup({
                    ...props,
                    period,
                });
                cb(null, rs);
            })()
        }
    )


    let result = await parallelLimit(requestList, 3)

    return {
        dataByRow: [...flatten(result.map(e => e.listRow))]
    }
}
