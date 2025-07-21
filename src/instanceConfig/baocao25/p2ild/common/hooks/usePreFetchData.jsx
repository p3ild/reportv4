import { cloneDeep } from "lodash";
import { memo, useEffect, useMemo, useState } from "react";
import { parallel } from "async"
import { unstable_batchedUpdates } from "react-dom";
export const usePreFetchData = ({
    onLoadMoreCompleted,
}) => {
    const [inputMoreTask, setInputMoreTask] = useState({
        count: undefined,
        reload: Math.random(),
    });


    let defaultPreloadData = {
        eachStep: 50,
        tasks: undefined,
        taskInfo: {},
        isLoadAll: false,
    };
    const [preloadData, setPreloadData] = useState(defaultPreloadData);
    const [isLoading, setIsLoading] = useState(false);
    const [customLoadingLabel, setUpdateLoading] = useState('');
    const [inputTasks, setInputTasks] = useState();

    const reset = () => {
        setPreloadData(defaultPreloadData);
        setInputTasks();

    }

    useEffect(() => {
        if (inputTasks && inputMoreTask) {
            loadMoreData();
        }
    }, [inputTasks, inputMoreTask])

    async function loadMoreData() {
        let tasks = preloadData.tasks || inputTasks;

        if (
            tasks?.length > 0
        ) {
            setIsLoading(true)
            tasks = cloneDeep(tasks);
            let moreRequest = tasks.splice(0, inputMoreTask.count || 1);
            let moreData = await parallel(
                moreRequest
                    .map((api) => {
                        return function (callback) {
                            api().then((data) => callback(undefined, data))
                        }
                    })
            );
            let taskInfo = {
                inputTasks,
                tasks,
                lastQueryTasks: inputMoreTask.count
            };
            unstable_batchedUpdates(() => {
                let isLoadAll = taskInfo?.tasks?.length <= 0
                setPreloadData(pre => ({
                    ...pre,
                    tasks,
                    taskInfo,
                    isLoadAll
                }));
                onLoadMoreCompleted({ moreData, preloadData, isLoadAll });
                setIsLoading(false)
            })
        }
        else {
            onLoadMoreCompleted({ isLoadAll: preloadData?.isLoadAll });
        }
    }

    const ButtonLoadMore = () => {
        const leftPage = preloadData.eachStep > preloadData?.tasks?.length ? preloadData?.tasks?.length : preloadData.eachStep;
        return (preloadData.tasks || inputTasks) && !preloadData.isLoadAll
            && (inputTasks?.length != 0)
            // && preloadData?.tasks?.length != 0
            && <button
                className="btn-opts"
                // isLoading={isLoading}
                onClick={() => {

                    !isLoading && setInputMoreTask({
                        count: preloadData.eachStep,
                        reload: Math.random()
                    });
                }}>{
                    isLoading
                        ? `Đang tải ${leftPage || 1} trang...${customLoadingLabel}`
                        : `Tải thêm ${leftPage} trang... (còn lại ${preloadData?.tasks?.length || inputTasks?.length} trang)`
                }</button>
    }

    return {
        setInputTasks,
        ButtonLoadMore,
        setUpdateLoading,
        reset
    }
}