'use client';

import useLocalisedFormSchema from '@/hooks/useLocalisedFormSchema';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { toast } from 'react-toastify';
import Button from '../common/Button';
import FormError from '../common/forms/FormError';
import FormGroup from '../common/forms/FormGroup';
import Input from '../common/forms/Input';
import TextArea from '../common/forms/TextArea';
import Label from '../common/Label';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FieldErrors {
  name?: string[];
  email?: string[];
  message?: string[];
}

interface Props {
  name?: string;
  email?: string;
}

const ContactForm = ({ name, email }: Props) => {
  const { contactFormSchema } = useLocalisedFormSchema();
  const [formData, setFormData] = useState<FormData>({
    name: name || '',
    email: email || '',
    message: '',
  });
  const [isSending, setIsSending] = useState(false);
  const [validationErrors, setValidationErrors] = useState({} as FieldErrors);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setValidationErrors({});

    const validationResult = contactFormSchema.safeParse(formData);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      setValidationErrors(fieldErrors);
      return;
    }

    setIsSending(true);

    try {
      await axios.post('/api/contact', formData);
      toast.success('Email sent');
      setFormData({ ...formData, message: '' });
    } catch (error: unknown) {
      if (error instanceof AxiosError) setError(error.response?.data.error);
      else setError('Something went wrong. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  return (
    <form
      className='flex w-full flex-col gap-5 md:w-[400px] lg:w-[500px]'
      onSubmit={handleSubmit}
    >
      <FormError>{error}</FormError>
      <FormGroup error={validationErrors.name?.at(0)}>
        <Input
          id='name'
          aria-label='Name'
          placeholder='Your name'
          value={formData.name}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup error={validationErrors.email?.at(0)}>
        <Input
          id='email'
          aria-label='Email'
          placeholder='Your email'
          value={formData.email}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup error={validationErrors.message?.at(0)}>
        <TextArea
          id='message'
          aria-label='Message'
          placeholder='Message'
          value={formData.message}
          onChange={handleInputChange}
        />
      </FormGroup>
      <Button
        variant='accent'
        className='mt-3 flex items-center gap-2'
        isLoading={isSending}
        disabled={isSending}
      >
        <Label labelId='general.send' />
        <IoSend size={15} />
      </Button>
    </form>
  );
};

export default ContactForm;
