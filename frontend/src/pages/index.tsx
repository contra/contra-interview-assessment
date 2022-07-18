/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import Link from 'next/link';
import Layout from '../Component/Layout';
import useModal from '../hooks/useModal';

const Index: NextPage = () => {
  const { showSimpleModal } = useModal();

  return (
    <Layout>
      <h1>Welcome to Contra!</h1>
      <Link href="/scroll">
        <a>scroll</a>
      </Link>

      <button onClick={showSimpleModal}>Show Modal</button>
    </Layout>
  );
};

export default Index;
