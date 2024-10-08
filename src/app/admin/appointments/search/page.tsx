import AppointmentSearchBar from '@/components/admin/appointments/AppointmentSearchBar';
import AppointmentTable from '@/components/admin/appointments/AppointmentTable';
import ManagementPage from '@/components/admin/ManagementPage';
import { PaginationData } from '@/components/Pagination';
import { getPaginatedAppointmentsBySearchTerm } from '@/lib/db/appointments';

export interface AppointmentSearchQuery {
  clientName: string | null;
  startDate: string | null;
  endDate: string | null;
}

interface Props {
  searchParams: {
    pageNumber: string;
    pageSize: string;
    clientName: string | null;
    startDate: string | null;
    endDate: string | null;
  };
}

const AdminSearchAppointmentsPage = async ({ searchParams }: Props) => {
  const pagination: PaginationData = {
    pageNumber: parseInt(searchParams.pageNumber) || 1,
    pageSize: parseInt(searchParams.pageSize) || 10,
  };

  const query: AppointmentSearchQuery = {
    clientName: searchParams.clientName,
    startDate: searchParams.startDate,
    endDate: searchParams.endDate,
  };

  const { appointments, count } = await getPaginatedAppointmentsBySearchTerm(
    query,
    pagination
  );

  const getTitle = () => `${count} results`;

  return (
    <ManagementPage title={getTitle()} className='pb-10'>
      <AppointmentSearchBar />
      <AppointmentTable appointments={appointments} itemsCount={count} />
    </ManagementPage>
  );
};

export default AdminSearchAppointmentsPage;
