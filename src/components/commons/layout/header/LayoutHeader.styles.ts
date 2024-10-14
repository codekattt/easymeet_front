import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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
  background-color: #fff;
  padding: 12px 0;
`;

export const InnerLogo = styled.div`
  cursor: pointer;

  & img {
    width: 162px;
  }
`;
