/* eslint-disable canonical/filename-match-exported */
import Link from 'next/link';
import {
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalRoot,
  ModalTitle,
} from '@/components/Modal';
import ModalTrigger from '@/components/Modal/components/ModalTrigger';
import { styled } from '@/stitches';

const StyledLink = styled('a', { color: '$grey100', margin: '0px 1rem' });

const SSR = () => {
  return (
    <main>
      <h1>This is server side rendered</h1>
      <ModalRoot defaultOpen disablePortal shouldShowOverlay>
        <ModalTrigger>Open modal</ModalTrigger>
        <ModalContent>
          <ModalTitle>This modal can be used SSR</ModalTitle>
          <ModalDescription>
            This modal was generated at build time and is compatible with SSR.
            It would be shown even with JavaScript disabled on initial page
            load.
          </ModalDescription>
          <ModalClose shouldBeAtTopRight>Close</ModalClose>
        </ModalContent>
      </ModalRoot>
      <Link href="/">
        <StyledLink href="/">Go back</StyledLink>
      </Link>
    </main>
  );
};

export default SSR;
