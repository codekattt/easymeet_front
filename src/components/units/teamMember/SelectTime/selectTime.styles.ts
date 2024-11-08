import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
`;

export const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  margin: 0 0 15px 0;

  & img {
    width: clamp(30px, 5vw, 40px);
    height: auto;
    max-width: 100%;
    margin-bottom: 0 !important;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
  max-width: 500px;
  min-height: 100vh;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.15);
  padding: 20px;
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 20px;

  & img {
    max-width: 100%;
    height: auto;
    align-self: center;
    margin: 0 0 12px 0;
  }

  & h1 {
    font-size: clamp(22px, 5vw, 28px);
    font-weight: 700;
    margin-left: 4px;
    color: rgba(74, 144, 226, 1);
  }

  & h2 {
    font-size: clamp(16px, 3.5vw, 20px);
    font-weight: 700;
    margin-bottom: 6px;
    color: #555;
  }

  & h3 {
    font-size: clamp(14px, 3vw, 16px);
    font-weight: 300;
    color: #666;

    & span {
      color: ${({ theme }) => theme.colors.point1};
      font-weight: 700;
    }
  }
`;

export const Section = styled.section`
  width: 100%;
  height: auto;
  border-radius: 20px;
  border: none;
  padding: 25px 15px 22px 15px;
  background-color: white;
  box-shadow: 1px 4px 10px 0px rgba(180, 181, 248, 0.25);
  margin: 0 0 15px 0;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  max-width: 500px;
  background-color: rgba(255, 255, 255, 0.25);
  padding: 20px;
  z-index: 1000;

  &::before {
    content: '';
    position: absolute;
    top: -30px;
    left: 0;
    width: 100%;
    height: 30px;
    background: transparent;
    z-index: -1;
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 45px;
  font-size: 18px;
  font-weight: 600;
  margin: 0 4px;
  border: none;
  border-radius: 10px;
  background-color: rgba(74, 144, 226, 1);
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(74, 144, 226, 1);
  }

  &:disabled {
    background-color: rgba(204, 204, 204, 1);
    color: white;
    cursor: default;
  }
`;
