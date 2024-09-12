import useClickOutside from '@/hooks/useClickOutside';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import Label from '../common/Label';
import ProfileMenu from './ProfileMenu';

const NavAuth = () => {
  const { status, data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useClickOutside(menuRef, () => setIsMenuOpen(false));

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  if (status === 'loading')
    return (
      <div aria-live='polite' role='status'>
        <ThreeDots height='30' width='30' color='#524237' visible={true} />
      </div>
    );

  if (status === 'unauthenticated')
    return (
      <div className='flex cursor-pointer gap-1 bg-bgSofter px-2 py-1 text-sm  shadow'>
        <Link href={'/auth/login'} aria-label='Login'>
          <Label labelId='nav_auth.login' />
        </Link>
        <span>|</span>
        <Link href={'/auth/register'} aria-label='Register'>
          <Label labelId='nav_auth.register' />
        </Link>
      </div>
    );

  return (
    <div className='relative' ref={menuRef}>
      {status === 'authenticated' && (
        <div>
          <div
            className={`flex size-10 cursor-pointer items-center justify-center rounded-full border border-accent bg-bgSoft text-sm shadow ${isMenuOpen && 'bg-white'}`}
            aria-label='Profile Menu'
            tabIndex={0}
            onClick={handleToggleMenu}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleToggleMenu();
              }
            }}
          >
            <span className=' tracking-wider'>
              {session.user.firstName.substring(0, 1) +
                session.user.lastName.substring(0, 1).toUpperCase()}
            </span>
          </div>
          {isMenuOpen && (
            <ProfileMenu
              user={session.user}
              onClose={() => setIsMenuOpen(false)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default NavAuth;
