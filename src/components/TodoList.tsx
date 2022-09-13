import React from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoriesState, categoryState, todoSelector, todoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import Todo from "./Todo";

const TodoListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CategoryContainer = styled.div`
  display: flex;
  margin: 20px auto;
`;

function TodoList() {
  const todos = useRecoilValue(todoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const [categories, setCategories] = useRecoilState(categoriesState);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  const handleAddCategory = () => {
    const categoryInput = prompt("새로운 카테고리 이름을 입력해주세요.");
    if (categoryInput) {
      if (categories.includes(categoryInput)) {
        alert("동일한 이름의 카테고리가 이미 존재합니다. 다른 이름을 입력해주세요.");
        return;
      }
      setCategories([...categories, categoryInput]);
      setCategory(categoryInput);
    }
  };

  return (
    <>
      <TodoListContainer>
        <CategoryContainer>
          <select value={category} onInput={onInput}>
            {categories.map((category, idx) => (
              <option key={idx}>{category}</option>
            ))}
          </select>
          <button onClick={handleAddCategory}>카테고리 추가</button>
        </CategoryContainer>
        <CreateToDo />
        {todos?.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </TodoListContainer>
    </>
  );
}

export default TodoList;
