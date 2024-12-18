import { ReactNode } from 'react';

interface Props {
  className?: string;
  children: ReactNode;
}

const ResponsiveContainer = ({ className = '', children }: Props) => {
  return (
    <div
      className={`h-full w-screen px-3 md:px-8 lg:px-12 xl:px-24 2xl:px-48 ${className}`}
    >
      {children}
    </div>
  );
};

export default ResponsiveContainer;
