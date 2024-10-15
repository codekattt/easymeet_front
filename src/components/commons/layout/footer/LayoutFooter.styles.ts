import styled from '@emotion/styled';

export const FooterWrapper = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 500px;
  background-color: rgba(255, 255, 255, 0.25);
  padding: 20px;
  box-sizing: border-box; /* 패딩을 포함한 전체 너비 조정 */
`;

export const FooterText = styled.p`
  font-size: clamp(14px, 3vw, 16px);
  color: #666;
  text-align: center;
  margin: 0;
`;

export const FooterLink = styled.a`
  font-size: clamp(14px, 3vw, 16px);
  color: rgba(74, 144, 226, 1);
  text-decoration: none;
  margin-left: 10px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: rgba(74, 144, 226, 0.8);
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;

  & img {
    width: clamp(20px, 3vw, 24px);
    height: auto;
    margin: 0 8px;
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.1);
    }
  }
`;
