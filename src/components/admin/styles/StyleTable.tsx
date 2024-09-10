'use client';

import useLanguage from '@/hooks/useLanguage';
import { Style } from '@prisma/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaPlus } from 'react-icons/fa';
import { Action } from '../ActionMenu';
import ManagementPage from '../ManagementPage';
import PaginatedTable from '../PaginatedTable';
import { Config } from '../Table';

interface Props {
  styles: Style[];
  itemsCount: number;
}

const StyleTable = ({ styles, itemsCount }: Props) => {
  const { getLabel } = useLanguage();
  const router = useRouter();

  const config: Config<Style> = {
    columns: [
      {
        label: getLabel('style.name'),
        render: (style) => (
          <Link
            className='underline active:text-accent lg:hover:text-accent'
            href={`/admin/styles/${style.id}`}
          >
            {style.name}
          </Link>
        ),
      },
    ],
  };

  const keyFn = (style: Style) => style.id;

  const actions: Action[] = [
    {
      label: getLabel('admin.style_table.add_button'),
      icon: <FaPlus />,
      onClick: () => router.push('/admin/styles/new'),
    },
  ];

  return (
    <ManagementPage title={getLabel('admin.styles.title')} actions={actions}>
      <div className='flex flex-col gap-5'>
        <PaginatedTable
          data={styles}
          config={config}
          keyFn={keyFn}
          itemsCount={itemsCount}
        />
      </div>
    </ManagementPage>
  );
};

export default StyleTable;
