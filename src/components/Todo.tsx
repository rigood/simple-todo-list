import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ITodo, categoriesState, todosState } from "../recoil";
import { useForm } from "react-hook-form";
import { useState } from "react";

function Todo({ text, id, category: myCategory }: ITodo) {
  const categories = useRecoilValue(categoriesState);
  const setTodos = useSetRecoilState(todosState);

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
    if (isEditing) {
      editTodo();
    } else {
      setIsEditing(true);
      setFocus("todoText");
    }
  };

  const handleEditTodo = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.relatedTarget?.id === "editBtn") return;
    editTodo();
  };

  const editTodo = handleSubmit(({ todoText }) => {
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
          <Button
            type="button"
            id="editBtn"
            onClick={setEditingMode}
            isEditing={isEditing}
          >
            {isEditing ? "완료" : "수정"}
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
            onBlur: handleEditTodo,
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
  column-gap: 2px;
`;

const Button = styled.button<{ isEditing?: boolean }>`
  padding: 0 4px;
  background: transparent;
  border: none;
  font-size: 1.2rem;
  font-weight: ${({ isEditing }) => isEditing && "bold"};
  color: ${({ isEditing }) => isEditing && "var(--primary)"};
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
