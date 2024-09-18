import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

const FormError = ({ children, className = '' }: Props) => {
  if (!children) return null;

  return (
    <div
      className={`rounded-sm border-2 border-red-300 bg-white/70 px-2 py-3 text-center text-red-400 ${className}`}
    >
      {children}
    </div>
  );
};

export default FormError;
