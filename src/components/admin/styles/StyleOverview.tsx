'use client';

import Button from '@/components/common/Button';
import Label from '@/components/common/Label';
import Section from '@/components/common/Section';
import SectionList from '@/components/common/SectionList';
import { StyleWithServices } from '@/lib/types';
import Link from 'next/link';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import DeleteConfirmation from '../DeleteConfirmation';
import ServiceTable from './ServiceTable';
import StyleForm from './StyleForm';

interface Props {
  style: StyleWithServices;
}

const StyleOverview = ({ style }: Props) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  return (
    <SectionList>
      <Section title={style.name}>
        <StyleForm style={style} />
      </Section>
      <Section
        title={
          <div className='flex items-center justify-between'>
            <Label labelId='admin.services.title' />
            <Link href={`/admin/styles/${style.id}/new-service`}>
              <FaPlus size={17} />
            </Link>
          </div>
        }
      >
        <ServiceTable services={style.services} />
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
        endpoint={`/api/admin/styles/${style.id}`}
        callbackUrl='/admin/styles/list'
        onClose={() => setShowDeleteConfirmation(false)}
      />
    </SectionList>
  );
};

export default StyleOverview;
