// import { notification } from 'antd';
import { flatten, uniq, groupBy, cloneDeep } from 'lodash'
// import { logger } from '../../logger';

import _axios from 'axios';
import * as _constant from '../constant'
import { parallel } from 'async';
import axios from 'axios';
import ImportEventUtils from './ImportEventUtils';
import CacheUtils from '../utils/cache';
import { compareString } from '../utils/stringutils';
import { parseISO, isBefore, isAfter } from 'date-fns'

class NetworkUtils {
    init = function ({ host, auth, instanceTarget }) {
        try {
            this.INIT_HOST = host;
            this.INIT_AUTH = auth;
            this.instanceTarget = instanceTarget;
        } catch (err) {
        }

        this.getApprovalUtils();
    };

    _get = async ({ host = this.INIT_HOST, auth = this.INIT_AUTH, api, opts }) => {
        return new Promise(async (resolve, reject) => {
            let url = encodeURI(host + api);
            let props = { method: "GET", url, auth, ...opts }
            await _axios(props)
                .then(e => {
                    resolve(e.data)
                }).catch(e => {
                    reject(e);
                });

        })
    }

    _multiGet = async ({ host = this.INIT_HOST, auth = this.INIT_AUTH, apis }) => {
        listRequest = apis.map(api => {
            return (callback) => {
                this._get({ api }).then(data => callback(undefined, data));
            }
        })
        let rs = await parallel(listRequest);
    }

    getDataHeaderBar = async function ({ host = this.INIT_HOST, dryRun, importStrategy, data, objectWhenDone, async = true, mergeMode = 'MERGE' }) {
        let tempThis = this;
        let rs = _constant.tempHeaderData(this.INIT_HOST)
        let dataApi = await Promise.all(Object.values(
            rs
        ).filter(e => e.api).map(async e => {
            let url = `${tempThis.INIT_HOST}${e.api}`;

            let config = {
                url,
                method: 'get',
                auth: tempThis.INIT_AUTH
            }
            return _axios(config);
        }));
        dataApi.forEach((e, idx) => {
            let listKey = Object.entries(rs).filter(x => x[1].api).map(x => x[0]);
            let data;
            try {
                let tempParse = e.data.toString();
                if (tempParse === '[object Object]') {
                    data = e.data;
                    rs[listKey[idx]].data = data
                }
            } catch (e) {

            }
        })
        return rs
    }

    getUserSettings = ({ host = this.INIT_HOST, auth = this.INIT_AUTH }) => {
        return new Promise(async (resolve, reject) => {
            let url = host + `/api/userSettings`;
            let apiCurrentUser = await _axios({ url, auth }).then(e => {
                resolve(e.data)
            }).catch(e => {
                reject(e);
            });

        })
    }

    importToInstance = function ({ host = this.INIT_HOST, dryRun, importStrategy, data, objectWhenDone, async = true, mergeMode = 'MERGE' }) {
        let url = [`${host}/api/metadata.json`
            , `?importMode=${dryRun}`
            , `&identifier=UID`
            , `&importReportMode=ERRORS` //ERRORS, FULL, DEBUG 
            , `&importStrategy=${importStrategy ? importStrategy : "CREATE_AND_UPDATE"}`
            , `&atomicMode=NONE`//NONE,AUTO
            , `&mergeMode=${mergeMode}`
            , `&flushMode=AUTO`//AUTO, OBJECT
            , `&skipSharing=false`
            , `&skipValidation=false`
            , `&inclusionStrategy=NON_NULL`
            , `&async=${async}`
            , `&format=json`
        ];
        return new Promise((resolve, reject) => {
            _axios.post(url.join(''), JSON.stringify(data), {
                headers: {
                    // Overwrite Axios's automatically set Content-Type
                    'Content-Type': 'application/json'
                },
                maxBodyLength: 104857600, //100mb
                maxContentLength: 104857600, //100mb

                timeout: 12000000,
                // httpsAgent: new https.Agent({ keepAlive: true }),

                emulateJSON: true,
                auth: this.INIT_AUTH
            }).then(e => {
                resolve(e)
            }).catch(e => {
                reject(e);
            })
        })
    }

