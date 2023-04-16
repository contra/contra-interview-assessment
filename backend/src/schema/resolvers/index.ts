import { mergeResolvers } from 'graphql-tools';
import MultivariateScalarType from '../ScalarType';
import { Mutation } from './Mutations';
import { Query } from './Queries';

export const resolvers = mergeResolvers([
  {
    Mutation,
    Query,
    MultivariateScalar: MultivariateScalarType,
  },
]);
