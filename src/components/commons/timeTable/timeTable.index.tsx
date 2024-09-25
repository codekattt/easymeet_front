import { Fragment, useEffect, useState } from 'react';
import * as S from './timeTable.styles';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

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
  isExisting: boolean; // 기존 범위 여부
};

type TimeTableProps = {
  timesFromDB?: number[];
  daysFromDB?: { date: string; day: string }[];
  isReadOnly?: boolean;
  selectedCells?: string[];
  selectedCounts?: { [key: string]: number };
  selectedBy?: { [key: string]: string[] };
  onSelectionChange?: (selectedCells: string[]) => void;
};

export default function TimeTable({
  timesFromDB = [],
  daysFromDB = [],
  isReadOnly = false,
  selectedCells = [],
  selectedCounts = {},
  selectedBy = {},
  onSelectionChange,
}: TimeTableProps) {
  const totalDays = 7;
  const timesForCells = timesFromDB.slice(0, -1);

  const [selectedStart, setSelectedStart] = useState<CellPosition | null>(null);
  const [selectedRanges, setSelectedRanges] = useState<Range[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Function to generate the next cell position
  const getNextCell = (current: CellPosition): CellPosition | null => {
    const { rowIndex, cellIndex, subIndex } = current;
    let nextSubIndex = subIndex + 1;
    let nextCellIndex = cellIndex;
    let nextRowIndex = rowIndex;

    if (nextSubIndex > 1) {
      // subIndex can be 0 or 1
      nextSubIndex = 0;
      nextCellIndex += 1;
      if (nextCellIndex >= timesFromDB.length) {
        nextCellIndex = 0;
        nextRowIndex += 1;
        if (nextRowIndex >= daysFromDB.length) {
          return null; // No more cells
        }
      }
    }

    const nextKey = generateCellKey(nextRowIndex, nextCellIndex, nextSubIndex);
    return {
      rowIndex: nextRowIndex,
      cellIndex: nextCellIndex,
      subIndex: nextSubIndex,
      key: nextKey,
    };
  };

  // Function to generate cell key
  const generateCellKey = (
    rowIndex: number,
    cellIndex: number,
    subIndex: number,
  ): string => {
    // 해당 날짜 및 시간 가져오기
    const dayString = daysFromDB[rowIndex]?.date.replace(/\D/g, ''); // "0926"
    const timeString = `${timesFromDB[cellIndex] < 10 ? '0' : ''}${
      timesFromDB[cellIndex]
    }`; // "12"

    // 분 값 생성
    const subString = subIndex === 0 ? '00' : '30';

    // "MMDDHHmm" 형식의 키 생성
    return `${dayString}${timeString}${subString}`;
  };

  // DB에서 팀원 시간 선택 데이터 받아오기 (읽기 전용 및 수정 모드)
  useEffect(() => {
    if (selectedCells && selectedCells.length > 0 && !isInitialized) {
      // 1. Sort selectedCells in chronological order
      const sortedSelectedCells = [...selectedCells].sort((a, b) =>
        a.localeCompare(b),
      );

      // 2. Group consecutive cells into ranges
      const newRanges: Range[] = [];
      let currentRange: Range | null = null;

      sortedSelectedCells.forEach((cellKey) => {
        const [dayString, timeString, subString] = [
          cellKey.slice(0, 4), // "0926"
          cellKey.slice(4, 6), // "12"
          cellKey.slice(6), // "00"
        ];

        const rowIndex = daysFromDB.findIndex(
          (day) => day.date.replace(/\D/g, '') === dayString,
        );
        const cellIndex = timesFromDB.indexOf(parseInt(timeString, 10));
        const subIndex = subString === '00' ? 0 : 1;

        if (rowIndex < 0 || cellIndex < 0) {
          // Invalid cell, skip
          return;
        }

        const cellPosition: CellPosition = {
          rowIndex,
          cellIndex,
          subIndex,
          key: cellKey,
        };

        if (!currentRange) {
          // Start a new range
          currentRange = {
            start: cellPosition,
            end: cellPosition,
            cells: [cellKey],
            isExisting: true,
          };
        } else {
          // Check if the current cell is consecutive to the last cell in the current range
          const lastCell = currentRange.end;
          const expectedNext = getNextCell(lastCell);

          if (expectedNext && expectedNext.key === cellKey) {
            // Consecutive cell, extend the current range
            currentRange.end = cellPosition;
            currentRange.cells.push(cellKey);
          } else {
            // Not consecutive, push the current range and start a new one
            newRanges.push(currentRange);
            currentRange = {
              start: cellPosition,
              end: cellPosition,
              cells: [cellKey],
              isExisting: true,
            };
          }
        }
      });

      // Push the last range
      if (currentRange) {
        newRanges.push(currentRange);
      }

      setSelectedRanges(newRanges);
      console.log('Initialized selectedRanges:', newRanges); // 디버깅 로그
      setIsInitialized(true);
    }
  }, [selectedCells, timesFromDB, daysFromDB, isInitialized]);

  // 팀원 중복 선택된 횟수에 따라 색상 변경
  const colorMap: { [key: number]: string } = {
    0: 'white',
    1: '#6773EF',
    2: '#5A62E7',
    3: '#4A53D6',
    4: '#3D439E',
    5: '#3D439E',
  };

  const getBackgroundColor = (
    key: string,
    selectedCounts: { [key: string]: number },
  ): string => {
    const count = selectedCounts[key] || 0;
    return colorMap[count] || colorMap[5]; // 최대값 5 이상은 동일 색상
  };

  const getCellClassName = (
    key: string,
    selectedCounts: { [key: string]: number },
  ): string => {
    const count = selectedCounts[key] || 0;
    return count === 5 ? 'five-times-selected' : ''; // 5번 선택 시 클래스 추가
  };

  // 범위 내 모든 셀을 저장하는 함수
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

    // 이미 선택된 범위가 클릭되면 해당 범위 전체 삭제
    if (existingRange) {
      setSelectedRanges((prevRanges) => {
        const updatedRanges = prevRanges.filter(
          (range) => range !== existingRange,
        );
        console.log('Removed range:', existingRange); // 디버깅 로그
        console.log('Updated ranges:', updatedRanges); // 디버깅 로그
        if (onSelectionChange) {
          const remainingCells = updatedRanges.flatMap((range) => range.cells);
          onSelectionChange(remainingCells);
        }
        return updatedRanges;
      });
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
        isExisting: false, // 새로 선택한 범위는 isExisting=false
      };

      setSelectedRanges((prevRanges) => {
        const updatedRanges = [...prevRanges, newRange];
        console.log('Added new range:', newRange); // 디버깅 로그
        console.log('Updated ranges:', updatedRanges); // 디버깅 로그
        if (onSelectionChange) {
          const selectedCells = updatedRanges.flatMap((range) => range.cells);
          onSelectionChange(selectedCells);
        }
        return updatedRanges;
      });

      setSelectedStart(null);
    } else {
      setSelectedStart({ rowIndex, cellIndex, subIndex, key });
    }
  };

  // isSelected 함수 수정: 모든 범위에 대해 선택 여부를 확인
  const isSelected = (key: string): boolean => {
    return selectedRanges.some((range) => range.cells.includes(key));
  };

  // isStart 함수 수정: isExisting=false인 범위의 시작 셀인지 확인
  const isStart = (key: string): boolean => {
    return selectedRanges.some(
      (range) => !range.isExisting && range.start.key === key,
    );
  };

  // isEnd 함수 수정: isExisting=false인 범위의 끝 셀인지 확인
  const isEnd = (key: string): boolean => {
    return selectedRanges.some(
      (range) => !range.isExisting && range.end.key === key,
    );
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
                            const selectedByText = selectedBy[key]?.join(', '); // 선택자 정보, '선택자 없음' 생략

                            // 조건부로 Tippy 적용
                            return isReadOnly ? (
                              <Tippy
                                content={selectedByText}
                                key={key}
                                theme="custom"
                                maxWidth="200px"
                              >
                                <S.Cell
                                  isSummary={isReadOnly}
                                  backgroundColor={backgroundColor}
                                  className={getCellClassName(
                                    key,
                                    selectedCounts,
                                  )}
                                  isSelected={isSelected(key)}
                                  isStart={!isReadOnly && isStart(key)} // 조건부 적용
                                  isEnd={!isReadOnly && isEnd(key)} // 조건부 적용
                                  onClick={() =>
                                    !isReadOnly &&
                                    handleCellClick(
                                      rowIndex,
                                      cellIndex,
                                      subIndex,
                                    )
                                  }
                                />
                              </Tippy>
                            ) : (
                              <S.Cell
                                key={key}
                                isSummary={isReadOnly}
                                backgroundColor={backgroundColor}
                                className={getCellClassName(
                                  key,
                                  selectedCounts,
                                )}
                                isSelected={isSelected(key)}
                                isStart={!isReadOnly && isStart(key)} // 조건부 적용
                                isEnd={!isReadOnly && isEnd(key)} // 조건부 적용
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
