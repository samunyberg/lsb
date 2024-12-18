import { ReactNode } from 'react';
import Panel from './Panel';

interface Props {
  title?: string | ReactNode;
  children: ReactNode;
}

const Section = ({ title, children }: Props) => {
  return (
    <Panel className='h-full w-full'>
      {title && (
        <div className='border-b border-black/10'>
          <h1 className='p-4 text-[16px] font-semibold uppercase tracking-wide'>
            {title}
          </h1>
        </div>
      )}
      <div className='h-full px-2 py-6'>{children}</div>
    </Panel>
  );
};

export default Section;
