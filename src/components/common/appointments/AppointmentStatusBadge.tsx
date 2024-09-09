import { Status } from '@prisma/client';
import { cn } from 'clsx-tailwind-merge';
import Label from '../Label';

interface Props {
  status: Status;
}

const AppointmentStatusBadge = ({ status }: Props) => {
  return (
    <div
      className={cn(
        'min-w-[105px] max-w-[150px] whitespace-nowrap rounded-sm border-2 bg-white px-1 text-center',
        {
          'border-accentRed': status === 'BOOKED',
          'border-accentGreen': status === 'AVAILABLE',
          'border-accentOrange': status === 'UNAVAILABLE',
          'border-accent': status === 'PASSED',
        }
      )}
    >
      <p className='text-sm '>
        <Label labelId={`appointment_status.${status.toLowerCase()}`} />
      </p>
    </div>
  );
};

export default AppointmentStatusBadge;
