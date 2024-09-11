import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
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
    margin-bottom: 20px;

    & span {
      color: #d92525;
      margin-left: 4px;
    }
  }

  & h3 {
    font-size: 16px;
    font-weight: 300;
  }
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: auto;
  border-radius: 20px;
  border: none;
  padding-top: 25px;
  padding-left: 15px;
  padding-bottom: 26px;
  background-color: white;
  box-shadow: 1px 4px 10px 0px rgba(180, 181, 248, 0.25);
  margin: 0 0 120px 0;

  & img {
    width: 250px;
    margin-top: 20px;
  }

  & span {
    font-size: 20px;
    font-weight: 700;
    line-height: 1.4;
    text-align: center;
    margin: 30px 0;
    color: ${({ theme }) => theme.colors.fontMain};
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  margin-bottom: 15px;
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

// 모달 디자인

export const ModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const ModalDescription = styled.p`
  font-size: 14px;
  margin-bottom: 20px;
  text-align: center;
`;

export const ModalButton = styled.button`
  background-color: ${({ theme }) => theme.colors.point1};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.point2};
  }
`;
