'use client';

import SearchInput from '@/components/common/forms/SearchInput';
import useLanguage from '@/hooks/useLanguage';
import { Client } from '@/lib/types';
import Link from 'next/link';
import ManagementPage from '../ManagementPage';
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
    <ManagementPage title={getLabel('admin.clients.title')}>
      <div className='flex flex-col gap-5'>
        <div className='flex md:w-[50%] md:self-end md:p-2 lg:w-[35%]'>
          <SearchInput
            id='client-search'
            placeholder={getLabel('admin.clients.search_placeholder')}
          />
        </div>
        <PaginatedTable
          data={clients}
          config={config}
          keyFn={keyFn}
          itemsCount={itemsCount}
        />
      </div>
    </ManagementPage>
  );
};

export default ClientTable;
