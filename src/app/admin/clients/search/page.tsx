import ClientSearchBar from '@/components/admin/clients/ClientSearchBar';
import ClientTable from '@/components/admin/clients/ClientTable';
import ManagementPage from '@/components/admin/ManagementPage';
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

  const getTitle = () =>
    `${count} ${count === 1 ? 'result' : 'results'} for '${term}'`;

  return (
    <ManagementPage title={getTitle()} className='pb-10'>
      <ClientSearchBar />
      <ClientTable clients={clients} itemsCount={count} />
    </ManagementPage>
  );
};

export const dynamic = 'force-dynamic';

export default AdminSearchClientsPage;
