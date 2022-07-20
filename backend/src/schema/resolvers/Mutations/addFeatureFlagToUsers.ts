import { sql } from 'slonik';
import { MutationResolvers } from '../../../generated/types';

export const resolve: MutationResolvers['addFeatureFlagToUsers'] = async(
    _parent,
    _args,
    { pool }
  ) => {
    let args: any = _args;
    let sqlString = sql`select featureflagid from feature_flag where name = ${args['name']};`;
    let id = (await pool.query(sqlString)).rows[0];
    if (!id)
        return false;
    let userIds = args.userIds;
    
    // TODO: transaction here to rollback
    userIds.forEach(async (userId: string) => {
        sqlString = sql`insert into user_feature_flag values(${userId}, ${id['featureflagid']}, ${args.value});`;
        (await pool.query(sqlString));
    });


    return true;
};