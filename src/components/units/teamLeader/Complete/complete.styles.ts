import styled from '@emotion/styled';
import { Modal } from 'antd';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 500px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 20px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);

  & img {
    max-width: 100%;
    height: auto;
    align-self: center;
    margin: 12px;
  }

  & h1 {
    font-size: clamp(22px, 5vw, 28px);
    font-weight: 700;
    line-height: 1.4;
    margin-left: 4px;
    color: #4a90e2;
  }

  & h2 {
    font-size: clamp(16px, 3.5vw, 20px);
    font-weight: 500;
    text-align: center;
    line-height: 1.6;
    margin: 12px 12px 20px 12px;
    color: #555;
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
  padding: 20px;
  background: white;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);

  & img {
    width: 200px;
  }

  & span {
    font-size: clamp(16px, 3.5vw, 18px);
    font-weight: 600;
    line-height: 1.6;
    text-align: center;
    margin: 16px 0;
    color: ${({ theme }) => theme.colors.fontMain};
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  max-width: 500px;
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
  font-size: clamp(16px, 3vw, 18px);
  font-weight: 600;
  margin: 0 4px;
  border: none;
  border-radius: 10px;
  background-color: #4a90e2;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease;

  & div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    & img {
      margin: 0 4px 0 0;
    }
  }

  &:hover {
    background-color: #4a90e2;
  }

  &:disabled {
    background-color: #cccccc;
    color: white;
    cursor: default;
  }
`;

// 모달 디자인

export const CustomModal = styled(Modal)`
  .ant-modal-content {
    background-color: ${({ theme }) => theme.colors.point2};
  }
`;

export const ModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 10px;
  padding: 5px;
`;

export const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: white;
`;

// export const ModalDescription = styled.p`
//   font-size: 14px;
//   margin-bottom: 20px;
//   text-align: center;
// `;

// export const ModalButton = styled.button`
//   background-color: ${({ theme }) => theme.colors.point1};
//   color: white;
//   border: none;
//   border-radius: 5px;
//   padding: 10px 20px;
//   cursor: pointer;
//   &:hover {
//     background-color: ${({ theme }) => theme.colors.point2};
//   }
// `;
