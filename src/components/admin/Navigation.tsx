'use client';

import { cn } from 'clsx-tailwind-merge';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Label from '../common/Label';

const links = [
  { href: '/admin', label: 'admin_navigation.dashboard' },
  { href: '/admin/appointments/list', label: 'admin_navigation.appointments' },
  { href: '/admin/clients/list', label: 'admin_navigation.clients' },
  { href: '/admin/styles/list', label: 'admin_navigation.styles' },
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
    <div className='flex h-full w-full gap-3 overflow-x-scroll rounded-md bg-bgSoft p-2 shadow lg:flex-col lg:overflow-hidden'>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            'flex-shrink-0 p-2 text-sm uppercase tracking-wide transition-all',
            {
              'font-bold hover:cursor-default': isActive(link),
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
