'use client';

import { cn } from 'clsx-tailwind-merge';
import { ReactNode } from 'react';
import { ThreeDots } from 'react-loader-spinner';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent';
  children: ReactNode | string;
  className?: string;
  isLoading?: boolean;
}

const Button = ({
  variant = 'primary',
  children,
  className = '',
  isLoading,
  ...rest
}: Props) => {
  return (
    <button
      className={cn(
        `flex h-11 w-full min-w-[80px] items-center justify-center whitespace-nowrap rounded-sm border-2 border-primary px-4 text-base  tracking-wide transition-all disabled:cursor-not-allowed disabled:text-opacity-50 lg:h-10 lg:text-sm`,
        {
          'bg-transparent active:bg-primaryButtonHover disabled:border-opacity-50 lg:hover:bg-primaryButtonHover':
            variant === 'primary',
          'bg-accent text-white active:bg-accentButtonHover disabled:bg-opacity-50 lg:hover:bg-accentButtonHover':
            variant === 'accent',
        },
        className
      )}
      {...rest}
    >
      {isLoading ? (
        <ThreeDots
          color={variant === 'primary' ? '#524237' : '#fff'}
          height={30}
          width={30}
        />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
