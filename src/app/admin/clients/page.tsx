import ClientTable from '@/components/admin/clients/ClientTable';
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

  return <ClientTable clients={clients} itemsCount={count} />;
};

export const dynamic = 'force-dynamic';

export default AdminClientsPage;
