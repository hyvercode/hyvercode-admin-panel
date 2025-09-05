import React, { useState, useMemo } from 'react';
import type { CalendarEvent } from '../../types';
import Modal from './Modal';

interface CalendarProps {
  events?: CalendarEvent[];
  className?: string;
}

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: CalendarEvent[];
}

const categoryColorMap = {
  primary: 'bg-primary',
  success: 'bg-success',
  danger: 'bg-danger',
  warning: 'bg-warning-dark',
};

const Calendar: React.FC<CalendarProps> = ({ events = [], className }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<{ date: Date | null, events: CalendarEvent[] }>({ date: null, events: [] });

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  const calendarGrid = useMemo<CalendarDay[]>(() => {
    const grid: CalendarDay[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Days from previous month
    const startDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday
    for (let i = 0; i < startDayOfWeek; i++) {
      const date = new Date(firstDayOfMonth);
      date.setDate(date.getDate() - (startDayOfWeek - i));
      grid.push({ date, isCurrentMonth: false, isToday: false, events: [] });
    }

    // Days of current month
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      const dateString = date.toISOString().split('T')[0];
      const dayEvents = events.filter(event => event.date === dateString);
      grid.push({ 
        date, 
        isCurrentMonth: true, 
        isToday: date.getTime() === today.getTime(), 
        events: dayEvents 
      });
    }

    // Days from next month
    const endDayOfWeek = lastDayOfMonth.getDay();
    const remainingDays = 6 - endDayOfWeek;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(lastDayOfMonth);
      date.setDate(date.getDate() + i);
      grid.push({ date, isCurrentMonth: false, isToday: false, events: [] });
    }

    return grid;
  }, [currentDate, events, firstDayOfMonth, lastDayOfMonth]);

  const handleDayClick = (day: CalendarDay) => {
    if (day.events.length > 0) {
      setSelectedDay({ date: day.date, events: day.events });
      setModalOpen(true);
    }
  };

  const changeMonth = (amount: number) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + amount);
      return newDate;
    });
  };

  return (
    <div className={`bg-neutral-0 dark:bg-neutral-1000 p-6 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-900 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800" aria-label="Previous month">
          <i className="bi bi-chevron-left text-lg"></i>
        </button>
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800" aria-label="Next month">
          <i className="bi bi-chevron-right text-lg"></i>
        </button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 text-center text-sm font-semibold text-neutral-600 dark:text-neutral-400 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day}>{day}</div>)}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarGrid.map((day, index) => (
          <div
            key={index}
            onClick={() => handleDayClick(day)}
            className={`p-2 h-24 flex flex-col rounded-md border border-transparent transition-colors ${day.isCurrentMonth ? 'dark:text-neutral-200' : 'text-neutral-400 dark:text-neutral-600'} ${day.events.length > 0 ? 'cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-900' : ''}`}
          >
            <span className={`self-end font-medium text-sm ${day.isToday ? 'bg-primary text-white rounded-full w-7 h-7 flex items-center justify-center' : 'w-7 h-7 flex items-center justify-center'}`}>
              {day.date.getDate()}
            </span>
            <div className="flex-grow mt-1 overflow-y-auto">
              <div className="flex flex-wrap gap-1">
                {day.events.slice(0, 3).map(event => (
                   <div key={event.id} className={`w-2 h-2 rounded-full ${categoryColorMap[event.category]}`}></div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={`Events for ${selectedDay.date?.toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric' })}`}
      >
        <ul className="space-y-3">
          {selectedDay.events.map(event => (
            <li key={event.id} className="flex items-center">
              <span className={`w-3 h-3 rounded-full mr-3 ${categoryColorMap[event.category]}`}></span>
              <span className="text-neutral-800 dark:text-neutral-200">{event.title}</span>
            </li>
          ))}
        </ul>
      </Modal>

    </div>
  );
};

export default Calendar;