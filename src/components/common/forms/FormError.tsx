import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

const FormError = ({ children, className = '' }: Props) => {
  if (!children) return null;

  return (
    <div
      className={`rounded-md bg-red-100 px-2 py-3 text-center text-red-700 ${className}`}
    >
      {children}
    </div>
  );
};

export default FormError;
