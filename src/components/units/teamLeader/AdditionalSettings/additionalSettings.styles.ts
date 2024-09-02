import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  margin: 0 0 25px 0;
`;

export const Input = styled.input`
  width: 281px;
  height: 38px;
  padding: 10px 15px;
  border: 1px solid #6773ef;
  border-radius: 10px;
  margin-top: 15px;
  font-size: 16px;
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
    width: '166px',
    marginTop: '0px', // 드롭다운이 컨트롤 바로 아래 붙도록 설정
    borderRadius: '10px', // 드롭다운 모서리 둥글게
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // 그림자 설정
    border: '1px solid #6773ef', // 경계선 설정
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
`;
