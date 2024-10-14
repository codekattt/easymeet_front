import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
  max-width: 500px;
  min-height: 100vh;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  background-color: #f7f7f7;

  & img {
    max-width: 100%;
    height: auto;
    align-self: center;
    margin-bottom: 7px;
  }

  & h1 {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 20px;
  }

  & h2 {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;
  }

  & h3 {
    display: inline;
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 4px;

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
  margin: 0 0 12px 0;
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
  background-color: #f7f7f7;
  padding: 20px;
  z-index: 1000;

  /* 버튼 위쪽에 그라데이션 추가 */
  &::before {
    content: '';
    position: absolute;
    top: -30px;
    left: 0;
    width: 100%;
    height: 30px;
    background: linear-gradient(
      to bottom,
      rgba(247, 247, 247, 0) 0%,
      /* 투명한 시작 */ rgba(247, 247, 247, 0.7) 100%
        /* 버튼 색과 자연스럽게 연결되는 흐린 그라데이션 */
    );
    z-index: -1;
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 45px;
  font-size: 20px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.point1};
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.point2};
  }

  &:disabled {
    background-color: #ccc;
    color: white;
    cursor: default;
  }
`;
