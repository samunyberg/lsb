import AdminBookingForm from '@/components/admin/appointments/AdminBookingForm';
import { getAppointmentById } from '@/lib/db/appointments';
import { getClients } from '@/lib/db/clients';
import { getStyles } from '@/lib/db/styles';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

const AdminBookForClientPage = async ({ params: { id } }: Props) => {
  const appointment = await getAppointmentById(parseInt(id));

  const clients = await getClients();

  if (!appointment) notFound();

  const styles = await getStyles();

  return (
    <AdminBookingForm
      appointment={appointment}
      styles={styles}
      clients={clients}
    />
  );
};

export default AdminBookForClientPage;
