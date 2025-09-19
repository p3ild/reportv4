import { PERIOD_TYPE } from '@core/ui/picker/periodpicker/periodpicker'
import { ORG_GROUP } from '../../common/constant'

export * from '../../common/constant'

export const optionPickerDate = [
    PERIOD_TYPE.month,
    PERIOD_TYPE.month2,
    PERIOD_TYPE.year,
]

export const orgPickerConfig = {
    orgGroupVisible: [
        ORG_GROUP.TINH_CSYT_CONG_KCB,
        ORG_GROUP.TINH_YTTN,
        ORG_GROUP.TW_CSYT_KCB,
        ORG_GROUP.TW_YT_NGANH,

        ORG_GROUP.TINH_DVHC,
    ],
    levelsToHideIfEmpty: [2, 3, 4]
}