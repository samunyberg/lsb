'use client';

import { Status } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';

const statuses: { label: string; value?: Status }[] = [
  { label: 'All' },
  { label: 'Available', value: 'AVAILABLE' },
  { label: 'Booked', value: 'BOOKED' },
  { label: 'Unavailable', value: 'UNAVAILABLE' },
  { label: 'Passed', value: 'PASSED' },
];

const AppointmentStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <select
      className='h-8 w-full cursor-pointer rounded-md bg-bgSoft px-2 shadow outline-none'
      onChange={(event) => {
        const params = new URLSearchParams(searchParams.toString());
        const status = event.target.value;
        if (status) params.set('status', status);

        const query = params.size ? '?' + params.toString() : '';
        router.push('/admin/appointments/list' + query);
      }}
    >
      {statuses.map((status) => (
        <option
          key={status.label}
          value={status.value}
          className='cursor-pointer'
        >
          {status.label}
        </option>
      ))}
    </select>
  );
};

export default AppointmentStatusFilter;
