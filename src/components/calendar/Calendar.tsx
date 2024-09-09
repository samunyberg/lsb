'use client';

import { AppointmentWithData } from '@/lib/types';
import { Appointment } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import CalendarDays from './CalendarDays';
import CalendarHeaderRow from './CalendarHeaderRow';
import Legend from './Legend';
import MonthSelector from './MonthSelector';

interface Props {
  admin?: boolean;
  initialData: Appointment[];
  onAppointmentSelect: (app: Appointment | AppointmentWithData) => void;
  selectedAppointment?: Appointment | null;
}

const Calendar = ({
  admin = false,
  initialData,
  onAppointmentSelect,
  selectedAppointment
}: Props) => {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const { data: appointments = initialData, error } = useQuery<
    Appointment[],
    Error
  >({
    queryKey: ['appointments'],
    queryFn: () =>
      axios
        .get<Appointment[]>('/api/appointments/upcoming')
        .then((res) => res.data),
    refetchInterval: 60 * 1000,
    initialData: initialData,
  });

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };

  if (error) return <div>Error fetching the appointments</div>;

  return (
    <div className='flex h-full flex-col'>
      <div className='h-[50px]'>
        <MonthSelector
          currentDate={currentDate}
          selectedMonth={selectedMonth}
          onSelect={setSelectedMonth}
        />
      </div>
      <div className='h-[25px]'>
        <CalendarHeaderRow />
      </div>
      <div className='relative flex-1'>
        <CalendarDays
          admin={admin}
          appointments={appointments}
          currentDate={currentDate}
          selectedMonth={selectedMonth}
          selectedDate={selectedDate}
          onSelectDate={handleSelectDate}
          onAppointmentSelect={onAppointmentSelect}
          selectedAppointment={selectedAppointment}
        />
      </div>
      {!admin && <Legend />}
    </div>
  );
};

export default Calendar;
