import { type NextPage } from 'next';
import { Button } from '../common/Button';
import { Modal, ModalBackdrop, ModalContainer } from '../common/Modal';
import { Div } from '../common/utils';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import { colors } from '../common/theme';

const Modal2 = styled(Modal)(
  ({ theme: { colors } }) => css`
    ${ModalBackdrop} {
      background: ${colors.blue20};
    }
    ${ModalContainer} {
      margin-top: 10vh;
      height: 550px;
      ${(props) => props.theme.mediaQueries.mobile} {
        margin-top: 15vh;
      }
    }
  `
);

const Wrapper = styled(Div)`
  ${(p) => p.theme.css.centered};
  width: 100%;
`;

const Index: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pageContentUI = (
    <Wrapper centered>
      <Div w="80vw" m="5vw" h="200vh" br={5} bg={colors.gray2} />
    </Wrapper>
  );

  return (
    <Div>
      <Div m="5vh">
        <Button w={300} onClick={() => setIsModalOpen(true)}>
          Open Modal
        </Button>
        <MainModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </Div>
      {pageContentUI}
    </Div>
  );
};

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
const MainModal = ({ isOpen, onClose }: ModalProps) => {
  const [isStackedModalOpen, setIsStackedModalOpen] = useState(false);
  const bodyText =
    'Soluta voluptatibus! Illum perferendis consec minim natoque consequat? Suspendisse, mus. Pulvinar error, luctus tempore.';

  const stackedModalUI = (
    <Modal2
      variant="small"
      isOpen={isStackedModalOpen}
      body="testing stacked modal"
      header="Stacked Modal"
      onClose={() => setIsStackedModalOpen(false)}
      confirmation={{
        label: 'Confirm',
        onConfirm: () => alert('confirmed'),
      }}
      isStacked
    >
      <Div mt={10} p={20} h={400} bg={colors.gray2} centered>
        Content
      </Div>
    </Modal2>
  );

  return (
    <Modal
      variant="medium"
      isOpen={isOpen}
      body={bodyText}
      header="Main Modal"
      onClose={onClose}
      shouldCloseOnEscapeKeyDown={!isStackedModalOpen}
    >
      <Div mt={30}>
        <Button onClick={() => setIsStackedModalOpen(true)}>
          Open stacked modal
        </Button>
        {stackedModalUI}
      </Div>
    </Modal>
  );
};

export default Index;
