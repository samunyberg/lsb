import ClientTable from '@/components/admin/clients/ClientTable';
import { PaginationData } from '@/components/Pagination';
import { getClientsBySearchTerm } from '@/lib/db/clients';

interface Props {
  searchParams: { term: string; pageSize: string; pageNumber: string };
}

const AdminSearchClientsPage = async ({
  searchParams: { term, pageNumber, pageSize },
}: Props) => {
  const pagination: PaginationData = {
    pageNumber: parseInt(pageNumber) || 1,
    pageSize: parseInt(pageSize) || 10,
  };

  const { clients, count } = await getClientsBySearchTerm(term, pagination);

  return <ClientTable clients={clients} itemsCount={count} />;
};

export const dynamic = 'force-dynamic';

export default AdminSearchClientsPage;
