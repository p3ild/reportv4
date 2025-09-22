import { Button, Space } from "antd"
import { useState } from "react"
import ReactJson from "react-json-view"
import { useListParam } from "../../../page/report/report.hook";
import { CustomCard } from "./customCard";
import React from 'react'
import { RiErrorWarningFill } from "react-icons/ri";

export const JsonViewDebug = (data, force = false) => {
    const [show, setShow] = useState(false);
    let listParam = useListParam()

    return <>
        {listParam &&
            (
                process.env.NODE_ENV !== 'production' ||
                listParam.debug == "true" ||
                force
            )
            && <div className="flex flex-col gap-4 items-center">
                <RiErrorWarningFill className="w-20 h-20 text-red-500 mb-4" />
                <div className="text-2xl font-bold text-red-500 mb-2">Có lỗi xảy ra</div>
                <Button type="primary"
                    className="w-fit"
                    danger onClick={() => {
                        setShow((pre) => !pre)
                    }}>Chi tiết lỗi</Button>
                {
                    show &&
                    <CustomCard >
                        <div className="text-left self-center w-[40vw]">
                            <ReactJson
                                name={false}
                                style={{
                                    padding: '10px',
                                    overflow: 'auto',
                                    height: data.height || '50vh',
                                    fontSize: '0.7rem'
                                }}
                                src={
                                    data || {}
                                } />
                        </div>
                    </CustomCard>

                }
            </div>
        }
    </>
}