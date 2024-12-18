'use client';

import useLanguage from '@/hooks/useLanguage';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md';
import Button from './common/Button';

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const { getLabel } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push('?' + params.toString());
  };

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  return (
    <div className='flex h-8 justify-center'>
      <div className='flex items-center justify-between gap-1 md:gap-3'>
        <Button
          small
          disabled={currentPage === 1}
          onClick={() => changePage(1)}
        >
          <MdKeyboardDoubleArrowLeft size={20} />
        </Button>
        <Button
          small
          disabled={currentPage === 1}
          onClick={() => changePage(currentPage - 1)}
        >
          <MdKeyboardArrowLeft size={20} />
        </Button>
        <span className='whitespace-nowrap px-1 text-sm'>{`${getLabel('pagination.page')} ${currentPage} / ${pageCount}`}</span>
        <Button
          small
          disabled={currentPage === pageCount}
          onClick={() => changePage(currentPage + 1)}
        >
          <MdKeyboardArrowRight size={20} />
        </Button>
        <Button
          small
          disabled={currentPage === pageCount}
          onClick={() => changePage(pageCount)}
        >
          <MdKeyboardDoubleArrowRight size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
