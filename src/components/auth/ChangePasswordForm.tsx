'use client';

import useLanguage from '@/hooks/useLanguage';
import useLocalisedFormSchema from '@/hooks/useLocalisedFormSchema';
import axios, { AxiosError } from 'axios';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../common/Button';
import FormError from '../common/forms/FormError';
import PasswordInput from '../common/forms/PasswordInput';
import GoBackLink from '../common/GoBackLink';
import Label from '../common/Label';
import AuthFormContainer from './AuthFormContainer';
import AuthFormHeader from './AuthFormHeader';
import PasswordStrength from './PasswordStrength';

interface FieldErrors {
  oldPassword?: string[];
  newPassword?: string[];
  confirmNewPassword?: string[];
}

interface FormData {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const ChangePasswordForm = () => {
  const { getLabel } = useLanguage();
  const { changePasswordFormSchema } = useLocalisedFormSchema();
  const [formData, setFormData] = useState({} as FormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({} as FieldErrors);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validation = changePasswordFormSchema.safeParse(formData);
    if (!validation.success) {
      setValidationErrors(validation.error.flatten().fieldErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      clearErrors();
      await axios.patch(`/api/auth/change-password`, formData);
      handleSubmitSuccess();
    } catch (error: unknown) {
      if (error instanceof AxiosError) setError(error.response?.data.error);
      else setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitSuccess = async () => {
    await signOut({ redirect: true, callbackUrl: '/auth/login' });
    toast.success(
      'Password changed successfully. Please login with your new password.'
    );
  };

  const clearErrors = () => {
    setError('');
    setValidationErrors({});
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  return (
    <AuthFormContainer>
      <AuthFormHeader
        subtitle={<Label labelId='change_password_form.title' />}
      />
      <form className='flex w-full flex-col gap-4' onSubmit={handleSubmit}>
        <FormError className='mb-4'>{error}</FormError>
        <PasswordInput
          id='oldPassword'
          label={getLabel('change_password_form.old_password')}
          value={formData.oldPassword}
          onChange={handleInputChange}
          error={validationErrors.oldPassword?.at(0)}
        />
        <PasswordInput
          id='newPassword'
          label={getLabel('change_password_form.new_password')}
          value={formData.newPassword}
          onChange={handleInputChange}
          error={validationErrors.newPassword?.at(0)}
        />
        <PasswordStrength password={formData.newPassword} />
        <PasswordInput
          id='confirmNewPassword'
          label={getLabel('change_password_form.confirm_new_password')}
          value={formData.confirmNewPassword}
          onChange={handleInputChange}
          error={validationErrors.confirmNewPassword?.at(0)}
        />
        <Button
          type='submit'
          variant='accent'
          className='mb-8 mt-5'
          isLoading={isSubmitting}
        >
          <Label labelId='change_password_form.submit_button' />
        </Button>
      </form>
      <GoBackLink />
    </AuthFormContainer>
  );
};

export default ChangePasswordForm;
