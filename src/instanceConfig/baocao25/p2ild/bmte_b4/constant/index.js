import { PERIOD_TYPE } from '@core/ui/picker/periodpicker/periodpicker'
import { ORG_GROUP } from '../../common/constant'

export * from './TableHeader'
export * from '../../common/constant'

export const optionPickerDate = [
    PERIOD_TYPE.month,
    PERIOD_TYPE.month2,
    PERIOD_TYPE.year,
]

export const orgPickerConfig = {
    orgGroupVisible: [
        ORG_GROUP.TINH_DVHC,
        ORG_GROUP.XA_DVHC,
        ORG_GROUP.TW_CSYT_CSSK_BM,
        ORG_GROUP.TINH_CSYT_CONG_CSSK_BM,
        ORG_GROUP.TINH_YTTN_CSSK_BM,
    ],
    levelsToHideIfEmpty: [2, 3]
}