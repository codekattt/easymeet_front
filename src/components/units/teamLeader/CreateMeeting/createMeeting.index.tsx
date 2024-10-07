import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DatePicker from '../../../commons/datePicker/datePicker.index';
import Select, { SingleValue } from 'react-select';
import * as S from './createMeeting.styles';

import { db } from '../../../../commons/libraries/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function CreateMeeting() {
  const router = useRouter();
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [meetingType, setMeetingType] = useState('date');
  const [meetingName, setMeetingName] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  // 요일 선택을 위한 상태
  const [selectedWeekdays, setSelectedWeekdays] = useState<string[]>([]);

  const [selectedStartTime, setSelectedStartTime] = useState<
    SingleValue<{ value: string; label: string }>
  >({
    value: '07:00',
    label: '07:00',
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

  const weekdays = [
    { value: '월', label: '월' },
    { value: '화', label: '화' },
    { value: '수', label: '수' },
    { value: '목', label: '목' },
    { value: '금', label: '금' },
    { value: '토', label: '토' },
    { value: '일', label: '일' },
  ];

  const onChangeMeetingName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMeetingName(event.target.value);
  };

  const onChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMeetingType(event.target.value);
  };

  const handleWeekdayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setSelectedWeekdays((prev) =>
      checked ? [...prev, value] : prev.filter((day) => day !== value),
    );
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
      (meetingType === 'weekday' &&
        selectedWeekdays.length > 0 &&
        selectedStartTime &&
        selectedEndTime)
    ) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [
    meetingType,
    selectedDates,
    selectedWeekdays,
    selectedStartTime,
    selectedEndTime,
  ]);

  const saveDataToFB = async () => {
    const formattedDates =
      meetingType === 'date'
        ? selectedDates
            .sort((a, b) => a.getTime() - b.getTime())
            .map((date) => {
              const year = date.getFullYear();
              const month = (date.getMonth() + 1).toString().padStart(2, '0');
              const day = date.getDate().toString().padStart(2, '0');
              return `${year}-${month}-${day}`;
            })
        : selectedWeekdays; // 사용자가 선택한 요일만 저장

    const meetingData = {
      type: meetingType,
      dates: formattedDates,
      startTime: selectedStartTime?.value || '09:00',
      endTime: selectedEndTime?.value || '24:00',
      meetingName: meetingName || '',
      createAt: Timestamp.now(),
    };

    try {
      const docRef = await addDoc(collection(db, 'meetings'), meetingData);
      const meetingId = docRef.id;
      router.push(`/teamleader?step=add&meetingId=${meetingId}`);
    } catch (error) {
      console.error('Error saving meeting: ', error);
    }
  };

  const onClickButton = () => {
    saveDataToFB();
    router.push('/teamleader?step=add');
  };

  return (
    <S.Wrapper>
      <S.Container>
        <h1>40초만에 일정 만들기</h1>
        <S.Section>
          <h2>
            어떤 방식으로 회의날짜를 정할까요?<span>*</span>
          </h2>
          <S.RadioWrapper>
            <S.Radio
              type="radio"
              id="date"
              name="meeting-type"
              value="date"
              checked={meetingType === 'date'}
              onChange={onChangeRadio}
            />
            <S.Label htmlFor="date">날짜 지정 - 기본</S.Label>
          </S.RadioWrapper>
          <S.RadioWrapper>
            <S.Radio
              type="radio"
              id="weekday"
              name="meeting-type"
              value="weekday"
              checked={meetingType === 'weekday'}
              onChange={onChangeRadio}
            />
            <S.Label htmlFor="weekday">요일 지정 - 정기회의용</S.Label>
          </S.RadioWrapper>
        </S.Section>
        <img src="/images/icons/common/DownOutlined.png" alt="아래 화살표" />
        {meetingType === 'date' && (
          <DatePicker
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
          />
        )}
        {meetingType === 'weekday' && (
          <S.Section>
            <h2>원하는 요일을 선택하세요</h2>
            <div style={{ display: 'flex', gap: '8px' }}>
              {weekdays.map((day) => (
                <label
                  key={day.value}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: selectedWeekdays.includes(day.value)
                      ? '#4A90E2'
                      : '#f0f0f0',
                    color: selectedWeekdays.includes(day.value)
                      ? 'white'
                      : 'black',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  <input
                    type="checkbox"
                    value={day.value}
                    checked={selectedWeekdays.includes(day.value)}
                    onChange={handleWeekdayChange}
                    style={{
                      display: 'none',
                    }}
                  />
                  {day.label}
                </label>
              ))}
            </div>
          </S.Section>
        )}
        <S.Section style={{ display: 'none' }}>
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
          <S.Input
            type="text"
            placeholder="선택"
            value={meetingName}
            onChange={onChangeMeetingName}
          />
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
