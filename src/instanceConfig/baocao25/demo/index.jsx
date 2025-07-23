import { getPickerStateByPath, useCorePickerState } from "@core/stateManage/corePickerState";
import { PERIOD_TYPE } from "@core/ui/picker/periodpicker/constant";
import { useEffect } from "react";
import { ORG_GROUP } from "../p2ild/common/constant";
import { getCoreMetaStateByPath, useCoreMetaState } from "@core/stateManage/metadataState";
import { useShallow } from "zustand/react/shallow";
import { useCustomReportState } from "@core/stateManage/customState";
import { wait } from "@core/network";
export default () => {

    const {
        firstLoadApp,
        _get
    } = useCoreMetaState(useShallow(state => ({
        firstLoadApp: state.firstLoadApp,
        _get: state._get
    })))
    const {
        corePicker
    } = useCorePickerState(useShallow(state => ({
        corePicker: state.corePicker
    })))
    const {
        customData, customReportStateAction
    } = useCustomReportState(useShallow(state => ({
        customData: state.customData,
        customReportStateAction: state.actions
    })))

    // ----- Report Config -----
    useEffect(() => {
        getPickerStateByPath('actions.setAllowPeriodTypes')([
            PERIOD_TYPE.month,
            PERIOD_TYPE.month2,
            PERIOD_TYPE.year,
            PERIOD_TYPE.sixMonth,
            PERIOD_TYPE.biWeek
        ]);

        getPickerStateByPath('actions.setOrgPickerConfig')(
            {
                orgGroupVisible: [
                    ORG_GROUP.TINH_DVHC,
                    ORG_GROUP.XA_DVHC,
                    ORG_GROUP.TUYEN_TINH
                ],
                // levelsToHideIfEmpty: [3]
            }
        );
    }, []);



    // ----- On user pick complete -----
    useEffect(() => {
        if (corePicker.pickCompleted) {
            //Use global overlay to show loading
            getCoreMetaStateByPath('actions.setGlobalOverlay')({
                isOpen: true,
            })
            wait(2000).then(() => {
                getCoreMetaStateByPath('actions.setGlobalOverlay')({
                    isOpen: false
                })
            })

            console.log(corePicker.periodSelected)
            console.log(corePicker.orgSelected.name)
            _get('/api/me').then(e => {
                console.log(e.name)
            })
        }
    },
        [corePicker.pickCompleted]
    )



    // ----- Use custom report state -----
    useEffect(() => {
        if (firstLoadApp) {
            _get('/api/me').then(e => {
                customReportStateAction.addValue('me.name', e.name)
                customReportStateAction.addValue('me.displayName', e.displayName)
            })

        }
    }, [firstLoadApp])

    useEffect(() => {
        console.log({
            customData
        })
    }, [
        customData
    ])


    return <div className="report-container">
        <table
            id="org-table"
            className="w-[20vw]">
            <thead>
                <tr>
                    <th>col1</th>
                    <th>col2</th>
                </tr>
                <tr>
                    <th>col1</th>
                    <th>col2</th>
                </tr>
            </thead>
            <tbody className="border">
                <tr>
                    <td>col1-data</td>
                    <td>col2-data</td>
                </tr>
                <tr>
                    <td><p>30.000</p></td>
                    <td><p>50</p></td>
                </tr>
                <tr>
                    <td>col1-data</td>
                    <td>col2-data</td>
                </tr>
                <tr>
                    <td><p>30.000</p></td>
                    <td><p>50</p></td>
                </tr>
                <tr>
                    <td>col1-data</td>
                    <td>col2-data</td>
                </tr>
                <tr>
                    <td><p>30.000</p></td>
                    <td><p>50</p></td>
                </tr>
                <tr>
                    <td>col1-data</td>
                    <td>col2-data</td>
                </tr>
                <tr>
                    <td><p>30.000</p></td>
                    <td><p>50</p></td>
                </tr>
                <tr>
                    <td>col1-data</td>
                    <td>col2-data</td>
                </tr>
                <tr>
                    <td><p>30.000</p></td>
                    <td><p>50</p></td>
                </tr>
                <tr>
                    <td>col1-data</td>
                    <td>col2-data</td>
                </tr>
                <tr>
                    <td><p>30.000</p></td>
                    <td><p>50</p></td>
                </tr>
                <tr>
                    <td>col1-data</td>
                    <td>col2-data</td>
                </tr>
                <tr>
                    <td><p>30.000</p></td>
                    <td><p>50</p></td>
                </tr>
                <tr>
                    <td>col1-data</td>
                    <td>col2-data</td>
                </tr>
                <tr>
                    <td><p>30.000</p></td>
                    <td><p>50</p></td>
                </tr>
            </tbody>
        </table>
        <table
            className="w-[20vw] mt-5">
            <thead>
                <tr>
                    <th>col1</th>
                    <th>col2</th>
                </tr>
                <tr>
                    <th>col1</th>
                    <th>col2</th>
                </tr>
            </thead>
            <tbody className="border">
                <tr>
                    <td>col1-data</td>
                    <td>col2-data</td>
                </tr>
                <tr>
                    <td><p>30.000</p></td>
                    <td><p>50</p></td>
                </tr>
                <tr>
                    <td>col1-data</td>
                    <td>col2-data</td>
                </tr>
                <tr>
                    <td><p>30.000</p></td>
                    <td><p>50</p></td>
                </tr>
                <tr>
                    <td>col1-data</td>
                    <td>col2-data</td>
                </tr>
                <tr>
                    <td><p>30.000</p></td>
                    <td><p>50</p></td>
                </tr>
                <tr>
                    <td>col1-data</td>
                    <td>col2-data</td>
                </tr>
                <tr>
                    <td><p>30.000</p></td>
                    <td><p>50</p></td>
                </tr>
                <tr>
                    <td>col1-data</td>
                    <td>col2-data</td>
                </tr>
                <tr>
                    <td><p>30.000</p></td>
                    <td><p>50</p></td>
                </tr>
                <tr>
                    <td>col1-data</td>
                    <td>col2-data</td>
                </tr>
                <tr>
                    <td><p>30.000</p></td>
                    <td><p>50</p></td>
                </tr>
                <tr>
                    <td>col1-data</td>
                    <td>col2-data</td>
                </tr>
                <tr>
                    <td><p>30.000</p></td>
                    <td><p>50</p></td>
                </tr>
                <tr>
                    <td>col1-data</td>
                    <td>col2-data</td>
                </tr>
                <tr>
                    <td><p>30.000</p></td>
                    <td><p>50</p></td>
                </tr>
            </tbody>
        </table>
    </div>
}