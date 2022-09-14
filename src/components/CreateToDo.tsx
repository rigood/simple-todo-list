import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, todoState } from "../atoms";

const CreateToDoContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 5px 10px;
  border: none;
  border-radius: 10px;
  &:focus {
    outline: 3px solid teal;
  }
`;

interface IForm {
  todo: string;
}

function CreateToDo() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const category = useRecoilValue(categoryState);
  const setTodos = useSetRecoilState(todoState);

  const handleValid = ({ todo }: IForm) => {
    setTodos((oldTodos) => [{ text: todo, id: Date.now(), category: category }, ...oldTodos]);
    setValue("todo", "");
  };

  return (
    <CreateToDoContainer>
      <form onSubmit={handleSubmit(handleValid)}>
        <Input
          {...register("todo", {
            required: "Please write a To-do and press Enter",
          })}
          placeholder="Write a To-do and press Enter."
        />
      </form>
    </CreateToDoContainer>
  );
}

export default CreateToDo;
