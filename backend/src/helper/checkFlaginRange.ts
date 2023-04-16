import { FeatureFlagSelection } from '@prisma/client';
import { deepCompare } from './compareObj';

export const checkFlagInRange = (
  value: number | string | boolean | null | undefined | object,
  featureFlag: FeatureFlagSelection,
): number => {
  // Distinguish with if else here, since primitive types can be compared directly. A deepCopy is not so performant
  let flagValueinRange = -1;
  if (value !== Object(value)) {
    flagValueinRange = featureFlag.possibleValues.findIndex(
      (val) => val?.valueOf() === value,
    );
  } else {
    flagValueinRange = featureFlag.possibleValues.findIndex((val) =>
      deepCompare([val, value]),
    );
  }
  return flagValueinRange;
};
