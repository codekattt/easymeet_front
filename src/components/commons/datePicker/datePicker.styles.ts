import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 20px;
`;

export const DatePicker = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid none;
  border-radius: 20px;
  background: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 40px 0;
  margin: 0 0 15px 0;
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

export const PrevButton = styled.button`
  cursor: pointer;
  border: none;
  margin: 0 12px;
  background: white;
  border-radius: 50%;
  padding: 3px;

  &:hover {
    background-color: rgba(103, 115, 239, 0.2);
  }

  img {
    display: block;
    margin: 0;
  }
`;

export const NextButton = styled(PrevButton)``;

export const CurrentMonth = styled.span`
  font-size: clamp(16px, 5vw, 20px);
  font-weight: 800;
`;

export const DaysOfWeek = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  padding: 15px 0;
  border-radius: 10px;
`;

export const DayOfWeek = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: clamp(14px, 4vw, 20px);
`;

export const Days = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  gap: 4px;
`;

export const Day = styled.div<{
  isValid: boolean;
  isSelected?: boolean | null;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 5px;
  width: 100%;

  & span {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: clamp(14px, 3.5vw, 18px);
    border-radius: 25%;
    background-color: ${({ isSelected }) => (isSelected ? '#4A90E2' : 'white')};
    color: ${({ isValid, isSelected }) =>
      isValid ? (isSelected ? 'white' : 'black') : '#ABABAB'};
    cursor: ${({ isValid }) => (isValid ? 'pointer' : 'default')};
  }

  @media (max-width: 768px) {
    font-size: 18px;
    padding: 15% 0;

    & span {
      width: 35px;
      height: 35px;
    }
  }

  @media (max-width: 375px) {
    font-size: 4vw;

    & span {
      width: 8vw;
      height: 8vw;
    }
  }
`;

export const WarningMessage = styled.p`
  color: ${({ theme }) => theme.colors.alert};
  font-size: clamp(12px, 3vw, 14px);
  margin: 0 0 15px 0;
  text-align: left;
  padding: 10px;
  border-radius: 10px;
`;
