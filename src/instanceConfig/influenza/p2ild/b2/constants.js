import { getCoreMetaStateByPath } from "@core/stateManage/metadataState"

// Constants for organization unit groups
export const groupSelectTinh = "W4U1KdFeIJH"

// Organization level types configuration
export const LEVEL_ORG_SELECT_TYPE = {
    TW: { type: 'bctw', tableID: 'bch', err: 'Biểu này không áp dụng cho cấp trung ương' },
    TINH: { type: 'bct', tableID: 'bch' },
    HUYEN: { type: 'bch', tableID: 'bch' },
    XA: { type: 'bcx', tableID: 'bcx', err: 'Biểu này không áp dụng cho cấp xã' },
    INDIVIDUAL_TINH: { type: 'INDIVIDUAL_TINH', tableID: 'bch' },
    INDIVIDUAL_HUYEN: { type: 'INDIVIDUAL_HUYEN', tableID: 'bch' },
    HUYEN_TTTYT: { type: 'HUYEN_TTYT', tableID: 'bch' }
}

// PHAN_LOAI_TU_CHU constants from old.js
export const PHAN_LOAI_TU_CHU = {
    DEFAULT: "AHjo8UIXD3A.HllvX50cXC0",
    KCB: "AHjo8UIXD3A.L8pQx55Qgli", 
    YTDP: "AHjo8UIXD3A.E1n8AO47ANx",
    TOTAL: "COUNT_DEFAULT_KCB_YTDP"
}



// Mock data for undefined variables
export const mockData = {
    // Organization selected data
    orgSelected: {
        id: "pfBdcq5GEL7",
        name: "Ministry of Health"
    },

    // Periods data
    periods: "2024",

    // Organization hierarchy
    // Load counter
    load: 0,

    // Real organization unit group IDs from old.js
    sumAll: [], // Will be calculated dynamically based on org type
    sumA: [], // Will be calculated dynamically
    sumI: ["jgV9URjpxg6"], // For TINH level
    sumII: ["yqvDZQJVy6M"], // For TINH level
    sumIII: ["OHWM3DxkeMR"], // For TINH level
    sumI_1_1: ["cok1O2ZxSq6"], // Bệnh viện huyện
    sumI_1_2: ["lk5CPOZigtj", "h72BaPhNC5o"], // Phòng khám đa khoa
    sumI_1_3: ["JchZd7bGhgr"], // TTYT huyện
    sumB1: ["CWJhX4J23Z0"],
    sumB2: ["YmgWbPl47ua"],

    // Serial number counter
    seri: 1,
    stt: 0,

    // Number of columns for catch handling
    numberColumnCatch: 17,

    // Array for column data
    arrColumn: [],
    arrGroupByPhanLoai: {},



    // Organization unit selected group ID
    orgUnitSelectedGroupID: []
}

// Mock functions
export const mockFunctions = {

    // Mock get function for API calls
    get: (url, callback) => {
        let networkUtils = getCoreMetaStateByPath('networkUtils');

        console.log(`Mock API call to: ${url}`)
        const mockResponse = {
            metaData: {
                items: {
                    [mockData.orgSelected.id]: { name: mockData.orgSelected.name },
                    mockOrgChild1: { name: "Mock Child Org 1" },
                    mockOrgChild2: { name: "Mock Child Org 2" }
                },
                dimensions: {
                    ou: ["mockOrgChild1", "mockOrgChild2"]
                }
            },
            headers: [
                { name: "dx", column: "Data Element", type: "java.lang.String", hidden: false, meta: true },
                { name: "ou", column: "Organisation Unit", type: "java.lang.String", hidden: false, meta: true },
                { name: "pe", column: "Period", type: "java.lang.String", hidden: false, meta: true },
                { name: "value", column: "Value", type: "java.lang.Double", hidden: false, meta: false }
            ],
            rows: [
                ["mockDataElement1", "mockOrgChild1", "202301", "100"],
                ["mockDataElement2", "mockOrgChild2", "202301", "200"]
            ]
        }

        // Simulate async behavior
        setTimeout(() => {
            callback(mockResponse)
        }, 100)
    },

    // Mock jQuery function
    $: (selector) => ({
        append: (html) => console.log(`Appending HTML to ${selector}: ${html}`)
    }),

    // Mock p2ild object
    p2ild: {
        dvu: {
            defineHeader: (headers) => ({
                iOu: 1,
                iDe: 0,
                iValue: 3
            }),
            getValueSum: (json, elements, orgId, dataType) => {
                return Math.floor(Math.random() * 1000).toString()
            },
            getValueDE: (json, elements, orgId, dataType, options, hideZero) => {
                return Math.floor(Math.random() * 1000).toString()
            },
            dataTypesSupport: {
                MONEY: "MONEY"
            }
        },
        ou: {
            stringGroups: (groups, orgId) => {
                return groups.concat([orgId]).join(";")
            },
            remapResultByAncestor: (json, level) => {
                return Promise.resolve(json)
            }
        },
        ExportDataUtils: {
            cloneTableDataWithoutLib: {
                apply: () => console.log("Mock export data utils applied")
            }
        },
        DesignUtil: {
            hidePreload: () => console.log("Mock preload hidden")
        },

    },



    // Mock lodash
    _: {
        groupBy: (array, key) => {
            const result = {}
            array.forEach(item => {
                const groupKey = typeof key === 'function' ? key(item) : item[key]
                if (!result[groupKey]) result[groupKey] = []
                result[groupKey].push(item)
            })
            return result
        }
    }
} 