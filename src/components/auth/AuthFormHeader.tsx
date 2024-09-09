import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import StrikeThroughText from '../common/StrikeThroughText';

interface Props {
  subtitle: ReactNode;
}

const AuthFormHeader = ({ subtitle }: Props) => {
  return (
    <>
      <h1 className='text-center text-xl  uppercase tracking-wide lg:text-2xl'>
        Lashes Studio by Boochita
      </h1>
      <div className='mx-auto mt-3 h-[1px] w-[50%] rounded-sm bg-primary' />
      <motion.h2
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 22,
        }}
      >
        <StrikeThroughText className='my-6'>{subtitle}</StrikeThroughText>
      </motion.h2>
    </>
  );
};

export default AuthFormHeader;
