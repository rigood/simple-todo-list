import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "react-todolist",
});

export enum DefaultCategories {
  Todo = "Todo",
  Doing = "Doing",
  Done = "Done",
}

export type CategoryType = DefaultCategories | string;

export interface ITodo {
  id: number;
  text: string;
  category: CategoryType;
}

export const categoriesAtom = atom<string[]>({
  key: "categories",
  default: Object.values(DefaultCategories),
  effects_UNSTABLE: [persistAtom],
});

export const todosAtom = atom<ITodo[]>({
  key: "todos",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const currentCategoryAtom = atom<CategoryType>({
  key: "currentCategory",
  default: DefaultCategories.Todo,
  effects_UNSTABLE: [persistAtom],
});

export const todoSelector = selector({
  key: "todoSelector",
  get: ({ get }) => {
    const todos = get(todosAtom);
    const currentCategory = get(currentCategoryAtom);

    return todos.filter((todo) => todo.category === currentCategory);
  },
});
