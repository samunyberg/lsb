import AppointmentTable from '@/components/admin/appointments/AppointmentTable';
import { PaginationData } from '@/components/Pagination';
import { getAdminInitialAppointments } from '@/lib/db/appointments';

interface Props {
  searchParams: { pageSize: string; pageNumber: string };
}

const AdminAppointmentsPage = async ({
  searchParams: { pageNumber, pageSize },
}: Props) => {
  const pagination: PaginationData = {
    pageNumber: parseInt(pageNumber) || 1,
    pageSize: parseInt(pageSize) || 10,
  };

  const { appointments, count } = await getAdminInitialAppointments(pagination);

  return (
      <AppointmentTable appointments={appointments} itemsCount={count} />
  );
};

export const dynamic = 'force-dynamic';

export default AdminAppointmentsPage;
