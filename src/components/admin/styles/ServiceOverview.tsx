'use client';

import Label from '@/components/common/Label';
import Panel from '@/components/common/Panel';
import { Service } from '@prisma/client';
import { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { Action } from '../ActionMenu';
import DeleteConfirmation from '../DeleteConfirmation';
import ManagementPage from '../ManagementPage';
import ServiceForm from './ServiceForm';

interface Props {
  service: Service;
  associatedStyleName: string;
}

const ServiceOverview = ({ service, associatedStyleName }: Props) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const actions: Action[] = [
    {
      label: 'Delete service',
      icon: <MdDelete size={20} className='text-accentRed' />,
      onClick: () => setShowDeleteConfirmation(true),
    },
  ];

  return (
    <>
      <ManagementPage
        title={<Label labelId='admin.services.manage.title' />}
        actions={actions}
        className='max-w-xl pb-10'
      >
        <Panel className='mb-6 px-3 py-2'>
          <Label labelId='admin.services.service_overview.for' />{' '}
          <span className='font-semibold'>{associatedStyleName}</span>
        </Panel>
        <ServiceForm service={service} />
      </ManagementPage>
      <DeleteConfirmation
        isVisible={showDeleteConfirmation}
        endpoint={`/api/services/${service.styleId}/service-options/${service.id}`}
        callbackUrl={`/admin/services/${service.styleId}`}
        onClose={() => setShowDeleteConfirmation(false)}
      />
    </>
  );
};

export default ServiceOverview;
