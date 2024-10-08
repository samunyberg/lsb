import ClientSearchBar from '@/components/admin/clients/ClientSearchBar';
import ClientTable from '@/components/admin/clients/ClientTable';
import ManagementPage from '@/components/admin/ManagementPage';
import { PaginationData } from '@/components/Pagination';
import { getPaginatedClients } from '@/lib/db/clients';

interface Props {
  searchParams: { pageSize: string; pageNumber: string };
}

const AdminClientsPage = async ({
  searchParams: { pageNumber, pageSize },
}: Props) => {
  const pagination: PaginationData = {
    pageNumber: parseInt(pageNumber) || 1,
    pageSize: parseInt(pageSize) || 10,
  };

  const { clients, count } = await getPaginatedClients(pagination);

  return (
    <ManagementPage title='Clients'>
      <ClientSearchBar />
      <ClientTable clients={clients} itemsCount={count} />
    </ManagementPage>
  );
};

export const dynamic = 'force-dynamic';

export default AdminClientsPage;
