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

  const today = new Date();

  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const onClickPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const onClickNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const onClickDate = (day: number) => {
    const clickedDate = new Date(currentYear, currentMonth, day);

    // 오늘 포함 이후 날짜만 선택 가능
    if (clickedDate < today.setHours(0, 0, 0, 0)) {
      return;
    }

    const isSelected = selectedDates.some(
      (date) =>
        date.getDate() === clickedDate.getDate() &&
        date.getMonth() === clickedDate.getMonth() &&
        date.getFullYear() === clickedDate.getFullYear(),
    );

    if (isSelected) {
      // 이미 선택된 날짜를 클릭하면 해당 날짜를 선택 해제
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
    } else if (selectedDates.length < 7) {
      // 선택된 날짜가 7개 미만일 경우에만 새로운 날짜 추가
      setSelectedDates([...selectedDates, clickedDate]);
    } else {
      alert('최대 7일까지 선택 가능합니다.');
    }
  };

  const renderDays = () => {
    const totalDays = daysInMonth(currentMonth, currentYear);
    const firstDay = firstDayOfMonth(currentMonth, currentYear);
    const prevMonthDays = daysInMonth(currentMonth - 1, currentYear);

    const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);
    const prevMonthArray = Array.from(
      { length: firstDay },
      (_, i) => prevMonthDays - firstDay + i + 1,
    );

    return (
      <>
        {prevMonthArray.map((day, index) => (
          <S.Day key={`prev-${index}`} isValid={false}>
            <span>{day}</span>
          </S.Day>
        ))}
        {daysArray.map((day, index) => {
          const currentDate = new Date(currentYear, currentMonth, day);
          const isValid = currentDate >= today.setHours(0, 0, 0, 0); // 오늘 포함 이후 날짜만 유효
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
              onClick={() => isValid && onClickDate(day)} // 유효한 날짜만 클릭 가능
            >
              <span>{day}</span>
            </S.Day>
          );
        })}
      </>
    );
  };

  return (
    <S.DatePicker>
      <S.Header>
        <S.PrevButton onClick={onClickPrevMonth}>＜</S.PrevButton>
        <S.CurrentMonth>
          {currentYear}.{currentMonth + 1}
        </S.CurrentMonth>
        <S.NextButton onClick={onClickNextMonth}>＞</S.NextButton>
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
  );
}
