import { DownOutlined } from '@ant-design/icons';
import { Cascader, Flex, Spin } from "antd";
import { cloneDeep, debounce, flatten } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useCorePickerState } from "../../../stateManage/corePickerState";
import { useCoreMetaState } from "../../../stateManage/metadataState";
import { trans } from "../../../translation/i18n";
import { CustomCard } from "../../utils/customCard";
import CustomPickerElement from "../CustomPickerElement";
import './orgpicker.css';
import { compareString } from '@core/utils/stringutils';

export function useOrgTreeByUser() {
    const [
        networkUtils,
        me,
    ] = useCoreMetaState(useShallow(state => (
        [
            state.networkUtils,
            state.me,
        ]
    )));

    const [
        orgPickerConfig
    ] = useCorePickerState(useShallow(state => ([
        state.orgPickerConfig,
    ])))

    const [
        customPicker,
        corePicker,
        setCorePicker] = useCorePickerState(
            useShallow(state => ([
                state.customPicker,
                state.corePicker,
                state.actions.setCorePicker,
            ])));


    let [orgTreeData, setOrgTreeData] = useState();
    const generateEachOrgData = useCallback(({
        orgTarget,
        ORG_TREE_DEEP
    }) => {
        let { orgGroupVisible, levelsToHideIfEmpty } = orgPickerConfig || {}
        if (orgGroupVisible?.length > 0) {
            let groupInclude = orgGroupVisible.filter(e => !e.includes('!'));
            let groupExclude = orgGroupVisible.filter(e => e.includes('!')).map(e => e.replace('!', ''));
            let invisibleByOrgGroup =
                orgTarget.organisationUnitGroups.every(x => groupInclude.length > 0 && !groupInclude.includes(x.id))
                ||
                orgTarget.organisationUnitGroups.some(x => groupExclude.length > 0 && groupExclude.includes(x.id));
            if (
                orgTarget.level != 1 && invisibleByOrgGroup
            ) {
                return undefined
            }
        }



        orgTarget['title'] = generateOrgTitle(orgTarget)
        orgTarget['label'] = generateOrgTitle(orgTarget)
        orgTarget['value'] = orgTarget.id + '_' + orgTarget.title;
        let isHaveChild = orgTarget?.children?.length > 0

        orgTarget.children = orgTarget?.children?.map(orgChild => generateEachOrgData({ orgTarget: orgChild }))
            .filter(e => e != undefined)
            .sort((a, b) => {
                if (a.displayName < b.displayName) { return -1; }
                if (a.displayName > b.displayName) { return 1; }
                return 0;
            });
        if (!isHaveChild && levelsToHideIfEmpty && levelsToHideIfEmpty?.includes(orgTarget.level)
            && (
                !orgTarget?.children ||
                orgTarget?.children?.length == 0
            )) {
            return undefined;
        }
        return orgTarget

        function generateOrgTitle(org) {
            let orgTitle = [
                orgTarget.displayName,
            ]

            return orgTitle.join(' ');
        }
    })
    const prepareData = () => {
        if (!me?.orgViewData) return
        orgTreeData = cloneDeep(me?.orgViewData)?.map(e => {
            return e?.organisationUnits.map(x => {
                let orgMapped = generateEachOrgData({
                    orgTarget: x
                });
                return orgMapped
            });
        }).filter(e => e != undefined);
        let resultOrgTree = flatten(orgTreeData).filter(e => e);
        if (!resultOrgTree || resultOrgTree.length == 0) {
            setCorePicker({
                orgSelected: undefined
            })
        }
        // if (overrideOrgTreeDataAfterConverted) orgTreeData = overrideOrgTreeDataAfterConverted({ orgTreeData, me })
        return resultOrgTree
    }

    useEffect(
        () => {
            if (!me?.orgViewData) return;
            if (networkUtils && me?.orgViewData) {
                let orgTreeDt = prepareData();
                setOrgTreeData(orgTreeDt);
            }
        }, [
        me?.orgViewData,
        orgPickerConfig
    ]);

    return { orgTreeData, setCorePicker, networkUtils, corePicker }
}

