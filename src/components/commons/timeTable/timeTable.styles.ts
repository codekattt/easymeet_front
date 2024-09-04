import styled from '@emotion/styled';

export const hours = Array.from({ length: 16 }, (_, i) => `${i + 9}`);
export const dates = ['월', '화', '수', '목', '금', '토', '일'];

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TimeTableGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr); /* 1 column for time + 7 days */
  grid-auto-rows: 40px;
  width: 100%;
  max-width: 1200px;
  border: 1px solid #ccc;
  user-select: none;
`;

export const HeaderCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
  border: 1px solid #ccc;
  font-weight: bold;
  background-color: orange;
`;

export const TimeCell = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? '#007bff' : 'white')};
  color: ${({ selected }) => (selected ? 'white' : 'black')};

  &:hover {
    background-color: ${({ selected }) => (selected ? '#0056b3' : '#f0f0f0')};
  }
`;
