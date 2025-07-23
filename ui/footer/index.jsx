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
            <div key={language} className="flex flex-0 flex-none justify-end p-5 !text-xs">
                <div className="flex flex-row items-center">
                    VERSION: {version?.versionDhis} - {version?.versionApp}
                    <Divider type="vertical" />
                    <Select
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
                </div>
            </div>
        }
    </>
}