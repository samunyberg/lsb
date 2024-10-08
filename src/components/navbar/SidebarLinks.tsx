import { cn } from 'clsx-tailwind-merge';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Label from '../common/Label';

const links = [
  {
    href: '/',
    label: <Label labelId='navigation.home' />,
  },
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
];

interface Props {
  onLinkClick?: () => void;
}

const SidebarLinks = ({ onLinkClick }: Props) => {
  const pathName = usePathname();

  return (
    <div className='flex flex-col gap-8 whitespace-nowrap'>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onLinkClick}
          className={cn(
            `cursor-pointer px-2 text-[15px] uppercase tracking-wide opacity-90 transition-all`,
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

export default SidebarLinks;