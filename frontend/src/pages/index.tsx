/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import { useState } from 'react';
import { Modal } from '@/components/Modal';
import { TestForm, TestText } from '@/components/example/data';

const Index: NextPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Modal onClose={() => setOpen(false)} open={open}>
        <TestForm />
      </Modal>
      <button onClick={() => setOpen(true)} type="button">
        open
      </button>
      <TestText />
    </>
  );
};

export default Index;
