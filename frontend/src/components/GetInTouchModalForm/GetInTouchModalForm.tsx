import React from 'react';
import { Button } from '@/components/Button';
import {
  ButtonGroup,
  Container,
  FooterText,
  FormContainer,
  HeaderTitle,
  MessageArea,
  SectionContainer,
  SubTitle,
} from './GetInTouchModalForm.styles';

interface GetInTouchProps {
  hide: () => void;
}

export function GetInTouchModalForm({ hide }: GetInTouchProps) {
  return (
    <Container>
      <HeaderTitle>Want to work with Douglas?</HeaderTitle>
      <SubTitle>
        Fill out the form below and we'll send a message on your behalf.
      </SubTitle>

      <FormContainer>
        <SectionContainer>
          <p>Write a Message</p>
        </SectionContainer>
        <MessageArea placeholder="Start a conversation with Douglas..." />
        <ButtonGroup>
          <Button label="Send message" />
          <Button label="Cancel" isCancel onClickHandler={hide} />
        </ButtonGroup>
      </FormContainer>

      <FooterText>
        By continuing, you agree to Contra's Terms of Use and confirm that you
        have read Contra's Privacy Policy
      </FooterText>
    </Container>
  );
}