    /**
     * must be bind this_context from parent script 
     * ex: 
     * const {getRandomUID} = requrie('...');await getRandomUID({...}); 
     * 
     * before use this function
     */
    getRandomUID = async function ({ host = this.INIT_HOST, limit }) {
        this.mustInitByCallAwait = this.mustInitByCallAwait || 0;
        if (!host && this.mustInitByCallAwait > 1) {
            throw Error(`/**
     * must init function before getRandomUID. {host} is require when init function 
     * ex: 
        const {getRandomUID} = requrie('...');
       (async()=>{
            await getRandomUID(
                {
                    host:string,//must be declare at here, after that, we don't need  
                    limit?:number
                }); 
       }) 
     * before use this function
    */`)
        }

        this.UIDs = this.UIDs || [];

        if (this.UIDs && this.UIDs.length > 0) {
            return this.UIDs.splice(0, 1)[0];
        }
        else {
            this.mustInitByCallAwait++;
            let url = `${host}/api/system/id.json?limit=${limit ? limit : 1000}`

            let tempCode = await _axios.get(url, {
                auth: this.INIT_AUTH
            });
            this.UIDs = tempCode.data.codes
            return this.UIDs.splice(0, 1)[0];
        }
    }


    getVersion = async function ({ host = this.INIT_HOST, auth = this.INIT_AUTH }) {
        let apiVersionDhis = [`${host}/api/system/info.json`];
        let apiVersionApp = [`${host}/api/apps`];

        let pullVersionDhis = await _axios({
            url: apiVersionDhis.join(''),
            auth: this.INIT_AUTH || auth,
            method: 'GET'
        });

        let pullVersionApp = await _axios({
            url: apiVersionApp.join(''),
            auth: this.INIT_AUTH || auth,
            method: 'GET'
        });
        let versionApp = pullVersionApp.data.find(e => e.folderName.includes('reportv2'))?.version
        let versionDhis = pullVersionDhis?.data?.version
        return {
            versionDhis,
            versionApp
        }
    }

