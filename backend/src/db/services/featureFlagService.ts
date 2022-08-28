import * as featureFlagDataAccess from '../dataAccess/featureFlag'
import {FeatureFlagOutput} from '../models/FeatureFlag'

export const getById = (id: number): Promise<FeatureFlagOutput> => {
    return featureFlagDataAccess.getById(id)
}

export const getAll = (): Promise<FeatureFlagOutput[]> => {
    return featureFlagDataAccess.getAll()
}