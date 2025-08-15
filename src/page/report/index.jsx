import { LeftCircleOutlined, PrinterOutlined, SettingOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { exportToExcel } from '@core/excelUtils';
import { useCoreMetaState } from "@core/stateManage/metadataState";
import { trans } from "@core/translation/i18n";
import { PrintElem } from "@core/utils/print";
import { compareString } from '@core/utils/stringutils';
import { Affix, Button, Cascader, Checkbox, Empty, FloatButton, Input, List, Popover, Result, Typography } from "antd";
import { cloneDeep } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSearch } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { RiFileExcel2Fill } from "react-icons/ri";
import { useNavigate } from "react-router";
import { useShallow } from "zustand/react/shallow";
import { getPickerStateByPath, useCorePickerState } from '../../core/stateManage/corePickerState';
import './report.css';
import { useListParam, useReportTarget } from "./report.hook";

import { getApprovalStateByPath, useApprovalState } from '@core/stateManage/approvalState';

import { BsGlobeAsiaAustralia } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { ButtonReponsive } from '@core/ui/custom/ButtonReponsive';



export const Report = (metadata) => {

    const navigate = useNavigate();
    let listParam = useListParam(
        {
        }
    );

    let [
        setGlobalOverlay,
    ] = useCoreMetaState(useShallow(state => [
        state.actions.setGlobalOverlay,
    ]))

    let supportApproval = useApprovalState(useShallow(state => state.supportApproval))


    let { loaded } = useReportTarget({
        listParam,
        ...metadata
    });
    let [
        reportTarget,
        excelOptions,
    ] = useCoreMetaState(useShallow(state => [
        state.reportTarget,
        state.excelOptions,
    ]))


    let { default: ReportView, errors } = reportTarget || {}

    const additionalSetting = useMemo(
        () => [
            supportApproval ? <Checkbox defaultChecked={
                getApprovalStateByPath('showButton')
            }
                onChange={(e) => {
                    getApprovalStateByPath('actions.setShowButton')?.(e.target.checked)
                }}
            >Hiện thị tính năng phê duyệt</Checkbox>
                : undefined,
            supportApproval ? <Checkbox
                defaultChecked={
                    getApprovalStateByPath('showIcon')
                }
                onChange={(e) => {
                    getApprovalStateByPath('actions.setShowIcon')?.(e.target.checked)
                }}
            >Hiển thị biểu tượng</Checkbox> : undefined
        ].filter(e => e)
        , [supportApproval]
    )

    const NavBar = () => {


        return <Affix offsetTop={50}>
            <div className='flex flex-row items-center flex-wrap mb-1 rounded-lg bg-gray-200'>
                <ButtonReponsive
                    {...{
                        Icon: <LeftCircleOutlined />,
                        buttonText: trans("common:button.back"),
                        iconOnly: true,
                        onClick: () => {
                            navigate(`/`);
                            setGlobalOverlay({
                                isOpen: false
                            })
                        }
                    }}
                />
                <ButtonReponsive
                    {...{
                        Icon: <div className='flex flex-row items-center justify-center gap-1'><BsGlobeAsiaAustralia /><FaCalendarAlt /></div>,
                        buttonText: trans("common:button.changeFilter"),
                        onClick: () => {
                            getPickerStateByPath('actions.openCorePicker')?.();
                        }
                    }}
                />
                <ReportList type="cascader" />

                <ButtonReponsive
                    {...{
                        Icon: <PrinterOutlined />,
                        buttonText: trans("common:button.printReport"),
                        onClick: () => {
                            PrintElem('report-content')
                        }
                    }}
                />

                <ButtonReponsive
                    {...{
                        Icon: <RiFileExcel2Fill />,
                        buttonText: trans("common:button.excel"),
                        onClick: () => {
                            exportToExcel();
                        }
                    }}
                />
                {
                    additionalSetting.length > 0 && <Popover
                        trigger={'hover'}
                        content={
                            <div className='flex flex-col gap-2'>
                                {
                                    additionalSetting.map((e, idx) => {
                                        return <div key={idx}>{e}</div>
                                    })
                                }
                            </div>
                        }>
                        <Button className="btn-primary flex-none gap-2">
                            <SettingOutlined /><span className='whitespace-nowrap desktopLow:hidden'>{trans("Cài đặt khác")}</span>
                        </Button>
                    </Popover>
                }
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
            extra={<Button className="btn-primary space-x-2"
                onClick={() => {
                    navigate(`/`);
                }} ><UnorderedListOutlined /> <span>Quay lại danh sách </span></Button>
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

    const [setCorePicker, setOrgPickerConfig, setCustomPicker, setOrgTreeData, openCorePicker] = useCorePickerState(useShallow(state => [
        state.actions.setCorePicker,
        state.actions.setOrgPickerConfig,
        state.actions.setCustomPicker,
        state.actions.setOrgTreeData,
        state.actions.openCorePicker
    ]
    ));

    const [searchValue, setSearchValue] = useState('');
    const onReportClick = (item) => {
        // Reset report config
        setReportTarget(undefined);
        setCorePicker({
            pickCompleted: undefined
        })
        setOrgPickerConfig(undefined);
        setCustomPicker(undefined);
        setOrgTreeData(undefined);
        // setAllowPeriodTypes([]);

        openCorePicker();

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

    const filter = (inputValue, path) => {
        const cleanInput = compareString.cleanStr(inputValue)
        return path.some(e => {
            let cleanName = compareString.cleanStr(e.label);
            return cleanName.includes(cleanInput)
        })
    }

    useEffect(() => {
        setSearchValue('');
    }, [activeFolder])

    if (type == "cascader" && reportTarget?.reportID) {
        let tempListFolder = cloneDeep(listFolder);
        let targetFolder = tempListFolder.find(e => e.child?.some(x => x.key == reportTarget.reportID));

        return tempListFolder && targetFolder && <Cascader
            className="flex-grow"
            size='medium'
            {
            ...{
                autoClearSearchValue: true,
                allowClear: true,
                showSearch: { filter },
            }
            }
            options={
                tempListFolder.filter(e => e?.child && e?.child?.length != 0)
                    .map((e) => {
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
            allowClear={false}
            defaultValue={[targetFolder?.key, reportTarget.reportID]}
            displayRender={(label) => {
                let fullLabel = label.map((e, idx, arrLabel) => {
                    return <p key={idx} className='flex flex-row'>
                        <span className='font-bold'>{(e.toUpperCase())}</span>
                        <span>{arrLabel.length - 1 != idx && `/`} </span>
                    </p>
                });

                let lastLabel = label[label.length - 1];
                return <div className="flex flex-row text-sm">
                    <p className='font-bold flex flex-row desktopLow:hidden whitespace-nowrap'>{fullLabel}</p>
                    <p className='font-bold hidden desktopLow:block whitespace-nowrap'>{lastLabel}</p>
                </div >
            }}
            onChange={(selectedKeys, info, extra) => {
                if (info[info.length - 1].disabled) return;
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
    let listChild = useMemo(() => (targetFolder?.child || [])
        .map(item => {

            return {
                key: item.id,
                value: item.id,
                label: item.displayName.toUpperCase(),
                link: item.link,
                path: item.path
            }
        })
        .filter(
            e => !searchValue ? true :
                (
                    compareString.cleanStr(e.label).includes(compareString.cleanStr(searchValue))//By name
                    // || compareString.cleanStr(e.path).includes(compareString.cleanStr(searchValue))//By path
                    // || compareString.cleanStr(e.link).includes(compareString.cleanStr(searchValue))//By link
                    // || compareString.cleanStr(e.key).includes(compareString.cleanStr(searchValue))//By key
                )
        ).map(e => {
            return {
                ...e,
                label: <p className="w-full text-xl !text-black group-hover:font-bold">{e.label}</p>
            }
        })
        , [targetFolder?.child, searchValue]);

    return targetFolder &&
        <div className="h-full w-full flex flex-col gap-2 justify-center gap-y-4">
            <div className='flex flex-col gap-2 justify-between'>
                <div className='flex flex-row gap-2 items-center'>
                    <div>
                        <p className="font-bold tracking-tight text-black/80 sm:text-3xl">{t('common:reportList').toUpperCase()}</p>
                        <Input
                            value={searchValue}
                            allowClear
                            size='large'
                            className='group items-center rounded-xl justify-center w-[550px]'
                            prefix={<div className='flex flex-row items-center justify-center'>
                                <p className='text-lg leading-8 flex flex-row items-center '>{forderName.toUpperCase()} </p>
                                <FaSearch className='ml-3 h-5 w-5 group-hover:text-primary' />
                            </div>}
                            placeholder={'Tìm kiếm báo cáo'}
                            onChange={(target) => {
                                let value = target.currentTarget.value;
                                setSearchValue(value)
                            }}
                            onClear={() => {
                                setSearchValue(undefined)
                            }}
                        />
                    </div>
                </div>
            </div>



            {listChild.length > 0
                ? <div className="h-full p-2 flex flex-col overflow-auto shadow-lg border rounded-xl">
                    {listChild.map((item, childKey) => {
                        return <div key={childKey}>
                            <div className={`group ${childKey % 2 != 0 ? `bg-gray-100 rounded` : ""}`}>
                                <div className={"items-center p-2 flex flex-row gap-2 "}
                                    onClick={onReportClick.bind(this, [item])}>
                                    <div className="group-hover:h-[30px] group-hover:mr-[2px]  w-[5px] bg-primary rounded-full" />
                                    <HiOutlineDocumentText className="w-10 h-10 text-black group-hover:rounded-lg" />
                                    {item.label}
                                </div>
                            </div>

                        </div>
                    })}
                </div>
                : <Empty className="" description={<p className="text-2xl font-bold">{t('common:noReport')}</p>} />
            }
        </div>
}