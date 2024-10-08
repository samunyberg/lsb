'use client';

import useLanguage from '@/hooks/useLanguage';
import { Client } from '@/lib/types';
import Link from 'next/link';
import PaginatedTable from '../PaginatedTable';
import { Config } from '../Table';

interface Props {
  clients: Client[];
  itemsCount: number;
}

const ClientTable = ({ clients, itemsCount }: Props) => {
  const { getLabel } = useLanguage();

  const config: Config<Client> = {
    columns: [
      {
        label: getLabel('client.name'),
        render: (client) => (
          <Link
            href={'/admin/clients/' + client.id}
            className='underline active:text-accent lg:hover:text-accent'
          >
            {`${client.firstName} ${client.lastName}`}
          </Link>
        ),
      },
      {
        label: getLabel('client.email'),
        render: (client) => client.email,
      },
      {
        label: getLabel('client.phone'),
        render: (client) => client.phone,
      },
    ],
  };

  const keyFn = (client: Client) => client.id;

  return (
    <PaginatedTable
      data={clients}
      config={config}
      keyFn={keyFn}
      itemsCount={itemsCount}
    />
  );
};

export default ClientTable;
