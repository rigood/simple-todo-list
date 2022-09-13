import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, categoryState, todoState } from "../atoms";

interface IForm {
  todo: string;
}

function CreateToDo() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const todos = useRecoilValue(todoState);
  const setTodos = useSetRecoilState(todoState);
  const category = useRecoilValue(categoryState);
  const handleValid = ({ todo }: IForm) => {
    setTodos((oldTodos) => [{ text: todo, id: Date.now(), category: category }, ...oldTodos]);
    setValue("todo", "");
  };
  console.log(todos);
  return (
    <div>
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("todo", {
            required: "Please write a to-do.",
          })}
          placeholder="Write a to-do."
        />
      </form>
    </div>
  );
}

export default CreateToDo;
