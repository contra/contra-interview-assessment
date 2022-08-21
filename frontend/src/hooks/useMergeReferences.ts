import { type MutableRefObject, type Ref, useCallback } from 'react';

type MaybeRef<T> = Ref<T> | undefined;

const useMergeReferences = <T>(...references: Array<MaybeRef<T>>): Ref<T> => {
  return useCallback(
    (value: T) => {
      references.forEach((ref) => {
        if (typeof ref === 'function') {
          ref(value);
        } else if (ref) {
          (ref as MutableRefObject<T>).current = value;
        }
      });
    },
    [references]
  );
};

export { useMergeReferences as useMergeRefs };
