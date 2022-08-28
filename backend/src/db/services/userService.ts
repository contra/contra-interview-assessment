import * as userDataAccess from '../dataAccess/user'
import {UserOutput} from '../models/User'

export const getById = (id: number): Promise<UserOutput> => {
    return userDataAccess.getById(id)
}

export const getAll = (): Promise<UserOutput[]> => {
    return userDataAccess.getAll()
}