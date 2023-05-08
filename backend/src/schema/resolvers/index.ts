import { mergeResolvers } from '@graphql-tools/merge';
import { Mutation } from './Mutations';
import { Query } from './Queries';
import { User } from './Types';

export const resolvers = mergeResolvers([
  {
    Mutation,
    Query,
    User,
  },
]);
