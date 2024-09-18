import Button from '@/components/common/Button';
import FormError from '@/components/common/forms/FormError';
import FormGroup from '@/components/common/forms/FormGroup';
import TextArea from '@/components/common/forms/TextArea';
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
      <FormGroup error={validationError}>
        <TextArea
          id='adminNote'
          value={formData.adminNote}
          placeholder={getLabel('admin.appointments.note_form_placeholder')}
          onChange={onInputChange}
        />
      </FormGroup>
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
