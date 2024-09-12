'use client';

import { useRouter } from 'next/navigation';
import { FaHistory } from 'react-icons/fa';
import Label from './Label';

interface Props {
  clientId: string;
}

const AppointmentHistoryLink = ({ clientId }: Props) => {
  const router = useRouter();

  return (
    <div
      className='flex cursor-pointer items-center gap-2'
      role='link'
      aria-label='View appointment history'
    >
      <FaHistory />
      <span
        className='transition-all hover:text-accent active:text-accent'
        onClick={() => router.push(`/account/${clientId}/appointment-history`)}
      >
        <Label labelId='account.client_appointments.appointment_history_button' />
      </span>
    </div>
  );
};

export default AppointmentHistoryLink;
