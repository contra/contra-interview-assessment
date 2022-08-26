import { styles } from '../styles';
import dynamic from 'next/dynamic';
import { ReactNode, ReactPortal, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

/**
 * TODOS:
 * - Focus Management ✅
 * - Background scroll-locking ✅
 * - Tab navigation ✅
 * - React portals ✅
 * - Multi-modal environment (i.e. stacking) ✅
 * - Accessibility ✅
 * 		- keyboard functionality (tab and esc) ✅
 * 		- roles and aria attributes ✅
 * - Mobile ✅
 * 		- touch events ✅
 */

type ModalProps = {
  children: ReactNode;
  containerId: string;
  isOpen: boolean;
  onClose: () => void;
  options?: {
    centered?: boolean;
    overlay?: boolean;
  };
};
function Modal({
  children,
  containerId,
  isOpen,
  onClose,
  options,
  ...props
}: ModalProps): JSX.Element | null {
  // STEP 1 - container node for modal
  let node = useRef<HTMLElement | null>(null);
  let overlayNode = useRef<HTMLDivElement | null>(null);
  let containerNode = useRef<HTMLDivElement | null>(null); // optional use case with modal without overlay

  let id = useRef<string>(String(Math.floor(Math.random() * 100000)));
  const modalId = `modal-${id.current}`;

  let lastTabbedElem = useRef<Element | null>(null);

  // Defaults for options
  const centered = options?.centered ?? true;
  const overlay = options?.overlay ?? true;

  // STEP 2 - Focus management
  function toggleFocusTrap(tabindex: '-1' | '0') {
    const t0 = performance.now();
    /**
     * Sources:
     * https://html.spec.whatwg.org/multipage/interaction.html#the-tabindex-attribute
     * https://github.com/focus-trap/tabbable
     * https://allyjs.io/data-tables/focusable.html
     */
    const tabbableElementsOutsideOfModal = `
			frame,
			iframe,
			object,
			button:not([disabled]), 
			[href], 
			input:not([disabled]), 
			input:not([type='hidden']), 
			select:not([disabled]), 
			textarea:not([disabled]), 
			[tabindex]:not([tabindex="-1"]):not([disabled]), 
			details:not([disabled]), 
			summary:not(:disabled)
			area,
			audio[control]:not([disabled]),
			video[control]:not([disabled]),
			[contenteditable],
			embed,
			[focusable]
		`;

    /**
     * In the future, `inert` attribute will be more performant.
     * https://caniuse.com/mdn-api_htmlelement_inert
     */
    document
      .querySelectorAll(tabbableElementsOutsideOfModal)
      .forEach((tabbableElem) => {
        if (node.current && !node.current.contains(tabbableElem)) {
          // manage tabindex of all tabbable elements outside of modal
          tabbableElem.setAttribute('tabindex', tabindex);
        } else if (
          !lastTabbedElem.current &&
          node.current?.contains(tabbableElem)
        ) {
          // Find first tabbable element in modal to give focus to
          lastTabbedElem.current = document.activeElement;
          (tabbableElem as HTMLElement).focus();
        }
      });

    const t1 = performance.now();
    console.log(`${modalId} - Elapsed time: ${t1 - t0}ms`);
  }

  function focusLastTabbedElement() {
    if (lastTabbedElem.current) {
      (lastTabbedElem.current as HTMLElement).focus();
    }
    lastTabbedElem.current = null;
  }

  // STEP 3 - Background scroll lock
  function allowBodyScroll(state: boolean) {
    const body = document.querySelector('body');

    if (body && !state) {
      body.setAttribute('style', 'height: 100%; overflow: hidden;');
    } else if (body && state) {
      body.setAttribute('style', 'height: unset; overflow: unset;');
    }
  }

  function closeModal() {
    if (overlay) {
      toggleFocusTrap('0');
      allowBodyScroll(true);
    }

    focusLastTabbedElement();
    onClose();
  }

  function openModal() {
    if (overlay) {
      toggleFocusTrap('-1');
      allowBodyScroll(false);
    }
  }

  // STEP 4 - Multi-modal environment
  function findHighestModalSequenceNum(acc: number, node: Element) {
    const sequenceNum = Number((node as HTMLElement).dataset['modalSequence']);

    if (sequenceNum > acc) {
      acc = sequenceNum;
    }
    return acc;
  }

  /**
   * Updates the most recently opened modal with the next
   * highest sequence number
   */
  function updateActiveModal() {
    let highestSequenceNum = Array.from(
      document.querySelectorAll(`[id^='modal-']`)
    ).reduce(findHighestModalSequenceNum, 0);

    document
      .querySelectorAll("[id^='modal-']:not([data-modal-sequence])")
      .forEach((node) => {
        node.setAttribute(
          'data-modal-sequence',
          String(highestSequenceNum + 1)
        );
        highestSequenceNum++;
      });
  }

  // STEP 1: Find modal container to render in
  useEffect(() => {
    node.current = document.querySelector<HTMLElement>(`#${containerId}`);
  }, []);

  // Toggle modal features when open or closed
  useEffect(() => {
    if (!isOpen) {
      closeModal();
    } else if (isOpen) {
      updateActiveModal();
      openModal();
    }
  }, [isOpen]);

  // STEP 5 - Accessibility
  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      const highestSequenceNum = Array.from(
        document.querySelectorAll('[data-modal-sequence]')
      ).reduce(findHighestModalSequenceNum, 0);

      if (
        containerNode.current?.dataset['modalSequence'] ===
          String(highestSequenceNum) ||
        overlayNode.current?.dataset['modalSequence'] ===
          String(highestSequenceNum)
      )
        closeModal();
    }
  }

  function handleOverlayClick(e: MouseEvent) {
    if (
      overlay &&
      e.target &&
      e.target instanceof Element &&
      e.target.id.includes('modal-')
    ) {
      closeModal();
    }
  }

  function handleOverlayTouchEnd(e: TouchEvent) {
    if (
      overlay &&
      e.target &&
      e.target instanceof Element &&
      e.target.id === modalId
    ) {
      closeModal();
    }
  }

  useEffect(() => {
    if (node.current && isOpen && overlayNode.current) {
      overlayNode.current.addEventListener('click', handleOverlayClick);
      overlayNode.current.addEventListener('touchstart', handleOverlayTouchEnd);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      overlayNode.current?.removeEventListener('click', handleOverlayClick);
      overlayNode.current?.removeEventListener(
        'touchend',
        handleOverlayTouchEnd
      );
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [overlayNode.current, node.current, isOpen]);

  if (node.current && isOpen) {
    return (
      <Portal node={node.current}>
        {overlay ? (
          <div
            data-testid={modalId}
            id={modalId}
            style={{
              ...styles['modalOverlay'],
              ...(centered && styles['centerChildren']),
            }}
            ref={overlayNode}
            role="dialog"
            aria-modal
            {...props}
          >
            {children}
          </div>
        ) : (
          <div
            data-testid={modalId}
            id={modalId}
            role="dialog"
            aria-modal
            ref={containerNode}
          >
            {children}
          </div>
        )}
      </Portal>
    );
  }

  return null;
}

type PortalProps = {
  children: ReactNode;
  node: HTMLElement;
};
function Portal({ children, node }: PortalProps): ReactPortal {
  return ReactDOM.createPortal(children, node);
}

export default dynamic(() => Promise.resolve(Modal), {
  ssr: false,
});
