import { PropsWithChildren } from 'react';

const InputError = ({ children }: PropsWithChildren) => {
  if (!children) return null;

  return <div className='text-sm text-red-400'>{children}</div>;
};

export default InputError;
