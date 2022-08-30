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
        if (userFeatureFlag.length !== 0) {
            throw new Error('User already has an active Feature flag')
        }

        const result =  await UserFeatureFlag.create(payload)
        const userFeatureFlagResult = JSON.stringify(result)

        return JSON.parse(userFeatureFlagResult)
    } catch (error) {
        throw new Error('Error assigning feature flag to user: '+error.message)
    }
}

export const addFeatureFlagToUsers = async (payload: UserFeatureFlagInput[]): Promise<UserFeatureFlagOutput[]> => {
    try{
        const result =  await UserFeatureFlag.bulkCreate(payload)
        const userFeatureFlagResult = JSON.stringify(result)

        return JSON.parse(userFeatureFlagResult)

    } catch (error) {
        throw new Error('Error assigning feature flag to user: '+error.message)
    }

}

export const removeFeatureFlagFromUser = async (id: string): Promise<UserFeatureFlagOutput[]> => {
    try{
       await UserFeatureFlag.destroy({
            where: {userId:id}
        })

        return UserFeatureFlag.findAll({raw: true})

    } catch (error) {
        throw new Error('Error assigning feature flag to user: '+error.message)

    }

}

export const removeFeatureFlag = async (id: string): Promise<UserFeatureFlagOutput[]> => {
    try{
       await UserFeatureFlag.destroy({
            where: {featureFlagId:id}
        })

        return UserFeatureFlag.findAll({raw: true})

    } catch (error) {
        throw new Error('Error assigning feature flag to user: '+error.message)

    }

}