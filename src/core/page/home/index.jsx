
import { useCoreMetaState } from "@core/stateManage/metadataState";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/react/shallow";
import "./home.css";
import { LuFolderClosed, LuFolderOpen } from "react-icons/lu";
import { ReportList } from "../report";



export const Home = () => {
    const [
        instanceTarget,
        me,
        listFolder,
        activeFolder,
        setActiveFolder,
    ] = useCoreMetaState(useShallow(state => ([
        state.instanceTarget,
        state.me,
        state.listFolder,
        state.activeFolder,
        state.actions.setActiveFolder,
    ])));
    const { t, i18n } = useTranslation();


    useEffect(
        () => {

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







    return <>
        {listFolder &&
            <div className="home p-5 h-full flex flex-row gap-2">
                <FolderList />
                <div className="w-[1px] h-full place-self-center rounded-lg bg-gray-200"></div>
                <ReportList />
            </div>
        }
    </>
}



export const FolderList = ({ }) => {
    const [

        listFolder,
        activeFolder,
        setActiveFolder,
    ] = useCoreMetaState(useShallow(state => ([
        state.listFolder,
        state.activeFolder,
        state.actions.setActiveFolder,
        state.actions.setReportTarget
    ])));

    const { t, i18n } = useTranslation();


    return listFolder && <div className="h-full w-[25vw] overflow-auto flex flex-col gap-2 justify-center">
        <div className="h-full p-2 flex flex-col gap-2 rounded-lg">
            {listFolder.map((item, childKey) => {
                let forderName = t(`folderName.${item.key}`, {
                    ns: "INSTANCE_TRANS",
                    defaultValue: item.labelText || item.label
                }).toUpperCase();
                return <div key={childKey}>
                    <div
                        className={[
                            'group rounded-xl hover:text-lg hover:font-bold items-center p-2 flex flex-row gap-2',
                            item.key === activeFolder ? 'bg-primary text-white' : 'hover:bg-black/10',

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

