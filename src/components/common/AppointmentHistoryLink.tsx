'use client';

import Link from 'next/link';
import { FaHistory } from 'react-icons/fa';
import Label from './Label';
import Section from './Section';

interface Props {
  href: string;
}

const AppointmentHistoryLink = ({ href }: Props) => {
  return (
    <Section>
      <Link
        href={href}
        className='ml-3 flex cursor-pointer items-center gap-2'
        role='link'
        aria-label='View appointment history'
      >
        <FaHistory />
        <span className='underline transition-all hover:text-accent active:text-accent'>
          <Label labelId='account.client_appointments.appointment_history_button' />
        </span>
      </Link>
    </Section>
  );
};

export default AppointmentHistoryLink;
