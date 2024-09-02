import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

export const DatePicker = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-width: 310px;
  border-radius: 20px;
  border: none;
  background-color: white;
  box-shadow: 1px 4px 10px 0px rgba(180, 181, 248, 0.25);
  padding: 40px 0;
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

export const PrevButton = styled.button`
  font-size: 30px;
  cursor: pointer;
  border: none;
  margin: 0 12px;
  background-color: white;

  img {
    display: block;
    margin: 0;
  }

  &:hover {
    color: #6773ef;
  }
`;

export const NextButton = styled.button`
  font-size: 30px;
  cursor: pointer;
  border: none;
  margin: 0 12px;
  background-color: white;

  img {
    display: block;
    margin: 0;
  }

  &:hover {
    color: #6773ef;
  }
`;

export const CurrentMonth = styled.span`
  font-size: 20px;
  font-weight: 800;
`;

export const DaysOfWeek = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  padding: 15px 0;
`;

export const DayOfWeek = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
`;

export const Days = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
`;

export const Day = styled.div<{
  isValid: boolean;
  isSelected?: boolean | null;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 5px 5px;
  font-size: 20px;
  width: 100%;

  & span {
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: ${({ isSelected }) => (isSelected ? '#6773EF' : '#fff')};
    color: ${({ isValid, isSelected }) =>
      isValid ? (isSelected ? 'white' : 'ABABAB') : '#ABABAB'};
    cursor: ${({ isValid }) => (isValid ? 'pointer' : 'default')};
  }
`;

export const WarningMessage = styled.p`
  color: red;
  font-size: 14px;
  margin: 15px 0 0 20px;
  text-align: left;
`;
