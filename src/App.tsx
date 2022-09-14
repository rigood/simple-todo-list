import React from "react";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import TodoList from "./components/TodoList";

const GlobalStyle = createGlobalStyle`
${reset};
*{
  box-sizing: border-box;
}
html{
  font-size: 62.5%;
}
body{
  font-family: 'Noto Sans KR', sans-serif;
  background-color: #cfd2d9;
}
input, button, select, option{
  font-family: 'Noto Sans KR', sans-serif;
}
select:focus{
  outline: none;
}
button{
  cursor: pointer;
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
