/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import { useState } from 'react';
import Modal from '@/components/Modal';

const Index: NextPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-black via-black  to-yellow-700 antialiased">
      <button
        className="rounded-full bg-[#f2c94c] px-4 py-3 font-semibold text-black"
        onClick={() => setModalOpen(true)}
        type="button"
      >
        Let's welcome Ryel To Contra
      </button>
      <Modal onClose={() => setModalOpen(false)} open={modalOpen} />
    </div>
  );
};

export default Index;
