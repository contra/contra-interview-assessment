/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import { Dialog } from 'components/Dialog';
import { DialogModal } from 'components/Dialog/DialogModal';
import { DialogNonModal } from 'components/Dialog/DialogNonModal';
import { useState } from 'react';

const toggleState = (previousState: boolean) => !previousState;

const Index: NextPage = () => {
  const [dialogOneOpen, setDialogOneOpen] = useState(false);
  const [dialogTwoOpen, setDialogTwoOpen] = useState(false);
  const [dialogModal, setDialogModal] = useState(false);
  const [dialogNonModal, setDialogNonModal] = useState(false);
  if (typeof window !== 'undefined') document.body.style.height = '3000px';

  return (
    <>
      <h1>Welcome to Contra!</h1>
      <button onClick={() => setDialogOneOpen(toggleState)} type="button">
        Open Dialog 1
      </button>
      <button onClick={() => setDialogTwoOpen(toggleState)} type="button">
        Open Dialog 2
      </button>
      <button onClick={() => setDialogModal(toggleState)} type="button">
        Open Dialog Modal
      </button>
      <button onClick={() => setDialogNonModal(toggleState)} type="button">
        Open Dialog NonModal
      </button>
      <button
        onClick={() => {
          setDialogTwoOpen(toggleState);
          setTimeout(() => setDialogOneOpen(toggleState), 1_000);
        }}
        type="button"
      >
        Open Stacked Dialogs
      </button>
      <Dialog
        isOpen={dialogOneOpen}
        onClose={() => setDialogOneOpen(toggleState)}
      >
        <p>This is a test.</p>
      </Dialog>
      <Dialog
        isOpen={dialogTwoOpen}
        onClose={() => setDialogTwoOpen(toggleState)}
      >
        <input name="test-1" tabIndex={-1} type="text" />
        <input autoFocus name="test-2" type="text" />
        <input name="test-3" tabIndex={1} type="text" />
        <input name="test-4" tabIndex={3} type="text" />
        <input name="test-5" tabIndex={2} type="text" />
      </Dialog>
      <DialogModal isOpen={dialogModal} onClose={() => setDialogModal(false)}>
        <p>This is testing the Dialog Modal.</p>
        <input name="test-1" tabIndex={-1} type="text" />
        <input autoFocus name="test-2" type="text" />
        <input name="test-3" tabIndex={1} type="text" />
        <input name="test-4" tabIndex={3} type="text" />
        <input name="test-5" tabIndex={2} type="text" />
      </DialogModal>
      <DialogNonModal
        isOpen={dialogNonModal}
        onClose={() => setDialogNonModal(false)}
      >
        <p>This is testing the Dialog Non Modal.</p>
      </DialogNonModal>
    </>
  );
};

export default Index;
