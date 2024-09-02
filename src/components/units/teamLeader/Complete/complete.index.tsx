import * as S from './complete.styles';
import Script from 'next/script';

export default function Complete() {
  const onClickCopyLink = () => {};

  const onClickCheckMyTime = () => {};

  return (
    <S.Wrapper>
      <S.Container>
        <S.Section>
          <img
            src="/images/icon/complete_check_icon.webp"
            alt="모임 스케줄 생성 완료"
          />
          <span>
            순식간에 회의페이지 생성 완료!
            <br />
            팀원들에게 공유해보세요
          </span>
        </S.Section>
        <S.Button onClick={onClickCopyLink}>링크복사</S.Button>
        <S.Button onClick={onClickCheckMyTime}>나도 가능시간 입력하기</S.Button>
      </S.Container>
    </S.Wrapper>
  );
}
