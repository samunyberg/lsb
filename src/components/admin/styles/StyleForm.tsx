'use client';

import Button from '@/components/common/Button';
import CustomInput from '@/components/common/forms/CustomInput';
import FormError from '@/components/common/forms/FormError';
import Label from '@/components/common/Label';
import useLanguage from '@/hooks/useLanguage';
import useLocalisedFormSchema from '@/hooks/useLocalisedFormSchema';
import { Style } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import { CldImage } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import UploadImage from './UploadImage';

export interface StyleFormData {
  name: string;
  imageId: string;
}

export interface StyleFormValidationErrors {
  name?: string[];
}

interface Props {
  style?: Style;
}

const StyleForm = ({ style }: Props) => {
  const { getLabel } = useLanguage();
  const router = useRouter();
  const { styleSchema } = useLocalisedFormSchema();

  const initialData: StyleFormData = {
    name: style?.name || '',
    imageId: style?.imageUrl || '',
  };

  const [formData, setFormData] = useState<StyleFormData>(initialData);
  const [validationErrors, setValidationErrors] =
    useState<StyleFormValidationErrors>({});
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Prevent submission if form data hasn't changed
    if (JSON.stringify(formData) === JSON.stringify(initialData)) {
      toast.info('No changes detected');
      return;
    }

    const validationResult = styleSchema.safeParse(formData);
    if (!validationResult.success) {
      setValidationErrors(validationResult.error.flatten().fieldErrors);
      return;
    }

    const sendRequest = async () => {
      const endpoint = style
        ? `/api/admin/styles/${style.id}`
        : '/api/admin/styles';

      style
        ? await axios.patch(endpoint, formData)
        : await axios.post(endpoint, formData);
    };

    try {
      setIsSubmitting(true);
      clearErrors();
      await sendRequest();
      handleSubmitSuccess();
    } catch (error: unknown) {
      if (error instanceof AxiosError) setError(error.response?.data.error);
      else setError('Whoops! Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearErrors = () => {
    setError('');
    setValidationErrors({});
  };

  const handleSubmitSuccess = () => {
    toast.success(style ? 'Style edited' : 'Style created');
    if (!style) router.back();
    router.refresh();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleImageSelect = (imageId: string) => {
    setFormData((prevData) => ({ ...prevData, imageId }));
  };

  return (
    <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
      <FormError>{error}</FormError>
      <CustomInput
        id='name'
        label={getLabel('style_form.name')}
        value={formData.name}
        onChange={handleInputChange}
        error={validationErrors?.name?.at(0)}
      />
      <div className='flex flex-col'>
        <p className='mb-2 text-lg font-semibold'>
          <Label labelId='style_form.image_preview' />
        </p>
        <div className='relative mb-5 h-[200px] w-full self-center overflow-hidden rounded-sm'>
          <CldImage
            key={formData.imageId}
            src={formData.imageId || 'fallback-image_mllokb'}
            alt='service image'
            fill
            priority
            className='z-10 object-cover'
          />
        </div>
        <UploadImage
          onImageSelect={handleImageSelect}
          buttonLabel={
            style ? (
              <Label labelId='style_form.change_image' />
            ) : (
              <Label labelId='style_form.upload_image' />
            )
          }
        />
      </div>
      <Button
        type='submit'
        variant='accent'
        className='mt-2'
        isLoading={isSubmitting}
      >
        {style ? (
          <Label labelId='style_form.edit_button' />
        ) : (
          <Label labelId='style_form.add_button' />
        )}
      </Button>
    </form>
  );
};

export default StyleForm;
