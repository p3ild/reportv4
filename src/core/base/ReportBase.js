
import { cloneDeep, pull } from 'lodash';
import { PERIOD_TYPE } from '../ui/picker/periodpicker/periodpicker';
import { getPickerStateByPath } from '@core/stateManage/corePickerState';

class Base {
    host = (() => {
        let domain = window.location.href.split('api')[0];
        domain = domain.substring(0, domain.length - 1);
        return domain
    })();

    getTransInstance = async () => {
        let trans = {}
        try {
            trans = await require('./locale.json');
        } catch (e) {
            console.log(`Translation for instance doesn't exists`)
        }

        return trans;
    }

    getListReport = async ({ networkUtils, instanceTarget }) => {
        let pulledReportDataList = await networkUtils.getListReport({})
            .then(e => e.reports);


        let fullReportData = this.listReport.map((ele, idx, arr) => {
            let reportPulled = pulledReportDataList.find(e => e.id == ele.key);
            ele['link'] = `${networkUtils.INIT_HOST}/dhis-web-reports/index.html#/standard-report/view/${reportPulled?.id}`;
            ele.title = reportPulled?.displayName || ele.displayName
            ele.label = reportPulled?.displayName || ele.displayName
            ele.value = reportPulled?.id
            return {
                ...reportPulled,
                ...ele,
            }
        })


        let folderTemp = {
            dev: import.meta.env.MODE == 'development' ?
                {
                    "key": "dev",
                    "label": "development",
                    "child": fullReportData?.filter(e =>
                        e?.devMode || !e.value || !e.folder
                    ).map(e => {
                        e.id = e.key
                        return e;
                    }) || []
                } : undefined
            , ...cloneDeep(this.listFolder),
        };

        let listFolderAsArray = Object.values(folderTemp).filter(e => e);

        let listFolder = listFolderAsArray.map(folder => {
            fullReportData.forEach((reportConfig) => {
                let reportFolderKey = (reportConfig.folder || []).map(e => e.key)
                let isReportInFolder = reportFolderKey.some(folderKey => folder.key === folderKey);
                if (isReportInFolder && reportConfig.value) {
                    folder.child.push(reportConfig)
                }
            });

            return folder
        })
        return {
            listFolder,
            listReport: fullReportData
        }
    }

    init = async () => {
        await getPickerStateByPath('actions.setAllowPeriodTypes')([
            PERIOD_TYPE.year,
        ]);
    }



}

export default Base