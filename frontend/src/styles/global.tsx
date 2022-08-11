import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 1em;
    box-sizing: border-box;
    position: relative;
    min-height: 100vh;
  }
`;

export { GlobalStyle };
