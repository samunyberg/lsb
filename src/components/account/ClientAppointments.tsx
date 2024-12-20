'use client';

import { AppointmentWithData } from '@/lib/types';
import AppointmentPanel from '../common/appointments/AppointmentPanel';
import Label from '../common/Label';
import Section from '../common/Section';

interface Props {
  appointments: AppointmentWithData[];
}

const ClientAppointments = ({ appointments }: Props) => {
  return (
    <Section title={<Label labelId='account.client_appointments.title' />}>
      {appointments.length === 0 ? (
        <div className='px-2'>
          <Label labelId='account.client_appointments.no_upcoming_appointments' />
        </div>
      ) : (
        <div className='flex flex-col gap-3'>
          {appointments.map((app) => (
            <AppointmentPanel key={app.id} appointment={app} showStyle />
          ))}
        </div>
      )}
    </Section>
  );
};

export default ClientAppointments;
