import { useState } from 'react';
import * as S from './createMeeting.styles';
import DatePicker from '../../../commons/datePicker/datePicker.index';
import TimeTable from '../../../commons/timeTable/timeTable.index';

interface CreateMeetingProps {
  nextStep: () => void;
}

export default function CreateMeeting({ nextStep }: CreateMeetingProps) {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  return (
    <S.Wrapper>
      <S.Container>
        <h1>40초만에 일정 만들기</h1>
        <S.Section>
          <h2>어떤 방식으로 회의날짜를 정할까요?</h2>
          <div>
            <S.Radio type="radio" id="date" name="meeting-type" />
            <S.Label htmlFor="date">날짜 지정 - 기본</S.Label>
          </div>
          <div>
            <S.Radio type="radio" id="weekday" name="meeting-type" />
            <S.Label htmlFor="weekday">요일 지정 - 정기회의용</S.Label>
          </div>
        </S.Section>
        <img src="/images/icon/downOutlined.png" alt="아래 화살표" />
        <DatePicker
          selectedDates={selectedDates}
          setSelectedDates={setSelectedDates}
        />
        <S.Section>
          <h1>회의 시간은</h1>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: '15px',
            }}
          >
            <S.InputTime type="time" /> <h3>보다 이후,</h3>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <S.InputTime type="time" /> <h3>보다 이전으로 선택할거예요</h3>
          </div>
        </S.Section>
        <S.Section>
          <h1>회의의 이름을 지어주세요</h1>
          <S.Input type="text" placeholder="선택" />
        </S.Section>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '30px',
            marginBottom: '30px',
          }}
        >
          <S.Button onClick={nextStep}>일정 페이지 생성하기</S.Button>
        </div>
      </S.Container>
    </S.Wrapper>
  );
}
