import { css } from '@emotion/react';

export const globalStyles = css`
  * {
    margin: 0;
    box-sizing: border-box;
    font-family: 'NanumSquare', sans-serif;
  }

  @font-face {
    font-family: 'NanumSquare';
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/NanumSquare/NanumSquareR.woff')
      format('woff');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'NanumSquare';
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/NanumSquare/NanumSquareB.woff')
      format('woff');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'NanumSquare';
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/NanumSquare/NanumSquareEB.woff')
      format('woff');
    font-weight: 800;
    font-style: normal;
  }

  @font-face {
    font-family: 'NanumSquare';
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/NanumSquare/NanumSquareL.woff')
      format('woff');
    font-weight: 300;
    font-style: normal;
  }
`;
