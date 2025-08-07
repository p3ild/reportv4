import { wait } from '@core/network';
import { compareString } from '@core/utils/stringutils';
import { Cascader, Spin, Tag } from "antd";
import { cloneDeep, debounce, flatten, set } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { getPickerStateByPath, useCorePickerState } from "../../../stateManage/corePickerState";
import { useCoreMetaState } from "../../../stateManage/metadataState";
import { trans } from "../../../translation/i18n";
import { CustomCard } from "../../utils/customCard";
import CustomPickerElement from "../CustomPickerElement";
import './orgpicker.css';

export function useOrgTreeByUser() {
    const [
        me,
        reportTarget
    ] = useCoreMetaState(useShallow(state => (
        [
            state.me,
            state.reportTarget,
        ]
    )));

    const [
        orgPickerConfig,
        setOrgTreeData,
    ] = useCorePickerState(useShallow(state => ([
        state.orgPickerConfig,
        state.actions.setOrgTreeData
    ])))

    //When new report config apply, update orgTree data
    useEffect(() => {
        deboundUpdateTree(me)
    }, [me?.orgViewData, orgPickerConfig?.orgGroupVisible?.join('|'), reportTarget?.reportID])
}
const deboundUpdateTree = debounce((me) => {
    if (!me?.orgViewData) return undefined;
    let orgFlatMap = {}
    const setAllOrg = (path, value) => {
        set(orgFlatMap, path, value)
    }
    const tree = cloneDeep(me?.orgViewData)?.map(e => {
        return e?.organisationUnits.map(x => {
            let orgMapped = generateEachOrgData({
                setAllOrg,
                orgTarget: x
            });
            return orgMapped
        });
    }).filter(e => e != undefined);
    let resultOrgTree = flatten(tree).filter(e => e);
    getPickerStateByPath('actions.setOrgTreeData')(resultOrgTree, orgFlatMap);
}, 300);

const generateEachOrgData = ({ orgTarget, setAllOrg }) => {
    let { orgGroupVisible, levelsToHideIfEmpty } = getPickerStateByPath('orgPickerConfig') || {}
    setAllOrg(orgTarget.id, orgTarget)
    const processedOrg = checkSupport(orgTarget, orgGroupVisible);
    if (!processedOrg) {
        return undefined;
    }
    orgTarget = processedOrg;

    orgTarget['title'] = generateOrgTitle(orgTarget)
    orgTarget['label'] = generateOrgTitle(orgTarget)
    orgTarget['value'] = orgTarget.id + '_' + orgTarget.title;
    let isHaveChild = orgTarget?.children?.length > 0

    orgTarget.children = orgTarget?.children?.map(orgChild => generateEachOrgData({ orgTarget: orgChild, setAllOrg }))
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
        )

    ) {
        //Prevent hide org that is in orgGroupVisible
        if (orgGroupVisible
            && orgTarget.organisationUnitGroups.some(e => orgGroupVisible.some(x => x == e.id))
        ) return orgTarget
        return undefined;

    }
    return orgTarget

    function generateOrgTitle(org) {
        let orgTitle = [
            orgTarget.displayName,
        ]

        return orgTitle.join(' ');
    }
}

