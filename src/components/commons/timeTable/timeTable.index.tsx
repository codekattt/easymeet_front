import { Fragment, useState } from 'react';
import * as S from './timeTable.styles';

type CellPosition = {
  rowIndex: number;
  cellIndex: number;
  subIndex: number;
  key: string;
};

type Range = {
  start: CellPosition;
  end: CellPosition;
  cells: string[]; // 범위 내의 셀 키값 저장
};

type TimeTableProps = {
  timesFromDB?: number[];
  daysFromDB?: { date: string; day: string }[];
  isReadOnly?: boolean;
  onSelectionChange?: (isSelected: boolean) => void; // 선택 상태 변경 시 호출될 콜백
};

export default function TimeTable({
  timesFromDB = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
  daysFromDB = [
    { date: '10/1', day: '월' },
    { date: '10/2', day: '화' },
    { date: '10/3', day: '수' },
    { date: '10/4', day: '목' },
  ],
  isReadOnly = false,
  onSelectionChange,
}: TimeTableProps) {
  const totalDays = 7;
  const timesForCells = timesFromDB.slice(0, -1);

  const [selectedStart, setSelectedStart] = useState<CellPosition | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<CellPosition | null>(null);
  const [selectedRanges, setSelectedRanges] = useState<Range[]>([]); // 범위 객체 저장

  const generateCellKey = (
    rowIndex: number,
    cellIndex: number,
    subIndex: number,
  ): string => {
    const dayString = `10${rowIndex + 1}`;
    const timeString = `${timesFromDB[cellIndex] < 10 ? '0' : ''}${
      timesFromDB[cellIndex]
    }`;
    const subString = subIndex === 0 ? '00' : '30';
    return `${dayString}${timeString}${subString}`;
  };

  // 범위에서 선택된 모든 셀을 저장하는 함수
  const generateRangeCells = (
    start: CellPosition,
    end: CellPosition,
  ): string[] => {
    const cells: string[] = [];
    const {
      rowIndex: startRow,
      cellIndex: startCell,
      subIndex: startSub,
    } = start;
    const { rowIndex: endRow, cellIndex: endCell, subIndex: endSub } = end;

    if (startRow === endRow) {
      // 순차적 선택
      if (
        startCell < endCell ||
        (startCell === endCell && startSub <= endSub)
      ) {
        for (let i = startCell; i <= endCell; i++) {
          if (i === startCell) {
            for (let j = startSub; j <= 1; j++) {
              cells.push(generateCellKey(startRow, i, j));
            }
          } else if (i === endCell) {
            for (let j = 0; j <= endSub; j++) {
              cells.push(generateCellKey(startRow, i, j));
            }
          } else {
            cells.push(generateCellKey(startRow, i, 0));
            cells.push(generateCellKey(startRow, i, 1));
          }
        }
      } else {
        // 역순 선택
        for (let i = startCell; i >= endCell; i--) {
          if (i === startCell) {
            for (let j = startSub; j >= 0; j--) {
              cells.push(generateCellKey(startRow, i, j));
            }
          } else if (i === endCell) {
            for (let j = 1; j >= endSub; j--) {
              cells.push(generateCellKey(startRow, i, j));
            }
          } else {
            cells.push(generateCellKey(startRow, i, 0));
            cells.push(generateCellKey(startRow, i, 1));
          }
        }
      }
    }
    return cells;
  };

  // 클릭된 셀이 선택된 범위에 있는지 확인하는 함수
  const findRangeContainingCell = (key: string): Range | null => {
    for (const range of selectedRanges) {
      if (range.cells.includes(key)) {
        return range;
      }
    }
    return null;
  };

  // 셀 클릭 핸들러
  const handleCellClick = (
    rowIndex: number,
    cellIndex: number,
    subIndex: number,
  ) => {
    if (isReadOnly) return;

    const key = generateCellKey(rowIndex, cellIndex, subIndex);

    const existingRange = findRangeContainingCell(key);

    if (existingRange) {
      // 선택된 범위 내의 셀이 클릭되면 해당 범위 전체 해제
      setSelectedRanges((prevRanges) =>
        prevRanges.filter((range) => range !== existingRange),
      );
      onSelectionChange && onSelectionChange(selectedRanges.length > 1);
      return;
    }

    if (!selectedStart) {
      setSelectedStart({ rowIndex, cellIndex, subIndex, key });
      return;
    }

    const newEndCell = { rowIndex, cellIndex, subIndex, key };

    // 같은 열(rowIndex)에서만 범위 설정
    if (selectedStart.rowIndex === rowIndex) {
      const rangeCells = generateRangeCells(selectedStart, newEndCell);

      const newRange: Range = {
        start: selectedStart,
        end: newEndCell,
        cells: rangeCells,
      };

      setSelectedRanges((prevRanges) => [...prevRanges, newRange]);
      setSelectedStart(null); // 범위 선택 후 초기화
      setSelectedEnd(null); // 끝 셀 초기화

      onSelectionChange && onSelectionChange(true);
    } else {
      // 다른 열(rowIndex) 선택 시: 새로 선택 시작
      setSelectedStart(null);
    }
  };

  const isSelected = (key: string): boolean => {
    return selectedRanges.some((range) => range.cells.includes(key));
  };

  const isStart = (key: string): boolean => {
    return selectedStart?.key === key || selectedEnd?.key === key;
  };

  const isEnd = (key: string): boolean => {
    return selectedEnd?.key === key;
  };

  return (
    <>
      <S.Wrapper>
        <S.TimeWrapper>
          {timesFromDB.map((time, index) => (
            <Fragment key={index}>
              <span>{time}</span>
              <span></span>
            </Fragment>
          ))}
        </S.TimeWrapper>

        <S.WeekWrapper>
          <S.DayWrapper>
            {Array(totalDays)
              .fill(0)
              .map((_, rowIndex) => {
                const dayData = daysFromDB[rowIndex];
                return (
                  <S.Day key={rowIndex}>
                    {dayData ? (
                      <>
                        <span>{dayData.date}</span>
                        <span>{dayData.day}</span>
                      </>
                    ) : (
                      <span style={{ visibility: 'hidden' }}>빈 공간</span>
                    )}
                  </S.Day>
                );
              })}
          </S.DayWrapper>

          <S.CellWrapper>
            {Array(totalDays)
              .fill(0)
              .map((_, rowIndex) => (
                <div key={rowIndex} style={{ width: '100%' }}>
                  {rowIndex < daysFromDB.length ? (
                    timesForCells.map((_, cellIndex) => (
                      <Fragment key={cellIndex}>
                        {Array(2)
                          .fill(0)
                          .map((_, subIndex) => {
                            const key = generateCellKey(
                              rowIndex,
                              cellIndex,
                              subIndex,
                            );
                            return (
                              <S.Cell
                                key={key}
                                isSelected={isSelected(key)}
                                isStart={isStart(key)}
                                isEnd={isEnd(key)}
                                onClick={() =>
                                  !isReadOnly &&
                                  handleCellClick(rowIndex, cellIndex, subIndex)
                                }
                              />
                            );
                          })}
                      </Fragment>
                    ))
                  ) : (
                    <div style={{ visibility: 'hidden' }}>빈 셀</div>
                  )}
                </div>
              ))}
          </S.CellWrapper>
        </S.WeekWrapper>
      </S.Wrapper>
    </>
  );
}
