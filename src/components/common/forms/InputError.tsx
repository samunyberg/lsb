import { PropsWithChildren } from 'react';

const InputError = ({ children }: PropsWithChildren) => {
  if (!children) return null;

  return (
    <div className='mt-2 rounded-md bg-red-100 px-2 py-1 text-sm text-red-800'>
      {children}
    </div>
  );
};

export default InputError;
