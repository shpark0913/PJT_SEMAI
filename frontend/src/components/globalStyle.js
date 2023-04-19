import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    /* Color */
    --gray800-color: #EBEBEB;
    --gray700-color: #D1D1D1;
    --gray600-color: #B8B8B8;
    --gray500-color: #9E9E9E;
    --gray400-color: #858585;
    --gray300-color: #6B6B6B;
    --gray200-color: #525252;
    --gray100-color: #383838;

    /* background color */
    --background-color: #001F3D;

    /* Navigation bar height */
    --nav-height: 50px;

    /* empty space */
    --side-space: 200px;
    --content-space: 950px;
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
    color: var(--gray100-color);
    width: 100%;
    //height: 100%;
    font-family: "Pretendard", -apple-system, Helvetica Neue, sans-serif;
    margin: 0;
    padding: 0;
    background-color: var(--background-color);
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

  a,
  div,
  span,
  input,
  button,
  textarea {
    font-family: inherit;
  }

  h1, h2, h3 {
    margin: 0 0 10px;
  }
`;

export default GlobalStyle;
