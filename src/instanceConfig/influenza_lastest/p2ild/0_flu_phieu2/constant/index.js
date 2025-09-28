import { PERIOD_TYPE } from '@core/ui/picker/periodpicker/periodpicker'
import { ORG_GROUP } from '../../common/constant'

export * from './TableHeader'
export * from '../../common/constant'

export const optionPickerDate = [
    
    PERIOD_TYPE.quarterClassic,
    PERIOD_TYPE.quarterClassic2,
    PERIOD_TYPE.weekClassic,
    PERIOD_TYPE.weekClassic2,
    PERIOD_TYPE.month,
    PERIOD_TYPE.month2,
    PERIOD_TYPE.year,
]

export const orgPickerConfig = {
    // orgGroupVisible: [

    // ],
    // levelsToHideIfEmpty: [2]
}