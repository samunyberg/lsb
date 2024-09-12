'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Label from './common/Label';

const Intro = () => {
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
            <Link
              href='/book'
              className='rounded-sm border-2 border-primary bg-accent px-6 py-3 text-[18px] uppercase tracking-wide text-white transition-all hover:bg-accentButtonHover active:bg-accentButtonHover'
            >
              <Label labelId='intro.book_button' />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
