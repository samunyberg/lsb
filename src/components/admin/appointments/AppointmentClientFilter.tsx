'use client';

import SearchInput from '@/components/common/SearchInput';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const AppointmentClientFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [text, setText] = useState(searchParams.get('client') || '');

  useEffect(() => {
    const handleFilter = () => {
      const params = new URLSearchParams(searchParams.toString());
      if (!text) params.delete('client');
      else params.set('client', text);

      const query = params.size ? '?' + params.toString() : '';
      router.push('/admin/appointments/list' + query);
    };

    const id = setTimeout(() => handleFilter(), 500);

    return () => clearTimeout(id);
  }, [router, searchParams, text]);

  return (
    <SearchInput
      id='search-appointments'
      placeholder='Search by client name'
      value={text}
      onChange={(event) => setText(event.target.value)}
    />
  );
};

export default AppointmentClientFilter;
