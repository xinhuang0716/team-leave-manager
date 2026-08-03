import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    color-scheme: dark;
    --canvas: #1a2b40;
    --canvas-elevated: #21364f;
    --surface: #263d58;
    --surface-muted: #2f4a68;
    --surface-strong: #3a5877;
    --sidebar: #1d3149;
    --sidebar-muted: #c0ccd8;
    --primary-rgb: 100, 181, 255;
    --border-rgb: 188, 211, 234;
    --primary: #64b5ff;
    --primary-strong: #95ceff;
    --primary-soft: rgba(var(--primary-rgb), 0.18);
    --primary-faint: rgba(var(--primary-rgb), 0.13);
    --text-primary: #f6f9fc;
    --text-secondary: #d1dbe6;
    --text-tertiary: #a4b3c4;
    --text-on-accent: #06111f;
    --field-focus: #243a53;
    --border: rgba(var(--border-rgb), 0.19);
    --border-strong: rgba(var(--border-rgb), 0.32);
    --danger: #e18484;
    --danger-soft: rgba(225, 132, 132, 0.1);
    --shadow-sm: 0 1px 2px rgba(5, 15, 28, 0.18);
    --shadow-md: 0 8px 24px rgba(5, 15, 28, 0.22);
    --shadow-lg: 0 20px 48px rgba(5, 15, 28, 0.4);
    --radius-chip: 4px;
    --radius-control: 6px;
    --radius-surface: 8px;
    --radius-sm: var(--radius-chip);
    --radius-md: var(--radius-control);
    --radius-lg: var(--radius-surface);
    --transition-fast: 120ms cubic-bezier(0.2, 0, 0, 1);
    --transition-smooth: 180ms cubic-bezier(0.2, 0, 0, 1);
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    min-width: 320px;
    min-height: 100%;
    background: var(--canvas);
  }

  body {
    min-width: 320px;
    min-height: 100dvh;
    overflow-x: hidden;
    margin: 0;
    background: var(--canvas);
    color: var(--text-primary);
    font-family: "Segoe UI Variable", "Aptos", "Noto Sans TC", "Microsoft JhengHei",
      ui-sans-serif, -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 16px;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    min-height: 100dvh;
  }

  button,
  input,
  select,
  textarea {
    font: inherit;
  }

  button,
  a {
    -webkit-tap-highlight-color: transparent;
  }

  button:focus-visible,
  a:focus-visible,
  input:focus-visible,
  select:focus-visible,
  textarea:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 3px;
  }

  ::selection {
    background: rgba(var(--primary-rgb), 0.28);
    color: var(--text-primary);
  }

  ::-webkit-scrollbar {
    width: 9px;
    height: 9px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    border: 2px solid transparent;
    border-radius: 999px;
    background: #587493;
    background-clip: padding-box;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #6b88a8;
    background-clip: padding-box;
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: #587493 transparent;
  }

  .leave-modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 100;
    display: grid;
    place-items: center;
    padding: 20px;
    background: rgba(3, 8, 16, 0.72);
    backdrop-filter: blur(12px);
  }

  .leave-modal {
    position: relative;
    width: min(620px, 100%);
    max-height: calc(100dvh - 40px);
    overflow-y: auto;
    padding: clamp(24px, 4vw, 34px);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-surface);
    background: var(--surface);
    box-shadow: var(--shadow-lg);
    outline: none;
  }

  @media (max-width: 520px) {
    .leave-modal-overlay {
      align-items: end;
      padding: 12px;
    }

    .leave-modal {
      max-height: calc(100dvh - 24px);
      padding: 22px 18px;
    }
  }

  @media (prefers-reduced-transparency: reduce) {
    .leave-modal-overlay {
      backdrop-filter: none;
      background: rgba(3, 8, 16, 0.94);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      scroll-behavior: auto !important;
      transition-duration: 0.01ms !important;
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
    }
  }
`;

export default GlobalStyle;
