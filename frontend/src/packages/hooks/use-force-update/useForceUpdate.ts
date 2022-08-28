/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/hook-use-state */
import { useCallback, useState } from 'react';

/**
 * Forces the consumer to re-render when the returned callback is called.
 * Equivalent to `forceUpdate` in class components.
 */
export function useForceUpdate() {
  const [_, dispatch] = useState<{}>(Object.create(null));
  return useCallback(() => {
    dispatch(Object.create(null));
  }, [dispatch]);
}
