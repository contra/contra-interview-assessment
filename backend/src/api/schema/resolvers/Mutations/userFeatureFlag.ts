import moment from "moment/moment";
import {UserFeatureFlagInput} from "../../../../db/models/UserFeatureFlag";
import {
    addFeatureFlagToUser, addFeatureFlagToUsers,
    removeFeatureFlag,
    removeFeatureFlagFromUser
} from "../../../../db/services/userFeatureFlagService";
import {MutationResolvers, UserFeatureFlag} from '../../../../generated/types';

export const addFeatureFlagToUserM:
    MutationResolvers['addFeatureFlagToUser'] = async (
    _: any,
    args: { featureFlagId: string, userId: string },
) => {
    const payload = {
        createdDate: moment().toString(),
        featureFlagId: args.featureFlagId,
        updatedDate: moment().toString(),
        userId: args.userId
    } as unknown as UserFeatureFlagInput

    const all = await addFeatureFlagToUser(payload)

    return all as unknown as UserFeatureFlag

};

export const addFeatureFlagToUsersM:
    MutationResolvers['addFeatureFlagToUser'] = async (
    _: any,
    args: { featureFlagId: string, userIds: [] },
) => {
    const payload = args.userIds.map(userId =>{
        return {
            createdDate: moment().toString(),
            featureFlagId: args.featureFlagId,
            updatedDate: moment().toString(),
            userId
        }
    }) as unknown as UserFeatureFlagInput[]

    const all = await addFeatureFlagToUsers(payload)

    return all.map(user => {
        return user;
    }) as unknown as UserFeatureFlag[]


};

export const removeFeatureFlagFromUserM:
    MutationResolvers['removeFeatureFlagFromUserM'] = async (
    _: any,
    args: { userId: string },
) => {
    const all = await removeFeatureFlagFromUser(args.userId)

    return all.map(user => {
        return user;
    }) as unknown as UserFeatureFlag[]

};
export const removeUsersFromFeatureFlag:
    MutationResolvers['removeUsersFromFeatureFlag'] = async (
    _: any,
    args: { featureFlagId: string },
) => {
    const all = await removeFeatureFlag(args.featureFlagId)

    return all.map(userFeature => {
        return userFeature;
    }) as unknown as UserFeatureFlag[]

};
