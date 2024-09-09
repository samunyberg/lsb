import { ReactNode } from 'react';
import ActionMenu, { Action } from './ActionMenu';

interface Props {
  children: ReactNode;
  title: string | ReactNode;
  actions?: Action[] | null;
  className?: string;
}

const ManagementPage = ({
  children,
  title,
  actions,
  className = '',
}: Props) => {
  return (
    <div className={`mx-auto max-w-6xl md:px-16 lg:px-12 xl:px-0 ${className}`}>
      <div className='mb-6 flex items-center justify-between rounded-sm bg-bgSoft px-4 py-2 shadow lg:mb-12 lg:mt-8'>
        <h1 className='inline text-xl font-semibold tracking-wide'>{title}</h1>
        {actions && <ActionMenu actions={actions} />}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default ManagementPage;
