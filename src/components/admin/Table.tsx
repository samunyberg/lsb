'use client';

import { ReactNode } from 'react';
import Label from '../common/Label';

export interface Config<T> {
  showHeaderRow?: boolean;
  columns: {
    label: string;
    render: (item: T) => ReactNode | string | number;
  }[];
}

export interface Data<T> {
  data: Data<T>[];
}

interface Props<T> {
  data: T[];
  config: Config<T>;
  keyFn: (item: T) => string | number;
}

const Table = <T,>({ data, config, keyFn }: Props<T>) => {
  const showHeader = config.showHeaderRow ?? true;

  if (data.length === 0)
    return (
      <div className='p-5'>
        <Label labelId='table.no_data' />
      </div>
    );

  return (
    <div className='w-full overflow-x-auto rounded-lg bg-bgSoft shadow'>
      <table className='min-w-full table-auto'>
        {showHeader && (
          <thead>
            <tr>
              {config.columns.map((column) => (
                <th
                  key={column.label}
                  className='border-b border-black/10 py-2 pl-3 text-start uppercase tracking-wide'
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {data.map((rowData) => (
            <tr
              key={keyFn(rowData)}
              className='border-b border-black/10 last:border-none'
            >
              {config.columns.map((column) => (
                <td key={column.label} className='whitespace-nowrap px-3 py-3 '>
                  {column.render(rowData)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
