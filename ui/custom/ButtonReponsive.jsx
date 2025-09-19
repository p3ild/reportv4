import { Button, Popover, Tooltip } from "antd"

export const ButtonReponsive = ({
    Icon,
    buttonText,
    onClick,
    iconOnly,
    disabled
}) => {
    return <div className='flex flex-col items-center justify-center gap-2'>
        <div className='hidden desktopLow:block'>
            <Tooltip
                title={<span className='whitespace-nowrap'>{buttonText}</span>}
            >
                <Button className="btn-primary animate-scaleDown flex-none gap-1" onClick={onClick} disabled={disabled}>
                    {Icon}
                </Button>
            </Tooltip>
        </div>

        <div className={"desktopLow:hidden"}>
            <Tooltip
                title={iconOnly ? <span className='whitespace-nowrap'>{buttonText}</span> : undefined}
            >
                <Button className="btn-primary animate-scaleDown flex-none gap-1" onClick={onClick} disabled={disabled}>
                    {Icon}
                    {!iconOnly && <span className='whitespace-nowrap'>{buttonText}</span>}
                </Button>
            </Tooltip>
        </div>
    </div>
}