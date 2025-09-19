import { useEffect, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import '../common/circular37-mui.css';
import { Tabs } from "antd";
import { TableData } from "../common/ui/MultiTableUI";
import { useLoadData } from "./hook";
import { PERIOD_TYPE } from "@core/ui/picker/periodpicker/constant";
import { useCoreMetaState } from "@core/stateManage/metadataState";
import { useCorePickerState } from "@core/stateManage/corePickerState";
import { getCustomReportStateByPath } from "@core/stateManage/customState";
import { ORG_GROUP } from "./constant";


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
                PERIOD_TYPE.month,
                PERIOD_TYPE.month2,
            ]);
            setOrgPickerConfig({
                orgGroupVisible: [
                    '-root',
                    (!me.isSuperuser ? '-' : '') + ORG_GROUP.TINH_DVHC,
                    ORG_GROUP.XA_DVHC,
                    ORG_GROUP.XA_TYT,
                    ORG_GROUP.XA_CSYT_KHAC
                ],
                levelsToHideIfEmpty: [2, 3]
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
                    width: '3000px'
                },
                reportName: "SỔ THEO DÕI TỬ VONG",
                orgReportName,
                dhis2Period,
                data
            }
            }
        >
        </TableData>
    }, [orgReportName, data]);

    return <div className="report-container">
        <Tabs
            items={
                [
                    {
                        key: 'queryByEventDate',
                        label: 'Dữ liệu theo ngày ghi sổ',
                        value: 'queryByEventDate'
                    },
                    {
                        key: 'queryByDeathDate',
                        label: 'Dữ liệu theo ngày tử vong',
                        value: 'queryByDeathDate'
                    }
                ]
            }
            onChange={(key) => {
                getCustomReportStateByPath('actions.addValue')('queryType', key);
                setCorePicker({
                    pickCompleted: Math.random()
                })
            }}
        />
        {TableMemo}
        <div className="text-center p-5" >
            <ButtonLoadMore />
        </div>
    </div>
}