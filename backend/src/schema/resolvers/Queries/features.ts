import { sql } from 'slonik';
import { UserResolvers, Feature } from '../../../generated/types';

export const features: UserResolvers['features'] = async (
    user,
    _args,
    { pool },
  ) => {
    
    return pool.any<Feature>(
      sql`SELECT context_id, name, flag_type as type, flag_value as value FROM context
        INNER JOIN user_context
            ON context.id = user_context.context_id
        INNER JOIN feature_flag_variant
            ON feature_flag_variant_id=feature_flag_variant.id
        INNER JOIN feature_flag
            ON feature_flag_id=feature_flag.id
        WHERE context_enabled=TRUE AND flag_enabled=TRUE
        AND context.environment=${user.environment}
        AND user_context.user_id=${user.id}
        ;`
    );
  
  };
  