import { doc, collection, getDocs, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { db } from '../../../../commons/libraries/firebase';
import TimeTable from '../../../commons/timeTable/timeTable.index';
import { getBestMeetingTime } from '../../../../commons/libraries/utils/priorityMeetingTime';
import * as S from './summary.styles';

export default function Summary() {
  const router = useRouter();
  const { meetingId } = router.query;
  const [timesFromDB, setTimesFromDB] = useState<number[]>([]);
  const [daysFromDB, setDaysFromDB] = useState<{ date: string; day: string }[]>(
    [],
  );
  const [duration, setDuration] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [bestMeetingTime, setBestMeetingTime] = useState<string | null>(null); // 최적 시간 저장
  const [mergedSelectedTimes, setMergedSelectedTimes] = useState<{
    [key: string]: number;
  }>({});

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
          } = meetingData;

          const parsedDays = dates.map((date: string) => ({
            date: new Date(date).toLocaleDateString('ko-KR', {
              month: '2-digit',
              day: '2-digit',
            }),
            day: new Date(date).toLocaleDateString('ko-KR', {
              weekday: 'short',
            }),
          }));

          const parsedTimes = generateTimeRange(startTime, endTime);

          setDuration(duration || null);
          setLocation(customLocation || location || '장소 미정');

          setTimesFromDB(parsedTimes);
          setDaysFromDB(parsedDays);

          // 팀원의 selectedTimes 가져오기
          fetchTeamMembersTimes();
        }
      }
    };

    const fetchTeamMembersTimes = async () => {
      if (meetingId) {
        const teamMembersRef = collection(
          db,
          'meetings',
          meetingId as string,
          'teamMembers',
        );
        const teamMembersSnap = await getDocs(teamMembersRef);

        const selectedTimesCount: { [key: string]: number } = {};

        teamMembersSnap.forEach((doc) => {
          const data = doc.data();
          const selectedTimes = data.selectedTimes || [];

          selectedTimes.forEach((time: string) => {
            if (!selectedTimesCount[time]) {
              selectedTimesCount[time] = 0;
            }
            selectedTimesCount[time] += 1;
          });
        });

        setMergedSelectedTimes(selectedTimesCount);

        // 우선순위에 따라 최적의 시간 계산
        const bestTimeResult = getBestMeetingTime(
          selectedTimesCount,
          duration ? parseInt(duration) : null,
          daysFromDB,
        );
        if (bestTimeResult) {
          setBestMeetingTime(
            `${bestTimeResult.bestDay} ${bestTimeResult.bestTime}`,
          );
        }
      }
    };

    fetchMeetingData();
  }, [meetingId, daysFromDB, duration]);

  // startTime과 endTime을 받아서 시간 배열을 생성하는 함수
  const generateTimeRange = (startTime: string, endTime: string): number[] => {
    const startHour = parseInt(startTime.split(':')[0], 10); // 시작 시간의 시간 부분 추출
    const endHour = parseInt(endTime.split(':')[0], 10); // 종료 시간의 시간 부분 추출

    const times: number[] = [];
    for (let i = startHour; i <= endHour; i++) {
      times.push(i); // 시간대를 배열에 추가
    }
    return times; // 생성된 시간 배열 반환
  };

  return (
    <S.Wrapper>
      <S.Container>
        <S.RowWrapper>
          <img src="/images/icon/check_icon.apng" />
          <h1>가능 시간 설정 완료</h1>
        </S.RowWrapper>
        <S.Section>
          <h2>지금까지 유력한 회의 정보</h2>
          <S.RowWrapper>
            <img src="/images/icon/CalendarOutlined.png" />
            <h2>{bestMeetingTime || '회의 시간 미정'}</h2>
          </S.RowWrapper>
          <S.RowWrapper>
            <img src="/images/icon/ClockCircleOutlined.png" />
            <h2>{duration ? `${duration} 동안` : '회의 시간 미정'}</h2>
          </S.RowWrapper>
          <S.RowWrapper>
            <img src="/images/icon/PushpinOutlined.png" />
            <h2>{location}</h2>
          </S.RowWrapper>
        </S.Section>
        <S.Section>
          <TimeTable
            timesFromDB={timesFromDB}
            daysFromDB={daysFromDB}
            selectedCells={Object.keys(mergedSelectedTimes)}
            selectedCounts={mergedSelectedTimes}
            isReadOnly
          />
        </S.Section>
      </S.Container>
    </S.Wrapper>
  );
}
