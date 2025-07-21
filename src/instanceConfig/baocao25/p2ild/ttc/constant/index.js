import { PERIOD_TYPE } from '@core/ui/picker/periodpicker/periodpicker'
import { ORG_GROUP } from '../../common/constant'
export * from './TableHeader'
export * from '../../common/constant'

export const optionPickerDate = [
    PERIOD_TYPE.year
]

export const orgPickerConfig = {
    orgGroupVisible: [
        ORG_GROUP.TINH_DVHC,
        ORG_GROUP.XA_DVHC,
    ],
    // levelsToHideIfEmpty: [3]
}