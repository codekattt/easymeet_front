import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const TimeWrapper = styled.div`
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 자식 요소 사이의 간격을 동일하게 만듦 */
  align-items: center;
  padding-top: 41px; /* 시작점에서 약간의 여백을 줌 */
  margin-bottom: -24px; /* 끝 지점에서 약간의 여백을 줌 */
  font-size: 14px;
  color: ${({ theme }) => theme.colors.point2};
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
    color: ${({ theme }) => theme.colors.point2};
    margin-bottom: 2px;
  }

  /* 두 번째 span (요일) */
  span:last-of-type {
    font-size: 14px;
  }
`;

export const CellWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid ${({ theme }) => theme.colors.point2};
  border-radius: 1px;
  background-color: ${({ theme }) => theme.colors.subLine};
`;

export const Cell = styled.div<{
  isSelected: boolean;
  isStart: boolean;
  isEnd: boolean;
  isSummary: boolean; // summary 페이지 여부 추가
  backgroundColor: string; // 배경 색상 추가
}>`
  border-right: 1px solid ${({ theme }) => theme.colors.point2};
  border-bottom: 1px solid ${({ theme }) => theme.colors.point2};
  flex: 1;
  width: 100%;
  min-height: 1.6rem;
  text-align: center;
  background-color: ${({ isSelected, backgroundColor, isSummary, theme }) =>
    isSummary ? backgroundColor : isSelected ? theme.colors.point1 : 'white'};

  /* 시작 셀과 끝 셀 스타일 적용 */
  ${({ isStart, theme }) =>
    isStart &&
    `
    border: 2px solid ${theme.colors.point3};
  `}

  ${({ isEnd, theme }) =>
    isEnd &&
    `
    border: 2px solid ${theme.colors.point3};
  `}

  /* 30분 구분선 */
  &:nth-child(odd) {
    border-bottom: 1px dashed ${({ theme }) => theme.colors.point2};
  }

  /* border-bottom 안겹치도록 */
  &:last-child {
    border-bottom: none;
  }

  &:hover {
    border: 2px solid ${({ theme }) => theme.colors.point3};
  }

  transition: background-color 0.1s, border 0.1s;
`;
