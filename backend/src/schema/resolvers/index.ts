import { mergeResolvers } from 'graphql-tools';
import { Mutation } from './Mutations';
import { Query, User } from './Queries';
import Scalars from './Scalars';

export const resolvers = mergeResolvers([
  {
    Mutation,
    Query,
    User,
  },
  Scalars,
]);
