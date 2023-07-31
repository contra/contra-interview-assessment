/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import { Dialog } from 'components/Dialog';
import { useState } from 'react';

const toggleState = (previousState: boolean) => !previousState;

const Index: NextPage = () => {
  const [dialogOneOpen, setDialogOneOpen] = useState(true);
  const [dialogTwoOpen, setDialogTwoOpen] = useState(true);

  return (
    <>
      <h1>Welcome to Contra!</h1>
      <button onClick={() => setDialogOneOpen(toggleState)} type="button">
        Open Dialog 1
      </button>
      <button onClick={() => setDialogTwoOpen(toggleState)} type="button">
        Open Dialog 2
      </button>
      {/* eslint-disable-next-line no-console */}
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
        <input name="test-1" type="text" />
        <input autoFocus name="test-2" type="text" />
      </Dialog>
    </>
  );
};

export default Index;
