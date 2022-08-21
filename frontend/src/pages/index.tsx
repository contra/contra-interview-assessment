/* eslint-disable canonical/filename-match-exported */
import { type NextPage } from 'next';
import Link from 'next/link';
import Button from '@/components/Button/Button';
import { Container } from '@/components/Container/Container';
import NormalModal from '@/components/Demo/NormalModal';
import StackedModal from '@/components/Demo/StackedModal';

const Index: NextPage = () => {
  return (
    <Container as="main" css={{ paddingTop: '1rem' }}>
      <h1>Modal</h1>
      <p>
        Here is a demo of the modal that is implemented and the features it
        allows
      </p>
      <ol>
        <li>It disables scrolling of the page content while open.</li>
        <li>Manages modal stacking</li>
        <li>Creates a backdrop</li>
        <li>
          It properly manages focus; moving to the modal content, and keeping it
          there until the modal is closed.
        </li>
        <li>Adds the appropriate ARIA roles automatically.</li>
      </ol>
      <NormalModal />
      <StackedModal />
      <h2>Server side rendering support</h2>
      <Link href="/ssr">
        <Button
          as="a"
          css={{ textDecoration: 'none' }}
          href="/ssr"
          variant="primary"
        >
          See the modal that can be generated server side
        </Button>
      </Link>
    </Container>
  );
};

export default Index;
