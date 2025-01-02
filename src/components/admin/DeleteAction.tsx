import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import Warning from '@/components/common/Warning';
import useLanguage from '@/hooks/useLanguage';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RiErrorWarningLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import CustomInput from '../common/forms/CustomInput';
import Label from '../common/Label';

interface Props {
  isVisible: boolean;
  endpoint: string;
  callbackUrl: string;
  onClose: () => void;
}

const DeleteAction = ({ isVisible, endpoint, callbackUrl, onClose }: Props) => {
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
          <Warning className='p-5'>
            <div className='flex items-center gap-1'>
              <RiErrorWarningLine size={25} />
              <p className='mr-2 text-lg font-semibold'>
                <Label labelId='confirmation_dialog.header' />
              </p>
              <Label labelId='confirmation_dialog.content' />
            </div>
          </Warning>
          <CustomInput
            id='name'
            label={getLabel('confirmation_dialog.confirm')}
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
          <Warning>{error}</Warning>
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

export default DeleteAction;
