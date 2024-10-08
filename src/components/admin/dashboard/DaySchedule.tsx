import AppointmentStatusBadge from '@/components/common/appointments/AppointmentStatusBadge';
import Label from '@/components/common/Label';
import useLanguage from '@/hooks/useLanguage';
import useLocale from '@/hooks/useLocale';
import { formatTime } from '@/lib/utils/dateAndTimeUtils';
import { Appointment } from '@prisma/client';
import { useRouter } from 'next/navigation';

interface Props {
  appointments: Appointment[];
}

const DaySchedule = ({ appointments }: Props) => {
  const locale = useLocale();
  const { currentLanguage } = useLanguage();
  const router = useRouter();

  if (appointments.length === 0)
    return (
      <div className='flex h-48 items-center justify-center px-4 text-center'>
        <Label labelId='calendar.expanded_day.no_appointments' />
      </div>
    );

  return (
    <div className='ml-auto flex w-[90%] lg:w-[95%]'>
      <div className='relative flex h-[350px] w-full flex-col border border-l-4 border-black/20 border-l-accent'>
        <div className='absolute inset-y-0 -left-7 flex flex-col justify-around'>
          {appointments.map((app) => (
            <div
              key={app.id}
              className='flex w-14 items-center justify-center rounded-sm border border-accent bg-white/60 py-1 text-lg  shadow backdrop-blur-md'
            >
              {formatTime(new Date(app.dateTime), locale)}
            </div>
          ))}
        </div>
        {appointments.map((app) => (
          <div
            key={app.id}
            className='relative flex-1 cursor-pointer border-b border-dashed border-black/20 transition-all last:border-none active:bg-white/20 lg:hover:bg-white/10'
            onClick={() => router.push(`/admin/appointments/${app.id}`)}
          >
            <span className='absolute -top-2 right-3'>
              <AppointmentStatusBadge status={app.status} />
            </span>
            <div className='flex flex-col py-4 pl-12 '>
              {app.status === 'AVAILABLE' ? (
                <p>Free</p>
              ) : (
                <>
                  <p className='mb-1 font-semibold'>{app.clientName}</p>
                  <p className='text-sm'>{app.styleName}</p>
                  <p className='text-sm'>
                    {currentLanguage === 'en'
                      ? app.serviceNameEn
                      : app.serviceNameFi}
                  </p>
                </>
              )}
            </div>
            {app.adminNote && (
              <div className='absolute bottom-6 right-3 flex size-6 items-center justify-center rounded-full bg-accent text-sm  text-white shadow'>
                n
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DaySchedule;
