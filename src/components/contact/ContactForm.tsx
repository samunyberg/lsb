'use client';

import useLanguage from '@/hooks/useLanguage';
import useLocalisedFormSchema from '@/hooks/useLocalisedFormSchema';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { toast } from 'react-toastify';
import Button from '../common/Button';
import CustomInput from '../common/forms/CustomInput';
import Label from '../common/Label';
import Section from '../common/Section';
import Warning from '../common/Warning';

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
  const { getLabel } = useLanguage();
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
    <Section>
      <p className='mb-5'>
        <Label labelId='contact.contact_header.text' />
      </p>
      <form
        className='mx-auto flex w-full flex-col gap-5 md:w-[400px] md:rounded-sm md:bg-bgSoft md:px-5 md:py-8 md:shadow lg:w-[500px]'
        onSubmit={handleSubmit}
      >
        <Warning>{error}</Warning>
        <CustomInput
          id='name'
          aria-label='Name'
          label={getLabel('contact_form.name')}
          value={formData.name}
          onChange={handleInputChange}
          error={validationErrors.name?.at(0)}
        />
        <CustomInput
          id='email'
          aria-label='Email'
          label={getLabel('contact_form.email')}
          value={formData.email}
          onChange={handleInputChange}
          error={validationErrors.email?.at(0)}
        />
        <CustomInput
          as='textarea'
          id='message'
          aria-label='Message'
          label={getLabel('contact_form.message')}
          value={formData.message}
          onChange={handleInputChange}
          error={validationErrors.message?.at(0)}
        />
        <Button
          variant='accent'
          className='flex items-center gap-2'
          isLoading={isSending}
          disabled={isSending}
        >
          <Label labelId='general.send' />
          <IoSend size={15} />
        </Button>
      </form>
    </Section>
  );
};

export default ContactForm;
