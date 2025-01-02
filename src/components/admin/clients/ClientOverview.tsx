'use client';

import ClientAppointments from '@/components/account/ClientAppointments';
import AppointmentHistoryLink from '@/components/common/AppointmentHistoryLink';
import SectionList from '@/components/common/SectionList';
import { AppointmentWithData, ClientWithAppointments } from '@/lib/types';
import AdminNoteSection from '../AdminNoteSection';
import ClientActionSection from './ClientActionSection';
import ClientDetailSection from './ClientDetailSection';

interface Props {
  client: ClientWithAppointments;
}

const ClientOverview = ({ client }: Props) => {
  return (
    <SectionList>
      <ClientDetailSection client={client} />
      <AdminNoteSection
        endpoint={`/api/admin/clients/${client.id}`}
        initialValue={client.adminNote || ''}
        isEditing={!!client.adminNote}
      />
      <ClientAppointments
        appointments={client.appointments as AppointmentWithData[]}
      />
      <AppointmentHistoryLink
        href={`/admin/clients/${client.id}/appointment-history`}
      />
      <ClientActionSection clientId={client.id} />
    </SectionList>
  );
};

export default ClientOverview;
