import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`;

export const InnerWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.colors.menuDivide};
  padding: 12px 0;
`;

export const InnerLogo = styled.div`
  font-size: 30px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.point1};
  cursor: pointer;

  :hover {
    color: ${({ theme }) => theme.colors.point2};
  }
`;
