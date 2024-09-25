type TimeSlot = {
  timeKey: string;
  count: number;
  isContiguous: boolean;
};

export function getBestMeetingTime(
  selectedTimesCount: { [key: string]: number },
  duration: number | null,
  daysForBestTime: { date: string; day: string }[],
): { bestTime: string; bestDay: string } | null {
  // 1. 팀원이 선택한 시간대를 배열로 변환 및 정렬
  const sortedTimes: TimeSlot[] = Object.keys(selectedTimesCount)
    .map((timeKey) => ({
      timeKey,
      count: selectedTimesCount[timeKey],
      isContiguous: false, // 연속된 시간대 확인용
    }))
    .sort((a, b) => b.count - a.count); // 팀원이 가장 많이 선택한 시간대로 정렬

  if (sortedTimes.length === 0) return null;

  // 2. 연속된 시간대 계산
  for (let i = 0; i < sortedTimes.length - 1; i++) {
    const current = sortedTimes[i];
    const next = sortedTimes[i + 1];

    // "MMDDHHmm" 형식으로 파싱
    const currentMonth = current.timeKey.slice(0, 2); // "09"
    const currentDay = current.timeKey.slice(2, 4); // "23"
    const currentHour = parseInt(current.timeKey.slice(4, 6), 10); // "10"
    const currentMin = parseInt(current.timeKey.slice(6, 8), 10); // "00"

    const nextMonth = next.timeKey.slice(0, 2); // "09"
    const nextDay = next.timeKey.slice(2, 4); // "23"
    const nextHour = parseInt(next.timeKey.slice(4, 6), 10); // "10"
    const nextMin = parseInt(next.timeKey.slice(6, 8), 10); // "30"

    const isSameDay = currentMonth === nextMonth && currentDay === nextDay;

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
  const bestTimeSlot = sortedTimes.find((slot, index) => {
    if (!duration) return true; // duration이 없으면 첫 번째 후보 반환

    const SLOT_DURATION = 0.5; // 반시간 단위
    const requiredSlots = Math.ceil(duration / SLOT_DURATION); // 필요한 슬롯 수 계산

    let contiguousCount = 1;
    for (
      let i = index + 1;
      i < sortedTimes.length && contiguousCount < requiredSlots;
      i++
    ) {
      if (sortedTimes[i].isContiguous) {
        contiguousCount++;
      } else {
        break;
      }
    }
    return contiguousCount >= requiredSlots;
  });

  if (!bestTimeSlot) return null;

  // 4. 최종 선택된 시간대의 날짜 및 시간 반환
  const bestMonth = bestTimeSlot.timeKey.slice(0, 2); // "09"
  const bestDay = bestTimeSlot.timeKey.slice(2, 4); // "23"
  const bestHour = bestTimeSlot.timeKey.slice(4, 6); // "10"
  const bestMin = bestTimeSlot.timeKey.slice(6, 8); // "00"

  const bestDayObj = daysForBestTime.find(
    (day) => day.date === `${bestMonth}${bestDay}`, // "MMDD"와 일치
  );
  if (!bestDayObj) {
    console.error(`날짜 매칭 실패: ${bestMonth}${bestDay}`);
    return null;
  }

  const bestDayFormatted = `${parseInt(bestMonth, 10)}월 ${parseInt(
    bestDay,
    10,
  )}일 ${bestDayObj.day}요일`;

  return { bestTime: `${bestHour}:${bestMin}`, bestDay: bestDayFormatted };
}
