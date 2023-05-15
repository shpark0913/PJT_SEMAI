import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --gray800-color: #EBEBEB;
    --gray700-color: #D1D1D1;
    --gray600-color: #B8B8B8;
    --gray500-color: #9E9E9E;
    --gray400-color: #858585;
    --gray300-color: #6B6B6B;
    --gray200-color: #525252;
    --gray100-color: #383838;

    --check-color: #0AFF0A;
    --danger-color: #FF0A0A;
    --danger-color-light: #FF7070;
    --warning-color: #FFFF0A;

    /* Navigation bar height */
    --nav-height: 50px;

    /* empty space */
    --side-space: 200px;
    --content-space: 950px;
  }

  :root[data-theme="light"] {
    --emphasize-color: #0052A4;
    --emphasize-color-hover: #003870;
    --section-color: #E8EFF6;
    --background-color: #FCFCFC;
    --background-dark-color: #E4EDF5;

    --tab-menu-color: #EDEDED;
    --tab-span-color: #0052A4;
    --tab-span-font-color: #FCFCFC;

    --font-color: #0E0E0E;
    --shadow-color: rgba(33, 35, 38, 0.2);
    --table-hover-color: #E4EDF5;
  }

  :root[data-theme="dark"] {
    --emphasize-color: #BDDEFF;
    --emphasize-color-hover: #3D9EFF;
    --section-color: #2A4058;
    --background-color: #001F3D;
    --background-dark-color: #00050A;

    --tab-menu-color: #313748;
    --tab-span-color: #70B8FF;
    --tab-span-font-color: #FCFCFC;

    --font-color: #FCFCFC;
    --shadow-color: rgba(255, 255, 255, 0.3);
    --table-hover-color: rgba(228, 237, 245, 0.2);
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  html, body {
    color: var(--font-color);
    background-color: var(--background-color);
    width: 100%;
    height: 100%;
    font-family: "Pretendard", -apple-system, Helvetica Neue, sans-serif;
    margin: 0;
    padding: 0;
    transition: all 100ms ease-in;
  }

  button {
    border: none;
    cursor: pointer;
    padding: 0;
  }

  input {
    border: none;
    background-color: inherit;
  }

  input:focus {
    outline: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  p {
    margin-bottom: 0;
    padding-bottom: 0;
  }

  a,
  div,
  input,
  button,
  textarea {
    font-family: inherit;
  }

  span {
    font-size: 13px;
  }

  h1 {
    font-size: 18px;
    font-weight: bold;
    color: var(--emphasize-color);
    margin-top: 0;
    margin-bottom: 7px;
  }

  h2, h3, h5 {
    margin: 0 0 10px;
  }

  h4 {
    margin: 5px 0 0 7px;
    padding: 0;
  }

  li {
    list-style-type: none;
  }

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: var(--gray600-color);
  }

  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
`;

export default GlobalStyle;
