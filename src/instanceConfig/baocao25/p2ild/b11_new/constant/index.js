import { PERIOD_TYPE } from '@core/ui/picker/periodpicker/periodpicker'
import { ORG_GROUP } from '../../common/constant'

export * from './TableHeader1'
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
        ORG_GROUP.XA_CSYT_KHAC,
        ORG_GROUP.XA_TYT
    ],
    levelsToHideIfEmpty: [2, 3]
}