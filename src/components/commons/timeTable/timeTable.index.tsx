import { useState } from 'react';
import * as S from './timeTable.styles';

export default function TimeTable() {
  const [selectedTimes, setSelectedTimes] = useState<{
    [key: string]: number[];
  }>({});
  const [selectionRange, setSelectionRange] = useState<{
    date: string;
    start: number | null;
    end: number | null;
  }>({ date: '', start: null, end: null });

  const handleTimeClick = (date: string, hourIndex: number) => {
    const isAlreadySelected = selectedTimes[date]?.includes(hourIndex);

    if (selectionRange.start === null) {
      if (isAlreadySelected) {
        // 이미 선택된 블록을 클릭하면 선택 취소
        setSelectedTimes((prevSelectedTimes) => ({
          ...prevSelectedTimes,
          [date]: prevSelectedTimes[date].filter((time) => time !== hourIndex),
        }));
      } else {
        // 시작 지점 선택
        setSelectionRange({ date, start: hourIndex, end: null });
      }
    } else if (
      selectionRange.date === date &&
      selectionRange.start !== null &&
      selectionRange.end === null
    ) {
      // 동일한 날짜에서 끝 지점 선택
      const start = selectionRange.start;
      const end = hourIndex;
      const range = getRange(start, end);

      setSelectedTimes((prevSelectedTimes) => ({
        ...prevSelectedTimes,
        [date]: Array.from(
          new Set([...(prevSelectedTimes[date] || []), ...range]),
        ),
      }));

      // 선택 후 초기화
      setSelectionRange({ date: '', start: null, end: null });
    } else {
      // 선택 초기화
      setSelectionRange({ date: '', start: null, end: null });
    }
  };

  const getRange = (start: number, end: number): number[] => {
    const min = Math.min(start, end);
    const max = Math.max(start, end);
    const range = [];
    for (let i = min; i <= max; i++) {
      range.push(i);
    }
    return range;
  };

  return (
    <S.Wrapper>
      <S.TimeTableGrid>
        <S.HeaderCell></S.HeaderCell>
        {S.dates.map((date, index) => (
          <S.HeaderCell key={index}>{date}</S.HeaderCell>
        ))}
        {S.hours.map((hour, rowIndex) => (
          <>
            <S.HeaderCell key={rowIndex}>{hour}</S.HeaderCell>
            {S.dates.map((date, colIndex) => (
              <S.TimeCell
                key={`${date}-${rowIndex}`}
                selected={
                  selectedTimes[date]?.includes(rowIndex) ||
                  (selectionRange.date === date &&
                    selectionRange.start === rowIndex)
                }
                onClick={() => handleTimeClick(date, rowIndex)}
              />
            ))}
          </>
        ))}
      </S.TimeTableGrid>
    </S.Wrapper>
  );
}
