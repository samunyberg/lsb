'use client';

import Calendar from '@/components/calendar/Calendar';
import Section from '@/components/common/Section';
import { Appointment } from '@prisma/client';
import { useRouter } from 'next/navigation';

interface Props {
  initialData: Appointment[];
}

const AdminCalendar = ({ initialData }: Props) => {
  const router = useRouter();

  return (
    <Section>
      <Calendar
        admin
        initialData={initialData}
        onAppointmentSelect={(app) =>
          router.push(`/admin/appointments/${app.id}`)
        }
      />
    </Section>
  );
};

export default AdminCalendar;
