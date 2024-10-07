import { useState } from 'react';
import * as S from './datePicker.styles';

interface DatePickerProps {
  selectedDates: Date[];
  setSelectedDates: (dates: Date[]) => void;
}

export default function DatePicker({
  selectedDates,
  setSelectedDates,
}: DatePickerProps): JSX.Element {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [warningMessage, setWarningMessage] = useState('');

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const maxDate = new Date();
  maxDate.setHours(0, 0, 0, 0);
  maxDate.setMonth(maxDate.getMonth() + 4, 0);

  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const onClickPrevMonth = () => {
    const isAtMinMonth =
      currentYear === today.getFullYear() && currentMonth === today.getMonth();

    if (isAtMinMonth) {
      return; // 더 이상 이전 달로 이동하지 않음
    }

    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const onClickNextMonth = () => {
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;

    const isAfterMaxMonth =
      nextYear > maxDate.getFullYear() ||
      (nextYear === maxDate.getFullYear() && nextMonth > maxDate.getMonth());

    if (isAfterMaxMonth) {
      return; // 더 이상 다음 달로 이동하지 않음
    }

    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const onClickDate = (day: number) => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    clickedDate.setHours(0, 0, 0, 0);

    if (
      clickedDate.getTime() < today.getTime() ||
      clickedDate.getTime() > maxDate.getTime()
    ) {
      return; // 선택 불가
    }

    // 이후 로직은 기존과 동일
    const isSelected = selectedDates.some(
      (date) =>
        date.getDate() === clickedDate.getDate() &&
        date.getMonth() === clickedDate.getMonth() &&
        date.getFullYear() === clickedDate.getFullYear(),
    );

    if (isSelected) {
      setSelectedDates(
        selectedDates.filter(
          (date) =>
            !(
              date.getDate() === clickedDate.getDate() &&
              date.getMonth() === clickedDate.getMonth() &&
              date.getFullYear() === clickedDate.getFullYear()
            ),
        ),
      );
      setWarningMessage('');
    } else if (selectedDates.length < 7) {
      setSelectedDates([...selectedDates, clickedDate]);
      setWarningMessage('');
    } else {
      setWarningMessage('날짜는 7개까지만 선택 가능합니다.');
    }
  };

  const renderDays = () => {
    const totalDays = daysInMonth(currentMonth, currentYear);
    const firstDay = firstDayOfMonth(currentMonth, currentYear);

    // 이전 달의 연도와 월 계산
    const prevMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevMonthDays = daysInMonth(prevMonth, prevMonthYear);

    const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);
    const prevMonthArray = Array.from(
      { length: firstDay },
      (_, i) => prevMonthDays - firstDay + i + 1,
    );

    return (
      <>
        {/* 이전 달의 날짜 표시 */}
        {prevMonthArray.map((day, index) => (
          <S.Day key={`prev-${index}`} isValid={false}>
            <span>{day}</span>
          </S.Day>
        ))}
        {/* 현재 달의 날짜 표시 */}
        {daysArray.map((day, index) => {
          const currentDate = new Date(currentYear, currentMonth, day);
          currentDate.setHours(0, 0, 0, 0);
          const isValid =
            currentDate.getTime() >= today.getTime() &&
            currentDate.getTime() <= maxDate.getTime();
          const isSelected = selectedDates.some(
            (date) =>
              date.getDate() === day &&
              date.getMonth() === currentMonth &&
              date.getFullYear() === currentYear,
          );
          return (
            <S.Day
              key={index}
              isValid={isValid}
              isSelected={isSelected}
              onClick={() => isValid && onClickDate(day)}
            >
              <span>{day}</span>
            </S.Day>
          );
        })}
      </>
    );
  };

  return (
    <S.Wrapper>
      <S.DatePicker>
        <S.Header>
          <S.PrevButton onClick={onClickPrevMonth}>
            <img src="/images/icons/arrows/datepicker_prev_icon.svg" />
          </S.PrevButton>
          <S.CurrentMonth>
            {currentYear}.{currentMonth + 1}
          </S.CurrentMonth>
          <S.NextButton onClick={onClickNextMonth}>
            <img src="/images/icons/arrows/datepicker_next_icon.svg" />
          </S.NextButton>
        </S.Header>
        <S.DaysOfWeek>
          {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
            <S.DayOfWeek key={index}>
              <span>{day}</span>
            </S.DayOfWeek>
          ))}
        </S.DaysOfWeek>
        <S.Days>{renderDays()}</S.Days>
      </S.DatePicker>
      <div>
        {warningMessage && (
          <S.WarningMessage>{warningMessage}</S.WarningMessage>
        )}
      </div>
    </S.Wrapper>
  );
}
