import Button from '@/components/common/Button';
import Section from '@/components/common/Section';
import { useState } from 'react';
import DeleteAction from '../DeleteAction';

interface Props {
  styleId: number;
}

const StyleActionSection = ({ styleId }: Props) => {
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
        endpoint={`/api/admin/styles/${styleId}`}
        callbackUrl='/admin/styles/list'
        onClose={() => setShowDeleteConfirmation(false)}
      />
    </>
  );
};

export default StyleActionSection;
