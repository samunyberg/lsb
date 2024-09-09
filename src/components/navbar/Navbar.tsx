'use client';

import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import LanguageSwitcher from './LanguageSwitcher';
import NavAuth from './NavAuth';
import NavLinks from './NavLinks';
import NavLogo from './NavLogo';
import Sidebar from './Sidebar';

const Navbar = () => {
  const [sidebarOpened, setSidebarOpened] = useState(false);

  const handleSidebarClose = () => {
    setSidebarOpened(false);
  };

  return (
    <>
      <Sidebar isOpen={sidebarOpened} onClose={handleSidebarClose} />
      <nav className='sticky inset-x-0 top-0 z-40 flex h-[55px] items-center bg-bgMain px-5 py-3 xl:px-0'>
        <div className='container mx-auto flex items-center justify-between'>
          <FiMenu
            size={28}
            className='lg:hidden'
            onClick={() => setSidebarOpened(true)}
          />
          <NavLogo />
          <div className='flex flex-row items-center gap-5'>
            <div className='hidden lg:inline'>
              <NavLinks />
            </div>
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
