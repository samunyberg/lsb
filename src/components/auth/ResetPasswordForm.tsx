'use client';

import useLanguage from '@/hooks/useLanguage';
import useLocalisedFormSchema from '@/hooks/useLocalisedFormSchema';
import axios, { AxiosError } from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../common/Button';
import PasswordInput from '../common/forms/PasswordInput';
import Label from '../common/Label';
import Warning from '../common/Warning';
import AuthFormContainer from './AuthFormContainer';
import AuthFormHeader from './AuthFormHeader';
import PasswordStrength from './PasswordStrength';

interface FieldErrors {
  password?: string[];
  confirmPassword?: string[];
}

const ResetPasswordForm = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChangeSuccessful, setIsChangeSuccessful] = useState(false);
  const [inputErrors, setInputErrors] = useState({} as FieldErrors);
  const [error, setError] = useState('');
  const { getLabel } = useLanguage();
  const token = useSearchParams().get('token');
  const { resetPasswordFormSchema } = useLocalisedFormSchema();
  const router = useRouter();

  useEffect(() => {
    if (isChangeSuccessful) router.push('/auth/login');
  }, [isChangeSuccessful, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validation = resetPasswordFormSchema.safeParse({
      password,
      confirmPassword,
    });
    if (!validation.success) {
      setInputErrors(validation.error.flatten().fieldErrors);
      return;
    }

    try {
      setInputErrors({});
      setError('');
      setIsSubmitting(true);
      await axios.post('/api/auth/reset-password', {
        password,
        confirmPassword,
        token,
      });
      setIsSubmitting(false);
      setIsChangeSuccessful(true);
      toast.success('Password changed successfully');
    } catch (error: unknown) {
      setIsSubmitting(false);
      if (error instanceof AxiosError) setError(error.response?.data.error);
      else setError('Something went wrong. Please try again');
    }
  };

  return (
    <AuthFormContainer>
      <AuthFormHeader
        subtitle={<Label labelId='reset_password_form.title' />}
      />
      <Warning className='mb-4'>{error}</Warning>
      <form className='mb-8 mt-5 flex flex-col gap-6' onSubmit={handleSubmit}>
        <PasswordInput
          name='password'
          label={getLabel('reset_password_form.password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={inputErrors.password?.at(0)}
        />
        <PasswordStrength password={password} />
        <PasswordInput
          name='confirmPassword'
          label={getLabel('reset_password_form.confirm_password')}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={inputErrors.confirmPassword?.at(0)}
        />
        <Button variant='accent' isLoading={isSubmitting}>
          <Label labelId='reset_password_form.submit' />
        </Button>
      </form>
    </AuthFormContainer>
  );
};

export default ResetPasswordForm;
