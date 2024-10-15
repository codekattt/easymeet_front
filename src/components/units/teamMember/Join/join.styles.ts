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
  margin-bottom: 8px;

  & img {
    width: 40px;
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

  & div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  & img {
    width: 40px;
    height: auto;
    align-self: center;
  }

  & h1 {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 10px;
    color: #333; /* 다크 그레이 색상 */
  }

  & h2 {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 6px;
    color: #555; /* 중간 그레이 */

    & span {
      color: #d92525;
      margin-left: 4px;
    }
  }

  & h3 {
    font-size: 16px;
    font-weight: 300;
    margin-bottom: 16px;
    color: #666;
  }
`;

export const Section = styled.section`
  width: 100%;
  height: auto;
  border-radius: 20px;
  padding: 30px 20px;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  margin: 15px 0;

  & img {
    max-width: 90px;
  }
`;

export const Title = styled.h4`
  font-size: 25px;
  font-weight: 400;
  line-height: 1.4;
  margin-left: 4px;
  color: rgba(74, 144, 226, 1);

  & span {
    font-weight: 700;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px 15px;
  border: 1px solid rgba(102, 102, 255, 0.5);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.2);
  font-size: 16px;
  color: #333;
  margin-bottom: 15px;

  &:focus {
    border: 2px solid #4a90e2;
    outline: none;
  }
`;

export const ErrorMessage = styled.h5`
  font: 10px;
  color: ${({ theme }) => theme.colors.alert};
  margin-left: 4px;
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

export const EditButton = styled.button`
  width: 100%;
  height: 45px;
  font-size: 18px;
  font-weight: 600;
  margin: 0 4px;
  border: 1px solid rgba(74, 144, 226, 1);
  border-radius: 10px;
  background-color: white;
  color: rgba(74, 144, 226, 1);
  cursor: pointer;
  transition: background-color 0.3s ease;
`;
