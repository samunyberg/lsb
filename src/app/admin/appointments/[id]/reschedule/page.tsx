import Reschedule from '@/components/admin/appointments/Reschedule';
import {
  getAppointmentById,
  getUpcomingAppointments,
} from '@/lib/db/appointments';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

const AdminReschedulePage = async ({ params: { id } }: Props) => {
  const appointment = await getAppointmentById(parseInt(id));

  if (!appointment) notFound();

  const upcomingAppointments = await getUpcomingAppointments();

  return (
    <Reschedule
      oldAppointment={appointment}
      upcomingAppointments={upcomingAppointments}
    />
  );
};

export default AdminReschedulePage;
