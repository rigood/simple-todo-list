import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoriesState, categoryState, ITodo, todoState } from "../atoms";

const TodoItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  background-color: white;
`;

const TodoCategory = styled.span`
  display: inline-block;
  width: fit-content;
  margin-bottom: 20px;
  padding: 6px 12px;
  border-radius: 10px;
  background-color: teal;
  color: white;
  font-size: 1.6rem;
`;

const TodoText = styled.h1`
  margin-bottom: 20px;
  padding: 20px 10px;
  border-radius: 10px;
  border: 1px solid lightgray;

  font-size: 2.4rem;
`;

const TodoControllers = styled.div`
  display: flex;
  align-items: center;
  span {
    margin-right: 5px;
    font-size: 1.2rem;
  }
  select {
    margin-right: 20px;
  }
`;

function Todo({ text, id, category }: ITodo) {
  const setTodos = useSetRecoilState(todoState);
  const categories = useRecoilValue(categoriesState);

  const handleDelete = () => {
    setTodos((oldTodos) => oldTodos.filter((todo) => todo.id !== id));
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
      <TodoCategory>{category}</TodoCategory>
      <TodoText>{text}</TodoText>
      <TodoControllers>
        <span>카테고리 이동</span>
        <select value={category} onInput={changeCategory}>
          {categories.map((cate, idx) => (
            <option key={idx} value={cate} hidden={cate === category}>
              {cate}
            </option>
          ))}
        </select>
        <span>삭제</span>
        <button onClick={handleDelete}>Delete</button>
      </TodoControllers>
    </TodoItem>
  );
}

export default Todo;