export default (props) => {
    let { onSelected } = props
    const { orgTreeData, setCorePicker, corePicker } = useOrgTreeByUser();
    let [value, setValue] = useState(undefined);
    let [currentPath, setCurrentPath] = useState([]);
    let [expandedKeys, setTreeExpandedKeys] = useState();

    const [orgPickerConfig] = useCorePickerState(useShallow(state => ([
        state.orgPickerConfig,
    ])))

    const getDefaultValue = () => {
        if (!orgTreeData?.[0]) {
            return 'Không có đơn vị hỗ trợ xuất báo cáo'
        }

        const rootOrg = orgTreeData[0]
        const rootPath = [`${rootOrg.id}_${rootOrg.displayName}`]

        const targetPath = expandedKeys || corePicker?.orgSelected?.path || rootPath

        let foundOrg = null;
        if (targetPath && Array.isArray(targetPath)) {
            let currentOrg = null

            for (const pathSegment of targetPath) {
                if (!currentOrg) {
                    currentOrg = orgTreeData.find(org => org.value === pathSegment)
                } else {
                    currentOrg = currentOrg.children?.find(org => org.value === pathSegment)
                }
                if (!currentOrg) {
                    break
                }
            }

            foundOrg = currentOrg
        }

        if (foundOrg) {
            foundOrg.path = targetPath
            setCorePicker({ orgSelected: foundOrg })
            setCurrentPath(targetPath)
            return targetPath
        } else {
            rootOrg.path = rootPath;
            setCorePicker({ orgSelected: rootOrg })
            setCurrentPath(rootPath)
            return rootPath
        }
    }

    const filter = (inputValue, path) => {
        const cleanInput = compareString.cleanStr(inputValue)
        return path.some(e => {
            let cleanName = compareString.cleanStr(e.name);
            return cleanName.includes(cleanInput)
        })
    }


    const onChange = (selectedKeys, info, extra) => {
        let orgTarget = info[info.length - 1];
        setValue(selectedKeys[selectedKeys.length - 1])
        setTreeExpandedKeys(selectedKeys);

        if (onSelected) {
        } else {
            setCorePicker({
                orgSelected: {
                    ...orgTarget,
                    id: orgTarget?.id, displayName: orgTarget?.displayName, level: orgTarget?.level, path: selectedKeys
                }
            })
        }



    }

    const displayRender = (label) => {
        const displayAsHorizontal = true;
        if (displayAsHorizontal) {
            return <div className="flex flex-row gap-1">
                {
                    label.map((e, idx, arrLabel) => {
                        const orgWithID = e?.split('_');
                        return <>
                            <span>{orgWithID.length > 1 ? orgWithID[1] : orgWithID[0]}</span>
                            <span className="text-red-300 font-bold">{idx == arrLabel.length - 1 ? '' : '>'}</span>
                        </>
                    })
                }
            </div>
        } else {

            return <div className="flex flex-col gap-0 whitespace-pre-wrap">
                {
                    label.map((e, idx, arrLabel) => {
                        const orgWithID = e?.split('_');
                        let orgDisplay = orgWithID.length > 1 ? orgWithID[1] : orgWithID[0];
                        return <span key={idx}>
                            {`${'\t'.repeat(idx)} ${orgDisplay}`}
                        </span>
                        {/* <span className="text-red-300 font-bold ">{idx == arrLabel.length - 1 ? '' : '/'}</span> */ }


                    })
                }
            </div>
        }

    }


    const TreeSelectMemo = useMemo(
        () => {
            return <div className={'min-w-[20vw] py-1'}>
                <Cascader
                    {...{
                        key: currentPath.join('_'),
                        className: "w-full custom-org-select h-fit",
                        variant: 'borderless',
                        defaultValue: getDefaultValue(),
                        autoClearSearchValue: true,
                        allowClear: true,
                        showSearch: { filter },
                        changeOnSelect: true,
                        size: "small",
                        onChange,
                        maxTagTextLength: 1,
                        maxTagCount: 1,
                        options: orgTreeData,
                        displayRender,
                    }}
                />
            </div>
        },
        [JSON.stringify([
            orgTreeData, orgPickerConfig?.orgGroupVisible, currentPath
        ])]
    )

    return <CustomCard
        {
        ...{
            required: true,
            className: `w-full h-fit basis-1/2`,
            content: <>
                {orgTreeData
                    ?
                    <CustomPickerElement label={trans('common:selectOrg')} labelClass={`z-10`}>
                        <div className="rounded-lg border border-1 border-black/20">
                            {TreeSelectMemo}
                        </div>
                    </CustomPickerElement> : <Spin />}
            </>
        }
        }
    />
}