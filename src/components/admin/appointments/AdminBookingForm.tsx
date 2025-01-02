'use client';

import ServiceSelect from '@/components/booking/ServiceSelect';
import AppointmentPanel from '@/components/common/appointments/AppointmentPanel';
import Button from '@/components/common/Button';
import CustomInput from '@/components/common/forms/CustomInput';
import Label from '@/components/common/Label';
import Section from '@/components/common/Section';
import Warning from '@/components/common/Warning';
import useLanguage from '@/hooks/useLanguage';
import useLocalisedFormSchema from '@/hooks/useLocalisedFormSchema';
import type {
  AppointmentWithData,
  Client,
  StyleWithServices,
} from '@/lib/types';
import { formatName } from '@/lib/utils/stringUtils';
import { Language } from '@/providers/language/LanguageProvider';
import { Service, Style } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import BookingModeSelector from './BookingModeSelector';
import ClientSelector from './ClientSelector';
import LanguageSelector from './LanguageSelector';

export type Mode = 'registeredClient' | 'unregisteredClient';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  note: string;
  style: Style | null;
  service: Service | null;
  clientLanguage: Language;
}

interface FieldErrors {
  firstName?: string[];
  lastName?: string[];
  email?: string[];
  phone?: string[];
}

interface Props {
  appointment: AppointmentWithData;
  styles: StyleWithServices[];
  clients: Client[];
}

const AdminBookingForm = ({ appointment, styles, clients }: Props) => {
  const router = useRouter();
  const { getLabel } = useLanguage();
  const { adminBookingFormSchema } = useLocalisedFormSchema();
  const [mode, setMode] = useState<Mode>('unregisteredClient');
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    note: '',
    style: null,
    service: null,
    clientLanguage: 'fi',
  });
  const [client, setClient] = useState<Client | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({} as FieldErrors);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (mode === 'unregisteredClient') {
      const validationResult = adminBookingFormSchema.safeParse(formData);
      if (!validationResult.success) {
        const fieldErrors = validationResult.error.flatten().fieldErrors;
        setValidationErrors(fieldErrors);
        toast.error('Please fix input errors');
        return;
      }
    }

    if (!formData.style || !formData.service) {
      toast.error('Select style and service');
      return;
    }

    try {
      setIsSubmitting(true);
      await axios.patch(`/api/admin/appointments/${appointment.id}/book`, {
        isRegisteredClient: mode === 'registeredClient',
        clientId: client?.id || null,
        firstName: formData.firstName || null,
        lastName: formData.lastName || null,
        email: formData.email || null,
        phone: formData.phone || null,
        note: formData.note || null,
        styleId: formData.style!.id,
        serviceId: formData.service!.id,
        clientLanguage: formData.clientLanguage,
      });
      router.replace(`/admin/appointments/${appointment.id}`);
      router.refresh();
      toast.success('Appointment booked');
    } catch (error: unknown) {
      if (error instanceof AxiosError) setError(error.response?.data.error);
      else setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModeChange = () => {
    setFormData({} as FormData);

    if (mode === 'registeredClient') {
      setClient(null);
      setMode('unregisteredClient');
    } else setMode('registeredClient');
  };

  const handleClientLanguageChange = (language: Language) => {
    setFormData({ ...formData, clientLanguage: language });
  };

  const handleClientSelect = (client: Client) => setClient(client);

  const handleStyleSelect = (style: Style) => {
    setFormData({ ...formData, style: style || null });
  };

  const handleServiceSelect = (service: Service | null) => {
    setFormData({ ...formData, service: service || null });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.target;
    if (id === 'note') setFormData({ ...formData, [id]: value });
    else setFormData({ ...formData, [id]: value.trim() });
  };

  return (
    <form className='flex flex-col gap-5 pb-14' onSubmit={handleSubmit}>
      <Section title={<Label labelId='admin.appointments.book_for_client' />}>
        <AppointmentPanel appointment={appointment} showDate showTime />
      </Section>
      <BookingModeSelector onModeChange={handleModeChange} />
      <Section
        title={
          mode === 'unregisteredClient' ? 'Client information' : 'Select client'
        }
      >
        <Warning className='mb-4'>{error}</Warning>
        {mode === 'unregisteredClient' ? (
          <div className='flex flex-col gap-4'>
            <CustomInput
              id='firstName'
              label='First name'
              value={formData.firstName}
              onChange={handleInputChange}
              error={validationErrors.firstName?.at(0)}
            />
            <CustomInput
              id='lastName'
              label='Last name'
              value={formData.lastName}
              onChange={handleInputChange}
              error={validationErrors.lastName?.at(0)}
            />
            <CustomInput
              id='email'
              label='Email'
              value={formData.email}
              onChange={handleInputChange}
              error={validationErrors.email?.at(0)}
            />
            <CustomInput
              id='phone'
              label='Phone'
              value={formData.phone}
              onChange={handleInputChange}
              error={validationErrors.phone?.at(0)}
            />
          </div>
        ) : (
          <div>
            {client && (
              <div className='mb-4 flex flex-col px-2'>
                <p className='font-semibold'>{formatName(client)}</p>
                <p className=''>{client.email}</p>
              </div>
            )}
            <ClientSelector clients={clients} onSelect={handleClientSelect} />
          </div>
        )}
      </Section>
      <Section title='Style and service'>
        <div>
          <div className='flex flex-col gap-3'>
            {styles.map((style) => (
              <ServiceSelect
                key={style.id}
                style={style}
                selectedStyle={formData.style}
                onStyleSelect={handleStyleSelect}
                selectedService={formData.service}
                onServiceSelect={handleServiceSelect}
              />
            ))}
          </div>
        </div>
      </Section>
      <Section title='Note'>
        <CustomInput
          as='textarea'
          id='note'
          label={getLabel('admin.appointments.note_form_placeholder')}
          value={formData.note}
          onChange={handleInputChange}
        />
      </Section>
      <div>
        <p className='mb-2'>Send confirmation email in:</p>
        <LanguageSelector onChange={handleClientLanguageChange} />
      </div>
      <Button
        type='submit'
        className='mt-5'
        variant='accent'
        isLoading={isSubmitting}
      >
        Book
      </Button>
    </form>
  );
};

export default AdminBookingForm;
