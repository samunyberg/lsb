'use client';

import { useState } from 'react';
import { Mode } from './AdminBookingForm';

interface Props {
  onModeChange: (mode: Mode) => void;
}

const BookingModeSelector = ({ onModeChange }: Props) => {
  const [isRegisteredMode, setIsRegisteredMode] = useState(true);

  const handleModeChange = (mode: Mode) => {
    setIsRegisteredMode(mode === 'registeredClient');
    onModeChange(mode);
  };

  return (
    <div className='relative flex w-full overflow-hidden rounded-md border border-black/10 bg-bgSoft py-1'>
      <div
        className={`absolute inset-y-0 w-1/2 rounded-md bg-accent transition-transform duration-300 ease-in-out ${
          isRegisteredMode
            ? 'translate-x-0 transform'
            : 'translate-x-full transform'
        }`}
      ></div>
      <div
        className={`z-10 flex-1 cursor-pointer text-center text-sm  ${
          isRegisteredMode ? 'text-white' : 'text-primary'
        }`}
        onClick={() => handleModeChange('registeredClient')}
      >
        Unregistered client
      </div>
      <div
        className={`z-10 flex-1 cursor-pointer text-center text-sm  ${
          !isRegisteredMode ? 'text-white' : 'primary'
        }`}
        onClick={() => handleModeChange('unregisteredClient')}
      >
        Registered client
      </div>
    </div>
  );
};

export default BookingModeSelector;