const checkSupport = (orgTarget, orgGroupVisible) => {
    if (!orgGroupVisible?.length) {
        orgTarget.support = true;
        return orgTarget;
    }

    if (orgTarget.level == 1) {
        let hasRootIndicator = orgGroupVisible.find(e => e.replace(/[!+-]/g, '') === 'root');
        orgTarget.support = true;
        if (hasRootIndicator && hasRootIndicator.includes('-')) {
            orgTarget.support = false;
        }
        return orgTarget;
    }

    let filteredOrgGroupVisible = orgGroupVisible.filter(e => e.replace(/[!+-]/g, '') !== 'root');

    let visibleGroups = filteredOrgGroupVisible
        .filter(e => !e.includes('!'))
        .map(e => e.replace(/[!+-]/g, ''))

    let excludedGroups = filteredOrgGroupVisible
        .filter(e => e.includes('!'))
        .map(e => e.replace('!', ''))
        .map(e => e.replace(/[!+-]/g, ''));

    let notSupportGroups = filteredOrgGroupVisible
        .filter(e => e.includes('-'))
        .map(e => e.replace(/[!+-]/g, ''))


    let hasVisibleGroup = visibleGroups.length === 0 ||
        orgTarget.organisationUnitGroups.some(x => visibleGroups.includes(x.id));

    let hasExcludedGroup = excludedGroups.length > 0 &&
        orgTarget.organisationUnitGroups.some(x => excludedGroups.includes(x.id));

    if (!hasVisibleGroup || hasExcludedGroup) {
        return undefined;
    }

    orgTarget.support = true;

    if (notSupportGroups.length > 0 && orgTarget.organisationUnitGroups.some(x => notSupportGroups.includes(x.id))) {
        orgTarget.support = false;
    }

    return orgTarget;
}
export const OrgError = (orgSelected) => <><Tag color='red'>{orgSelected.displayName}</Tag> không hỗ trợ xuất báo cáo này. Vui lòng chọn đơn vị khác</>
export default (props) => {
    const { setCorePicker, corePicker, orgTreeData } = useCorePickerState(useShallow(state => ({
        setCorePicker: state.actions.setCorePicker,
        corePicker: state.corePicker,
        orgTreeData: state.orgTreeData
    })))
    useOrgTreeByUser();
    let [value, setValue] = useState(undefined);
    let [currentPath, setCurrentPath] = useState([]);
    let [expandedKeys, setTreeExpandedKeys] = useState();

    const [orgPickerConfig] = useCorePickerState(useShallow(state => ([
        state.orgPickerConfig,
    ])))

    let defaultValue = useMemo(() => {
        if (!orgTreeData) {
            return 'Không có đơn vị hỗ trợ xuất báo cáo'
        }


        const rootOrg = orgTreeData[0]
        const rootPath = [`${rootOrg.id}_${rootOrg.displayName}`]

        let targetPath = expandedKeys || corePicker?.orgSelected?.path || rootPath

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
        let orgSelected;
        if (foundOrg) {
            foundOrg.path = targetPath
            orgSelected = foundOrg
            orgSelected.path = targetPath
        } else {
            rootOrg.path = rootPath;
            orgSelected = rootOrg
        }

        !orgSelected.support && (orgSelected = { error: OrgError(orgSelected) })

        //Prevent setState when renderring
        wait(150).then(() => {
            // console.log('defaultValue::Update orgSelected.support:', orgTreeData?.[0]?.support)
            setCorePicker({ orgSelected })
            setCurrentPath(orgSelected?.path)
        })

        return orgSelected?.support ? orgSelected.path : undefined

    }, [
        orgTreeData
    ])

    const filter = (inputValue, path) => {
        const cleanInput = compareString.cleanStr(inputValue)
        return path.some(e => {
            let cleanName = compareString.cleanStr(e.name);
            return cleanName.includes(cleanInput)
        })
    }


    const onChange = (selectedKeys, info, extra) => {
        if (!info) {
            setCorePicker({
                orgSelected: undefined
            });
            return;
        }
        let orgTarget = info[info.length - 1];

        let orgSelected = {
            ...orgTarget,
            id: orgTarget?.id, displayName: orgTarget?.displayName, level: orgTarget?.level, path: selectedKeys
        }

        !orgSelected.support && (orgSelected = { error: OrgError(orgSelected) })


        setValue(selectedKeys[selectedKeys.length - 1])
        setTreeExpandedKeys(selectedKeys);
        setCorePicker({
            orgSelected
        })
    }

    const displayRender = (label) => {
        const displayAsHorizontal = true;
        if (displayAsHorizontal) {
            return <div className="flex flex-row gap-1">
                {
                    label.map((e, idx, arrLabel) => {
                        const orgWithID = e?.split('_');
                        return <p key={idx} className='flex flex-row gap-1 items-center'>
                            <span>{orgWithID.length > 1 ? orgWithID[1] : orgWithID[0]}</span>
                            <span className="text-red-300 font-bold">{idx == arrLabel.length - 1 ? '' : '>'}</span>
                        </p>
                    })
                }
            </div>
        } else {

            return <div className="flex flex-col gap-0 whitespace-pre-wrap">
                {
                    label.map((e, idx, arrLabel) => {
                        const orgWithID = e?.split('_');
                        let orgDisplay = orgWithID.length > 1 ? orgWithID[1] : orgWithID[0];
                        return <p key={idx}>
                            {`${'\t'.repeat(idx)} ${orgDisplay}`}
                        </p>


                    })
                }
            </div>
        }

    }


    const TreeSelectMemo = useMemo(
        () => {
            return <div className={' p-1 px-3'}>
                <Cascader
                    {...{
                        key: currentPath?.join('_'),
                        className: "w-full custom-org-select h-fit",
                        variant: 'borderless',
                        defaultValue,
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
        [
            orgTreeData,
            // orgPickerConfig?.orgGroupVisible?.join('|'),
            // currentPath?.join('|')
        ]
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
                    </CustomPickerElement> :
                    <Spin />}
            </>
        }
        }
    />
}