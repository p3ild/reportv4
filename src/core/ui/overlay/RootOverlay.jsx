import { Flex, notification, Spin } from "antd";
import { useEffect, useMemo, useRef } from "react";
import { useShallow } from "zustand/react/shallow";
import { useCoreMetaState } from "../../stateManage/metadataState";
import CorePicker from "../picker/corePicker";
import { useCorePickerState } from "@core/stateManage/corePickerState";
import { trans } from "@core/translation/i18n";

export const OVERLAY_TYPE = {
    LOADING: {
        isLoading: true,
        current: 0,
        total: 100
    }
}



export const ROOT_OVERLAY_TEMPLATE = {
    DEFAULT: {
        key: "DEFAULT",
        content: <div className='px-10 py-10 text-center' >
            <Spin size={"large"}></Spin>
        </div>
    },
    PROGRESS: {
    }
}

export default (props) => {

    const [
        globalOverlay
    ] = useCoreMetaState(useShallow(state => ([
        state.globalOverlay,
    ])));

    const [setGlobalOverlay] = useCoreMetaState(useShallow(state => ([

        state.actions.setGlobalOverlay])));

    const [
        corePicker,
        setCorePicker] = useCorePickerState(useShallow(state => ([
            state.corePicker,
            state.actions.setCorePicker
        ])));

    const { orgSelected, periodSelected } = corePicker
    const type = globalOverlay?.type || ROOT_OVERLAY_TEMPLATE.DEFAULT
    const title = globalOverlay.title || type.title

    let refDialog = useRef();
    let refContent = useRef();


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!globalOverlay.closeable) return;
            if (
                refDialog.current && refDialog.current.contains(event.target) &&
                (!refContent.current || !refContent.current.contains(event.target))
            ) {
                setGlobalOverlay({
                    ...globalOverlay,
                    isOpen: false
                })
            }
        };

        if (globalOverlay?.isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [globalOverlay?.isOpen]);

    return <>
        {<div className={(globalOverlay?.isOpen ? "relative z-10" : "w-[0px] h-[0px] hidden")}
            aria-labelledby="modal-title" role="dialog" aria-modal="true"
        >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div ref={refDialog} className="w-screen fixed inset-0 z-10 ">
                <div className="flex h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className={`w-[400px] desktopLow:w-[500px] relative transform overflow-hidden rounded-lg bg-white text-left  transition-all sm:my-8  ${type?.key == ROOT_OVERLAY_TEMPLATE.DEFAULT.key ? 'bg-opacity-0' : 'shadow-xl bg-opacity-90'}`}>
                        <div gap={10} id={'flex-content flex flex-row'} ref={refContent} >
                            {(title || globalOverlay.closeable) &&
                                <div className="p-2 flex items-center justify-between flex-row w-full border-b-1 border-gray-400 bg-gray-600">
                                    {title && <h3 className="p-2 text-white"> {title}</h3>}
                                    {globalOverlay?.closeable &&
                                        <div >
                                            <button className="text-neutral-500 hover:text-neutral-800 hover:no-underline focus:text-neutral-800 focus:opacity-100 focus:shadow-none focus:outline-none"
                                                onClick={() => {
                                                    setGlobalOverlay({
                                                        ...globalOverlay,
                                                        isOpen: false
                                                    })
                                                }}>
                                                <span className="[&>svg]:h-6 [&>svg]:w-6 text-white">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </span>
                                            </button>
                                        </div>
                                    }
                                </div>
                            }

                            {
                                type.key == 'corePicker' && <CorePicker />
                            }

                            {
                                <div className={type.key != 'corePicker' ? "" : "hidden"}>
                                    {type?.content}
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>}
    </>
}
