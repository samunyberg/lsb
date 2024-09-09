import AppointmentTable from '@/components/admin/appointments/AppointmentTable';
import { PaginationData } from '@/components/Pagination';
import { getPaginatedAppointmentsBySearchTerm } from '@/lib/db/appointments';

export interface AppointmentSearchQuery {
  term: string | null;
  date: string | null;
}

interface Props {
  searchParams: {
    pageNumber: string;
    pageSize: string;
    term: string | null;
    date: string | null;
  };
}

const AdminSearchAppointmentsPage = async ({ searchParams }: Props) => {
  const pagination: PaginationData = {
    pageNumber: parseInt(searchParams.pageNumber) || 1,
    pageSize: parseInt(searchParams.pageSize) || 10,
  };

  const query: AppointmentSearchQuery = {
    term: searchParams.term,
    date: searchParams.date,
  };

  const { appointments, count } = await getPaginatedAppointmentsBySearchTerm(
    query,
    pagination
  );

  return <AppointmentTable appointments={appointments} itemsCount={count} />;
};

export default AdminSearchAppointmentsPage;
