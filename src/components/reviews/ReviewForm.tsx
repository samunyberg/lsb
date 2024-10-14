'use client';

import useLanguage from '@/hooks/useLanguage';
import useLocalisedFormSchema from '@/hooks/useLocalisedFormSchema';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../common/Button';
import FormError from '../common/forms/FormError';
import FormGroup from '../common/forms/FormGroup';
import TextArea from '../common/forms/TextArea';
import Label from '../common/Label';
import Spacer from '../common/Spacer';
import CustomInput from './CustomInput';
import StarsSelector from './StarsSelector';
import { FaSearch } from 'react-icons/fa';

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
  const { getLabel } = useLanguage();
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
    <div>
      <h2 className='mt-8'>
        <Label labelId='reviews.header' />
      </h2>
      <ul className='mt-6 flex list-disc flex-col gap-2 px-8'>
        <li>
          <Label labelId='reviews.li1' />
        </li>
        <li>
          <Label labelId='reviews.li2' />
        </li>
      </ul>
      <Spacer className='!my-8' />
      <form className='my-5 flex flex-col gap-5' onSubmit={handleSubmit}>
        <div className='relative mx-auto mb-2 w-[70%]'>
          {validationErrors.stars?.at(0) && (
            <span className='absolute -right-4 -top-5 rounded-sm bg-red-300 px-2 py-1 text-white shadow'>
              Please give your rating
            </span>
          )}
          <StarsSelector
            selected={formData.stars}
            onSelect={handleStarsSelect}
          />
        </div>
        <CustomInput
          id='name'
          isRequired
          value={formData.name}
          label={getLabel('reviews.name_placeholder')}
          onChange={(event) =>
            setFormData({ ...formData, name: event.target.value })
          }
          error={validationErrors.name?.at(0)}
        />
        <CustomInput
          as='textarea'
          id='text'
          isRequired
          value={formData.text}
          label={getLabel('reviews.text_placeholder')}
          onChange={(event) =>
            setFormData({ ...formData, text: event.target.value })
          }
          error={validationErrors.text?.at(0)}
        />
        <FormError>{error}</FormError>
        <Button
          variant='accent'
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          <Label labelId='reviews.submit_button' />
        </Button>
      </form>
    </div>
  );
};

export default ReviewForm;