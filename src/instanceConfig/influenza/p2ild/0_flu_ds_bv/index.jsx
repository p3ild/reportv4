import { useEffect, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import '../common/circular37-mui.css';
import { TableData } from "../common/ui/MultiTableUI";
import { useLoadData } from "./hook";
import { PERIOD_TYPE } from "@core/ui/picker/periodpicker/constant";
import { useCoreMetaState } from "@core/stateManage/metadataState";
import { useCorePickerState } from "@core/stateManage/corePickerState";
import { ORG_GROUP } from "./constant";
import { Tabs } from "antd";
import { getCustomReportStateByPath } from "@core/stateManage/customState";

export default () => {

    const [
        me
    ] = useCoreMetaState(useShallow(state => ([
        state.me
    ])));

    const [
        setAllowPeriodTypes,
        setOrgPickerConfig,
        setCorePicker
    ] = useCorePickerState(useShallow(state => [
        state.actions.setAllowPeriodTypes,
        state.actions.setOrgPickerConfig,
        state.actions.setCorePicker,
    ]));

    const {
        data,
        orgReportName,
        dhis2Period,
        ButtonLoadMore
    } = useLoadData({

    });
    useEffect(
        () => {
            setAllowPeriodTypes([
                PERIOD_TYPE.weekClassic,
                PERIOD_TYPE.weekClassic2,
            ]);
            setOrgPickerConfig({
                // orgGroupVisible: [
                // ],
                // levelsToHideIfEmpty: [2, 3]
            })
        },
        []
    )

    const TableMemo = useMemo(() => {
        return <TableData
            {
            ...{
                reportCode: <></>,
                style: {
                    tableLayout: 'fixed',
                    width: '3200px'
                },
                reportName: "Danh sách Bệnh viện",
                orgReportName,
                dhis2Period,
                data
            }
            }
        >
        </TableData>
    }, [orgReportName, data]);

    return <div className="report-container">
        {TableMemo}
        <div className="text-center p-5" >
            <ButtonLoadMore />
        </div>
    </div>
}