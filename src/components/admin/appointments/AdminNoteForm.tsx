import Label from '@/components/common/Label';
import Modal from '@/components/common/Modal';
import useLocalisedFormSchema from '@/hooks/useLocalisedFormSchema';
import { Appointment } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import NoteForm from './NoteForm';

export interface FormData {
  adminNote: string;
}

interface Props {
  isVisible: boolean;
  appointment: Appointment;
  onClose: () => void;
}

const AdminNoteForm = ({ isVisible, appointment, onClose }: Props) => {
  const router = useRouter();
  const { adminNoteSchema } = useLocalisedFormSchema();

  const initialFormData: FormData = {
    adminNote: appointment.adminNote || '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [validationError, setValidationError] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const closeNoteForm = () => {
    onClose();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationResult = adminNoteSchema.safeParse(formData);
    if (!validationResult.success) {
      setValidationError(
        validationResult.error.flatten().fieldErrors.adminNote?.at(0) || ''
      );
      return;
    }

    try {
      setIsSubmitting(true);
      await axios.patch(
        `/api/admin/appointments/${appointment.id}/update`,
        formData
      );
      handleSubmitSuccess();
    } catch (error: unknown) {
      if (error instanceof AxiosError) setError(error.response?.data.error);
      else setError('Whoops! Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const initializeFormData = () => {
    setFormData(initialFormData);
  };

  const handleCancel = () => {
    setValidationError('');
    setError('');
    initializeFormData();
    onClose();
  };

  const clearErrors = () => {
    setValidationError('');
    setError('');
  };

  const handleSubmitSuccess = () => {
    clearErrors();
    initializeFormData();
    closeNoteForm();
    toast.success(appointment.adminNote ? 'Note edited' : 'Note added');
    router.refresh();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, adminNote: event.target.value });
  };

  const getLabel = () => {
    return appointment.adminNote ? (
      <Label labelId='admin.appointments.note_form.edit_button' />
    ) : (
      <Label labelId='admin.appointments.note_form.add_button' />
    );
  };

  return (
    <Modal
      isVisible={isVisible}
      header={<h1 className='text-lg font-semibold'>{getLabel()}</h1>}
      content={
        <NoteForm
          formData={formData}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          error={error}
          validationError={validationError}
          isSubmitting={isSubmitting}
          getLabels={getLabel}
        />
      }
      onClose={onClose}
    />
  );
};

export default AdminNoteForm;
