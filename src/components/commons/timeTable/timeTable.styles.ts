import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  font-size: 10px;
`;

export const HeaderCell = styled.th<{ isActive: boolean }>`
  width: 100px;
  height: 30px;
  text-align: center;
  opacity: ${({ isActive }) => (isActive ? 1 : 0.3)};
  pointer-events: ${({ isActive }) => (isActive ? 'auto' : 'none')};
  padding-bottom: 10px;
`;

export const Cell = styled.td<{ isActive: boolean; isSelected: boolean }>`
  width: 100px;
  height: 30px;
  border: 1px solid #ddd;
  cursor: pointer;
  text-align: center;
  background-color: ${({ isSelected }) => (isSelected ? '#90ee90' : '#fff')};
  opacity: ${({ isActive }) => (isActive ? 1 : 0.3)};
  pointer-events: ${({ isActive }) => (isActive ? 'auto' : 'none')};
`;