    filterCloseOrgUnit = async function (childOrg, periods) {
        /** 
         * remove closeOrgUnit is closed
         * return orgUnit available by startData&endDate
         * @param childOrg : Array org from sourceJson. Ex:  organisationUnits:["a","b","c",...]
         * @param periods : result output period in link analystic . Ex : 202001;202002;202003;202004
         */

        let listOrg = cloneDeep(childOrg)


        var validateOrgDate = function (
            removeEle
            // = {
            //     openingDate: '2024-12-01',
            //     closedDate: '2024-12-01'
            // }
            ,
            period
            // = '2025'
        ) {
            let firstPeriod = `${periods}`.split(";")?.shift();
            let lastPeriod = `${periods}`.split(";")?.pop();
            try {
                let startDate, endDate;

                if (/^\d{4}$/.test(firstPeriod)) { // Yearly period in format YYYY
                    startDate = parseISO(`${firstPeriod}-01-01`);
                    endDate = parseISO(`${lastPeriod}-12-31`);
                } else if (/^\d{6}$/.test(firstPeriod)) { // Monthly period in format YYYYMM
                    const yearStartDate = firstPeriod.slice(0, 4);
                    startDate = parseISO(`${yearStartDate}-${firstPeriod.slice(4, 6)}-01`);

                    const yearEndDate = lastPeriod.slice(0, 4);
                    endDate = parseISO(`${yearEndDate}-${lastPeriod.slice(4, 6)}-01`);
                    endDate.setMonth(endDate.getMonth() + 1);
                    endDate.setDate(endDate.getDate() - 1);
                } else if (/^\d{4}Q[1-4]$/.test(firstPeriod)) { // Quarterly period in format YYYYQ1, YYYYQ2, YYYYQ3, YYYYQ4
                    const year = firstPeriod.slice(0, 4);
                    const quarter = period.slice(5);
                    if (quarter === 'Q1') {
                        startDate = parseISO(`${year}-01-01`);
                        endDate = parseISO(`${year}-03-31`);
                    } else if (quarter === 'Q2') {
                        startDate = parseISO(`${year}-04-01`);
                        endDate = parseISO(`${year}-06-30`);
                    } else if (quarter === 'Q3') {
                        startDate = parseISO(`${year}-07-01`);
                        endDate = parseISO(`${year}-09-30`);
                    } else if (quarter === 'Q4') {
                        startDate = parseISO(`${year}-10-01`);
                        endDate = parseISO(`${year}-12-31`);
                    }
                }
                else if (/^\d{4}S[1-2]$/.test(firstPeriod)) { // Half-year period in format YYYYS1, YYYYS2
                    const year = firstPeriod.slice(0, 4);
                    const semester = period.slice(4);
                    if (semester === 'S1') {
                        startDate = parseISO(`${year}-01-01`);
                        endDate = parseISO(`${year}-06-30`);
                    } else if (semester === 'S2') {
                        startDate = parseISO(`${year}-07-01`);
                        endDate = parseISO(`${year}-12-31`);
                    }
                } else {
                    throw new Error('Unsupported period format');
                }
                const openingDate = parseISO(removeEle.openingDate);
                const closedDate = removeEle.closedDate ? parseISO(removeEle.closedDate) : null;

                if (closedDate && isBefore(closedDate, startDate)) {
                    return false;
                }

                if (
                    isAfter(openingDate, endDate)
                ) {
                    return false;
                }

                return true;
            } catch (e) {

            }
        }

        function chunkArrayToPromise(mArray, chunk) {
            let resultArray = []
            var i, j, temparray;
            for (i = 0, j = mArray.length; i < j; i += chunk) {
                temparray = mArray.slice(i, i + chunk);
                let url = `/api/organisationUnits.json?fields=id,closedDate,openingDate&paging=false&filter=id:in:[${temparray.join(",")}]`
                resultArray.push(url)
            }
            return resultArray
        }
        let listApi = chunkArrayToPromise(childOrg, 300)
            .map(url => cb => this._get({ api: url })
                .then(e => cb(null, e.organisationUnits)
                ).catch(x => {
                    console.log(x)
                })
            );
        let orgObjPulled = await parallel(listApi)
        let orgPulled = flatten(orgObjPulled)
        if (orgPulled.length > 0) {
            orgPulled.forEach(removeEle => {


                //Case hide
                const isValid = validateOrgDate(removeEle, periods);
                if (!isValid) {
                    var index = listOrg.indexOf(removeEle.id);
                    if (index > -1) {
                        listOrg.splice(index, 1);
                    }
                }
            })
        }
        return listOrg

    }

    //Notice: In version 2.38 need to add authority view_user to read data from attribute
    getMe = async function ({ host = this.INIT_HOST, auth = this.INIT_AUTH, includeSettings }) {
        let userID
        try {
            userID = await this._get({ api: `/api/me.json?fields=id` })
        } catch (e) {
            console.log(e);
        };

        let listRequest = [];
        listRequest.push(
            this._get.bind(this, { api: `/api/users/${userID?.id}.json?fields=:all,*,userRoles[:owner],organisationUnits[id,name,programs,attributeValues[:owner]],attributeValues[:owner]` })
        )
        if (includeSettings) listRequest.push(this.getUserSettings.bind(this, { host, auth }));

        listRequest = listRequest.map(e => {
            return function (callback) {
                e().then(data => callback(undefined, data))

            }
        }
        );
        let listRequestResult = await parallel(listRequest);
        let meData = listRequestResult[0];
        let userSettings = listRequestResult[1];

        meData.userSettings = userSettings;

        if (meData?.userGroups?.some(a => _constant.userGroupAdmin?.some(b => b === a.id))
            || meData?.authorities?.some(e => e === 'ALL')
            || meData?.userRoles?.some(e => e.code === 'Superuser')
        ) {
            meData['isSuperuser'] = true;
        }

        meData['approvalAuthorization'] = {
            canAccept: (meData.userRoles || []).some(e => ['brIf10e0Vk2'].includes(e.id)),
            canApprove: (meData.userRoles || []).some(e => ['kzz8Dl43AEX'].includes(e.id))
        }


        return meData

    }

