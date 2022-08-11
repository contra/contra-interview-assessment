import styled from 'styled-components';

const Btn = styled.button`
  background: ${({ mode, theme }) => theme.colors[mode].accent};
  border: 3px solid ${({ mode, theme }) => theme.colors[mode].secondary};
  color: ${({ mode, theme }) =>
    mode === 'dark' ? theme.colors.dark.powderWhite : theme.colors[mode].onyx};
  font-size: 1.2rem;
  font-family: monospace;
  padding: ${({ size }) =>
    size !== 'reg' ? (size === 'lg' ? '2em 2.5em' : '.5em 1em') : '.5em 2em'};
  border-radius: 2em;
  transition: all 0.15s linear;

  &:hover,
  &:focus {
    color: ${({ mode, theme }) => theme.colors[mode].secondary};
    border-color: ${({ mode, theme }) => theme.colors[mode].accent};
    outline: 1px solid ${({ mode, theme }) => theme.colors[mode].secondary};
    box-shadow: 0 0.125em 0.25em rgba(54, 54, 54, 0.65);
  }
`;

export { Btn };
