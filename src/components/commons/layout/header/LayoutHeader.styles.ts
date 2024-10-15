import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
`;

export const InnerWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.subLine};
  background: rgba(255, 255, 255, 0.25);
  padding: 12px 0;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
`;

export const InnerLogo = styled.div`
  cursor: pointer;

  & img {
    width: 162px;
    max-width: 100%;
  }
`;
