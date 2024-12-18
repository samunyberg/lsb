import { Appointment } from '@prisma/client';
import { cn } from 'clsx-tailwind-merge';

interface Props {
  index: number;
  currentDate: Date;
  selectedMonth: number;
  appointments: Appointment[];
  onSelectDate: (date: Date) => void;
  onShowExpandedDay: () => void;
}

const CalendarDay = ({
  index,
  onSelectDate,
  onShowExpandedDay,
  selectedMonth,
  currentDate,
  appointments,
}: Props) => {
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const date = new Date(currentYear, selectedMonth, index);

  const isPassedDay =
    currentMonth === selectedMonth && currentDate.getDate() > index;

  const isCurrentDay =
    currentMonth === selectedMonth && currentDate.getDate() === index;

  const appointmentsByDate = appointments?.filter(
    (app) => new Date(app.dateTime).toDateString() === date.toDateString()
  );

  const dayHasAvailableAppointments = () => {
    const availableAppointment = appointmentsByDate?.find(
      (app) => app.status === 'AVAILABLE'
    );

    return !!availableAppointment;
  };

  return (
    <div
      key={index}
      role='button'
      tabIndex={isPassedDay ? -1 : 0}
      className={cn(
        'flex h-full w-full cursor-pointer items-center justify-center rounded-md border border-black/10 p-4 text-sm transition-all active:bg-bgSofter lg:hover:bg-bgSofter',
        {
          'font-bold ring ring-accent': isCurrentDay,
          'pointer-events-none text-gray-400': isPassedDay,
          'bg-green-100 text-green-800': dayHasAvailableAppointments(),
          'bg-red-50 text-red-800': !dayHasAvailableAppointments(),
          'bg-white text-gray-400': isPassedDay,
        }
      )}
      onClick={() => {
        onSelectDate(new Date(currentYear, selectedMonth, index));
        onShowExpandedDay();
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter' && !isPassedDay) {
          onSelectDate(new Date(currentYear, selectedMonth, index));
          onShowExpandedDay();
        }
      }}
    >
      <span>{index}</span>
    </div>
  );
};

export default CalendarDay;
