'use client';

import useLocalisedFormSchema from '@/hooks/useLocalisedFormSchema';
import { ClientWithAppointments } from '@/lib/types';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../common/Button';
import FormError from '../common/forms/FormError';
import FormGroup from '../common/forms/FormGroup';
import Input from '../common/forms/Input';
import Label from '../common/Label';

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
    <>
      <h2 className='mb-5 text-lg uppercase tracking-wide'>
        <Label labelId='edit_information_form.title' />
      </h2>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <FormError>{serverError}</FormError>
        <FormGroup
          error={errors.firstName?.at(0)}
          label={<Label labelId='edit_information_form.first_name' />}
        >
          <Input
            id='firstName'
            value={formData.firstName}
            aria-label='First name'
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup
          error={errors.lastName?.at(0)}
          label={<Label labelId='edit_information_form.last_name' />}
        >
          <Input
            id='lastName'
            value={formData.lastName}
            aria-label='Last name'
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup
          error={errors.email?.at(0)}
          label={<Label labelId='edit_information_form.email' />}
        >
          <Input
            id='email'
            value={formData.email}
            aria-label='Email'
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup
          error={errors.phone?.at(0)}
          label={<Label labelId='edit_information_form.phone' />}
        >
          <Input
            id='phone'
            value={formData.phone}
            aria-label='Phone number'
            onChange={handleInputChange}
          />
        </FormGroup>
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
    </>
  );
};

export default EditPersonalInformation;
