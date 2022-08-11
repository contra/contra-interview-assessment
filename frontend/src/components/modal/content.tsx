/* eslint-disable canonical/filename-match-exported */
import { forwardRef } from 'react';
import styled from 'styled-components';
import Button from '../button';
import { Title } from '../../styles/typography';

const ContentWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  background: ${({ theme }) => theme.colors.light.powderWhite};
  border: 3px solid ${({ theme }) => theme.colors.light.primary};
  border-radius: 2em;
  box-shadow: 0.5em 1em 2em rgba(54, 54, 54, 0.35);
  padding: 2em;
  min-height: 200px;
  width: 400px;

  &[aria-hidden='true'] {
    display: none;
  }

  &:focus {
    display: block;
    box-shadow: 0.5em 1em 2em rgba(54, 54, 54, 0.5);
  }

  &:focus-within {
    & ${Title} {
      &:before,
      &:after {
        content: '';
        display: block;
        width: 0.225em;
        height: 120%;
        position: absolute;
        top: 50%;
        left: -0.35em;
        border: none;
        background-image: linear-gradient(
          135deg,
          ${({ theme }) => theme.colors.light.primary} 2.5%,
          ${({ theme }) => theme.colors.light.secondary}
        );
        opacity: 0.2;
      }

      &:before {
        left: -0.135em;
        transform: translateY(-50%) rotate(-50deg) translateY(-0.25em);
      }

      &:after {
        transform: translateY(-50%) rotate(25deg) translateY(-0.125em);
      }
    }
  }

  footer button {
    padding: 0.5em 1em;
    font-size: 1rem;
    border-width: 2px;
  }
`;

const CloseIcon = styled.button`
  font-family: sans-serif;
  background: transparent;
  border: none;
  padding: 0.75em;
  float: right;
  margin-top: -1.5em;
  margin-right: -1.5em;

  &:hover,
  &:focus {
    transform: scale(1.2) rotate(2deg);
    color: ${({ theme }) => theme.colors.light.secondary};
  }
`;

const ModalContent = forwardRef(
  ({ isOpen, id, title, handleClose, children }, ref) => {
    return (
      <ContentWrapper
        ref={ref}
        role="dialog"
        id={`modal-${id}`}
        open={isOpen && true}
        aria-hidden={!isOpen}
        aria-modal={true}
        aria-labelledby={`modal-header-${id}`}
      >
        <CloseIcon
          aria-label={`Close ${title} Modal`}
          onClick={(e) => handleClose(e, ref)}
          id={`modal-header-close-${id}`}
          data-modal={`modal-${id}`}
        >
          X
        </CloseIcon>
        <header>
          <Title id={`modal-header-${id}`} tabIndex="-1">
            {title}
          </Title>
        </header>
        {children}
      </ContentWrapper>
    );
  }
);

export default ModalContent;
