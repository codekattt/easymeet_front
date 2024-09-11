import { useEffect, useState } from 'react';
import * as S from './createMeeting.styles';
import DatePicker from '../../../commons/datePicker/datePicker.index';
import Select, { SingleValue } from 'react-select';
import { useRouter } from 'next/router';

export default function CreateMeeting() {
  const router = useRouter();
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [meetingType, setMeetingType] = useState('date');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const [selectedStartTime, setSelectedStartTime] = useState<
    SingleValue<{ value: string; label: string }>
  >({
    value: '09:00',
    label: '09:00',
  });
  const [selectedEndTime, setSelectedEndTime] = useState<
    SingleValue<{ value: string; label: string }>
  >({
    value: '24:00',
    label: '24:00',
  });

  const [endTimeOptions, setEndTimeOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const onClickButton = () => {
    router.push('/teamleader?step=add');
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMeetingType(event.target.value);
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let i = 9; i <= 24; i++) {
      const time = i < 10 ? `0${i}:00` : `${i}:00`;
      options.push({ value: time, label: time });
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  useEffect(() => {
    if (selectedStartTime) {
      const startHour = parseInt(selectedStartTime.value.split(':')[0], 10);
      const updatedOptions = timeOptions.filter(
        (option) => parseInt(option.value.split(':')[0], 10) > startHour,
      );
      setEndTimeOptions(updatedOptions);
      setSelectedEndTime(updatedOptions[updatedOptions.length - 1]);
    }
  }, [selectedStartTime]);

  useEffect(() => {
    if (
      (meetingType === 'date' &&
        selectedDates.length > 0 &&
        selectedStartTime &&
        selectedEndTime) ||
      (meetingType === 'weekday' && selectedStartTime && selectedEndTime)
    ) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [meetingType, selectedDates, selectedStartTime, selectedEndTime]);

  return (
    <S.Wrapper>
      <S.Container>
        <h1>40초만에 일정 만들기</h1>
        <S.Section>
          <h2>
            어떤 방식으로 회의날짜를 정할까요?<span>*</span>
          </h2>
          <div>
            <S.Radio
              type="radio"
              id="date"
              name="meeting-type"
              value="date"
              checked={meetingType === 'date'}
              onChange={handleRadioChange}
            />
            <S.Label htmlFor="date">날짜 지정 - 기본</S.Label>
          </div>
          <div>
            <S.Radio
              type="radio"
              id="weekday"
              name="meeting-type"
              value="weekday"
              checked={meetingType === 'weekday'}
              onChange={handleRadioChange}
            />
            <S.Label htmlFor="weekday">요일 지정 - 정기회의용</S.Label>
          </div>
        </S.Section>
        <img src="/images/icon/downOutlined.png" alt="아래 화살표" />
        {meetingType === 'date' && (
          <DatePicker
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
          />
        )}
        <S.Section>
          <h2>
            회의 시간은<span>*</span>
          </h2>
          <S.SelectWrapper>
            <Select
              options={timeOptions}
              styles={S.SelectTimeStyles}
              onChange={(option) => setSelectedStartTime(option)}
              value={selectedStartTime}
              isSearchable={false}
            />
            <h3>보다 이후,</h3>
          </S.SelectWrapper>
          <S.SelectWrapper>
            <Select
              options={endTimeOptions}
              styles={S.SelectTimeStyles}
              onChange={(option) => setSelectedEndTime(option)}
              value={selectedEndTime}
              isSearchable={false}
            />
            <h3>보다 이전으로 선택할거예요</h3>
          </S.SelectWrapper>
        </S.Section>
        <S.Section style={{ marginBottom: '100px' }}>
          <h2>회의의 이름을 지어주세요</h2>
          <S.Input type="text" placeholder="선택" />
        </S.Section>
        <S.ButtonWrapper>
          <S.Button onClick={onClickButton} disabled={!isButtonEnabled}>
            일정 페이지 생성하기
          </S.Button>
        </S.ButtonWrapper>
      </S.Container>
    </S.Wrapper>
  );
}
