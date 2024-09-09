import { PropsWithChildren } from 'react';

const DashboardHeader = ({ children }: PropsWithChildren) => {
  return (
    <h1 className='mb-6 text-lg font-semibold uppercase md:mb-3 md:text-[16px]'>
      {children}
    </h1>
  );
};

export default DashboardHeader;
