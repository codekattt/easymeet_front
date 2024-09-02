import * as S from './complete.styles';

interface CompleteProps {
  prevStep: () => void;
}

export default function Complete({ prevStep }: CompleteProps) {
  return (
    <S.Wrapper>
      <S.Container>
        <div>생성완료페이지</div>
        <button onClick={prevStep}>다음으로</button>
      </S.Container>
    </S.Wrapper>
  );
}
