import Button from '@/components/common/Button';
import Section from '@/components/common/Section';
import { Service } from '@prisma/client';
import { useState } from 'react';
import DeleteAction from '../DeleteAction';

interface Props {
  service: Service;
}

const ServiceActionSection = ({ service }: Props) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  return (
    <>
      <Section title='Actions'>
        <Button
          className='border-accentRed'
          onClick={() => setShowDeleteConfirmation(true)}
        >
          Delete Style
        </Button>
      </Section>
      <DeleteAction
        isVisible={showDeleteConfirmation}
        endpoint={`/api/services/${service.styleId}/service-options/${service.id}`}
        callbackUrl={`/admin/services/${service.styleId}`}
        onClose={() => setShowDeleteConfirmation(false)}
      />
    </>
  );
};

export default ServiceActionSection;
