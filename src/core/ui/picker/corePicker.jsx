
import { useCorePickerState } from "@core/stateManage/corePickerState"
import { FaCircleCheck } from "react-icons/fa6";
import { PiWarningCircleFill } from "react-icons/pi";

import { BsCalendar2WeekFill } from "react-icons/bs";
import { LiaGlobeSolid } from "react-icons/lia";
import { PiNotebookFill } from "react-icons/pi";

import { trans } from "@core/translation/i18n";
import { upperFirst } from "lodash";
import { useShallow } from "zustand/react/shallow";
import Orgpicker from "./orgPicker/orgpicker";
import GroupPeriodPicker from "./periodpicker/GroupPeriodPicker";

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
    ] = useCorePickerState(useShallow(state => (
        [
            state.corePicker,
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
    const isSelectedCore = orgDisplay && periodDisplay;

    const indicatorIcon = (b) => {
        return <span className={`flex flex-row items-center gap-1 ${b ? 'text-green-500' : 'text-red-500'}`}>
            {b}
            {b ? <FaCircleCheck className="h-3 w-3 " strokeWidth={2} /> : <PiWarningCircleFill className="h-4 w-4" strokeWidth={2.2} />}
        </span>
    }
    return (
        
        <div className="bg-white rounded-lg p-3 flex flex-col gap-y-5 text-gray-800 shadow-lg border border-gray-200">
            <div className="mb-2">
                <div className="flex items-center gap-2 mb-1 bg-gray-300 px-2 py-1 rounded-md">
                    <LiaGlobeSolid className="w-[1.5rem] h-[1.5rem]" />
                    <h3 className="text-base text-gray-900 font-bold">{trans('common:orgPicker')}</h3>
                </div>
                <Orgpicker required />
                {/* <p className="text-gray-800 text-sm leading-tight px-2 py-1 font-medium"> {orgName} </p> */}
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
                <div className={`text-sm leading-tight px-2 py-1 font-semibold flex flex-col gap-2`}>
                    <p className="flex flex-row items-center gap-1">{'Đơn vị: '}{indicatorIcon(orgDisplay)}</p>
                    <p className="flex flex-row items-center gap-1">{'Thời điểm: '} {indicatorIcon(periodDisplay)}</p>
                    {
                        !isSelectedCore && `Vui lòng chọn đủ thời gian và địa điểm`
                    }
                </div>
            </div>

            <div className="flex justify-between items-center text-xs text-gray-700 border-t border-gray-400 pt-2">
                <span className="font-mono font-medium">{currentDate}</span>
            </div>
        </div >
    )
}
