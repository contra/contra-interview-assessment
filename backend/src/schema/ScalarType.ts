import { GraphQLScalarType, Kind, ValueNode } from 'graphql';

// custom scalar type for multivariate Option
const MultivariateScalarType = new GraphQLScalarType({
  name: 'MultivariateScalar',
  description:
    'Custom scalar type based on primitive types, JSON objects, and arrays',
  serialize(value) {
    // Called when sending the value as a response
    // Return the serialized value
    return value;
  },
  parseValue(value) {
    // Called when parsing a value from a variable
    // Return the parsed value
    return value;
  },
  parseLiteral(ast) {
    // Called when parsing a value from a literal
    switch (ast.kind) {
      case Kind.INT:
        return Number(ast.value);
      case Kind.FLOAT:
        return Number(ast.value);
      case Kind.BOOLEAN:
      case Kind.STRING:
        return ast.value;
      case Kind.OBJECT:
        // Return the parsed value for JSON objects
        return parseValue(ast);
      case Kind.LIST:
        // Return the parsed value for JSON arrays
        return ast.values.map((value) => parseValue(value));
      default:
        // Throw an error for unsupported types
        throw new Error('Unsupported type');
    }
  },
});
const parseValue = (valueAst: ValueNode): any => {
  switch (valueAst.kind) {
    case Kind.STRING:
    case Kind.BOOLEAN:
    case Kind.INT:
    case Kind.FLOAT:
      // Return the parsed value for primitive types
      return valueAst.value;
    case Kind.OBJECT:
      // Return the parsed value for JSON objects
      const objectValue: {
        [key: string]: number | string | boolean | null | undefined | object;
      } = {};
      valueAst.fields.forEach((field) => {
        objectValue[field.name.value] = parseValue(field.value); // Recursive parsing of nested objects
      });
      return objectValue;
    case Kind.LIST:
      // Return the parsed value for JSON arrays
      return valueAst.values.map((value) => parseValue(value));
    default:
      // Throw an error for unsupported types
      throw new Error('Unsupported type');
  }
};

export default MultivariateScalarType;
