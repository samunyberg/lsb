'use client';

import Button from '@/components/common/Button';
import Label from '@/components/common/Label';
import Link from 'next/link';

const StyleTableActions = () => {
  return (
    <Link href={'/admin/styles/new'}>
      <Button small variant='accent' className='float-right w-fit'>
        <Label labelId='admin.style_table.add_button' />
      </Button>
    </Link>
  );
};

export default StyleTableActions;
