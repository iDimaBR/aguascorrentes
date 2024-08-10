import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { CalendarIcon } from '@heroicons/react/outline';

const isWeekend = (date: Date) => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

const isClosedDay = (date: Date) => {
  const day = date.getDay();
  return day === 3;
}

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

const Calendar: React.FC<{ onDateChange: (date: Date) => void }> = ({ onDateChange }) => {
  const today = new Date();
  const [showCalendar, setShowCalendar] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());

  const handleDateClick = (date: Date) => {
    setShowCalendar(false);
    setSelectedDate(date);
    onDateChange(date);
  };

  const handleChangeDate = () => {
    setShowCalendar(true);
  };

  const handleMonthChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const canNavigatePrev = currentYear > today.getFullYear() || (currentYear === today.getFullYear() && currentMonth > today.getMonth());
  const isCurrentMonth = currentYear === today.getFullYear() && currentMonth === today.getMonth();

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);

  const formatSelectedDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString('pt-BR', { month: 'short' }).toUpperCase();
    const year = date.getFullYear();
    return { day, month, year };
  };

  const formattedSelectedDate = selectedDate ? formatSelectedDate(selectedDate) : { day: '', month: '', year: '' };

  if (!showCalendar) {
    return (
        <div className="p-4 w-full items-center justify-center flex flex-col">
          <CalendarIcon className="h-10 w-10 mr-2 text-[#0088cc]" />
          <h2 className="text-lg">Quando quer visitar?</h2>
          <div className="mt-4 text-center flex flex-row">
            <button type="button" onClick={handleChangeDate} className="text-5xl font-bold text-[#0088cc] mt-3">{formattedSelectedDate.day}</button>
            <div className="mt-4 text-center flex flex-col font-semibold">
              <button type="button" className="text-sm">{`${formattedSelectedDate.month}`}</button>
              <button type="button" onClick={handleChangeDate} className="text-sm">{`${formattedSelectedDate.year}`}</button>
            </div>
          </div>
        </div>
    );
  }

  return (
    <div className="p-4 grid place-items-center">
      <div className="flex items-center flex-col mb-4">
        <CalendarIcon className="h-10 w-10 mr-2 text-[#0088cc]" />
        <h2 className="text-md">Quando quer visitar?</h2>
      </div>
      <div className="flex items-center justify-between mb-4">
        {canNavigatePrev && (
          <button
            type="button"
            onClick={() => handleMonthChange('prev')}
            className="h-10 w-10 p-2 rounded-md text-black"
          >
            <ChevronLeftIcon />
          </button>
        )}
        <h2 className="text-lg">
          {new Date(currentYear, currentMonth).toLocaleString('pt-BR', { month: 'short', year: 'numeric' }).toLocaleUpperCase()}
        </h2>
        <button
          type="button"
          onClick={() => handleMonthChange('next')}
          className="h-10 w-10 p-2 rounded-md text-black"
        >
          <ChevronRightIcon />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {['dom.', 'seg.', 'ter.', 'qua.', 'qui.', 'sex.', 'sáb.'].map((day, index) => (
          <div key={index} className="text-center text-[#eaeaea]">
            {day}<hr />
          </div>
        ))}
        {[...Array(firstDayOfMonth)].map((_, i) => (
          <div key={i} className="p-2"></div>
        ))}
        {[...Array(daysInMonth)].map((_, i) => {
          const currentDate = new Date(currentYear, currentMonth, i + 1);
          const isWeekendDay = isWeekend(currentDate);
          const isSelected = selectedDate?.getDate() === i + 1;
          const bgColor = isClosedDay(currentDate) ? 'bg-[#E0E0E0]' : isWeekendDay ? 'bg-green-200' : 'bg-yellow-200';
          const textColor = isSelected ? 'text-white' : 'text-black';

          return (
            <button
              type="button"
              key={i}
              onClick={() => handleDateClick(currentDate)}
              disabled={isClosedDay(currentDate)}
              className={`text-[13px] w-[43px] h-[43px] rounded-md ${isClosedDay(currentDate) ? 'opacity-30' : ''} ${isSelected ? 'bg-blue-500' : bgColor} ${textColor}`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 max-w-[450px]">
        <span className="text-[14px] text-center p-2 rounded-md text-black bg-yellow-200 flex-1">
          Tarifa (R$ 49,00)
        </span>
        <span className="text-[14px] text-center p-2 rounded-md text-black bg-green-200 flex-1 max-w-[150px] sm:max-w-[200px] md:max-w-[220px]">
          Tarifa (R$ 59,00)
        </span>
        <span className="text-[14px] text-center p-2 rounded-md text-black bg-[#3BB9FD] flex-1 max-w-[150px] sm:max-w-[200px] md:max-w-[220px]">
          Tarifa (R$ 54,90)
        </span>
        <span className="text-[14px] text-center p-2 rounded-md text-black bg-[#d1d1d1]">
          Fechado/Aguardando tarifa
        </span>
      </div>
    </div>
  );
};

export default Calendar;
