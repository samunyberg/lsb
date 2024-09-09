import { ReactNode } from 'react';
import InputError from './InputError';

interface Props {
  label?: string | ReactNode;
  children: ReactNode;
  error?: string;
}

const FormGroup = ({ children, error, label }: Props) => {
  return (
    <div className={`flex w-full flex-col gap-1 ${error && 'invalid group'}`}>
      {label && <span className='text-sm '>{label}</span>}
      {children}
      <InputError>{error}</InputError>
    </div>
  );
};

export default FormGroup;
