'use client';

import ServiceSelect from '@/components/booking/ServiceSelect';
import Button from '@/components/common/Button';
import Label from '@/components/common/Label';
import Panel from '@/components/common/Panel';
import Spacer from '@/components/common/Spacer';
import AppointmentPanel from '@/components/common/appointments/AppointmentPanel';
import FormError from '@/components/common/forms/FormError';
import FormGroup from '@/components/common/forms/FormGroup';
import Input from '@/components/common/forms/Input';
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
import ManagementPage from '../ManagementPage';
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
    <ManagementPage
      title={<Label labelId='admin.appointments.book_for_client' />}
      className='max-w-xl pb-10'
    >
      <h2 className='mb-2 '>Appointment time:</h2>
      <AppointmentPanel appointment={appointment} showDate showTime />
      <Spacer className='my-8' />
      <BookingModeSelector onModeChange={handleModeChange} />
      <h2 className='mb-4 mt-8 text-lg font-semibold'>
        {mode === 'unregisteredClient' ? 'Client information' : 'Select client'}
      </h2>
      <FormError className='mb-4'>{error}</FormError>
      <form onSubmit={handleSubmit}>
        {mode === 'unregisteredClient' ? (
          <div className='flex flex-col gap-4'>
            <FormGroup
              label='First name'
              error={validationErrors.firstName?.at(0)}
            >
              <Input
                id='firstName'
                placeholder='First name'
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup
              label='Last name'
              error={validationErrors.lastName?.at(0)}
            >
              <Input
                id='lastName'
                placeholder='Last name'
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup label='Email' error={validationErrors.email?.at(0)}>
              <Input
                id='email'
                placeholder='Email'
                value={formData.email}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup label='Phone' error={validationErrors.phone?.at(0)}>
              <Input
                id='phone'
                placeholder='Phone'
                value={formData.phone}
                onChange={handleInputChange}
              />
            </FormGroup>
          </div>
        ) : (
          <div>
            {client && (
              <Panel className='mb-5 flex flex-col p-3'>
                <p className='font-semibold'>{formatName(client)}</p>
                <p className=''>{client.email}</p>
              </Panel>
            )}
            <ClientSelector clients={clients} onSelect={handleClientSelect} />
          </div>
        )}
        <Spacer className='my-8' />
        <div>
          <h3 className='mb-4 text-lg font-semibold'>Style and service</h3>
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
        <Spacer className='my-8' />
        <h4 className='mb-4 text-lg font-semibold'>Note</h4>
        <textarea
          id='note'
          value={formData.note}
          onChange={handleInputChange}
          className='mb-5 h-36 w-full resize-none rounded-sm border border-black/20 bg-bgSoft p-2  transition-all placeholder:text-sm focus:outline-accent'
          placeholder={getLabel('admin.appointments.note_form_placeholder')}
        />
        <div className='mb-10'>
          <p className='mb-2 '>Send confirmation email in:</p>
          <LanguageSelector onChange={handleClientLanguageChange} />
        </div>
        <Button type='submit' variant='accent' isLoading={isSubmitting}>
          Book
        </Button>
      </form>
    </ManagementPage>
  );
};

export default AdminBookingForm;
