
import { getPickerStateByPath, useCorePickerState } from "@core/stateManage/corePickerState";

import { BsCalendar2WeekFill, BsGearFill } from "react-icons/bs";
import { LiaGlobeSolid } from "react-icons/lia";
import { PiNotebookFill } from "react-icons/pi";

import { trans } from "@core/translation/i18n";
import { Checkbox, Collapse, Tooltip } from "antd";
import { upperFirst } from "lodash";
import { FaArrowRightLong } from "react-icons/fa6";
import { useShallow } from "zustand/react/shallow";
import { NoticeBox } from "./notice";
import Orgpicker from "./orgPicker/orgpicker";
import GroupPeriodPicker from "./periodpicker/GroupPeriodPicker";
import { useEffect } from "react";
import { getCoreMetaStateByPath } from "@core/stateManage/metadataState";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { FaRegQuestionCircle } from "react-icons/fa";


export const SECTIONS = {
    ORG_UNIT: 'ORG_UNIT',
    PERIOD: 'PERIOD',
    CONFIRMATION: 'CONFIRMATION',
    OTHER: 'OTHER',
}
export default () => {


    const [
        customPicker
    ] = useCorePickerState(
        useShallow(state => ([
            state.customPicker
        ])));

    return <div className="max-h-[100vh] overflow-auto">
        <div className="flex-col p-3 max-h-[80vh] overflow-auto ">
            <PreviewSelected />
            {customPicker && customPicker}
        </div>

    </div>
}

export const PreviewSelected = (props) => {
    const [
        corePicker,
        setCorePicker
    ] = useCorePickerState(useShallow(state => (
        [
            state.corePicker,
            state.actions.setCorePicker,
        ]
    )))

    const { t } = useTranslation();

    // Get organization and period info
    const periodInfo = corePicker?.periodSelected
    const orgDisplay = corePicker?.orgSelected?.displayName
    const periodDisplay = periodInfo?.labelStartDate
        ? upperFirst(`${periodInfo.labelStartDate}${periodInfo.labelEndDate ? ` - ${periodInfo.labelEndDate}` : ""}`)
        : undefined

    return (
        <div className="bg-white rounded-lg flex flex-col gap-y-5 text-gray-800 shadow-lg border border-gray-200">
            <Collapse
                collapsible="header"
                // defaultActiveKey={
                //     [
                //         SECTIONS.ORG_UNIT,
                //         SECTIONS.PERIOD,
                //         SECTIONS.CONFIRMATION
                //     ]
                // }
                activeKey={corePicker?.sectionsActive}
                expandIconPosition={'end'}
                onChange={(key) => {
                    getPickerStateByPath("actions.setSectionsActive")(key)
                }}
                items={[
                    {
                        key: SECTIONS.ORG_UNIT,
                        label: <div className="flex gap-2 w-full">
                            <LiaGlobeSolid className="w-[1.5rem] h-[1.5rem]" />
                            <Tooltip title={t('common:selectOrgQuestion')}>
                                <h3 className="text-base text-black font-bold flex flex-row gap-3 items-center">{t('common:orgPicker')} <FaRegQuestionCircle /></h3>
                            </Tooltip>
                        </div>
                        ,
                        children: <Orgpicker required />
                    },
                    {
                        key: SECTIONS.PERIOD,
                        label: <div className="flex flex-row gap-2 items-center">
                            <BsCalendar2WeekFill className="w-[1.2rem] h-[1.2rem]" />
                            <h3 className="text-base text-black font-bold">{t('common:periodPicker.title')}</h3>
                        </div>,
                        children: <div>
                            <GroupPeriodPicker />
                        </div>,
                    },
                    {
                        key: SECTIONS.CONFIRMATION,
                        label: <div className="flex gap-2">
                            <PiNotebookFill className="w-[1.5rem] h-[1.5rem]" />
                            <h3 className="text-base text-black font-bold">{t('Lưu ý')}</h3>
                        </div>,
                        children: <div className={`flex flex-col leading-tight justify-center px-2 py-1 font-semibold`}>
                            <NoticeBox type={orgDisplay ? "success" : 'error'} className={'my-[1px]'}>
                                <p>
                                    Đơn vị: {corePicker?.orgSelected?.error || orgDisplay || 'Chưa chọn'}
                                </p>
                            </NoticeBox>
                            <NoticeBox type={periodDisplay ? "success" : 'error'} className={'my-[1px]'}>
                                <p>
                                    Thời điểm: {periodDisplay || 'Chưa chọn'}
                                </p>
                            </NoticeBox>


                            <div className="mt-5">
                                {
                                    !checkCoreSelected()
                                        ? <NoticeBox type="error" className={'my-[1px]'}>
                                            Vui lòng chọn đầy đủ đơn vị và thời điểm để xuất báo cáo.
                                        </NoticeBox>
                                        : <NoticeBox type="success" className={'my-[1px]'}>
                                            <div className="flex flex-col gap-1">
                                                <p>
                                                    Đã chọn đầy đủ đơn vị và thời điểm.
                                                </p>
                                                <button id="btn-load-report" className="btn-primary w-fit bg-green-600 hover:bg-green-600/90 text-white gap-2 p-2 px-3"
                                                    onClick={() => setCorePicker({ pickCompleted: Math.random() })}>
                                                    {trans('common:button.loadReport')}
                                                    <FaArrowRightLong className="text-normal animate-horizontalBound" />
                                                </button>
                                            </div>
                                        </NoticeBox>
                                }
                            </div>
                        </div>,
                    },
                    {
                        key: SECTIONS.OTHER,
                        label: <div className="flex gap-2 items-center">
                            <BsGearFill className="w-[1.5rem] h-[1.5rem]" />
                            <h3 className="text-base text-black font-bold"> {trans('common:otherSettings')}</h3>
                        </div>,
                        children: <Tooltip
                            title={
                                <p className='text-[0.9rem] whitespace-pre-line'>{t(`common:autoLoadReport`)}</p>
                            }>
                            <Checkbox
                                {
                                ...{
                                    checked: corePicker?.autoLoadReport,
                                    onChange: (e) => {
                                        setCorePicker({ autoLoadReport: e.target.checked })
                                    }
                                }
                                }>
                                <div className="flex  flex-row items-center gap-2">
                                    <p className="text-sm text-wrap">Tự động tải báo cáo</p>

                                </div >
                            </Checkbox>

                        </Tooltip >
                    },
                ]}
            />
        </div >
    )
}

function checkCoreSelected() {
    let isOpenRootOverlay = getCoreMetaStateByPath('globalOverlay.isOpen')
    let corePicker = getPickerStateByPath('corePicker');
    let isSelectedCore = !corePicker?.orgSelected?.error && corePicker?.orgSelected?.id
        && corePicker?.periodSelected
    return isSelectedCore && isOpenRootOverlay
}

document.addEventListener('keyup', function (event) {
    let check = checkCoreSelected()
    if (event.key === "Enter" && check)
        getPickerStateByPath('actions.setCorePicker')({ pickCompleted: Math.random() })
})