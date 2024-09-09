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

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      router.replace(`${pathName}?pageNumber=${currentPage - 1}`);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages)
      router.replace(`${pathName}?pageNumber=${currentPage + 1}`);
  };

  if (itemsCount <= pageSize) return null;

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <Button
        className='!h-fit !w-fit !px-2 !py-1 !text-xs'
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        <Label labelId='general.previous' />
      </Button>
      <div className='flex gap-2 text-xs '>
        <span>{`${getLabel('pagination.results')}: ${itemsCount}`}</span>
        <span>|</span>
        <span>{`${getLabel('pagination.page')} ${currentPage} / ${totalPages}`}</span>
      </div>
      <Button
        className='!h-fit !w-fit !px-2 !py-1 !text-xs'
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        <Label labelId='general.next' />
      </Button>
    </div>
  );
};

export default Pagination;
