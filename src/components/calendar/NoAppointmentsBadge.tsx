'use client';

import Label from '../common/Label';

const NoAppointmentsBadge = () => {
  return (
    <div className='flex h-64 items-center justify-center '>
      <div className='rounded-md bg-red-100 px-4 py-2 text-red-800'>
        <Label labelId='calendar.expanded_day.no_appointments' />
      </div>
    </div>
  );
};

export default NoAppointmentsBadge;
