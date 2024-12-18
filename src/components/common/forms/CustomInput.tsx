import { cn } from 'clsx-tailwind-merge';
import React, { ReactNode, useState } from 'react';
import InputError from './InputError';

interface Props
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  as?: 'input' | 'textarea';
  label?: string | ReactNode;
  error?: string;
  icon?: ReactNode;
}

const CustomInput = ({ as = 'input', label, error, icon, ...rest }: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  const Component = as;

  return (
    <div
      className={`transition-all duration-300 ${isFocused || rest.value ? 'pt-4' : ''}`}
    >
      <div className='relative w-full rounded-md border border-black/10 bg-white'>
        <Component
          className={cn(
            'peer h-full w-full rounded-md px-2 py-3 caret-accent outline-none transition-all duration-300 focus:border-2 focus:border-accent focus:bg-white focus:shadow-none',
            {
              'border-red-300 shadow-none': error,
              'h-28 resize-none': as === 'textarea',
            }
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />
        <label
          className={cn(
            'pointer-events-none absolute left-2 top-[12px] text-sm text-gray-400 transition-all duration-300',
            {
              '-top-5 text-xs text-primary': isFocused || rest.value,
            }
          )}
        >
          {label}
        </label>
        {icon && (
          <span className='absolute right-0 top-0 flex h-full items-center justify-center px-2'>
            {icon}
          </span>
        )}
      </div>
      <InputError>{error}</InputError>
    </div>
  );
};

export default CustomInput;
