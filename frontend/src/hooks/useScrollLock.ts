import { useCallback, useLayoutEffect, useRef } from 'react';

const REMOVED_BODY_SCROLLBAR_CSS_VAR = '--removed-body-scroll-bar-size';

export const useScrollLock = () => {
  const previousStylesRef = useRef<
    Partial<
      Record<
        keyof CSSStyleDeclaration,
        CSSStyleDeclaration[keyof CSSStyleDeclaration]
      >
    >
  >({});

  useLayoutEffect(() => {
    const scrollbarWidth = window.innerWidth - document.body.offsetWidth;
    document.body.style.setProperty(
      REMOVED_BODY_SCROLLBAR_CSS_VAR,
      scrollbarWidth.toString()
    );
  }, []);

  const lockScroll = useCallback(() => {
    const previousOverFlowStyle = document.body.style.overflow;
    const previousPointerEventsStyle = document.body.style.pointerEvents;
    const previousPaddingRightStyle = document.body.style.paddingRight;

    previousStylesRef.current.overflow = previousOverFlowStyle;
    previousStylesRef.current.pointerEvents = previousPointerEventsStyle;
    previousStylesRef.current.paddingRight = previousPaddingRightStyle;

    document.body.style.overflow = 'hidden';
    document.body.style.pointerEvents = 'none';
    document.body.style.paddingRight = `var(${REMOVED_BODY_SCROLLBAR_CSS_VAR})`;

    document.body.dataset['scrollLock'] = 'true';
  }, []);

  const unlockScroll = useCallback(() => {
    const previousOverFlowStyle = previousStylesRef.current.overflow;
    const previousPointerEventsStyle = previousStylesRef.current.pointerEvents;
    const previousPaddingRightStyle = previousStylesRef.current.paddingRight;

    document.body.style.overflow = (previousOverFlowStyle as string) || 'auto';
    document.body.style.pointerEvents =
      (previousPointerEventsStyle as string) || 'auto';
    document.body.style.paddingRight = previousPaddingRightStyle as string;
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete document.body.dataset['scrollLock'];
  }, []);

  return { lockScroll, unlockScroll };
};
