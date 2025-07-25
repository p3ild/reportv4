import React from 'react'
import { IoWarning } from "react-icons/io5";
import { RiErrorWarningFill } from "react-icons/ri";
import { RiCheckboxCircleFill } from "react-icons/ri";

const typeConfig = {
    error: {
        icon: <RiErrorWarningFill className='w-5 h-5 text-red-600' />,
        bg: 'bg-red-50',
        border: 'border-red-300',
        iconColor: 'text-red-600',
        text: 'text-red-700'
    },
    warning: {
        icon: <IoWarning className='w-5 h-5 text-yellow-600' />,
        bg: 'bg-yellow-50',
        border: 'border-yellow-300',
        iconColor: 'text-yellow-500',
        text: 'text-yellow-700'
    },
    success: {
        icon: <RiCheckboxCircleFill className='w-5 h-5 text-green-600' />,
        bg: 'bg-green-50',
        border: 'border-green-300',
        iconColor: 'text-green-600',
        text: 'text-green-700'
    }
}

export function NoticeBox({ children, type = 'warning' }) {
    const cfg = typeConfig[type] || typeConfig.warning
    return (
        <div className={`${cfg.bg} border-l-4 ${cfg.border} p-3 my-2 flex items-center`}>
            <span className={`${cfg.iconColor} mr-2`}>{cfg.icon}</span>
            <span className={`text-sm ${cfg.text}`}>{children}</span>
        </div>
    )
}

export const IndicatorIcon = ({ children }) => {
    return <span className={`flex flex-row items-center gap-1 ${children ? 'text-green-600' : 'text-red-600'}`}>
        {!children  && <RiCheckboxCircleFill className="h-4 w-4 " />}
        {children }
    </span>
}