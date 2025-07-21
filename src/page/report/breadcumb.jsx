import { useCoreMetaState } from '@core/stateManage/metadataState';
import { trans } from '@core/translation/i18n';
import { Breadcrumb, Flex } from 'antd';
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

export default () => {
    const [
        instanceTarget,
        reportTarget,
        listReport,
    ] = useCoreMetaState(useShallow(state => ([
        state.instanceTarget,
        state.reportTarget,
        state.listReport
    ])));
    let [items, setItems] = useState([]);

    useEffect(
        () => {
            (
                async () => {
                    // let report = [
                    //     ...(listReport?.pulledReportDataList || []),
                    //     ...(listReport?.folderList?.find(e => e?.key == "dev")?.child || [])
                    // ]
                    // .find(e => e.id == reportTarget?.reportID);
                    // let items = report.path?.map((pathID, pathIdx, pathArr) => {
                    //     if (pathIdx == 0) return {
                    //         title: <a href="">{trans("common:reportList")}</a>,
                    //     }

                    //     else {
                    //         let folder = listReport.folderList.find(e => e.key == pathID);
                    //         return {
                    //             title: folder?.label,
                    //         }

                    //     }
                    // }) || [];
                    // items.push({
                    //     title: <p>{report.displayName}</p>,
                    // });
                    // setItems(items)
                }
            )()
        },
        [instanceTarget])
    return <>
        {false && <Flex>
            <Breadcrumb className='px-2' size
                items={items}
            />
        </Flex>
        }
    </>
}