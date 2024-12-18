import React, { ReactNode } from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const Panel = ({ children, className = 'px-4 py-8', ...rest }: Props) => {
  return (
    <div className={`rounded-md bg-bgSoft shadow ${className}`} {...rest}>
      {children}
    </div>
  );
};

export default Panel;
