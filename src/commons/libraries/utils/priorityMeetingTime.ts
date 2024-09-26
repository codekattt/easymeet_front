type TimeSlot = {
  timeKey: string;
  count: number;
  isContiguous: boolean;
};

export function getBestMeetingTime(
  selectedTimesCount: { [key: string]: number },
  duration: number | null,
  daysForBestTime: { date: string; day: string }[],
  meetingType: 'date' | 'weekday',
): { bestTime: string; bestDay: string } | null {
  // 1. 팀원이 선택한 시간대를 배열로 변환 및 정렬
  const sortedTimes: TimeSlot[] = Object.keys(selectedTimesCount)
    .map((timeKey) => ({
      timeKey,
      count: selectedTimesCount[timeKey],
      isContiguous: false, // 연속된 시간대 확인용
    }))
    .sort((a, b) => b.count - a.count || a.timeKey.localeCompare(b.timeKey)); // 팀원이 가장 많이 선택한 시간대로 정렬, 동일한 경우 시간순 정렬

  if (sortedTimes.length === 0) return null;

  // 2. 연속된 시간대 계산
  for (let i = 0; i < sortedTimes.length - 1; i++) {
    const current = sortedTimes[i];
    const next = sortedTimes[i + 1];

    let isSameDay = false;
    let currentHour: number, currentMin: number;
    let nextHour: number, nextMin: number;

    if (meetingType === 'date') {
      // "MMDDHHmm" 형식으로 파싱
      const currentMonth = current.timeKey.slice(0, 2);
      const currentDay = current.timeKey.slice(2, 4);
      currentHour = parseInt(current.timeKey.slice(4, 6), 10);
      currentMin = parseInt(current.timeKey.slice(6, 8), 10);

      const nextMonth = next.timeKey.slice(0, 2);
      const nextDay = next.timeKey.slice(2, 4);
      nextHour = parseInt(next.timeKey.slice(4, 6), 10);
      nextMin = parseInt(next.timeKey.slice(6, 8), 10);

      isSameDay = currentMonth === nextMonth && currentDay === nextDay;
    } else {
      // "요일HHmm" 형식으로 파싱
      const currentDayChar = current.timeKey.slice(0, 1); // "월", "화", ...
      currentHour = parseInt(current.timeKey.slice(1, 3), 10);
      currentMin = parseInt(current.timeKey.slice(3), 10); // 수정

      const nextDayChar = next.timeKey.slice(0, 1);
      nextHour = parseInt(next.timeKey.slice(1, 3), 10);
      nextMin = parseInt(next.timeKey.slice(3), 10); // 수정

      isSameDay = currentDayChar === nextDayChar;
    }

    if (isSameDay) {
      // 현재 시간대의 30분 후인지 확인
      if (
        (nextHour === currentHour && nextMin === currentMin + 30) ||
        (currentMin === 30 && nextHour === currentHour + 1 && nextMin === 0)
      ) {
        current.isContiguous = true;
        next.isContiguous = true;
      }
    }
  }

  // 3. 연속된 시간대 고려하여 최적 시간 찾기
  let bestTimeSlot: TimeSlot | null = null;

  for (let i = 0; i < sortedTimes.length; i++) {
    const slot = sortedTimes[i];
    if (!duration) {
      bestTimeSlot = slot;
      break;
    }

    const SLOT_DURATION = 0.5; // 30분 단위
    const requiredSlots = Math.ceil(duration / SLOT_DURATION);

    let contiguousCount = 1;
    let j = i;

    while (contiguousCount < requiredSlots && j < sortedTimes.length - 1) {
      if (sortedTimes[j].isContiguous) {
        contiguousCount++;
        j++;
      } else {
        break;
      }
    }

    if (contiguousCount >= requiredSlots) {
      bestTimeSlot = slot;
      break;
    }
  }

  if (!bestTimeSlot) return null;

  // 4. 최종 선택된 시간대의 날짜 및 시간 반환
  let bestDayKey: string;
  let bestHour: string;
  let bestMin: string;

  if (meetingType === 'date') {
    const bestMonth = bestTimeSlot.timeKey.slice(0, 2);
    const bestDay = bestTimeSlot.timeKey.slice(2, 4);
    bestHour = bestTimeSlot.timeKey.slice(4, 6);
    bestMin = bestTimeSlot.timeKey.slice(6, 8);
    bestDayKey = `${bestMonth}${bestDay}`; // "MMDD";
  } else {
    const bestDayChar = bestTimeSlot.timeKey.slice(0, 1); // "수";
    bestHour = bestTimeSlot.timeKey.slice(1, 3); // "12";
    bestMin = bestTimeSlot.timeKey.slice(3); // 수정: 끝 인덱스 생략
    bestDayKey = bestDayChar; // "수";
  }

  // 디버깅 로그 추가
  console.log(`bestTimeSlot.timeKey: ${bestTimeSlot.timeKey}`);
  console.log(`bestDayKey: ${bestDayKey}`);
  console.log(`bestHour: ${bestHour}`);
  console.log(`bestMin: ${bestMin}`);

  const bestDayObj = daysForBestTime.find((day) => {
    if (meetingType === 'date') {
      return day.date === bestDayKey; // "MMDD" 형식으로 비교
    } else {
      return day.day === bestDayKey; // "수" 등 요일 문자로 비교
    }
  });

  let bestDayFormatted: string;
  if (meetingType === 'date') {
    const month = parseInt(bestDayKey.slice(0, 2), 10);
    const day = parseInt(bestDayKey.slice(2, 4), 10);
    bestDayFormatted = `${month}월 ${day}일 ${bestDayObj?.day}요일`;
  } else {
    bestDayFormatted = `${bestDayObj?.day}요일`;
  }

  return { bestTime: `${bestHour}:${bestMin}`, bestDay: bestDayFormatted };
}
