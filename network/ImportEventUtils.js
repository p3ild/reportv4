

import _axios, { HttpStatusCode } from 'axios';

import { parallel } from 'async';
import { omit, pick } from 'lodash';

export const API_TYPE = {
    CHECK_EXISTS: {
        key: "CHECK_EXISTS",
    },
    GET_FULL_TEI: {
        key: "GET_FULL_TEI",
    },
    ATTRIBUTE_CREATE_UPDATE: {
        key: "ATTRIBUTE_CREATE_UPDATE",
        object: 'Thông tin đổi tượng'
    },
    EVENT_CREATE_UPDATE: {
        key: "EVENT_CREATE_UPDATE",
        object: 'Thông tin lượt khám'
    },

    EVENT_CREATED: {
        key: "EVENT_CREATED",
        object: 'Tạo mới thông tin lượt khám'
    },
    EVENT_DELETED: {
        key: "EVENT_DELETED",
        object: 'Xoá thông tin lượt khám'
    },
    EVENT_UPDATED: {
        key: "EVENT_UPDATED",
        object: 'Cập nhật thông tin lượt khám'
    },
    TEI_CREATE: {
        key: "TEI_CREATE",
        object: 'Thông tin đổi tượng và lượt khám'
    },
}
class ImportEventUtils {
    init = function ({
        host = '../../',
        auth,
        headers
    }) {
        this.INIT_HOST = host;
        this.auth = auth;
        this.headers = headers
        return this;
    }
    getEventDetailByIDs = async function (eventIDs) {
        return this._get({
            api: `/api/tracker/events.json?event=${eventIDs}`
        }).then(e => e.instances)

    }

    findEventByDeValue = async function (metaData) {
        let {
            programStage = "qgYbmBm4kx8"
            , ou = "LOdti1gATwC"
            , searchCriteria
        } = metaData;

        let otherCriteria = searchCriteria ? searchCriteria.map(e => this.criteriaBuilder(e)) : [];
        return this._get({
            api: [
                `/api/tracker/events.json?orgUnit=${ou}`
                , `programStage=${programStage}`,
                , ...otherCriteria
                , `ouMode=DESCENDANTS`,
            ].join('&')
        }).then(e => {
            if (e.error) return e
            return e.instances
        })
    }


    getAllEventInMonthByOrg = async function (metaData) {
        let { orgSelected = 'TNxHOJwYsaX'
            , periodSelected = '202204'
            , programStage = 'dL7pqw4eWsg'//ICD10 - baocao
            , program = 'OXMrd8oAmoG'//ICD10 - baocao
        } = metaData;
        let rangeDayInMonth = getRangeDayInMonth({ isoDhis2: periodSelected });
        let url = [
            this.INIT_HOST,
            `/api/38/tracker/events.json?`,
            `fields=:*`,
            `&program=${program}`,
            `&orgUnit=${orgSelected}`,
            `&programStage=${programStage}`,
            `&ouMode=SELECTED`,
            `&order=occurredAt=desc`,
            `&occurredAfter=${rangeDayInMonth.startAt}`,
            `&occurredBefore=${rangeDayInMonth.endAt}`,
            `&paging=false&pageSize=500`,
        ].join('');

        return new Promise(async (resolve, reject) => {
            _axios({
                url,
                method: 'get',
                auth: this.auth
            }).then(e => {
                resolve(e.data);
            }).catch(err => {
                reject(err);
            })
        });
    }

    criteriaBuilder = ({ de,
        val,
        operation = 'eq'
    }) => {
        return `filter=${de}:${operation}:${val}`
    }

