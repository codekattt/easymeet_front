import * as S from './additionalSettings.styles';

interface AdditionalSettingsProps {
  nextStep: () => void;
  prevStep: () => void;
}

export default function AdditionalSettings({
  nextStep,
  prevStep,
}: AdditionalSettingsProps) {
  return (
    <S.Wrapper>
      <S.Container>
        <div>추가정보 페이지</div>
        <button onClick={prevStep}>이전으로</button>
        <button onClick={nextStep}>다음으로</button>
      </S.Container>
    </S.Wrapper>
  );
}
