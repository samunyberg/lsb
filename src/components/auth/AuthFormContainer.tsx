import { PropsWithChildren } from 'react';

const AuthFormContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex min-h-[calc(100vh-55px)] items-center justify-center py-6 md:px-0'>
      <div className='w-full py-10 md:max-w-[350px] md:px-6 lg:max-w-[450px]'>
        {children}
      </div>
    </div>
  );
};

export default AuthFormContainer;