    getEventRef = (eventID) => {
        return `${this.INIT_HOST}/api/tracker/events/${eventID}.json`
    }
    deleteNewEvent = async function (metaData) {
        let {
            useOldApi,
            event,
        } = metaData;


        if (useOldApi) {
            return this._post({
                method: 'DELETE',
                api: [
                    `/api/events/${event}`,
                ].join('&')
            }).then(e => {
                let object0 = e.response?.importSummaries?.[0] || e.response;
                let rs = pick(object0, [
                    'importCount',
                    'conflicts',
                ]);
                rs.event = object0.reference;
                rs.ref = this.getEventRef(rs.event)
                rs.type = API_TYPE.EVENT_DELETED
                rs.httpStatusCode = 200
                return rs

            }).catch(err => {
                return {
                    httpStatusCode: 504,
                    err
                }

            })
        }
        return this._post({
            api: [
                `/api/tracker?async=false`,
                ...opts
            ].join('&'), data
        }).then(e => {
            e.ref = this.getEventRef(e.event)
            return {
                ...e,
                type: API_TYPE.EVENT_DELETED,
                httpStatusCode: 200
            }
        }).catch(err => err)
    }
    createNewEvents = async function (metaData) {
        let {
            useOldApi,
            data, opts, logic
        } = metaData;


        if (useOldApi) {
            return this._post({
                api: [
                    `/api/events`,
                ].join('&'), data
            }).then(e => {
                let object0 = e.response?.importSummaries[0];
                let rs = pick(object0, [
                    'importCount',
                    'conflicts'
                ]);
                rs.event = object0.reference;
                rs.ref = this.getEventRef(rs.event)
                rs.httpStatusCode = 200
                rs.type = API_TYPE.EVENT_CREATED;
                return rs

            }).catch(err => {
                return {
                    httpStatusCode: 504,
                    err
                }
            })
        }
        return this._post({
            api: [
                `/api/tracker?async=false`,
                ...opts
            ].join('&'), data
        }).then(e => {
            e.ref = this.getEventRef(e.event)
            return {
                ...e,
                type: API_TYPE.EVENT_CREATED,
                httpStatusCode: 200
            }
        }).catch(err => {
            return {
                httpStatusCode: 504,
                err
            }
        })
    }

    /**
     * 
     * Data payload require 
    {
        events: [

        ]
    }
     */

    updateEvents = async function (metaData) {
        let { data, opts, useOldApi } = metaData;

        let url = [
            `/api/tracker?async=false&importStrategy=UPDATE`,
            ...opts
        ].join('&');

        if (useOldApi) {
            let listApi = data.events.map(e => {
                e = omit(e, ['assignedUser']);
                return (callback) => {
                    return this._post({
                        method: "PUT",
                        api: `/api/events/${e.event}`,
                        data: e
                    }).then(res => callback(undefined,
                        pick({
                            ...res,
                            ref: this.getEventRef(e.event)
                        }, [
                            'validationReport',
                            'stats',
                            'response.importCount',
                            'response.conflicts',
                            'ref'
                        ])
                    ))
                }
            })
            return parallel(listApi)
        }

        return this._post({
            api: url,
            data
        })
    }

    updateDataElement = async function (event) {
        /**Example input
            {
                "trackedEntityInstance": "sgXhY3F3pAU",
                "program": "NAleauPZvIE",
                "programStage": "MfWkEzClyU7",
                "orgUnit": "lNXs1lrOMMn",
                "event": "e6k8HfTzWJE",
                "status": "ACTIVE",
                "dataElement": "o6EsO5z84M7",
                "value": 1 
            }
        */
        let isEventDate = event.dataElement == 'eventDate'
        if (isEventDate) {
            event.eventDate = event.value
        }

        event.dataValues = isEventDate ? undefined : [
            {
                "dataElement": event.dataElement,
                "value": event.value,
                "providedElsewhere": false
            }
        ];

        return this._post({
            method: "PUT",
            api: `/api/events/${event.event}/${event.dataElement}`,
            data: event
        }).then(res => {
            return {

                ...pick({
                    ...res
                }, [
                    "httpStatusCode",
                    "httpStatus",
                    "status",
                    "message",
                    'validationReport',
                    'stats',
                    'response.importCount',
                    'response.conflicts',
                    'ref'
                ]),
                type: API_TYPE.EVENT_UPDATED,
                httpStatusCode: '200'
            }
        });
    }
}

export default new ImportEventUtils();