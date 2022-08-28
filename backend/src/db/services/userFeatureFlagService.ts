import * as userFeatureFlagDataAccess from '../dataAccess/userFeatureFlag'
import {UserFeatureFlagOutput} from '../models/UserFeatureFlag'

export const getAll = (): Promise<UserFeatureFlagOutput[]> => {
    return userFeatureFlagDataAccess.getAll()
}