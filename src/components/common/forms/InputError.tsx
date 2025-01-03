import { PropsWithChildren } from 'react';
import Warning from '../Warning';

const InputError = ({ children }: PropsWithChildren) => {
  if (!children) return null;

  return <Warning className='mt-2 text-sm'>{children}</Warning>;
};

export default InputError;
