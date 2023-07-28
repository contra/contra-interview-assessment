/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import {Modal} from "@/components/Modal";

const Index: NextPage = () => {
  return (
    <>
      <h1>Welcome to Contra!</h1>
      {/* eslint-disable-next-line no-console */}
      <Modal closeText="Close" isOpen={true} onClose={() => console.log('fechei o 1')}>
        <p>This is a test.</p>
      </Modal>
      <Modal closeText="Close" isOpen={true} onClose={() => console.log('fechei o 2')}>
        <p>This is a second test.</p>
      </Modal>
    </>
  );
};

export default Index;
