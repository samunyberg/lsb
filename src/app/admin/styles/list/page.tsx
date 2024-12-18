import StyleTable from '@/components/admin/styles/StyleTable';
import StyleTableActions from '@/components/admin/styles/StyleTableActions';
import prisma from '@/prisma/client';

interface Props {
  searchParams: { page: string };
}

const AdminStyleListPage = async ({ searchParams }: Props) => {
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 12;

  const styles = await prisma.style.findMany({
    include: { services: true },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return (
    <div className='flex flex-col gap-5'>
      <StyleTableActions />
      <StyleTable styles={styles} />
    </div>
  );
};

export const dynamic = 'force-dynamic';

export default AdminStyleListPage;
