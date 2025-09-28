import { useEffect, useMemo, useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useCoreMetaState } from "@state/metadata";

export const useCustomHTMLReport = () => {
    const [
        reportTarget,
        corePicker,
        networkUtils,
        setGlobalOverlay,
        _get
    ] = useCoreMetaState(useShallow(state => [
        state.reportTarget,
        state.corePicker,
        state.networkUtils,
        state.actions.setGlobalOverlay,
        state._get
    ]));


    const [customSource, setCustomSource] = useState();
    useEffect(() => {
        if (networkUtils && _get) {
            (async () => {
                let designContent = ''
                if (true) {
                    designContent = await _get(`/api/reports/${reportTarget.reportID}.json`).then(e => e.designContent);//Production
                    // let designContent = await _get(`/api/reports/gePaTNXyfnU.json`).then(e => e.designContent);//Test
                } else {
                    let file = await fetch(`/InjectHTML.html`);
                    designContent = await file.text();
                }





                setCustomSource(designContent);
            })()
        }
    }, [networkUtils]);

    const IFrame = () => {
        const refIframe = useRef();
        useEffect(() => {
            if (!customSource || !refIframe.current) return;
            const iframe = refIframe.current;

            let dataInject = {
                _get,
                corePicker,
                orgUnitSelectedID: corePicker.orgSelected.id,
                string_period: corePicker.periodSelected.outputDataDhis2,
                periods: corePicker.periodSelected.outputDataDhis2,
                customDhis2: {
                    report: {
                        ...corePicker,
                        organisationUnit: {
                            id: corePicker.orgSelected.id
                        }
                    }
                }
            }
            iframe?.addEventListener('load', () => {
                //Pass data to iframe
                const win = iframe.contentWindow;
                const iframeDocument = win.document

                for (var x in dataInject) {
                    win[x] = dataInject[x];
                }


                //Create custom event on ireport data injected
                const customEvent = new CustomEvent('ireportInjected', {
                    detail: dataInject,
                    bubbles: true,
                    cancelable: true
                });

                //Trigger custom
                iframeDocument.dispatchEvent(customEvent);
            });
        },
            [networkUtils, corePicker]
        )

        return <iframe
            // className="w-[100vh] h-[100vh]"
            width="100%"
            seamless=""
            sandbox="allow-same-origin allow-scripts allow-modals allow-downloads"
            allow-scripts
            allow-modals
            allow-downloads
            frameBorder="0"
            autoFocus={true}
            ref={refIframe}
            title="Custom HTML report"
            // src="https://baocao.tkyt.vn/placeholder"
            srcDoc={customSource}
        />
    }

    return {
        IFrame
    }
}