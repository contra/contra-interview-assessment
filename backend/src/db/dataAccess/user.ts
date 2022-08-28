import {User} from '../models'
import {UserOutput} from '../models/User'

export const getAll = async (): Promise<UserOutput[]> => {
    return User.findAll({raw:true})
}

export const getById = async (id: number): Promise<UserOutput> => {
    const user = await User.findByPk(id)

    if (!user) {
        throw new Error('User not found')
    }

    return user
}