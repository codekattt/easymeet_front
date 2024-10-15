import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  backdrop-filter: blur(10px); /* 블러 효과 추가 */
  background-color: rgba(255, 255, 255, 0.2); /* 투명도 조정 */
  border-radius: 20px;
`;

export const DatePicker = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.15); /* 글래스모피즘 배경 */
  backdrop-filter: blur(20px); /* 블러 효과 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 40px 0;
  border: 1px solid rgba(255, 255, 255, 0.2); /* 얇은 경계선 */
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
  background: rgba(255, 255, 255, 0.2); /* 버튼 배경 투명도 */
  backdrop-filter: blur(5px);
  border-radius: 50%; /* 둥근 모서리 */
  padding: 2px;

  &:hover {
    background-color: rgba(103, 115, 239, 0.2); /* hover 시 색상 변화 */
  }

  img {
    display: block;
    margin: 0;
  }
`;

export const NextButton = styled(PrevButton)``;

export const CurrentMonth = styled.span`
  font-size: 20px;
  font-weight: 800;

  @media (max-width: 375px) {
    font-size: 5vw;
  }
`;

export const DaysOfWeek = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  padding: 15px 0;
  background: rgba(255, 255, 255, 0.1); /* 투명 배경 */
  backdrop-filter: blur(5px); /* 블러 효과 추가 */
  border-radius: 10px;
`;

export const DayOfWeek = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 20px;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 375px) {
    font-size: 4vw;
  }
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
    border-radius: 25%;
    background-color: ${({ isSelected }) =>
      isSelected ? 'rgba(103, 115, 239, 0.8)' : 'rgba(255, 255, 255, 0.2)'};
    color: ${({ isValid, isSelected }) =>
      isValid ? (isSelected ? 'white' : 'black') : '#ABABAB'};
    cursor: ${({ isValid }) => (isValid ? 'pointer' : 'default')};
    border: 1px solid rgba(255, 255, 255, 0.2);
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
  font-size: 14px;
  margin: 8px 0 0 4px;
  text-align: left;
  background: rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 10px;
  backdrop-filter: blur(5px);
`;

// import styled from '@emotion/styled';

// export const Wrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-bottom: 30px;
// `;

// export const DatePicker = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 100%;
//   border-radius: 20px;
//   border: none;
//   background-color: white;
//   box-shadow: 1px 4px 10px 0px rgba(180, 181, 248, 0.25);
//   padding: 40px 0;
// `;

// export const Header = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   margin-bottom: 20px;
// `;

// export const PrevButton = styled.button`
//   cursor: pointer;
//   border: none;
//   margin: 0 12px;
//   background-color: white;

//   img {
//     display: block;
//     margin: 0;
//   }

//   &:hover {
//     color: #6773ef;
//   }
// `;

// export const NextButton = styled.button`
//   cursor: pointer;
//   border: none;
//   margin: 0 12px;
//   background-color: white;

//   img {
//     display: block;
//     margin: 0;
//   }

//   &:hover {
//     color: #6773ef;
//   }
// `;

// export const CurrentMonth = styled.span`
//   font-size: 20px;
//   font-weight: 800;

//   @media (max-width: 375px) {
//     font-size: 5vw;
//   }
// `;

// export const DaysOfWeek = styled.div`
//   display: grid;
//   grid-template-columns: repeat(7, 1fr);
//   width: 100%;
//   padding: 15px 0;
// `;

// export const DayOfWeek = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-weight: bold;
//   font-size: 20px;

//   @media (max-width: 768px) {
//     font-size: 20px;
//   }

//   @media (max-width: 375px) {
//     font-size: 4vw;
//   }
// `;

// export const Days = styled.div`
//   display: grid;
//   grid-template-columns: repeat(7, 1fr);
//   width: 100%;
// `;

// export const Day = styled.div<{
//   isValid: boolean;
//   isSelected?: boolean | null;
// }>`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
//   padding: 5px;
//   font-size: 20px;
//   width: 100%;

//   & span {
//     width: 40px;
//     height: 40px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     border-radius: 50%;
//     background-color: ${({ isSelected }) => (isSelected ? '#6773EF' : '#fff')};
//     color: ${({ isValid, isSelected }) =>
//       isValid ? (isSelected ? 'white' : 'black') : '#ABABAB'};
//     cursor: ${({ isValid }) => (isValid ? 'pointer' : 'default')};
//     transition: all 0.2s ease;
//   }

//   @media (max-width: 768px) {
//     font-size: 20px;
//     padding: 15% 0;

//     & span {
//       width: 35px;
//       height: 35px;
//     }
//   }

//   @media (max-width: 375px) {
//     font-size: 4vw;

//     & span {
//       width: 8vw;
//       height: 8vw;
//     }
//   }
// `;

// export const WarningMessage = styled.p`
//   color: red;
//   font-size: 14px;
//   margin: 15px 0 0 20px;
//   text-align: left;
// `;
