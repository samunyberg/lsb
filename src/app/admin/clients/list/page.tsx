import ClientFilters from '@/components/admin/clients/ClientFilters';
import ClientTable from '@/components/admin/clients/ClientTable';
import Pagination from '@/components/Pagination';
import prisma from '@/prisma/client';

interface Props {
  searchParams: { term: string; page: string };
}

const AdminClientListPage = async ({ searchParams }: Props) => {
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 12;

  const where = {
    OR: searchParams.term
      ? [
          { firstName: { contains: searchParams.term } },
          { lastName: { contains: searchParams.term } },
          { email: { contains: searchParams.term } },
          { phone: { contains: searchParams.term } },
        ]
      : undefined,
  };

  const clients = await prisma.user.findMany({
    where,
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { lastName: 'asc' },
  });

  const count = await prisma.user.count({ where });

  return (
    <div className='flex flex-col gap-5 pb-10'>
      <ClientFilters />
      <ClientTable clients={clients} />
      <Pagination currentPage={page} pageSize={pageSize} itemCount={count} />
    </div>
  );
};

export const dynamic = 'force-dynamic';

export default AdminClientListPage;
