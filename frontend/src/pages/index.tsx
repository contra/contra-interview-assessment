/* eslint-disable canonical/filename-match-exported */
import { motion } from 'framer-motion';
import { type NextPage } from 'next';
import { useState } from 'react';
import Modal from '@/components/Modal';
import Profile from '@/components/Profile';

const Index: NextPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-black via-black to-yellow-700 antialiased"
      initial={{ opacity: 0.5 }}
      transition={{ duration: 0.5 }}
    >
      <motion.button
        animate={{ y: 0 }}
        className="rounded-full bg-[#f2c94c] px-4 py-3 font-semibold text-black"
        initial={{ y: -1_000 }}
        onClick={() => setModalOpen(true)}
        transition={{ duration: 0.5 }}
        type="button"
        whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.9, transition: { duration: 0.2 } }}
      >
        Who is Ryel?
      </motion.button>

      <Modal onClose={() => setModalOpen(false)} open={modalOpen}>
        <Profile />
      </Modal>
    </motion.div>
  );
};

export default Index;
