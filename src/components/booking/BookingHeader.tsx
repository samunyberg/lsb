import { Step } from '@/lib/types';
import BookingTime from './BookingTime';
import ProgressSteps from './ProgressSteps';

interface Props {
  steps: Step[];
  currentStep: number;
}

const BookingHeader = ({ currentStep, steps }: Props) => {
  return (
    <>
      <BookingTime />
      <ProgressSteps currentStep={currentStep} steps={steps} />
    </>
  );
};

export default BookingHeader;
