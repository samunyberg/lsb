'use client';

import Button from '@/components/common/Button';
import CustomInput from '@/components/common/forms/CustomInput';
import Label from '@/components/common/Label';
import Warning from '@/components/common/Warning';
import useLanguage from '@/hooks/useLanguage';
import useLocalisedFormSchema from '@/hooks/useLocalisedFormSchema';
import { Service } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

export interface ServiceFormData {
  name_en: string;
  name_fi: string;
  description_en: string;
  description_fi: string;
  price: number | string;
}

export interface ServiceFormValidationErrors {
  name_en?: string[];
  name_fi?: string[];
  description_en?: string[];
  description_fi?: string[];
  price?: string[];
}

interface Props {
  service?: Service;
  styleId?: number;
}

const ServiceForm = ({ service, styleId }: Props) => {
  const { getLabel } = useLanguage();
  const router = useRouter();
  const { serviceSchema } = useLocalisedFormSchema();
  const [formData, setFormData] = useState<ServiceFormData>({
    name_en: service?.name_en || '',
    name_fi: service?.name_fi || '',
    description_en: service?.description_en || '',
    description_fi: service?.description_fi || '',
    price: service?.price || '',
  });
  const [initialFormData] = useState(formData);
  const [validationErrors, setValidationErrors] =
    useState<ServiceFormValidationErrors>({});
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (JSON.stringify(formData) === JSON.stringify(initialFormData)) {
      toast.info('No changes detected');
      return;
    }

    setError('');
    setValidationErrors({});

    const validationResult = serviceSchema.safeParse(formData);
    if (!validationResult.success) {
      setValidationErrors(validationResult.error.flatten().fieldErrors);
      return;
    }

    const sendRequest = async () => {
      const endpoint = service
        ? `/api/admin/styles/${service.styleId}/services/${service.id}`
        : `/api/admin/styles/${styleId}/services`;

      service
        ? await axios.patch(endpoint, formData)
        : await axios.post(endpoint, formData);
    };

    try {
      setIsSubmitting(true);
      await sendRequest();
      handleSubmitSuccess();
    } catch (error: unknown) {
      if (error instanceof AxiosError) setError(error.response?.data.error);
      else setError('Whoops! Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitSuccess = () => {
    if (service) {
      router.refresh();
      toast.success('Service edited');
    } else {
      router.push(`/admin/styles/${styleId}`);
      router.refresh();
      toast.success('Service created');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value === '' || /^[0-9]*(\.[0-9]{0,2})?$/.test(value)) {
      setFormData({ ...formData, price: !value ? '' : parseFloat(value) });
    }
  };

  return (
    <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
      <Warning>{error}</Warning>
      <CustomInput
        id='name_en'
        label={getLabel('service_form.name_en')}
        value={formData.name_en}
        onChange={handleInputChange}
        error={validationErrors.name_en?.at(0)}
      />
      <CustomInput
        id='name_fi'
        label={getLabel('service_form.name_fi')}
        value={formData.name_fi}
        onChange={handleInputChange}
        error={validationErrors.name_fi?.at(0)}
      />
      <CustomInput
        id='description_en'
        label={getLabel('service_form.description_en')}
        value={formData.description_en}
        onChange={handleInputChange}
        error={validationErrors.description_en?.at(0)}
      />
      <CustomInput
        id='description_fi'
        label={getLabel('service_form.description_fi')}
        value={formData.description_fi}
        onChange={handleInputChange}
        error={validationErrors.description_fi?.at(0)}
      />
      <CustomInput
        id='price'
        label={getLabel('service_form.price')}
        type='number'
        inputMode='decimal'
        min='0'
        step='0.01'
        value={formData.price}
        onChange={handlePriceChange}
        error={validationErrors.price?.at(0)}
      />
      <Button
        type='submit'
        variant='accent'
        className='py-3 md:w-fit md:self-end'
        isLoading={isSubmitting}
      >
        {service ? (
          <Label labelId='service_form.edit_button' />
        ) : (
          <Label labelId='service_form.add_button' />
        )}
      </Button>
    </form>
  );
};

export default ServiceForm;
