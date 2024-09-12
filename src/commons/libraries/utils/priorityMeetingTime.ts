type TimeSlot = {
  timeKey: string;
  count: number;
  isContiguous: boolean;
};

export function getBestMeetingTime(
  selectedTimesCount: { [key: string]: number },
  duration: number | null,
  daysFromDB: { date: string; day: string }[],
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

    // 시간대가 연속되어 있는지 확인
    const isSameDay = current.timeKey.slice(0, 8) === next.timeKey.slice(0, 8); // 날짜가 같은지 확인
    const currentHour = parseInt(current.timeKey.slice(8, 10));
    const nextHour = parseInt(next.timeKey.slice(8, 10));
    const currentMin = parseInt(current.timeKey.slice(10));
    const nextMin = parseInt(next.timeKey.slice(10));

    if (
      isSameDay &&
      (nextHour === currentHour + 1 ||
        (nextHour === currentHour && nextMin > currentMin))
    ) {
      current.isContiguous = true;
      next.isContiguous = true;
    }
  }

  // 3. 연속된 시간대 고려하여 최적 시간 찾기
  const bestTimeSlot = sortedTimes.find((slot) => {
    if (!duration) return true; // duration이 없으면 첫 번째 후보 반환
    // duration이 있는 경우 연속된 시간이 있는지 확인
    const startTimeKey = slot.timeKey;
    const requiredSlots = Math.ceil(duration / 0.5); // 반시간 단위로 필요한 슬롯 수 계산

    let contiguousCount = 0;
    for (let i = 0; i < sortedTimes.length; i++) {
      const checkSlot = sortedTimes[i];
      if (checkSlot.timeKey === startTimeKey || checkSlot.isContiguous) {
        contiguousCount++;
        if (contiguousCount >= requiredSlots) {
          return true; // 연속된 시간이 충분하다면 이 시간대 선택
        }
      } else {
        contiguousCount = 0;
      }
    }
    return false; // 조건을 만족하는 시간이 없다면 다른 후보 탐색
  });

  if (!bestTimeSlot) return null;

  // 4. 최종 선택된 시간대의 날짜 및 시간 반환
  const bestDayKey = bestTimeSlot.timeKey.slice(0, 8); // 날짜 정보
  const bestHour = bestTimeSlot.timeKey.slice(8, 10); // 시간 정보
  const bestMin = bestTimeSlot.timeKey.slice(10) === '00' ? '00' : '30'; // 00 또는 30분

  const bestDayObj = daysFromDB.find(
    (day) => day.date.replace('/', '') === bestDayKey,
  );
  const bestDay = bestDayObj ? `${bestDayObj.date} ${bestDayObj.day}` : '';

  return { bestTime: `${bestHour}:${bestMin}`, bestDay };
}
