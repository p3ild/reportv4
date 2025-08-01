
import { useCoreMetaState } from "@core/stateManage/metadataState";
import { Avatar, Empty, Tabs } from "antd";
import { cloneDeep } from 'lodash';
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useShallow } from "zustand/react/shallow";
import "./home.css";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { LuFolderClosed, LuFolderOpen } from "react-icons/lu";
import { useCorePickerState } from "@core/stateManage/corePickerState";



export const Home = () => {
    const navigate = useNavigate();
    const [
        instanceTarget,
        me,
        listFolder,
        activeFolder,
        setActiveFolder,
        setReportTarget
    ] = useCoreMetaState(useShallow(state => ([
        state.instanceTarget,
        state.me,
        state.listFolder,
        state.activeFolder,
        state.actions.setActiveFolder,
        state.actions.setReportTarget
    ])));

    const [
        setCorePicker,
        setAllowPeriodTypes
    ] = useCorePickerState(useShallow(state => ([
        state.actions.setCorePicker,
        state.actions.setAllowPeriodTypes
    ])));
    const { t, i18n } = useTranslation();
    const onReportClick = (item) => {
        let reportSelected = item[0];

        let reportID = reportSelected.key;
        let reportConfig = instanceTarget.listReport.find(e => e.key == reportID);

        if (reportConfig) {

            navigate(`/report?id=${reportID}`);
        } else {
            //Use external report - DHIS2 REPORT
            // navigate('/privacy-policy');
            window.location.replace(reportSelected.link)
        }
    }

    useEffect(
        () => {
            // Reset report config
            setReportTarget(undefined);
            setCorePicker({
                pickCompleted: undefined
            })
            setAllowPeriodTypes(undefined);
        },
        []
    );



    useEffect(e => {
        ; (async () => {
            let menuActiveItem;

            switch (true) {
                case me?.userGroups.some(e => ['OJRj6iaAEwE'].includes(e.id)): {//user group xa
                    menuActiveItem = 'bcx';
                    break;
                }
                default:
                    menuActiveItem = 'bch-bct';
                    break;
            }


            if (instanceTarget?.locale) {
                await i18n?.addResourceBundle('en', 'INSTANCE_TRANS', instanceTarget?.locale?.en || {});
                await i18n?.addResourceBundle('vi', 'INSTANCE_TRANS', instanceTarget?.locale?.vi || {});
                await i18n.loadNamespaces('INSTANCE_TRANS')
            }

            if (activeFolder != '') {
                setActiveFolder(activeFolder)
            } else {
                setActiveFolder(listFolder.find(e => e?.child?.length > 0)?.key)
            }
        })()


    }, [JSON.stringify(listFolder)]);



    const ReportList = () => {
        let targetFolder = listFolder.find(e => e.key == activeFolder)
        if (!targetFolder) return null;
        let forderName = t(`folderName.${targetFolder.key}`, {
            defaultValue: targetFolder.labelText || targetFolder.label
        }).toUpperCase();
        let listChild = (targetFolder?.child || []).map(item => {
            return {
                key: item.id,
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
                    ? <div className="h-full p-1 overflow-scroll overflow-x-hidden flex flex-col shadow-lg border rounded-lg">
                        {listChild.map((item, childKey) => {
                            return <div key={childKey}>
                                <div
                                    className=" group rounded-lg hover:bg-[#4c7aff] hover:ml-2 hover:text-lg hover:font-bold  items-center p-2 flex flex-row gap-2"
                                    onClick={onReportClick.bind(this, [item])}>
                                    <HiOutlineDocumentText className="w-10 h-10 text-black group-hover:text-white" />
                                    <p className="w-full text-xl text-black group-hover:text-white">{item.label}</p>
                                </div>
                                <div className="h-[1px] w-full place-self-center rounded-lg bg-gray-200 m-1"></div>
                            </div>
                        })}
                    </div>
                    : <Empty className="" description={<p className="text-2xl font-bold">{t('common:noReport')}</p>} />
                }

            </div>
    }

    const FolderList = () => {
        return <div className="h-full w-[25vw] flex flex-col gap-2 justify-center">
            <div className="h-full p-2 overflow-scroll overflow-x-hidden flex flex-col gap-2 rounded-lg">
                {listFolder.map((item, childKey) => {
                    let forderName = t(`folderName.${item.key}`, {
                        ns: "INSTANCE_TRANS",
                        defaultValue: item.labelText || item.label
                    }).toUpperCase();
                    return <div key={childKey}>
                        <div
                            className={[
                                'group rounded-xl hover:text-lg hover:font-bold items-center p-2 flex flex-row gap-2',
                                item.key === activeFolder ? 'bg-[#4c7aff] text-white' : 'hover:bg-black/10',

                            ].join(' ')}
                            onClick={() => setActiveFolder(item.key)}
                        >
                            <div className="p-2  bg-opacity-50 text-4xl">
                                {item.key === activeFolder ? <LuFolderOpen /> : <LuFolderClosed />}
                            </div>
                            <p className="w-full text-xl font-bold">{forderName}</p>
                        </div>
                    </div>
                })}
            </div>
        </div>
    }

    return <>
        {listFolder &&
            <div className="home p-5 h-full flex flex-row gap-2">
                <FolderList />
                <div className="w-[2px] h-full place-self-center rounded-lg bg-gray-200"></div>
                <ReportList />
            </div>
        }
    </>
}

