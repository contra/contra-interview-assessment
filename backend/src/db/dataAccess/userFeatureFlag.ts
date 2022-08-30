import {UserFeatureFlag} from '../models'
import {UserFeatureFlagInput, UserFeatureFlagOutput} from '../models/UserFeatureFlag'

export const getAll = async (): Promise<UserFeatureFlagOutput[]> => {
    return UserFeatureFlag.findAll({raw: true})
}

export const getByUserId = async (id: string): Promise<UserFeatureFlagOutput[]> => {
    const userFeatureFlag = await UserFeatureFlag.findAll({
        raw: true,
        where: {userId: id},
    })

    if (!userFeatureFlag) {
        throw new Error('User Feature flag not found')
    }

    return userFeatureFlag

}

export const getByFeatureFlagId = async (id: string): Promise<UserFeatureFlagOutput[]> => {
    const userFeatureFlag = await UserFeatureFlag.findAll({
        raw: true,
        where: {featureFlagId: id},
    })

    if (!userFeatureFlag) {
        throw new Error('User Feature flag not found')
    }

    return userFeatureFlag

}


export const addFeatureFlagToUser = async (payload: UserFeatureFlagInput): Promise<UserFeatureFlagOutput> => {
    try{
        const userFeatureFlag = await UserFeatureFlag.findAll({
            raw: true,
            where: {userId:payload.userId}
        })
        if (userFeatureFlag) {
            throw new Error('User already has an active Feature flag')
        }

        return UserFeatureFlag.create(payload)
    } catch (error) {
        throw new Error('Error assigning feature flag to user: '+error.message)

    }

}