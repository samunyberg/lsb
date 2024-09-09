import { AppointmentWithData } from '@/lib/types';
import { Appointment } from '@prisma/client';
import { useState } from 'react';
import AdminExpandedDayContent from './AdminExpandedDayContent';
import CalendarDay from './CalendarDay';
import ClientExpandedDayContent from './ClientExpandedDayContent';
import ExpandedDay from './ExpandedDay';

interface Props {
  admin: boolean;
  appointments: Appointment[];
  currentDate: Date;
  selectedDate: Date;
  selectedMonth: number;
  onSelectDate: (date: Date) => void;
  onAppointmentSelect: (app: Appointment | AppointmentWithData) => void;
  selectedAppointment?: Appointment | null;
}

const CalendarDays = ({
  admin,
  appointments,
  currentDate,
  selectedDate,
  selectedMonth,
  onSelectDate: onSelectedDate,
  onAppointmentSelect,
  selectedAppointment
}: Props) => {
  const [showExpandedDay, setShowExpandedDay] = useState(false);

  const currentYear = currentDate.getFullYear();

  const daysInMonth = new Date(currentYear, selectedMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, selectedMonth, 0).getDay();

  const lastMonthDays = [];
  const currentMonthDays = [];

  // Days before the first day of the current calendar month:
  for (let i = 0; i < firstDayOfMonth; i++) {
    lastMonthDays.push(i);
  }

  // Days of the current calendar month:
  for (let i = 1; i <= daysInMonth; i++) {
    currentMonthDays.push(i);
  }

  const handleShowExpandedDay = () => {
    setShowExpandedDay(!showExpandedDay);
  };

  return (
    <>
      <div className='grid h-full grid-cols-7 gap-1'>
        {lastMonthDays.map((day) => (
          <div key={day} />
        ))}
        {currentMonthDays.map((day) => (
          <CalendarDay
            key={day}
            index={day}
            currentDate={currentDate}
            selectedMonth={selectedMonth}
            appointments={appointments!}
            onSelectDate={onSelectedDate}
            onShowExpandedDay={() => setShowExpandedDay(!showExpandedDay)}
          />
        ))}
      </div>
      <ExpandedDay
        selectedDate={selectedDate}
        showExpandedDay={showExpandedDay}
        onShowExpandedDay={handleShowExpandedDay}
      >
        {admin ? (
          <AdminExpandedDayContent
            appointments={appointments!}
            selectedDate={selectedDate}
          />
        ) : (
          <ClientExpandedDayContent
            appointments={appointments!}
            selectedDate={selectedDate}
            onShowExpandedDay={handleShowExpandedDay}
            onAppointmentSelect={onAppointmentSelect}
            selectedAppointment={selectedAppointment}
          />
        )}
      </ExpandedDay>
    </>
  );
};

export default CalendarDays;
