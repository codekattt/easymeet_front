import { useRouter } from 'next/router';
import * as S from './join.styles';

interface JoinProps {
  nextStep: () => void;
}

export default function Join({ nextStep }: JoinProps) {
  const router = useRouter();

  const onClickMoveToPage = () => {
    router.push('/mememem');
  };

  return (
    <S.Wrapper>
      <S.Container>
        <S.Section style={{ display: 'flex', flexDirection: 'row' }}>
          <img src="/images/icon/member_calendar_icon.png" />
          <S.TextWrapper>
            <S.Text>순식간에 정하는</S.Text>
            <S.TextBold>우리팀 회의 일정</S.TextBold>
          </S.TextWrapper>
        </S.Section>
        <S.Section>
          <h2>참여자님의 이름을 적어주세요</h2>
          <h3>팀원들이 알아볼 수 있는 이름이어야 해요!</h3>
          <S.Input placeholder="참여자 이름" />
        </S.Section>
        <S.SubButton onClick={onClickMoveToPage}>
          제출했던 시간을 수정하고 싶어요 ＞
        </S.SubButton>
        <S.ButtonWrapper>
          <S.Button onClick={nextStep}>가능한 시간 입력</S.Button>
        </S.ButtonWrapper>
      </S.Container>
    </S.Wrapper>
  );
}
