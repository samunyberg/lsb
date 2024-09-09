'use client;';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Input from './Input';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
}

const SearchDate = ({ id, ...rest }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedDate, setSelectedDate] = useState(
    searchParams.get('date') || ''
  );

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value;
    setSelectedDate(date);
    handleSearch(date);
  };

  const handleSearch = (selectedDate: string) => {
    const baseUrl = pathname.includes('/search')
      ? pathname.split('/search')[0]
      : pathname;

    const params = new URLSearchParams(searchParams.toString());
    params.set('date', selectedDate);

    router.replace(`${baseUrl}/search?${params.toString()}`);
  };

  return (
    <Input
      id={id}
      type='submit'
      {...rest}
      onChange={handleDateChange}
      value={selectedDate}
    />
  );
};

export default SearchDate;
