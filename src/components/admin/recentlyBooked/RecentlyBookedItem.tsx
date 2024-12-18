import AppointmentPanel from '@/components/common/appointments/AppointmentPanel';
import Label from '@/components/common/Label';
import useLanguage from '@/hooks/useLanguage';
import { AppointmentWithData, TimeAgo } from '@/lib/types';
import {
  formatTimeAgo,
  isBookedLessThanOneHourAgo,
} from '@/lib/utils/dateAndTimeUtils';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Props {
  appointment: AppointmentWithData;
}

const RecentlyBookedItem = ({ appointment }: Props) => {
  const { getLabel } = useLanguage();
  const router = useRouter();
  const [timeAgo, setTimeAgo] = useState<TimeAgo>({ interval: '', label: '' });

  const handleFormatTimeAgo = () => {
    const interval = formatTimeAgo(appointment.bookedAt!).interval;
    const label = formatTimeAgo(appointment.bookedAt!).label;

    setTimeAgo({ interval, label });
  };

  useEffect(() => {
    handleFormatTimeAgo();

    const intervalId = setInterval(() => {
      handleFormatTimeAgo();
    }, 60000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointment.bookedAt]);

  const timeStamp = () => {
    if (!timeAgo.label) return null;

    return (
      <div className='flex items-center gap-1 pl-2 text-sm'>
        <span>•</span>
        <span>{`${timeAgo.interval} ${getLabel(timeAgo.label)}`}</span>
      </div>
    );
  };

  return (
    <div
      key={appointment.id}
      className='flex cursor-pointer flex-col gap-1 '
      onClick={() => router.push(`/admin/appointments/${appointment.id}`)}
    >
      <div className='flex items-center'>
        {timeStamp()}
        <div className='ml-1'>
          {appointment.rescheduledAt && (
            <span>{`(${getLabel('admin.dashboard.recently_booked.rescheduled')})`}</span>
          )}
        </div>
      </div>
      <div className='relative'>
        {isBookedLessThanOneHourAgo(appointment.bookedAt!) && (
          <span className='absolute -top-4 right-2 z-20 rounded-sm bg-accent p-1 text-sm tracking-wide text-white shadow-lg'>
            <Label labelId='general.new' />
          </span>
        )}
        <AppointmentPanel appointment={appointment} showClient showStyle />
      </div>
    </div>
  );
};

export default RecentlyBookedItem;
