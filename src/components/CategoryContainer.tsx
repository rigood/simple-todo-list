import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { categoriesAtom, currentCategoryAtom } from "../atoms";

const CategoryContainer = () => {
  const [categories, setCategories] = useRecoilState(categoriesAtom);
  const setCurrentCategory = useSetRecoilState(currentCategoryAtom);

  const onCategorySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentCategory(e.target.value);
  };

  const addCategory = () => {
    const newCategory = prompt("새로운 카테고리를 입력해주세요.");

    if (!newCategory) return;

    if (newCategory.length > 10) {
      alert("10자 이내로 입력해주세요.");
      addCategory();
      return;
    }

    if (categories.includes(newCategory)) {
      return alert("이미 존재하는 카테고리입니다.\n다른 이름을 입력해주세요.");
    }

    setCategories((prev) => [...prev, newCategory]);
    alert(`${newCategory} 카테고리가 추가되었습니다.`);
  };

  return (
    <Wrapper>
      <Row>
        <Label>현재 카테고리</Label>
        <Select onChange={onCategorySelect}>
          {categories.map((category) => (
            <Option key={category} value={category}>
              {category}
            </Option>
          ))}
        </Select>
      </Row>
      <Row>
        <Label>카테고리 추가</Label>
        <Button type="button" onClick={addCategory}>
          ➕
        </Button>
      </Row>
    </Wrapper>
  );
};

export default CategoryContainer;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  &:first-child {
    flex: 1;
  }
`;

const Label = styled.label`
  font-size: 1.2rem;
`;

const Select = styled.select`
  flex: 1;
`;

const Option = styled.option``;

const Button = styled.button``;
