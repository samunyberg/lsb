import Label from '@/components/common/Label';
import useLocale from '@/hooks/useLocale';
import { formatTime } from '@/lib/utils/dateAndTimeUtils';
import { Appointment } from '@prisma/client';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { FaCheck, FaChevronRight, FaRegClock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import AppointmentStatusBadge from '../common/appointments/AppointmentStatusBadge';

interface Props {
  appointments: Appointment[];
  onAppointmentSelect: (app: Appointment) => void;
  onShowExpandedDay: () => void;
  selectedAppointment?: Appointment | null;
}

const AppointmentTimePicker = ({
  appointments,
  onAppointmentSelect,
  onShowExpandedDay,
  selectedAppointment,
}: Props) => {
  const locale = useLocale();
  const firstAppointmentButtonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (firstAppointmentButtonRef.current)
      firstAppointmentButtonRef.current.focus();
  }, [appointments]);

  const handleAppointmentSelect = (app: Appointment) => {
    if (!isBookable(app)) {
      toast.error('Cannot book this time', { autoClose: 1500 });
      return;
    }

    onAppointmentSelect(app);
    setTimeout(() => onShowExpandedDay(), 1000);
  };

  const isBookable = (app: Appointment) => {
    const currentTime = new Date();
    const oneHourInMS = 3_600_000;

    return (
      app.status === 'AVAILABLE' &&
      new Date(app.dateTime).getTime() - currentTime.getTime() >= oneHourInMS
    );
  };

  const isSelectedAppointment = (app: Appointment) =>
    app.id === selectedAppointment?.id;

  const selectAppointmentButton = (app: Appointment, index: number) => (
    <div
      ref={index === 0 ? firstAppointmentButtonRef : null}
      tabIndex={0}
      role='button'
      onClick={() => handleAppointmentSelect(app)}
      onKeyDown={(event) => {
        if (event.key === 'Enter') handleAppointmentSelect(app);
      }}
      className='flex items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 border-accent px-4 py-1'
    >
      {isSelectedAppointment(app) ? (
        <p className='font-semibold'>
          <Label labelId='calendar.expanded_day.selected' />
        </p>
      ) : (
        <div className='flex items-center gap-1 '>
          <FaChevronRight size={13} />
          <Label labelId='calendar.expanded_day.select' />
        </div>
      )}
      {isSelectedAppointment(app) && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 15,
          }}
        >
          <FaCheck size={16} />
        </motion.span>
      )}
    </div>
  );

  return (
    <div className='flex flex-col gap-5'>
      {appointments.map((app, index) => (
        <div
          key={app.id}
          className='flex cursor-pointer flex-col gap-5 rounded-md border border-black/10 p-4 transition-all active:bg-white/20 lg:hover:bg-white/10'
        >
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-1'>
              <FaRegClock />
              <span className='text-lg'>
                {formatTime(new Date(app.dateTime), locale)}
              </span>
            </div>
            <span>•</span>
            <AppointmentStatusBadge status={app.status} />
          </div>
          {isBookable(app) && selectAppointmentButton(app, index)}
        </div>
      ))}
    </div>
  );
};

export default AppointmentTimePicker;
