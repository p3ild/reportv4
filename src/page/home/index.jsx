
import { useCoreMetaState } from "@core/stateManage/metadataState";
import { Avatar, Card, Flex, List, Space, Tabs } from "antd";
import { cloneDeep } from 'lodash';
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useShallow } from "zustand/react/shallow";
import "./home.css";

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
                setActiveFolder(listFolder[0].key)
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
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t('common:reportList').toUpperCase()}</h2>
                <p className="mt-2 text-lg leading-8 text-gray-600"> {e.labelText.toUpperCase()}</p>
                <List className="h-[60vh]  overflow-auto"
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
                />
            </>
            return e;
        });

        return uiDataConverted;
    }

    return <>
        {listFolder &&
            <div className="home">
                <Card className="p-2">
                    <Tabs className="h-[70vh]"
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
                </Card>
            </div>
        }
    </>
}

const FolderView = ({ folderName, folderSize }) => {
    return <Flex align={"center"}>
        <Space size={24}>
            {
                /* <Badge className="badge" color={"#2196f3"} count={folderSize}>
                <Avatar size='small' shape="square" src={`images/folder-icon.png`} />
            </Badge> */
            }
            <div className="p-2 rounded-lg bg-gray-100 bg-opacity-50">
                <Avatar size='medium' shape="square" src={`images/folder-icon-1.png`} />
            </div>

        </Space>
        <p className="folder-title text-left">{folderName.toUpperCase()}</p>
    </Flex>

}