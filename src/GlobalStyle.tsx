import { createGlobalStyle, css } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`${css`
  ${reset};

  * {
    box-sizing: border-box;
  }

  :root {
    --bg-color: #cfd2d9;
    --primary: teal;
    --lightgray: lightgray;
    --darkgray: darkgray;
    --border-radius: 10px;
  }

  html {
    font-size: 62.5%;
    min-height: 100vh;
  }

  body {
    font-family: "Noto Sans KR", sans-serif;
    background: var(--bg-color);
    font-size: 1.4rem;
  }

  input,
  button,
  select,
  option {
    font-family: inherit;
    font-size: inherit;
  }

  button {
    cursor: pointer;
    padding-block: 0px;
  }
`}
`;

export default GlobalStyle;
