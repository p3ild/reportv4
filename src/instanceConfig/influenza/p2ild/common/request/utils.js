import { ORG_GROUP, ORG_SELECTED_TYPE } from "../constant";

export const classifyingOrgSelected = (orgApi) => {
    let orgType
    switch (true) {
        case orgApi.level === 1:
            orgType = ORG_SELECTED_TYPE.COUNTRY;
            break;
        // Org is province
        case orgApi.level === 2
            && orgApi.organisationUnitGroups.some(e => e.id === ORG_GROUP.TINH_DVHC):
            orgType = ORG_SELECTED_TYPE.PROVINCE;
            break;
        case orgApi.level === 3
            && orgApi.organisationUnitGroups.some(e => e.id === ORG_GROUP.XA_DVHC):
            orgType = ORG_SELECTED_TYPE.COMMUNE;
            break;
        default:
            break;
    }
    return orgType
}