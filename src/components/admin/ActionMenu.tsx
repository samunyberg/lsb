'use client';

import useClickOutside from '@/hooks/useClickOutside';
import { motion } from 'framer-motion';
import { ReactNode, useRef, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';

export interface Action {
  label: string;
  icon: ReactNode;
  onClick: () => void;
}

interface Props {
  actions: Action[];
}

const ActionMenu = ({ actions }: Props) => {
  const [showActions, setShowActions] = useState(false);
  const menuRef = useRef(null);

  useClickOutside(menuRef, () => setShowActions(false));

  const handleToggleMenu = () => {
    setShowActions((prev) => !prev);
  };

  const handleActionClick = (action: Action) => {
    setShowActions(false);
    action.onClick();
  };

  return (
    <div ref={menuRef} className='relative'>
      <BsThreeDots
        size={27}
        onClick={handleToggleMenu}
        className='cursor-pointer'
      />
      {showActions && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 22,
          }}
          className='absolute right-0 top-[25px] z-[999] flex flex-col overflow-hidden whitespace-nowrap rounded-sm bg-white shadow-xl'
        >
          {actions.map((action) => (
            <div
              key={action.label}
              onClick={() => handleActionClick(action)}
              className='flex cursor-pointer items-center gap-2 border-b border-black/10 px-5 py-3 transition-all last:border-none hover:bg-black/5 active:bg-black/5'
            >
              {action.icon}
              <p>{action.label}</p>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default ActionMenu;
