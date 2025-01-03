import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

const Warning = ({ children, className = 'p-2' }: Props) => {
  if (!children) return null;

  return (
    <div className={`rounded-md bg-red-100 p-2 text-red-700 ${className}`}>
      {children}
    </div>
  );
};

export default Warning;
