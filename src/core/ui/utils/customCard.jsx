import { Card } from "antd"
import { RequireMark } from "./common"

export const CustomCard = ({ key, required, content, children, title, className }) => {
    return <div
        className={`bg-white flex-col rounded-lg p-4 mx-auto text-gray-800 shadow-lg border border-gray-200 ${className}`}
        key={key} >
        {/* <h3>{title}{required && <RequireMark />} </h3> */}
        {children ? children : content}
    </div>
}