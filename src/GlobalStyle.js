import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --bg-primary: rgb(225, 237, 250);
    --sidebar-bg: #2e4661;
    --accent-pink: rgb(252, 215, 252);
    --accent-blue: rgb(70, 135, 209);
    --btn-blue: #007bff;
    --text-primary: #1a2a3a;
    --text-secondary: #4a5568;
    --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
    --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 8px 30px rgba(0, 0, 0, 0.12);
    --radius-sm: 6px;
    --radius-md: 12px;
    --radius-lg: 18px;
    --transition-fast: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-smooth: 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Consolas, sans-serif, 'Microsoft YaHei', 'SimHei';
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: var(--bg-primary);
    color: var(--text-primary);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Modern scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(46, 70, 97, 0.25);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(46, 70, 97, 0.4);
  }

  /* Smooth scrolling */
  * {
    scrollbar-width: thin;
    scrollbar-color: rgba(46, 70, 97, 0.25) transparent;
  }

  ::selection {
    background: rgba(70, 135, 209, 0.25);
  }
`;

export default GlobalStyle;
