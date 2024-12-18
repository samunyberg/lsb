'use client';

import useLanguage from '@/hooks/useLanguage';
import { Style } from '@prisma/client';
import Link from 'next/link';
import Table, { Config } from '../Table';

interface Props {
  styles: Style[];
}

const StyleTable = ({ styles }: Props) => {
  const { getLabel } = useLanguage();

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

  return <Table data={styles} config={config} keyFn={keyFn} />;
};

export default StyleTable;
