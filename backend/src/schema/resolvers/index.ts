import { mergeResolvers } from 'graphql-tools';
import { Mutation } from './Mutations';
import { Query } from './Queries';
import GraphQLJSON from 'graphql-type-json';

export const resolvers = mergeResolvers([
  {
    JSON: GraphQLJSON,
    Mutation,
    Query,
  },
]);
