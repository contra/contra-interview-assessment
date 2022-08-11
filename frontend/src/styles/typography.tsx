import styled from 'styled-components';

const Title = styled.h1`
  position: relative;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-family: 'monospace';
  color: ${({ theme }) => theme.colors.light.secondary};

  &:focus {
    outline: none;
  }
`;

export { Title };
