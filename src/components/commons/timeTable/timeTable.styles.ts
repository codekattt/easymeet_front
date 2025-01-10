import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

// 공통 상수
const BORDER_COLOR = 'rgba(74, 144, 226, 1)';
const GRADIENT_COLORS = ['#3d439e', '#5c63c6', '#1f226b'];

// 그라데이션 애니메이션
const gradientCycle = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Wrapper
export const Wrapper = styled.div`
  width: 100%;
  display: flex;
`;

// 시간 열
export const TimeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: ${BORDER_COLOR};
  margin-right: 10px;
  margin-bottom: -24px;
  padding-top: 41px;

  @media (max-width: 280px) {
    font-size: 11px;
  }
`;

// 요일 열
export const WeekWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

// 요일
export const DayWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 14px;
`;

export const Day = styled.div`
  flex: 1;
  text-align: center;
  display: flex;
  flex-direction: column;

  /* 날짜 스타일 */
  span:first-of-type {
    font-size: 12px;
    color: ${BORDER_COLOR};
    margin-bottom: 2px;

    @media (max-width: 380px) {
      font-size: 8px;
    }
  }

  /* 요일 스타일 */
  span:last-of-type {
    font-size: 14px;

    @media (max-width: 280px) {
      font-size: 11px;
    }
  }
`;

// 셀 래퍼
export const CellWrapper = styled.div`
  display: flex;
  border: 1px solid ${BORDER_COLOR};
  border-radius: 1px;
  background-color: ${({ theme }) => theme.colors.subLine};
`;

// 셀
export const Cell = styled.div<{
  isSelected: boolean;
  isStart: boolean;
  isEnd: boolean;
  isSummary: boolean;
  backgroundColor: string;
}>`
  flex: 1;
  width: 100%;
  min-height: 1.6rem;
  text-align: center;
  position: relative;

  /* 배경색 설정 */
  background-color: ${({ isSelected, backgroundColor, isSummary, theme }) =>
    isSummary ? backgroundColor : isSelected ? theme.colors.point1 : 'white'};

  /* 테두리 스타일 */
  border-right: 1px solid ${BORDER_COLOR};
  border-bottom: 1px solid ${BORDER_COLOR};

  &:nth-of-type(odd) {
    border-bottom: 1px dashed ${BORDER_COLOR};
  }

  &:last-of-type {
    border-bottom: none;
  }

  /* 시작/끝 셀 스타일 */
  ${({ isStart, isEnd, theme }) =>
    (isStart || isEnd) &&
    !(isStart && isEnd) &&
    `
      border: 2px solid ${theme.colors.point3} !important;
    `}

  ${({ isStart, isEnd }) =>
    isStart &&
    isEnd &&
    `
      border: none;
    `}

  /* 5번 선택된 셀 */
  &.five-times-selected {
    /* background: linear-gradient(-45deg, ${GRADIENT_COLORS.join(', ')});
    background-size: 400% 400%;
    animation: ${gradientCycle} 7s ease infinite; */

    /* 별표 */
    &::after {
      content: '★';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #eee;
      font-size: 0.75rem;
      z-index: 1;
    }
  }

  /* hover 스타일 */
  &:hover {
    border: 2px solid #666bc4;
  }

  transition: background-color 0.1s, border 0.1s;
`;

// ${({ theme }) => theme.colors.point1}
