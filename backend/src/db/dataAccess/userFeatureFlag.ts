import {UserFeatureFlag} from '../models'
import {UserFeatureFlagOutput} from '../models/UserFeatureFlag'

export const getAll = async (): Promise<UserFeatureFlagOutput[]> => {
    return UserFeatureFlag.findAll({raw:true})
}

export const getById = async (id: number): Promise<UserFeatureFlagOutput> => {
    const userFeatureFlag = await UserFeatureFlag.findByPk(id)

    if (!userFeatureFlag) {
        throw new Error('User Feature flag not found')
    }

    return userFeatureFlag
}