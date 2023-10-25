import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "simple-todo-list",
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

export const categoriesState = atom<string[]>({
  key: "categories",
  default: Object.values(DefaultCategories),
  effects_UNSTABLE: [persistAtom],
});

export const isSortedByLatestState = atom<boolean>({
  key: "isSortedByLatest",
  default: true,
});

export const todosState = atom<ITodo[]>({
  key: "todos",
  default: [
    {
      id: 1698154832036,
      text: "프로젝트 완성",
      category: "Todo",
    },
    {
      id: 1698154078896,
      text: "운동하기",
      category: "Todo",
    },
  ],
  effects_UNSTABLE: [persistAtom],
});

export const currentCategoryState = atom<CategoryType>({
  key: "currentCategory",
  default: DefaultCategories.Todo,
  effects_UNSTABLE: [persistAtom],
});

export const filteredTodosState = selector({
  key: "filteredTodos",
  get: ({ get }) => {
    const todos = get(todosState);
    const currentCategory = get(currentCategoryState);
    const isSortedByLatest = get(isSortedByLatestState);

    const todosByCategory = todos.filter(
      (todo) => todo.category === currentCategory
    );

    return todosByCategory.sort((a, b) =>
      isSortedByLatest ? b.id - a.id : a.id - b.id
    );
  },
});
