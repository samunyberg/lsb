import { Step } from '@/lib/types';
import Panel from '../common/Panel';
import BookingTime from './BookingTime';
import ProgressSteps from './ProgressSteps';

interface Props {
  steps: Step[];
  currentStep: number;
}

const BookingHeader = ({ currentStep, steps }: Props) => {
  return (
    <Panel className='bg-transparent p-2 shadow-none'>
      <BookingTime />
      <ProgressSteps currentStep={currentStep} steps={steps} />
    </Panel>
  );
};

export default BookingHeader;
