/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import { useState } from 'react';
import Modal from '@/components/Modal';
import Profile from '@/components/Profile';

const Index: NextPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-black via-black to-yellow-700 antialiased">
      <button
        className="rounded-full bg-[#f2c94c] px-4 py-3 font-semibold text-black"
        onClick={() => setModalOpen(true)}
        type="button"
      >
        Who is Ryel?
      </button>

      <Modal onClose={() => setModalOpen(false)} open={modalOpen}>
        <Profile />
      </Modal>
    </div>
  );
};

export default Index;
