
import { useCorePickerState } from "@core/stateManage/corePickerState"

import { BsCalendar2WeekFill, BsGearFill, BsQuestion, BsQuestionCircle, BsQuestionCircleFill, BsThreeDots } from "react-icons/bs";
import { LiaGlobeSolid } from "react-icons/lia";
import { PiNotebookFill } from "react-icons/pi";

import { trans } from "@core/translation/i18n";
import { upperFirst } from "lodash";
import { useShallow } from "zustand/react/shallow";
import Orgpicker from "./orgPicker/orgpicker";
import GroupPeriodPicker from "./periodpicker/GroupPeriodPicker";
import { NoticeBox } from "./notice";
import { FaArrowRightLong } from "react-icons/fa6";
import { Checkbox, Switch, Tooltip } from "antd";

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
                <div className="flex items-center gap-2 mb-1 bg-gray-200 text-black px-2 py-1 rounded-md">
                    <LiaGlobeSolid className="w-[1.5rem] h-[1.5rem]" />
                    <h3 className="text-base text-black font-bold">{trans('common:orgPicker')}</h3>
                </div>
                <Orgpicker required />
            </div>

            <div className="mb-2">
                <div className=" flex items-center gap-2 mb-1 bg-gray-200 text-black px-2 py-1 rounded-md">
                    <BsCalendar2WeekFill className="w-[1.2rem] h-[1.2rem]" />
                    <h3 className="text-base text-black font-bold"> {trans('common:periodPicker.title')}</h3>
                </div>
                <GroupPeriodPicker />
            </div>

            <div className="mb-2">
                <div className="flex items-center gap-2 mb-1 bg-gray-200 text-black px-2 py-1 rounded-md">
                    <PiNotebookFill className="w-[1.5rem] h-[1.5rem]" />
                    <h3 className="text-base text-black font-bold">Lưu ý</h3>
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
                                        <button id="btn-load-report" className="btn-primary w-fit bg-green-600 hover:bg-green-600/90 text-white gap-2"
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

            <div className="mb-2">
                <div className=" flex items-center gap-2 mb-1 bg-gray-200 text-black px-2 py-1 rounded-md">
                    <BsGearFill className="w-[1.2rem] h-[1.2rem]" />
                    <h3 className="text-base text-black font-bold"> {trans('common:otherSettings')}</h3>
                </div>
                <div className="p-2">
                    <Tooltip
                        title={
                            <p className='text-[0.9rem] whitespace-pre-line'>{`Khi bật, hệ thống sẽ tự động bỏ qua bước chọn đơn vị và thời điểm nếu các lựa chọn hiện tại phù hợp với báo cáo mới.`}</p>
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

                </div>

            </div>
        </div >
    )
}
