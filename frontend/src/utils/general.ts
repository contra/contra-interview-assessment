export const isNotUndefined = <T>(args: T | undefined): args is T =>
  typeof args !== 'undefined';

export const canUseDOM = () =>
  Boolean(
    typeof window !== 'undefined' &&
      isNotUndefined(window.document) &&
      // eslint-disable-next-line @typescript-eslint/unbound-method
      isNotUndefined(window.document.createElement)
  );
