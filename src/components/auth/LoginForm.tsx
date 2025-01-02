'use client';

import useLanguage from '@/hooks/useLanguage';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../common/Button';
import CustomInput from '../common/forms/CustomInput';
import FormError from '../common/forms/FormError';
import PasswordInput from '../common/forms/PasswordInput';
import Label from '../common/Label';
import Panel from '../common/Panel';
import Spacer from '../common/Spacer';
import AuthFormContainer from './AuthFormContainer';
import AuthFormHeader from './AuthFormHeader';

const LoginForm = () => {
  const router = useRouter();
  const { getLabel } = useLanguage();
  const searchParams = useSearchParams();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [callbackUrl, setCallbackUrl] = useState<string | null>(null);

  useEffect(() => {
    setCallbackUrl(searchParams.get('callbackUrl'));
  }, [searchParams]);

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setError('');
      setIsSubmitting(true);
      const signInResult = await signIn('credentials', {
        ...credentials,
        redirect: false,
      });
      if (signInResult?.error) {
        setError(getLabel('login_form.invalid_email_or_password'));
      }
      if (signInResult?.ok) {
        toast.success(`Signed in as ${credentials.email}`);
        router.push(callbackUrl || '/');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setCredentials({ ...credentials, [id]: value });
  };

  return (
    <AuthFormContainer>
      {callbackUrl === '/book' && (
        <Panel className='mb-12 p-4'>
          <Label labelId='login_form.login_callout' />
        </Panel>
      )}
      <AuthFormHeader subtitle={<Label labelId='login_form.title' />} />
      <FormError className='mb-4'>{error}</FormError>
      <form className='mb-8 flex flex-col gap-6' onSubmit={login}>
        <CustomInput
          id='email'
          autoComplete='email'
          value={credentials.email}
          label={getLabel('login_form.email')}
          onChange={handleInputChange}
        />
        <PasswordInput
          id='password'
          autoComplete='current-password'
          value={credentials.password}
          label={getLabel('login_form.password')}
          onChange={handleInputChange}
        />
        <Button variant='accent' type='submit' isLoading={isSubmitting}>
          <Label labelId='login_form.submit_button' />
        </Button>
      </form>
      <Spacer />
      <div className='flex flex-col gap-2 px-2'>
        <span>
          <Label labelId='login_form.links.no_account' />{' '}
          <Link href={'/auth/register'} className='text-link'>
            <Label labelId='login_form.links.register_here' />
          </Link>
        </span>
        <span>
          <Label labelId='login_form.links.forgot_password' />{' '}
          <Link href={'/auth/forgotten-password'} className='text-link'>
            <Label labelId='login_form.links.click_here' />
          </Link>
        </span>
      </div>
    </AuthFormContainer>
  );
};

export default LoginForm;
