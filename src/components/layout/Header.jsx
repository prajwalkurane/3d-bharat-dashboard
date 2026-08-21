'use client';

import { useEffect, useState } from 'react';
import { FiBell, FiMoon, FiSearch, FiSun, FiMenu } from 'react-icons/fi';

export function Header({ onMenuToggle, theme, onToggleTheme }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80 sm:px-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button type="button" onClick={onMenuToggle} aria-label="Open navigation" className="rounded-lg border border-slate-200 p-2 text-slate-600 md:hidden dark:border-slate-700 dark:text-slate-300">
            <FiMenu className="h-5 w-5" />
          </button>

          <label className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 md:flex dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
            <FiSearch className="h-4 w-4" />
            <input aria-label="Search deals" placeholder="Search deals, sector or city" className="w-64 border-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-100" />
          </label>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button type="button" className="rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900" aria-label="Notifications">
            <FiBell className="h-4 w-4" />
          </button>
          <button type="button" onClick={onToggleTheme} aria-label="Toggle theme" className="rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900">
            {mounted && theme === 'dark' ? <FiSun className="h-4 w-4" /> : <FiMoon className="h-4 w-4" />}
          </button>
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-500 text-sm font-semibold text-white">AS</div>
            <div className="hidden text-left sm:block">
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">Amit Sharma</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Investor</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
