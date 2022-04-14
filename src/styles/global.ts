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
    
    @media (max-width: 768px) {
      font-size: 9px;
    }
  
    @media (max-width: 468px) {
      font-size: 8px;
    }
  }

  body {
    max-width: 100vw;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }
`;

export default global;
