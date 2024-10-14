'use client';

import { ReactNode, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import Label from '../common/Label';
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
      <nav className='sticky inset-x-0 top-0 z-40 flex h-[55px] items-center bg-bgMain px-5 py-3 xl:px-0'>
        <div className='container mx-auto flex items-center justify-between'>
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
            <div className='hidden lg:inline lg:w-[90px]'>
              <LanguageSwitcher />
            </div>
            <NavAuth />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
