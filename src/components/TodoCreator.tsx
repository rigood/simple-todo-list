import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentCategoryAtom, todosAtom } from "../atoms";

interface IForm {
  todoText: string;
}

function TodoCreator() {
  const currentCategory = useRecoilValue(currentCategoryAtom);
  const setTodos = useSetRecoilState(todosAtom);

  const { register, handleSubmit, setValue } = useForm<IForm>();

  const createTodo = ({ todoText }: IForm) => {
    if (todoText === "") return;

    const newTodo = {
      id: Date.now(),
      text: todoText,
      category: currentCategory,
    };

    setTodos((prev) => [newTodo, ...prev]);
    setValue("todoText", "");
  };

  return (
    <Form onSubmit={handleSubmit(createTodo)}>
      <Input
        {...register("todoText", {
          required: true,
        })}
        placeholder="할일을 입력해주세요."
      />
    </Form>
  );
}

export default TodoCreator;

const Form = styled.form`
  margin-bottom: 30px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: none;
  border-radius: var(--border-radius);
  outline: none;

  &:focus {
    outline: 3px solid var(--primary);
    &::placeholder {
      opacity: 0.5;
    }
  }
`;
