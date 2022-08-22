import { useCallback, useLayoutEffect } from 'react';

const REMOVED_BODY_SCROLLBAR_CSS_VAR = '--removed-body-scroll-bar-size';

export const useScrollLock = () => {
  useLayoutEffect(() => {
    if (document.body.style.getPropertyValue(REMOVED_BODY_SCROLLBAR_CSS_VAR)) {
      return;
    }

    const scrollbarWidth = window.innerWidth - document.body.offsetWidth;
    document.body.style.setProperty(
      REMOVED_BODY_SCROLLBAR_CSS_VAR,
      scrollbarWidth.toString()
    );
  }, []);

  const lockScroll = useCallback(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.pointerEvents = 'none';
    document.body.style.paddingRight = `var(${REMOVED_BODY_SCROLLBAR_CSS_VAR})`;

    document.body.dataset['scrollLock'] = 'true';
  }, []);

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = 'auto';
    document.body.style.pointerEvents = 'auto';
    document.body.style.paddingRight = '0px';

    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete document.body.dataset['scrollLock'];
  }, []);

  return { lockScroll, unlockScroll };
};