    getListReport = async function ({ host = this.INIT_HOST, auth = this.INIT_AUTH }) {
        let urlListReport = `${host}/api/reports.json?paging=false`;
        let reportList = await _axios({
            url: urlListReport,
            auth: auth
        })
        return reportList.data
    }

    ping = function ({ host = this.INIT_HOST, auth = this.INIT_AUTH }) {
        let url = [`${host}/api/me.json?fields=id`];
        let rs = {};
        return new Promise(async (resolve, reject) => {
            let pingRs
            try {
                pingRs = await _axios({
                    url: url.join(''),
                    auth: this.INIT_AUTH || auth,
                    method: 'GET'
                });
                let rs = {
                    isAuthorize: true
                }
                switch (pingRs.status) {
                    case 503: {
                        rs['unknowError'] = 'Hệ thống đang quá tải vui lòng quay lại sau';
                        rs.isAuthorize = false;
                        break;
                    }
                    case 404: {
                        rs['unknowError'] = 'Hệ thống đang quá tải vui lòng quay lại sau';
                        rs.isAuthorize = false
                        break;
                    }
                    default:
                        break;
                }

                resolve(rs);
            } catch (e) {
                pingRs = e;
                if (e.message == 'Network Error') {
                    rs['unknowError'] = e.message;
                    rs['isAuthorize'] = false
                } else {
                    rs['isAuthorize'] = true;
                }
                resolve(rs);
                return;
            }

            if (
                [401, 502, 302].includes(pingRs?.error?.response?.data?.httpStatusCode) || !pingRs?.data?.id
            ) {
                rs['isAuthorize'] = false;
            } else {
                rs['isAuthorize'] = true;
            }



            resolve(rs);
        })
    }

    queryOrgByLevel = ({
        orgID,
        level
    }) => {
        let customFilter = [
            `${level ? `level:eq:${level}` : undefined}`,
            `${orgID ? `id:eq:${orgID}` : undefined}`
        ].filter(e => ![undefined, 'undefined'].includes(e)).join('&');

        if (customFilter.length != 0) {
            customFilter = `filter=` + customFilter;
        }
        const defaultFields = `ancestors[id,name,code,level],code,programs,organisationUnitGroups[id,name]`
        let url = [
            this.INIT_HOST,
            `/api/organisationUnits.json?${customFilter}`,
            `&fields=!geometry,:owner,displayName,${defaultFields},level,children[${defaultFields},id,level,displayName,name,children[${defaultFields},id,level,name,displayName,children[${defaultFields},id,level,name,displayName]]]`,
            // `&filter=children.children:!eq:0`,
            `&paging=false`
        ].join('');
        return _axios({
            url,
            method: "GET",
            auth: this.INIT_AUTH
        })
    }

    findOrgByGSO = function ({ host = this.INIT_HOST, GSO }) {
        let url = [
            `${host}/api/organisationUnits.json?fields=id,name,displayName,level,ancestors[id,name,level],code&filter=code:in:[${GSO}]&paging=false`,
        ];

        return new Promise((resolve, reject) => {
            _axios({
                url: url.join(''),
                auth: this.INIT_AUTH,
                method: 'GET'
            }).then(e => {
                resolve(e.data)
            }).catch(e => {
                resolve({ error: e })
            })
        })
    }

