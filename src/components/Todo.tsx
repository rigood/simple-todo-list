import React from "react";
import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { categoriesState, ITodo, todoState } from "../atoms";

const TodoItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 400px;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 10px;
`;

const TodoText = styled.span``;

const TodoCategory = styled.span``;

const TodoDeleteBtn = styled.div``;

const TodoCategoryBtns = styled.div`
  display: flex;
  flex-wrap: wrap;
  button:first-child {
    margin-right: 10px;
  }
`;

function Todo({ text, id, category }: ITodo) {
  const setTodos = useSetRecoilState(todoState);

  const [categories, setCategories] = useRecoilState(categoriesState);

  const handleDelete = () => {
    setTodos((oldTodos) => oldTodos.filter((todo) => todo.id !== id));
  };

  const handleCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    const name = event.currentTarget.name;
    setTodos((oldTodos) => {
      const targetIndex = oldTodos.findIndex((todo) => todo.id === id);
      const newTodo = { text, id, category: name as any };
      return [...oldTodos.slice(0, targetIndex), newTodo, ...oldTodos.slice(targetIndex + 1)];
    });
  };

  const changeCategory = (event: React.FormEvent<HTMLSelectElement>) => {
    const value = event.currentTarget.value;
    setTodos((oldTodos) => {
      const targetIndex = oldTodos.findIndex((todo) => todo.id === id);
      const newTodo = { text, id, category: value as any };
      return [...oldTodos.slice(0, targetIndex), newTodo, ...oldTodos.slice(targetIndex + 1)];
    });
  };

  return (
    <TodoItem>
      <TodoText>{text}</TodoText>
      <TodoCategory>{category}</TodoCategory>
      <TodoDeleteBtn>
        <button onClick={handleDelete}>Delete</button>
      </TodoDeleteBtn>
      <TodoCategoryBtns>
        <select value={category} onInput={changeCategory}>
          {categories.map((category, idx) => (
            <option key={idx} value={category}>
              {category}
            </option>
          ))}
        </select>
      </TodoCategoryBtns>
    </TodoItem>
  );
}

export default Todo;
