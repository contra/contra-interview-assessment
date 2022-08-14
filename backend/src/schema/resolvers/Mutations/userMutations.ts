import { sql } from 'slonik';
import { MutationResolvers, SetUserResponse, UpdateResponse } from '../../../generated/types';

/**
 * Exposes a GraphQL Query that returns all users and their associated feature flags
 * 
 */
export const resolveCreateUser: MutationResolvers['createUser'] = async (
    _parent,
    { userData },
    { pool },
): Promise<SetUserResponse> => {
    const queryString = sql`
    INSERT INTO 
        user_account
        ( given_name, family_name, email_address)
    VALUES
    (${userData.givenName},${userData.familyName},${userData.email})
    `;
    const queryResult = await pool.query(queryString);

    return {
        rowCount: queryResult.rowCount
    };
}
/**
  Exposes a GraphQL Mutation to change the value of a feature flag for a specific user
User is specifed by email
 */
export const resolveSetUserFeatureFlag: MutationResolvers['setUserFeatureFlag'] = async (
    _parent,
    { flagData, userEmail },
    { pool },
): Promise<UpdateResponse> => {

    const queryString = sql`
    UPDATE 
        feature_flag_users ffu
	SET 
        flag_value=${flagData.value}
    FROM
        user_account users,
        feature_flag flags
    WHERE 
	    ffu.user_id = users.id AND
	    ffu.flag_id = flags.id AND
	    users.email_address=${userEmail} AND
	    flags.flag_key =${flagData.key}
    `;
    const queryResult = await pool.query(queryString);

    return {
        success: queryResult.rowCount > 0
    };

};

/**
 *  Exposes a GraphQL Mutation to target one or more users with a specific feature flag
 */
export const resolveSetUsersBasedOnFeatureFlag: MutationResolvers['setUsersBasedOnFeatureFlag'] = async (
    _parent,
    { flagKey, updateData },
    { pool },
): Promise<SetUserResponse> => {
    /**
     * PSQL does not allow updating multiple tables in one statement (to my knowledge, without using procedures or such (ie using basic direct querying))
     * So we are left with a choice
     * Change our DB schema and forego normalization OR
     * Construct and run multiple queries as required
     * In my experience so far, data has been king, if we forego normalization the schema becomes difficult to maintain
     * takes more space due to redundant data and we will end up with a slower application
     * hence I am going to go with the latter choice
     */

    let totalRowCount = 0;
    // we have 2 tables relating to user info, the relation table (feature_flag_users) and the user_account table
    // if the updateData includes changing the flag value, we need to update feature_flag_users
    if (updateData?.flagValue) {
        const queryString = sql`
        UPDATE
            feature_flag_users ffu
        SET flag_value=${updateData.flagValue}
        FROM 
        	feature_flag flags
        WHERE 
        	ffu.flag_id = flags.id AND
        	flags.flag_key=${flagKey}
`
        const queryResult = await pool.query(queryString);
        totalRowCount += queryResult.rowCount;
    } else if (updateData?.givenName || updateData?.familyName) {
        // produces something like"givenName = 'foo' , familyName = 'bar'"
        const setString = Object.entries({
            familyName: updateData.familyName,
            givenName: updateData.givenName
        }).map((key, value) => `${key} = ${value}`).join(" , ");

        const queryString = sql`
        UPDATE
            user_account users
        SET ${setString}
        FROM 
        	feature_flag_users ffu,
        	feature_flag flags
        WHERE 
        	ffu.flag_id = flags.id AND
        	flags.flag_key=${flagKey} AND 
        	users.id = ffu.id
        `
        const queryResult = await pool.query(queryString);
        totalRowCount += queryResult.rowCount;
    }

    return {
        rowCount: totalRowCount
    }

};