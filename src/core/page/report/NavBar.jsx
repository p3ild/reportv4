import { getApprovalStateByPath, useApprovalState } from "@core/stateManage/approvalState";
import { getCoreMetaStateByPath, useCoreMetaState } from "@core/stateManage/metadataState";
import { ButtonReponsive } from "@core/ui/custom/ButtonReponsive";
import { RiFileExcel2Fill } from "react-icons/ri";

import { Affix, Button, Checkbox, Collapse, Popover, Select, Tooltip } from "antd";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useShallow } from "zustand/react/shallow";
import { ReportList } from ".";

import { LeftCircleOutlined, PrinterOutlined, SettingOutlined } from '@ant-design/icons';
import { BsGlobeAsiaAustralia } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { PrintElem } from "@core/utils/print";
import { exportToExcel as ETE } from "@core/excelUtils";
import { getPickerStateByPath, useCorePickerState } from "@core/stateManage/corePickerState";


export function NavBar() {
    const navigate = useNavigate();
    let [
        setGlobalOverlay,
    ] = useCoreMetaState(useShallow(state => [
        state.actions.setGlobalOverlay,
    ]))

    let [corePicker] = useCorePickerState(useShallow(state => [
        state.corePicker,
    ]))

    let supportApproval = useApprovalState(useShallow(state => state.supportApproval))

    const { t, i18n } = useTranslation();

    const additionalSetting = useMemo(
        () => {
            return [
                supportApproval ? {
                    key: '1',
                    label: <span>Phê duyệt</span>,
                    children: [
                        <div className="flex flex-col gap-2">
                            <Checkbox defaultChecked={
                                getApprovalStateByPath('uiSettings.showButton')
                            }
                                onChange={(e) => {
                                    getApprovalStateByPath('actions.setUISettings')?.({ showButton: e.target.checked })
                                }}
                            >Hiện thị tính năng phê duyệt</Checkbox>
                            <Checkbox
                                defaultChecked={
                                    getApprovalStateByPath('uiSettings.showIcon')
                                }
                                onChange={(e) => {
                                    getApprovalStateByPath('actions.setUISettings')?.({ showIcon: e.target.checked })
                                }}
                            >Chỉ hiển thị biểu tượng</Checkbox>
                        </div>

                    ]
                } : undefined,
                {
                    key: '2',
                    label: <span>Báo cáo</span>,
                    children: <Tooltip
                        title={
                            <p className='text-[0.9rem] whitespace-pre-line'>{t('common:autoLoadReport')}</p>
                        }>
                        <Checkbox
                            checked={corePicker.autoLoadReport}
                            onChange={(e) => {
                                getPickerStateByPath('actions.setCorePicker')?.({ autoLoadReport: e.target.checked })
                            }} >
                            <p className="text-sm text-wrap">Tự động tải</p>
                        </Checkbox>
                    </Tooltip >
                },
                false && {
                    key: '3',
                    label: <span>Tài khoản</span>,
                    children: <>
                        <Select
                            placeholder="Chọn tài khoản"
                            onChange={(val, option) => {
                                getCoreMetaStateByPath('actions.setMe')?.({
                                    username: option.username,
                                    customAuth: {
                                        username: option.username,
                                        password: option.password
                                    }
                                })
                            }}
                            options={[
                                {
                                    label: "12102test",
                                    value: "12102test",
                                    username: "12102test",
                                    password: "Abcd@1234"
                                },
                                {
                                    label: "12001",
                                    value: "12001",
                                    username: "12001",
                                    password: "Ttyt@2025$"
                                },
                                {
                                    label: "12096",
                                    value: "12096",
                                    username: "12096",
                                    password: "Ttyt@2025$"
                                },
                                {
                                    label: "12115",
                                    value: "12115",
                                    username: "12115",
                                    password: "Tyt@2025$"
                                },
                            ]}
                        />
                    </>
                },
            ].filter(e => e).map(e => e)
        }
    )

    return <Affix offsetTop={50}>
        <div className='flex flex-row items-center flex-wrap mb-1 rounded-lg bg-gray-200'>
            <ButtonReponsive
                {...{
                    Icon: <LeftCircleOutlined />,
                    buttonText: t("common:button.back"),
                    iconOnly: true,
                    onClick: () => {
                        navigate(`/`);
                        setGlobalOverlay({
                            isOpen: false
                        })
                    }
                }}
            />
            <ButtonReponsive
                {...{
                    Icon: <div className='flex flex-row items-center justify-center gap-1'><BsGlobeAsiaAustralia /><FaCalendarAlt /></div>,
                    buttonText: t("common:button.changeFilter"),
                    onClick: () => {
                        getPickerStateByPath('actions.openCorePicker')?.();
                    }
                }}
            />
            <ReportList type="cascader" />

            {
                <ButtonReponsive
                    {...{
                        disabled: !corePicker.pickCompleted,
                        Icon: <RiFileExcel2Fill />,
                        buttonText: t("common:button.excel"),
                        onClick: () => {
                            ETE();
                        }
                    }}
                />
            }


            <ButtonReponsive
                {...{
                    disabled: !corePicker.pickCompleted,
                    Icon: <PrinterOutlined />,
                    buttonText: t("common:button.printReport"),
                    onClick: () => {
                        PrintElem('report-content')
                    }
                }}
            />

            {
                additionalSetting.length > 0 && <Popover
                    className='popover-no-padding'
                    trigger={'click'}
                    content={
                        <div className='flex flex-col gap-2'>
                            {<Collapse
                                collapsible="header"
                                defaultActiveKey={['1', '2', '3', '4']}
                                expandIconPosition={'end'}
                                items={additionalSetting} />}

                        </div>
                    }>
                    <Button className="btn-primary flex-none gap-2">
                        <SettingOutlined /><span className='whitespace-nowrap desktopLow:hidden'>{t("common:settings")}</span>
                    </Button>
                </Popover>
            }
        </div>
    </Affix>
}