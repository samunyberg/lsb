import { Step } from '@/lib/types';
import { cn } from 'clsx-tailwind-merge';
import { FaCheck } from 'react-icons/fa';
import Label from '../common/Label';
import Panel from '../common/Panel';

interface Props {
  currentStep: number;
  steps: Step[];
}

const ProgressSteps = ({ currentStep, steps }: Props) => {
  const calculateWidth = () => {
    return ((currentStep - 1) / (steps.length - 1)) * 100 + '%';
  };

  return (
    <Panel className='px-4 py-2'>
      <div className='mx-auto flex h-14 w-[90%] justify-center'>
        <div className='relative flex w-full items-center justify-between'>
          <div className='absolute z-0 h-1 w-full bg-black/10' />
          <div
            className='absolute z-0 h-1 bg-accent transition-all duration-300 ease-in'
            style={{ width: calculateWidth() }}
          />
          {steps.map((step) => (
            <span
              key={step.stepNumber}
              className={cn(
                'z-10 flex size-7 items-center justify-center rounded-full border-2 border-accent bg-white transition-all delay-300 duration-300 ease-in',
                {
                  'scale-125 border-black/20 bg-accent text-white':
                    step.stepNumber === currentStep,
                }
              )}
            >
              {step.stepNumber < currentStep ? (
                <FaCheck size={12} className='text-primary' />
              ) : (
                step.stepNumber
              )}
            </span>
          ))}
        </div>
      </div>
      <div
        className={cn('flex pb-2 font-semibold uppercase tracking-wide', {
          'justify-start': currentStep === 1,
          'justify-center': currentStep === 2,
          'justify-end': currentStep === 3,
        })}
      >
        <Label labelId={steps[currentStep - 1].label} />
      </div>
    </Panel>
  );
};

export default ProgressSteps;
