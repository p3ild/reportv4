
import { useCoreMetaState } from "@core/stateManage/metadataState";
import { Avatar, Empty, Tabs } from "antd";
import { cloneDeep } from 'lodash';
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useShallow } from "zustand/react/shallow";
import "./home.css";
import { HiDocumentChartBar } from "react-icons/hi2";


export const Home = () => {
    const navigate = useNavigate();
    const [
        instanceTarget,
        me,
        listFolder,
        activeFolder,
        setActiveFolder
    ] = useCoreMetaState(useShallow(state => ([
        state.instanceTarget,
        state.me,
        state.listFolder,
        state.activeFolder,
        state.actions.setActiveFolder,
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
            }

            if (activeFolder != '') {
                setActiveFolder(activeFolder)
            } else {
                setActiveFolder(listFolder.find(e => e?.child?.length > 0)?.key)
            }
        })()


    }, [JSON.stringify(listFolder)]);

    const convertApiDataToDataAsTree = () => {
        let uiDataConverted = cloneDeep(listFolder).map(e => {
            !e.child && (e.child = [])
            e.labelText = t(`folderName.${e.key}`, {
                ns: "INSTANCE_TRANS",
                defaultValue: e.labelText || e.label
            }).toUpperCase();
            e.label = <FolderView folderName={e.labelText} folderSize={e.child.length} />;
            let dataSource = e.child.map(item => {
                return {
                    key: item.id,
                    label: item.displayName,
                    link: item.link,
                    path: item.path
                }
            });
            e.children = <>
                {/* <List className="h-[90%] overflow-auto"
                    bordered
                    itemLayout="horizontal"
                    dataSource={dataSource}
                    renderItem={(item, index) => (
                        <List.Item className='report-title' onClick={onReportClick.bind(this, [item])}>
                            <img className='icon-report' src="images/report-icon.svg" />
                            <List.Item.Meta
                                title={<p className='report-title'>{item.label}</p>}
                            />
                        </List.Item>
                    )}
                /> */}
            </>
            return e;
        });

        return uiDataConverted;
    }


    const ReportList = () => {
        let targetFolder = listFolder.find(e => e.key == activeFolder)
        if (!targetFolder) return null;
        let forderName = t(`folderName.${targetFolder.key}`, {
            ns: "INSTANCE_TRANS",
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
                <p className="mt-2 text-lg leading-8 text-gray-600"> {forderName.toUpperCase()}</p>
                {listChild.length > 0
                    ? <div className="h-full p-2 overflow-scroll overflow-x-hidden  mr-3 flex flex-col gap-2 shadow-lg border rounded-lg">
                        {listChild.map((item, childKey) => {
                            return <div key={childKey}
                                className=" group rounded-lg hover:bg-[#2673a7] hover:!text-white hover:ml-2 hover:text-lg hover:font-bold  items-center p-2 flex flex-row gap-2" onClick={onReportClick.bind(this, [item])}>
                                <HiDocumentChartBar className="w-12 h-12 text-gray-800 group-hover:text-white" />
                                <p className="w-full text-2xl group-hover:text-white">{item.label}</p>
                            </div>
                        })}
                    </div>
                    : <Empty className="" description={<p className="text-2xl font-bold">{t('common:noReport')}</p>} />
                }

            </div>

    }
    return <>
        {listFolder &&
            <div className="home py-5 h-full flex flex-row">
                <Tabs
                    className="!h-full"
                    tabPosition={"left"}
                    items={convertApiDataToDataAsTree(listFolder)}
                    onChange={
                        (value) => {
                            setActiveFolder(value)
                        }
                    }
                    activeKey={activeFolder}
                    defaultActiveKey={activeFolder}
                />
                <ReportList />
            </div>
        }
    </>
}

// FolderView rewritten using Tailwind flex utilities
const FolderView = ({ folderName, folderSize }) => {
    return (
        <div className="flex items-center">
            <div className="p-2 rounded-lg bg-gray-100 bg-opacity-50 mr-6">
                <Avatar size="medium" shape="square" src="images/folder-icon-1.png" />
            </div>
            <p className="folder-title text-left">{folderName.toUpperCase()}</p>
        </div>
    )
}