import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.colors.bodyBackground};
    color: ${(props) => props.theme.colors.bodyText};
    font-family: sans-serif;
    margin: 0;
    padding: 0;
  }

  p, h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

  body, button {
    font-family: 'Open Sans', sans-serif 
  }
`;

export default GlobalStyle;
