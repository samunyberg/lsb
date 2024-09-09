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
];

const Navigation = () => {
  const pathName = usePathname();

  return (
    <div className='flex h-[55px] items-center justify-evenly gap-1 lg:justify-start lg:gap-4'>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            'transition-all active:text-accent lg:hover:text-accent',
            {
              'font-bold uppercase': link.href === pathName,
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
