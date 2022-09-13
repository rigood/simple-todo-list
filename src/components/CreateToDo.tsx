import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { categoriesState, categoryState, todoState } from "../atoms";
import React from "react";

const CreateToDoContainer = styled.div`
  margin-bottom: 20px;
`;

interface IForm {
  todo: string;
}

function CreateToDo() {
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const setTodos = useSetRecoilState(todoState);

  const [category, setCategory] = useRecoilState(categoryState);
  const [categories, setCategories] = useRecoilState(categoriesState);

  const handleValid = ({ todo }: IForm) => {
    setTodos((oldTodos) => [{ text: todo, id: Date.now(), category: category }, ...oldTodos]);
    setValue("todo", "");
  };

  const handleOption = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  return (
    <CreateToDoContainer>
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("todo", {
            required: "Please write a to-do.",
          })}
          placeholder="Write a to-do."
        />
        <select value={category} onInput={handleOption}>
          {categories.map((category, idx) => (
            <option key={idx}>{category}</option>
          ))}
        </select>
      </form>
    </CreateToDoContainer>
  );
}

export default CreateToDo;
