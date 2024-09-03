import { useState } from 'react';
import Select from 'react-select';
import * as S from './additionalSettings.styles';

interface AdditionalSettingsProps {
  nextStep: () => void;
  prevStep: () => void;
}

export default function AdditionalSettings({
  nextStep,
  prevStep,
}: AdditionalSettingsProps) {
  const timeOptions = [
    { value: '30분', label: '30분' },
    { value: '1시간', label: '1시간' },
    { value: '1시간 30분', label: '1시간 30분' },
    { value: '2시간', label: '2시간' },
    { value: '2시간 30분', label: '2시간 30분' },
    { value: '3시간', label: '3시간' },
  ];

  const locationOptions = [
    { value: '온라인', label: '온라인' },
    { value: '오프라인', label: '오프라인' },
    { value: '미지정', label: '미지정' },
  ];

  const [placeholder, setPlaceholder] = useState(
    '구체적인 장소를 작성해주세요(선택)',
  );
  const [showInput, setShowInput] = useState(true);

  const handleLocationChange = (selectedOption: any) => {
    if (selectedOption.value === '온라인') {
      setPlaceholder('온라인 화상회의 툴을 작성해주세요');
      setShowInput(true);
    } else if (selectedOption.value === '오프라인') {
      setPlaceholder('구체적인 장소를 작성해주세요(선택)');
      setShowInput(true);
    } else if (selectedOption.value === '미지정') {
      setShowInput(false);
    }
  };

  return (
    <S.Wrapper>
      <S.Container>
        <h1>추가 설정하기(선택)</h1>
        <S.Section>
          <h2>회의는 몇 시간동안 진행되나요?</h2>
          <Select
            options={timeOptions}
            styles={S.SelectTimeStyles}
            defaultValue={timeOptions[1]}
            // menuIsOpen={true}
          />
        </S.Section>
        <S.Section>
          <h2>회의 장소를 알려주세요</h2>
          <Select
            options={locationOptions}
            styles={S.SelectTimeStyles}
            onChange={handleLocationChange}
            defaultValue={locationOptions[0]}
          />
          {showInput && <S.Input type="text" placeholder={placeholder} />}
        </S.Section>
        <S.PassButton>건너뛰기 ＞</S.PassButton>
        <S.SubmitButton onClick={nextStep}>추가 설정 입력</S.SubmitButton>
      </S.Container>
    </S.Wrapper>
  );
}
