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
  containerClassName?: string;
}

const Table = <T,>({
  data,
  config,
  keyFn,
  containerClassName = '',
}: Props<T>) => {
  const showHeader = config.showHeaderRow ?? true;

  if (data.length === 0)
    return (
      <div className={`p-2 ${containerClassName}`}>
        <Label labelId='table.no_data' />
      </div>
    );

  return (
    <div className={`w-full overflow-x-auto ${containerClassName}`}>
      <table className='min-w-full table-auto'>
        {showHeader && (
          <thead>
            <tr>
              {config.columns.map((column) => (
                <th
                  key={column.label}
                  className='border-b border-black/10 p-3 text-start uppercase tracking-wide'
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
                <td key={column.label} className='whitespace-nowrap p-3'>
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
