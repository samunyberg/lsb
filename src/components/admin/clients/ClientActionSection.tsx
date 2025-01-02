import Button from '@/components/common/Button';
import Section from '@/components/common/Section';
import { useState } from 'react';
import DeleteAction from '../DeleteAction';

interface Props {
  clientId: string;
}

const ClientActionSection = ({ clientId }: Props) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  return (
    <>
      <Section title='Actions'>
        <Button
          className='border-accentRed'
          onClick={() => setShowDeleteConfirmation(true)}
        >
          Delete client
        </Button>
      </Section>
      <DeleteAction
        isVisible={showDeleteConfirmation}
        endpoint={`/api/admin/clients/${clientId}`}
        callbackUrl='/admin/clients'
        onClose={() => setShowDeleteConfirmation(false)}
      />
    </>
  );
};

export default ClientActionSection;
