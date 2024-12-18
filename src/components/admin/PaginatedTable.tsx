'use client';

import Panel from '../common/Panel';
import Pagination from '../Pagination';
import Table, { Config } from './Table';

export interface Data<T> {
  data: Data<T>[];
}

interface Props<T> {
  data: T[];
  itemCount: number;
  config: Config<T>;
  keyFn: (item: T) => string | number;
}

const PaginatedTable = <T,>({ data, itemCount, config, keyFn }: Props<T>) => {
  if (!data || data.length === 0)
    return (
      <Panel className='p-5'>
        <p>No results with this search.</p>
      </Panel>
    );

  return (
    <>
      <Table data={data} config={config} keyFn={keyFn} />
      <Pagination itemCount={itemCount} />
    </>
  );
};

export default PaginatedTable;
