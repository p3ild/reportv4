import { omit, uniq } from 'lodash';
import { fetchAnalyticsEvent } from '../../common/request/request';
import { useCoreMetaState } from '@core/stateManage/metadataState';
const _get = useCoreMetaState.getState()._get;

export const getDataCommon = async (props) => {
    // let includeTotalRow = props?.includeTotalRow || [" ", "Tổng số"];
    props = {
        ...props,
        // dx: props,
        DEFAULT_COL_LENGTH: props.defaultCol,
        listColumnConfig: props.listColumnConfig
    };



    let data = await fetchAnalyticsEvent({
        ...props,
        defaultPageSize: 100000
    }).catch(e => {
        return {
            headers: [],
            rows: [],
            metaData: {
                pager: 1,
            }
        }
    });


    const defineHeader = data.headers.reduce((total, e, idx) => {
        total[e.name] = idx;
        return total;
    }, {});
    const listOrgIDs = uniq(data.rows.map(e => e[defineHeader.ou]));
    const orgDetails = await _get(`/api/organisationUnits.json?fields=id,name,ancestors[id,name,level,displayName]&filter=id:in:[${listOrgIDs.join(',')}]&paging=false`).then(e => e.organisationUnits);
    let dataByRow = data.rows.map((rawDataRow, rowIdx) => {
        let rsRow = []
        props.listColumnConfig.forEach(colConfig => {
            props.colClassName = colConfig.colClassName;
            props.colStyle = colConfig.colStyle;
            let cellData = colConfig.render({ ...props, json: data, colConfig, ...colConfig, orgDetails, rawDataRow, defineHeader, rowIdx });
            if (Array.isArray(cellData)) rsRow = [...rsRow, ...cellData]
            else rsRow.push(cellData)
        });
        return rsRow
    })
    //.splice(0,1);
    let HeaderUI = props.HeaderUI
    return {
        TableHeader: <HeaderUI {
            ...{ listColumnConfig: props.listColumnConfig, title: props.title }
        } />,
        dataByRow,
        pager: data.metaData.pager
    }
}