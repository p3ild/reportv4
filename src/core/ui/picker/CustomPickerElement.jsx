import { Skeleton } from "antd";
import { cloneElement, useState } from "react";

export default (props) => {
    let { label, icon, labelClass, children } = props;

    let [loading, setLoading] = useState(false);

    return <div>
        {loading ? <Skeleton.Button className="absolute z-3 top-[0] bg-white" active={true} /> : <></>}
        <div className={`relative pt-[9px] min-w-[5vw] w-full rounded-xl`}>
            {<div className={`${loading ? 'hidden' : ''}`}>
                <span className={`!bg-white/80 !backdrop-blur-[1px] absolute z-2 top-[1px] left-[7px] rounded-md !m-0 !pr-1 font-[500] text-xs text-gray-500 !px-[1px] ${labelClass}`}>{label}</span>
                <div className={`z-1 w-full`}>
                    {children}
                </div>
            </div>
            }
        </div>
    </div >
}