'use client';

import Panel from '../common/Panel';
import Pagination from '../Pagination';
import Table, { Config } from './Table';

export interface Data<T> {
  data: Data<T>[];
}

interface Props<T> {
  data: T[];
  itemsCount: number;
  config: Config<T>;
  keyFn: (item: T) => string | number;
}

const PaginatedTable = <T,>({ data, itemsCount, config, keyFn }: Props<T>) => {
  if (!data || data.length === 0)
    return (
      <div className='flex w-full items-center justify-center pt-12'>
        <Panel className='flex items-center justify-center p-5'>
          <p>No results with this search.</p>
        </Panel>
      </div>
    );

  return (
    <div className='w-full overflow-x-auto'>
      <Table data={data} config={config} keyFn={keyFn} />
      <Pagination className='my-5' itemsCount={itemsCount} />
    </div>
  );
};

export default PaginatedTable;
