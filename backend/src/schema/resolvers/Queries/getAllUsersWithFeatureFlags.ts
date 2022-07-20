import { sql } from 'slonik';
import { QueryResolvers, User } from '../../../generated/types';

export const resolve: QueryResolvers['getAllUsersWithFeatureFlags'] = async (
  _parent,
  _args,
  { pool },
) => {
  let sqlString = sql`select id, givenname, familyname, emailaddress, createdat, updatedat from public.user_account;`;
  const users = (await pool.query(sqlString)).rows;

  sqlString = sql`select userid, featureflagid, value, name from public.user_feature_flag join public.feature_flag using(featureflagid);`;
  const featureFlags = (await pool.query(sqlString)).rows;

  // build users json array to return

  let results: User[] = [];
  let usersDict: any = {};
  users.forEach(user => {
    user['featureflags'] = [];
    let uId = Number(user['id']);
    usersDict[uId] = user;
  });

  featureFlags.forEach(featureFlag => {
    let uId = Number(featureFlag['userid']);
    usersDict[uId]['featureflags'].push(featureFlag);
  });

  for (let user in usersDict)
    results.push(usersDict[user]);
  return results;
};