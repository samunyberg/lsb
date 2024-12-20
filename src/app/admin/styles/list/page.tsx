import StyleTable from '@/components/admin/styles/StyleTable';
import StyleTableActions from '@/components/admin/styles/StyleTableActions';
import SectionList from '@/components/common/SectionList';
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
    <SectionList>
      <StyleTableActions />
      <StyleTable styles={styles} />
    </SectionList>
  );
};

export const dynamic = 'force-dynamic';

export default AdminStyleListPage;
