'use client';

import SectionList from '@/components/common/SectionList';
import { AppointmentWithData } from '@/lib/types';
import AdminNoteSection from '../AdminNoteSection';
import AppointmentActionSection from './AppointmentActionSection';
import AppointmentDetailSection from './AppointmentDetailSection';

interface Props {
  appointment: AppointmentWithData;
}

const AppointmentOverview = ({ appointment }: Props) => {
  return (
    <SectionList>
      <AppointmentDetailSection appointment={appointment} />
      <AdminNoteSection
        endpoint={`/api/admin/appointments/${appointment.id}/update`}
        initialValue={appointment.adminNote || ''}
        isEditing={!!appointment.adminNote}
      />
      <AppointmentActionSection appointment={appointment} />
    </SectionList>
  );
};

export default AppointmentOverview;
