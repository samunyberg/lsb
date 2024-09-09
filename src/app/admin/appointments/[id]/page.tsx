import AppointmentOverview from '@/components/admin/appointments/AppointmentOverview';
import { getAppointmentById } from '@/lib/db/appointments';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

const AdminAppointmentPage = async ({ params: { id } }: Props) => {
  const appointment = await getAppointmentById(parseInt(id));

  if (!appointment) notFound();

  return <AppointmentOverview appointment={appointment} />;
};

export default AdminAppointmentPage;
