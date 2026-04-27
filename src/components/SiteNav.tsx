'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
] as const;

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-[var(--background)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--background)]/80 dark:border-zinc-800">
      <nav
        className="container mx-auto flex flex-wrap items-center gap-4 px-4 py-4"
        aria-label="Main navigation"
      >
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-x-6">
          <Link
            href="/"
            className="text-lg font-bold text-foreground transition-colors hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:hover:text-blue-400 dark:focus-visible:ring-offset-zinc-950"
          >
            Gal Aqua
          </Link>
          <ul className="flex items-center gap-4 border-l border-zinc-200 pl-4 dark:border-zinc-700 sm:gap-6 sm:pl-6">
          {links.map(({ href, label }) => {
            const isActive =
              href === '/'
                ? pathname === '/' || pathname === ''
                : pathname === href || pathname.startsWith(`${href}/`);

            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950 ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-zinc-600 hover:text-foreground dark:text-zinc-400 dark:hover:text-zinc-100'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {label}
                </Link>
              </li>
            );
          })}
          </ul>
        </div>
      </nav>
    </header>
  );
}
