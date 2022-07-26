import React from 'react';
import { modalRootSelector } from '@/constants';

export const useScrollLock = (): [Function, Function] => {
  const portalNode = document.querySelector(modalRootSelector);

  const lockScroll = React.useCallback(() => {
    document.body.dataset['scrollLock'] = 'true';
  }, []);

  const unlockScroll = React.useCallback(() => {
    const nestedActiveModals = portalNode && portalNode.children.length > 0;
    if (!nestedActiveModals) document.body.dataset['scrollLock'] = '';
  }, [portalNode]);

  React.useLayoutEffect(() => {
    const nestedActiveModals = portalNode && portalNode.children.length > 0;
    if (nestedActiveModals) return;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.setProperty('--scrollbarWidth', `${scrollbarWidth}px`);
  }, [portalNode]);

  return [lockScroll, unlockScroll];
};
