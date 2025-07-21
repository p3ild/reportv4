import { Button, Space } from "antd"
import { useState } from "react"
import ReactJson from "react-json-view"
import { useListParam } from "../../../page/report/report.hook";

export const JsonViewDebug = (data) => {
    const [show, setShow] = useState(false);
    let listParam = useListParam()

    return <>
        {listParam &&
            (
                process.env.NODE_ENV !== 'production' ||
                listParam.debug == "true")
            && <Space direction="vertical">

                <Button type="primary" danger onClick={() => {
                    setShow((pre) => !pre)
                }}>Show/Hide debug data</Button>
                {
                    show && <>
                        This section only show on debug environment
                        <ReactJson style={{ background: '#ff00004d', padding: '10px', overflow: 'auto', height: data.height || '50vh' }}
                            {...data} />
                    </>
                }
            </Space>
        }
    </>
}