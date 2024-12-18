'use client';

import { cn } from 'clsx-tailwind-merge';
import { ReactNode } from 'react';
import { ThreeDots } from 'react-loader-spinner';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent';
  small?: boolean;
  children: ReactNode | string;
  className?: string;
  isLoading?: boolean;
}

const Button = ({
  variant = 'primary',
  small = false,
  children,
  className = '',
  isLoading,
  ...rest
}: Props) => {
  return (
    <button
      className={cn(
        `flex h-12 w-full items-center justify-center whitespace-nowrap rounded-md px-4 text-sm tracking-wide transition-all disabled:cursor-not-allowed disabled:text-opacity-50 md:w-fit`,
        {
          'border-2 border-primary bg-transparent active:bg-primaryButtonHover disabled:border-opacity-50 lg:hover:bg-primaryButtonHover':
            variant === 'primary',
          'bg-accent text-white active:bg-accentButtonHover disabled:bg-opacity-50 lg:hover:bg-accentButtonHover':
            variant === 'accent',
          'h-8 px-2': small,
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
