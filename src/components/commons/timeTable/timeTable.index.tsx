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
import * as S from './timeTable.styles';

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
    <S.TimeTableWrapper>
      {/* 시간 열 */}
      <S.TimeColumn>
        {hours.map((hour) => (
          <div key={hour}>{hour}</div>
        ))}
      </S.TimeColumn>

      <S.TimeTableContainer>
        {/* 요일 영역 */}
        <S.DateRow>
          {dates.map((date) => (
            <S.DateCell key={date.day}>
              <S.DaySpan>{date.day}</S.DaySpan>
              <S.WeekSpan>{date.week}</S.WeekSpan>
            </S.DateCell>
          ))}
        </S.DateRow>

        {/* 시간 선택 셀 */}
        <S.TimeSelectWrapper>
          <S.TimeCellWrapper>
            <S.TimeCell selected={true}>
              <S.InnerTimeCell></S.InnerTimeCell>
            </S.TimeCell>
            <S.TimeCell selected={true}>
              <S.InnerTimeCell></S.InnerTimeCell>
            </S.TimeCell>
            <S.TimeCell selected={true}>
              <S.InnerTimeCell></S.InnerTimeCell>
            </S.TimeCell>
            <S.TimeCell selected={true}>
              <S.InnerTimeCell></S.InnerTimeCell>
            </S.TimeCell>
            <S.TimeCell selected={true}>
              <S.InnerTimeCell></S.InnerTimeCell>
            </S.TimeCell>
            <S.TimeCell selected={true}>
              <S.InnerTimeCell></S.InnerTimeCell>
            </S.TimeCell>
          </S.TimeCellWrapper>
        </S.TimeSelectWrapper>
      </S.TimeTableContainer>
    </S.TimeTableWrapper>
  );
}
