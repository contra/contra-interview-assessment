import { ReactModal, ReactModalProps } from '@/../components/reactModal';
import {
  RootModalPlaceholder,
  BranchModalPlaceholder,
  LeafModalPlaceholder,
} from '@/../components/placeholderText';
import { MouseEventHandler, useState } from 'react';
import styles from '../styles/htmlModalDemo.module.css';

export const ReactModalDemo = () => {
  const [rootModalOpen, setRootModalOpen] = useState(false);
  const [branchModalOpen, setBranchModalOpen] = useState(false);
  const [leafModalOpen, setLeafModalOpen] = useState(false);
  const [termsConditionsAccepted, setTermsConditionsAccepted] = useState(false);

  const handleRootModalClose: ReactModalProps['onClose'] = () => {
    setTermsConditionsAccepted(false);
    setRootModalOpen(false);
  };

  const handleRootModalCancelClick: MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    handleRootModalClose(e);
  };

  const handleRootModalContinueClick: MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    handleRootModalClose(e);
  };

  const handleRootModalOpenClick: MouseEventHandler<HTMLButtonElement> = () => {
    setRootModalOpen(true);
  };

  const handleBranchModalClose: ReactModalProps['onClose'] = () => {
    setBranchModalOpen(false);
  };

  const handleBranchModalCancelClick: MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    handleBranchModalClose(e);
    setTermsConditionsAccepted(false);
  };

  const handleBranchModalContinueClick: MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    handleBranchModalClose(e);
    setTermsConditionsAccepted(true);
  };

  const handleBranchModalOpenClick: MouseEventHandler<HTMLLabelElement> = (
    e
  ) => {
    e.preventDefault();
    setBranchModalOpen(true);
  };

  const handleLeafModalClose: ReactModalProps['onClose'] = () => {
    setLeafModalOpen(false);
  };

  const handleLeafModalCloseClick: MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    handleLeafModalClose(e);
  };

  const handleLeafModalOpenClick: MouseEventHandler<HTMLButtonElement> = () => {
    setLeafModalOpen(true);
  };

  return (
    <>
      <button onClick={handleRootModalOpenClick}>Open a React modal</button>
      <ReactModal
        aria-labelledby="rootModalTitle"
        closeOnBackdropClick
        onClose={handleRootModalClose}
        open={rootModalOpen}
      >
        <RootModalPlaceholder />
        <label
          className={styles['termsConditions']}
          onClick={handleBranchModalOpenClick}
        >
          <input checked={termsConditionsAccepted} readOnly type="checkbox" />
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
      </ReactModal>
      <ReactModal
        aria-labelledby="branchModalTitle"
        onClose={handleBranchModalClose}
        open={branchModalOpen}
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
      </ReactModal>
      <ReactModal onClose={handleLeafModalClose} open={leafModalOpen}>
        <LeafModalPlaceholder />
        <div className={styles['modalActions']}>
          <button formMethod="dialog" onClick={handleLeafModalCloseClick}>
            Close
          </button>
        </div>
      </ReactModal>
    </>
  );
};
