import styled from "styled-components";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  currentCategoryState,
  filteredTodosState,
  isSortedByLatestState,
} from "./recoil";
import CategoryContainer from "./components/CategoryContainer";
import TodoCreator from "./components/TodoCreator";
import Todo from "./components/Todo";

function App() {
  const currentCategory = useRecoilValue(currentCategoryState);
  const filteredTodos = useRecoilValue(filteredTodosState);
  const [isSortedByLatest, setIsSortedByLatest] = useRecoilState(
    isSortedByLatestState
  );

  return (
    <>
      <Wrapper>
        <Title>📋 Simple Todo List</Title>
        <CategoryContainer />
        <TodoCreator />
        <TodoList>
          {filteredTodos.length === 0 ? (
            <Message>
              {currentCategory} 카테고리에 등록된 할일이 없습니다.
            </Message>
          ) : (
            <>
              <Row>
                <Count>총 {filteredTodos.length}개의 할일</Count>
                <SortButton
                  type="button"
                  onClick={() => setIsSortedByLatest((prev) => !prev)}
                >
                  ↓ {isSortedByLatest ? "최신순" : "과거순"}
                </SortButton>
              </Row>
              {filteredTodos.map((todo) => (
                <Todo key={todo.id} {...todo} />
              ))}
            </>
          )}
        </TodoList>
      </Wrapper>
    </>
  );
}

export default App;

const Wrapper = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
`;

const TodoList = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

const Message = styled.div`
  margin: 20px 0;
  text-align: center;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: -2px;
`;

const Count = styled.div``;

const SortButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.2rem;
`;
