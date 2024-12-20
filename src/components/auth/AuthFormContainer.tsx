import { PropsWithChildren } from 'react';
import Panel from '../common/Panel';

const AuthFormContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex min-h-[calc(100vh-55px)] items-center justify-center pb-14 pt-6 md:px-0'>
      <Panel className='w-full px-4 py-10 md:max-w-[350px] md:px-6 md:shadow lg:max-w-[450px]'>
        {children}
      </Panel>
    </div>
  );
};

export default AuthFormContainer;
