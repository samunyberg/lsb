import { FaSearch } from 'react-icons/fa';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  placeholder?: string;
}

const SearchInput = ({ id, placeholder = 'Search', ...rest }: Props) => {
  return (
    <div className='flex h-10 w-full items-center gap-2 rounded-md bg-bgSoft px-3 text-sm shadow'>
      <input
        id={id}
        className='h-full w-full bg-transparent outline-none'
        placeholder={placeholder}
        {...rest}
      />
      <FaSearch />
    </div>
  );
};

export default SearchInput;
