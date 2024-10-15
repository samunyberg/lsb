'use client';

import Button from '@/components/common/Button';
import CustomInput from '@/components/common/forms/CustomInput';
import useLanguage from '@/hooks/useLanguage';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import AppointmentDatePicker from './AppointmentDatePicker';

const AppointmentSearchBar = () => {
  const { getLabel } = useLanguage();
  const router = useRouter();
  const [search, setSearch] = useState({
    startDate: format(new Date(), 'yyyy-MM-dd'),
    endDate: format(new Date(), 'yyyy-MM-dd'),
    clientName: '',
  });

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { startDate, endDate, clientName } = search;
    const query = new URLSearchParams({
      startDate,
      endDate,
      clientName,
    }).toString();

    router.push(`/admin/appointments/search?${query}`);
  };

  const handleSelectStartDate = (date: string) => {
    if (new Date(date) > new Date(search.endDate))
      toast.error('Start date cannot be after end date');
    else setSearch({ ...search, startDate: date });
  };

  const handleSelectEndDate = (date: string) => {
    if (new Date(date) < new Date(search.startDate)) {
      toast.error('End date cannot be before start date');
      return;
    }
    setSearch({ ...search, endDate: date });
  };

  return (
    <form
      className='my-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-10'
      onSubmit={handleSearch}
    >
      <div className='flex gap-2'>
        <AppointmentDatePicker
          selectedDate={search.startDate}
          onSelectDate={(date) => handleSelectStartDate(date)}
        />
        <AppointmentDatePicker
          selectedDate={search.endDate}
          onSelectDate={(date) => handleSelectEndDate(date)}
        />
      </div>
      <div className='flex flex-col gap-4 md:flex-row lg:w-full'>
        <CustomInput
          id='search-appointments'
          label={getLabel('admin.appointments.search_placeholder')}
          value={search.clientName}
          onChange={(event) =>
            setSearch({ ...search, clientName: event.target.value })
          }
        />
        <Button
          variant='accent'
          className='flex gap-2 self-end text-sm md:max-w-[110px]'
        >
          <FaSearch size={15} />
          Search
        </Button>
      </div>
    </form>
  );
};

export default AppointmentSearchBar;
