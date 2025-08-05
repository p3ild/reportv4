import { Divider, Flex, Select } from "antd";
import { useShallow } from "zustand/react/shallow";
import { useCoreMetaState } from "../../stateManage/metadataState";
import i18n, { trans } from "../../translation/i18n";

export default () => {
    const [
        version,
        language,
        setLanguage
    ] = useCoreMetaState(useShallow(state => [
        state.version, state.language,
        state.actions.setLanguage
    ]));
    return <>
        {
            version &&
            <div key={language} className=" bg-gray-100 flex flex-0 flex-none justify-between items-center p-4 !text-xs">
                <p className="text-black font-xl font-bold">{(new Date().toLocaleDateString('vi-VI', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })).toUpperCase()}
                </p>
                <p className="flex flex-row items-center text-black font-xl font-bold">
                    VERSION: {version?.versionDhis} - {version?.versionApp}
                    <Divider type="vertical" />
                    <Select
                        size="small"
                        placeholder={trans('common:selectLanguage')}
                        onChange={(val) => {
                            i18n.changeLanguage(val);
                            setLanguage(val)
                        }}
                        defaultValue={language}
                        options={[
                            { value: 'en', label: 'English' },
                            { value: 'vi', label: 'Tiếng Việt' }
                        ]}
                    />
                </p>
            </div>
        }
    </>
}