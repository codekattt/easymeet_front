import { useState, useEffect } from 'react';
import * as S from './timeTable.styles';

const days: string[] = ['월', '화', '수', '목', '금', '토', '일'];

interface SelectedTimes {
  [key: string]: boolean;
}

const generateTimeSlots = (start: number, end: number) => {
  const timeSlots: string[] = [];
  for (let i = start; i <= end; i++) {
    const hour = i < 10 ? `0${i}` : `${i}`;
    timeSlots.push(hour);
  }
  return timeSlots;
};

export default function TimeTable() {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<SelectedTimes>({});
  const [hours, setHours] = useState<string[]>([]);
  const [lastHour, setLastHour] = useState<string>('');
  const [rangeStart, setRangeStart] = useState<string | null>(null);

  useEffect(() => {
    const dbSelectedDays = ['월', '수', '금'];
    setSelectedDays(dbSelectedDays);
    const dbStartHour = 9;
    const dbEndHour = 18;
    setHours(generateTimeSlots(dbStartHour, dbEndHour));
    setLastHour((dbEndHour + 1).toString());
  }, []);

  const toggleTime = (day: string, time: string) => {
    const key = `${day}-${time}`;
    if (!rangeStart) {
      setRangeStart(key);
      setSelectedTimes((prev) => ({
        ...prev,
        [key]: true,
      }));
    } else {
      setSelectedTimes((prev) => {
        const newSelectedTimes = { ...prev };
        const rangeEnd = key;
        const [startDay, startTime] = rangeStart.split('-');
        const [endDay, endTime] = rangeEnd.split('-');

        if (startDay === endDay) {
          const startIndex = hours.indexOf(startTime.split('-')[0]);
          const endIndex = hours.indexOf(endTime.split('-')[0]);
          const startMin = startTime.split('-')[1];
          const endMin = endTime.split('-')[1];

          for (
            let i = Math.min(startIndex, endIndex);
            i <= Math.max(startIndex, endIndex);
            i++
          ) {
            newSelectedTimes[`${day}-${hours[i]}-00`] = true;
            newSelectedTimes[`${day}-${hours[i]}-30`] = true;
          }
        }
        return newSelectedTimes;
      });
      setRangeStart(null); // Reset range start
    }
  };

  return (
    <div>
      <h1>팀원 가능한 시간 선택</h1>
      <S.Wrapper>
        <S.Table>
          <thead>
            <tr>
              <th></th>
              {days.map((day) => (
                <S.HeaderCell key={day} isActive={selectedDays.includes(day)}>
                  {day}
                </S.HeaderCell>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map((hour) => (
              <>
                <tr key={`${hour}-00`}>
                  <th
                    style={{
                      paddingRight: '10px',
                      transform: 'translateY(-14px)',
                    }}
                  >
                    {hour}
                  </th>
                  {days.map((day) => {
                    const key = `${day}-${hour}-00`;
                    const isSelected = selectedTimes[key];
                    return (
                      <S.Cell
                        key={key}
                        isActive={selectedDays.includes(day)}
                        isSelected={isSelected}
                        onClick={() => toggleTime(day, `${hour}-00`)}
                      />
                    );
                  })}
                </tr>
                <tr key={`${hour}-30`}>
                  <th></th>
                  {days.map((day) => {
                    const key = `${day}-${hour}-30`;
                    const isSelected = selectedTimes[key];
                    return (
                      <S.Cell
                        key={key}
                        isActive={selectedDays.includes(day)}
                        isSelected={isSelected}
                        onClick={() => toggleTime(day, `${hour}-30`)}
                      />
                    );
                  })}
                </tr>
              </>
            ))}
            <tr>
              <th
                style={{ paddingRight: '10px', transform: 'translateY(-8px)' }}
              >
                {lastHour}
              </th>
            </tr>
          </tbody>
        </S.Table>
      </S.Wrapper>
    </div>
  );
}
