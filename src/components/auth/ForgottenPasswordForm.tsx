'use client';

import useLanguage from '@/hooks/useLanguage';
import useLocalisedFormSchema from '@/hooks/useLocalisedFormSchema';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../common/Button';
import CustomInput from '../common/forms/CustomInput';
import Label from '../common/Label';
import Spacer from '../common/Spacer';
import Warning from '../common/Warning';
import AuthFormContainer from './AuthFormContainer';
import AuthFormHeader from './AuthFormHeader';

const ForgottenPasswordForm = () => {
  const { currentLanguage } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | undefined>(
    ''
  );
  const [error, setError] = useState('');
  const { getLabel } = useLanguage();
  const { forgottenPasswordFormSchema } = useLocalisedFormSchema();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validation = forgottenPasswordFormSchema.safeParse({ email });
    if (!validation.success) {
      setValidationError(validation.error.flatten().fieldErrors.email?.at(0));
      return;
    }

    try {
      setError('');
      setValidationError('');
      setIsSubmitting(true);
      await axios.post('/api/auth/forgotten-password', {
        clientLanguage: currentLanguage,
        email,
      });
      setEmail('');
      toast.success('Email sent successfully');
    } catch (error: unknown) {
      if (error instanceof AxiosError) setError(error.response?.data.error);
      else setError('Something went wrong. Please try again');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthFormContainer>
      <AuthFormHeader
        subtitle={<Label labelId='forgotten_password_form.title' />}
      />
      <Warning className='mb-4'>{error}</Warning>
      <p className='px-2'>
        <Label labelId='forgotten_password_form.content' />
      </p>
      <form className='mb-8 mt-5 flex flex-col gap-6' onSubmit={handleSubmit}>
        <CustomInput
          id='email'
          type='text'
          value={email}
          label={getLabel('forgotten_password_form.email')}
          onChange={(e) => setEmail(e.target.value)}
          error={validationError}
        />
        <Button variant='accent' className='!w-full' isLoading={isSubmitting}>
          <Label labelId='forgotten_password_form.send_button' />
        </Button>
      </form>
      <Spacer />
      <Link href='/auth/login' className='px-2 text-link'>
        <Label labelId='general.back' />
      </Link>
    </AuthFormContainer>
  );
};

export default ForgottenPasswordForm;
