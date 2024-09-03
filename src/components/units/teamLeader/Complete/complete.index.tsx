import * as S from './complete.styles';

export default function Complete() {
  const onClickCopyLink = async () => {
    const link = window.location.href;
    try {
      await navigator.clipboard.writeText(link);
      alert('링크가 클립보드에 복사되었습니다!');
    } catch (err) {
      alert('링크 복사에 실패했습니다. 다시 시도해주세요.');
      console.error('Failed to copy the link: ', err);
    }
  };

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
