import { sql } from 'slonik';
import { QueryResolvers, User } from '../../../generated/types';

export const resolveAllUsers: QueryResolvers['getAllUsers'] = async (
    _parent,
    _args,
    { pool },
): Promise<User[]> => {

    const queryString = sql`
    SELECT 
	         user_account.id,given_name,family_name,email_address,JSON_AGG(
			 	JSON_BUILD_OBJECT(
				 'flagKey', flag_key,
                'flagValue',flag_value,
                'id', flag_id
				)
			 ) flags
    FROM 
        user_account
    LEFT JOIN
        feature_flag_users ON feature_flag_users.user_id = user_account.id
    LEFT JOIN
        feature_flag ON feature_flag.id = feature_flag_users.flag_id
    GROUP BY
        user_account.id,given_name,family_name,email_address
    `;
    const queryResult = await pool.query(queryString);
    const result: User[] = queryResult.rows.map((row) => {
        const userFlags = JSON.parse(JSON.stringify(row.flags)).map((flag:any) => {
            return {
                flagKey: flag.flag_key,
                flagValue: flag.flag_value,
                id: flag.id,
            }
        });
        
return {
            email: String(row.emailAddress),
            familyName: String(row.familyName),
            flags: userFlags,
            givenName: String(row.givenName),
            id: String(row.userId)
        }
    });
    
return result;
};


