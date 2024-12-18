'use client';

import SearchInput from '@/components/common/SearchInput';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const ClientFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [text, setText] = useState(searchParams.get('term') || '');

  useEffect(() => {
    const handleFilter = () => {
      const params = new URLSearchParams(searchParams.toString());
      if (!text) params.delete('term');
      else params.set('term', text);

      const query = params.size ? '?' + params.toString() : '';
      router.push('/admin/clients/list' + query);
    };

    const id = setTimeout(() => handleFilter(), 500);

    return () => clearTimeout(id);
  }, [router, searchParams, text]);

  return (
    <div className='md:w-1/2'>
      <SearchInput
        id='search-clients'
        placeholder='Search by client information'
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
    </div>
  );
};

export default ClientFilters;
