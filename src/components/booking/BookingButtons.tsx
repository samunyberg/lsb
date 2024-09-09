import { Step } from '@/lib/types';
import Button from '../common/Button';
import Label from '../common/Label';

interface Props {
  steps: Step[];
  currentStep: number;
  onBackClick: () => void;
  onNextClick: () => void;
  isNextDisabled: boolean;
  isSubmitting: boolean;
}

const BookingButtons = ({
  steps,
  currentStep,
  onBackClick,
  onNextClick,
  isNextDisabled,
  isSubmitting,
}: Props) => {
  return (
    <div className='flex flex-col gap-5 md:flex-row-reverse md:justify-between'>
      <Button
        variant='accent'
        className='lg:w-fit lg:min-w-[200px]'
        onClick={onNextClick}
        disabled={isNextDisabled}
        isLoading={isSubmitting}
      >
        {currentStep === steps.length ? (
          <Label labelId='book.buttons.book_button' />
        ) : (
          <Label labelId='general.next' />
        )}
      </Button>
      {currentStep > 1 && (
        <Button
          variant='primary'
          className='lg:w-fit lg:min-w-[200px]'
          onClick={onBackClick}
        >
          <Label labelId='general.back' />
        </Button>
      )}
    </div>
  );
};

export default BookingButtons;
