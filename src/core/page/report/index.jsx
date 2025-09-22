import { useCoreMetaState } from "@core/stateManage/metadataState";
import { compareString } from '@core/utils/stringutils';
import { Button, Cascader, Empty, FloatButton, Input, List, Popover, Result, Tooltip, Typography } from "antd";
import { cloneDeep } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSearch } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { useNavigate } from "react-router";
import { useShallow } from "zustand/react/shallow";
import { useCorePickerState } from '@core/stateManage/corePickerState';
import './report.css';
import { useListParam, useReportTarget } from "./report.hook";

import { NavBar } from './NavBar';
import { UnorderedListOutlined } from '@ant-design/icons';



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
                    </List.Item>
                )}
            />}
            extra={<Button className="btn-primary space-x-2"
                onClick={() => {
                    navigate(`/`);
                }} ><UnorderedListOutlined /> <span>Quay lại danh sách </span></Button>
            }

        />}
        <div>
            <FloatButton.BackTop {
                ...{
                    target: () => {
                        return document.getElementsByClassName('report-content')[0]
                    },
                    visibilityHeight: 200,
                    style: {
                        width: '50px',
                        height: '50px'
                    }
                }
            }
            />
        </div>

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




export function ReportList({ type }) {
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

    const [corePicker, setCorePicker, setOrgPickerConfig, setCustomPicker, setOrgTreeData, openCorePicker] = useCorePickerState(useShallow(state => [
        state.corePicker,
        state.actions.setCorePicker,
        state.actions.setOrgPickerConfig,
        state.actions.setCustomPicker,
        state.actions.setOrgTreeData,
        state.actions.openCorePicker
    ]
    ));

    const [searchValue, setSearchValue] = useState('');
    const { t, i18n } = useTranslation();

    let targetFolder = listFolder.find(e => e.key == activeFolder) || listFolder[0];
    let listChild = useMemo(() => {
        if (!targetFolder?.child) return [];
        return (targetFolder.child || [])
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
                        compareString.cleanStr(e.label).includes(compareString.cleanStr(searchValue))
                    )
            ).map(e => {
                return {
                    ...e,
                    label: <p className="w-full text-xl !text-black group-hover:font-bold">{e.label}</p>
                }
            })
    }, [targetFolder?.child, searchValue]);

    useEffect(() => {
        setSearchValue('');
    }, [activeFolder])
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

    const filter = (inputValue, path) => {
        const cleanInput = compareString.cleanStr(inputValue)
        return path.some(e => {
            let cleanName = compareString.cleanStr(e.label);
            return cleanName.includes(cleanInput)
        })
    }

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
                    <div className='font-bold hidden desktopLow:block whitespace-nowrap'>
                        <Popover
                            content={
                                <p className="flex flex-row text-sm p-2">
                                    <span className='font-bold flex flex-row '>{fullLabel}</span>
                                </p>
                            }
                        >
                            <p>{lastLabel}</p>
                        </Popover>

                    </div>

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

    if (!targetFolder) return null;
    let forderName = t(`folderName.${targetFolder.key}`, {
        defaultValue: targetFolder.labelText || targetFolder.label
    }).toUpperCase();

    return targetFolder &&
        <div className="h-full w-full flex flex-col gap-2 justify-center gap-y-4">
            <div className='flex flex-col gap-2 justify-between'>
                <div className='flex flex-col gap-2'>
                    <p className="font-bold tracking-tight text-black/80 sm:text-3xl">{t('common:reportList').toUpperCase()}</p>
                    <Input
                        value={searchValue}
                        allowClear
                        size='large'
                        className='group items-center rounded-xl justify-center w-[550px]'
                        prefix={<div className='flex flex-row items-center justify-center text-sm'>
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

