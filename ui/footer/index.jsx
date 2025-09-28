import { Divider, Flex, Select } from "antd";
import { useShallow } from "zustand/react/shallow";
import { getCoreMetaStateByPath, useCoreMetaState } from "../../stateManage/metadataState";
import i18n, { trans } from "../../translation/i18n";
import { FaLanguage } from "react-icons/fa6";
import Flag from "react-flagkit";
import { TbVersionsFilled } from "react-icons/tb";
import { GoVersions } from "react-icons/go";
import { BsStack } from "react-icons/bs";
import { HiRectangleStack } from "react-icons/hi2";


export default () => {
    const [
        language,
        systemSettings,
        setLanguage,
        isSuperuser
    ] = useCoreMetaState(useShallow(state => [
        state.language,
        state.systemSettings,
        state.actions.setLanguage,
        state.me?.isSuperuser
    ]));


    const textStyle = `text-black whitespace-break-spaces  uppercase text-xs desktopLow:text-md`;

    return <>
        {
            systemSettings &&
            <div key={language} className="bg-gray-100 flex flex-0 flex-none justify-between items-center p-1 px-4 gap-4">
                <p className={textStyle}>{(`Hôm nay: ` + new Date().toLocaleDateString('vi-VI', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }))
                    .toUpperCase()
                }
                </p>

                <p className={textStyle}>
                    <span>
                        {`Dữ liệu cập nhật `}
                    </span>
                    {
                        new Date(systemSettings?.keyLastSuccessfulAnalyticsTablesUpdate).toLocaleDateString('vi-VI', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            // second: 'numeric'
                        })
                    }</p>
                <div className={"flex flex-row gap-1 text-black flex-wrap " + textStyle}>
                    <div className="flex flex-row items-center pl-1"><HiRectangleStack className="h-5 w-5" /> <p>v{systemSettings?.versionApp} - DHIS{systemSettings?.versionDhis}</p></div>
                    <Select
                        prefix={<div className="flex flex-row items-center gap-2"><FaLanguage size={20} />
                            <div className="bg-gray-500 h-[1rem] w-[2px]" /> </div>}
                        size="small"
                        className={textStyle + ' w-fit'}
                        placeholder={trans('common:selectLanguage')}
                        onChange={(val) => {
                            i18n.changeLanguage(val);
                            setLanguage(val)
                        }}
                        defaultValue={language}
                        options={[
                            { value: 'vi', label: <div className={"flex flex-row flex-wrap items-center gap-2 w-fit " + textStyle}><Flag country="VN" size={20} />{false && `Tiếng Việt`}</div> },
                            { value: 'en', disabled: !isSuperuser, label: <div className={"flex flex-row items-center gap-2 w-fit " + textStyle}><Flag country="US" size={20} />{false && `English`}</div> },
                        ]}
                    />
                </div>
            </div>
        }
    </>
}