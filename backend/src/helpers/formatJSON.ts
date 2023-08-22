import { Feature_Flag_Value_Types } from "../generated/types";

export const formatJSONValue = (value: any, type: Feature_Flag_Value_Types): string => {
  return type === "JSON_OBJECT" ? JSON.stringify(value) : value;
};

export const formatJSONValues = (values: any[], type: Feature_Flag_Value_Types): string[] => {
  return values.map(value => formatJSONValue(value, type));
};