import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    font-family: Consolas, sans-serif, "Microsoft YaHei", "SimHei";
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: rgb(225, 237, 250);
  }
`;

export default GlobalStyle;
