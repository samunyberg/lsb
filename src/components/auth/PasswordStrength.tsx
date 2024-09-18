import { passwordStrength } from 'check-password-strength';
import { cn } from 'clsx-tailwind-merge';
import { useEffect, useState } from 'react';
import Label from '../common/Label';

const passwdStrengthLabels = [
  'password_strength.weak',
  'password_strength.low',
  'password_strength.medium',
  'password_strength.strong',
];

const PasswordStrength = ({ password }: { password: string }) => {
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    const strength = passwordStrength(password);
    setStrength(strength.id);
  }, [password]);

  if (!password) return null;

  return (
    <div className='flex items-center gap-4'>
      <p className='whitespace-nowrap text-sm '>
        <Label labelId='password_strength.title' />
        {': '}
        <span className='font-semibold'>
          {<Label labelId={passwdStrengthLabels[strength]} />}
        </span>
      </p>
      <div className='w-full rounded-full bg-bgSoft shadow'>
        <div
          className={cn('h-2 w-full rounded-full transition-all', {
            'w-[15%] bg-red-400': strength === 0,
            'w-[35%] bg-orange-300': strength === 1,
            'w-[70%] bg-green-300': strength === 2,
            'w-[100%] bg-green-400': strength === 3,
          })}
        />
      </div>
    </div>
  );
};

export default PasswordStrength;
