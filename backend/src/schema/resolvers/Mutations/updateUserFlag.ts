import { MutationResolvers, FlagType, FlagResponse } from '../../../generated/types';
import { GraphQLError } from 'graphql';
import { checkType } from '../../../utils';

export const updateUserFlag: MutationResolvers['updateUserFlag'] = async (_parent, _args, { pool }) => {
  const response = { status: FlagResponse.Fail, data: null}  
  try{
    const { input } = _args;
    const userId = +input.userId;
    const featureFlagId = +input.featureFlagId; 

   const flag = await pool.userFlag.findUniqueOrThrow({ 
    where: {userId_featureFlagId: { userId: userId, featureFlagId: featureFlagId }},
    include: { featureFlag: true }
   });

   const value = checkType(input.value, <FlagType>flag.featureFlag.flagType);


   const userFlag = await pool.userFlag.update({ 
        include: { user: true, featureFlag: true },
        where: { userId_featureFlagId: { userId: userId, featureFlagId: featureFlagId }},
        data: { value }
    });

    await pool.user.update({ 
        where: { id: userId },
         data: { updated: new Date() }
    });
    // console.log(userFlag);
    response.status = FlagResponse.Success
    response.data = JSON.parse(JSON.stringify(userFlag));

  } catch (error) {
    throw new GraphQLError(error)
  }

  return response;
};

