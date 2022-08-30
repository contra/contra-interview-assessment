import {getAll} from "../../../../db/services/userService";
import {QueryResolvers, User} from '../../../../generated/types';


export const resolve: QueryResolvers['getUsers'] = async (
) => {
    const all = await getAll()

    return all.map(user => {
        return user;
    }) as unknown as User[]


};
