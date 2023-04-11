import { MutationResolvers, FlagType, FlagResponse} from '../../../generated/types';
import { GraphQLError } from 'graphql';
import { checkType } from '../../../utils';

export const setUsersFlag: MutationResolvers['setUsersFlag'] = async (_parent, _args, { pool }) => {
    const resposnse = { status: FlagResponse.Fail };
  try{
    const { input } = _args;
    let userIds = input.userId.map(item => Number(item));
    const featureFlagId = +input.featureFlagId; 

    const flag = await pool.featureFlag.findUniqueOrThrow({ where: {id: featureFlagId }});

    const userFlag = await pool.userFlag.findMany({ 
        select: { userId: true },
        where: { featureFlagId, userId: { in: userIds }}
    });

    if (userFlag.length > 0) {
        userIds = userIds.filter(id => !userFlag.find(flag => flag.userId === id))
    }

    if (userIds.length > 0) {
        const value = checkType(input.value, <FlagType>flag.flagType);
        const data = userIds.map((item) => {
            return { userId: item, featureFlagId, value }
           })
        
        await pool.userFlag.createMany({data: data})
    }

    resposnse.status = FlagResponse.Success

  } catch (error) {
    throw new GraphQLError(error)
  }

  return resposnse;
};