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

    // "MM. DD.HHmm" 형식을 고려하여 파싱
    const [currentMonth, currentDay, currentTime] =
      current.timeKey.split(/\. |\./);
    const [nextMonth, nextDay, nextTime] = next.timeKey.split(/\. |\./);

    if (
      !currentMonth ||
      !currentDay ||
      !currentTime ||
      !nextMonth ||
      !nextDay ||
      !nextTime
    ) {
      console.error(
        `잘못된 timeKey 형식: ${current.timeKey} 또는 ${next.timeKey}`,
      );
      continue;
    }

    const isSameDay = currentMonth === nextMonth && currentDay === nextDay;
    const currentHourNum = parseInt(currentTime.slice(0, 2), 10);
    const nextHourNum = parseInt(nextTime.slice(0, 2), 10);
    const currentMinNum = parseInt(currentTime.slice(2, 4), 10);
    const nextMinNum = parseInt(nextTime.slice(2, 4), 10);

    if (
      isSameDay &&
      // 다음 시간대가 현재 시간대의 30분 후인지 확인
      ((nextHourNum === currentHourNum && nextMinNum === currentMinNum + 30) ||
        (currentMinNum === 30 &&
          nextHourNum === currentHourNum + 1 &&
          nextMinNum === 0))
    ) {
      current.isContiguous = true;
      next.isContiguous = true;
    }
  }

  // 3. 연속된 시간대 고려하여 최적 시간 찾기
  const bestTimeSlot = sortedTimes.find((slot, index) => {
    if (!duration) return true; // duration이 없으면 첫 번째 후보 반환
    // duration이 있는 경우 연속된 시간이 있는지 확인
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
  const [bestMonth, bestDay, bestTime] = bestTimeSlot.timeKey.split(/\. |\./);
  if (!bestMonth || !bestDay || !bestTime) {
    console.error(`잘못된 timeKey 형식: ${bestTimeSlot.timeKey}`);
    return null;
  }

  const bestHour = bestTime.slice(0, 2);
  const bestMin = bestTime.slice(2, 4);

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
