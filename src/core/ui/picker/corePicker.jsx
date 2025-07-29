
import { useCorePickerState } from "@core/stateManage/corePickerState"

import { BsCalendar2WeekFill, BsThreeDots } from "react-icons/bs";
import { LiaGlobeSolid } from "react-icons/lia";
import { PiNotebookFill } from "react-icons/pi";

import { trans } from "@core/translation/i18n";
import { upperFirst } from "lodash";
import { useShallow } from "zustand/react/shallow";
import Orgpicker from "./orgPicker/orgpicker";
import GroupPeriodPicker from "./periodpicker/GroupPeriodPicker";
import { NoticeBox } from "./notice";
import { FaArrowRightLong } from "react-icons/fa6";

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

    // Get current date for footer
    const currentDate = (`hôm nay: ` + new Date().toLocaleDateString('vi-VI', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })).toUpperCase()

    // Get organization and period info
    const periodInfo = corePicker?.periodSelected
    const orgDisplay = corePicker?.orgSelected?.displayName
    const periodDisplay = periodInfo?.labelStartDate
        ? upperFirst(`${periodInfo.labelStartDate}${periodInfo.labelEndDate ? ` - ${periodInfo.labelEndDate}` : ""}`)
        : undefined
    const isSelectedCore = !corePicker?.orgSelected?.error && periodDisplay;


    return (

        <div className="bg-white rounded-lg p-3 flex flex-col gap-y-5 text-gray-800 shadow-lg border border-gray-200">
            <div className="mb-2">
                <div className="flex items-center gap-2 mb-1 bg-gray-300 px-2 py-1 rounded-md">
                    <LiaGlobeSolid className="w-[1.5rem] h-[1.5rem]" />
                    <h3 className="text-base text-gray-900 font-bold">{trans('common:orgPicker')}</h3>
                </div>
                <Orgpicker required />
            </div>

            <div className="mb-2">
                <div className="flex items-center gap-2 mb-1 bg-gray-300 px-2 py-1 rounded-md">
                    <BsCalendar2WeekFill className="w-[1.2rem] h-[1.2rem]" />
                    <h3 className="text-base text-gray-900 font-bold"> {trans('common:periodPicker.title')}</h3>
                </div>
                <GroupPeriodPicker />
            </div>

            <div className="mb-2">
                <div className="flex items-center gap-2 mb-1 bg-gray-300 px-2 py-1 rounded-md">
                    <PiNotebookFill className="w-[1.5rem] h-[1.5rem]" />
                    <h3 className="text-base text-gray-900 font-bold">Lưu ý</h3>
                </div>

                <div className={`flex flex-col leading-tight justify-center px-2 py-1 font-semibold`}>
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
                            !isSelectedCore
                                ? <NoticeBox type="error" className={'my-[1px]'}>
                                    Vui lòng chọn đầy đủ đơn vị và thời điểm để xuất báo cáo.
                                </NoticeBox>
                                : <NoticeBox type="success" className={'my-[1px]'}>
                                    <div className="flex flex-col gap-2">
                                        <p>
                                            Đã chọn đầy đủ đơn vị và thời điểm.
                                        </p>
                                        <button className="btn-primary w-fit bg-green-600 hover:bg-green-600/90 text-white gap-2"
                                            onClick={() => setCorePicker({ pickCompleted: Math.random() })}>
                                            {trans('common:button.loadReport')}
                                            <FaArrowRightLong className="text-normal" />
                                        </button>
                                    </div>
                                </NoticeBox>
                        }
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center text-xs text-gray-700 border-t border-gray-400 pt-2">
                <span className="font-mono font-medium">{currentDate}</span>
            </div>
        </div >
    )
}
