import React from 'react';
import styled from 'styled-components';
import Modal, { type ModalProps } from '.';

export type ContentModalProps = ModalProps & {
  text: string;
  title: string;
};

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Title = styled.h2`
  font-size: ${({ theme: { fontSize } }) => fontSize.larger};
  line-height: ${({ theme: { lineHeight } }) => lineHeight.large};
  color: ${({ theme: { colors } }) => colors.modalTitle};
`;

const Text = styled.p`
  font-size: ${({ theme: { fontSize } }) => fontSize.regular};
  line-height: ${({ theme: { lineHeight } }) => lineHeight.regular};
  color: ${({ theme: { colors } }) => colors.modalText};
`;

const ContentModal: React.FC<ContentModalProps> = ({
  text,
  title,
  children,
  ...baseModalProps
}) => {
  return (
    <Modal {...baseModalProps}>
      <ContentContainer>
        <Title>{title}</Title>
        <Text>{text}</Text>
      </ContentContainer>
      {children}
    </Modal>
  );
};

export default ContentModal;
