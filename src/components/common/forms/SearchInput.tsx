'use client;';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Input from './Input';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

const SearchInput = ({ placeholder, ...rest }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [term, setTerm] = useState(searchParams.get('term') || '');

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const baseUrl = pathname.includes('/search')
      ? pathname.split('/search')[0]
      : pathname;

    const params = new URLSearchParams(searchParams.toString());
    params.set('term', term);

    router.replace(`${baseUrl}/search?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className='w-full'>
      <Input
        type='text'
        placeholder={placeholder}
        value={term}
        icon={
          <button type='submit'>
            <FaSearch size={15} />
          </button>
        }
        onChange={(e) => setTerm(e.target.value)}
        {...rest}
      />
    </form>
  );
};

export default SearchInput;