    findOrgByID = function ({ host = this.INIT_HOST, orgID, fields }) {
        let url = [
            `${host}/api/organisationUnits/${orgID}.json?fields=${fields ? fields + ',' : ''}:owner,displayName,id,name,level,ancestors[id,name,code,level],code,programs,children[id,displayName,name,code,attributeValues,organisationUnitGroups],organisationUnitGroups&paging=false`,
        ];


        return new Promise((resolve, reject) => {
            _axios({
                url: url.join(''),
                auth: this.INIT_AUTH,
                method: 'GET'
            }).then(e => {
                let orgPull = e.data
                orgPull.orgType = (this.instanceTarget.classifyingOrgSelected)(orgPull);
                resolve(orgPull)
            }).catch(e => {
                resolve({ error: e })
            })
        })
    }

    fetchAnalyticsData = async (data) => {
        let { dx, orgUnit, period, idOrgGroupSet, skipMeta, orgUnitGroup,
            ouQueryType = 'dimension',
            ouGroupSetQueryType = 'filter'
            , includeCo = true } = data;
        let ou = orgUnitGroup ? (orgUnitGroup.map(e => "OU_GROUP-" + e + ";")).join("") + orgUnit : orgUnit;
        let url = [`/api/32/analytics.json?`,
            `dimension=dx:${Object.values(dx)?.join(';')}`,
            `${includeCo ? "dimension=co" : ''}`,
            `${ouQueryType}=ou:${ou}`,
            `filter=pe:${period}`,
            `displayProperty=NAME`,
            `includeMetadataDetails=true`,
            `${[undefined, false].includes(skipMeta) ? `&skipMeta=false` : '&skipMeta=true'}`]

        if (idOrgGroupSet) {
            url.push(`${ouGroupSetQueryType}=${idOrgGroupSet}`);
        }
        let apiData = await pull(url.join('&'))
            .catch((err) => {
                throw new BaseError({
                    msg: ERROR_TYPE.BAD_REQUEST,
                    description: err.message
                })
            });
        return apiData
    }

    findOptionSetByDataElementID = function ({ host = this.INIT_HOST, dataElements, attributes }) {
        return new Promise(async (resolve, reject) => {
            //prepare map de and optionSet
            let urlDe = [
                `${host}`
                , `/api/dataElements.json?fields=id,name,optionSet[id,name]`
                , `&filter=id:in:[${dataElements.join(',')}]&paging=false`,
            ];

            let pullDeAndOptionSets = await _axios({
                url: urlDe.join(''),
                auth: this.INIT_AUTH,
                method: 'GET'
            });
            let mapDeAndOptionSets = pullDeAndOptionSets.data.dataElements.filter(e => e.optionSet).map(e => {
                return {
                    de: e.id,
                    optionSet: e.optionSet
                }
            })

            let listOptionSets = [...new Set(mapDeAndOptionSets.map(e => e.optionSet.id))];
            let urlOptionSets = [
                `${host}`
                , `/api/optionSets.json?fields=id,name,options[id,name,code]`
                , `&filter=id:in:[${listOptionSets.join(',')}]&paging=false`,
            ];
            let pullOptions = await _axios({
                url: urlOptionSets.join(''),
                auth: this.INIT_AUTH,
                method: 'GET'
            });

            let result = mapDeAndOptionSets
                .map(e => {
                    let options = pullOptions.data.optionSets.find(x => x.id == e.optionSet.id).options;
                    e.optionSet['options'] = options;
                    return e;
                }).reduce((tt, e) => {
                    tt[e.de] = e.optionSet;
                    return tt;
                }, {})
                ;

            // logger.debugT(result);

            resolve(result)
            //Pull options

            // .then(e => {
            //     resolve(e.data)
            // }).catch(e => {
            //     resolve({ error: e })
            // })
        })
    }

