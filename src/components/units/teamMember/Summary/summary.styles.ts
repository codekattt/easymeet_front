import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  margin-bottom: 4px;

  & h1 {
    margin: 0 0 8px 4px;
    margin-bottom: 8px;
  }

  & h2 {
    color: ${({ theme }) => theme.colors.subFont1};
    font-weight: 400;
    margin: 0 0 6px 8px;
  }

  & img {
    width: 34px;
  }
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
  padding: 25px 15px 0;
  padding-bottom: 26px;
  background-color: white;
  box-shadow: 1px 4px 10px 0px rgba(180, 181, 248, 0.25);
  margin: 8px 0 4px 0;
`;
