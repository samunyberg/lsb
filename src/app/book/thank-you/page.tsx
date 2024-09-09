'use client';

import Button from '@/components/common/Button';
import CheckMark from '@/components/common/checkmark/CheckMark';
import Container from '@/components/common/Container';
import Label from '@/components/common/Label';
import Panel from '@/components/common/Panel';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const ThankYouPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <Container className='pt-32 md:max-w-[350px] lg:max-w-[450px]'>
      <Panel className='flex flex-col items-center justify-center gap-4 px-4 py-12'>
        <CheckMark text={<Label labelId='thank_you.title' />} />
        <p className='mb-5 text-center '>
          <Label labelId='thank_you.content' />{' '}
          <span className='font-semibold'>{session?.user.email}</span>.
        </p>
        <div className='flex w-full flex-col items-center gap-4'>
          <Button
            variant='accent'
            className='lg:w-fit lg:min-w-[250px]'
            onClick={() => router.push('/')}
          >
            <Label labelId='thank_you.home_button' />
          </Button>
          <Button
            variant='primary'
            className='lg:w-fit lg:min-w-[250px]'
            onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
          >
            <Label labelId='thank_you.logout_button' />
          </Button>
        </div>
      </Panel>
    </Container>
  );
};

export default ThankYouPage;
