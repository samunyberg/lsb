import Link from 'next/link';

const NavLogo = () => {
  return (
    <Link href='/' aria-label='Homepage'>
      <div className='hidden text-[17px] font-normal uppercase tracking-wide lg:inline'>
        Lashes Studio by Boochita
      </div>
    </Link>
  );
};

export default NavLogo;
