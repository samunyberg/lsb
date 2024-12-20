'use client';

import ClientAppointments from '@/components/account/ClientAppointments';
import AppointmentHistoryLink from '@/components/common/AppointmentHistoryLink';
import Button from '@/components/common/Button';
import Section from '@/components/common/Section';
import SectionList from '@/components/common/SectionList';
import { AppointmentWithData, ClientWithAppointments } from '@/lib/types';
import { formatName } from '@/lib/utils/stringUtils';
import { useState } from 'react';
import DeleteConfirmation from '../DeleteConfirmation';

interface Props {
  client: ClientWithAppointments;
}

const ClientOverview = ({ client }: Props) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const items = [
    {
      label: 'ID',
      content: client.id,
    },
    {
      label: 'Name',
      content: formatName(client),
    },
    {
      label: 'Email',
      content: client.email,
    },
    {
      label: 'Phone',
      content: client.phone,
    },
  ];

  return (
    <SectionList>
      <Section title={formatName(client)}>
        <table className='w-full'>
          <tbody>
            {items.map((item) => (
              <tr key={item.label}>
                <td className='p-2 text-sm font-semibold uppercase'>
                  {item.label}
                </td>
                <td className='p-2'>{item.content}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
      <ClientAppointments
        appointments={client.appointments as AppointmentWithData[]}
      />
      <AppointmentHistoryLink
        href={`/admin/clients/${client.id}/appointment-history`}
      />
      <Section title='Actions'>
        <Button
          className='border-accentRed'
          onClick={() => setShowDeleteConfirmation(true)}
        >
          Delete client
        </Button>
      </Section>
      <DeleteConfirmation
        isVisible={showDeleteConfirmation}
        endpoint={`/api/admin/clients/${client.id}`}
        callbackUrl='/admin/clients'
        onClose={() => setShowDeleteConfirmation(false)}
      />
    </SectionList>
  );
};

export default ClientOverview;
