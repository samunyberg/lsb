import NoAppointmentsBadge from '@/components/calendar/NoAppointmentsBadge';
import AppointmentStatusBadge from '@/components/common/appointments/AppointmentStatusBadge';
import Panel from '@/components/common/Panel';
import useLanguage from '@/hooks/useLanguage';
import useLocale from '@/hooks/useLocale';
import { AppointmentWithData } from '@/lib/types';
import { formatTime } from '@/lib/utils/dateAndTimeUtils';
import { Appointment } from '@prisma/client';
import Link from 'next/link';
import { FaRegClock } from 'react-icons/fa';

interface Props {
  appointments: Appointment[];
}

const DaySchedule = ({ appointments }: Props) => {
  if (appointments.length === 0) return <NoAppointmentsBadge />;

  return (
    <div className='flex w-full flex-col gap-3'>
      {appointments.map((app) => (
        <TodayScheduleItem
          key={app.id}
          appointment={app as AppointmentWithData}
        />
      ))}
    </div>
  );
};

const TodayScheduleItem = ({
  appointment,
}: {
  appointment: AppointmentWithData;
}) => {
  const { currentLanguage } = useLanguage();
  const locale = useLocale();

  return (
    <Link href={`/admin/appointments/${appointment.id}`}>
      <Panel className='relative cursor-pointer border border-black/10 px-3 shadow-none transition-all active:bg-white/20 lg:hover:bg-white/10'>
        <div className='flex flex-col py-4'>
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-1'>
              <FaRegClock />
              <span>{formatTime(new Date(appointment.dateTime), locale)}</span>
            </div>
            <span>•</span>
            <AppointmentStatusBadge status={appointment.status} />
          </div>
          {appointment.status === 'BOOKED' && (
            <div className='mt-2 pl-2'>
              <p className='text-sm'>{appointment.clientName}</p>
              <div className='flex gap-1'>
                <span className='text-sm'>{appointment.styleName}</span>
                <span>•</span>
                <span className='text-sm'>
                  {currentLanguage === 'en'
                    ? appointment.serviceNameEn
                    : appointment.serviceNameFi}
                </span>
              </div>
              {appointment.adminNote && (
                <div className='absolute bottom-6 right-3 flex size-6 items-center justify-center rounded-full bg-accent text-sm text-white shadow'>
                  n
                </div>
              )}
            </div>
          )}
        </div>
      </Panel>
    </Link>
  );
};

export default DaySchedule;
