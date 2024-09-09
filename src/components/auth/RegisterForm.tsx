'use client';

import useLanguage from '@/hooks/useLanguage';
import useLocalisedFormSchema from '@/hooks/useLocalisedFormSchema';
import axios, { AxiosError } from 'axios';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../common/Button';
import FormError from '../common/forms/FormError';
import FormGroup from '../common/forms/FormGroup';
import Input from '../common/forms/Input';
import PasswordInput from '../common/forms/PasswordInput';
import Label from '../common/Label';
import Spacer from '../common/Spacer';
import AuthFormContainer from './AuthFormContainer';
import AuthFormHeader from './AuthFormHeader';
import PasswordStrength from './PasswordStrength';

interface FieldErrors {
  firstName?: string[];
  lastName?: string[];
  registerEmail?: string[];
  registerPassword?: string[];
  confirmPassword?: string[];
  phone?: string[];
}

interface FormData {
  firstName: string;
  lastName: string;
  registerEmail: string;
  registerPassword: string;
  confirmPassword: string;
  phone: string;
}

const RegisterForm = () => {
  const { getLabel } = useLanguage();
  const router = useRouter();
  const { registerFormSchema } = useLocalisedFormSchema();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [validationErrors, setValidationErrors] = useState({} as FieldErrors);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    registerEmail: '',
    registerPassword: '',
    confirmPassword: '',
    phone: '',
  });

  useEffect(() => {
    if (isRegistered) {
      router.push('/');
      toast.success(`Welcome, ${formData.firstName}!`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRegistered]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setValidationErrors({});
    setError('');

    const validationResult = registerFormSchema.safeParse(formData);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      setValidationErrors(fieldErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post('/api/auth/register', formData);
      let signinResponse;
      if (response.status === 201)
        signinResponse = await signIn('credentials', {
          email: formData.registerEmail,
          password: formData.registerPassword,
          redirect: false,
        });
      if (signinResponse?.ok) setIsRegistered(true);
    } catch (error: unknown) {
      if (error instanceof AxiosError) setError(error.response?.data.error);
      else setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    if (id === 'registerPassword' || id === 'confirmPassword')
      setFormData({ ...formData, [id]: value });
    else setFormData({ ...formData, [id]: value.trim() });
  };

  return (
    <AuthFormContainer>
      <AuthFormHeader subtitle={<Label labelId='register_form.title' />} />
      <FormError className='mb-4'>{error}</FormError>
      <form className='mb-8 flex flex-col gap-6' onSubmit={handleSubmit}>
        <FormGroup error={validationErrors.firstName?.at(0)}>
          <Input
            id='firstName'
            autoComplete='given-name'
            value={formData.firstName}
            type='text'
            placeholder={getLabel('register_form.first_name')}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup error={validationErrors.lastName?.at(0)}>
          <Input
            id='lastName'
            autoComplete='family-name'
            value={formData.lastName}
            type='text'
            placeholder={getLabel('register_form.last_name')}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup error={validationErrors.registerEmail?.at(0)}>
          <Input
            id='registerEmail'
            autoComplete='email'
            type='text'
            value={formData.registerEmail}
            placeholder={getLabel('register_form.email')}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup error={validationErrors.registerPassword?.at(0)}>
          <PasswordInput
            id='registerPassword'
            autoComplete='new-password'
            value={formData.registerPassword}
            placeholder={getLabel('register_form.password')}
            onChange={handleInputChange}
          />
        </FormGroup>
        <PasswordStrength password={formData.registerPassword} />
        <FormGroup error={validationErrors.confirmPassword?.at(0)}>
          <PasswordInput
            id='confirmPassword'
            autoComplete='new-password'
            value={formData.confirmPassword}
            placeholder={getLabel('register_form.confirm_password')}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup error={validationErrors.phone?.at(0)}>
          <Input
            id='phone'
            autoComplete='tel-national'
            value={formData.phone}
            type='text'
            placeholder={getLabel('register_form.phone')}
            onChange={handleInputChange}
          />
        </FormGroup>
        <Button variant='accent' type='submit' isLoading={isSubmitting}>
          <Label labelId='register_form.submit_button' />
        </Button>
      </form>
      <Spacer />
      <span className='px-2'>
        <Label labelId='register_form.links.already_have_account' />{' '}
        <Link href={'/auth/login'} className='text-link'>
          <Label labelId='register_form.links.click_here' />
        </Link>
      </span>
    </AuthFormContainer>
  );
};

export default RegisterForm;
