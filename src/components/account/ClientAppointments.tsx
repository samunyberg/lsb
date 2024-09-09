'use client';

import { AppointmentWithData } from '@/lib/types';
import AppointmentPanel from '../common/appointments/AppointmentPanel';
import Label from '../common/Label';
import Panel from '../common/Panel';

interface Props {
  appointments: AppointmentWithData[];
}

const ClientAppointments = ({ appointments }: Props) => {
  return (
    <div>
      <h2 className='mb-5 text-xl font-semibold'>
        <Label labelId='account.client_appointments.title' />
      </h2>
      {appointments.length === 0 ? (
        <Panel className='p-4'>
          <Label labelId='account.client_appointments.no_upcoming_appointments' />
        </Panel>
      ) : (
        <div className='flex flex-col gap-3'>
          {appointments.map((app) => (
            <AppointmentPanel key={app.id} appointment={app} showStyle />
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientAppointments;
