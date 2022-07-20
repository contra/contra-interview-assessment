import { sql } from 'slonik';
import { MutationResolvers } from '../../../generated/types';

export const resolve: MutationResolvers['changeFeatureFlagForUser'] = async(
    _parent,
    _args,
    { pool }
  ) => {
    let args: any = _args;
    let sqlString = sql`select featureflagid from feature_flag where name = ${args.name};`;
    let id = (await pool.query(sqlString)).rows[0];
    if (!id)
        return false;
    
    // TODO: transaction here
    sqlString = sql`delete from user_feature_flag where userid = ${args.userId} and featureflagid = ${id['featureflagid']};`;
    (await pool.query(sqlString));

    sqlString = sql`insert into user_feature_flag values(${args.userId}, ${id['featureflagid']}, ${args.value});`;
    (await pool.query(sqlString));


    return true;
};