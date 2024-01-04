'use client';

import {
    HomeIcon,
    UserCircleIcon,
    PuzzlePieceIcon,
    Cog6ToothIcon
  } from '@heroicons/react/24/outline';
  
  import Link from 'next/link';
  import { usePathname } from 'next/navigation';
  import clsx from 'clsx';

  // Map of links to display in the side navigation.
  const links = [
    { name: 'Home', href: '/dashboard', icon: HomeIcon },
    { name: 'Profile', href: '/dashboard/profile', icon: UserCircleIcon },
    { name: 'Puzzles', href: '/dashboard/puzzles', icon: PuzzlePieceIcon },
    { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
  ];
  
  export default function NavLinks() {
    const pathname = usePathname();

    return (
      <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
                key={link.name}
                href={link.href}
                className={clsx(
                    'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                    {
                      'bg-sky-100 text-blue-600': pathname === link.href,
                    },
                )}
            >
                <div className="flex">
                <div className="grid place-items-center mr-4">
                    <LinkIcon className="h-5 w-5" />
                </div>
                {link.name}
                </div>
            </Link>
          );
        })}
      </nav>
    );
  }