import {getAll} from "../../../db/services/featureFlagService";
import {FeatureFlag, QueryResolvers} from '../../../generated/types';

export const resolve: QueryResolvers['getFeatureFlags'] = async (
) => {

    const all = await getAll()

    return all.map(user => {
        return user;
    }) as unknown as FeatureFlag[]


};
