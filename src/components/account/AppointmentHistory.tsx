'use client';

import useLocale from '@/hooks/useLocale';
import { AppointmentWithData } from '@/lib/types';
import {
  formatDate,
  groupAppointmentsByMonth,
} from '@/lib/utils/dateAndTimeUtils';
import AppointmentPanel from '../common/appointments/AppointmentPanel';
import Label from '../common/Label';
import Panel from '../common/Panel';

interface Props {
  appointments: AppointmentWithData[];
  onAppointmentClick?: (app: AppointmentWithData) => void;
}

const AppointmentHistory = ({ appointments, onAppointmentClick }: Props) => {
  const locale = useLocale();

  if (appointments.length === 0)
    return (
      <Panel className='p-4'>
        <Label labelId='account.appointment_history.no_past_appointments' />
      </Panel>
    );

  const groupedAppointments = groupAppointmentsByMonth(appointments);

  const renderGroupHeader = (month: string) => {
    return (
      <span className='text-lg font-semibold'>
        {formatDate(new Date(month), locale, {
          month: 'long',
          year: 'numeric',
        })}
      </span>
    );
  };

  const renderGroupAppointments = (month: string) => {
    return (
      <div className='mb-8 mt-2 flex flex-col gap-2'>
        {groupedAppointments[month].map((app) => (
          <div
            key={app.id}
            onClick={() => onAppointmentClick && onAppointmentClick(app)}
          >
            <AppointmentPanel appointment={app} showStyle showPrice />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className='w-full'>
      {Object.keys(groupedAppointments).map((month, index) => {
        return (
          <div key={index}>
            {renderGroupHeader(month)}
            {renderGroupAppointments(month)}
          </div>
        );
      })}
    </div>
  );
};

export default AppointmentHistory;
