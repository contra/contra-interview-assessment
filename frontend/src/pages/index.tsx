/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import { Modal } from '@/components/modal';

const Index: NextPage = () => {
  return (
    <div>
      <h1>Welcome to Contra!</h1>
      <Modal />
    </div>
  );
};

export default Index;
