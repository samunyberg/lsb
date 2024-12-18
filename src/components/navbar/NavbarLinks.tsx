import { cn } from 'clsx-tailwind-merge';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavigationLink } from './Navbar';

interface Props {
  links: NavigationLink[];
  onLinkClick?: () => void;
}

const NavbarLinks = ({ links, onLinkClick }: Props) => {
  const pathName = usePathname();

  return (
    <div className='hidden lg:flex lg:items-center lg:space-x-2'>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onLinkClick}
          className={cn(
            `cursor-pointer whitespace-nowrap px-2 text-[15px] uppercase tracking-wide opacity-90 transition-all lg:text-sm`,
            {
              'border-b border-primary font-semibold opacity-100':
                pathName === link.href,
            }
          )}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default NavbarLinks;
