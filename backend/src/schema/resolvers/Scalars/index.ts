import { GraphQLScalarType, Kind } from 'graphql';
import { isValidFeatureFlag } from '../../../datasources/adapters';

export type FeatureFlagValueType = boolean | string | number | any[] | object;

const FeatureFlagValueType = new GraphQLScalarType({
  name: 'FeatureFlagValueType',
  description: 'Feature Flag Value Type',
  parseValue: (value) => isValidFeatureFlag(value) && value,
  parseLiteral: (node) => {
    switch (node.kind) {
      case Kind.BOOLEAN:
      case Kind.STRING:
      case Kind.INT:
      case Kind.FLOAT:
        return node.value;
      case Kind.LIST:
        return node.values;
      case Kind.OBJECT:
        return node.fields;
      default:
        throw new Error('Could not assert provided Feature Flag');
    }
  },
});

export default { FeatureFlagValueType };
