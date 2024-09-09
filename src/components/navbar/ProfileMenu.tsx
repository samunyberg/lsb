import { SessionUser } from '@/lib/types';
import { motion } from 'framer-motion';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { GrUserAdmin } from 'react-icons/gr';
import { IoPerson } from 'react-icons/io5';
import { MdLogout } from 'react-icons/md';
import Label from '../common/Label';
import Panel from '../common/Panel';
import Spacer from '../common/Spacer';

interface Props {
  user: SessionUser;
  onClose: () => void;
}

const ProfileMenu = ({ user, onClose }: Props) => {
  const handleSignOut = () => {
    signOut({ redirect: true, callbackUrl: '/' });
    onClose();
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 22,
      }}
      className='absolute right-0 top-[45px] z-[999] w-72 rounded-sm'
    >
      <Panel className='flex flex-col items-start justify-center bg-white/70 px-6 py-8 text-[14px] shadow-xl backdrop-blur-lg'>
        <p className='mb-1 '>
          <Label labelId='profile_menu.status' />
        </p>
        <div className='flex flex-wrap'>
          <span className='whitespace-normal break-all font-semibold'>
            {user.email}
          </span>
        </div>
        <Spacer className='my-0' />
        {user.isAdmin && (
          <div className='mb-4 flex items-center gap-1'>
            <GrUserAdmin size={15} />
            <Link href={'/admin'} onClick={() => onClose()}>
              <Label labelId='profile_menu.admin_area' />
            </Link>
          </div>
        )}
        <div className='flex items-center gap-1'>
          <IoPerson size={15} />
          <Link href={`/account/${user.id}`} onClick={() => onClose()}>
            <Label labelId='profile_menu.my_account' />
          </Link>
        </div>
        <Spacer className='my-0' />
        <div className='flex items-center gap-1'>
          <MdLogout size={20} />
          <button onClick={handleSignOut}>
            <Label labelId='profile_menu.logout' />
          </button>
        </div>
      </Panel>
    </motion.div>
  );
};

export default ProfileMenu;
