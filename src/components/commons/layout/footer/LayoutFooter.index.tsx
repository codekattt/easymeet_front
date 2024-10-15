import * as S from './LayoutFooter.styles';

export default function LayoutFooter(): JSX.Element {
  return (
    <S.FooterWrapper>
      <div>
        <S.FooterText>
          © 2024 EasyMeet
          <S.FooterLink href="/terms">이용 약관</S.FooterLink>
          <S.FooterLink href="/privacy">개인정보 처리방침</S.FooterLink>
        </S.FooterText>
        <S.SocialIcons>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/images/icons/facebook.svg" alt="Facebook" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/images/icons/twitter.svg" alt="Twitter" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/images/icons/instagram.svg" alt="Instagram" />
          </a>
        </S.SocialIcons>
      </div>
    </S.FooterWrapper>
  );
}
