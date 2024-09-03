import * as S from './join.styles';

interface JoinProps {
  nextStep: () => void;
}

export default function Join({ nextStep }: JoinProps) {
  return (
    <S.Wrapper>
      <S.Container>
        <S.Section style={{ display: 'flex', flexDirection: 'row' }}>
          <img src="/images/icon/member_calendar_icon.png" />

          <span>순식간에 정하는</span>
          <span>우리팀 회의 일정</span>
        </S.Section>
      </S.Container>
    </S.Wrapper>
  );
}
