import { useCoreMetaState } from "@core/stateManage/metadataState";
import { BaseError, ERROR_TYPE } from "../BaseError";
import { classifyingOrgSelected } from "./utils";
import { cloneDeep, zipObject } from "lodash";

const _get = useCoreMetaState.getState()._get;
const networkUtils = useCoreMetaState.getState().networkUtils;

export const fetchAnalyticsData = async (data) => {
    let { dx, orgUnit, period, idOrgGroupSet, skipMeta, orgUnitGroup,
        ouQueryType = 'dimension',
        customDimension = [],
        periodQueryType,
        ouGroupSetQueryType = 'filter'
        , includeCo = true } = data;
    let ou = orgUnitGroup ? (orgUnitGroup.map(e => "OU_GROUP-" + e + ";")).join("") + orgUnit : orgUnit;
    let url = [`/api/32/analytics.json?`,
        `dimension=dx:${Object.values(dx)?.join(';')}`,
        ...customDimension,
        `${includeCo ? "dimension=co" : undefined}`,
        `${ouQueryType}=ou:${ou}`,
        `${period ? `${periodQueryType || 'filter'}=pe:${period}` : undefined}`,
        `displayProperty=NAME`,
        `includeMetadataDetails=true`,
        `${[undefined, false].includes(skipMeta) ? `&skipMeta=false` : '&skipMeta=true'}`]
        .filter(e => ![undefined, 'undefined', false].includes(e))

    if (idOrgGroupSet) {
        url.push(`${ouGroupSetQueryType}=${idOrgGroupSet}`);
    }
    // console.log('Query URL: ', url.join('&'))
    let apiData = await _get(url.filter(e => e).join('&'))
        .catch((err) => {
            let msg = err?.message
            if (err?.response?.data?.errorCode == "E7124") {
                msg = 'Báo cáo không hỗ trợ đơn vị này'
            }
            if (err?.response?.data?.errorCode == "E7143") {
                msg = 'Nhóm đơn vị k hỗ trợ đơn vị này (Organisation unit or organisation unit level is not valid)'
            }

            if (err)
                throw new BaseError({
                    msg,
                    description: err.message
                })
        });
    let ouIndex = Object.values(apiData.headers).findIndex(e => e.name == "ou");
    let orgIsOpening = await networkUtils.filterCloseOrgUnit(apiData.metaData.dimensions.ou, cloneDeep(period))
    if (ouIndex != -1) {
        apiData.rows = apiData.rows.filter(e => orgIsOpening.includes(e[ouIndex]));
        apiData.metaData.dimensions.ou = orgIsOpening;
    }
    apiData.rowAsObject = apiData.rows.map(e => {
        return zipObject(apiData.headers.map(e => e.name), e)
    })
    return apiData
}

export const fetchAnalyticsEvent = async (data) => {
    let { dx,
        program,
        stage,
        orgUnit, period, idOrgGroupSet, skipMeta, orgUnitGroup,
        ouQueryType = 'dimension',
        customDimension = [],
        ouGroupSetQueryType = 'filter'
        , includeCo = true
        , page
        , defaultPageSize
    } = data;
    let ou = orgUnitGroup ? (orgUnitGroup.map(e => "OU_GROUP-" + e + ";")).join("") + orgUnit : orgUnit;
    let url = [`/api/29/analytics/events/query/${program}.json?outputType=EVENT`,
    `dimension=pe:${period}`,
    // `dimension=pe:THIS_MONTH;LAST_6_MONTHS`,//test
    dx.map(e => `dimension=${e}`).join("&"),
    ...customDimension,
    `${ouQueryType}=ou:${ou}`,
    `&stage=${stage}`,
    `pageSize=${defaultPageSize}&page=${page || 1}`
    ].filter(e => ![undefined, false].includes(e));

    // console.log('Query URL: ', url.join('&'))
    let apiData = await _get(
        encodeURI(url.filter(e => e).join('&'))
    )
        .catch((err) => {
            throw new BaseError({
                msg: ERROR_TYPE.BAD_REQUEST,
                description: err.message
            })
        });
    return apiData
}

export const findOrgByID_deprecate = async function ({ orgID, fields }) {
    let url = [
        `/api/organisationUnits/${orgID}.json?fields=${fields ? fields + ',' : ''}:owner,displayName,id,name,level,code,programs,children[id,displayName,name,code,attributeValues,organisationUnitGroups],organisationUnitGroups&paging=false`,
    ];

    let apiData = await pull(url.join(',')).then(
        orgPull => {
            orgPull.orgType = classifyingOrgSelected(orgPull);
            return orgPull
        }
    )
        .catch((err) => {
            throw new BaseError({
                msg: ERROR_TYPE.BAD_REQUEST,
                description: err.message
            })
        });
    return apiData
}

export const findOptionSetByDataElementID = async function ({ dataElements, attributes }) {

    let APIs = []
    if (dataElements && dataElements.length != 0) {
        APIs.push([
            `/api/dataElements.json?fields=id,name,optionSet[id,name]`
            , `&filter=id:in:[${dataElements.join(',')}]&paging=false`,
        ])
    }
    if (attributes && attributes.length != 0) {
        APIs.push([
            `/api/trackedEntityAttributes.json?fields=id,name,optionSet[id,name]`
            , `&filter=id:in:[${attributes.join(',')}]&paging=false`,
        ])
    }
    let apiOptionSet = await Promise.all(APIs.map(e =>
        pull(e.join(''))
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
    let urlOptionSets = [
        `/api/optionSets.json?fields=id,name,options[id,name,code,translations[property,locale,value]]`
        , `&filter=id:in:[${listOptionSets.join(',')}]&paging=false`,
    ];
    let pullOptions = await pull(urlOptionSets.join(''));
    let result = mapDeAndOptionSets
        .map(e => {
            let options = pullOptions.data.optionSets.find(x => x.id == e?.optionSet?.id)?.options;
            if (options) e.optionSet['options'] = options;
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
}