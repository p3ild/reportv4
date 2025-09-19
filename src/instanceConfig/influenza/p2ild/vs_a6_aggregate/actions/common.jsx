import { getValueDE, roundNumber } from "../../common/DataValueUtils";
import { RenderValue } from "../../common/ui";
import { ListColumnConfigBuilder } from "../../common/ui/RowRender";

export const getListColumnConfig = ({ indicatorCountCommune }) => {
    return ListColumnConfigBuilder({
        listColumnConfig: [
            {
                key: "stt",
                label: 'STT',
                freezeColWidth: '5vw',
                colClassName: '',
                render: ({ orgIdx }) => {
                    let value = orgIdx + 1;
                    return {
                        view: <RenderValue {...{
                            value
                        }}
                        ></RenderValue>
                    }
                }
            },
            {
                key: "org",
                label: 'STT',
                freezeColWidth: '15vw',
                align: "left",
                excelOpts: {
                    "data-a-wrap": "true"
                },
                render: (props) => {
                    return {
                        view: <RenderValue {...{
                            value: props.orgName,
                            ...props
                        }}
                        ></RenderValue>
                    }
                }
            },
            {
                description: "Số_xã",
                align: "center",
                excelOpts: {
                    "data-t": "n",
                    "data-a-h": "center"
                },
                render: ({ apiData, options, orgUnit }) => {
                    let value = getValueDE({
                        jsonDhis: apiData,
                        org: orgUnit,
                        de: [indicatorCountCommune]
                    });
                    return {
                        view: <RenderValue options={options} value={value} />, value
                    }
                },
            },

            {
                description: "Tổng số THTV trong kỳ báo cáo",
                align: "center",
                excelOpts: {
                    "data-t": "n",
                    "data-a-h": "center"
                },
                render: ({ apiData, options, orgUnit }) => {
                    let value = getValueDE({
                        jsonDhis: apiData,
                        org: orgUnit,
                        de: ["vaBWIsMITsM"]
                    });
                    return {
                        view: <RenderValue options={options} value={value} />, value
                    }
                },
            },
            {
                description: "Tư pháp chuyển sang (Bao gồm cả trùng)",
                align: "center",
                excelOpts: {
                    "data-t": "n",
                    "data-a-h": "center"
                },
                render: ({ apiData, options, orgUnit }) => {
                    let value = getValueDE({
                        jsonDhis: apiData,
                        org: orgUnit,
                        de: ["SFbNHpRRkrC"]
                    });
                    return {
                        view: <RenderValue options={options} value={value} />, value
                    }
                },
            },
            {
                description: "Y tế ghi nhận (Bao gồm cả trùng)",
                align: "center",
                excelOpts: {
                    "data-t": "n",
                    "data-a-h": "center"
                },
                render: ({ apiData, options, orgUnit }) => {
                    let value = getValueDE({
                        jsonDhis: apiData,
                        org: orgUnit,
                        de: ["nxFF6e9ZayD"]
                    });
                    return {
                        view: <RenderValue options={options} value={value} />, value
                    }
                },
            },
            {
                description: "Được ghi nhận bởi cả 2 hệ thống tại thời điểm trao đổi dữ liệu (Số trùng)",
                align: "center",
                excelOpts: {
                    "data-t": "n",
                    "data-a-h": "center"
                },
                render: ({ apiData, options, orgUnit }) => {
                    let value = getValueDE({
                        jsonDhis: apiData,
                        org: orgUnit,
                        de: ["uqrEz0s2P5n"]
                    });
                    return {
                        view: <RenderValue options={options} value={value} />, value
                    }
                },
            },
            {
                description: "Tư pháp chuyển sang mà Y tế chưa có (Tư pháp chuyển sang mà y tế chưa có)",
                align: "center",
                excelOpts: {
                    "data-t": "n",
                    "data-a-h": "center"
                },
                render: ({ apiData, options, orgUnit }) => {
                    let value = getValueDE({
                        jsonDhis: apiData,
                        org: orgUnit,
                        de: ["w6l8WEQ2dMg"]
                    });
                    return {
                        view: <RenderValue options={options} value={value} />, value
                    }
                },
            },
            {
                description: "Tư pháp chuyển sang mà Y tế chưa có, đã hoàn tất (Trong cột 8 và đã hoàn tất tới thời điểm* báo cáo (mùng 5 của tháng kế tiếp))",
                align: "center",
                excelOpts: {
                    "data-t": "n",
                    "data-a-h": "center"
                },
                render: ({ apiData, options, orgUnit }) => {
                    let value = getValueDE({
                        jsonDhis: apiData,
                        org: orgUnit,
                        de: ["oYA7IY2cgst"]
                    });
                    return {
                        view: <RenderValue options={options} value={value} />, value
                    }
                },
            },

            {
                description: "Số ngày trung bình giữa thời điểm Y tế ghi nhận trên A6 điện tử và ngày tử vong (Tính trung bình cho cột số 6 (chỉ tính cho các THTV mà y tế tự ghi nhận)",
                align: "center",
                excelOpts: {
                    "data-t": "s",
                    "data-a-h": "center"
                },
                render: ({ apiData, options, orgUnit }) => {
                    let value = getValueDE({
                        jsonDhis: apiData,
                        org: orgUnit,
                        de: ["lZnNgFzEpkB"]
                    });


                    return {
                        view: <RenderValue options={options} value={roundNumber(value || 0, 3)} />, value: roundNumber(value || 0, 3)
                    }
                },
            },
            {
                description: "Không có giấy tờ tuỳ thân hoặc số định danh cá nhân",
                align: "center",
                excelOpts: {
                    "data-t": "n",
                    "data-a-h": "center"
                },
                render: ({ apiData, options, orgUnit }) => {
                    let value = getValueDE({
                        jsonDhis: apiData,
                        org: orgUnit,
                        de: ["nmGZA76wG3N"]
                    });
                    return {
                        view: <RenderValue options={options} value={value} />, value
                    }
                },
            },
            {
                description: "Có ngày tử vong trong kỳ báo cáo",
                align: "center",
                excelOpts: {
                    "data-t": "n",
                    "data-a-h": "center"
                },
                render: ({ apiData, options, orgUnit }) => {
                    let value = getValueDE({
                        jsonDhis: apiData,
                        org: orgUnit,
                        de: ["vXwof4t9JWj"]
                    });
                    return {
                        view: <RenderValue options={options} value={value} />, value
                    }
                },
            },
        ]
    });
};

