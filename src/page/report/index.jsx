import { CloudDownloadOutlined, LeftCircleOutlined, PrinterOutlined, SettingOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { exportToExcel } from '@core/excelUtils';
import { useCoreMetaState } from "@core/stateManage/metadataState";
import { trans } from "@core/translation/i18n";
import { PrintElem } from "@core/utils/print";
import { Affix, Cascader, Empty, FloatButton, List, Result, Typography } from "antd";
import { cloneDeep, upperFirst } from 'lodash';
import { useTranslation } from 'react-i18next';
import { HiOutlineDocumentText } from "react-icons/hi2";
import { useNavigate } from "react-router";
import { useShallow } from "zustand/react/shallow";
import { getPickerStateByPath, useCorePickerState } from '../../core/stateManage/corePickerState';
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
                <ReportList type="cascader" />
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




export const ReportList = ({ type }) => {
    const navigate = useNavigate();

    const [
        listFolder,
        activeFolder,
        instanceTarget,
        reportTarget,
        setReportTarget

    ] = useCoreMetaState(useShallow(state => ([
        state.listFolder,
        state.activeFolder,
        state.instanceTarget,
        state.reportTarget,
        state.actions.setReportTarget

    ])));

    const [setCorePicker, setAllowPeriodTypes, setOrgTreeData, openCorePicker] = useCorePickerState(useShallow(state => [
        state.actions.setCorePicker,
        state.actions.setAllowPeriodTypes,
        state.actions.setOrgTreeData,
        state.actions.openCorePicker
    ]
    ))

    const onReportClick = (item) => {
        let reportSelected = item[0];

        let reportID = reportSelected.key;
        let reportConfig = instanceTarget.listReport.find(e => e.key == reportID);

        if (reportConfig) {
            navigate(`/report?id=${reportID}`, { state: { refresh: Date.now() } });
        } else {
            //Use external report - DHIS2 REPORT
            // navigate('/privacy-policy');
            window.location.replace(reportSelected.link)
        }
    }
    const { t, i18n } = useTranslation();



    if (type == "cascader" && reportTarget?.reportID) {
        let tempListFolder = cloneDeep(listFolder);
        let targetFolder = tempListFolder.find(e => e.child?.some(x => x.key == reportTarget.reportID));

        return tempListFolder && targetFolder && <Cascader
            className="w-fit"
            options={
                tempListFolder.filter(e => e?.child && e?.child?.length != 0)
                    .map(e => {
                        return {
                            label: e.label,
                            value: e.key,
                            children: e.child.map(item => {
                                return {
                                    key: item.id,
                                    disabled: reportTarget?.reportID == item.id,
                                    value: item.id,
                                    label: item.displayName,
                                    link: item.link,
                                    path: item.path
                                }
                            })
                        }
                    })}
            defaultValue={[targetFolder?.key, reportTarget.reportID]}
            variant="borderless"
            displayRender={(label) => {
                return <div className="flex flex-row whitespace-pre-wrap text-lg">
                    {label.map((e, idx, arrLabel) => {
                        return <p key={idx} className='font-bold'>{e}<span className='mx-2'>{arrLabel.length - 1 != idx && `/`} </span></p>
                    })}
                </div>
            }}
            onChange={(selectedKeys, info, extra) => {
                if (info[info.length - 1].disabled) return;
                // Reset report config
                setReportTarget(undefined);
                setCorePicker({
                    pickCompleted: undefined
                })
                setOrgTreeData(undefined);
                // setAllowPeriodTypes([]);
                openCorePicker();
                onReportClick([
                    info[info.length - 1]
                ])
            }}
        />
    }

    let targetFolder = listFolder.find(e => e.key == activeFolder) || listFolder[0]
    if (!targetFolder) return null;
    let forderName = t(`folderName.${targetFolder.key}`, {
        defaultValue: targetFolder.labelText || targetFolder.label
    }).toUpperCase();
    let listChild = (targetFolder?.child || []).map(item => {
        return {
            key: item.id,
            value: item.id,
            label: item.displayName,
            link: item.link,
            path: item.path
        }
    });

    return targetFolder &&
        <div className="h-full w-full flex flex-col gap-2 justify-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t('common:reportList').toUpperCase()}</h2>
            <p className="text-lg leading-8 text-gray-600"> {forderName.toUpperCase()}</p>
            {listChild.length > 0
                ? <div className="h-full p-2 flex flex-col overflow-auto shadow-lg border rounded-lg">
                    {listChild.map((item, childKey) => {
                        return <div key={childKey}>
                            <div
                                className=" group rounded-lg hover:text-lg hover:bg-gray-100 items-center p-2 flex flex-row gap-2"
                                onClick={onReportClick.bind(this, [item])}>
                                <div className="group-hover:h-[30px] group-hover:mr-[1px]  w-[5px] bg-primary rounded-full" />
                                <HiOutlineDocumentText className="w-10 h-10 text-black " />
                                <p className="w-full text-xl text-black ">{item.label.toUpperCase()}</p>
                            </div>
                            <div className="h-[1px] w-full place-self-center rounded-lg bg-gray-200 m-1"></div>
                        </div>
                    })}
                </div>
                : <Empty className="" description={<p className="text-2xl font-bold">{t('common:noReport')}</p>} />
            }
        </div>
}