import { useState } from 'react';
import * as S from './createMeeting.styles';
import DatePicker from '../../../commons/datePicker/datePicker.index';
import Select from 'react-select';

interface CreateMeetingProps {
  nextStep: () => void;
}

export default function CreateMeeting({ nextStep }: CreateMeetingProps) {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [meetingType, setMeetingType] = useState('date');

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
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: '15px',
            }}
          >
            <Select options={timeOptions} styles={S.SelectTimeStyles} />
            <h3>보다 이후,</h3>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Select options={timeOptions} styles={S.SelectTimeStyles} />
            <h3>보다 이전으로 선택할거예요</h3>
          </div>
        </S.Section>
        <S.Section>
          <h2>회의의 이름을 지어주세요</h2>
          <S.Input type="text" placeholder="선택" />
        </S.Section>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <S.Button onClick={nextStep}>일정 페이지 생성하기</S.Button>
        </div>
      </S.Container>
    </S.Wrapper>
  );
}
