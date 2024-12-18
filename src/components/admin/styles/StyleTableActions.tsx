'use client';

import Button from '@/components/common/Button';
import Label from '@/components/common/Label';
import { useRouter } from 'next/navigation';

const StyleTableActions = () => {
  const router = useRouter();

  return (
    <div className='h-8'>
      <Button
        small
        variant='accent'
        className='float-right w-fit'
        onClick={() => router.push('/admin/styles/new')}
      >
        <Label labelId='admin.style_table.add_button' />
      </Button>
    </div>
  );
};

export default StyleTableActions;
