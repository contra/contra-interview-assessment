import { sql } from 'slonik';
import { UserAccountResolvers , FeatureFlagPossibleValues, FeatureFlagValue } from '../../../generated/types';
import { formatJSONValue, formatJSONValues } from '../../../helpers/formatJSON';


export const featureFlagAssociations: UserAccountResolvers['featureFlagAssociations'] = async (
  user,
  _args,
  { pool }
) => {
  const associations = await pool.any<{
    featureFlagId: string;
    featureFlagName: string;
    featureFlagPossibleValues: FeatureFlagPossibleValues;
    value: FeatureFlagValue;
  }>(
    sql`
      SELECT 
        uffa.feature_flag_id,
        ff.name as feature_flag_name,
        ff.possible_values as feature_flag_possible_values,
        uffa.value
      FROM user_feature_flag_association uffa
      JOIN feature_flag ff ON uffa.feature_flag_id = ff.id
      WHERE uffa.user_id = ${user.id}
    `
  );

  return associations.map(assoc => ({
    featureFlag: {
      id: assoc.featureFlagId,
      name: assoc.featureFlagName,
      possibleValues: {
        type: assoc.featureFlagPossibleValues.type,
        values: formatJSONValues(
          assoc.featureFlagPossibleValues.values,
          assoc.featureFlagPossibleValues.type,
        )
      }
    }, 
    user: { id: user.id } as any, // Typecasting this to 'any' because we are returing a partial object. The resolvers will stitch this together to return the complete object. With more time, the types could be adjusted to reflect this.
    value: {
      type: assoc.value.type,
      value: formatJSONValue(assoc.value.value, assoc.value.type)
    }
  }));
};
