import styled from '@emotion/styled';

// export const hours = Array.from({ length: 16 }, (_, i) => `${i + 9}`);
// export const dates = ['월', '화', '수', '목', '금', '토', '일'];

// export const Wrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// export const TimeTableGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(8, 1fr); /* 1 column for time + 7 days */
//   grid-auto-rows: 40px;
//   width: 100%;
//   max-width: 1200px;
//   border: 1px solid #ccc;
//   user-select: none;
// `;

// export const HeaderCell = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: #f7f7f7;
//   border: 1px solid #ccc;
//   font-weight: bold;
//   background-color: orange;
// `;

// export const TimeCell = styled.div<{ selected: boolean }>`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border: 1px solid #ccc;
//   cursor: pointer;
//   background-color: ${({ selected }) => (selected ? '#007bff' : 'white')};
//   color: ${({ selected }) => (selected ? 'white' : 'black')};

//   &:hover {
//     background-color: ${({ selected }) => (selected ? '#0056b3' : '#f0f0f0')};
//   }
// `;

// 스타일 정의

export const TimeTableWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 1.1rem;
  font-size: 14px;
`;

export const TimeTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const TimeColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  margin-top: 3.5rem;
`;

export const DateRow = styled.div`
  display: flex;
  gap: 1px;
  padding-left: 1px;
`;

export const DateCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.13rem;
  align-items: center;
  width: 4.3rem;
`;

export const DaySpan = styled.span`
  display: flex;
  align-items: center;
  word-break: keep-all;
  color: rgb(85, 85, 85);
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1.6rem;
`;

export const WeekSpan = styled.span`
  display: flex;
  align-items: center;
  word-break: keep-all;
  color: rgb(164, 164, 164);
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1.6rem;
`;

export const TimeSelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid gray;
  border-left: 1px solid gray;
`;

export const TimeCellWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid gray;
`;

export const TimeCell = styled.div<{ selected: boolean }>`
  width: 4.3rem;
  height: 2.2rem;
  display: flex;
  justify-content: center;
  cursor: pointer;
  border-top: 1px solid rgb(63, 63, 63);
  background: transparent;
`;

export const InnerTimeCell = styled.div`
  display: flex;
  position: relative;
  top: 6px;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
