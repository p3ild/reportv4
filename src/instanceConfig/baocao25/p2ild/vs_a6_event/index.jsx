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
        instanceTarget,
        networkUtils,
    ] = useCoreMetaState(useShallow(state => ([
        state.instanceTarget,
        state.networkUtils,
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
                // orgGroupVisible: [
                //     '-root',
                //     '-' + ORG_GROUP.TINH_DVHC,
                //     '-' + ORG_GROUP.XA_DVHC,
                //     ORG_GROUP.XA_TYT

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
                    width: '4000px'
                },
                reportName: "SỔ THEO DÕI TỬ VONG (Thí điểm)",
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