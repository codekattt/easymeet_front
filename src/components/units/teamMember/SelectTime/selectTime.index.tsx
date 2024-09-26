import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import TimeTable from '../../../commons/timeTable/timeTable.index';
import * as S from './selectTime.styles';
import { doc, getDoc, collection, setDoc } from 'firebase/firestore';
import { db } from '../../../../commons/libraries/firebase';

export default function SelectTime() {
  const router = useRouter();
  const { meetingId, name } = router.query; // URL에서 team member 이름을 받아옴
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const [timesFromDB, setTimesFromDB] = useState<number[]>([]);
  const [daysFromDB, setDaysFromDB] = useState<{ date: string; day: string }[]>(
    [],
  );
  const [selectedCells, setSelectedCells] = useState<string[]>([]); // 선택된 시간을 저장
  const [meetingType, setMeetingType] = useState<'date' | 'weekday'>('date'); // meetingType 추가

  const [duration, setDuration] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);

  // TimeTable 컴포넌트에서 선택된 셀 데이터 받아서 저장
  const handleSelectionChange = (cells: string[]) => {
    setSelectedCells(cells);
    setIsButtonEnabled(cells.length > 0);
  };

  // Firestore에서 회의 및 팀원 데이터를 불러오기
  useEffect(() => {
    const fetchMeetingData = async () => {
      if (meetingId) {
        const docRef = doc(db, 'meetings', meetingId as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const meetingData = docSnap.data();
          const {
            dates,
            startTime,
            endTime,
            duration,
            location,
            customLocation,
            type,
          } = meetingData;

          // 회의 타입 설정
          setMeetingType(type || 'date');

          let parsedDays;
          if (type === 'date') {
            // 날짜를 daysFromDB 형식으로 변환
            parsedDays = dates.map((date: string) => ({
              date: new Date(date).toLocaleDateString('ko-KR', {
                month: '2-digit',
                day: '2-digit',
              }),
              day: new Date(date).toLocaleDateString('ko-KR', {
                weekday: 'short',
              }),
            }));
          } else {
            // 요일을 daysFromDB 형식으로 변환
            parsedDays = dates.map((day: string) => ({
              date: day,
              day: day,
            }));
          }

          // 시간 범위 생성 (시작 시간 ~ 종료 시간)
          const parsedTimes = generateTimeRange(startTime, endTime);

          // 회의 정보 설정
          setDuration(duration || null);
          setLocation(customLocation || location || null);
          setTimesFromDB(parsedTimes);
          setDaysFromDB(parsedDays);
        } else {
          console.log('No such document!');
        }
      }
    };

    const fetchTeamMemberData = async () => {
      if (meetingId && name) {
        // teamMembers 컬렉션에서 해당 팀원의 문서 가져오기
        const teamMemberRef = doc(
          db,
          'meetings',
          meetingId as string,
          'teamMembers',
          name as string, // 이름으로 문서 참조
        );
        const teamMemberSnap = await getDoc(teamMemberRef);

        if (teamMemberSnap.exists()) {
          const teamMemberData = teamMemberSnap.data();

          // 팀원이 이미 선택한 시간이 있는 경우, selectedCells에 저장
          if (teamMemberData.selectedTimes) {
            setSelectedCells(teamMemberData.selectedTimes); // 선택된 시간을 상태로 설정
          }
        }
      }
    };

    fetchMeetingData();
    fetchTeamMemberData();
  }, [meetingId, name]);

  // 시간 범위를 생성하는 함수 (startTime ~ endTime)
  const generateTimeRange = (startTime: string, endTime: string): number[] => {
    const startHour = parseInt(startTime.split(':')[0], 10);
    const endHour = parseInt(endTime.split(':')[0], 10);

    const times = [];
    for (let i = startHour; i <= endHour; i++) {
      times.push(i);
    }
    return times;
  };

  // 선택된 시간을 teamMembers 컬렉션에 저장하는 함수
  const onClickButton = async () => {
    if (meetingId && selectedCells.length > 0 && name) {
      const teamMemberDocRef = doc(
        collection(db, 'meetings', meetingId as string, 'teamMembers'),
        name as string,
      );
      try {
        await setDoc(teamMemberDocRef, { selectedTimes: selectedCells });
        router.push(`/teammember?step=summary&meetingId=${meetingId}`);
      } catch (error) {
        console.error('Error saving selected times:', error);
      }
    }
  };

  const isMeetingInfoEmpty = !duration && !location;

  return (
    <S.Wrapper>
      <S.Container>
        {!isMeetingInfoEmpty && (
          <>
            <S.Section>
              <h2>회의정보</h2>
              {duration && (
                <h3>
                  <span>{duration}</span> 동안
                </h3>
              )}
              {location && (
                <h3>
                  <span>{location}</span>에서
                </h3>
              )}
              <h3>진행됩니다.</h3>
            </S.Section>
            <img
              src="/images/icon/DownOutlined.png"
              alt="아래 화살표"
              style={{ marginBottom: '12px' }}
            />
          </>
        )}
        <S.Section style={{ marginBottom: '120px' }}>
          <h2>회의 가능한 시간을 알려주세요</h2>
          <h3 style={{ marginBottom: '20px' }}>
            가능한 시작 시간과, 끝 시간을 클릭!
          </h3>
          <TimeTable
            timesFromDB={timesFromDB}
            daysFromDB={daysFromDB}
            selectedCells={selectedCells} // 선택된 셀 전달
            onSelectionChange={handleSelectionChange}
            meetingType={meetingType}
          />
        </S.Section>

        <S.ButtonWrapper>
          <S.Button onClick={onClickButton} disabled={!isButtonEnabled}>
            가능 시간 제출하기
          </S.Button>
        </S.ButtonWrapper>
      </S.Container>
    </S.Wrapper>
  );
}
