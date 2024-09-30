import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import * as S from './additionalSettings.styles';
import Select, { SingleValue } from 'react-select';

import { db } from '../../../../commons/libraries/firebase';
import { doc, updateDoc, Timestamp } from 'firebase/firestore';

export default function AdditionalSettings() {
  const router = useRouter();
  const { meetingId } = router.query; // router.query에서 meetingId를 가져옴

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

  const [selectedTime, setSelectedTime] =
    useState<SingleValue<{ value: string; label: string }>>(null);
  const [selectedLocation, setSelectedLocation] =
    useState<SingleValue<{ value: string; label: string }>>(null);
  const [customLocation, setCustomLocation] = useState('');
  const [placeholder, setPlaceholder] = useState(
    '구체적인 장소를 작성해주세요(선택)',
  );
  const [showInput, setShowInput] = useState(true);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const onChangeLocation = (selectedOption: any) => {
    setSelectedLocation(selectedOption);
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

  const onChangeTime = (selectedOption: any) => {
    setSelectedTime(selectedOption);
  };

  useEffect(() => {
    if (selectedTime || selectedLocation || customLocation) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [selectedTime, selectedLocation, customLocation]);

  const handleCustomLocationChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCustomLocation(e.target.value);
  };

  // 추가 설정 정보를 Firebase에 저장
  const saveAddDataToFB = async () => {
    const additionalData = {
      duration: selectedTime?.value || null,
      location: selectedLocation?.value || null,
      customLocation: customLocation || null,
      updatedAt: Timestamp.now(),
    };

    try {
      const meetingRef = doc(db, 'meetings', meetingId as string);
      await updateDoc(meetingRef, additionalData);
      router.push(`/teamleader?step=complete&meetingId=${meetingId}`);
    } catch (error) {
      console.error('Error updating meeting: ', error);
    }
  };

  // 건너뛰기 버튼 클릭 시 바로 다음 단계로 이동
  const onClickPass = () => {
    router.push(`/teamleader?step=complete&meetingId=${meetingId}`);
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
            onChange={onChangeTime}
            value={selectedTime}
            isClearable
            isSearchable={false}
          />
        </S.Section>
        <S.Section>
          <h2>회의 장소를 알려주세요</h2>
          <Select
            placeholder={'장소 선택'}
            options={locationOptions}
            styles={S.SelectTimeStyles}
            onChange={onChangeLocation}
            value={selectedLocation}
            isClearable
            isSearchable={false}
          />
          {showInput && (
            <S.Input
              type="text"
              placeholder={placeholder}
              value={customLocation}
              onChange={handleCustomLocationChange}
            />
          )}
        </S.Section>
        <S.ButtonWrapper>
          <S.PassButton onClick={onClickPass}>건너뛰기 ＞</S.PassButton>
          <S.Button onClick={saveAddDataToFB} disabled={!isButtonEnabled}>
            추가 설정 입력
          </S.Button>
        </S.ButtonWrapper>
      </S.Container>
    </S.Wrapper>
  );
}
