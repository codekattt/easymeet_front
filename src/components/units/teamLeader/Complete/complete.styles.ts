import styled from '@emotion/styled';
import { Modal } from 'antd';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
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
    margin-bottom: 7px;
  }

  & h1 {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 10px;
    color: #333;
  }

  & h2 {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
    color: #555;

    & span {
      color: #d92525;
      margin-left: 4px;
    }
  }

  & h3 {
    font-size: 16px;
    font-weight: 300;
    color: #666;
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
  padding: 30px 20px;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  margin: 15px 0;

  & img {
    width: 200px;
  }

  & span {
    font-size: 18px;
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
    background-color: rgba(74, 144, 226, 1);
  }

  &:disabled {
    background-color: rgba(204, 204, 204, 1);
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
