'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiBarChart2, FiBriefcase, FiHome, FiLayout, FiStar, FiTrendingUp } from 'react-icons/fi';

const navItems = [
  { href: '/', label: 'Dashboard', icon: FiHome },
  { href: '/dashboard', label: 'Investor Dashboard', icon: FiBarChart2 },
  { href: '/deals', label: 'Deal Explorer', icon: FiBriefcase },
  { href: '/recommendations', label: 'Recommendations', icon: FiTrendingUp },
  { href: '/investments', label: 'My Investments', icon: FiStar },
  { href: '/corporate', label: 'Corporate Dashboard', icon: FiLayout },
];

export function Sidebar({ mobileOpen = false, onClose }) {
  const pathname = usePathname();

  return (
    <aside className={`${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-200 bg-white/90 p-5 backdrop-blur-xl transition-transform duration-200 md:static md:flex md:w-64 md:translate-x-0 dark:border-slate-800 dark:bg-slate-950/90`}>
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-5 dark:border-slate-800">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">3D Bharat</div>
          <div className="mt-1 text-lg font-semibold text-slate-800 dark:text-slate-100">Investment Hub</div>
        </div>
        {onClose ? (
          <button type="button" aria-label="Close navigation" onClick={onClose} className="rounded-md p-2 text-slate-500 md:hidden dark:text-slate-300">✕</button>
        ) : null}
      </div>
      <nav className="mt-6 space-y-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
