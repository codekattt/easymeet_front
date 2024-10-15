import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
`;

export const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  margin-bottom: 8px;

  & img {
    width: clamp(30px, 5vw, 40px);
    height: auto;
    max-width: 100%;
    margin-bottom: 0 !important;
  }

  & h3 {
    margin-left: 8px;
    font-weight: 400;
  }

  &:last-child {
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
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.15);
  padding: 20px;
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 20px;

  & h1 {
    font-size: clamp(22px, 5vw, 28px);
    font-weight: 700;
    margin-left: 4px;
    color: rgba(74, 144, 226, 1);
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

export const Title = styled.h4`
  font-size: 25px;
  font-weight: 400;
  line-height: 1.4;
  margin-left: 4px;
  color: rgba(74, 144, 226, 1);

  & span {
    font-weight: 700;
  }
`;

export const Section = styled.section`
  width: 100%;
  height: auto;
  border-radius: 20px;
  padding: 30px 20px;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  margin: 15px 0;
`;
