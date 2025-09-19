import { Flex, notification, Spin } from "antd";
import { CheckCircleFilled } from '@ant-design/icons';

let GLOBAL_NOTIFICATION_KEY = Math.random()

export default function ProgressNotificationBuilder({ NOTIFICATION_KEY, label, initTaskStatus, timeout = 1.5 }) {
    const TEMP_CONFIG = {
        key: NOTIFICATION_KEY || GLOBAL_NOTIFICATION_KEY,
        message: <p className="text-success">{label}</p>,
        placement: 'topRight',
        duration: 0,
        closeIcon: null
    }

    let notificationConfig = TEMP_CONFIG
    const open = (taskStatus = initTaskStatus) => {
        let isAllDone = Object.values(taskStatus).every(e => e.status);
        if (isAllDone) {
            notificationConfig = {
                ...notificationConfig,
                showProgress: true,
                pauseOnHover: true,
                duration: notificationConfig.duration || timeout,
            }
        }
        notificationConfig.message = <Flex justify={"center"} gap={20}>
            {/* {!isAllDone ? <Spin /> : <CheckCircleFilled className="text-success" />} */}
            {label}
        </Flex>;
        notification.open({
            ...notificationConfig,
            description: <div className="flex flex-col gap-2">
                {
                    Object.values(taskStatus).map((e, index) => {
                        return <div key={index} className="flex flex-row gap-2">
                            {e.title} {!e.status ? <Spin /> : <CheckCircleFilled className="text-success text-green-500 text-lg" />}
                        </div>
                    })
                }
            </div>
        });
        if (isAllDone) {
            notificationConfig = TEMP_CONFIG;
        }
    }

    const destroy = (taskStatus, timeout) => {

        notificationConfig = {
            ...notificationConfig,
            showProgress: true,
            pauseOnHover: true,
            duration: timeout,
        }
        open(
            taskStatus
        );

        setTimeout(() => {
            notificationConfig = TEMP_CONFIG;
        }, (timeout + 1) * 1000);
    }

    return {
        open,
        destroy,
        initTaskStatus
    }
}