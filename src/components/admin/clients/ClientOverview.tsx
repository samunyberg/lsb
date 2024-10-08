'use client';

import ClientAppointments from '@/components/account/ClientAppointments';
import Panel from '@/components/common/Panel';
import Spacer from '@/components/common/Spacer';
import { AppointmentWithData, ClientWithAppointments } from '@/lib/types';
import { formatName } from '@/lib/utils/stringUtils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaHistory } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Action } from '../ActionMenu';
import DeleteConfirmation from '../DeleteConfirmation';
import ManagementPage from '../ManagementPage';

interface Props {
  client: ClientWithAppointments;
}

const ClientOverview = ({ client }: Props) => {
  const router = useRouter();
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

  const actions: Action[] = [
    {
      label: 'Delete client',
      icon: <MdDelete size={20} className='text-accentRed' />,
      onClick: () => setShowDeleteConfirmation(true),
    },
    {
      label: 'Show history',
      icon: <FaHistory />,
      onClick: () =>
        router.push(`/admin/clients/${client.id}/appointment-history`),
    },
  ];

  return (
    <>
      <ManagementPage title={formatName(client)} actions={actions}>
        <div className='mt-6 flex flex-col pb-10 lg:flex-row lg:gap-8'>
          <div className='lg:w-3/5'>
            <Panel>
              <table className='w-full border-collapse rounded-sm shadow'>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.label} className='border-b border-black/20'>
                      <td className='border-r border-black/20 p-2 text-sm font-semibold'>
                        {item.label}
                      </td>
                      <td className='p-2'>{item.content}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Panel>
            <Spacer className='my-8 lg:hidden' />
          </div>
          <div className='lg:flex-1'>
            <ClientAppointments
              appointments={client.appointments as AppointmentWithData[]}
            />
          </div>
        </div>
      </ManagementPage>
      <DeleteConfirmation
        isVisible={showDeleteConfirmation}
        endpoint={`/api/clients/${client.id}`}
        callbackUrl='/admin/clients'
        onClose={() => setShowDeleteConfirmation(false)}
      />
    </>
  );
};

export default ClientOverview;
