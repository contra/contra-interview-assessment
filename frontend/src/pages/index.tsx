/* eslint-disable canonical/filename-match-exported */
import { HtmlModalDemo } from '@/../components/htmlModalDemo';
import { Introduction } from '@/../components/introduction';
import { ReactModalDemo } from '@/../components/reactModalDemo';
import styles from '@/../styles/home.module.css';
import { type NextPage } from 'next';

const Index: NextPage = () => {
  return (
    <main className={styles['root']}>
      <Introduction />
      <div className={styles['actions']}>
        <HtmlModalDemo />
        <ReactModalDemo />
      </div>
    </main>
  );
};

export default Index;
