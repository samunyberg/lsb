'use client';

import { FaCheck } from 'react-icons/fa6';

interface Props {
  isChecked: boolean;
  className?: string;
}

const CheckBox = ({ isChecked, className }: Props) => {
  return (
    <div
      className={`${
        isChecked && '!bg-accent'
      } flex size-5 cursor-pointer items-center justify-center rounded-sm border border-primary transition-all ${className && className}`}
    >
      {isChecked && <FaCheck className='scale-100 text-white' />}
    </div>
  );
};

export default CheckBox;
