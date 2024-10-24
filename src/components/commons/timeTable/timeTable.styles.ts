import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const TimeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 자식 요소 사이의 간격을 동일하게 만듦 */
  align-items: center;
  font-size: 14px;
  color: rgba(74, 144, 226, 1);
  margin-right: 10px;
  margin-bottom: -24px; /* 끝 지점에서 약간의 여백을 줌 */
  padding-top: 41px; /* 시작점에서 약간의 여백을 줌 */

  @media (max-width: 280px) {
    font-size: 11px;
  }
`;

export const WeekWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const DayWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 14px;
`;

export const Day = styled.div`
  flex: 1;
  text-align: center;
  display: flex;
  flex-direction: column;

  /* 첫 번째 span (날짜) */
  span:first-of-type {
    font-size: 12px;
    color: rgba(74, 144, 226, 1);
    margin-bottom: 2px;

    @media (max-width: 380px) {
      font-size: 8px;
    }
  }

  /* 두 번째 span (요일) */
  span:last-of-type {
    font-size: 14px;

    @media (max-width: 280px) {
      font-size: 11px;
    }
  }
`;

export const CellWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid rgba(74, 144, 226, 1);
  border-radius: 1px;
  background-color: ${({ theme }) => theme.colors.subLine};
`;

export const Cell = styled.div<{
  isSelected: boolean;
  isStart: boolean;
  isEnd: boolean;
  isSummary: boolean;
  backgroundColor: string;
}>`
  border-right: 1px solid rgba(74, 144, 226, 1);
  border-bottom: 1px solid rgba(74, 144, 226, 1);
  flex: 1;
  width: 100%;
  min-height: 1.6rem;
  text-align: center;
  background-color: ${({ isSelected, backgroundColor, isSummary, theme }) =>
    isSummary ? backgroundColor : isSelected ? theme.colors.point1 : 'white'};

  /* 30분 구분선 */
  &:nth-of-type(odd) {
    border-bottom: 1px dashed rgba(74, 144, 226, 1);
  }

  /* border-bottom 안겹치도록 */
  &:last-of-type {
    border-bottom: none;
  }

  /* 시작과 끝이 모두 선택된 경우 border 제거 */
  ${({ isStart, isEnd }) =>
    isStart &&
    isEnd &&
    `
      border: none;
    `}

  /* 시작 셀과 끝 셀 스타일 적용, 항상 우선적용 */
  ${({ isStart, isEnd, theme }) =>
    (isStart || isEnd) &&
    !(isStart && isEnd) &&
    `
      border: 2px solid ${theme.colors.point3} !important;
    `}

  /* 5번 중복 선택된 셀에 노란색 테두리 */
  &.five-times-selected {
    border: 2px solid yellow;
  }

  /* hover 스타일 */
  &:hover {
    border: 2px solid ${({ theme }) => theme.colors.point3};
  }

  transition: background-color 0.1s, border 0.1s;
`;
