'use client';

import UnregisteredBadge from '@/components/admin/appointments/UnregisteredBadge';
import useLanguage from '@/hooks/useLanguage';
import useLocale from '@/hooks/useLocale';
import { AppointmentWithData } from '@/lib/types';
import { formatDate, formatTime } from '@/lib/utils/dateAndTimeUtils';
import { FaCheck, FaRegCalendarCheck, FaRegClock } from 'react-icons/fa';
import { IoPerson } from 'react-icons/io5';
import Label from '../Label';
import Panel from '../Panel';
import AppointmentStatusBadge from './AppointmentStatusBadge';

interface Props {
  className?: string;
  appointment: AppointmentWithData;
  showDate?: boolean;
  showTime?: boolean;
  showClient?: boolean;
  showStyle?: boolean;
  showStatusBadge?: boolean;
  showPrice?: boolean;
}

const AppointmentPanel = ({
  className = '',
  appointment,
  showDate = true,
  showTime = true,
  showClient = false,
  showStyle = false,
  showStatusBadge = false,
  showPrice = false,
}: Props) => {
  const locale = useLocale();
  const { currentLanguage } = useLanguage();

  const dateDisplay = (
    <span className='flex items-center gap-2'>
      <FaRegCalendarCheck size={15} />
      {formatDate(new Date(appointment.dateTime), locale)}
    </span>
  );

  const timeDisplay = (
    <span className='flex items-center gap-2'>
      <FaRegClock size={15} />
      {formatTime(new Date(appointment.dateTime), locale)}
    </span>
  );

  const clientInfo = (
    <div>
      <span className='flex items-center gap-2 font-semibold'>
        <IoPerson size={12} />
        {appointment.clientName!}
        {!appointment.isRegisteredClient && <UnregisteredBadge />}
      </span>
    </div>
  );

  const priceInfo = (
    <div className='flex flex-col items-end'>
      <span className='font-semibold'>{appointment.servicePrice}€</span>
      <span className='text-xs'>
        <Label labelId='appointment.discount' />
      </span>
    </div>
  );

  const styleInfo = (
    <div>
      <span className='flex items-center gap-2 text-sm'>
        <FaCheck size={12} />
        {`${appointment.styleName} - ${
          currentLanguage === 'en'
            ? appointment.serviceNameEn
            : appointment.service?.name_fi
        }`}
      </span>
    </div>
  );

  return (
    <Panel
      border
      className={`relative flex cursor-pointer flex-col gap-2 px-2 py-3 transition-all active:bg-bgSofter lg:py-2 lg:hover:bg-bgSofter ${className}`}
    >
      <div className='ml-5 flex gap-5 text-lg'>
        {showDate && dateDisplay}
        {showTime && timeDisplay}
      </div>
      <div className='flex flex-col p-2'>
        {showClient && clientInfo}
        {showStyle && styleInfo}
        {showPrice && priceInfo}
      </div>
      {showStatusBadge && (
        <span className='absolute -top-2 right-2 shadow-md'>
          <AppointmentStatusBadge status={appointment.status} />
        </span>
      )}
    </Panel>
  );
};

export default AppointmentPanel;
