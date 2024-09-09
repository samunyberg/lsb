'use client';

import { useRouter } from 'next/navigation';
import { IoArrowBack } from 'react-icons/io5';
import Label from './Label';

const GoBackLink = () => {
  const router = useRouter();

  return (
    <span
      className='flex w-fit cursor-pointer items-center gap-1 pr-5'
      onClick={() => router.back()}
    >
      <IoArrowBack size={20} />
      <Label labelId='general.back' />
    </span>
  );
};

export default GoBackLink;
