import { Fragment, useEffect, useState } from 'react';
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
  cells: string[];
};

type TimeTableProps = {
  timesFromDB?: number[];
  daysFromDB?: { date: string; day: string }[];
  isReadOnly?: boolean;
  selectedCells?: string[];
  selectedCounts?: { [key: string]: number };
  onSelectionChange?: (selectedCells: string[]) => void;
};

export default function TimeTable({
  timesFromDB = [],
  daysFromDB = [],
  isReadOnly = false,
  selectedCells = [],
  selectedCounts = {},
  onSelectionChange,
}: TimeTableProps) {
  const totalDays = 7;
  const timesForCells = timesFromDB.slice(0, -1);

  const [selectedStart, setSelectedStart] = useState<CellPosition | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<CellPosition | null>(null);
  const [selectedRanges, setSelectedRanges] = useState<Range[]>([]);

  // DB에서 팀원 시간 선택 데이터 받아오기
  useEffect(() => {
    if (isReadOnly && selectedCells) {
      const selectedRangesFromProps = selectedCells
        .map((cellKey) => {
          const [dayString, timeString, subString] = [
            cellKey.slice(0, 4),
            cellKey.slice(4, 6),
            cellKey.slice(6),
          ];

          const rowIndex = parseInt(dayString.slice(2)) - 1;
          const cellIndex = timesFromDB.indexOf(parseInt(timeString, 10));
          const subIndex = subString === '00' ? 0 : 1;

          if (rowIndex >= 0 && cellIndex >= 0) {
            return {
              start: { rowIndex, cellIndex, subIndex, key: cellKey },
              end: { rowIndex, cellIndex, subIndex, key: cellKey },
              cells: [cellKey],
            };
          }
          return null; // 값이 유효하지 않은 경우 null 반환
        })
        .filter(Boolean); // null 값을 필터링

      setSelectedRanges(selectedRangesFromProps as Range[]); // 필터링된 배열을 설정
    }
  }, [selectedCells, timesFromDB, isReadOnly]);

  // 팀원 중복 선택된 횟수에 따라 색상 변경
  const colorMap: { [key: number]: string } = {
    0: 'white',
    1: '#6773EF',
    2: '#4652D1',
    3: '#3D439E',
  };

  const getBackgroundColor = (
    key: string,
    selectedCounts: { [key: string]: number },
  ): string => {
    const count = selectedCounts[key] || 0;
    return colorMap[count] || colorMap[3]; // 최대값 3 이상은 동일 색상
  };

  // 시간선택에 따른 고유 키캆 부여
  const generateCellKey = (
    rowIndex: number,
    cellIndex: number,
    subIndex: number,
  ): string => {
    // DB에서 해당 날짜 및 시간 가져오기
    const dayString = daysFromDB[rowIndex]?.date.replace('/', ''); // 날짜 값에서 슬래시 제거
    const timeString = `${timesFromDB[cellIndex] < 10 ? '0' : ''}${
      timesFromDB[cellIndex]
    }`;

    // 분 값 생성
    const subString = subIndex === 0 ? '00' : '30';

    // 최종적으로 "날짜 + 시간 + 분" 형태의 문자열 생성
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
      // 최소 셀 인덱스와 최대 셀 인덱스를 계산
      const minCell = Math.min(startCell, endCell);
      const maxCell = Math.max(startCell, endCell);

      // 순차적 및 역순 선택을 위한 로직
      for (let i = minCell; i <= maxCell; i++) {
        let startSubIndex = i === startCell ? startSub : 0;
        let endSubIndex = i === endCell ? endSub : 1;

        // 역순 선택시 시작과 끝 분 인덱스 조정
        if (
          startCell > endCell ||
          (startCell === endCell && startSub > endSub)
        ) {
          startSubIndex = i === endCell ? endSub : 0;
          endSubIndex = i === startCell ? startSub : 1;
        }

        for (let j = startSubIndex; j <= endSubIndex; j++) {
          cells.push(generateCellKey(startRow, i, j));
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

    // 이미 선택된 범위가 클릭되면 해당 범위 삭제
    if (existingRange) {
      setSelectedRanges((prevRanges) =>
        prevRanges.filter((range) => range !== existingRange),
      );

      // 선택 취소된 셀들을 부모 컴포넌트로 전달
      if (onSelectionChange) {
        const remainingCells = selectedRanges
          .filter((range) => range !== existingRange)
          .flatMap((range) => range.cells);
        onSelectionChange(remainingCells);
      }
      return;
    }

    // 새로 범위를 선택하는 경우
    const newEndCell = { rowIndex, cellIndex, subIndex, key };

    // 같은 열(rowIndex)에서만 범위 설정
    if (selectedStart && selectedStart.rowIndex === rowIndex) {
      const rangeCells = generateRangeCells(selectedStart, newEndCell);

      const newRange: Range = {
        start: selectedStart,
        end: newEndCell,
        cells: rangeCells,
      };

      setSelectedRanges((prevRanges) => [...prevRanges, newRange]);
      setSelectedStart(null);
      setSelectedEnd(null);

      // 선택된 셀들을 부모 컴포넌트로 전달
      if (onSelectionChange) {
        const selectedCells = selectedRanges.flatMap((range) => range.cells);
        onSelectionChange([...selectedCells, ...rangeCells]);
      }
    } else {
      setSelectedStart({ rowIndex, cellIndex, subIndex, key });
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
                            const backgroundColor = getBackgroundColor(
                              key,
                              selectedCounts,
                            );
                            return (
                              <S.Cell
                                isSummary={isReadOnly} // summary 페이지 여부 전달
                                backgroundColor={backgroundColor} // 배경 색상 전달
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
