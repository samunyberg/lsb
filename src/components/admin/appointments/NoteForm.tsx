import Button from '@/components/common/Button';
import CustomInput from '@/components/common/forms/CustomInput';
import FormError from '@/components/common/forms/FormError';
import Label from '@/components/common/Label';
import useLanguage from '@/hooks/useLanguage';
import { ReactNode } from 'react';
import { FormData } from './AdminNoteForm';

interface Props {
  formData: FormData;
  onInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  error: string;
  validationError?: string;
  isSubmitting: boolean;
  getLabels: () => ReactNode;
}

const NoteForm = ({
  formData,
  onInputChange,
  onSubmit,
  onCancel,
  error,
  validationError,
  isSubmitting,
  getLabels,
}: Props) => {
  const { getLabel } = useLanguage();

  return (
    <form className='flex flex-col gap-2' onSubmit={onSubmit}>
      <FormError>{error}</FormError>
      <CustomInput
        as='textarea'
        id='adminNote'
        label={getLabel('admin.appointments.note_form_placeholder')}
        value={formData.adminNote}
        onChange={onInputChange}
        error={validationError}
      />
      <div className='mt-5 flex flex-col gap-4'>
        <Button type='submit' variant='accent' isLoading={isSubmitting}>
          {getLabels()}
        </Button>
        <Button type='button' onClick={onCancel}>
          <Label labelId='general.cancel' />
        </Button>
      </div>
    </form>
  );
};

export default NoteForm;
