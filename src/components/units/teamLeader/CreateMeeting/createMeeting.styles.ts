import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
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
  padding: 20px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);

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
    color: #4a90e2;
  }

  & h2 {
    font-size: clamp(16px, 3.5vw, 20px);
    font-weight: 700;
    margin-bottom: 20px;
    color: #555;

    & span {
      color: #d92525;
      margin-left: 4px;
    }
  }

  & h3 {
    font-size: clamp(14px, 3vw, 16px);
    font-weight: 300;
    color: #666;
  }
`;

export const Section = styled.section`
  width: 100%;
  height: auto;
  border-radius: 20px;
  padding: 30px 20px;
  background: white;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  margin: 0 0 15px 0;
`;

export const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

export const Radio = styled.input`
  margin-right: 8px;
  width: 20px;
  height: 20px;
  accent-color: #4a90e2;
`;

export const Label = styled.label`
  font-size: clamp(14px, 2.5vw, 18px);
  font-weight: 400;
  color: #333;
`;

export const WeekdaysWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const WeekdayLabel = styled.label<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ isSelected }) => (isSelected ? '#4A90E2' : '#ddd')};
  color: ${({ isSelected }) => (isSelected ? 'white' : 'white')};
  font-weight: bold;
  cursor: pointer;

  @media (max-width: 399px) {
    width: 35px;
    height: 35px;
  }

  @media (max-width: 349px) {
    width: 32px;
    height: 32px;
    font-size: 14px;
  }
`;

export const HiddenCheckbox = styled.input`
  display: none;
`;

export const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px 15px;
  border: 1px solid rgba(102, 102, 255, 0.5);
  border-radius: 10px;
  font-size: 16px;
  color: #333;

  &:focus {
    border: 2px solid #4a90e2;
    outline: none;
  }
`;

export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
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
  border: none;
  border-radius: 10px;
  background-color: #4a90e2;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #4a90e2;
  }

  &:disabled {
    background-color: #cccccc;
    color: white;
    cursor: default;
  }
`;
