'use client';

import Button from '@/components/common/Button';
import CustomInput from '@/components/common/forms/CustomInput';
import Label from '@/components/common/Label';
import Modal from '@/components/common/Modal';
import Warning from '@/components/common/Warning';
import useLanguage from '@/hooks/useLanguage';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  isVisible: boolean;
  endpoint: string;
  initialValue: string;
  onClose: () => void;
}

const AdminNoteForm = ({
  isVisible,
  endpoint,
  initialValue,
  onClose,
}: Props) => {
  const router = useRouter();
  const { getLabel } = useLanguage();
  const [note, setNote] = useState(initialValue);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [error, setError] = useState('');

  const closeNoteForm = () => {
    onClose();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!note) {
      setValidationError('This field is required.');
      return;
    }

    try {
      setIsSubmitting(true);
      await axios.patch(endpoint, { note });
      handleSubmitSuccess();
    } catch (error: unknown) {
      if (error instanceof AxiosError) setError(error.response?.data.error);
      else setError('Whoops! Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setValidationError('');
    setError('');
    onClose();
  };

  const clearErrors = () => {
    setValidationError('');
    setError('');
  };

  const handleSubmitSuccess = () => {
    clearErrors();
    closeNoteForm();
    toast.success(initialValue ? 'Note edited' : 'Note added');
    router.refresh();
  };

  const getButtonLabel = () => {
    return initialValue ? (
      <Label labelId='admin.note_form.edit_button' />
    ) : (
      <Label labelId='admin.note_form.add_button' />
    );
  };

  return (
    <Modal
      isVisible={isVisible}
      header={<h1 className='text-lg font-semibold'>{getButtonLabel()}</h1>}
      content={
        <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
          <Warning>{error}</Warning>
          <CustomInput
            as='textarea'
            id='adminNote'
            label={getLabel('admin.note_form_placeholder')}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            error={validationError}
          />
          <div className='mt-5 flex flex-col gap-4'>
            <Button type='submit' variant='accent' isLoading={isSubmitting}>
              {getButtonLabel()}
            </Button>
            <Button type='button' onClick={handleCancel}>
              <Label labelId='general.cancel' />
            </Button>
          </div>
        </form>
      }
      onClose={onClose}
    />
  );
};

export default AdminNoteForm;
