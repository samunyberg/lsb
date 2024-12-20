import { PropsWithChildren } from 'react';

const SectionList = ({ children }: PropsWithChildren) => {
  return <div className='flex flex-col gap-5 pb-14'>{children}</div>;
};

export default SectionList;
