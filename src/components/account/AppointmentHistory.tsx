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
import Section from '../common/Section';
import SectionList from '../common/SectionList';

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

  const renderGroupAppointments = (month: string) => {
    return (
      <div className='flex flex-col gap-4'>
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
    <SectionList>
      {Object.keys(groupedAppointments).map((month, index) => {
        return (
          <Section
            key={index}
            title={formatDate(new Date(month), locale, {
              month: 'long',
              year: 'numeric',
            })}
          >
            {renderGroupAppointments(month)}
          </Section>
        );
      })}
    </SectionList>
  );
};

export default AppointmentHistory;
