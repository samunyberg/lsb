'use client';

import Calendar from '@/components/calendar/Calendar';
import AppointmentPanel from '@/components/common/appointments/AppointmentPanel';
import Button from '@/components/common/Button';
import CheckBox from '@/components/common/CheckBox';
import Label from '@/components/common/Label';
import Modal from '@/components/common/Modal';
import Section from '@/components/common/Section';
import Spacer from '@/components/common/Spacer';
import StrikeThroughText from '@/components/common/StrikeThroughText';
import Warning from '@/components/common/Warning';
import useLocale from '@/hooks/useLocale';
import { AppointmentWithData } from '@/lib/types';
import { Appointment } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { toast } from 'react-toastify';

interface Props {
  oldAppointment: AppointmentWithData;
  upcomingAppointments: AppointmentWithData[];
}

const Reschedule = ({ oldAppointment, upcomingAppointments }: Props) => {
  const router = useRouter();
  const locale = useLocale();
  const [newAppointment, setNewAppointment] = useState<Appointment | null>(
    null
  );
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [sendNotification, setSendNotification] = useState(true);

  const handleReschedule = async () => {
    try {
      setIsSubmitting(true);
      await axios.patch(
        `/api/admin/appointments/${oldAppointment.id}/reschedule`,
        {
          newId: newAppointment?.id,
          clientId: oldAppointment.isRegisteredClient
            ? oldAppointment.clientId
            : null,
          clientName: oldAppointment.clientName,
          clientEmail: oldAppointment.clientEmail,
          clientPhone: oldAppointment.clientPhone,
          styleId: oldAppointment.style!.id,
          styleName: oldAppointment.styleName,
          serviceId: oldAppointment.service!.id,
          serviceNameEn: oldAppointment.serviceNameEn,
          serviceNameFi: oldAppointment.serviceNameFi,
          servicePrice: oldAppointment.servicePrice,
          adminNote: oldAppointment.adminNote,
          sendNotification,
        }
      );
      router.replace('/admin/appointments/' + newAppointment?.id);
      router.refresh();
      setShowConfirmation(false);
      toast.success('Appointment rescheduled successfully');
    } catch (error: unknown) {
      if (error instanceof AxiosError) setError(error.response?.data.error);
      else setError('Whoops! Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAppointmentSelect = (app: Appointment) => {
    setNewAppointment(app);

    setTimeout(() => setShowConfirmation(true), 1000);
  };

  const confirmationModal = (
    <Modal
      isVisible={showConfirmation}
      header={
        <h1 className='text-lg font-semibold'>
          <Label labelId='admin.appointments.reschedule.title' />
        </h1>
      }
      content={
        <div className='flex flex-col gap-4 px-1'>
          <h2 className='mt-5'>
            <Label labelId='admin.appointments.reschedule.confirmation.content' />
          </h2>
          <div className='mb-5 flex items-center justify-center gap-3'>
            <span className='rounded-md border border-black/20 px-2 py-1'>
              {oldAppointment.dateTime.toLocaleString(locale, {
                dateStyle: 'short',
                timeStyle: 'short',
              })}
            </span>
            <FaArrowRight className='self-center' size={12} />
            {newAppointment && (
              <span className='rounded-md border border-black/20 px-2 py-1'>
                {new Date(newAppointment.dateTime).toLocaleString(locale, {
                  dateStyle: 'short',
                  timeStyle: 'short',
                })}
              </span>
            )}
          </div>
          <div
            className='flex items-center gap-2'
            onClick={() => setSendNotification(!sendNotification)}
          >
            <CheckBox isChecked={sendNotification} />
            <Label labelId='admin.appointments.reschedule.confirmation.send_notification_to_client' />
          </div>
          <Spacer />
          <Warning className='mb-4'>{error}</Warning>
          <div className='flex flex-col gap-4 lg:flex-row-reverse lg:justify-between'>
            <Button
              variant='accent'
              onClick={handleReschedule}
              isLoading={isSubmitting}
            >
              <Label labelId='general.confirm' />
            </Button>
            <Button onClick={() => setShowConfirmation(false)}>
              <Label labelId='general.back' />
            </Button>
          </div>
        </div>
      }
      onClose={() => setShowConfirmation(false)}
    />
  );

  return (
    <div className='flex flex-col gap-5 pb-14'>
      <StrikeThroughText className='my-3'>
        Reschedule Appointment
      </StrikeThroughText>
      <Section
        title={
          <Label labelId='admin.appointments.reschedule.original_appointment_time' />
        }
      >
        <AppointmentPanel appointment={oldAppointment} showClient showStyle />
      </Section>
      <Section
        title={
          <Label labelId='admin.appointments.reschedule.select_new_appointment_time' />
        }
      >
        <Calendar
          initialData={upcomingAppointments}
          onAppointmentSelect={handleAppointmentSelect}
          selectedAppointment={newAppointment}
        />
      </Section>
      {confirmationModal}
      <Button onClick={() => router.back()}>
        <Label labelId='general.cancel' />
      </Button>
    </div>
  );
};

export default Reschedule;
