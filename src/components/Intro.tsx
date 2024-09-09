'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from './common/Button';
import Label from './common/Label';

const Intro = () => {
  const router = useRouter();

  return (
    <div className='flex h-[calc(100vh-55px)] flex-col items-center justify-center'>
      <div className='flex flex-col items-center gap-8 pb-24 md:gap-12'>
        <Image
          src='/images/intro-image.jpg'
          alt='lashes'
          priority
          width={500}
          height={300}
          className='object-contain'
        />
        <div className='flex flex-col items-center gap-12 text-center'>
          <h1 className='text-4xl uppercase tracking-wide md:text-6xl'>
            Lashes Studio by Boochita
          </h1>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 22,
            }}
            className='flex w-full items-center justify-center px-5'
          >
            <Button
              variant='accent'
              className='w-fit px-5 py-4 text-[18px]'
              onClick={() => router.push('/book')}
            >
              <Label labelId='intro.book_button' />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