    getOptionSetByID = function ({ host = this.INIT_HOST, optionSetsID }) {
        optionSetsID = uniq(optionSetsID);
        let cacheOptionSets = CacheUtils.get('optionSets') || [];

        let optionSetExists = cacheOptionSets;
        let optionSetIDPull = []

        optionSetsID.forEach(osID => {
            let exists = cacheOptionSets?.find(e => e.id == osID);
            if (!exists) {
                optionSetIDPull.push(osID)
            }
        })


        if (optionSetIDPull.length == 0) {
            optionSetExists = cacheOptionSets
            return Promise.resolve(optionSetExists);
        }


        return new Promise(async (resolve, reject) => {
            let urlOptionSets = [
                `${host}`
                , `/api/optionSets.json?fields=id,name,options[id,name,code,translations[property,locale,value]]`
                , `&filter=id:in:[${optionSetIDPull.join(',')}]`
                , `&paging=false`,
            ];
            let pullOptions = await _axios({
                url: urlOptionSets.join(''),
                auth: this.INIT_AUTH,
                method: 'GET'
            }).then(e => {
                let optionSets = e.data.optionSets;
                optionSets = [
                    ...optionSets,
                    ...optionSetExists
                ].map((optionSet, idx, array) => {
                    if (!optionSet['optionsKeyName']) optionSet['optionsKeyName'] = groupBy(
                        optionSet.options.map(opt => {
                            opt.keyName = compareString.cleanStr(
                                opt.name
                            )
                            return opt;

                        }), 'keyName'
                    );
                    if (!optionSet['optionsKeyNameTrans']) optionSet['optionsKeyNameTrans'] = groupBy(
                        optionSet.options.map(opt => {
                            opt.keyName = compareString.cleanStr(
                                opt?.translations?.[0]?.value || ""
                            )
                            return opt;

                        }), 'keyName'
                    );
                    if (!optionSet['optionsKeyCode']) optionSet['optionsKeyCode'] = groupBy(
                        optionSet.options.map(opt => {
                            opt.keyName = opt.code
                            return opt;

                        }), 'keyName'
                    );
                    return optionSet
                })
                CacheUtils.add('optionSets', optionSets);
                resolve(optionSets);
            });
        })
    }
    findOptionSetByObjectID = function ({ host = this.INIT_HOST, dataElements, attributes }) {
        return new Promise(async (resolve, reject) => {
            //prepare map de and optionSet
            let APIs = []
            if (dataElements && dataElements.length != 0) {
                APIs.push([
                    `${host}`
                    , `/api/dataElements.json?fields=id,name,optionSet[id,name]`
                    , `&filter=id:in:[${dataElements.join(',')}]&paging=false`,
                ])
            }
            if (attributes && attributes.length != 0) {
                APIs.push([
                    `${host}`
                    , `/api/trackedEntityAttributes.json?fields=id,name,optionSet[id,name]`
                    , `&filter=id:in:[${attributes.join(',')}]&paging=false`,
                ])
            }
            let apiOptionSet = await Promise.all(APIs.map(e =>
                _axios({
                    url: e.join(''),
                    auth: this.INIT_AUTH,
                    method: 'GET'
                })
            ))

            let mapDeAndOptionSets = flatten(apiOptionSet.map(e => {
                let [key, value] = Object.entries(e.data)[0];
                let rs = value.map(x => {
                    x['objectType'] = key
                    return x;
                });
                return rs
            })).map(e => {
                return {
                    ...e,
                    objectID: e.id,
                    optionSet: e.optionSet
                }
            });

            let listOptionSets = [...new Set(mapDeAndOptionSets.map(e => e?.optionSet?.id))].filter(e => ![undefined].includes(e));
            let pulledOptionSets = await this.getOptionSetByID({ optionSetsID: listOptionSets })
            let result = mapDeAndOptionSets
                .map(e => {
                    e.optionSet = pulledOptionSets.find(pulledOs => pulledOs?.id == e?.optionSet?.id)
                    return e;
                }).reduce((tt, e) => {
                    tt[e.objectID] = {
                        objectType: e.objectType,
                        optionSet: e.optionSet
                    };
                    return tt;
                }, {})
                ;

            //Filter optionSet is defined
            let tempRs = Object.entries(result).filter(e => e[1].optionSet);
            resolve(
                Object.fromEntries(tempRs)
            )
        })
    }

