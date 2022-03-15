import { createGlobalStyle } from 'styled-components';

const global = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;

  }

  html {
    font-size: 62.5%;
  }
`;

export default global;
