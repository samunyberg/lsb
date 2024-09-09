import StyleTable from '@/components/admin/styles/StyleTable';
import { PaginationData } from '@/components/Pagination';
import { getPaginatedStyles } from '@/lib/db/styles';

interface Props {
  searchParams: { pageSize: string; pageNumber: string };
}

const AdminStylesPage = async ({
  searchParams: { pageNumber, pageSize },
}: Props) => {
  const paginationData: PaginationData = {
    pageNumber: parseInt(pageNumber) || 1,
    pageSize: parseInt(pageSize) || 10,
  };

  const { styles, count } = await getPaginatedStyles(paginationData);

  return <StyleTable styles={styles} itemsCount={count} />;
};

export const dynamic = 'force-dynamic';

export default AdminStylesPage;
