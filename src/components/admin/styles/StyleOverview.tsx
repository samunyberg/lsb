'use client';

import Spacer from '@/components/common/Spacer';
import { StyleWithServices } from '@/lib/types';
import { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { Action } from '../ActionMenu';
import DeleteConfirmation from '../DeleteConfirmation';
import ManagementPage from '../ManagementPage';
import ServiceTable from './ServiceTable';
import StyleForm from './StyleForm';

interface Props {
  style: StyleWithServices;
}

const StyleOverview = ({ style }: Props) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const actions: Action[] = [
    {
      label: 'Delete style',
      icon: <MdDelete size={20} className='text-accentRed' />,
      onClick: () => setShowDeleteConfirmation(true),
    },
  ];

  return (
    <>
      <ManagementPage title={style.name} actions={actions} className='pb-10'>
        <div className='flex flex-col lg:flex-row lg:gap-8'>
          <div className='lg:w-2/5'>
            <StyleForm style={style} />
          </div>
          <Spacer className='my-10 lg:hidden' />
          <div className='rounded-sm bg-bgSoft p-3 shadow lg:h-fit lg:flex-1'>
            <ServiceTable styleId={style.id} services={style.services} />
          </div>
        </div>
      </ManagementPage>
      <DeleteConfirmation
        isVisible={showDeleteConfirmation}
        endpoint={`/api/admin/styles/${style.id}`}
        callbackUrl='/admin/styles'
        onClose={() => setShowDeleteConfirmation(false)}
      />
    </>
  );
};

export default StyleOverview;
