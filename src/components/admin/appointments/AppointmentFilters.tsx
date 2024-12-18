'use client';

import AppointmentClientFilter from './AppointmentClientFilter';
import AppointmentDateFilter from './AppointmentDateFilter';
import AppointmentStatusFilter from './AppointmentStatusFilter';

const AppointmentFilters = () => {
  return (
    <div className='flex flex-col gap-3 md:flex-row lg:h-8 lg:gap-5'>
      <div className='flex flex-1 items-center gap-4'>
        <AppointmentDateFilter />
        <AppointmentStatusFilter />
      </div>
      <div className='flex-1'>
        <AppointmentClientFilter />
      </div>
    </div>
  );
};

export default AppointmentFilters;
