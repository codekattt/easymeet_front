import styled from '@emotion/styled';

export const DatePicker = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 20px;
  border: none;
  background-color: white;
  box-shadow: 1px 4px 10px 0px rgba(180, 181, 248, 0.25);
  margin-bottom: 40px;
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
  margin: 0 30px;
  background-color: white;

  img {
    display: block;
  }

  &:hover img {
    content: url('/images/icon/calendar-prev-icon-hover.svg'); /* hover 시 이미지를 변경 */
  }
`;

export const NextButton = styled.button`
  font-size: 30px;
  cursor: pointer;
  border: none;
  margin: 0 30px;
  background-color: white;

  img {
    display: block;
  }

  &:hover img {
    content: url('/images/icon/calendar-next-icon-hover.svg'); /* hover 시 이미지를 변경 */
  }
`;

export const CurrentMonth = styled.span`
  font-size: 20px;
  font-weight: 800;
`;

export const DaysOfWeek = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr); /* 7개의 열로 균등하게 나누기 */
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
  grid-template-columns: repeat(7, 1fr); /* 7개의 열로 균등하게 나누기 */
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
  padding: 10px;
  font-size: 20px;

  & span {
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: ${({ isSelected }) => (isSelected ? '#6773EF' : '#fff')};
    color: ${({ isValid, isSelected }) =>
      isValid ? (isSelected ? 'white' : 'black') : '#ddd'};
    cursor: ${({ isValid }) => (isValid ? 'pointer' : 'default')};
  }
`;

export const SelectedDate = styled.p`
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;
`;
