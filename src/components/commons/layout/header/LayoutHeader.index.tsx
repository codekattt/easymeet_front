import * as S from './LayoutHeader.styles';

export default function LayoutHeader(): JSX.Element {
  return (
    <>
      <S.Wrapper>
        <S.InnerWrapper>
          <S.InnerLogo>
            <img src="/images/logos/easymeet_logo.png" />
          </S.InnerLogo>
        </S.InnerWrapper>
      </S.Wrapper>
    </>
  );
}
