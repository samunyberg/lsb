'use client';

import { ReactNode, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import Label from '../common/Label';
import ResponsiveContainer from '../common/ResponsiveContainer';
import LanguageSwitcher from './LanguageSwitcher';
import NavAuth from './NavAuth';
import NavbarLinks from './NavbarLinks';
import NavLogo from './NavLogo';
import Sidebar from './Sidebar';

export interface NavigationLink {
  href: string;
  label: ReactNode;
}

const links: NavigationLink[] = [
  {
    href: '/book',
    label: <Label labelId='navigation.book' />,
  },
  {
    href: '/styles',
    label: <Label labelId='navigation.styles' />,
  },
  {
    href: '/about',
    label: <Label labelId='navigation.about' />,
  },
  {
    href: '/contact',
    label: <Label labelId='navigation.contact' />,
  },
  {
    href: '/reviews',
    label: <Label labelId='navigation.reviews' />,
  },
];

const Navbar = () => {
  const [sidebarOpened, setSidebarOpened] = useState(false);

  const handleSidebarClose = () => {
    setSidebarOpened(false);
  };

  return (
    <>
      <Sidebar
        links={links}
        isOpen={sidebarOpened}
        onClose={handleSidebarClose}
      />
      <nav className='sticky top-0 z-40 h-[55px] bg-bgMain'>
        <ResponsiveContainer className='flex items-center justify-between'>
          <FiMenu
            role='button'
            tabIndex={0}
            size={28}
            className='lg:hidden'
            onClick={() => setSidebarOpened(true)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') setSidebarOpened(true);
            }}
          />
          <NavLogo />
          <div className='flex flex-row items-center gap-5'>
            <NavbarLinks links={links} />
            <div className='hidden lg:inline lg:w-[70px]'>
              <LanguageSwitcher />
            </div>
            <NavAuth />
          </div>
        </ResponsiveContainer>
      </nav>
    </>
  );
};

export default Navbar;
