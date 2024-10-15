import { doc, collection, getDocs, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { db } from '../../../../commons/libraries/firebase';
import TimeTable from '../../../commons/timeTable/timeTable.index';
import { getBestMeetingTime } from '../../../../commons/libraries/utils/getBestMeetingTime';
import * as S from './summary.styles';

export default function Summary() {
  const router = useRouter();
  const { meetingId } = router.query;
  const [timesFromDB, setTimesFromDB] = useState<number[]>([]);
  const [daysForBestTime, setDaysForBestTime] = useState<
    { date: string; day: string }[]
  >([]);
  const [daysFromDB, setDaysFromDB] = useState<{ date: string; day: string }[]>(
    [],
  );

  const [meetingType, setMeetingType] = useState<'date' | 'weekday'>('date'); // 기본값은 'date'
  const [duration, setDuration] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [bestMeetingTime, setBestMeetingTime] = useState<string | null>(null); // 최적 시간 저장
  const [mergedSelectedTimes, setMergedSelectedTimes] = useState<{
    [key: string]: number;
  }>({});
  const [selectedBy, setSelectedBy] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    const fetchMeetingData = async () => {
      if (meetingId) {
        try {
          const docRef = doc(db, 'meetings', meetingId as string);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const meetingData = docSnap.data();
            const {
              dates,
              startTime,
              endTime,
              duration: fetchedDuration,
              location,
              customLocation,
              type,
            } = meetingData;

            setMeetingType(type || 'date');

            let parsedDaysForBestTime;
            let parsedDaysForTimeTable;

            if (type === 'date') {
              // 날짜 지정 방식
              parsedDaysForBestTime = dates.map((date: string) => {
                const dateObj = new Date(date);
                const month = (dateObj.getMonth() + 1)
                  .toString()
                  .padStart(2, '0');
                const day = dateObj.getDate().toString().padStart(2, '0');
                return {
                  date: `${month}${day}`, // "0925"
                  day: dateObj.toLocaleDateString('ko-KR', {
                    weekday: 'short',
                  }),
                };
              });

              // TimeTable 렌더링용 날짜 리스트 ("MM. DD")
              parsedDaysForTimeTable = dates.map((date: string) => ({
                date: new Date(date).toLocaleDateString('ko-KR', {
                  month: '2-digit',
                  day: '2-digit',
                }),
                day: new Date(date).toLocaleDateString('ko-KR', {
                  weekday: 'short',
                }),
              }));
            } else {
              // 요일 지정 방식
              parsedDaysForBestTime = dates.map((day: string) => ({
                date: day, // "월", "화", ...
                day: day,
              }));

              // TimeTable 렌더링용 요일 리스트
              parsedDaysForTimeTable = dates.map((day: string) => ({
                date: day, // "월", "화", ...
                day: day,
              }));
            }

            const parsedTimes = generateTimeRange(startTime, endTime);

            setDuration(fetchedDuration || null);
            setLocation(customLocation || location || '장소 미정');

            setTimesFromDB(parsedTimes);
            setDaysForBestTime(parsedDaysForBestTime);
            setDaysFromDB(parsedDaysForTimeTable);

            // 팀원의 선택 시간을 가져옵니다.
            fetchTeamMembersTimes(parsedDaysForBestTime, fetchedDuration, type);
          }
        } catch (error) {
          console.error('회의 데이터를 가져오는 중 오류 발생:', error);
        }
      }
    };

    fetchMeetingData();
  }, [meetingId]);

  const fetchTeamMembersTimes = async (
    parsedDaysForBestTime: { date: string; day: string }[],
    fetchedDuration: string,
    meetingType: 'date' | 'weekday',
  ) => {
    if (meetingId) {
      try {
        const teamMembersRef = collection(
          db,
          'meetings',
          meetingId as string,
          'teamMembers',
        );
        const teamMembersSnap = await getDocs(teamMembersRef);

        const selectedTimesCount: { [key: string]: number } = {};
        const selectedBy: { [key: string]: string[] } = {}; // 각 셀을 선택한 사람들 정보

        teamMembersSnap.forEach((doc) => {
          const data = doc.data();
          const selectedTimes = data.selectedTimes || [];
          const teamMemberName = doc.id || '알 수 없는 사용자'; // 팀원 이름

          selectedTimes.forEach((time: string) => {
            if (!selectedTimesCount[time]) {
              selectedTimesCount[time] = 0;
              selectedBy[time] = [];
            }
            selectedTimesCount[time] += 1;
            selectedBy[time].push(teamMemberName); // 셀을 선택한 사람의 이름을 추가
          });
        });

        setMergedSelectedTimes(selectedTimesCount);
        setSelectedBy(selectedBy); // 말풍선으로 보여줄 데이터 설정

        // 우선순위에 따라 최적의 시간 계산
        const bestTimeResult = getBestMeetingTime(
          selectedTimesCount,
          fetchedDuration ? parseFloat(fetchedDuration) : null,
          parsedDaysForBestTime,
          meetingType,
        );
        if (bestTimeResult) {
          setBestMeetingTime(
            `${bestTimeResult.bestDay} ${bestTimeResult.bestTime}`,
          );
        } else {
          console.warn('최적의 회의 시간을 찾을 수 없습니다.');
        }
      } catch (error) {
        console.error('팀원 시간 데이터를 가져오는 중 오류 발생:', error);
      }
    }
  };

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
          <img
            src="/images/icons/animated/check_icon.apng"
            style={{ width: '40px' }}
          />
          <S.Title>
            가능 시간 <span>설정 완료</span>
          </S.Title>
        </S.RowWrapper>
        <S.Section>
          <h2>지금까지 유력한 회의 정보</h2>
          <S.RowWrapper>
            <img src="/images/icons/common/CalendarOutlined.png" />
            <h3>{bestMeetingTime || '가능 시간 미정'}</h3>
          </S.RowWrapper>
          <S.RowWrapper>
            <img src="/images/icons/common/ClockCircleOutlined.png" />
            <h3>{duration ? `${duration} 동안` : '총 회의 시간 미정'}</h3>
          </S.RowWrapper>
          <S.RowWrapper>
            <img src="/images/icons/common/PushpinOutlined.png" />
            <h3>{location}</h3>
          </S.RowWrapper>
        </S.Section>
        <S.Section>
          <TimeTable
            timesFromDB={timesFromDB}
            daysFromDB={daysFromDB}
            selectedCells={Object.keys(mergedSelectedTimes)}
            selectedCounts={mergedSelectedTimes}
            selectedBy={selectedBy}
            meetingType={meetingType}
            isReadOnly
          />
        </S.Section>
      </S.Container>
    </S.Wrapper>
  );
}
