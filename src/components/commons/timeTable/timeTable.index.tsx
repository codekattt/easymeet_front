// import { useState } from 'react';
// import * as S from './timeTable.styles';

// export default function TimeTable() {
//   const [selectedTimes, setSelectedTimes] = useState<{
//     [key: string]: number[];
//   }>({});
//   const [selectionRange, setSelectionRange] = useState<{
//     date: string;
//     start: number | null;
//     end: number | null;
//   }>({ date: '', start: null, end: null });

//   const handleTimeClick = (date: string, hourIndex: number) => {
//     const isAlreadySelected = selectedTimes[date]?.includes(hourIndex);

//     if (selectionRange.start === null) {
//       if (isAlreadySelected) {
//         // 이미 선택된 블록을 클릭하면 선택 취소
//         setSelectedTimes((prevSelectedTimes) => ({
//           ...prevSelectedTimes,
//           [date]: prevSelectedTimes[date].filter((time) => time !== hourIndex),
//         }));
//       } else {
//         // 시작 지점 선택
//         setSelectionRange({ date, start: hourIndex, end: null });
//       }
//     } else if (
//       selectionRange.date === date &&
//       selectionRange.start !== null &&
//       selectionRange.end === null
//     ) {
//       // 동일한 날짜에서 끝 지점 선택
//       const start = selectionRange.start;
//       const end = hourIndex;
//       const range = getRange(start, end);

//       setSelectedTimes((prevSelectedTimes) => ({
//         ...prevSelectedTimes,
//         [date]: Array.from(
//           new Set([...(prevSelectedTimes[date] || []), ...range]),
//         ),
//       }));

//       // 선택 후 초기화
//       setSelectionRange({ date: '', start: null, end: null });
//     } else {
//       // 선택 초기화
//       setSelectionRange({ date: '', start: null, end: null });
//     }
//   };

//   const getRange = (start: number, end: number): number[] => {
//     const min = Math.min(start, end);
//     const max = Math.max(start, end);
//     const range = [];
//     for (let i = min; i <= max; i++) {
//       range.push(i);
//     }
//     return range;
//   };

//   return (
//     <S.Wrapper>
//       <S.TimeTableGrid>
//         <S.HeaderCell></S.HeaderCell>
//         {S.dates.map((date, index) => (
//           <S.HeaderCell key={index}>{date}</S.HeaderCell>
//         ))}
//         {S.hours.map((hour, rowIndex) => (
//           <>
//             <S.HeaderCell key={rowIndex}>{hour}</S.HeaderCell>
//             {S.dates.map((date, colIndex) => (
//               <S.TimeCell
//                 key={`${date}-${rowIndex}`}
//                 selected={
//                   selectedTimes[date]?.includes(rowIndex) ||
//                   (selectionRange.date === date &&
//                     selectionRange.start === rowIndex)
//                 }
//                 onClick={() => handleTimeClick(date, rowIndex)}
//               />
//             ))}
//           </>
//         ))}
//       </S.TimeTableGrid>
//     </S.Wrapper>
//   );
// }

import React, { useState } from 'react';
import styled from '@emotion/styled';

// 시간과 날짜 데이터
const hours = Array.from({ length: 16 }, (_, i) => i + 9); // 9시부터 24시까지
const dates = [
  { day: '9/11', week: '수' },
  { day: '9/12', week: '목' },
  { day: '9/13', week: '금' },
  { day: '9/14', week: '토' },
  { day: '9/15', week: '일' },
  { day: '9/16', week: '월' },
  { day: '9/17', week: '화' },
];

// 스타일 정의
const TimeTableContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TimeColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 1.2rem;
  margin-top: 4rem;
  padding-right: 1rem;
  font-size: 0.8rem;
  color: rgb(85, 85, 85);
`;

const DateRow = styled.div`
  display: flex;
  gap: 1px;
  padding-left: 1px;
  margin-bottom: 1rem;
`;

const DateCell = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.13rem;
  width: 2.4rem;
`;

const DaySpan = styled.span`
  display: flex;
  align-items: center;
  word-break: keep-all;
  color: rgb(85, 85, 85);
  font-weight: 600;
  font-size: 0.7rem;
  line-height: 1.6rem;
`;

const WeekSpan = styled.span`
  display: flex;
  align-items: center;
  word-break: keep-all;
  color: rgb(58, 50, 218);
  font-weight: 500;
  font-size: 1.1rem;
  line-height: 1.4rem;
`;

const TimeSelectionGrid = styled.div`
  display: flex;
  flex-direction: column;
`;

const TimeCell = styled.div<{ selected: boolean }>`
  width: 2.4rem;
  height: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid rgb(63, 63, 63);
  background: ${({ selected }) => (selected ? '#007bff' : 'white')};
  color: ${({ selected }) => (selected ? 'white' : 'black')};
  transition: background 0.2s ease;

  &:hover {
    background-color: ${({ selected }) => (selected ? '#0056b3' : '#f0f0f0')};
  }
`;

const TimeTableWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

// 타임테이블 컴포넌트
export default function TimeTable() {
  const [selectedTimes, setSelectedTimes] = useState<{
    [key: string]: number[];
  }>({});

  const handleTimeClick = (date: string, hourIndex: number) => {
    setSelectedTimes((prevSelectedTimes) => {
      const selectedHours = prevSelectedTimes[date] || [];
      const isAlreadySelected = selectedHours.includes(hourIndex);

      if (isAlreadySelected) {
        // 이미 선택된 시간 취소
        return {
          ...prevSelectedTimes,
          [date]: selectedHours.filter((hour) => hour !== hourIndex),
        };
      } else {
        // 시간 선택 추가
        return {
          ...prevSelectedTimes,
          [date]: [...selectedHours, hourIndex],
        };
      }
    });
  };

  return (
    <TimeTableWrapper>
      {/* 시간 열 */}
      <TimeColumn>
        {hours.map((hour) => (
          <div key={hour}>{hour}:00</div>
        ))}
      </TimeColumn>

      <TimeTableContainer>
        {/* 요일 영역 */}
        <DateRow>
          {dates.map((date) => (
            <DateCell key={date.day}>
              <DaySpan>{date.day}</DaySpan>
              <WeekSpan>{date.week}</WeekSpan>
            </DateCell>
          ))}
        </DateRow>

        {/* 시간 선택 셀 */}
        <TimeSelectionGrid>
          <TimeCell selected={true}>1</TimeCell>
          <TimeCell selected={true}>2</TimeCell>
          <TimeCell selected={true}>3</TimeCell>
        </TimeSelectionGrid>
      </TimeTableContainer>
    </TimeTableWrapper>
  );
}
