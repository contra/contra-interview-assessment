import { FlagType } from '../generated/types';

export const checkType = (value:any, valueType:FlagType) => {
    if (valueType === FlagType.Boolean && (typeof(value) !== 'boolean')) {
        throw new Error(`${value} must be of type boolean`)
    }

    else if (valueType === FlagType.Json) {
        value = JSON.parse(value);
    }
    else {
        value = String(value)
    }

    return value;
}