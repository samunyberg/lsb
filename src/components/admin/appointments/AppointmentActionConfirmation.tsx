'use client';

import Button from '@/components/common/Button';
import Label from '@/components/common/Label';
import Modal from '@/components/common/Modal';
import Warning from '@/components/common/Warning';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

export type AppointmentAction =
  | 'cancel'
  | 'make-unavailable'
  | 'make-available'
  | 'reschedule'
  | null;

interface Props {
  isVisible: boolean;
  action: AppointmentAction;
  appointmentId: number;
  onClose: () => void;
}

const AppointmentActionConfirmation = ({
  isVisible,
  action,
  appointmentId,
  onClose,
}: Props) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleAction = async () => {
    try {
      setIsSubmitting(true);
      await axios.patch(`/api/admin/appointments/${appointmentId}/${action}`);
      onClose();
      router.refresh();
      displayNotification();
    } catch (error: unknown) {
      let errorMessage = '';
      if (error instanceof AxiosError)
        errorMessage = error.response?.data.error;
      else errorMessage = 'Whoops! Something went wrong.';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayNotification = () => {
    let message = '';
    if (action === 'cancel') message = 'Appointment cancelled';
    else if (action === 'make-unavailable')
      message = 'Appointment made unavailable';
    else message = 'Appointment made available';

    toast.success(message);
  };

  const getLabelId = () => {
    if (action === 'cancel') return 'admin.appointments.cancel';
    if (action === 'make-unavailable')
      return 'admin.appointments.make_unavailable';
    if (action === 'make-available') return 'admin.appointments.make_available';
    return 'admin.appointments.reschedule';
  };

  return (
    <Modal
      isVisible={isVisible}
      header={
        <h1 className='font-semibold'>{<Label labelId={getLabelId()} />}</h1>
      }
      content={
        <div>
          <h2 className='mb-12 px-4 text-lg'>
            <Label labelId='confirmation_dialog.content' />
          </h2>
          <Warning className='mb-4'>{error}</Warning>
          <div className='flex flex-col gap-4 lg:flex-row-reverse lg:justify-between'>
            <Button
              variant='accent'
              onClick={handleAction}
              isLoading={isSubmitting}
            >
              <Label labelId='general.confirm' />
            </Button>
            <Button onClick={onClose}>
              <Label labelId='general.back' />
            </Button>
          </div>
        </div>
      }
      onClose={onClose}
    />
  );
};

export default AppointmentActionConfirmation;