export const listColumnConfig = getListColumnConfig({})

export const listColumnConfigTb3 = (period) => {
    return ListColumnConfigBuilder({
        listColumnConfig: [
            {
                key: "stt",
                label: 'STT',
                freezeColWidth: '5vw',
                excelOpts: {
                    "data-a-wrap": "true",
                    "data-a-h": "center"
                },
                render: ({ orgIdx }) => {
                    let value = orgIdx + 1;
                    return {
                        view: <RenderValue {...{
                            value
                        }}
                        ></RenderValue>
                    }
                }
            },
            {
                key: "org",
                label: 'org',
                freezeColWidth: '15vw',
                excelOpts: {
                    "data-a-wrap": "true",
                    "data-a-h": "center"
                },
                align: "left",
                render: (props) => {
                    return {
                        view: <RenderValue {...{
                            value: props.orgName,
                            ...props
                        }}
                        ></RenderValue>
                    }
                }
            },
            ...period.map(
                pe => {
                    return {
                        key: "month_" + pe,
                        description: "tháng",
                        align: "center",
                        excelOpts: {
                            "data-t": "n",
                            "data-a-h": "center"
                        },
                        render: ({ apiData, options, orgUnit }) => {
                            let value = getValueDE({
                                jsonDhis: apiData,
                                org: orgUnit,
                                de: ["YyhJl0txmOc"],
                                pe
                            });
                            return {
                                view: <RenderValue options={options} value={value} />, value
                            }
                        },
                    }
                }
            ),
            {
                key: "tổng_số",
                description: "tháng",
                align: "center",
                excelOpts: {
                    "data-t": "n",
                    "data-a-h": "center"
                },
                render: ({ apiData, options, orgUnit }) => {
                    let value = 0;
                    period.map(pe => {
                        return getValueDE({
                            jsonDhis: apiData,
                            org: orgUnit,
                            de: ["YyhJl0txmOc"],
                            pe
                        });
                    }).forEach(e => {
                        value += parseInt(e)
                    })
                    return {
                        view: <RenderValue options={options} value={value} />, value
                    }
                },
            }

        ]
    });
}