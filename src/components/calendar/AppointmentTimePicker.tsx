import Label from '@/components/common/Label';
import useLocale from '@/hooks/useLocale';
import { Appointment } from '@prisma/client';
import { cn } from 'clsx-tailwind-merge';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { FaCheck, FaChevronRight } from 'react-icons/fa';
import { toast } from 'react-toastify';

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
      className='flex items-center justify-center gap-3 whitespace-nowrap rounded-full border border-accent px-4 py-1 shadow'
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
    <div className='ml-auto flex w-[90%] lg:w-[95%]'>
      <div className='relative flex h-[350px] w-full flex-col border-l-4  border-l-accent'>
        <div className='absolute inset-y-0 -left-7 flex flex-col justify-around'>
          {appointments.map((app) => (
            <div
              key={app.id}
              className={cn(
                'flex w-14 items-center justify-center rounded-sm border-2 border-accent bg-white/60 py-1 text-lg  shadow backdrop-blur-md',
                {
                  'border-accentRed': app.status !== 'AVAILABLE',
                  'border-accentGreen': app.status === 'AVAILABLE',
                }
              )}
            >
              {new Date(app.dateTime).toLocaleTimeString(locale, {
                timeStyle: 'short',
              })}
            </div>
          ))}
        </div>
        {appointments.map((app, index) => (
          <div
            key={app.id}
            className='relative flex flex-1 cursor-pointer items-center justify-center border-b border-dashed border-black/10 transition-all last:border-b-0 active:bg-white/20 lg:hover:bg-white/10'
          >
            {app.status === 'AVAILABLE' && selectAppointmentButton(app, index)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentTimePicker;
