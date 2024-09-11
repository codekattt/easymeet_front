import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
  max-width: 500px;
  min-height: 100vh;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  padding-bottom: 20px;
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
  padding: 25px 15px;
  background-color: white;
  box-shadow: 1px 4px 10px 0px rgba(180, 181, 248, 0.25);
  margin: 0 0 7px 0;
`;

export const Radio = styled.input`
  margin-bottom: 12px;
`;

export const Label = styled.label`
  font-size: 20px;
  font-weight: 400;
  margin-left: 10px;
`;

export const Input = styled.input`
  width: 203px;
  height: 38px;
  padding: 10px 15px;
  border: 1px solid #6773ef;
  border-radius: 10px;
`;

export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;

export const SelectTimeStyles = {
  control: (provided: any) => ({
    ...provided,
    width: '120px',
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
  option: (provided: any) => ({
    ...provided,
    fontSize: '16px',
    paddingLeft: '14px',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  menu: (provided: any) => ({
    ...provided,
    width: '122px',
    marginTop: '-8px', // 드롭다운이 컨트롤 바로 아래 붙도록 설정
    marginLeft: '-1px',
    borderRadius: '0 0 10px 10px', // 드롭다운 모서리 둥글게
    boxShadow: '0px 4px 10px rgba(38, 132, 255, 0.1)', // 그림자 설정
    border: '2px solid #6773ef', // 경계선 설정
    borderTop: 'none',
    borderColor: '#2684ff',
    zIndex: 9999, // 다른 요소 위에 보이도록 설정
    scrollbarWidth: 'none',
  }),
};

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  max-width: 500px;
  background-color: #f7f7f7;
  padding: 20px;
  z-index: 1000;

  /* 버튼 위쪽에 그라데이션 추가 */
  &::before {
    content: '';
    position: absolute;
    top: -30px;
    left: 0;
    width: 100%;
    height: 30px;
    background: linear-gradient(
      to bottom,
      rgba(247, 247, 247, 0) 0%,
      /* 투명한 시작 */ rgba(247, 247, 247, 0.7) 100%
        /* 버튼 색과 자연스럽게 연결되는 흐린 그라데이션 */
    );
    z-index: -1;
  }
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
