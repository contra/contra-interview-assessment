import { mergeResolvers } from 'graphql-tools';
import { Mutation } from './Mutations';
import { Query, features } from './Queries';

export const resolvers = mergeResolvers([
  {
    User: {
      features
    },
    Mutation,
    Query,
  },
]);
