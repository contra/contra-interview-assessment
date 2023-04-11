import { QueryResolvers } from '../../../generated/types';

export const getUsers: QueryResolvers['getUsers'] = async (_parent, _args, { pool }) => {
    const users = await pool.user.findMany({
         include: { featureFlags: { include: { featureFlag: true, user: true }} }
        });

    const data = users.map(user => {
        const { id, familyName, givenName, email, created, updated } = user;
        
        return { id, familyName, givenName, email,created, updated, featureFlag: user.featureFlags}
    })

    return JSON.parse(JSON.stringify(data));
}