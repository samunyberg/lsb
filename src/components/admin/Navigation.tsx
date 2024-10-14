'use client';

import { cn } from 'clsx-tailwind-merge';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Label from '../common/Label';

const links = [
  { href: '/admin', label: 'admin_navigation.dashboard' },
  { href: '/admin/appointments', label: 'admin_navigation.appointments' },
  { href: '/admin/clients', label: 'admin_navigation.clients' },
  { href: '/admin/styles', label: 'admin_navigation.styles' },
  { href: '/admin/pending-reviews', label: 'admin_navigation.reviews' },
];

const Navigation = () => {
  const pathName = usePathname();

  const isActive = (link: { href: string; label: string }) => {
    const subroute = pathName.split('/')[2];
    if (!subroute && pathName === link.href) return true;

    return subroute === link.href.split('/')[2];
  };

  return (
    <div className='flex h-[55px] items-center justify-evenly gap-5 overflow-x-scroll md:justify-start md:overflow-x-hidden'>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            'transition-all active:text-accent lg:hover:text-accent',
            {
              'font-bold uppercase hover:cursor-default lg:hover:text-primary':
                isActive(link),
            }
          )}
        >
          <Label labelId={link.label} />
        </Link>
      ))}
    </div>
  );
};

export default Navigation;
