import { useCoreMetaState } from "@state/metadata";

export class OptionSetUtils {
    init = () => { }
    pullData = async (objects) => {
        let networkUtils = useCoreMetaState.getState().networkUtils
        return networkUtils.findOptionSetByObjectID(objects);
    }
}