import {FeatureFlag} from '../models'
import {FeatureFlagOutput} from '../models/FeatureFlag'

export const getAll = async (): Promise<FeatureFlagOutput[]> => {
    return FeatureFlag.findAll({raw:true})
}

export const getById = async (id: string): Promise<FeatureFlagOutput> => {
    const featureFlag = await FeatureFlag.findByPk(id)

    if (!featureFlag) {
        throw new Error('Feature flag not found')
    }

    return featureFlag
}