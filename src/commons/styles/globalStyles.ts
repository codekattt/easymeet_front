import { css } from '@emotion/react';

export const globalStyles = css`
  * {
    margin: 0;
    box-sizing: border-box;
    font-family: 'NanumSquare', sans-serif;
  }

  @font-face {
    font-family: 'NanumSquare';
    src: url('https://cdn.jsdelivr.net/gh/moonspam/NanumSquare@2.0/NanumSquareR.woff')
      format('woff');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'NanumSquare';
    src: url('https://cdn.jsdelivr.net/gh/moonspam/NanumSquare@2.0/NanumSquareB.woff')
      format('woff');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'NanumSquare';
    src: url('https://cdn.jsdelivr.net/gh/moonspam/NanumSquare@2.0/NanumSquareEB.woff')
      format('woff');
    font-weight: 800;
    font-style: normal;
  }

  @font-face {
    font-family: 'NanumSquare';
    src: url('https://cdn.jsdelivr.net/gh/moonspam/NanumSquare@2.0/NanumSquareL.woff')
      format('woff');
    font-weight: 300;
    font-style: normal;
  }
`;
