import {getAll, getByFeatureFlagId, getByUserId} from "../../../../db/services/userFeatureFlagService";
import {QueryResolvers, UserFeatureFlag} from '../../../../generated/types';

export const getUserFeatureFlags: QueryResolvers['getUserFeatureFlags'] = async () => {

    const all = await getAll()

    return all.map(user => {
        return user;
    }) as unknown as UserFeatureFlag[]

}

export const getUserFeatureFlagsByUser:
    QueryResolvers['getUserFeatureFlagsByUser'] = async (
        _: any,
        args: { userId: string},
) => {

    const all = await getByUserId(args.userId)

    return all.map(user => {
        return user;
    }) as unknown as UserFeatureFlag[]

};

export const getUserFeatureFlagsByFeatureFlag:
    QueryResolvers['getUserFeatureFlagsByFeatureFlag'] = async (
        _: any,
        args: { featureFlagId: string },
) => {

    const all = await getByFeatureFlagId(args.featureFlagId)

    return all.map(user => {
        return user;
    }) as unknown as UserFeatureFlag[]

};
