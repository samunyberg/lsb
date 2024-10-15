'use client';

import Button from '@/components/common/Button';
import CustomInput from '@/components/common/forms/CustomInput';
import useLanguage from '@/hooks/useLanguage';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const ClientSearchBar = () => {
  const { getLabel } = useLanguage();
  const router = useRouter();
  const [term, setTerm] = useState('');

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = new URLSearchParams({
      term,
    }).toString();

    router.push(`/admin/clients/search?${query}`);
  };

  return (
    <form
      className='my-8 flex flex-col gap-4 md:flex-row'
      onSubmit={handleSearch}
    >
      <CustomInput
        id='search-clients'
        label={getLabel('admin.appointments.search_placeholder')}
        value={term}
        onChange={(event) => setTerm(event.target.value)}
      />
      <Button
        variant='accent'
        className='flex gap-2 self-end text-sm md:max-w-[110px]'
      >
        <FaSearch size={15} />
        Search
      </Button>
    </form>
  );
};

export default ClientSearchBar;
