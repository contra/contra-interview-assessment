import { GraphQLScalarType, Kind } from 'graphql';

const featureFlagTypeStrings = ['boolean', 'string', 'number', 'array', 'object'];
export type FeatureFlagType = typeof featureFlagTypeStrings[number];
export type FeatureFlagValue = boolean | string | number | any[] | object
type FeatureFlagObject = {
  flagType: FeatureFlagType
  flagValue: FeatureFlagValue
}

export function isFeatureFlagValue(value: unknown): value is FeatureFlagValue {
  return getFeatureFlagValue(value) !== undefined;
}

export function isFeatureFlagType(type: unknown): type is FeatureFlagType {
  return (typeof type === 'string') && type in featureFlagTypeStrings;
}

export function getFeatureFlagValue(value: unknown): FeatureFlagValue | undefined {
  if (value === undefined || value === null) { return undefined; }
  switch(typeof value) {
    case 'boolean':
      return value;
    case 'string':
      return value;
    case 'number':
      return value;
    case 'object':
      if (Array.isArray(value)) {
        return value;
      } else {
        return value!; // Assert that value cannot be null, due to type guard
      }
    default:
      return undefined;
  }
}

export function getFeatureFlagType(value: FeatureFlagValue): FeatureFlagType {
  if (value === null) { return 'any'; }
  switch(typeof value) {
    case 'boolean':
      return 'boolean';
    case 'string':
      return 'string';
    case 'number':
      return 'number';
    case 'object':
      if (Array.isArray(value)) {
        return 'array';
      } else {
        return 'object';
      }
    default:
      throw new Error("This should be unreachable");
  }
}

function getFeatureFlagObject(value: unknown): FeatureFlagObject | undefined {
  if (value === undefined || value === null) { return undefined; }
  switch(typeof value) {
    case 'boolean':
      return {
        flagType: 'boolean',
        flagValue: value,
      };
    case 'string':
      return {
        flagType: 'string',
        flagValue: value,
      };
    case 'number':
      return {
        flagType: 'number',
        flagValue: value,
      };
    case 'object':
      if (Array.isArray(value)) {
        return {
          flagType: 'array',
          flagValue: value,
        };
      } else {
        return {
          flagType: 'object',
          flagValue: value!,  // Assert value cannot be null, due to type guard
        };
      }
    default:
      return undefined;
  }
}

function parseFeatureFlagValue(value: unknown): FeatureFlagValue {
  const featureFlagObject = getFeatureFlagObject(value);
    if (featureFlagObject !== undefined) {
      return featureFlagObject.flagValue;
    }
    throw new Error("Provided value is not a valid Feature Flag Value");
}

export const FeatureFlagValue = new GraphQLScalarType({
  name: 'FeatureFlagValue',
  description: 'Feature Flag Value scalar type',
  serialize: parseFeatureFlagValue,
  parseValue: parseFeatureFlagValue,
  parseLiteral(ast) {
    switch (ast.kind) {
      case Kind.BOOLEAN:
      case Kind.STRING:
      case Kind.INT:
      case Kind.FLOAT:
        return ast.value;
      case Kind.LIST:
        return ast.values;
      case Kind.OBJECT:
        return ast.fields;
      default:
        throw new Error("Provided value is not a valid Feature Flag Value");
    }
  },
});

function parseFeatureFlagType(value: unknown): FeatureFlagType {
  if (isFeatureFlagType(value)) {
    return value;
  }
  throw new Error("Provided value is not a valid Feature Flag Type");
}

export const FeatureFlagType = new GraphQLScalarType({
  name: 'FeatureFlagType',
  description: 'Feature Flag Type scalar type',
  serialize: parseFeatureFlagType,
  parseValue: parseFeatureFlagType,
  parseLiteral(ast) {
    switch (ast.kind) {
      case Kind.STRING:
        return parseFeatureFlagType(ast.value);
      default:
        throw new Error("Provided value is not a valid Feature Flag Type");
    }
  },
});