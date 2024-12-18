'use client';

import Button from '@/components/common/Button';
import Label from '@/components/common/Label';
import Section from '@/components/common/Section';
import { Service } from '@prisma/client';
import { useState } from 'react';
import DeleteConfirmation from '../DeleteConfirmation';
import ServiceForm from './ServiceForm';

interface Props {
  service: Service;
  associatedStyleName: string;
}

const ServiceOverview = ({ service, associatedStyleName }: Props) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  return (
    <div className='flex flex-col gap-5 pb-14'>
      <Section title={<Label labelId='admin.services.manage.title' />}>
        <div className='mb-6 px-2'>
          <Label labelId='admin.services.service_overview.for' />{' '}
          <span className='font-semibold'>{associatedStyleName}</span>
        </div>
        <ServiceForm service={service} />
      </Section>
      <Section title='Actions'>
        <Button
          className='border-accentRed'
          onClick={() => setShowDeleteConfirmation(true)}
        >
          Delete Style
        </Button>
      </Section>
      <DeleteConfirmation
        isVisible={showDeleteConfirmation}
        endpoint={`/api/services/${service.styleId}/service-options/${service.id}`}
        callbackUrl={`/admin/services/${service.styleId}`}
        onClose={() => setShowDeleteConfirmation(false)}
      />
    </div>
  );
};

export default ServiceOverview;
