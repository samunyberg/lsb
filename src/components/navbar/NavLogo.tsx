import Link from 'next/link';

const NavLogo = () => {
  return (
    <Link href='/'>
      <div className='hidden whitespace-nowrap text-base  uppercase tracking-wide lg:inline-block'>
        Lashes Studio by Boochita
      </div>
    </Link>
  );
};

export default NavLogo;
