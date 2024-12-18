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
        'w-fit whitespace-nowrap rounded-md px-2 py-1 tracking-wide',
        {
          'bg-red-100 text-red-800': status === 'BOOKED',
          'bg-green-100 text-green-800': status === 'AVAILABLE',
          'bg-orange-100 text-orange-800': status === 'UNAVAILABLE',
          'border-accent bg-white': status === 'PASSED',
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
