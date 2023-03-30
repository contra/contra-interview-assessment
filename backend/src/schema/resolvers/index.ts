import { mergeResolvers } from 'graphql-tools';
import GraphQLJSON from 'graphql-type-json';
import { Mutation } from './Mutations';
import { Query } from './Queries';

export const resolvers = mergeResolvers([
  {
    JSON: GraphQLJSON,
    Mutation,
    Query,
  },
]);
