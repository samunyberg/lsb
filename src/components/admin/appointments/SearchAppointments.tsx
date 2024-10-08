'use client';

import Button from '@/components/common/Button';
import useLanguage from '@/hooks/useLanguage';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ManagementPage from '../ManagementPage';

const SearchAppointments = () => {
  const router = useRouter();
  const { getLabel } = useLanguage();
  const [dateSearch, setDateSearch] = useState({
    startDate: '',
    endDate: '',
  });

  const handleSearch = () => {
    console.log(dateSearch);
    router.push(
      `/admin/appointments/search?startDate=${dateSearch.startDate}&endDate=${dateSearch.endDate}`
    );
  };

  return (
    <ManagementPage
      title={getLabel('admin.appointments.title')}
      className='pb-10'
    >
      <div className='flex items-end gap-5 p-2'>
        <div className='flex flex-col'>
          <label>Start date</label>
          <input
            type='date'
            className='rounded-sm border border-primary bg-white/80 p-1 shadow'
            onChange={(event) =>
              setDateSearch({
                ...dateSearch,
                startDate: event.target.value,
                endDate: event.target.value,
              })
            }
          />
        </div>
        <div className='flex flex-col'>
          <label>End date</label>
          <input
            type='date'
            className='rounded-sm border border-primary bg-white/80 p-1 shadow'
            defaultValue={dateSearch.endDate}
            onChange={(event) =>
              setDateSearch({ ...dateSearch, endDate: event.target.value })
            }
          />
        </div>
        <Button variant='accent' className='w-fit' onClick={handleSearch}>
          Search
        </Button>
      </div>
      <div>
        <p>Search appointments by date or client</p>
      </div>
    </ManagementPage>
  );
};

export default SearchAppointments;
