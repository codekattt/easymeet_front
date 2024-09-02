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
    clickedDate.setHours(0, 0, 0, 0);

    if (clickedDate.getTime() < today.getTime()) {
      return;
    }

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
          currentDate.setHours(0, 0, 0, 0);
          const isValid = currentDate.getTime() >= today.getTime();
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
            <img src="/images/icon/datepicker_prev_icon.svg" />
          </S.PrevButton>
          <S.CurrentMonth>
            {currentYear}.{currentMonth + 1}
          </S.CurrentMonth>
          <S.NextButton onClick={onClickNextMonth}>
            <img src="/images/icon/datepicker_next_icon.svg" />
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
