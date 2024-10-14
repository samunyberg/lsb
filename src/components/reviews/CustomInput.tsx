import { cn } from 'clsx-tailwind-merge';
import React, { ReactNode, useState } from 'react';
import InputError from '../common/forms/InputError';

interface Props
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  as?: 'input' | 'textarea';
  isRequired?: boolean;
  label?: string;
  error?: string;
  icon?: ReactNode;
}

const CustomInput = ({
  as = 'input',
  isRequired = true,
  label,
  error,
  icon,
  ...rest
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  const Component = as;

  return (
    <div
      className={`transition-all duration-300 ${isFocused || rest.value ? 'pt-6' : ''}`}
    >
      <div className='relative w-full'>
        <Component
          type='text'
          className={cn(
            'peer h-12 w-full rounded-sm border-2 border-transparent bg-bgSoft p-2 caret-accent shadow outline-none transition-all duration-300 focus:border-accent focus:bg-white focus:shadow-none',
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
            'pointer-events-none absolute left-2 top-3 text-sm text-gray-400 transition-all duration-300',
            {
              '-top-5 text-xs text-primary': isFocused || rest.value,
              'after:content-["*"]': isRequired,
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
