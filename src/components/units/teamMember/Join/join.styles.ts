import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 500px;
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
  width: 100%;
  height: auto;
  border-radius: 20px;
  border: none;
  padding-top: 25px;
  padding-left: 15px;
  padding-bottom: 26px;
  background-color: white;
  box-shadow: 1px 4px 10px 0px rgba(180, 181, 248, 0.25);
  margin: 0 0 7px 0;
`;

export const Input = styled.input`
  width: 203px;
  height: 38px;
  padding: 10px 15px;
  border: 1px solid #6773ef;
  border-radius: 10px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
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
  margin-top: 170px;
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
