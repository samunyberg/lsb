'use client';

import { ThreeDots } from 'react-loader-spinner';

const Loading = () => {
  return (
    <div className='flex h-[calc(100vh-55px)] items-center justify-center'>
      <div className='mb-36'>
        <ThreeDots height={10} color='#524237' />
      </div>
    </div>
  );
};

export default Loading;
