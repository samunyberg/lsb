'use client';

import Label from '@/components/common/Label';
import Section from '@/components/common/Section';
import { useState } from 'react';
import AdminNoteForm from './appointments/AdminNoteForm';

interface Props {
  endpoint: string;
  isEditing: boolean;
  initialValue: string;
}

const AdminNoteSection = ({ endpoint, isEditing, initialValue }: Props) => {
  const [isNoteFormVisible, setIsNoteFormVisible] = useState(false);

  return (
    <>
      <Section
        title={
          <div className='flex items-center justify-between'>
            <Label labelId='admin.note.title' />
            <span
              className='rounded-full bg-accent px-3 py-1 text-sm text-white'
              onClick={() => setIsNoteFormVisible(true)}
            >
              {isEditing ? 'Edit' : 'Add'}
            </span>
          </div>
        }
      >
        <p className='text-sm'>
          {initialValue ? initialValue : 'Click Add to write a note.'}
        </p>
      </Section>
      <AdminNoteForm
        isVisible={isNoteFormVisible}
        endpoint={endpoint}
        initialValue={initialValue}
        onClose={() => setIsNoteFormVisible(false)}
      />
    </>
  );
};

export default AdminNoteSection;
