import { cn } from 'clsx-tailwind-merge';
import React, { ReactNode } from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  border?: boolean;
  className?: string;
}

const Panel = ({
  children,
  className = '',
  border = false,
  ...rest
}: Props) => {
  return (
    <div
      className={cn(
        'rounded-sm bg-bgSoft  shadow',
        {
          'border-l-4 border-accent': border,
        },
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Panel;