    updateAttribute = function ({
        host = this.INIT_HOST,
        orgID,
        attributes,
        meData,
        mDelete
    }) {

        return new Promise(async (resolve, reject) => {
            if (!orgID) {
                resolve();
                return;
            }
            let orgData = await this.findOrgByID({
                orgID,
                fields: ':all'
            })
            orgData['attributeValues'] =
                orgData['attributeValues'] ||
                [];

            if (mDelete) {
                orgData['attributeValues'] = [];
            } else {
                attributes && attributes.forEach(attrInput => {
                    let foundAttr = orgData['attributeValues']?.find(attrCurrentObject => attrInput?.attribute?.id === attrCurrentObject?.attribute?.id);
                    if (foundAttr) {
                        foundAttr.value = attrInput.value;
                    } else {
                        orgData['attributeValues'].push(attrInput)
                    }
                });
            }

            await this.importToInstance({
                async: false,
                dryRun: false,
                mergeMode: "REPLACE",
                data: {
                    organisationUnits: [orgData]
                }
            }).then(e => {
                resolve(e);
                let orgInSystems = `${orgData.displayName}${meData?.isSuperuser ? `(${orgData.id})` : ''}`
                if (!attributes || attributes?.length == 0) {
                    resolve(e);
                    return;
                }
                let description = mDelete ? (<p>Đã xoá liên kết đơn vị {attributes[0].value} với đơn vị hệ thống: <span style={{ fontWeight: 800 }}>{orgInSystems}</span></p>)
                    : (<p>Đã liên kết thành công đơn vị {attributes[0].value} với đơn vị hệ thống: <span style={{ fontWeight: 800 }}>{orgInSystems}</span></p>);
                // notification.success({
                //     message: 'Thành công',
                //     description
                // })
            }).catch(e => {
                // notification.error({
                //     message: 'Thất bại',
                //     description: `Vui lòng chọn lại`
                // })
                resolve(e)
            })
        })
    }

    sendingDataValueSets = function ({ host = this.INIT_HOST, data, dryRun = false, importStrategy = 'CREATE_AND_UPDATE'//CREATE | UPDATE | CREATE_AND_UPDATE | DELETE
    }) {
        let url = [
            `${host}/api/dataValueSets?`,
            [`dryRun=${dryRun}`
                , `importStrategy=${importStrategy}`
            ].join('&')
        ].join('');
        return new Promise((resolve, reject) => {
            _axios({
                url: url,
                auth: this.INIT_AUTH,
                method: 'POST',
                data
            }).then(e => {
                resolve(e.data)
            }).catch(e => {
                resolve({ error: e?.response?.data })
            })
        })
    }

    _post = async ({ host = this.INIT_HOST, auth = this.INIT_AUTH, api, data, method = 'POST', axiosConfig = {}, ignoreGlobalConfigAxios }) => {
        return new Promise(async (resolve, reject) => {
            let url = encodeURI(host + api);
            await _axios({
                url, auth,
                method,
                data,
            }).then(e => {
                resolve(e.data)
            }).catch(e => {
                reject(e);
            });
        })
    }

    getApprovalUtils = async function () {
        const obj = this.injectBasicMethod(await import('./ApprovalUtils').then(e => e.default));
        this.ApprovalUtils = obj
        return obj
    }

    getImportEventUtils = function () {
        return this.injectBasicMethod(ImportEventUtils)
    }
    injectBasicMethod = (utilsModule) => {
        let host = this.INIT_HOST;
        let headers = { Authorization: `ApiToken ${this.TOKEN}` };
        utilsModule = utilsModule.init({ host, headers, _metaDataUtilsInput: this });
        utilsModule._post = this._post
        utilsModule._get = this._get
        utilsModule.NetworkUtils = this;
        return utilsModule
    }
}

export const networkUtils = new NetworkUtils()
