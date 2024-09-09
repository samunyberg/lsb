import Button from '@/components/common/Button';
import FormError from '@/components/common/forms/FormError';
import FormGroup from '@/components/common/forms/FormGroup';
import Input from '@/components/common/forms/Input';
import Modal from '@/components/common/Modal';
import useLanguage from '@/hooks/useLanguage';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RiErrorWarningLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import Label from '../common/Label';

interface Props {
  isVisible: boolean;
  endpoint: string;
  callbackUrl: string;
  onClose: () => void;
}

const DeleteConfirmation = ({
  isVisible,
  endpoint,
  callbackUrl,
  onClose,
}: Props) => {
  const router = useRouter();
  const { getLabel } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [text, setText] = useState('');

  const textsMatch = () => text === 'Delete';

  const handleDelete = async () => {
    try {
      setIsSubmitting(true);
      setError('');
      await axios.delete(endpoint);
      router.push(callbackUrl);
      router.refresh();
      toast.success('Deletion successful');
    } catch (error: unknown) {
      if (error instanceof AxiosError) setError(error.response?.data.error);
      else {
        setError('Whoops! Something went wrong.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      header={
        <h1 className='text-lg font-semibold'>
          <Label labelId='general.delete' />
        </h1>
      }
      content={
        <div className='flex flex-col gap-5'>
          <div className='flex flex-col gap-4 rounded-sm border-2 border-red-400 px-4 py-3'>
            <div className='flex items-center gap-1'>
              <RiErrorWarningLine size={25} />
              <p className='text-lg font-semibold'>
                <Label labelId='confirmation_dialog.header' />
              </p>
            </div>
            <p className=''>
              <Label labelId='confirmation_dialog.content' />
            </p>
          </div>
          <FormGroup label={getLabel('confirmation_dialog.confirm')}>
            <Input
              id='name'
              type='text'
              placeholder={getLabel('confirmation_dialog.placeholder')}
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
          </FormGroup>
          <FormError>{error}</FormError>
          <div className='mt-5 flex flex-col gap-4'>
            <Button
              variant='accent'
              onClick={handleDelete}
              disabled={!textsMatch()}
              isLoading={isSubmitting}
            >
              <Label labelId='general.delete' />
            </Button>
            <Button onClick={onClose}>
              <Label labelId='general.cancel' />
            </Button>
          </div>
        </div>
      }
      onClose={onClose}
    />
  );
};

export default DeleteConfirmation;
