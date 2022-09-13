import React from "react";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import TodoList from "./components/TodoList";

const GlobalStyle = createGlobalStyle`
${reset};
*{
  box-sizing: border-box;
}
body{
  font-family: 'Noto Sans KR', sans-serif;
}
select, button, input::placeholder{
  font-family: 'Noto Sans KR', sans-serif;
}
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <TodoList />
    </>
  );
}

export default App;
