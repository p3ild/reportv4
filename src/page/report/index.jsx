import { CloudDownloadOutlined, LeftCircleOutlined, PrinterOutlined, SettingOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { exportToExcel } from '@core/excelUtils';
import { useCoreMetaState } from "@core/stateManage/metadataState";
import { trans } from "@core/translation/i18n";
import { PrintElem } from "@core/utils/print";
import { Affix, FloatButton, List, Result, Typography } from "antd";
import { useNavigate } from "react-router";
import { useShallow } from "zustand/react/shallow";
import { getPickerStateByPath } from '../../core/stateManage/corePickerState';
import Breadcumb from "./breadcumb";
import './report.css';
import { useListParam, useReportTarget } from "./report.hook";

export const Report = (metadata) => {

    const navigate = useNavigate();
    let listParam = useListParam(
        {
        }
    );
    let { loaded } = useReportTarget({
        listParam,
        ...metadata
    });
    let [
        reportTarget,
        excelOptions,
        setGlobalOverlay,
    ] = useCoreMetaState(useShallow(state => [
        state.reportTarget,
        state.excelOptions,
        state.actions.setGlobalOverlay,
    ]))

    let { default: ReportView, errors } = reportTarget || {}


    const NavBar = () => {
        return <Affix offsetTop={50}>
            <div className="no-print flex flex-col" >
                <div className='flex flex-row'>
                    <button className="btn-primary flex space-x-2" onClick={() => {
                        navigate(`/`);
                        setGlobalOverlay({
                            isOpen: false
                        })
                    }} ><LeftCircleOutlined />  <span>{trans("common:button.back")}</span></button>
                    <button className="btn-primary flex space-x-2" onClick={() => {
                        getPickerStateByPath('actions.openCorePicker')?.();
                    }}>
                        <SettingOutlined /> <span>{trans("common:button.changeFilter")}</span>
                    </button>


                    <button className="btn-primary flex space-x-2" onClick={() => {
                        PrintElem('report-content')
                    }}><PrinterOutlined /> <span>{trans("common:button.printReport")}</span></button>

                    <button className="btn-primary flex space-x-2" onClick={() => {
                        exportToExcel();

                    }}><CloudDownloadOutlined /> <span>{trans("common:button.excel")}</span></button>

                </div>
                <Breadcumb />
            </div>

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
            <div className="report-content" data-cols-width={excelOptions?.columnWidths}>
                <ReportView
                    {
                    ...{
                    }}
                />
            </div>
        }

    </div>
}


