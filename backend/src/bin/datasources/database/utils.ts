import Logger from 'roarr';
import { FeatureFlagType } from "../../../generated/types";
import { ParseError } from "./errors/parse-error";

const logger = Logger.child({ context: 'bin/datasources/database/utils' });

/**
 * Try to parse the value based on type. This method throws
 * if the value being provided cannot be cast to the specified type
 * 
 * @throws {ParseError}
 */
export function tryParse(value: any, type: FeatureFlagType) {
  logger.debug({
    value,
    type
  }, '[tryParse] Attempting to parse value.');
  
  if (type === FeatureFlagType.Json) {
    try {
      return JSON.parse(value);
    } catch (e) {
      throw new ParseError(`${value} cannot be parsed as ${FeatureFlagType.Json}`);
    }
  }

  if (type === FeatureFlagType.String) {
    return value;
  }

  if (type === FeatureFlagType.Boolean) {
    if (value === 'true' || value === 'false') {
      return Boolean(value);
    }

    throw new ParseError(`${value} cannot be parsed as ${FeatureFlagType.Boolean}`);
  }

  if (type === FeatureFlagType.Number) {
    const parsed = Number(value);
    if (Number.isNaN(parsed)) {
      throw new ParseError(`${value} cannot be parsed as ${FeatureFlagType.Number}`);
    }

    return parsed;
  }
}