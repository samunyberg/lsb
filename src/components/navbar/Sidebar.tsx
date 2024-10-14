'use client';

import useClickOutside from '@/hooks/useClickOutside';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { MdClose } from 'react-icons/md';
import Label from '../common/Label';
import LanguageSwitcher from './LanguageSwitcher';
import { NavigationLink } from './Navbar';
import SidebarLinks from './SidebarLinks';

interface Props {
  links: NavigationLink[];
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ links, isOpen, onClose }: Props) => {
  const sidebarRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(sidebarRef, () => onClose());

  useEffect(() => {
    if (closeButtonRef.current) closeButtonRef.current.focus();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') onClose();
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

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
            <div
              ref={closeButtonRef}
              role='button'
              tabIndex={0}
              className='w-fit'
              onClick={() => onClose()}
              onKeyDown={(event) => {
                if (event.key === 'Enter') onClose();
              }}
            >
              <MdClose size={30} />
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-sm'>
                <Label labelId='sidebar.change_language' />
              </p>
              <LanguageSwitcher />
            </div>
            <SidebarLinks links={links} onLinkClick={() => onClose()} />
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
