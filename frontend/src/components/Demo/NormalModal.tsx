import { styled } from '@/stitches';
import Box from '../Box/Box';
import {
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalRoot,
  ModalTitle,
} from '../Modal';
import ModalTrigger from '../Modal/components/ModalTrigger';

const StyledLink = styled('a', { color: '$grey100' });

const NormalModal = () => {
  return (
    <Box as="section">
      <h2>Normal modal</h2>
      <Box
        css={{
          border: `1px solid $primary500`,
          borderRadius: '1rem',
          display: 'flex',
          justifyContent: 'center',
          margin: '1rem auto',
          padding: '1rem 0.5rem',
        }}
      >
        <ModalRoot shouldShowOverlay>
          <ModalTrigger variant="success">Open modal</ModalTrigger>
          <ModalContent css={{ overflow: 'auto' }}>
            <ModalTitle>Hello world!</ModalTitle>
            <ModalDescription as="article">
              <p>
                This is an example of a regular modal. You can close this by
                pressing the <code>ESC</code> key or by clicking on the "Close"
                button.
              </p>
              <section>
                <h3>While you're here:</h3>
                <ol>
                  <li>
                    Try to click outside of the modal, it shouldn't allow one to
                    do so.
                  </li>
                  <li>It should also disable the scroll outside.</li>
                  <li>
                    Try to press the tab keys and navigate, it should only focus
                    on elements that are inside of this modal.
                  </li>
                  <li>
                    Try to open this modal on a mobile screen, it should allow
                    one to scroll within the modal while taking up almost the
                    height of the device.
                  </li>
                  <li>
                    Try to open this modal when a screen reader is on. It should
                    read out "Hello world!" and "This is an example of a regular
                    modal" bit... above as that is the title and description of
                    the modal respectively and focus on the "jay@shahjay.io"
                    email link when the modal opens initially. If you're on
                    MacOS, you can use <code>CMD + F5</code> to toggle screen
                    reader.
                  </li>
                </ol>
                <aside>
                  <small>
                    PS: If this doesn't work as expected you can reach out to{' '}
                    <StyledLink href="mailto:jay@shahjay.io">
                      "jay@shahjay.io".
                    </StyledLink>
                  </small>
                </aside>
              </section>
            </ModalDescription>

            <ModalClose shouldBeAtTopRight>Close</ModalClose>
          </ModalContent>
        </ModalRoot>
      </Box>
    </Box>
  );
};

export default NormalModal;
