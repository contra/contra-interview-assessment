/* eslint-disable canonical/filename-match-exported */
import { motion } from 'framer-motion';
import { type NextPage } from 'next';
import { useEffect, useState } from 'react';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import Profile from '@/components/Profile';

const Index: NextPage = () => {
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [optionsModalOpen, setOptionsModalOpen] = useState(false);
  const [topLeftModalOpen, setTopLeftModalOpen] = useState(false);
  const [topRightModalOpen, setTopRightModalOpen] = useState(false);
  const [bottomLeftModalOpen, setBottomLeftModalOpen] = useState(false);
  const [bottomRightModalOpen, setBottomRightModalOpen] = useState(false);

  // useEffect that locks scrolling of body if modal is open
  useEffect(() => {
    if (
      profileModalOpen ||
      optionsModalOpen ||
      topLeftModalOpen ||
      topRightModalOpen ||
      bottomLeftModalOpen ||
      bottomRightModalOpen
    ) {
      document.body.style.overflow = 'hidden';
      document.body.style.overflowX = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.overflowX = 'hidden';
    }
  }, [
    profileModalOpen,
    optionsModalOpen,
    topLeftModalOpen,
    topRightModalOpen,
    bottomLeftModalOpen,
    bottomRightModalOpen,
  ]);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="grid h-[1000px] w-screen grid-cols-1 grid-rows-2 gap-12 bg-gradient-to-br from-black via-black to-yellow-700 p-44 antialiased"
      initial={{ opacity: 0.5 }}
      transition={{ duration: 0.5 }}
    >
      {/* Home Screen Buttons */}
      <Button setState={setProfileModalOpen}>Ryel Banfield</Button>
      <Button setState={setOptionsModalOpen}>Modal?</Button>

      {/* Profile Modal */}
      <Modal onClose={() => setProfileModalOpen(false)} open={profileModalOpen}>
        <Profile />
      </Modal>

      {/* Options Modal */}
      <Modal onClose={() => setOptionsModalOpen(false)} open={optionsModalOpen}>
        <div className="flex grow">
          <div className="grid grow grid-cols-2 grid-rows-2 gap-8 p-8">
            <Button setState={setTopLeftModalOpen}>Top Left</Button>
            <Button setState={setTopRightModalOpen}>Top Right</Button>
            <Button setState={setBottomLeftModalOpen}>Bottom Left</Button>
            <Button setState={setBottomRightModalOpen}>Bottom Right</Button>
          </div>
        </div>
      </Modal>

      {/* Small Modals */}
      <Modal
        location="top-left"
        onClose={() => setTopLeftModalOpen(false)}
        open={topLeftModalOpen}
        small
      >
        <p>Top Left</p>
      </Modal>

      <Modal
        location="top-right"
        onClose={() => setTopRightModalOpen(false)}
        open={topRightModalOpen}
        small
      >
        <p>Top Right</p>
      </Modal>

      <Modal
        location="bottom-left"
        onClose={() => setBottomLeftModalOpen(false)}
        open={bottomLeftModalOpen}
        small
      >
        <p>Bottom Left</p>
      </Modal>

      <Modal
        location="bottom-right"
        onClose={() => setBottomRightModalOpen(false)}
        open={bottomRightModalOpen}
        small
      >
        <p>Bottom Right</p>
      </Modal>
    </motion.div>
  );
};

export default Index;
