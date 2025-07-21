import { CloudDownloadOutlined, LeftCircleOutlined, PrinterOutlined, SettingOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useCoreMetaState } from "@core/stateManage/metadataState";
import { trans } from "@core/translation/i18n";
import { PrintElem } from "@core/utils/print";
import { Affix, Flex, FloatButton, List, Result, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useShallow } from "zustand/react/shallow";
import { useCorePickerState } from '../../core/stateManage/corePickerState';
import Breadcumb from "./breadcumb";
import './report.css';
import { useListParam, usePreparePicker, useReportTarget } from "./report.hook";
import { exportToExcel } from '@core/excelUtils';
// import TableToExcel from "@linways/table-to-excel";


export const Report = (metadata) => {

    const navigate = useNavigate();
    let [initCompleted, setInitCompleted] = useState();
    let listParam = useListParam(
        {
            // setOrgSelected, setPeriodSelected 
        }
    );
    let { loaded } = useReportTarget({
        listParam,
        // setOrgSelected, 
        setInitCompleted, ...metadata
    });
    let [
        reportTarget,
        setExcelOptions,
        setGlobalOverlay,
    ] = useCoreMetaState(useShallow(state => [
        state.reportTarget,
        state.actions.setExcelOptions,
        state.actions.setGlobalOverlay,
    ]))

    const [
        customPicker,
        corePicker,
        setCorePicker,
        setCustomPicker,
        setOrgPickerConfig
    ] = useCorePickerState(
        useShallow(state => ([
            state.customPicker,
            state.corePicker,
            state.actions.setCorePicker,
            state.actions.setCustomPicker,
            state.actions.setOrgPickerConfig,

        ])));


    let { default: ReportView, errors } = reportTarget || {}

    let { openPicker } = usePreparePicker();


    useEffect(
        () => {
            setOrgPickerConfig(undefined);
            setCustomPicker(undefined);
            //Default initExcelOptions
            setExcelOptions({
                excelFileName: (reportTarget?.reportName || reportTarget?.reportCode || 'Báo cáo').toLocaleLowerCase().replace(/ /g, '_')
            });
        },
        [reportTarget]
    )



    const NavBar = () => {
        return <Affix offsetTop={50}>
            <Flex className="no-print" vertical >
                <Flex >
                    <button className="btn-primary flex space-x-2" onClick={() => {
                        navigate(`/`);
                        setGlobalOverlay({
                            isOpen: false
                        })
                        setCorePicker({
                            corePicker,
                        })
                    }} ><LeftCircleOutlined />  <span>{trans("common:button.back")}</span></button>
                    <button className="btn-primary flex space-x-2" onClick={() => {
                        openPicker()
                    }}>
                        <SettingOutlined /> <span>{trans("common:button.changeFilter")}</span>
                    </button>


                    <button className="btn-primary flex space-x-2" onClick={() => {
                        PrintElem('report-content')
                    }}><PrinterOutlined /> <span>{trans("common:button.printReport")}</span></button>

                    <button className="btn-primary flex space-x-2" onClick={() => {
                        exportToExcel();

                    }}><CloudDownloadOutlined /> <span>{trans("common:button.excel")}</span></button>

                </Flex>
                <Breadcumb />
            </Flex>

        </Affix>
    }

    return <div className="p-2 flex flex-col h-full overflow-auto">
        {
            loaded && !errors && <NavBar />
        }
        {loaded && errors && <Result
            status="404"
            title={<List
                itemLayout="horizontal"
                dataSource={errors}

                renderItem={(item, index) => (
                    <List.Item>
                        <Typography.Title level={4} className="w-full">
                            {item}
                        </Typography.Title>
                        {/* <h1 style={{ width: "-webkit-fill-available" }}>{item}</h1> */}
                    </List.Item>
                )}
            />}
            // subTitle=
            extra={<button className="btn-primary space-x-2"
                onClick={() => {
                    navigate(`/`);
                }} ><UnorderedListOutlined /> <span>Quay lại danh sách </span></button>
            }

        />}

        <FloatButton.BackTop target={() => {
            return document.getElementsByClassName('report-content')[0]
        }} visibilityHeight={0} />
        {loaded && ReportView &&
            <div className="report-content">
                <ReportView
                    {
                    ...{
                        openPicker
                    }}
                />
            </div>
        }

    </div>
}


