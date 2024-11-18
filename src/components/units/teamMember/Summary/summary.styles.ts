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
  padding: 20px;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.1);

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
  }

  & h3 {
    font-size: clamp(14px, 3vw, 16px);
    font-weight: 400;
    color: #666;
    margin-left: 8px;
  }
`;

export const Section = styled.section`
  width: 100%;
  height: auto;
  border-radius: 20px;
  background: white;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  margin: 0 0 15px 0;
  padding: 30px 20px;
`;
