'use client';

import useLocalisedFormSchema from '@/hooks/useLocalisedFormSchema';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../common/Button';
import FormError from '../common/forms/FormError';
import FormGroup from '../common/forms/FormGroup';
import Input from '../common/forms/Input';
import TextArea from '../common/forms/TextArea';
import StarsSelector from './StarsSelector';

interface FormData {
  stars: number;
  name: string;
  text: string;
}

interface FieldErrors {
  stars?: string[];
  name?: string[];
  text?: string[];
}

const ReviewForm = () => {
  const { reviewFormSchema } = useLocalisedFormSchema();
  const [formData, setFormData] = useState<FormData>({
    stars: 0,
    name: '',
    text: '',
  });
  const [validationErrors, setValidationErrors] = useState({} as FieldErrors);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStarsSelect = (stars: number) => {
    setFormData({ ...formData, stars });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationResult = reviewFormSchema.safeParse(formData);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      setValidationErrors(fieldErrors);
      return;
    }

    setValidationErrors({});
    setIsSubmitting(true);

    try {
      await axios.post('/api/reviews', formData);
      toast.success('Thank you so much! Your review has been submitted.');
      setFormData({ stars: 0, name: '', text: '' });
    } catch (error: unknown) {
      if (error instanceof AxiosError) setError(error.response?.data.error);
      else setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className='my-5 flex flex-col gap-5' onSubmit={handleSubmit}>
      <div className='relative mx-auto mb-2 w-[70%]'>
        {validationErrors.stars?.at(0) && (
          <span className='absolute -right-4 -top-5 rounded-sm bg-red-300 px-2 py-1 text-white shadow'>
            Please give your rating
          </span>
        )}
        <StarsSelector selected={formData.stars} onSelect={handleStarsSelect} />
      </div>
      <FormGroup
        error={validationErrors.name?.at(0)}
        label='Name (this will be visible to other users)'
      >
        <Input
          id='name'
          value={formData.name}
          placeholder='Your name'
          onChange={(event) =>
            setFormData({ ...formData, name: event.target.value })
          }
        />
      </FormGroup>
      <FormGroup error={validationErrors.text?.at(0)} label='Review text'>
        <TextArea
          id='text'
          value={formData.text}
          placeholder='You can write your review here!'
          onChange={(event) =>
            setFormData({ ...formData, text: event.target.value })
          }
        />
      </FormGroup>
      <FormError>{error}</FormError>
      <Button variant='accent' isLoading={isSubmitting} disabled={isSubmitting}>
        Submit your review
      </Button>
    </form>
  );
};

export default ReviewForm;
