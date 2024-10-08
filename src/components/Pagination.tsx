import useLanguage from '@/hooks/useLanguage';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Button from './common/Button';
import Label from './common/Label';

export interface PaginationData {
  pageNumber: number;
  pageSize: number;
}

interface Props {
  className?: string;
  itemsCount: number;
}

const Pagination = ({ className = '', itemsCount }: Props) => {
  const router = useRouter();
  const { getLabel } = useLanguage();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const currentPage = parseInt(searchParams.get('pageNumber') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '10');
  const totalPages = Math.ceil(itemsCount / pageSize);

  const params = new URLSearchParams(searchParams.toString());

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      params.set('pageNumber', (currentPage - 1).toString());
      params.set('pageSize', pageSize.toString());
      router.replace(`${pathName}?${params.toString()}`);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      params.set('pageNumber', (currentPage + 1).toString());
      params.set('pageSize', pageSize.toString());
      router.replace(`${pathName}?${params.toString()}`);
    }
  };

  if (itemsCount <= pageSize) return null;

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <Button
        className='w-fit'
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        <Label labelId='general.previous' />
      </Button>
      <div className='flex gap-2 text-sm '>
        <span>{`${getLabel('pagination.results')}: ${itemsCount}`}</span>
        <span>|</span>
        <span>{`${getLabel('pagination.page')} ${currentPage} / ${totalPages}`}</span>
      </div>
      <Button
        className='w-fit'
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        <Label labelId='general.next' />
      </Button>
    </div>
  );
};

export default Pagination;
