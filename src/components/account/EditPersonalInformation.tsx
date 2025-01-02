'use client';

import useLocalisedFormSchema from '@/hooks/useLocalisedFormSchema';
import { ClientWithAppointments } from '@/lib/types';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../common/Button';
import CustomInput from '../common/forms/CustomInput';
import Label from '../common/Label';
import Section from '../common/Section';
import Warning from '../common/Warning';

interface FieldErrors {
  firstName?: string[];
  lastName?: string[];
  email?: string[];
  phone?: string[];
}

interface Props {
  user: ClientWithAppointments;
}

const EditPersonalInformation = ({ user }: Props) => {
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
  });
  const [initialFormData] = useState(formData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({} as FieldErrors);
  const [serverError, setServerError] = useState('');
  const { editAccountSchema } = useLocalisedFormSchema();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Prevent submission if form data hasn't changed
    if (JSON.stringify(formData) === JSON.stringify(initialFormData)) {
      toast.info('No changes detected');
      return;
    }

    setErrors({});
    setServerError('');

    const validationResult = editAccountSchema.safeParse(formData);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      await axios.patch(`/api/clients/${user.id}`, formData);
      handleSubmitSuccess();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setServerError(error.response?.data.error);
      } else setServerError('Whoops! Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitSuccess = () => {
    toast.success('Information updated');
    router.refresh();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value.trim() });
  };

  return (
    <Section title={<Label labelId='edit_information_form.title' />}>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <Warning>{serverError}</Warning>
        <CustomInput
          id='firstName'
          label={<Label labelId='edit_information_form.first_name' />}
          aria-label='First name'
          value={formData.firstName}
          onChange={handleInputChange}
          error={errors.firstName?.at(0)}
        />
        <CustomInput
          id='lastName'
          label={<Label labelId='edit_information_form.last_name' />}
          aria-label='Last name'
          value={formData.lastName}
          onChange={handleInputChange}
          error={errors.lastName?.at(0)}
        />
        <CustomInput
          id='email'
          label={<Label labelId='edit_information_form.email' />}
          aria-label='Email'
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email?.at(0)}
        />
        <CustomInput
          id='phone'
          label={<Label labelId='edit_information_form.phone' />}
          aria-label='Phone number'
          value={formData.phone}
          onChange={handleInputChange}
          error={errors.phone?.at(0)}
        />
        <Button
          type='submit'
          variant='accent'
          className='mt-5'
          isLoading={isSubmitting}
        >
          <Label labelId='edit_personal_information.edit_button' />
        </Button>
        <Button
          type='button'
          role='link'
          aria-label='Change password'
          onClick={() => router.push('/auth/change-password')}
        >
          <Label labelId='edit_personal_information.change_password_button' />
        </Button>
      </form>
    </Section>
  );
};

export default EditPersonalInformation;
