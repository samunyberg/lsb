'use client';

import useClickOutside from '@/hooks/useClickOutside';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef } from 'react';
import { MdClose } from 'react-icons/md';
import LanguageSwitcher from './LanguageSwitcher';
import NavLinks from './NavLinks';
import Label from '../common/Label';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: Props) => {
  const sidebarRef = useRef(null);
  useClickOutside(sidebarRef, () => onClose());

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          transition={{
            duration: 0.3,
          }}
          ref={sidebarRef}
          className='fixed left-0 z-[999] flex h-screen w-[50%] flex-col bg-bgSoft px-5 py-4 shadow-md backdrop-blur-md'
        >
          <div className='flex flex-col gap-8'>
            <MdClose size={30} onClick={() => onClose()} />
            <div className='flex flex-col gap-2'>
              <p className='text-sm'>
                <Label labelId='sidebar.change_language' />
              </p>
              <LanguageSwitcher />
            </div>
            <NavLinks onLinkClick={() => onClose()} />
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
