import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "react-todolist",
});

export interface ITodo {
  text: string;
  id: number;
  category: string;
  // 카테고리를 제한하고 싶을 때는
  // category: "TO_DO", "DOING", "DONE";
}

export let defaultCategories: string[] = ["TO-DO", "DOING", "DONE"];

export const categoryState = atom<string>({
  key: "category",
  default: defaultCategories[0],
});

export const categoriesState = atom<string[]>({
  key: "categories",
  default: defaultCategories,
  effects_UNSTABLE: [persistAtom],
});

export const todoState = atom<ITodo[]>({
  key: "todo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const todoSelector = selector({
  key: "todoSelector",
  get: ({ get }) => {
    const todos = get(todoState);
    const category = get(categoryState);
    return todos.filter((todo) => todo.category === category);
  },
});
