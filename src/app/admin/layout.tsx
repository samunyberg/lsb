import Navigation from '@/components/admin/Navigation';
import { PropsWithChildren } from 'react';

const AdminLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='mt-5 flex flex-col gap-5 lg:flex-row'>
      <div className='lg:sticky lg:top-[75px] lg:h-fit lg:w-[150px]'>
        <Navigation />
      </div>
      <div className='flex-1'>{children}</div>
    </div>
  );
};

export default AdminLayout;
