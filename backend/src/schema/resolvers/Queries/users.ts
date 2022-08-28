import Logger from "roarr";
import {getAll} from "../../../db/services/userService";
import {QueryResolvers, User} from '../../../generated/types';

const log = Logger.child({context: 'bin/server'});

export const resolve: QueryResolvers['getUsers'] = async (
) => {
    log.info("some value");

    const all = await getAll()

    return all.map(user => {
        return user;
    }) as unknown as User[]


};
