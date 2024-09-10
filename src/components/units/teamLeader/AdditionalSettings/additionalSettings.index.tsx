import { useEffect, useState } from 'react';
import Select from 'react-select';
import * as S from './additionalSettings.styles';
import { useRouter } from 'next/router';

export default function AdditionalSettings() {
  const router = useRouter();

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

  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [placeholder, setPlaceholder] = useState(
    '구체적인 장소를 작성해주세요(선택)',
  );
  const [showInput, setShowInput] = useState(true);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handleLocationChange = (selectedOption: any) => {
    setSelectedLocation(selectedOption); // 선택한 장소 업데이트
    if (selectedOption?.value === '온라인') {
      setPlaceholder('온라인 화상회의 툴을 작성해주세요');
      setShowInput(true);
    } else if (selectedOption?.value === '오프라인') {
      setPlaceholder('구체적인 장소를 작성해주세요(선택)');
      setShowInput(true);
    } else if (selectedOption?.value === '미지정') {
      setShowInput(false);
    }
  };

  const handleTimeChange = (selectedOption: any) => {
    setSelectedTime(selectedOption); // 선택한 시간 업데이트
  };

  // 선택한 값이 있을 때 버튼 활성화
  useEffect(() => {
    if (selectedTime || selectedLocation) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [selectedTime, selectedLocation]);

  const onClickButton = () => {
    router.push('/teamleader?step=complete');
  };

  return (
    <S.Wrapper>
      <S.Container>
        <h1>추가 설정하기(선택)</h1>
        <S.Section>
          <h2>회의는 몇 시간동안 진행되나요?</h2>
          <Select
            placeholder={'시간 선택'}
            options={timeOptions}
            styles={S.SelectTimeStyles}
            onChange={handleTimeChange}
            value={selectedTime} // 선택한 시간 상태
            isClearable // 선택을 지울 수 있도록 설정
          />
        </S.Section>
        <S.Section>
          <h2>회의 장소를 알려주세요</h2>
          <Select
            placeholder={'장소 선택'}
            options={locationOptions}
            styles={S.SelectTimeStyles}
            onChange={handleLocationChange}
            value={selectedLocation} // 선택한 장소 상태
            isClearable // 선택을 지울 수 있도록 설정
          />
          {showInput && <S.Input type="text" placeholder={placeholder} />}
        </S.Section>
        <S.ButtonWrapper>
          <S.PassButton onClick={onClickButton}>건너뛰기 ＞</S.PassButton>
          <S.Button
            onClick={onClickButton}
            disabled={!isButtonEnabled} // 버튼 비활성화 여부 설정
          >
            추가 설정 입력
          </S.Button>
        </S.ButtonWrapper>
      </S.Container>
    </S.Wrapper>
  );
}
