import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ITodo, categoriesAtom, todosAtom } from "../atoms";
import { useForm } from "react-hook-form";
import { useState } from "react";

function Todo({ text, id, category: myCategory }: ITodo) {
  const categories = useRecoilValue(categoriesAtom);
  const setTodos = useSetRecoilState(todosAtom);

  const changeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;

    setTodos((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, category } : todo))
    );
  };

  const deleteTodo = () => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  const { register, handleSubmit, setFocus } = useForm();
  const [isEditing, setIsEditing] = useState(false);

  const setEditingMode = () => {
    setIsEditing(true);
    setFocus("todoText");
  };

  const editTodo = handleSubmit(({ todoText }) => {
    if (todoText === "") {
      setFocus("todoText");
      return;
    }

    setTodos((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, text: todoText } : todo))
    );

    setIsEditing(false);
  });

  return (
    <Wrapper>
      <Row>
        <CategorySelect value={myCategory} onChange={changeCategory}>
          {categories.map((category) => (
            <CategoryOption
              key={category}
              value={category}
              hidden={category === myCategory}
            >
              {category}
            </CategoryOption>
          ))}
        </CategorySelect>
        <Buttons>
          <Button type="button" onClick={setEditingMode} disabled={isEditing}>
            {isEditing ? "수정중" : "수정"}
          </Button>
          <Button type="button" onClick={deleteTodo}>
            삭제
          </Button>
        </Buttons>
      </Row>
      <TodoTextForm onSubmit={editTodo}>
        <TodoTextInput
          type="text"
          {...register("todoText", {
            required: true,
            value: text,
            onBlur: editTodo,
          })}
          placeholder="할일을 입력해주세요."
          isEditing={isEditing}
          readOnly={!isEditing}
        />
      </TodoTextForm>
      <CreatedAt>
        {new Intl.DateTimeFormat("ko-KR", {
          dateStyle: "short",
          timeStyle: "short",
        }).format(id)}
      </CreatedAt>
    </Wrapper>
  );
}

export default Todo;

const Wrapper = styled.li`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding: 20px;
  border-radius: var(--border-radius);
  background-color: white;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CategorySelect = styled.select`
  width: fit-content;
  border: 1px solid transparent;
  border-bottom: none;

  &:focus {
    border-color: black;
  }
`;

const CategoryOption = styled.option``;

const Buttons = styled.div`
  display: flex;
  column-gap: 5px;
`;

const Button = styled.button`
  padding: 0 4px;
`;

const TodoTextForm = styled.form``;

const TodoTextInput = styled.input<{ isEditing: boolean }>`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--lightgray);
  border-color: ${({ isEditing }) => isEditing && "var(--primary)"};
  outline: ${({ isEditing }) =>
    isEditing ? "2px solid var(--primary)" : "none"};
  border-radius: var(--border-radius);
  font-size: 1.6rem;
  cursor: ${({ isEditing }) => (isEditing ? "text" : "default")};

  &:focus {
    &::placeholder {
      opacity: 0.5;
    }
  }
`;

const CreatedAt = styled.span`
  text-align: end;
  margin-right: 5px;
  font-size: 1.2rem;
  color: var(--darkgray);
`;
