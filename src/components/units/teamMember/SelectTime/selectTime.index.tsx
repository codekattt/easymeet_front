import * as S from './selectTime.styles';

interface SelectTimeProps {
  nextStep: () => void;
  prevStep: () => void;
}

export default function SelectTime({ nextStep, prevStep }: SelectTimeProps) {
  return (
    <S.Wrapper>
      <S.Container>
        <div>title</div>
      </S.Container>
    </S.Wrapper>
  );
}
