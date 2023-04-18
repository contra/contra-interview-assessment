import {
  HtmlModal,
  HtmlModalImperativeHandle,
  HtmlModalProps,
} from '@/../components/htmlModal';
import {
  RootModalPlaceholder,
  BranchModalPlaceholder,
  LeafModalPlaceholder,
} from '@/../components/placeholderText';
import { ChangeEventHandler, MouseEventHandler, useRef, useState } from 'react';
import styles from '../styles/htmlModalDemo.module.css';

export const HtmlModalDemo = () => {
  const rootModalImperativeHandleRef = useRef<HtmlModalImperativeHandle | null>(
    null
  );
  const branchModalImperativeHandleRef =
    useRef<HtmlModalImperativeHandle | null>(null);
  const leafModalImperativeHandleRef = useRef<HtmlModalImperativeHandle | null>(
    null
  );
  const [termsConditionsAccepted, setTermsConditionsAccepted] = useState(false);

  const handleRootModalCancelClick: MouseEventHandler<
    HTMLButtonElement
  > = () => {
    const modal = rootModalImperativeHandleRef.current?.modal.current;
    if (modal) {
      modal.close();
    }
  };

  const handleRootModalClose: HtmlModalProps['onClose'] = () => {
    setTermsConditionsAccepted(false);
  };

  const handleRootModalContinueClick: MouseEventHandler<
    HTMLButtonElement
  > = () => {
    const modal = rootModalImperativeHandleRef.current?.modal.current;
    if (modal) {
      modal.close();
    }
  };

  const handleRootModalOpenClick: MouseEventHandler<HTMLButtonElement> = () => {
    const modal = rootModalImperativeHandleRef.current;
    if (modal) {
      modal.open();
    }
  };

  const handleBranchModalCancelClick: MouseEventHandler<
    HTMLButtonElement
  > = () => {
    const modal = branchModalImperativeHandleRef.current?.modal.current;
    if (modal) {
      modal.close();
    }
    setTermsConditionsAccepted(false);
  };

  const handleBranchModalContinueClick: MouseEventHandler<
    HTMLButtonElement
  > = () => {
    const modal = branchModalImperativeHandleRef.current?.modal.current;
    if (modal) {
      modal.close();
    }
    setTermsConditionsAccepted(true);
  };

  const handleBranchModalOpenChange: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    e.preventDefault();
    const modal = branchModalImperativeHandleRef.current;
    if (modal) {
      modal.open();
    }
  };

  const handleLeafModalCloseClick: MouseEventHandler<
    HTMLButtonElement
  > = () => {
    const modal = leafModalImperativeHandleRef.current?.modal.current;
    if (modal) {
      modal.close();
    }
  };

  const handleLeafModalOpenClick: MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.preventDefault();
    const modal = leafModalImperativeHandleRef.current;
    if (modal) {
      modal.open();
    }
  };

  return (
    <>
      <button onClick={handleRootModalOpenClick}>
        Open a standard HTML modal
      </button>
      <HtmlModal
        aria-labelledby="rootModalTitle"
        closeOnBackdropClick
        onClose={handleRootModalClose}
        ref={rootModalImperativeHandleRef}
      >
        <RootModalPlaceholder />
        <label className={styles['termsConditions']}>
          <input
            checked={termsConditionsAccepted}
            onChange={handleBranchModalOpenChange}
            readOnly
            type="checkbox"
          />
          <span>I agree to the terms and conditions</span>
        </label>
        <div className={styles['modalActions']}>
          <button formMethod="dialog" onClick={handleRootModalCancelClick}>
            Cancel
          </button>
          <button
            disabled={!termsConditionsAccepted}
            formMethod="dialog"
            onClick={handleRootModalContinueClick}
          >
            Submit
          </button>
        </div>
      </HtmlModal>
      <HtmlModal
        aria-labelledby="branchModalTitle"
        ref={branchModalImperativeHandleRef}
      >
        <BranchModalPlaceholder />
        <div className={styles['modalActions']}>
          <button formMethod="dialog" onClick={handleLeafModalOpenClick}>
            Another modal
          </button>
          <button formMethod="dialog" onClick={handleBranchModalCancelClick}>
            Reject
          </button>
          <button formMethod="dialog" onClick={handleBranchModalContinueClick}>
            Accept
          </button>
        </div>
      </HtmlModal>
      <HtmlModal ref={leafModalImperativeHandleRef}>
        <LeafModalPlaceholder />
        <div className={styles['modalActions']}>
          <button formMethod="dialog" onClick={handleLeafModalCloseClick}>
            Close
          </button>
        </div>
      </HtmlModal>
    </>
  );
};
