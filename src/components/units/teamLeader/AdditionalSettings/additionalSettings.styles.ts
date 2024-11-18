import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  margin: 0 0 15px 0;

  & img {
    width: 40px;
    margin-bottom: 0;
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

  & h1 {
    font-size: clamp(22px, 5vw, 28px);
    font-weight: 700;
    line-height: 1.4;
    margin-left: 4px;
    color: #4a90e2;
  }

  & h2 {
    font-size: clamp(16px, 3.5vw, 20px);
    font-weight: 700;
    margin-bottom: 20px;
    color: #555;
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

export const Input = styled.input`
  width: 60%;
  min-width: 166px;
  height: 40px;
  padding: 10px 15px;
  border: 1px solid rgba(102, 102, 255, 0.5);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.2);
  font-size: 16px;
  color: #333;
  margin: 12px 0 0 0;

  &:focus {
    border: 2px solid #4a90e2;
    outline: none;
  }
`;

export const SelectTimeStyles = {
  control: (provided: any) => ({
    ...provided,
    width: '166px',
    height: '38px',
    padding: '0 12px',
    border: '1px solid #6773ef',
    borderRadius: '10px',
    fontSize: '16px',
    marginRight: '10px',
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    padding: 0,
  }),
  indicatorsContainer: (provided: any) => ({
    ...provided,
    height: '100%',
  }),
  menu: (provided: any) => ({
    ...provided,
    width: '168px',
    marginTop: '-8px', // 드롭다운이 컨트롤 바로 아래 붙도록 설정
    marginLeft: '-1px',
    borderRadius: '0 0 10px 10px', // 드롭다운 모서리 둥글게
    boxShadow: '0px 4px 10px rgba(38, 132, 255, 0.1)', // 그림자 설정
    border: '2px solid #6773ef', // 경계선 설정
    borderTop: 'none',
    borderColor: '#2684ff',
    zIndex: 2, // 다른 요소 위에 보이도록 설정
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? '#6773ef'
      : state.isFocused
      ? '#e0e7ff'
      : 'white',
    color: state.isSelected ? 'white' : '#333',
    padding: '10px 12px',
    cursor: 'pointer',
    ':active': {
      backgroundColor: '#6773ef',
      color: 'white',
    },
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
};

export const PassButton = styled.span`
  font-size: 18px;
  padding-bottom: 20px;
  color: ${({ theme }) => theme.colors.point1};
  text-align: center;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.point2};
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

  &:hover {
    background-color: #4a90e2;
  }

  &:disabled {
    background-color: #cccccc;
    color: white;
    cursor: default;
  }
`;
