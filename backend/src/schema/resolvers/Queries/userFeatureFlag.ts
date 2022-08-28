import {getAll} from "../../../db/services/userFeatureFlagService";
import {QueryResolvers, UserFeatureFlag} from '../../../generated/types';

export const resolve: QueryResolvers['getUserFeatureFlags'] = async (
) => {

    const all = await getAll()
    console.log(all);
    return all.map(user => {
        return user;
    }) as unknown as UserFeatureFlag[]

};
