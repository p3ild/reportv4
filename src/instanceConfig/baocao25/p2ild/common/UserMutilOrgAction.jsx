import { getCoreMetaStateByPath } from '@core/stateManage/metadataState';

import { parallel } from 'async';
import { cloneDeep, flatten } from 'lodash';
import { ORG_GROUP, ORG_SELECTED_TYPE } from './constant';
import { listingRowByOuGroup } from './ui/RowRender';
import { getApprovalConfig } from './utils/approval';
export const getDataCommon = async (props) => {
    props = {
        ...props,
        // dx: props,
        DEFAULT_COL_LENGTH: props.defaultCol,
        listColumnConfig: props.listColumnConfig,
        approvalUtils: getCoreMetaStateByPath('networkUtils.ApprovalUtils')
    };

    let classifyingOrgSelected = getCoreMetaStateByPath('instanceTarget.classifyingOrgSelected');

    let listRq = props.orgSelected.children.map((org, orgIdx) =>
        cb => {
            (async () => {
                let orgType = classifyingOrgSelected(org);
                let propsTemp = {
                    ...cloneDeep(props),
                    includeTotalRow: [
                        "",
                        <p>{org.displayName}</p>
                    ],
                }

                if (orgType?.key == ORG_SELECTED_TYPE?.COMMUNE?.key) {
                    propsTemp = {
                        ...propsTemp,
                        orgUnitGroup: [
                            ORG_GROUP.XA_TYT, ORG_GROUP.XA_CSYT_KHAC_TYT
                        ]
                    };
                    if (props.customDataSet.COMMUNE) {
                        propsTemp.approvalConfig = getApprovalConfig({ ...props, ds: props.customDataSet.COMMUNE, approvalKey: 'XA_' + orgIdx })?.approvalConfig
                    }

                } else {
                    propsTemp.includeChild = false;
                    if (props.customDataSet.PROVINCE) {
                        propsTemp.approvalConfig = getApprovalConfig({ ...props, ds: props.customDataSet.PROVINCE, approvalKey: 'XA_' + orgIdx })?.approvalConfig
                    }
                }

                let { listRow } = await listingRowByOuGroup({
                    ...propsTemp,
                    orgUnit: org.id,
                });
                cb(null, listRow)
            })()
        }
    );

    let rsRequest = await parallel(listRq);
    let allRow = flatten(rsRequest);


    return {
        dataByRow: allRow,
        ...props
    }
}
