import { useState, useRef } from 'react';
import styled from 'styled-components';
import ModalWrapper from './modal/modal-wrapper';
import SignUpModal from './sign-up-modal';

const LoginForm = styled.form`
  max-width: 80%;
  margin: 0 auto;
`;

const LoginInputWrapper = styled.div`
  & + div {
    margin-top: 1em;
  }

  label,
  input {
    display: block;
  }

  input {
    border: 1px solid ${({ theme }) => theme.colors.light.primary};
    padding: 0.5em;
    margin-top: 0.25em;
    min-width: 200px;
  }
`;

const LogInModal = () => {
  return (
    <ModalWrapper
      openLabel="Log In"
      id="log-in"
      isNested={false}
      showFooterControls={true}
      showFooterClose={true}
    >
      <main>
        <LoginForm>
          <LoginInputWrapper>
            <label htmlFor="username">Username or email</label>
            <input
              id="username"
              type="email"
              placeholder="email@domain.com"
              disabled
            />
          </LoginInputWrapper>

          <LoginInputWrapper>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" disabled />
          </LoginInputWrapper>
        </LoginForm>

        <p>
          Don't have an account?
        </p>

        <SignUpModal/>

      </main>
    </ModalWrapper>
  );
};

export default LogInModal;
