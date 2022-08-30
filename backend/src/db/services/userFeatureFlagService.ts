import * as userFeatureFlagDataAccess from '../dataAccess/userFeatureFlag'
import {UserFeatureFlagInput, UserFeatureFlagOutput} from '../models/UserFeatureFlag'

export const getAll = (): Promise<UserFeatureFlagOutput[]> => {
    return userFeatureFlagDataAccess.getAll();
}

export const getByFeatureFlagId = (id: string): Promise<UserFeatureFlagOutput[]> => {
    return userFeatureFlagDataAccess.getByFeatureFlagId(id);
}

export const getByUserId = (id: string): Promise<UserFeatureFlagOutput[]> => {
    return userFeatureFlagDataAccess.getByUserId(id);
}

export const addFeatureFlagToUser = async (payload: UserFeatureFlagInput): Promise<UserFeatureFlagOutput> => {
    return userFeatureFlagDataAccess.addFeatureFlagToUser(payload);
}

export const addFeatureFlagToUsers = async (payload: UserFeatureFlagInput[]): Promise<UserFeatureFlagOutput[]> => {
    return userFeatureFlagDataAccess.addFeatureFlagToUsers(payload);
}

export const removeFeatureFlagFromUser = async (id: string): Promise<UserFeatureFlagOutput[]> => {
    return userFeatureFlagDataAccess.removeFeatureFlagFromUser(id);
}

export const removeFeatureFlag = async (id: string): Promise<UserFeatureFlagOutput[]> => {
    return userFeatureFlagDataAccess.removeFeatureFlag(id);
}