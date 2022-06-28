import type { FieldType, InterceptorType } from 'slonik';
// @ts-expect-error this isn't a typescript module
import { createFieldNameTransformationInterceptor } from 'slonik-interceptor-field-name-transformation';

export const createCustomSlonikInterceptors = (): InterceptorType[] => {
  return [
    createFieldNameTransformationInterceptor({
      format: 'CAMEL_CASE',
      test: (field: FieldType) => {
        return field.name !== '__typename' && /^[\d_a-z]+$/.test(field.name);
      },
    }),
  ];
};
